/**
 * Validate products.json and gallery.json
 * Checks for data consistency, unique IDs, valid references, etc.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const PRODUCTS_PATH = path.join(PROJECT_ROOT, 'src', 'content', 'products.json');
const GALLERY_PATH = path.join(PROJECT_ROOT, 'src', 'content', 'gallery.json');

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {'digital' | 'physical'} type
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {number} price
 * @property {string} currency
 * @property {string} preview
 * @property {{provider: string, url: string}} checkout
 * @property {string} licenseLabel
 * @property {boolean} featured
 */

/**
 * @typedef {Object} GalleryItem
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} src
 * @property {string} alt
 * @property {boolean} featured
 * @property {string} [productId]
 */

function loadJson(filePath, label) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`❌ ${label}: Failed to parse JSON - ${error.message}`);
    process.exit(1);
  }
}

function validateProducts(products) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const previews = new Set();

  products.forEach((product, index) => {
    const prefix = `products[${index}] (${product.id || 'no-id'})`;

    // ID unique and not empty
    if (!product.id) {
      errors.push(`${prefix}: Missing id`);
    } else if (ids.has(product.id)) {
      errors.push(`${prefix}: Duplicate id`);
    } else {
      ids.add(product.id);
    }

    // Type valid
    if (!['digital', 'physical'].includes(product.type)) {
      errors.push(`${prefix}: Invalid type "${product.type}" (must be "digital" or "physical")`);
    }

    // Price valid and non-negative
    if (typeof product.price !== 'number' || !Number.isFinite(product.price) || product.price < 0) {
      errors.push(`${prefix}: Invalid price ${product.price} (must be non-negative number)`);
    }

    // Currency present
    if (!product.currency || typeof product.currency !== 'string') {
      errors.push(`${prefix}: Missing or invalid currency`);
    }

    // Preview path follows convention
    if (!product.preview || typeof product.preview !== 'string') {
      errors.push(`${prefix}: Missing preview path`);
    } else if (!product.preview.startsWith('/images/previews/') || !product.preview.endsWith('.webp')) {
      warnings.push(`${prefix}: Preview path "${product.preview}" doesn't follow convention /images/previews/{id}-wm.webp`);
    } else if (previews.has(product.preview)) {
      warnings.push(`${prefix}: Duplicate preview path "${product.preview}"`);
    } else {
      previews.add(product.preview);
    }

    // Checkout structure
    if (!product.checkout || typeof product.checkout !== 'object') {
      errors.push(`${prefix}: Missing checkout object`);
    } else {
      if (!product.checkout.provider || typeof product.checkout.provider !== 'string') {
        errors.push(`${prefix}: Missing checkout provider`);
      }
      if (product.checkout.provider !== 'whatsapp' && (!product.checkout.url || typeof product.checkout.url !== 'string')) {
        errors.push(`${prefix}: Missing checkout URL for provider "${product.checkout.provider}"`);
      }
      if (product.checkout.provider === 'whatsapp' && product.checkout.url !== '') {
        warnings.push(`${prefix}: WhatsApp provider should have empty URL (URL is generated dynamically)`);
      }
      // Check for placeholder URLs
      if (product.checkout.url && product.checkout.url.includes('example.invalid')) {
        warnings.push(`${prefix}: Checkout URL uses placeholder "example.invalid" - not production ready`);
      }
    }

    // License label
    if (!product.licenseLabel || typeof product.licenseLabel !== 'string') {
      warnings.push(`${prefix}: Missing or empty licenseLabel`);
    }

    // Category
    if (!product.category || typeof product.category !== 'string') {
      errors.push(`${prefix}: Missing category`);
    }
  });

  return { errors, warnings };
}

