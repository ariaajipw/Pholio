# ARCHITECTURE.md — Data, Halaman, Gambar, dan Checkout

## 1. Prinsip arsitektur

- Astro menghasilkan website statis untuk deploy ke Cloudflare Pages.
- Konten katalog dibaca dari `src/content/products.json` dan `src/content/gallery.json`.
- Setiap produk memiliki URL checkout eksternal yang ditentukan saat build.
- Tidak ada server aplikasi, database, autentikasi pembeli, cart multi-item, atau pencatatan pesanan internal.
- Penyedia pembayaran mengelola checkout dan proses transaksi. Website tidak menerima data kartu dan tidak memverifikasi transaksi sendiri.
- Default desain adalah preset **Bold** (hero `stagger`, header `split-nav`, filter/lightbox/GridLines aktif); preset **Editorial** tetap tersedia sebagai alternatif (lihat §10).

## 2. Alur foto: mana untuk ditampilkan vs mana untuk dijual/dikirim

Setiap foto punya **dua peran berbeda** dan keduanya memakai **folder berbeda**.

| Peran | Folder | Isi | Status Git | Dipakai untuk |
|---|---|---|---|---|
| **Master** (jual / kirim) | `private-assets/source/` | File asli resolusi penuh, tanpa watermark | **Diabaikan** — tidak pernah di-commit, di-`public/`, atau di `dist/` | File yang **dijual dan dikirim** ke pembeli (produk digital) atau sumber cetak (produk fisik) |
| **Preview** (tampil) | `public/images/previews/` | WebP hasil resize + watermark | Publik — di-commit / di-deploy | Hanya untuk **ditampilkan di website** (galeri, hero, kartu produk, lightbox) |

### 2.1 Foto untuk ditampilkan di website

- Hasil `scripts/optimize-images.mjs` (preview WebP ber-watermark) diletakkan di **`public/images/previews/`**.
- Path di `gallery.json` (`src`) dan `products.json` (`preview`) menunjuk ke sini, dengan pola `/images/previews/{nama}-wm.webp`.
- Halaman hanya merender `<img>` bila file preview tersebut benar-benar ada saat build (`src/lib/has-public-asset.ts`); bila belum ada, hanya frame placeholder yang tampil.

### 2.2 Foto untuk dijual / dikirim ke pembeli

- File **master** (resolusi penuh, tanpa watermark) diletakkan di **`private-assets/source/`** dan **tidak pernah** diunggah ke website.
- **Produk digital:** file master diunggah/dikelola langsung di provider pembayaran (mis. Mayar) sebagai produk digital; website tidak menyimpan, menyajikan, atau mengirim file master. Pembeli menerima file dari provider, bukan dari website.
- **Produk fisik:** cetakan diproduksi oleh fotografer/klien dari file master; website hanya menampilkan preview.

### 2.3 Aturan penting

1. **Watermark bukan pengaman.** Watermark di preview hanya penanda visual; bukan jaminan anti-pencurian dan bukan alasan menjual preview sebagai file kiriman.
2. **Jangan tertukar.** Preview tidak boleh dipakai sebagai file kiriman; master tidak boleh dipublikasikan.
3. **Pemeriksaan akhir build** memastikan master tidak masuk `dist/`, repositori, atau direktori publik.
4. `private-assets/` sudah terdaftar di `.gitignore`.

## 3. Struktur direktori

