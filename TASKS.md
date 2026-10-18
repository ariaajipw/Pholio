# TASKS.md — Roadmap Starter dan Proyek Klien

> Batas 30 jam berlaku untuk **implementasi per klien setelah starter dasar stabil dan teruji**. Waktu membangun starter pertama kali dicatat terpisah; jangan menyembunyikannya dalam estimasi proyek klien.

Sebelum mengerjakan tugas, gunakan `PRD.md` untuk scope/kriteria penerimaan, `ARCHITECTURE.md` untuk struktur dan alur data, serta `DESIGN.md` untuk arah visual. Proposal klien adalah sumber kebenaran bagi fitur/kuota yang dibayar.

## A. Persiapan starter satu kali

### A1. Keputusan dan scaffold
- [ ] Tetapkan versi Node yang didukung oleh versi Astro yang dipakai.
- [ ] Scaffold Astro + TypeScript.
- [ ] Pasang Tailwind CSS menggunakan integrasi yang sesuai dengan versi Tailwind terpilih.
- [ ] Pastikan script `dev`, `build`, dan `preview` tersedia.
- [ ] Buat struktur direktori yang disepakati di `ARCHITECTURE.md`.
- [ ] Siapkan `.gitignore` untuk dependency/build output, rahasia, dan direktori foto master.

### A2. Data dan gambar
- [x] Buat contoh valid `products.json` dan `gallery.json`.
- [x] Validasi ID unik, tautan checkout, path gambar, harga, kategori, dan alt text.
- [x] Implementasikan `scripts/optimize-images.mjs` memakai Sharp.
- [x] Uji output preview WebP (dan AVIF hanya jika diperlukan oleh pipeline yang dipilih) dengan watermark.
- [x] Pastikan master tidak disalin ke `public/`, Git, atau hasil build.
- [x] Pastikan preview yang digunakan saat deploy tersedia di repositori atau dapat dihasilkan dengan aman dalam lingkungan build.

### A3. Komponen dan halaman dasar
- [x] Header, navigasi, dan footer.
- [x] Layout halaman umum dan SEO metadata.
- [x] Grid galeri responsif.
- [x] Lightbox minimal bila diperlukan; gunakan JavaScript seminimal mungkin.
- [x] Template kartu produk dan halaman detail produk statis.
- [x] Tombol beli untuk URL checkout eksternal.
- [x] Tombol WhatsApp dengan teks pesan yang di-encode secara benar.
- [x] Beranda, galeri, katalog/toko, tentang, kontak, dan 404 sesuai scope starter.
- [x] Filter kategori hanya dijalankan di sisi klien dengan data statis; tidak ada cart state.
- [x] Sitemap dan Open Graph dasar.
- [ ] Uji build dan deployment demo.

### A4. Starter siap dipakai ulang
- [ ] Jalankan QA mobile/desktop pada halaman representatif.
- [ ] Perbaiki temuan kritis.
- [ ] Buat petunjuk singkat mengubah konfigurasi, data, foto preview, dan link checkout.
- [ ] Catat waktu pembuatan starter secara terpisah dari waktu proyek klien.

## B. Checklist implementasi per klien — target 28 jam + 2 jam buffer

| Tahap | Estimasi |
|---|---:|
| Intake, brief, pemeriksaan materi, dan kesiapan akun pembayaran | 2,5 jam |
| Salin starter, konfigurasi situs, merek, dan token desain | 2 jam |
| Beranda dan galeri: layout/grid, lightbox, filter sesuai paket | 7 jam |
| Katalog/detail produk dan tombol beli/WhatsApp | 5 jam |
| Tentang/kontak, SEO dasar, Open Graph, sitemap | 3 jam |
| Pengolahan gambar dan watermark preview | 2 jam |
| QA responsif, Lighthouse, tautan dan uji alur pembelian | 3 jam |
| Deploy, domain, analytics | 1,5 jam |
| Handover, video singkat, dan panduan | 2 jam |
| **Target pekerjaan** | **28 jam** |
| **Buffer risiko** | **2 jam** |
| **Batas internal** | **30 jam** |

Estimasi di atas adalah target awal yang harus dibandingkan dengan jam aktual. Penantian aktivasi/KYC provider, keterlambatan materi, dan waktu respons klien tidak boleh disamarkan sebagai jam coding; timeline kalender tetap perlu dijelaskan kepada klien.

### B1. Sebelum mulai
- [ ] Proposal disetujui tertulis dan DP 50% diterima.
- [ ] Paket, jumlah halaman/jenis halaman, jumlah listing, jumlah foto, revisi, dan pengecualian dikunci.
- [ ] Klien menyerahkan materi minimum yang lengkap.
- [ ] Klien memiliki akun provider pembayaran atas namanya sendiri.
- [ ] Status aktivasi, payout, produk, dan aturan file digital provider diverifikasi.
- [ ] Domain dan akun hosting disepakati.
- [ ] Tidak ada kredensial sensitif yang dikumpulkan lewat dokumen/chat.

### B2. Implementasi
- [ ] Isi konfigurasi situs dan metadata.
- [ ] Siapkan produk serta listing galeri dalam JSON.
- [ ] Siapkan preview melalui pipeline gambar.
- [ ] Implementasikan hanya halaman/fitur yang masuk proposal.
- [ ] Masukkan link checkout yang sudah diuji.
- [ ] Pastikan harga, lisensi, ongkir, dan teks CTA konsisten.
- [ ] Catat waktu aktual tiap tahap.

### B3. QA dan launch
- [ ] Periksa viewport 360 px, 768 px, dan 1200 px atau lebih.
- [ ] Uji navigasi keyboard, alt text, fokus, label, dan kontras yang relevan.
- [ ] Uji semua link checkout dan WhatsApp.
- [ ] Untuk produk digital, verifikasi alur pengiriman file pada provider; jangan menganggap tombol berfungsi sebagai bukti pembayaran berhasil.
- [ ] Untuk produk fisik, verifikasi checkout/ongkir atau alur pemesanan manual yang disepakati.
- [ ] Target Lighthouse halaman representatif: ≥75 mobile dan ≥80 desktop pada pengujian konsisten.
- [ ] Periksa metadata, Open Graph, sitemap, 404, dan canonical URL.
- [ ] Periksa artefak build agar tidak memuat foto master atau rahasia.
- [ ] Build produksi berhasil.
- [ ] Terima pelunasan sesuai proposal sebelum serah terima final/launch.
- [ ] Serahkan panduan dan jelaskan batas garansi/maintenance.

## C. Aturan scope dan eskalasi

- [ ] Jika estimasi menuju lebih dari 30 jam, berhenti sebelum memulai tambahan baru dan laporkan dampaknya.
- [ ] Tawarkan pilihan tertulis: mengurangi fitur, menambah biaya/waktu, atau memindahkan fitur ke fase berikutnya.
- [ ] Jangan menambahkan backend, CMS, cart, API pembayaran, provider baru, atau halaman tambahan tanpa persetujuan.
- [ ] Catat perubahan scope dan persetujuan di tempat yang dapat dirujuk.
- [ ] Setelah peluncuran, minta izin sebelum memakai website sebagai studi kasus/portofolio.