function validateGallery(gallery, productIds) {
  const errors = [];
  const warnings = [];
  const ids = new Set();
  const srcs = new Set();

  gallery.forEach((item, index) => {
    const prefix = `gallery[${index}] (${item.id || 'no-id'})`;

    // ID unique and not empty
    if (!item.id) {
      errors.push(`${prefix}: Missing id`);
    } else if (ids.has(item.id)) {
      errors.push(`${prefix}: Duplicate id`);
    } else {
      ids.add(item.id);
    }

    // Src path follows convention
    if (!item.src || typeof item.src !== 'string') {
      errors.push(`${prefix}: Missing src path`);
    } else if (!item.src.startsWith('/images/previews/') || !item.src.endsWith('.webp')) {
      warnings.push(`${prefix}: Src path "${item.src}" doesn't follow convention /images/previews/{id}-wm.webp`);
    } else if (srcs.has(item.src)) {
      warnings.push(`${prefix}: Duplicate src path "${item.src}"`);
    } else {
      srcs.add(item.src);
    }

    // Alt text present and descriptive
    if (!item.alt || typeof item.alt !== 'string' || item.alt.trim().length < 5) {
      warnings.push(`${prefix}: Alt text missing or too short (should describe the image)`);
    }

    // Category
    if (!item.category || typeof item.category !== 'string') {
      errors.push(`${prefix}: Missing category`);
    }

    // ProductId reference validation
    if (item.productId) {
      if (!productIds.has(item.productId)) {
        errors.push(`${prefix}: productId "${item.productId}" references non-existent product`);
      }
    }
  });

  return { errors, warnings };
}

function validateCrossReferences(products, gallery) {
  const warnings = [];
  const productIds = new Set(products.map(p => p.id));
  const galleryIds = new Set(gallery.map(g => g.id));

  // Check if gallery items with productId have matching preview paths
  gallery.forEach(item => {
    if (item.productId) {
      const product = products.find(p => p.id === item.productId);
      if (product && product.preview !== item.src) {
        warnings.push(`Gallery item "${item.id}" has productId "${item.productId}" but different preview path: gallery="${item.src}" vs product="${product.preview}"`);
      }
    }
  });

  // Check for preview paths in JSON that don't have corresponding source mapping
  const allPreviews = new Set([
    ...products.map(p => p.preview),
    ...gallery.map(g => g.src),
  ]);

  return { warnings };
}

function main() {
  console.log('=== JSON Data Validation ===\n');

  const products = loadJson(PRODUCTS_PATH, 'products.json');
  const gallery = loadJson(GALLERY_PATH, 'gallery.json');

  console.log(`Loaded ${products.length} products and ${gallery.length} gallery items.\n`);

  const productValidation = validateProducts(products);
  const galleryValidation = validateGallery(gallery, new Set(products.map(p => p.id)));
  const crossValidation = validateCrossReferences(products, gallery);

  let totalErrors = 0;
  let totalWarnings = 0;

  if (productValidation.errors.length > 0) {
    console.log('❌ PRODUCT ERRORS:');
    productValidation.errors.forEach(e => console.log(`  - ${e}`));
    totalErrors += productValidation.errors.length;
  }

  if (galleryValidation.errors.length > 0) {
    console.log('❌ GALLERY ERRORS:');
    galleryValidation.errors.forEach(e => console.log(`  - ${e}`));
    totalErrors += galleryValidation.errors.length;
  }

  if (productValidation.warnings.length > 0) {
    console.log('⚠ PRODUCT WARNINGS:');
    productValidation.warnings.forEach(w => console.log(`  - ${w}`));
    totalWarnings += productValidation.warnings.length;
  }

  if (galleryValidation.warnings.length > 0) {
    console.log('⚠ GALLERY WARNINGS:');
    galleryValidation.warnings.forEach(w => console.log(`  - ${w}`));
    totalWarnings += galleryValidation.warnings.length;
  }

  if (crossValidation.warnings.length > 0) {
    console.log('⚠ CROSS-REFERENCE WARNINGS:');
    crossValidation.warnings.forEach(w => console.log(`  - ${w}`));
    totalWarnings += crossValidation.warnings.length;
  }

  console.log('\n=== Summary ===');
  console.log(`Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);

  if (totalErrors > 0) {
    console.log('\n❌ Validation FAILED - fix errors before proceeding');
    process.exit(1);
  } else {
    console.log('\n✅ Validation PASSED');
  }
}

main();