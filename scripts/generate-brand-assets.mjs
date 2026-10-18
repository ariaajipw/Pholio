/**
 * Generate Pholio brand placeholder assets (self-made, no external artwork):
 * - public/og-default.jpg      1200x630 Open Graph fallback
 * - public/apple-touch-icon.png  180x180 app icon
 * - public/favicon.svg           simple "P" wordmark
 *
 * Usage: node scripts/generate-brand-assets.mjs
 * Per-client projects should regenerate these with the client's brand.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Brand tokens (Editorial preset defaults)
const BRAND = {
  bg: '#F3F3F1',
  ink: '#0A0B10',
  muted: '#62625E',
};

function ogSvg() {
  // 1200x630 fallback card: wordmark + tagline + simple frame motif
  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${BRAND.bg}"/>
  <rect x="48" y="48" width="1104" height="534" fill="none" stroke="${BRAND.ink}" stroke-width="2"/>
  <text x="96" y="320" font-family="system-ui, sans-serif" font-size="160" font-weight="800"
        fill="${BRAND.ink}" letter-spacing="-4">PHOLIO</text>
  <text x="96" y="420" font-family="system-ui, sans-serif" font-size="40"
        fill="${BRAND.muted}">Portfolio Fotografi &amp; Katalog</text>
  <rect x="96" y="480" width="120" height="8" fill="${BRAND.ink}"/>
</svg>
`;
}

function appleIconSvg() {
  // 180x180: dark square with white "P"
  return `
<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="${BRAND.ink}"/>
  <text x="90" y="128" text-anchor="middle" font-family="system-ui, sans-serif"
        font-size="104" font-weight="800" fill="#FFFFFF">P</text>
</svg>
`;
}

function faviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" fill="${BRAND.ink}"/>
  <text x="64" y="92" text-anchor="middle" font-family="system-ui, sans-serif"
        font-size="76" font-weight="800" fill="#FFFFFF">P</text>
</svg>
`;
}

async function main() {
  console.log('Generating Pholio brand assets...');

  await sharp(Buffer.from(ogSvg()))
    .jpeg({ quality: 82 })
    .toFile(path.join(PUBLIC_DIR, 'og-default.jpg'));
  console.log('  ✓ public/og-default.jpg (1200x630)');

  await sharp(Buffer.from(appleIconSvg()))
    .png()
    .toFile(path.join(PUBLIC_DIR, 'apple-touch-icon.png'));
  console.log('  ✓ public/apple-touch-icon.png (180x180)');

  fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg(), 'utf-8');
  console.log('  ✓ public/favicon.svg');
}

main().catch((error) => {
  console.error('Failed to generate brand assets:', error.message);
  process.exit(1);
});
