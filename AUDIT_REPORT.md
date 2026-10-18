# LAPORAN AUDIT PRE-A2 — PHOLIO STARTER

**Tanggal audit:** 18 Oktober 2026  
**Auditor:** Senior Engineer (read-only)  
**Status repository:** Semua file untracked (belum ada commit)

---

## A. KONDISI REPOSITORY AKTUAL

### Git Status
```
?? .gitignore
?? AGENTS.md
?? ARCHITECTURE.md
?? DESIGN.md
?? PRD.md
?? README.md
?? TASKS.md
?? astro.config.mjs
?? package-lock.json
?? package.json
?? pholio-docs/DESIGN-gpt.md
?? pholio-docs/HANDOVER.md
?? pholio-docs/INTAKE_FORM.md
?? pholio-docs/PROPOSAL.md
?? public/favicon.ico
?? public/favicon.svg
?? scripts/optimize-images.mjs
?? src/components/Footer.astro
?? src/components/Header.astro
?? src/components/SEO.astro
?? src/config/site.ts
?? src/content/gallery.json
?? src/content/products.json
?? src/layouts/BaseLayout.astro
?? src/lib/format-price.ts
?? src/lib/wa-formatter.ts
?? src/pages/404.astro
?? src/pages/about.astro
?? src/pages/contact.astro
?? src/pages/gallery.astro
?? src/pages/index.astro
?? src/pages/products/[id].astro
?? src/pages/shop/index.astro
?? src/styles/global.css
?? tsconfig.json
```

### Struktur Direktori
```
/home/ariaajipw/Projects/projects/Pholio/
├── .astro/                 # Generated types (excluded by .gitignore)
├── pholio-docs/            # Documentasi tambahan (DESIGN-gpt.md, PROPOSAL.md, dll)
├── private-assets/
│   └── source/             # KOSONG - master photos belum ditambahkan
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── images/previews/    # KOSONG - preview belum dihasilkan
├── scripts/
│   └── optimize-images.mjs
├── src/
│   ├── components/         # Header, Footer, SEO
│   ├── config/site.ts      # Konfigurasi situs lengkap
│   ├── content/            # products.json, gallery.json
│   ├── layouts/BaseLayout.astro
│   ├── lib/                # format-price.ts, wa-formatter.ts
│   ├── pages/              # 9 halaman (index, gallery, shop, products/[id], about, contact, 404)
│   └── styles/global.css   # Design tokens + utilities
├── .gitignore              # Meng-exclude private-assets/, node_modules, dist, .astro, secrets
├── astro.config.mjs        # Astro + Tailwind v4 via @tailwindcss/vite
├── package.json            # Node >=22.22.0, Astro 7.4, Tailwind 4.1, Sharp 0.35
├── package-lock.json
├── tsconfig.json           # Extends astro/tsconfigs/strict
└── README.md               # Masih template Astro default (belum disesuaikan)
```

### Package.json
- **Node engine:** `>=22.22.0` ✓
- **Dependencies:** `astro: ^7.4.0` ✓
- **DevDependencies:** `@astrojs/check: ^0.9.10`, `@tailwindcss/vite: ^4.1.0`, `sharp: ^0.35.5`, `tailwindcss: ^4.1.0`, `typescript: ^6.0.3` ✓
- **Scripts:** `dev`, `build`, `preview`, `astro` ✓

### .gitignore
- Excludes: `dist/`, `.astro/`, `node_modules/`, logs, `.env*`, `.DS_Store`, `.idea/`, `.vscode/`
- **Critical:** `private-assets/` excluded ✓
- Excludes secrets: `*.pem`, `*.key`, `*.secret`, `*.token`, `*credentials*` ✓

---

## B. AUDIT IMPLEMENTASI A1 (SCAFFOLD DAN KONFIGURASI)

| Item A1 | Status | Bukti |
|---------|--------|-------|
| Node version ditetapkan | ✅ Selesai | `package.json: "engines": { "node": ">=22.22.0" }` |
| Scaffold Astro + TypeScript | ✅ Selesai | `tsconfig.json` extends `astro/tsconfigs/strict`, 0 errors pada `astro check` |
| Tailwind CSS v4 via `@tailwindcss/vite` | ✅ Selesai | `astro.config.mjs` menggunakan plugin tailwindcss, `global.css` menggunakan `@import "tailwindcss"` + `@theme` |
| Script dev/build/preview | ✅ Selesai | `package.json` scripts lengkap |
| Struktur direktori per ARCHITECTURE.md | ✅ Selesai | Semua folder & file sesuai rencana |
| .gitignore untuk foto master | ✅ Selesai | `private-assets/` tercantum |