```text
portfolio-store/
├── README.md
├── PRD.md
├── AGENTS.md
├── TASKS.md
├── ARCHITECTURE.md
├── DESIGN.md
├── scripts/
│   ├── optimize-images.mjs        # pipeline Sharp: master → preview WebP + watermark
│   ├── validate-json.mjs          # validasi products.json & gallery.json
│   ├── generate-test-images.mjs   # gambar sintetis untuk uji pipeline (sementara)
│   └── generate-brand-assets.mjs  # og-default.jpg, apple-touch-icon, favicon demo
├── private-assets/           # sumber lokal (master); wajib diabaikan Git
│   └── source/
├── src/
│   ├── pages/
│   │   ├── index.astro
│   │   ├── gallery.astro
│   │   ├── shop/index.astro
│   │   ├── products/[id].astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   └── 404.astro
│   ├── components/
│   │   ├── Header.astro       # varian centered-wordmark | split-nav
│   │   ├── Footer.astro
│   │   ├── Lightbox.astro     # aktif hanya bila features.lightbox
│   │   ├── GridLines.astro    # dekoratif; preset Bold + features.gridLines
│   │   └── SEO.astro
│   ├── content/
│   │   ├── products.json
│   │   └── gallery.json
│   ├── config/
│   │   ├── site.json          # sumber konfigurasi bersama (Astro + script Node)
│   │   ├── site.ts            # akses typed ke site.json
│   │   ├── watermark.json     # watermark & parameter pipeline
│   │   └── images.json        # pemetaan nama sumber → nama preview
│   └── lib/
│       ├── format-price.ts
│       ├── wa-formatter.ts
│       └── has-public-asset.ts # cek keberadaan aset public saat build
└── public/
    ├── favicon.svg
    ├── favicon.ico
    ├── apple-touch-icon.png
    ├── og-default.jpg         # fallback Open Graph 1200×630 (aset demo)
    ├── robots.txt
    └── images/previews/       # preview saja; boleh dipublikasikan
```

Struktur ini adalah rancangan, bukan perintah untuk membuat semua berkas sekaligus. Sesuaikan rute berdasarkan scope paket; jangan membuat halaman yang tidak diperlukan. Berkas foto master tidak boleh berada di `public/` atau di folder yang di-commit.

## 4. Skema data produk

Contoh JSON valid untuk `src/content/products.json`:

```json
[
  {
    "id": "bromo-sunrise-license",
    "type": "digital",
    "title": "Bromo Sunrise — Lisensi Personal",
    "category": "landscape",
    "description": "Foto lanskap Bromo untuk penggunaan personal sesuai ketentuan lisensi.",
    "price": 350000,
    "currency": "IDR",
    "preview": "/images/previews/bromo-sunrise-wm.webp",
    "checkout": {
      "provider": "mayar",
      "url": "https://example.invalid/payment-link"
    },
    "licenseLabel": "Lisensi personal",
    "featured": true
  }
]
```

Ketentuan:

- `id` harus unik, stabil, huruf kecil, dan menggunakan tanda hubung.
- `type` hanya `digital` atau `physical`.
- `price` menggunakan angka tanpa pemisah ribuan; `currency` menentukan mata uangnya.
- `preview` hanya menunjuk file preview publik, bukan file master (lihat §2).
- `checkout.url` adalah URL checkout/WhatsApp yang sudah diverifikasi. Jangan menyimpan API secret di sini.
- `provider` menjelaskan jenis tujuan, misalnya `mayar`, `lemonsqueezy`, `gumroad`, `whatsapp`, atau `external`. Menambahkan provider ke tipe hanya boleh setelah ada kebutuhan nyata.
- Jangan menaruh Markdown link atau komentar `//` di file JSON.
- Jika ada harga khusus untuk ukuran atau ongkir, jelaskan di deskripsi atau gunakan alur WhatsApp yang disepakati; jangan pura-pura menghitung ongkir dalam website jika tidak ada integrasinya.
- Jangan menambahkan harga USD/IDR sekaligus kecuali website benar-benar memiliki strategi harga multi-mata-uang yang telah disetujui.

## 5. Skema data galeri

Contoh `src/content/gallery.json`:

```json
[
  {
    "id": "bromo-sunrise",
    "title": "Bromo Sunrise",
    "category": "landscape",
    "src": "/images/previews/bromo-sunrise-wm.webp",
    "alt": "Matahari terbit di atas lanskap pegunungan Bromo",
    "featured": true,
    "productId": "bromo-sunrise-license"
  }
]
```

