# Pholio — Starter Portofolio Fotografi & Katalog Foto

Starter website statis untuk portofolio fotografer dengan katalog penjualan
foto. Tanpa backend, database, CMS, cart, atau checkout internal: setiap
produk menaut ke URL checkout eksternal (Mayar sebagai default untuk
Indonesia, WhatsApp sebagai fallback) yang dikelola klien.

Dokumen utama: `PRD.md` (scope), `ARCHITECTURE.md` (data & alur),
`DESIGN.md` (arah visual), `TASKS.md` (roadmap), `pholio-docs/PROPOSAL.md`
(template penawaran klien).

## Stack

- [Astro](https://astro.build) v7 — static generation
- TypeScript (strict)
- Tailwind CSS v4 via `@tailwindcss/vite`
- Sharp — pipeline optimasi gambar (script lokal, bukan bagian build)
- `@astrojs/sitemap` — sitemap otomatis

## Persyaratan

- Node.js ≥ 22.22.0 (lihat `engines` di `package.json`)

## Instalasi & pengembangan

```sh
npm install
npm run dev          # http://localhost:4321
```

Perintah lain:

```sh
npm run build        # build statis ke ./dist
npm run preview      # pratinjau hasil build
npx astro check      # type check
```

## Validasi data

```sh
node scripts/validate-json.mjs
```

Memeriksa `products.json` dan `gallery.json`: ID unik, harga, kategori,
referensi `productId`, konvensi path preview, dan menandai URL checkout
placeholder (`example.invalid`) sebagai belum siap produksi.

## Pipeline optimasi gambar

Foto master **tidak boleh** masuk Git, `public/`, atau artefak build.
Alur kerja:

1. Letakkan foto master di `private-assets/source/`.
2. Jalankan pipeline:
   ```sh
   node scripts/optimize-images.mjs
   ```
3. Preview ber-watermark ditulis ke `public/images/previews/`
   dengan pola `{nama}-wm.webp`.

Pemetaan nama sumber → nama output ada di `src/config/images.json`;
file tanpa pemetaan memakai nama sumber + suffix `-wm`. Watermark,
ukuran maksimum, dan kualitas dikonfigurasi di `src/config/watermark.json`
dan memakai nama fotografer dari `src/config/site.json`.

Script mendukung argumen untuk pengujian terisolasi:

```sh
node scripts/optimize-images.mjs --source <dir> --output <dir> --config <dir>
```

Aset merek demo (`og-default.jpg`, `apple-touch-icon.png`, `favicon.svg`)
dibuat sendiri oleh `scripts/generate-brand-assets.mjs`; regenerasi dengan
merek klien di tiap proyek.

## Konfigurasi & konten

| Lokasi | Isi |
|---|---|
| `src/config/site.json` | Nama situs, fotografer, tema/hero/header, feature flags, kontak, navigasi |
| `src/config/site.ts` | Akses typed ke `site.json` |
| `src/config/watermark.json` | Watermark & parameter pipeline gambar |
| `src/config/images.json` | Pemetaan nama file sumber → nama preview |
| `src/content/products.json` | Katalog produk & URL checkout |
| `src/content/gallery.json` | Item galeri (opsional `productId`) |
| `public/images/previews/` | Output pipeline (preview publik) |

Feature flags di `site.json` → `features`: `filter`, `lightbox`,
`gridLines` (preset Bold), `whatsappFloating`, `entranceMotion`.
`baseUrl` dibiarkan kosong selama demo; isi domain produksi sebelum
deploy klien (dipakai canonical, Open Graph, dan sitemap).

## Batasan MVP

- Tidak ada backend, database, CMS, autentikasi, cart, atau checkout internal.
- Website tidak memverifikasi transaksi; pembayaran & pengiriman file
  ditangani provider eksternal.
- Tidak ada PWA/installability; tidak ada ViewSwitcher, board view, tema
  gelap, atau animasi scroll (M2).
- URL `example.invalid` adalah placeholder demo — belum siap produksi.
- Kontras warna merek klien harus dihitung ulang (lihat `DESIGN.md` §3.2).

## Deployment Cloudflare Pages

- Build command: `npm run build`
- Build output directory: `dist`
- Node version: 22.x
- Pastikan `private-assets/` TIDAK di-commit (sudah ada di `.gitignore`).
- Preview `public/images/previews/` harus tersedia di repositori atau
  dihasilkan sebelum build (pipeline gambar tidak berjalan otomatis).
- Isi `baseUrl` di `src/config/site.json` dengan domain produksi
  sebelum deploy final agar sitemap, canonical, dan Open Graph benar.