**Yang benar-benar sudah diimplementasikan (A1):** Semua item checklist A1 terpenuhi. Konfigurasi Astro, TypeScript strict, Tailwind v4, struktur direktori, dan .gitignore sudah benar.

**Yang baru berupa kerangka/placeholder:** README.md masih template Astro default, belum disesuaikan dengan proyek Pholio.

**Belum diverifikasi:** Build production (`npm run build`) belum dijalankan dalam audit ini (hanya dilaporkan berhasil sebelumnya).

**Pekerjaan di luar scope A1:** Banyak komponen A3 (Header, Footer, SEO, BaseLayout, 9 halaman, library utilitas) sudah dibuat di fase A1. Ini **bukan masalah** selama implementasinya benar, tetapi perlu diverifikasi kesesuaian dengan DESIGN.md dan ARCHITECTURE.md.

---

## C. IMPLEMENTASI A2 YANG SUDAH ADA DAN BELUM ADA

### A2 yang SUDAH diimplementasikan (di luar scope A1):

| File/Fitur | Status | Catatan |
|------------|--------|---------|
| `scripts/optimize-images.mjs` | ✅ Lengkap | Pipeline Sharp dengan watermark, resize, WebP output |
| `src/content/products.json` | ✅ Lengkap | 3 produk contoh dengan struktur valid |
| `src/content/gallery.json` | ✅ Lengkap | 6 item galeri dengan kategori, alt, productId |
| `private-assets/source/` | ⚠️ Ada tapi KOSONG | Direktori ada, belum ada master photos |
| `public/images/previews/` | ⚠️ Ada tapi KOSONG | Output directory exists |

### A2 yang BELUM diimplementasikan / BELUM diverifikasi:

| Item A2 | Status | Blokir |
|---------|--------|--------|
| Master photos di `private-assets/source/` | ❌ Belum | Harus ditambahkan manual oleh user |
| Jalankan `node scripts/optimize-images.mjs` | ❌ Belum | Butuh master photos dulu |
| Verifikasi output preview WebP + watermark | ❌ Belum | Butuh menjalankan script |
| Verifikasi master tidak masuk ke public/dist/Git | ❌ Belum | Butuh build & cek artefak |
| Validasi ID unik, checkout URL, path gambar, harga, kategori, alt | ⚠️ Partial | JSON valid tapi checkout URL placeholder |
| Preview tersedia saat deploy | ❌ Belum | Preview kosong, belum di-commit/generate |

---

## D. IMPLEMENTASI A3 YANG SUDAH ADA DAN BELUM ADA

### A3 yang SUDAH diimplementasikan (di luar scope A1):

| Komponen/Halaman | Status | Kesesuaian DESIGN.md |
|------------------|--------|---------------------|
| `Header.astro` (2 varian) | ✅ Lengkap | `centered-wordmark` (Editorial) & `split-nav` (Bold) ✓ |
| `Footer.astro` | ✅ Lengkap | Kontak, sosial, navigasi, copyright ✓ |
| `SEO.astro` | ✅ Lengkap | Meta, OG, Twitter, canonical, structured data, favicon ✓ |
| `BaseLayout.astro` | ✅ Lengkap | Header, main, footer, whatsapp-floating conditional ✓ |
| `index.astro` (Hero overlap + stagger) | ✅ Lengkap | Dua varian hero per DESIGN.md §6.1 ✓ |
| `gallery.astro` (Grid + FilterBar) | ✅ Lengkap | Filter client-side, caption overlay, grid responsif ✓ |
| `shop/index.astro` | ✅ Lengkap | Kartu produk seragam, harga, badge featured ✓ |
| `products/[id].astro` (getStaticPaths) | ✅ Lengkap | Static generation, breadcrumb, sticky CTA mobile ✓ |
| `about.astro` | ✅ Lengkap | Profil, detail kontak, CTA ✓ |
| `contact.astro` | ✅ Lengkap | WhatsApp, email, sosial, jam operasional ✓ |
| `404.astro` | ✅ Lengkap | 404 code besar, link ke galeri & beranda ✓ |
| `format-price.ts` | ✅ Lengkap | Intl.NumberFormat, IDR default ✓ |
| `wa-formatter.ts` | ✅ Lengkap | buildWhatsAppUrl, encodeURIComponent ✓ |
| `global.css` (design tokens) | ✅ Lengkap | 2 preset tema, typography scale, buttons, grid-lines ✓ |

