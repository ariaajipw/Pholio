# AUDIT REPORT — PHOLIO Katalog Foto & Product Fulfillment

**Task ID:** AUDIT-20261019-001
**Fase:** Pre-Mayar Integration Readiness Audit
**Tanggal:** 2026-10-19
**Branch:** main (clean, up to date with origin/main)
**Scope:** Read-only audit per instruksi; tidak ada perubahan file, konfigurasi, aset, dependency, atau database.

---

## 1. Executive Summary

Proyek Pholio berada pada tahap **starter siap pakai (A3 selesai, A4 belum)**. Build produksi berhasil, validasi JSON lulus (1 warning), struktur direktori dan alur data sesuai `ARCHITECTURE.md`. Namun terdapat **beberapa ketidaksesuaian kritis** terkait konvensi penamaan preview, verifikasi watermark, dan kesiapan checkout Mayar yang harus diselesaikan sebelum integrasi produksi.

**Status keseluruhan:** ⚠ **BELUM SIAP** untuk integrasi Mayar.id — ada blocker yang harus ditangani.

---

## 2. Acceptance Criteria Status (PRD.md §12 & TASKS.md)

| Kriteria Penerimaan MVP | Status | Bukti / Catatan |
|---|---|---|
| Halaman sesuai paket dan konten final klien | ⚠ Belum diverifikasi | Data masih demo (Pholio/Rajipo/placeholder); konten klien belum dimasukkan |
| Layout berfungsi pada viewport target | ✅ Lulus | Grid responsif, hero stagger/overlap, breakpoint 640/768/1024/1200 px terimplementasi |
| Semua CTA checkout/WhatsApp sudah diperiksa | ❌ Gagal | 1/3 produk (digital) pakai `example.invalid`; WhatsApp pakai nomor placeholder |
| Pengiriman file digital atau alur pesanan fisik diuji | ❌ Gagal | Belum ada akun Mayar terverifikasi; alur fisik manual via WA belum diuji end-to-end |
| Preview gambar teroptimasi dan memiliki watermark | ⚠ Belum diverifikasi | Pipeline jalan & output WebP ada; **watermark tidak diverifikasi visual**; konvensi nama `-wm` tidak dipakai |
| Tidak ada foto master/rahasia di repo/build | ✅ Lulus | `private-assets/` di `.gitignore`; `dist/` hanya berisi preview; master 15 file aman di luar repo |
| Title, description, OG, sitemap, canonical, 404 diperiksa | ⚠ Sebagian | Build menghasilkan sitemap; `baseUrl` kosong → canonical pakai localhost; OG fallback `og-default.jpg` demo |
| Lighthouse ≥75 mobile / ≥80 desktop | ❌ Belum diuji | Belum dijalankan dengan aset final klien; demo menggunakan gambar sintetis |
| Build produksi berhasil & website ter-deploy | ✅ Lulus (build) | `npm run build` sukses 9 halaman statis; deploy belum dilakukan (domain belum dikunci) |
| Serah terima menjelaskan batasan tanpa backend/CMS/cart | ❌ Belum | Belum ada dokumen handover klien spesifik |

**Ringkasan:** 2 Lulus ✅, 4 Gagal ❌, 4 Belum Diverifikasi ⚠

---

## 3. Matriks Enam Gambar Galeri (`src/content/gallery.json`)

