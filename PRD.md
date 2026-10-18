# PRD — Portfolio Foto & Store

> **Status:** Draft untuk MVP starter. Keputusan khusus klien dikunci di proposal sebelum implementasi.  
> **Produk:** Starter website portofolio fotografer dengan katalog produk dan checkout eksternal.  
> **Batas utama:** Implementasi proyek klien ditargetkan maksimal 30 jam setelah starter dasar stabil dan teruji.

## 1. Ringkasan produk

Website menampilkan identitas dan karya fotografer secara editorial, menyediakan galeri yang mudah dijelajahi, serta mengarahkan calon pembeli ke tautan pembayaran eksternal atau WhatsApp. Starter dibuat sekali dan digunakan kembali untuk beberapa klien dengan konfigurasi merek, konten, gambar, dan tautan checkout yang berbeda.

Website merupakan **etalase dan jalur menuju checkout**, bukan platform e-commerce mandiri. Transaksi, payout, pengiriman file digital, ongkir, refund, dan komunikasi pemenuhan pesanan dikelola oleh klien dan penyedia layanan terkait.

## 2. Masalah yang ingin diselesaikan

- Fotografer membutuhkan tempat yang lebih terkontrol dan profesional untuk menampilkan karya daripada hanya mengandalkan profil media sosial.
- Calon pembeli membutuhkan katalog, detail, harga, lisensi atau spesifikasi produk, dan cara membeli yang jelas.
- Fotografer kecil membutuhkan solusi dengan biaya awal dan operasional yang relatif rendah tanpa harus membuat backend atau mengelola CMS.
- Penyedia jasa membutuhkan proses yang dapat diulang agar proyek senilai Rp1–3 juta tidak menyerap waktu berlebihan.

## 3. Target pengguna

### Pengguna utama website klien

1. **Pengunjung/ calon pembeli:** ingin melihat foto, memahami produk, dan menemukan jalur pembelian dengan sedikit hambatan.
2. **Fotografer/ pemilik bisnis:** ingin menampilkan karya dan mengarahkan pengunjung ke checkout atau kontak yang ia kelola.

### Pengguna internal

3. **Developer/pemilik starter:** mengonfigurasi tema, konten JSON, preview, metadata, dan tautan checkout serta menjalankan deployment.

### Target pasar awal

Utamakan fotografer yang sudah memiliki koleksi foto, kebutuhan portofolio yang nyata, serta rencana menjual lisensi digital atau cetakan. Mayar menjadi opsi awal bagi kebutuhan Indonesia. Pembayaran internasional merupakan kebutuhan khusus yang harus diverifikasi dan disepakati terpisah, bukan kemampuan yang otomatis dijamin starter.

## 4. Tujuan dan indikator keberhasilan

### Tujuan produk

- Menampilkan karya sebagai fokus visual utama.
- Membantu pengunjung menemukan foto atau produk yang relevan.
- Menyediakan CTA pembelian yang benar dan mudah ditemukan.
- Mempertahankan website statis, ringan, dan murah dioperasikan.
- Memisahkan foto preview publik dari foto master.

### Tujuan bisnis

- Menjadikan starter dapat digunakan kembali tanpa membangun ulang fondasi untuk setiap klien.
- Menjaga implementasi klien dalam target 28 jam kerja dengan 2 jam buffer setelah starter stabil.
- Mengendalikan pekerjaan tambahan melalui batas paket, kuota konten, dan revisi yang tertulis.
- Membuka peluang maintenance berbayar untuk perubahan konten dan katalog.

### Indikator keberhasilan

- Build produksi berhasil dan website ter-deploy pada domain yang disepakati.
- Semua halaman dan fitur yang termasuk proposal telah diuji.
- Seluruh CTA mengarah ke URL checkout atau WhatsApp yang benar.
- Alur produk digital diuji di akun/provider klien jika pengiriman otomatis dijanjikan.
- Tidak ada foto master atau rahasia di Git maupun artefak deployment.
- Target Lighthouse halaman representatif: **minimal 75 pada mobile dan 80 pada desktop** dengan kondisi pengujian konsisten.
- Durasi kerja aktual dicatat dan dibandingkan dengan estimasi 30 jam.

## 5. Cakupan MVP

Fitur yang tersedia pada starter dan diaktifkan sesuai paket yang dibeli klien:

- Beranda dengan identitas fotografer dan pilihan karya.
- Galeri foto dengan grid responsif.
- Filter kategori sisi klien bila termasuk paket.
- Lightbox sederhana bila termasuk paket dan diperlukan.
- Katalog/toko dan template detail produk statis.
- Data dari `src/content/products.json` dan `src/content/gallery.json`.
- Tombol pembelian dengan URL statis per produk.
- Tombol WhatsApp dengan pesan yang telah diisi untuk permintaan khusus.
- Halaman Tentang dan Kontak sesuai paket.
- SEO dasar: judul, deskripsi, canonical saat domain tersedia, Open Graph, sitemap, dan halaman 404.
- Pipeline gambar untuk resize/kompresi dan watermark pada preview.
- Deployment statis ke Cloudflare Pages.
- Panduan singkat untuk perubahan data serta proses handover.

### Variasi paket

Jumlah halaman/jenis halaman, listing produk, aset foto, filter, lightbox, SEO, serta dukungan ditentukan oleh proposal. Daftar halaman pada arsitektur adalah kemampuan starter, bukan kewajiban untuk memasukkan seluruh halaman ke setiap paket.

## 6. Di luar cakupan MVP

- Backend aplikasi, database, login pengguna, akun pelanggan, atau panel admin.
- CMS dan pengeditan konten mandiri.
- Keranjang multi-item, checkout internal, dan status transaksi di website.
- Payment gateway API, webhook, refund otomatis, atau pencatatan pesanan.
- Inventori, pemenuhan pesanan, penghitungan ongkir kustom, dan sistem logistik internal.
- Proteksi anti-unduh yang dijamin mutlak terhadap foto.
- Multi-bahasa dan multi-mata-uang penuh kecuali disepakati sebagai scope tambahan.
- Integrasi provider baru atau checkout internasional tanpa verifikasi akun, payout, metode bayar, biaya, dan pengujian.
- Produksi konten, copywriting besar, migrasi katalog besar, atau pemasaran/iklan kecuali disebutkan dalam proposal.

## 7. Pengalaman dan alur pengguna

### Menjelajahi portofolio

1. Pengunjung mendarat di beranda.
2. Melihat identitas fotografer dan karya pilihan.
3. Membuka galeri dan, jika tersedia, memfilter kategori atau memperbesar foto.
4. Berpindah ke katalog atau kontak sesuai kebutuhannya.

### Membeli produk digital

1. Pengunjung membuka detail produk.
2. Memeriksa preview, harga, mata uang, dan ketentuan lisensi yang disediakan penjual.
3. Menekan tombol beli dan diarahkan ke checkout provider eksternal.
4. Pembayaran dan pengiriman file ditangani provider hanya bila akun, produk, dan fiturnya telah dikonfigurasi serta diuji.

### Memesan produk fisik dengan kebutuhan khusus

1. Pengunjung melihat produk serta informasi dasar.
2. Menekan tombol WhatsApp dengan pesan produk yang telah diisi.
3. Penjual mengonfirmasi ukuran/varian, stok, ongkir, total, dan cara pembayaran.
4. Website tidak menghitung atau mencatat total pesanan.

## 8. Persyaratan fungsional

| ID | Persyaratan | Prioritas |
|---|---|---|
| FR-01 | Beranda menampilkan identitas fotografer dan CTA yang relevan. | P0 |
| FR-02 | Galeri menampilkan preview responsif dari data JSON. | P0 |
| FR-03 | Setiap item galeri memiliki ID unik, kategori, path preview, dan alt text yang sesuai. | P0 |
| FR-04 | Katalog/halaman produk menampilkan jenis produk, judul, harga, preview, serta informasi penting yang disediakan klien. | P0 bila penjualan masuk paket |
| FR-05 | CTA beli memakai URL eksternal statis per produk dan tidak mengklaim status pembayaran. | P0 bila penjualan masuk paket |
| FR-06 | Tombol WhatsApp membentuk URL/pesan yang valid tanpa menaruh rahasia di data publik. | P0 bila WhatsApp masuk paket |
| FR-07 | Filter kategori bekerja di browser tanpa backend. | P1; sesuai paket |
| FR-08 | Lightbox dapat dipakai dengan input mouse, keyboard, dan sentuh bila disertakan. | P1; sesuai paket |
| FR-09 | Metadata dasar, Open Graph, sitemap, canonical, dan 404 disiapkan sesuai domain dan paket. | P0/P1 sesuai paket |
| FR-10 | Gambar preview mengikuti pipeline yang ditetapkan; file master tidak masuk output publik. | P0 |
| FR-11 | Konfigurasi merek, kontak, dan tautan sosial dapat diganti tanpa mengubah komponen secara luas. | P0 |
| FR-12 | Semua rute/fitur yang disertakan bisa dijalankan dan dibangun pada build produksi. | P0 |