### A3 yang BELUM diimplementasikan / BELUM diverifikasi:

| Fitur | Status | Catatan |
|-------|--------|---------|
| Lightbox | ⚠️ CSS saja | `.lightbox-overlay` & `.lightbox-close` ada di global.css tapi **komponen `Lightbox.astro` tidak ada** dan **tidak di-integrasikan** ke gallery |
| Filter kategori | ⚠️ Parsial | UI ada di gallery.astro tapi `features.filter = false` di site.ts (default off) |
| GridLines component | ⚠️ CSS saja | `.grid-lines` ada di global.css tapi **komponen terpisah tidak ada** dan tidak di-inject ke layout |
| ViewSwitcher (grid/stack) | ❌ Belum | DESIGN.md §7.6: P2, belum diperlukan untuk MVP |
| Entrance Motion (M1) | ❌ Belum | `features.entranceMotion = false` default, tidak diimplementasikan |
| Sitemap generation | ❌ Belum | Tidak ada `@astrojs/sitemap` integration |
| Open Graph default image | ❌ Belum | `/og-default.jpg` dirujuk SEO.astro tapi file tidak ada |
| Apple touch icon / site.webmanifest | ❌ Belum | Dirujuk SEO.astro tapi file tidak ada di `public/` |
| Favicon generation | ⚠️ Parsial | Hanya `favicon.ico` & `favicon.svg` dasar |

---

## E. HASIL VALIDASI JSON

### products.json (3 item)

| Validasi | Hasil | Detail |
|----------|-------|--------|
| JSON parseable | ✅ Ya | Valid JSON |
| ID unik & tidak kosong | ✅ Ya | `bromo-sunrise-license`, `portrait-session-basic`, `landscape-print-a3` |
| Struktur konsisten | ✅ Ya | Semua field wajib ada |
| Harga angka valid & ≥0 | ✅ Ya | 350000, 1500000, 750000 |
| Type: `digital` \| `physical` | ✅ Ya | 1 digital, 2 physical |
| Kategori konsisten | ✅ Ya | `landscape`, `portrait` |
| Alt text (via gallery) | ✅ Ya | Gallery memiliki alt text deskriptif |
| Path preview konvensi | ✅ Ya | `/images/previews/{id}-wm.webp` |
| Referensi gambar ada | ❌ **Tidak** | File preview **belum dihasilkan** (directory kosong) |
| Referensi produk dari galeri valid | ✅ Ya | 3 productId cocok dengan products.json |
| Checkout URL placeholder | ⚠️ **YA - MASALAH** | `https://example.invalid/payment-link` **bukan URL produksi** |
| WhatsApp URL kosong | ⚠️ **YA** | `checkout.url: ""` untuk provider whatsapp |

**Kesimpulan products.json:** Struktur data valid, tapi **checkout URL menggunakan placeholder yang tidak bisa dipakai produksi**. Harus diganti dengan URL Mayar/WhatsApp yang diverifikasi klien sebelum deploy.

### gallery.json (6 item)

| Validasi | Hasil | Detail |
|----------|-------|--------|
| JSON parseable | ✅ Ya | Valid JSON |
| ID unik & tidak kosong | ✅ Ya | 6 ID unik |
| Struktur konsisten | ✅ Ya | Semua field wajib ada |
| Kategori konsisten | ✅ Ya | landscape, portrait, street, event, fashion |
| Alt text deskriptif | ✅ Ya | Semua alt menjelaskan isi visual |
| Path preview konvensi | ✅ Ya | `/images/previews/{id}-wm.webp` |
| Referensi gambar ada | ❌ **Tidak** | File preview **belum dihasilkan** |
| productId valid (jika ada) | ✅ Ya | 3 item punya productId, 3 tanpa (tidak dijual) |

---

## F. AUDIT PIPELINE GAMBAR (`scripts/optimize-images.mjs`)