- `productId` boleh tidak ada jika foto galeri tidak dijual sebagai produk.
- `src` menunjuk file preview publik (lihat §2).
- `featured` dipakai homepage untuk komposisi "Karya Pilihan".
- Field opsional `width`/`height` dapat ditambahkan untuk mempertahankan rasio asli (DESIGN §15); tanpa field ini, frame memakai rasio desain.
- Gunakan alt text yang menjelaskan isi visual; jangan menjejalkan kata kunci SEO.

## 6. Rute dan fungsi halaman

- `/` — identitas fotografer, hero image-first, karya pilihan, pengantar, CTA ke galeri/katalog.
- `/gallery` — galeri dan kategori foto; filter sisi klien dan lightbox bila flag aktif.
- `/shop` — daftar produk yang tersedia untuk dibeli.
- `/products/[id]` — template detail produk; Astro menghasilkan halaman statis per produk pada build. ID tak dikenal menghasilkan 404.
- `/about` — profil fotografer, bila masuk paket.
- `/contact` — kontak, media sosial, dan CTA WhatsApp.
- `/404` — halaman tidak ditemukan.

Daftar di atas adalah struktur starter lengkap. Paket Lite boleh menggabungkan konten atau menghilangkan rute; jumlah jenis halaman, URL, produk, dan foto harus dijelaskan terpisah dalam proposal. Satu template detail produk dapat menghasilkan beberapa URL statis dan tidak perlu didesain satu per satu.

## 7. Pipeline gambar

1. Foto master masuk ke `private-assets/source/` atau lokasi privat lain yang tidak dilacak Git.
2. `scripts/optimize-images.mjs` membaca sumber yang dipilih dan menghasilkan preview.
3. Output dapat mencakup resize, kompresi, format web, dan watermark yang tidak terlalu mengganggu.
4. Preview dipindahkan/ditulis ke `public/images/previews/` agar path statis sesuai dengan data JSON.
5. Preview publik di-commit bila itu cara distribusi yang dipilih, atau dihasilkan secara eksplisit dalam proses build dari sumber yang tersedia secara aman.
6. Pemeriksaan akhir memastikan master tidak berada pada artefak build, repositori, atau direktori publik.

Catatan: jangan menjalankan optimasi dua kali pada output yang sudah terkompresi tanpa alasan. Pilih pipeline yang deterministik agar hasil build tidak berubah tak terduga. WebP dapat menjadi output awal; AVIF hanya ditambahkan jika memberi manfaat dan dapat diuji dengan benar.

### 7.1 Konvensi penamaan file preview

- File preview mengikuti pola: `{outputBaseName}-wm.webp`
- `outputBaseName` ditentukan oleh pemetaan di `src/config/images.json` (field `mapping`)
- Jika tidak ada pemetaan, fallback menggunakan nama file sumber + suffix `-wm` (konfig di `src/config/images.json` → `fallback`)
- Contoh:
  - Source: `bromo-sunrise.jpg` → mapping → Output: `bromo-sunrise-wm.webp`
  - Source: `IMG_1234.jpg` (tanpa mapping) → fallback → Output: `IMG_1234-wm.webp`

Path di JSON (`products.json`, `gallery.json`) harus mengikuti pola `/images/previews/{outputBaseName}-wm.webp`.

### 7.2 Konfigurasi watermark (shared)

Konfigurasi watermark dibaca dari `src/config/watermark.json` agar bisa digunakan baik oleh:
- Astro/TypeScript (via `src/config/site.ts` yang me-referensikan `site.json`)
- Script Node.js (`scripts/optimize-images.mjs`)

Struktur `watermark.json`:
```json
{
  "watermark": {
    "enabled": true,
    "text": "© Pholio",
    "fontSize": 24,
    "fontColor": "rgba(255,255,255,0.7)",
    "position": "bottom-right",
    "padding": 20
  },
  "image": {
    "maxWidth": 1920,
    "maxHeight": 1080,
    "webpQuality": 82,
    "avifQuality": 50,
    "formats": ["webp"]
  },
  "naming": {
    "outputSuffix": "-wm",
    "outputFormat": "webp"
  }
}
```

Teks watermark menggunakan `siteConfig.photographer` dari `src/config/site.json` (fallback ke `watermark.text` jika tidak diisi). Ini memastikan watermark menampilkan nama fotografer klien, bukan nama starter.