## 9. Persyaratan nonfungsional

- **Performa:** target Lighthouse minimal 75 mobile dan 80 desktop untuk halaman representatif pada profil pengujian yang sama. Jangan mengoptimalkan skor dengan mengorbankan keterbacaan atau fungsi.
- **Responsif:** diuji di viewport 360 px, 768 px, dan 1200 px atau lebih.
- **Aksesibilitas:** struktur semantik, alt text bermakna, fokus keyboard terlihat, kontrol berlabel, kontras memadai, dan tidak mengunci navigasi keyboard.
- **Keamanan aset:** foto master, password, OTP, API secret, dan token tidak masuk repo/output publik.
- **Keandalan:** tidak ada tautan produk/gambar rusak atau error console yang diketahui pada alur utama; build harus berhasil.
- **Pemeliharaan:** perubahan katalog sederhana cukup mengubah data dan melakukan build/deploy ulang.
- **Biaya:** hindari dependency dan layanan berbayar yang tidak dibutuhkan untuk MVP.

## 10. Asumsi dan ketergantungan

- Klien menyerahkan konten, hak penggunaan foto, data produk, harga, lisensi, serta informasi kontak yang akurat.
- Klien memiliki dan mengelola akun pembayaran, domain, hosting, serta dana transaksi.
- URL checkout, fitur digital delivery, metode pembayaran, payout, biaya, dan aturan provider dapat berubah; semuanya harus diverifikasi sebelum peluncuran.
- Preview yang dibutuhkan deployment harus tersedia pada build atau dihasilkan dalam pipeline yang bisa dijalankan di lingkungan build.
- Timeline proyek dimulai setelah DP diterima, materi minimum lengkap, dan dependensi akun tersedia sebagaimana proposal.

## 11. Risiko dan mitigasi

- **Scope membesar:** kunci halaman, jumlah produk/foto, fitur, revisi, serta proses persetujuan perubahan dalam proposal.
- **Akun pembayaran belum aktif:** jadikan kesiapan akun sebagai prasyarat sebelum menjanjikan checkout live.
- **File master terekspos:** gunakan lokasi privat yang diabaikan Git, periksa artefak build, dan jangan pernah mengandalkan watermark sebagai pengaman mutlak.
- **Waktu habis untuk gambar:** batasi jumlah aset dan gunakan pipeline batch yang dapat diulang.
- **Skor performa berubah:** dokumentasikan halaman, device/mode, dan kondisi pengujian; tetap perbaiki temuan kritis.
- **Harga tidak menutup waktu:** catat jam aktual, pisahkan waktu membuat starter dari pengerjaan klien, dan sesuaikan harga/scope berdasarkan data.

## 12. Kriteria penerimaan MVP

- [ ] Halaman sesuai paket dan konten final klien.
- [ ] Layout berfungsi pada viewport target.
- [ ] Semua CTA checkout/WhatsApp sudah diperiksa.
- [ ] Pengiriman file digital atau alur pesanan fisik diuji bila dijanjikan.
- [ ] Preview gambar teroptimasi dan memiliki watermark sesuai kesepakatan.
- [ ] Tidak ada foto master atau rahasia di repositori dan hasil build.
- [ ] Title, description, Open Graph, sitemap, canonical (bila domain siap), dan 404 diperiksa sesuai scope.
- [ ] Lighthouse mencapai target 75 mobile/80 desktop pada pengujian yang dicatat, atau sisa gap dilaporkan dan disetujui secara eksplisit.
- [ ] Build produksi berhasil dan website sudah ter-deploy.
- [ ] Serah terima menjelaskan batasan tanpa backend/CMS/cart dan proses meminta update.
- [ ] Jam aktual serta pekerjaan tambahan dicatat.

## 13. Keputusan yang perlu dikunci per klien

- Paket dan halaman yang benar-benar diaktifkan.
- Jumlah listing produk dan jumlah foto unik.
- Bahasa serta pasar utama.
- Provider checkout dan metode pembelian untuk setiap tipe produk.
- Apakah filter, lightbox, sitemap, analytics, dan video handover termasuk.
- Kebijakan lisensi, ongkir, refund, dan pemenuhan pesanan yang disediakan penjual.
- Jadwal, kuota revisi, kriteria penerimaan, dan ruang lingkup garansi/maintenance.