### Konfigurasi Pipeline
| Parameter | Nilai | Catatan |
|-----------|-------|---------|
| Input dir | `private-assets/source/` | ✓ Sesuai ARCHITECTURE.md |
| Output dir | `public/images/previews/` | ✓ Sesuai ARCHITECTURE.md |
| Format output | `['webp']` | ✓ Baseline WebP, AVIF optional |
| WebP quality | 82 | ✓ Reasonable |
| Max preview | 1920×1080 | ✓ Sesuai DESIGN.md performa |
| Watermark enabled | `true` | ✓ Default on |
| Watermark text | `© Pholio` → diganti `© {photographer}` | ✓ Ambil dari site config |
| Watermark position | `bottom-right` | ✓ Default reasonable |
| Supported input | jpg, jpeg, png, tiff, heic/heif | ✓ Lengkap |

### Keamanan & Ketahanan Pipeline

| Aspek | Status | Temuan |
|-------|--------|--------|
| Validasi file input | ⚠️ Parsial | Hanya filter ekstensi, tidak validasi magic bytes/MIME |
| Input directory kosong | ✅ Ditangani | Exit code 0 dengan pesan "No image files found" |
| Penanganan error per file | ✅ Ada | Try-catch per file, continue processing, summary di akhir |
| Path traversal protection | ❌ **TIDAK ADA** | `path.join(SOURCE_DIR, file)` - **rentan directory traversal** jika filename mengandung `../` |
| Master photos ke public/ | ✅ Terhindar | Output ke `public/images/previews/`, input dari `private-assets/source/` terpisah |
| Master photos ke dist/ | ✅ Terhindar | Build Astro tidak menyalin `private-assets/` (di-ignore .gitignore & tidak di-import) |
| Overwrite protection | ⚠️ Tidak ada | `toFile()` akan menimpa tanpa warning jika nama sama |
| Deterministik output | ✅ Ya | Resize `inside` + `withoutEnlargement`, quality fixed |

### **MASALAH KRITIS (P0): Path Traversal Vulnerability**
```javascript
// Baris 203-204:
const inputPath = path.join(SOURCE_DIR, file);
// Jika file = "../../etc/passwd" atau "../../secret.jpg", 
// path.join akan resolve ke luar SOURCE_DIR
```
**Rekomendasi:** Gunakan `path.resolve()` dan verifikasi `inputPath.startsWith(SOURCE_DIR)` sebelum memproses.

### Masalah Lain (P1):
1. **Site config tidak dibaca** - Baris 172-174: `siteConfig = null`, komentar "We can't import TypeScript directly". Watermark pakai fallback `'© Pholio'` bukan nama fotografer klien.
2. **Watermark SVG positioning** - Baris 141-144: `gravity: 'southeast'` tapi SVG sudah positioning absolut via `x,y`. `gravity` akan diabaikan/konflik.
3. **Tidak ada cleanup output lama** - File lama di `public/images/previews/` tidak dihapus sebelum generate baru.
4. **Output naming** - Menggunakan `path.parse(file).name` langsung. Jika master: `IMG_1234.JPG` → preview: `IMG_1234.webp`. JSON pakai pola `{id}-wm.webp` (mis. `bromo-sunrise-wm.webp`). **Ketidaksesuaian naming convention**.

---

## G. AUDIT PERLINDUNGAN FOTO MASTER

### Lapisan Perlindungan

| Lapisan | Mekanisme | Status |
|---------|-----------|--------|
| **Git** | `.gitignore: private-assets/` | ✅ Aktif |
| **Build output (dist/)** | `private-assets/` tidak di-import, tidak di-`public/` | ✅ Terhindar |
| **Public directory** | Master di `private-assets/source/`, preview di `public/images/previews/` | ✅ Terpisah |
| **Pipeline script** | Baca dari `private-assets/source/`, tulis ke `public/images/previews/` | ✅ Terpisah |
| **Deployment (Cloudflare Pages)** | Hanya `dist/` di-deploy, `private-assets/` tidak masuk | ✅ Terhindar (asumsi build benar) |

### **RISIKO TETAP ADA (P1):**
1. **Human error:** Developer salah `cp` master ke `public/` manual
2. **Script bug:** Path traversal (lihat F) bisa baca file di luar `private-assets/`
3. **CI/CD misconfig:** Jika pipeline build dijalankan di environment yang mount `private-assets/` ke tempat yang salah
4. **No automated verification:** Tidak ada script/test yang memverifikasi "no master photos in dist/" setelah build