### 7.3 Keamanan pipeline

- Validasi path menggunakan `path.resolve()` dan memastikan path resolved berada dalam `SOURCE_DIR`
- Pengecekan symlink: menolak file yang symlink target-nya di luar `SOURCE_DIR`
- Validasi format gambar menggunakan Sharp (deteksi magic bytes), bukan hanya ekstensi
- Hanya memproses file regular (bukan directory, bukan symlink ke luar)
- Error handling per-file: gagal satu file tidak menghentikan proses, log nama file dan alasan kegagalan

### 7.4 Render gambar di halaman (sejak A3.3)

- Halaman memakai `<img>` hanya bila file preview benar-benar ada saat build (`src/lib/has-public-asset.ts`). Bila belum ada, hanya frame placeholder yang dirender — tidak ada request 404 maupun error console.
- Frame `.photo-frame` memakai `aspect-ratio` tetap sehingga ruang layout sudah tersedia sebelum gambar dimuat (tidak ada CLS).
- Gambar hero (LCP) memakai `fetchpriority="high"` tanpa lazy; gambar di bawah fold memakai `loading="lazy"`.

## 8. Alur checkout

### Produk digital

1. Pengunjung membuka detail produk dan melihat preview, harga, serta lisensi.
2. Tombol pembelian membuka `checkout.url` pada provider eksternal.
3. Pembeli menyelesaikan checkout di platform tersebut.
4. Provider mengirimkan file/tautan download secara otomatis **hanya jika** fitur digital delivery telah tersedia, dikonfigurasi, dan diuji untuk akun/produk klien.
5. Website statis tidak mengetahui status pembayaran dan tidak boleh menampilkan klaim bahwa pembayaran sukses.

> **Mode demo (sejak A3.3):** bila `checkout.url` masih berisi `example.invalid`, halaman detail menampilkan tombol non-aktif "Checkout belum tersedia" (bukan tautan ke domain mati). Saat klien mengisi URL valid, tombol beli kembali aktif tanpa perubahan kode.

> **File yang dikirim ke pembeli adalah master** (resolusi penuh), bukan preview website. File master diunggah ke provider oleh klien; website tidak menyajikannya (lihat §2).

### Produk fisik dengan checkout standar

1. Pengunjung menekan tombol beli.
2. Provider eksternal mengumpulkan data dan pembayaran yang didukung.
3. Ongkir, alamat, dan pemenuhan pesanan ditangani sesuai kemampuan serta konfigurasi provider dan kewajiban klien.
4. Sebelum peluncuran, uji apakah metode kirim dan perhitungan ongkir yang dibutuhkan klien benar-benar tersedia.

### Produk fisik dengan ongkir/ukuran khusus

1. Tombol WhatsApp membuka pesan yang sudah diisi dengan nama produk.
2. Klien dan pembeli menyepakati ukuran, stok, ongkir, dan total akhir.
3. Klien mengirim invoice atau instruksi pembayaran melalui saluran yang mereka kelola.
4. Website tidak menghitung total atau merekam status pesanan.

## 9. Provider dan tanggung jawab

- Mayar adalah kandidat default untuk transaksi Indonesia.
- Lemon Squeezy/Gumroad dapat dipertimbangkan untuk produk digital internasional, tetapi bukan default MVP.
- Dukungan negara, KYC, payout, metode pembayaran, biaya, pajak, pengiriman file, dan aturan produk harus diverifikasi sebelum provider dijanjikan kepada klien.
- Akun dan dana harus dikelola langsung oleh klien. Klien menanggung biaya provider dan memastikan hak menjual konten/lisensi.
- URL pembelian disetel satu per produk. Tidak ada API pembayaran atau pembuatan link dinamis dari website.

## 10. SEO, aksesibilitas, dan performa

