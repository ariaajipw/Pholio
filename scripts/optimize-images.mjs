/**
 * Image optimization script using Sharp
 * Reads master images from private-assets/source/ and outputs
 * optimized, watermarked previews to public/images/previews/
 *
 * Usage: node scripts/optimize-images.mjs [--source <dir>] [--output <dir>] [--config <file>]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');

// Default paths (can be overridden via CLI args)
const DEFAULT_SOURCE_DIR = path.join(PROJECT_ROOT, 'private-assets', 'source');
const DEFAULT_OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'previews');
const DEFAULT_CONFIG_DIR = path.join(PROJECT_ROOT, 'src', 'config');

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    sourceDir: DEFAULT_SOURCE_DIR,
    outputDir: DEFAULT_OUTPUT_DIR,
    configDir: DEFAULT_CONFIG_DIR,
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--source':
        result.sourceDir = path.resolve(PROJECT_ROOT, args[++i]);
        break;
      case '--output':
        result.outputDir = path.resolve(PROJECT_ROOT, args[++i]);
        break;
      case '--config':
        result.configDir = path.resolve(PROJECT_ROOT, args[++i]);
        break;
      case '--help':
        console.log('Usage: node scripts/optimize-images.mjs [--source <dir>] [--output <dir>] [--config <dir>]');
        process.exit(0);
    }
  }

  return result;
}

const { sourceDir: SOURCE_DIR, outputDir: OUTPUT_DIR, configDir: CONFIG_DIR } = parseArgs();

// Load configuration files
function loadConfig(configPath) {
  try {
    const content = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Failed to load config from ${configPath}:`, error.message);
    return null;
  }
}

const watermarkConfig = loadConfig(path.join(CONFIG_DIR, 'watermark.json'))?.watermark || {
  enabled: true,
  text: '© Pholio',
  fontSize: 24,
  fontColor: 'rgba(255,255,255,0.7)',
  position: 'bottom-right',
  padding: 20,
};

const imageConfig = loadConfig(path.join(CONFIG_DIR, 'watermark.json'))?.image || {
  maxWidth: 1920,
  maxHeight: 1080,
  webpQuality: 82,
  avifQuality: 50,
  formats: ['webp'],
};

const imagesConfig = loadConfig(path.join(CONFIG_DIR, 'images.json')) || {};

const imageMapping = imagesConfig.mapping || {};

// Fallback naming: use the source filename + suffix when no explicit
// mapping exists. Read from `images.json.fallback` (top level).
const fallbackConfig = imagesConfig.fallback || {
  useSourceName: true,
  addSuffix: '-wm',
};

// Load site config for photographer name (watermark text)
function loadSiteConfig() {
  try {
    const siteConfigPath = path.join(CONFIG_DIR, 'site.json');
    if (fs.existsSync(siteConfigPath)) {
      return JSON.parse(fs.readFileSync(siteConfigPath, 'utf-8'));
    }
  } catch (error) {
    console.warn('Could not load site config for watermark, using default');
  }
  return null;
}

const siteConfig = loadSiteConfig();

// Supported input extensions (for directory scanning)
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.tiff', '.tif', '.heic', '.heif'];

// Validate that a path is within the allowed source directory
function validateSourcePath(inputPath, allowedSourceDir) {
  try {
    const resolvedInput = path.resolve(inputPath);
    const resolvedSource = path.resolve(allowedSourceDir);

    // Check if the resolved path starts with the resolved source directory
    // Use path.sep to ensure we're checking directory boundary, not just prefix
    if (!resolvedInput.startsWith(resolvedSource + path.sep) && resolvedInput !== resolvedSource) {
      return { valid: false, reason: 'Path traversal attempt detected' };
    }

    // Check if it's a regular file (not a directory, symlink to outside, etc.)
    const stats = fs.lstatSync(resolvedInput);
    if (!stats.isFile()) {
      return { valid: false, reason: 'Not a regular file' };
    }

    // Additional check: if it's a symlink, verify the target is also within source dir
    if (stats.isSymbolicLink()) {
      const realPath = fs.realpathSync(resolvedInput);
      const resolvedReal = path.resolve(realPath);
      if (!resolvedReal.startsWith(resolvedSource + path.sep) && resolvedReal !== resolvedSource) {
        return { valid: false, reason: 'Symlink points outside source directory' };
      }
    }

    return { valid: true, resolvedPath: resolvedInput };
  } catch (error) {
    return { valid: false, reason: error.message };
  }
}

// Validate image format using Sharp (magic bytes detection)
async function validateImageFormat(filePath) {
  try {
    const image = sharp(filePath);
    await image.metadata();
    return { valid: true };
  } catch (error) {
    return { valid: false, reason: `Invalid or unsupported image format: ${error.message}` };
  }
}

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getWatermarkSvg(text, width, height, config) {
  const fontSize = config.fontSize;
  const padding = config.padding;

  let x, y, anchor;

  switch (config.position) {
    case 'bottom-right':
      x = width - padding;
      y = height - padding;
      anchor = 'end';
      break;
    case 'bottom-left':
      x = padding;
      y = height - padding;
      anchor = 'start';
      break;
    case 'top-right':
      x = width - padding;
      y = padding + fontSize;
      anchor = 'end';
      break;
    case 'top-left':
      x = padding;
      y = padding + fontSize;
      anchor = 'start';
      break;
    case 'center':
    default:
      x = width / 2;
      y = height / 2;
      anchor = 'middle';
      break;
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="${x}"
        y="${y}"
        text-anchor="${anchor}"
        dominant-baseline="alphabetic"
        font-family="system-ui, sans-serif"
        font-size="${fontSize}"
        font-weight="600"
        fill="${config.fontColor}"
        opacity="0.8"
      >
        ${text}
      </text>
    </svg>
  `;
}

async function processImage(inputPath, outputBaseName, photographerName) {
  try {
    // Validate path security
    const pathValidation = validateSourcePath(inputPath, SOURCE_DIR);
    if (!pathValidation.valid) {
      return { success: false, error: `Security check failed: ${pathValidation.reason}` };
    }

    // Validate image format using Sharp (detects by magic bytes)
    const formatValidation = await validateImageFormat(pathValidation.resolvedPath);
    if (!formatValidation.valid) {
      return { success: false, error: formatValidation.reason };
    }

    const image = sharp(pathValidation.resolvedPath);
    const metadata = await image.metadata();

    console.log(`Processing: ${path.basename(inputPath)} (${metadata.width}x${metadata.height})`);

    // Calculate resize dimensions maintaining aspect ratio
    const { width: origWidth, height: origHeight } = metadata;
    let targetWidth = origWidth;
    let targetHeight = origHeight;

    if (origWidth > imageConfig.maxWidth || origHeight > imageConfig.maxHeight) {
      const ratio = Math.min(imageConfig.maxWidth / origWidth, imageConfig.maxHeight / origHeight);
      targetWidth = Math.round(origWidth * ratio);
      targetHeight = Math.round(origHeight * ratio);
    }

    // Create watermark SVG if enabled
    let watermarkBuffer = null;
    if (watermarkConfig.enabled) {
      const watermarkText = photographerName ? `© ${photographerName}` : watermarkConfig.text;
      const watermarkSvg = getWatermarkSvg(watermarkText, targetWidth, targetHeight, watermarkConfig);
      watermarkBuffer = Buffer.from(watermarkSvg);
    }

    // Process each format
    for (const format of imageConfig.formats) {
      let pipeline = image
        .clone()
        .resize(targetWidth, targetHeight, {
          fit: 'inside',
          withoutEnlargement: true,
        });

      if (watermarkBuffer) {
        // SVG already has absolute positioning, so don't use gravity
        // The SVG covers the full image dimensions with positioned text
        pipeline = pipeline.composite([{
          input: watermarkBuffer,
          // No gravity - SVG handles positioning via x/y coordinates
        }]);
      }

      if (format === 'webp') {
        pipeline = pipeline.webp({ quality: imageConfig.webpQuality });
      } else if (format === 'avif') {
        pipeline = pipeline.avif({ quality: imageConfig.avifQuality });
      }

      const outputFileName = `${outputBaseName}.${format}`;
      const outputPath = path.join(OUTPUT_DIR, outputFileName);
      await pipeline.toFile(outputPath);
      console.log(`  ✓ ${outputFileName} (${targetWidth}x${targetHeight})`);
    }

    return { success: true, width: targetWidth, height: targetHeight };
  } catch (error) {
    console.error(`  ✗ Error processing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('=== Image Optimization Script ===');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}`);
  console.log(`Config: ${CONFIG_DIR}`);
  console.log('');

  // Ensure directories exist
  ensureDir(OUTPUT_DIR);

  // Check source directory
  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`Source directory not found: ${SOURCE_DIR}`);
    console.log('Create the directory and add master images there.');
    process.exit(1);
  }

  // Get all image files
  const files = fs.readdirSync(SOURCE_DIR)
    .filter(file => SUPPORTED_EXTENSIONS.includes(path.extname(file).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log('No image files found in source directory.');
    console.log(`Supported formats: ${SUPPORTED_EXTENSIONS.join(', ')}`);
    process.exit(0);
  }

  console.log(`Found ${files.length} image(s) to process.\n`);

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const file of files) {
    const inputPath = path.join(SOURCE_DIR, file);
    const sourceName = path.parse(file).name;

    // Determine output base name from mapping, or use fallback
    let outputBaseName = imageMapping[file];
    if (!outputBaseName) {
      if (fallbackConfig.useSourceName) {
        outputBaseName = sourceName + (fallbackConfig.addSuffix || '');
      } else {
        outputBaseName = sourceName;
      }
      console.warn(`  ⚠ No mapping for "${file}", using fallback: ${outputBaseName}`);
    }

    const photographerName = siteConfig?.photographer;
    const result = await processImage(inputPath, outputBaseName, photographerName);

    results.push({ file, outputBaseName, ...result });

    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
  }

  console.log('');
  console.log('=== Summary ===');
  console.log(`Success: ${successCount}`);
  console.log(`Failed: ${failCount}`);
  console.log(`Output directory: ${OUTPUT_DIR}`);

  if (failCount > 0) {
    console.log('\nFailed files:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.file}: ${r.error}`);
    });
    process.exit(1);
  }
}

main().catch(console.error);