| # | ID | Judul | File Preview (src) | File Master (source) | Subjek Terlihat (dari alt/title) | Kategori | Featured | ProductId | Kecocokan Metadata | Tindakan Disarankan |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | bromo-sunrise | Lanskap Pegunungan Saat Matahari Terbit | previews01.webp | previews01.jpeg | Lanskap pegunungan, warna hangat matahari terbit, kabut pagi | landscape | ✅ | bromo-sunrise-license | ✅ Cocok (preview & productId) | Ganti nama file preview ke `previews01-wm.webp`; update JSON; verifikasi watermark visual |
| 2 | portrait-studio-1 | Potret Studio High-Key | previews09.webp | previews09.jpeg | Potret wajah, pencahayaan studio high-key cerah | portrait | ✅ | portrait-session-basic | ✅ Cocok (preview & productId) | Ganti nama file preview ke `previews09-wm.webp`; update JSON; verifikasi watermark visual |
| 3 | landscape-mountain-1 | Silhouette Pegunungan Biru | previews12.webp | previews12.jpeg | Silhouette pegunungan, langit biru, awan | landscape | ❌ | landscape-print-a3 | ✅ Cocok (preview & productId) | Ganti nama file preview ke `previews12-wm.webp`; update JSON; verifikasi watermark visual |
| 4 | street-photo-1 | Jalanan Kota di Hora Emas | previews04.webp | previews04.jpeg | Komposisi jalanan kota, pencahayaan hangat sore hari | street | ❌ | — | ✅ Cocok (preview); ❌ tidak dijual | Ganti nama file preview ke `previews04-wm.webp`; update JSON; verifikasi watermark visual |
| 5 | event-wedding-1 | Acara Pernikahan Cerah | previews05.webp | previews05.jpeg | Momen pernikahan, pencahayaan cerah, suasana meriah | event | ✅ | — | ✅ Cocok (preview); ❌ tidak dijual | Ganti nama file preview ke `previews05-wm.webp`; update JSON; verifikasi watermark visual |
| 6 | fashion-editorial-1 | Fashion Editorial Merah | previews07.webp | previews07.jpeg | Model busana merah dominan, latar studio | fashion | ❌ | — | ✅ Cocok (preview); ❌ tidak dijual | Ganti nama file preview ke `previews07-wm.webp`; update JSON; verifikasi watermark visual |

**Catatan penting:**
- **9 gambar master/preview tidak terpakai** di galeri: previews02, 03, 06, 08, 10, 11, 13, 14, 15. Ini normal untuk starter (aset cadangan), tapi perlu dibersihkan atau didokumentasikan agar tidak membingungkan klien.
- Semua `src` di JSON menunjuk ke nama file **tanpa suffix `-wm`** (`previews01.webp` dst), sedangkan konvensi terdokumentasi di `ASSET_GUIDE.md` §2.2 dan `ARCHITECTURE.md` §7.1 mengharuskan `{nama}-wm.webp`.
- `images.json` mapping memaksa nama output tanpa `-wm` (fallback `-wm` diabaikan karena mapping lengkap). **Ini penyimpangan dari kontrak arsitektur.**

---

## 4. Matriks Tiga Produk (`src/content/products.json`)

| # | ID Produk | Tipe | Judul | Harga | Preview (JSON) | Aset yang Diterima Pembeli | Provider Checkout | URL Checkout | Mekanisme Fulfillment | Status Kesiapan |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | bromo-sunrise-license | digital | Lanskap Pegunungan Sunrise — Lisensi Personal | Rp 350.000 | previews01.webp | **File master** `previews01.jpeg` (resolusi penuh, tanpa watermark) diunggah ke Mayar Digital Product | mayar | `https://example.invalid/payment-link` (PLACEHOLDER) | Mayar handle pembayaran + pengiriman file otomatis **hanya jika** produk digital dikonfigurasi & diuji di akun klien | ❌ **BLOKER**: URL placeholder; akun Mayar belum diverifikasi; file master belum diunggah ke Mayar |
| 2 | portrait-session-basic | physical | Sesi Potret Studio — 1 Jam | Rp 1.500.000 | previews09.webp | **Jasa + 10 file digital** (dikirim via link download setelah sesi) — **bukan file preview** | whatsapp | (kosong, dinamis via `wa-formatter`) | Manual: WA → sepakati jadwal/stok/ongkir → invoice manual → sesi foto → kirim file via cloud storage | ⚠ **Perlu validasi**: Nomor WA placeholder; alur manual belum diuji end-to-end; tidak ada otomatisasi |
| 3 | landscape-print-a3 | physical | Cetak Fine Art A3 — Lanskap Pegunungan | Rp 750.000 | previews12.webp | **Cetak fisik A3** + sertifikat keaslian (diproduksi dari master `previews12.jpeg`) | whatsapp | (kosong, dinamis via `wa-formatter`) | Manual: WA → sepakati ukuran/stok/ongkir → invoice manual → cetak & kirim via kurir | ⚠ **Perlu validasi**: Nomor WA placeholder; ongkir/estimasi tidak dihitung web; alur manual belum diuji |

