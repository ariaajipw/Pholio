/**
 * Build-time public asset check.
 *
 * For a static site, whether a public asset exists is known at build time.
 * Used to avoid emitting an `<img>` that would 404 (and log a console
 * error) when a preview file is not yet present — while still rendering
 * the designed placeholder fallback.
 */
import fs from 'node:fs';
import path from 'node:path';

/**
 * Returns true if a public asset path (starting with '/') resolves to an
 * existing file under `public/` at build time.
 */
export function hasPublicAsset(src: string | undefined | null): boolean {
  if (!src || !src.startsWith('/')) return false;
  const file = path.join(process.cwd(), 'public', src.replace(/^\/+/, ''));
  return fs.existsSync(file);
}
