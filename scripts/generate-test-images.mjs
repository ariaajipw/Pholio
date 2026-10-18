/**
 * Generate synthetic test images for pipeline testing
 * Creates test images in a temporary directory outside the project
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a temporary directory for test images
const TEST_BASE_DIR = path.join(os.tmpdir(), 'pholio-test-images');
const TEST_SOURCE_DIR = path.join(TEST_BASE_DIR, 'source');

async function generateTestImages() {
  console.log('=== Generating Synthetic Test Images ===');
  console.log(`Test directory: ${TEST_BASE_DIR}\n`);

  // Clean up any existing test directory
  if (fs.existsSync(TEST_BASE_DIR)) {
    fs.rmSync(TEST_BASE_DIR, { recursive: true, force: true });
  }

  fs.mkdirSync(TEST_SOURCE_DIR, { recursive: true });

  const testCases = [
    {
      name: 'bromo-sunrise.jpg',
      width: 2400,
      height: 1600,
      color: { r: 255, g: 200, b: 100 }, // Warm landscape color
      description: 'Landscape orientation (exceeds max dimensions)',
    },
    {
      name: 'portrait-studio-1.jpg',
      width: 1200,
      height: 1600,
      color: { r: 200, g: 180, b: 220 }, // Cool portrait color
      description: 'Portrait orientation (within max dimensions)',
    },
    {
      name: 'landscape-mountain-1.jpg',
      width: 3000,
      height: 2000,
      color: { r: 100, g: 150, b: 200 }, // Mountain blue
      description: 'Large landscape (exceeds max dimensions significantly)',
    },
    {
      name: 'street-photo-1.jpg',
      width: 1920,
      height: 1080,
      color: { r: 180, g: 180, b: 180 }, // Gray street
      description: 'Exactly at max dimensions',
    },
    {
      name: 'event-wedding-1.jpg',
      width: 800,
      height: 1200,
      color: { r: 255, g: 250, b: 240 }, // Light wedding
      description: 'Small portrait (no resize needed)',
    },
    {
      name: 'fashion-editorial-1.jpg',
      width: 1600,
      height: 1067,
      color: { r: 50, g: 50, b: 60 }, // Dark fashion
      description: 'Landscape within limits',
    },
    {
      name: 'portrait-session.jpg',
      width: 1500,
      height: 1000,
      color: { r: 220, g: 200, b: 180 }, // Warm portrait session
      description: 'Landscape for portrait session product',
    },
    {
      name: 'bromo-print-a3.jpg',
      width: 2480,
      height: 3508,
      color: { r: 180, g: 160, b: 140 }, // Print color
      description: 'A3 print ratio (very large)',
    },
    // Test unsupported format
    {
      name: 'invalid-format.txt',
      content: 'This is not an image',
      description: 'Non-image file (should be skipped)',
    },
    // Test invalid filename (path traversal attempt) - create file with traversal name inside test dir
    {
      name: '..malicious..jpg',
      content: 'malicious',
      description: 'Filename with traversal attempt (should be handled safely)',
    },
  ];

  for (const testCase of testCases) {
    const filePath = path.join(TEST_SOURCE_DIR, testCase.name);

    if (testCase.content) {
      // Write non-image file
      fs.writeFileSync(filePath, testCase.content);
      console.log(`Created: ${testCase.name} (${testCase.description})`);
    } else {
      // Generate synthetic image using Sharp - create SVG then convert
      const { width, height, color } = testCase;
      const svg = createGradientSvg(width, height, color);
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 90 })
        .toFile(filePath);
      console.log(`Created: ${testCase.name} (${width}x${height}) - ${testCase.description}`);
    }
  }

  // Create a symlink test (if supported)
  try {
    const symlinkPath = path.join(TEST_SOURCE_DIR, 'symlink-outside.jpg');
    const targetPath = path.join(os.tmpdir(), 'pholio-symlink-target.jpg');
    const svg = createGradientSvg(800, 600, { r: 100, g: 100, b: 100 });
    await sharp(Buffer.from(svg))
      .jpeg()
      .toFile(targetPath);
    fs.symlinkSync(targetPath, symlinkPath);
    console.log(`Created: symlink-outside.jpg (symlink to outside source dir)`);
  } catch (e) {
    console.log('Symlink creation skipped (not supported on this platform)');
  }

  console.log('\n=== Test images generated ===');
  console.log(`Source directory: ${TEST_SOURCE_DIR}`);
  console.log('\nTo test the pipeline, run:');
  console.log(`  node scripts/optimize-images.mjs --source "${TEST_SOURCE_DIR}" --output "${path.join(TEST_BASE_DIR, 'output')}" --config "${path.join(__dirname, '..', 'src', 'config')}"`);

  return { TEST_SOURCE_DIR, TEST_BASE_DIR };
}

function createGradientSvg(width, height, baseColor) {
  // Create an SVG with a gradient
  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${baseColor.r},${baseColor.g},${baseColor.b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${Math.min(255, baseColor.r + 50)},${Math.min(255, baseColor.g + 50)},${Math.min(255, baseColor.b + 50)});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <!-- Add some noise pattern for visual variety -->
      <g opacity="0.1">
        ${Array.from({ length: 20 }, (_, i) => `
          <circle cx="${Math.random() * width}" cy="${Math.random() * height}" r="${Math.random() * 50 + 10}" fill="white" />
        `).join('')}
      </g>
    </svg>
  `;
}

generateTestImages().catch(console.error);