### Verifikasi yang DIPERLUKAN sebelum production:
- [ ] Jalankan build, cek `dist/` tidak ada file dari `private-assets/`
- [ ] Cek `public/images/previews/` hanya berisi WebP watermarked
- [ ] Tambahkan script verifikasi otomatis (mis. `node scripts/verify-no-master.mjs`)

---

## H. KONFLIK DOKUMENTASI DAN SCOPE

### 1. Filter & Lightbox: PROPOSAL.md vs DESIGN.md

| Dokumen | Paket Standard | Paket Plus |
|---------|----------------|------------|
| **PROPOSAL.md** (Tabel paket) | ✅ Filter kategori & Lightbox | ✅ (sudah termasuk) |
| **DESIGN.md** (§12 Matriks) | ❌ Tidak ada | ✅ Filter & Lightbox |

**KONFLIK TERKONFIRMASI.** DESIGN.md v2 (authoritative per AGENTS.md) menempatkan filter & lightbox di **Plus**, PROPOSAL.md menempatkan di **Standard**. 

**Dampak implementasi:** 
- `gallery.astro` sudah implementasi FilterBar (client-side)
- `site.ts` default `features.filter = false`, `features.lightbox = false`
- Lightbox CSS ada tapi komponen tidak ada

**Kepastian diperlukan sebelum A3 lanjutan:** Mana yang benar? DESIGN.md menang per AGENTS.md, tapi PROPOSAL.md adalah "sumber kebenaran bagi fitur/kuota yang dibayar" per TASKS.md.

### 2. Checkout External per Product
- ✅ `products.json` memiliki `checkout.provider` dan `checkout.url` per produk
- ✅ `products/[id].astro` menggunakan URL tersebut
- ✅ Tidak ada cart, backend, database, CMS

### 3. Fitur di luar scope MVP (PRD.md §6)
- ❌ Backend, database, auth, cart - **TIDAK DITEMUKAN** (baik)
- ❌ CMS - **TIDAK DITEMUKAN** (baik)
- ❌ Payment gateway API, webhook - **TIDAK DITEMUKAN** (baik)

### 4. README.md
- Masih template Astro default, **bukan dokumentasi Pholio**

---

## I. DAFTAR MASALAH BERDASARKAN PRIORITAS

### P0 — Risiko Keamanan / Kerusakan Data

| # | Masalah | Lokasi | Dampak |
|---|---------|--------|--------|
| P0-1 | **Path traversal vulnerability** di `optimize-images.mjs` | `scripts/optimize-images.mjs:203-204` | Bisa baca file sembarangan di filesystem jika filename berisi `../` |
| P0-2 | **Checkout URL placeholder** (`example.invalid`) di `products.json` | `src/content/products.json:13` | Jika deploy tanpa ganti, user diarahkan ke domain invalid |

### P1 — Harus Diperbaiki Sebelum Lanjut

| # | Masalah | Lokasi | Dampak |
|---|---------|--------|--------|
| P1-1 | Master photos belum ada di `private-assets/source/` | `private-assets/source/` (kosong) | Pipeline tidak bisa dijalankan, preview tidak tergenerate |
| P1-2 | Preview images belum dihasilkan | `public/images/previews/` (kosong) | Halaman akan menampilkan placeholder SVG, bukan foto |
| P1-3 | `site.ts` tidak dibaca pipeline untuk watermark | `scripts/optimize-images.mjs:172-174` | Watermark pakai `'© Pholio'` bukan nama fotografer klien |
| P1-4 | Naming convention mismatch | `optimize-images.mjs:204` vs `products.json:10` | Script output `IMG_1234.webp`, JSON expect `bromo-sunrise-wm.webp` |
| P1-5 | Lightbox komponen tidak ada | `src/components/Lightbox.astro` (missing) | Fitur lightbox (Plus package) tidak berfungsi |
| P1-6 | GridLines komponen tidak ada | `src/components/GridLines.astro` (missing) | Garis grid Bold preset tidak bisa diaktifkan via config |
| P1-7 | Sitemap generation tidak ada | `astro.config.mjs` | SEO incomplete, no sitemap.xml |
| P1-8 | OG default image & favicons missing | `public/og-default.jpg`, `apple-touch-icon.png`, `site.webmanifest` | SEO & PWA incomplete |
| P1-9 | Conflict filter/lightbox package placement | DESIGN.md vs PROPOSAL.md | Tidak jelas fitur mana aktif di paket mana |
| P1-10 | No automated verification master photos not in dist | — | Risiko kebocoran master tidak terdeteksi otomatis |