- Setiap halaman memiliki title dan description yang relevan, canonical URL saat domain produksi diketahui, metadata Open Graph, dan URL yang sesuai.
- Sertakan sitemap, `robots.txt`, dan halaman 404.
- Gambar harus mempunyai ukuran/rasio yang sesuai, dimensi bila dapat ditetapkan, dan alt text yang sesuai konteks.
- Hindari JavaScript berlebih dan elemen yang mengganggu render awal.
- Target Lighthouse untuk halaman representatif: minimal 75 mobile dan 80 desktop dengan pengujian konsisten; aksesibilitas minimal 90.
- Skor bukan pengganti QA: perbaiki broken links, isu keyboard/fokus, kontras yang jelas bermasalah, metadata hilang, dan kebocoran master.

### 10.1 Sitemap dan URL metadata

- `@astrojs/sitemap` menghasilkan `sitemap-0.xml`/`sitemap-index.xml` saat build; halaman 404 difilter keluar.
- `site` di `astro.config.mjs` dibaca dari `site.json` → `baseUrl`. Selama `baseUrl` kosong (demo), build memakai `http://localhost:4321` agar sitemap tetap dapat diverifikasi — bukan domain produksi buatan.
- `SEO.astro` memakai `baseUrl` bila diisi, atau origin permintaan aktual; canonical hanya dirender bila `baseUrl` terisi.
- Fallback Open Graph adalah `public/og-default.jpg` (1200×630, aset demo buatan sendiri). Tanpa PWA/manifest: referensi `site.webmanifest` sengaja tidak ada.
- `public/robots.txt` berisi `User-agent: * / Allow: /`; baris `Sitemap:` ditambahkan saat domain produksi diketahui.

### 10.2 Perilaku klik galeri

- Klik foto membuka lightbox **hanya** bila `features.lightbox` aktif; tanpa flag, foto adalah `<img>` biasa.
- Tautan ke detail produk adalah tautan eksplisit "Lihat detail produk" pada kartu yang punya `productId`; tersedia di kedua keadaan flag.
- `GridLines` aktif hanya bila `features.gridLines` AND preset `bold`; dekoratif (`aria-hidden`, `pointer-events: none`), di belakang konten, dan disembunyikan di bawah 1024 px.

### 10.3 Sistem tombol dan elemen melayang (sejak A3.2)

- Komponen memakai kelas netral `.btn-primary` / `.btn-secondary`; gaya mengikuti `data-theme-preset` di `<html>` (Editorial: solid + underline; Bold: outline tebal + bayangan keras, DESIGN §7.4). Class lama (`btn-primary-editorial`, `btn-secondary-editorial`, `btn-hard`) tetap didukung sebagai alias.
- Target sentuh minimal 44×44 px di header, footer, breadcrumb, filter, dan tautan detail.
- Tombol WhatsApp melayang disembunyikan otomatis (IntersectionObserver, tanpa dependency) saat footer terlihat agar tidak menutupi konten footer (DESIGN §7.8).

### 10.4 Homepage (preset Bold)

- Hero `stagger`: komposisi asimetris 5/7 (foto unggulan kiri, judul display dengan indentasi bertingkat kanan) mulai 1024 px; di bawahnya bertumpuk. Halaman `h1` adalah kalimat utuh yang terbaca ("Fotografi adalah cerita") — bukan salinan dekoratif ber-`aria-hidden`.
- "Karya Pilihan" dirender dari item `featured` di `gallery.json` (grid asimetris 7/5/5 di desktop), dengan fallback placeholder bila preview belum ada.
- Preset Editorial memakai hero `overlap`; keduanya memakai token dan komponen yang sama.

## 11. Status kesiapan produksi (checklist)

Sebelum deploy produksi, pastikan:

- [ ] `baseUrl` diisi domain produksi (untuk canonical + sitemap absolut).
- [ ] Foto master tersedia di `private-assets/source/` dan preview dihasilkan ke `public/images/previews/`.
- [ ] Semua `checkout.url` diisi URL terverifikasi (tidak ada `example.invalid`).
- [ ] Nama fotografer, kontak, dan copy demo diganti data klien asli.
- [ ] File master untuk produk digital diunggah ke provider pembayaran.
- [ ] Lighthouse diukur ulang dengan foto asli (performa demo saat ini belum representatif).