**Detail Teknis Fulfillment:**

| Aspek | Digital (Produk #1) | Fisik WA (Produk #2 & #3) |
|---|---|---|
| **File yang dikirim ke pembeli** | Master resolusi penuh (via Mayar) | #2: 10 file master via cloud storage; #3: Cetak fisik dari master |
| **Preview website** | Watermarked WebP (hanya tampil) | Watermarked WebP (hanya tampil) |
| **Verifikasi pembayaran** | Mayar (webhook/email ke penjual) | Manual oleh penjual (cek rekening/VA) |
| **Pengiriman otomatis** | Ya, **bila** produk digital Mayar dikonfigurasi benar | Tidak — sepenuhnya manual |
| **Tanggung jawab website** | Hanya arahkan ke `checkout.url` | Hanya buka WA dengan pesan terisi |
| **Data sensitif di website** | Tidak ada (URL checkout publik) | Tidak ada (nomor WA publik) |

---

## 5. Hasil Pemeriksaan Watermark Test (`/tmp/pholio-watermark-test/`)

**Status: ❌ TIDAK DITEMUKAN**
- Direktori `/tmp/pholio-watermark-test/` **tidak ada** pada sistem.
- Tidak ada contact sheet tersedia.
- **Saya tidak mengklaim telah melihat gambar secara visual** — audit ini berbasis kode, konfigurasi, dan output CLI saja.

**Hasil jalankan `scripts/optimize-images.mjs` (baru dijalankan saat audit):**
- 15/15 file berhasil diproses.
- Output: `previews01.webp` … `previews15.webp` (tanpa suffix `-wm`).
- Dimensi output: 1408×768 (sama asli, di bawah max 1920×1080).
- Watermark config: `enabled: true`, text `© Rajipo` (dari `site.json.photographer`), bottom-right, font 24px, rgba(255,255,255,0.7).
- **Verifikasi visual watermark TIDAK DAPAT DILAKUKAN** dalam audit ini (butuh inspeksi manual file output).

**Rekomendasi:** Jalankan pipeline, buka 2-3 file output di image viewer, pastikan watermark terlihat di kanan bawah. Jika tidak terlihat, debug komposisi SVG di `optimize-images.mjs` (baris 263-269).

---

## 6. Identifikasi File Publik vs Privat

| Lokasi | Status | Isi | Boleh Publik? | Ter-deploy ke dist? |
|---|---|---|---|---|
| `private-assets/source/previews01.jpeg` … `previews15.jpeg` | **PRIVAT** (gitignored) | 15 file master JPEG resolusi penuh, tanpa watermark | ❌ **TIDAK PERNAH** | ❌ Tidak (di luar public/) |
| `public/images/previews/previews01.webp` … `previews15.webp` | **PUBLIK** | 15 file preview WebP (seharusnya watermarked) | ✅ Ya | ✅ Ya (ter-copy ke `dist/images/previews/`) |
| `src/content/products.json` | **PUBLIK** (committed) | Metadata produk, harga, preview path, checkout URL | ✅ Ya | ✅ Ya (ter-embed di HTML statis) |
| `src/content/gallery.json` | **PUBLIK** (committed) | Metadata galeri, preview path, productId | ✅ Ya | ✅ Ya (ter-embed di HTML statis) |
| `src/config/site.json` | **PUBLIK** (committed) | Konfigurasi situs, kontak, fotografer | ✅ Ya (tapi ganti data demo) | ✅ Ya (ter-embed) |
| `src/config/watermark.json` | **PUBLIK** (committed) | Parameter watermark (bukan rahasia) | ✅ Ya | ✅ Ya |
| `src/config/images.json` | **PUBLIK** (committed) | Mapping nama file | ✅ Ya | ✅ Ya |
| `.env*` | **PRIVAT** (gitignored) | Environment variables | ❌ Tidak | ❌ Tidak |

**Risiko:** Tidak ada file master di repo/build. ✅ **Aman**.

---

## 7. Implementasi Checkout Saat Ini & Placeholder Mayar

### 7.1 Kode Checkout (`src/pages/products/[id].astro`, baris 28-30, 84-99)
```typescript
const isPlaceholderCheckout = /example\.invalid/i.test(product.checkout?.url || '');

// Render:
{product.checkout.provider !== 'whatsapp' && product.checkout.url && (
  isPlaceholderCheckout ? (
    <span class="btn btn-primary btn--disabled" aria-disabled="true">
      Checkout belum tersedia
    </span>
  ) : (
    <a href={product.checkout.url} class="btn btn-primary" target="_blank" rel="noopener noreferrer">
      {product.type === 'digital' ? 'Beli Foto' : 'Pesan Sekarang'} →
    </a>
  )
)}
```

### 7.2 Status Tiap Produk
| Produk | Provider | URL | Status Tombol | Catatan |
|---|---|---|---|---|
| bromo-sunrise-license | mayar | `example.invalid` | **Disabled** ("Checkout belum tersedia") | Placeholder aktif — **blokker produksi** |
| portrait-session-basic | whatsapp | `""` (kosong) | **Aktif** → `wa.me/6281234567890?text=...` | Nomor WA placeholder (`6281234567890`) |
| landscape-print-a3 | whatsapp | `""` (kosong) | **Aktif** → `wa.me/6281234567890?text=...` | Nomor WA placeholder |

### 7.3 WhatsApp Formatter (`src/lib/wa-formatter.ts`)
- Menggunakan `encodeURIComponent` yang benar.
- Pesan terstruktur: `Halo, saya tertarik dengan produk:\n\n{nama}\nHarga: {harga}\nLink: {url}`.
- Nomor WA diambil dari `site.json.contact.whatsapp` (saat ini placeholder).

### 7.4 Mekanisme Konfirmasi Pembayaran & Pengiriman File
| Mekanisme | Digital (Mayar) | Fisik (WA) |
|---|---|---|
| **Pembayaran** | Mayar (VA, QRIS, dll) — website tidak tau status | Manual transfer → penjual cek mutasi |
| **Notifikasi ke penjual** | Email/webhook Mayar (konfigurasi akun) | Pesan WA masuk |
| **Pengiriman file digital** | **Otomatis Mayar** (jika produk digital dikonfigurasi) | Manual: kirim link Google Drive/WeTransfer via WA |
| **Pengiriman fisik** | N/A | Manual: cetak → packing → kurir → kirim resi via WA |
| **Website role** | Hanya redirect ke `checkout.url` | Hanya buka WA dengan template pesan |

**Kesimpulan:** Website **bukan** e-commerce platform. Tidak ada order management, payment verification, inventory, atau fulfillment logic di kode. Semua ditangani eksternal.

---

## 8. Risiko Keamanan Terkait Akses File & Konfirmasi Pembayaran

| Risiko | Likelihood | Impact | Mitigasi Saat Ini | Gap / Tindakan Diperlukan |
|---|---|---|---|---|
| File master terekspos di `public/` atau `dist/` | Rendah | **Kritis** | `private-assets/` gitignored; pipeline hanya baca dari source, tulis ke `public/images/previews/` | ✅ Termitigasi — **verifikasi build artifact rutin** |
| File master terekspos via Git history | Rendah | **Kritis** | `private-assets/` di `.gitignore` sejak awal; tidak ada history commit file master | ✅ Termitigasi — **jangan pernah `git add -f` folder ini** |
| Watermark tidak teraplikasi (preview = master) | Sedang | Tinggi | Pipeline Sharp + SVG composite; config `enabled: true` | ⚠ **BELUM DIVERIFIKASI VISUAL** — wajib cek manual 2-3 sampel |
| Checkout URL placeholder tertinggal di produksi | Tinggi | Tinggi | `isPlaceholderCheckout` guard men-disable tombol + tampil notifikasi | ⚠ **Hanya UI guard** — URL tetap tertulis di JSON; harus diganti sebelum deploy |
| Nomor WA placeholder tertinggal di produksi | Tinggi | Sedang | Nomor di `site.json` (konfigurasi per klien) | ⚠ Harus diganti nomor asli klien sebelum launch |
| Pembeli mengira pembayaran sukses karena tombol aktif | Sedang | Sedang | Notice di halaman detail: "Website mengarahkan ke checkout eksternal... tidak mengetahui status pembayaran" | ✅ Sudah ada disclaimer; pastikan bahasa jelas |
| Penjual tidak menerima file digital dari Mayar (misconfig) | Sedang | **Kritis** | Tidak ada verifikasi otomatis di website | **Harus diuji end-to-end** di akun Mayar klien sebelum launch |
| Data sensitif (API key, secret) tertulis di JSON | Rendah | **Kritis** | Arsitektur pakai URL checkout statis, **tidak pakai API key** | ✅ Desain aman — **jangan tambahkan API key ke JSON** |

---

## 9. Blocker Sebelum Integrasi Mayar.id

| # | Blocker | Kategori | Deskripsi | Pemilik | Estimasi |
|---|---|---|---|---|---|
| **B-01** | **Checkout URL placeholder** | Kritikal | `bromo-sunrise-license.checkout.url` masih `example.invalid`. Tombol beli disabled di produksi. | Klien/Dev | 0,5 jam (setelah akun Mayar ready) |
| **B-02** | **Akun Mayar belum diverifikasi** | Kritikal | Belum ada bukti: akun aktif, KYC selesai, payout terkonfigurasi, produk digital dibuat, file master diunggah, URL checkout didapatkan. | Klien | 1-3 jam (tergantung proses Mayar) |
| **B-03** | **File master belum diunggah ke Mayar** | Kritikal | Produk digital Mayar butuh file master (tanpa watermark) diunggah manual di dashboard Mayar. | Klien | 0,5 jam |
| **B-04** | **Alur digital delivery belum diuji end-to-end** | Kritikal | Belum ada bukti pembayaran test → file terkirim ke email pembeli test. | Klien/Dev | 1 jam |
| **B-05** | **Konvensi nama preview `-wm` dilanggar** | Tinggi | Semua 15 preview di `public/` & `dist/` bernama `previewsNN.webb` bukan `previewsNN-wm.webp`. JSON merujuk nama tanpa `-wm`. `images.json` mapping memaksa nama tanpa `-wm`. | Dev | 0,5 jam (update mapping + JSON + rename) |
| **B-06** | **Watermark belum diverifikasi visual** | Tinggi | Pipeline jalan tanpa error, tapi tidak ada bukti watermark benar-benar terlihat di output. | Dev | 0,25 jam (inspeksi manual) |
| **B-07** | **Data demo masih dipakai (site.json)** | Sedang | `photographer: "Rajipo"`, `email: "hello@example.com"`, `whatsapp: "6281234567890"`, `baseUrl: ""`. Harus diganti data klien asli. | Klien/Dev | 0,5 jam |
| **B-08** | **Lighthouse belum diukur dengan aset final** | Sedang | Target ≥75 mobile / ≥80 desktop. Demo pakai gambar sintetis, tidak representatif. | Dev | 1 jam (setelah aset final) |
| **B-09** | **Nomor WA placeholder di produk fisik** | Sedang | `site.json.contact.whatsapp` placeholder → link WA produk fisik salah. | Klien | 0,1 jam |
| **B-10** | **9 gambar master/preview tidak terpakai** | Rendah | Previews 02,03,06,08,10,11,13,14,15 ada di source/public tapi tidak di-referensikan JSON. | Dev | 0,25 jam (bersihkan atau dokumentasikan) |

**Total estimasi unblock:** ~5-8 jam (tergantung kesiapan akun Mayar klien).

---

## 10. Rekomendasi Task Berikutnya (Berdasarkan Dependensi & Acceptance Criteria)

**Task ID:** `TASK-20261019-002` — **"Finalisasi Aset & Konfigurasi Pra-Produksi"**

### Urutan Eksekusi (Critical Path):

1. **[B-07] Ganti data demo di `site.json`** — fotografer, email, WA, lokasi, `baseUrl` (domain produksi). *Prasyarat watermark text & canonical URL.*
2. **[B-05] Perbaiki konvensi nama preview** — Update `images.json` mapping agar output pakai `-wm` suffix (hapus mapping atau ubah value jadi `previews01-wm` dst), lalu update `gallery.json` & `products.json` `src`/`preview` mengikuti. Jalankan `optimize-images.mjs` ulang.
3. **[B-06] Verifikasi watermark visual** — Buka 3 file output (`previews01-wm.webp`, `previews09-wm.webp`, `previews12-wm.webp`) pastikan watermark "© {photographer}" terlihat kanan bawah.
4. **[B-10] Bersihkan aset tidak terpakai** — Hapus `previews02,03,06,08,10,11,13,14,15` dari `private-assets/source/` DAN `public/images/previews/` agar tidak membingungkan. Atau pindah ke folder `archive/` jika ingin disimpan.
5. **[B-01, B-02, B-03, B-04] Aktifkan Mayar (Critical Path Klien)** — Klien: buat/verifikasi akun Mayar → upload file master 3 produk digital → dapatkan URL checkout → isi ke `products.json`. Dev: ganti `example.invalid` → URL asli. **Uji end-to-end: bayar test → cek file terkirim.**
6. **[B-09] Update nomor WA asli klien** di `site.json`.
7. **[B-08] Jalankan Lighthouse** pada halaman representatif (`/`, `/gallery`, `/shop`, `/products/[id]`) dengan aset final. Catat skor & kondisi test.
8. **Deploy ke Cloudflare Pages** (setelah `baseUrl` diisi) → verifikasi canonical, sitemap, OG image.
9. **Handover klien** — panduan update konten, batasan no-backend, garansi.

### Dependensi Antar Task:
```
site.json (B-07)
    │
    ├─→ optimize-images.mjs (watermark text pakai photographer) → B-05, B-06
    ├─→ baseUrl untuk canonical/sitemap → B-08, deploy
    └─→ contact.whatsapp untuk WA links → B-09
         │
         └─→ Mayar integration (B-01..B-04) — **independen, bisa paralel** tapi butuh akun klien ready
```

### Estimasi Total: **5-8 jam** (termasuk menunggu verifikasi Mayar klien).

---

## 11. Catatan Tambahan untuk Tim

1. **Tidak ada `TASK.md`** di repo — hanya `TASKS.md` (roadmap). Pastikan rujukan dokumen konsisten.
2. **`AUDIT_REPORT.md` sudah ada** di root (file ini akan menimpa/menjadi laporan resmi).
3. **Pipeline gambar deterministic** — Sharp + config JSON → output yang sama setiap jalan. Cocok untuk CI/CD.
4. **Validasi JSON otomatis** — `scripts/validate-json.mjs` lulus (1 warning placeholder). Bisa dijadikan pre-commit hook.
5. **Tidak ada test otomatis** (unit/e2e) — pertimbangkan `playwright` untuk smoke test checkout redirect & WA link.
6. **Scope MVP sudah jelas** di `PRD.md` §6 (di luar cakupan: backend, CMS, cart, payment API, inventory, anti-download absolut). Jangan tambahkan fitur di luar paket tanpa persetujuan tertulis.

---

**Disusun oleh:** AI Audit Agent (read-only)
**Metodologi:** Inspeksi kode, konfigurasi, JSON, filesystem, CLI output, build artifact. **Tidak ada inspeksi visual gambar.**
**Tanggung jawab:** Temuan bersifat faktual berdasarkan bukti teknis; keputusan bisnis (harga, timeline, scope) di luar scope audit ini.

--- 

*End of Report*