### P2 — Penyempurnaan Kemudian

| # | Masalah | Lokasi | Catatan |
|---|---------|--------|---------|
| P2-1 | README.md masih template Astro | `README.md` | Ganti dengan dokumen proyek Pholio |
| P2-2 | Input validation magic bytes | `optimize-images.mjs` | Tambah validasi file type bukan hanya ekstensi |
| P2-3 | Cleanup output directory before generate | `optimize-images.mjs` | Hapus file lama di `public/images/previews/` |
| P2-4 | Watermark SVG gravity conflict | `optimize-images.mjs:141-144` | Hapus `gravity` atau perbaiki positioning |
| P2-5 | ViewSwitcher (grid/stack) | DESIGN.md §7.6 | P2, implementasi nanti jika paket Plus |
| P2-6 | Entrance Motion (M1) | DESIGN.md §9 | P2, implementasi nanti jika paket Standard+ |
| P2-7 | Stack view gallery | DESIGN.md §7.6 | P2, implementasi nanti jika paket Plus |
| P2-8 | Index view (daftar tahun) | DESIGN.md §7.6 | Butuh field `year` di gallery.json (§15 DESIGN.md) |

---

## J. REKOMENDASI URUTAN PEKERJAAN BERIKUTNYA

### Tahap 1: Blocker Keamanan & Data (P0) — **HARUS DULU**
1. **Perbaiki path traversal** di `optimize-images.mjs` (tambah validasi `path.resolve` + `startsWith`)
2. **Siapkan master photos** minimal 6 file di `private-assets/source/` (sesuai gallery.json)
3. **Update checkout URLs** di `products.json` dengan URL Mayar/WhatsApp yang diverifikasi klien

### Tahap 2: Pipeline & Preview Generation (P1)
4. **Perbaiki pipeline** agar baca `site.ts` untuk watermark text (parse TypeScript atau buat config JSON terpisah)
5. **Align naming convention**: Ubah script output jadi `{id}-wm.webp` atau ubah JSON pakai nama file asli
6. **Jalankan `node scripts/optimize-images.mjs`** dan verifikasi output di `public/images/previews/`
7. **Verifikasi build** (`npm run build`) dan cek `dist/` tidak ada master photos

### Tahap 3: Fitur Paket & Komponen Hilang (P1)
8. **Putuskan conflict filter/lightbox** (baca DESIGN.md sebagai authoritative, tapi konfirmsi dengan stakeholder)
9. **Implementasikan Lightbox.astro** jika paket Plus diaktifkan
10. **Implementasikan GridLines component** (inject ke layout saat `features.gridLines=true` & preset Bold)
11. **Tambah @astrojs/sitemap** integration ke `astro.config.mjs`
12. **Buat OG default image & favicons** di `public/`

### Tahap 4: QA & Verifikasi (A4)
13. **Jalankan Lighthouse** di 3 viewport (360, 768, 1200px) untuk halaman representatif
14. **Verifikasi aksesibilitas** (keyboard nav, focus visible, alt text, kontras)
15. **Test alur checkout** semua produk (Mayar + WhatsApp)
16. **Update README.md** dengan dokumentasi Pholio
17. **Commit & push** ke repo

---

## KESIMPULAN

**A1 scaffold benar-benar selesai dan solid.** Namun **banyak komponen A3 sudah dibuat di fase A1** — ini acceptable selama implementasinya benar (dan audit ini menemukan implementasi komponen & halaman **sangat lengkap & sesuai DESIGN.md**).

**Bloker utama untuk A2:** 
1. Master photos belum ada (harus disediakan user/klien)
2. Path traversal vulnerability di script optimasi (harus diperbaiki SEBELUM menjalankan script)
3. Checkout URL placeholder harus diganti URL produksi

**Conflict dokumentasi** (filter/lightbox di Standard vs Plus) **harus disepakati** sebelum implementasi fitur tersebut dilanjutkan.

**Tidak ada fitur di luar scope MVP** (backend, cart, CMS, dll) — baik.

---

**Catatan:** Audit ini **read-only**. Tidak ada file yang diubah. Semua temuan berdasarkan pemeriksaan kode aktual, bukan laporan sebelumnya.