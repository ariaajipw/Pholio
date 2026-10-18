# DESIGN — Sistem Visual Portfolio Foto & Store

> **Status:** Arah visual untuk starter, bukan desain final setiap klien.  
> **Referensi:** [Per Appelgren](https://perappelgren.de/) dan [Gogoko Foto](https://www.gogokofoto.com/).  
> **Aturan:** ambil prinsip dan pola UX umum; jangan menyalin komposisi, teks, identitas, logo, atau aset referensi.

## 1. Prinsip desain

### 1.1 Arah visual

Gabungkan dua pendekatan:

- **Editorial dan image-first:** gunakan karya fotografi sebagai fokus utama, dengan komposisi berani, ruang kosong yang terkontrol, tipografi yang memiliki karakter, serta profil fotografer yang ringkas. Per Appelgren menjadi inspirasi untuk rasa portofolio kreatif dan penekanan pada karya.
- **Katalog yang mudah dipahami:** sediakan jalur jelas menuju galeri/toko, kategori yang masuk akal, kartu produk yang konsisten, bagian karya pilihan, dan informasi harga yang mudah ditemukan. Gogoko Foto menjadi inspirasi untuk keterbacaan alur katalog dan pengenalan fotografer/produk.

**Hasil yang diinginkan:** website terasa seperti portofolio fotografer yang dikurasi, bukan template toko generik; namun pengunjung tetap tahu di mana melihat koleksi dan cara membeli.

### 1.2 Prinsip utama

1. **Foto adalah konten utama.** Elemen dekoratif tidak boleh bersaing dengan karya.
2. **Editorial, bukan ramai.** Gunakan layout yang memiliki hierarki jelas dan hindari terlalu banyak kartu, border, badge, atau efek.
3. **Katalog jelas.** Harga, nama karya, kategori, lisensi/spesifikasi, dan CTA tidak boleh tersembunyi.
4. **Ritme visual.** Variasikan ukuran gambar secara terarah; hindari grid yang terlihat seperti kumpulan thumbnail seragam jika itu tidak cocok dengan materi.
5. **Identitas fleksibel.** Warna dan tipografi dapat dikonfigurasi untuk merek klien tanpa mengubah komponen inti.
6. **Interaksi sederhana.** Animasi hanya mendukung navigasi atau pengalaman melihat foto dan tidak boleh menunda konten.

## 2. Referensi dan batas penggunaannya

### Per Appelgren — portofolio editorial

Hal yang dapat dijadikan inspirasi: karya dominan, identitas personal yang kuat, struktur konten ringkas, serta nuansa editorial/fashion dengan penggunaan visual yang berani. Gunakan sebagai referensi rasa dan hierarki, bukan untuk mereplikasi susunan halaman atau gaya secara persis.

### Gogoko Foto — katalog fotografi

Hal yang dapat dijadikan inspirasi: pengunjung cepat menemukan toko, foto pilihan, karya terbaru, kategori, dan informasi tentang fotografer. Website referensi juga memiliki keranjang dan alur toko yang lebih kompleks; **keranjang, checkout terintegrasi, dan fitur toko penuh tidak termasuk dalam starter ini**.

## 3. Token visual awal

Token di bawah merupakan default starter dan harus dapat disesuaikan berdasarkan identitas klien. Jangan menganggap warna default ini wajib untuk semua proyek.

### 3.1 Warna

| Token | Nilai awal | Penggunaan |
|---|---|---|
| `--color-bg` | `#F6F4EF` | Latar utama terang bernuansa hangat |
| `--color-surface` | `#FFFFFF` | Permukaan kartu atau panel yang memerlukan pemisahan |
| `--color-text` | `#191917` | Teks utama |
| `--color-muted` | `#6B6962` | Teks sekunder, metadata, caption |
| `--color-border` | `#DCD8D0` | Border halus dan pembatas |
| `--color-accent` | `#B84F35` | Aksen terbatas, tautan aktif, atau CTA utama |
| `--color-focus` | `#1D5FCC` | Indikator fokus keyboard yang jelas |
| `--color-whatsapp` | `#167D48` | Tombol WhatsApp saja bila diperlukan |
| `--color-on-accent` | `#FFFFFF` | Teks di atas aksen setelah kontras diperiksa |

Ketentuan:
- Jangan menerapkan semua warna secara bersamaan. Warna fotografi sendiri sudah menjadi sumber variasi utama.
- Aksen merah bata digunakan hemat; jangan mewarnai semua tombol dan label.
- Warna WhatsApp hanya dipakai untuk CTA WhatsApp agar maknanya konsisten.
- Pastikan rasio kontras teks dan kontrol mencukupi; jika kombinasi token gagal, sesuaikan token atau penggunaannya.
- Tema gelap bukan kebutuhan wajib MVP. Tambahkan hanya jika cocok dengan merek serta dapat diuji tanpa menggandakan kompleksitas.

### 3.2 Tipografi

Arah default adalah **sans-serif yang bersih untuk UI dan body**, dengan opsi serif editorial untuk headline jika cocok dengan portofolio klien.

- Gunakan maksimal dua keluarga font dalam baseline.
- Dahulukan font sistem atau font yang benar-benar diperlukan; hindari unduhan font besar yang tidak menambah nilai visual.
- Heading boleh besar dan kontras, tetapi tetap mudah dipahami pada layar kecil.
- Body text dan metadata tidak boleh terlalu kecil hanya demi tampilan minimalis.
- Gunakan kapitalisasi, letter-spacing, dan italic secara selektif, bukan sebagai dekorasi di semua elemen.

Skala awal yang dapat dituning:

| Peran | Ukuran desktop awal | Catatan |
|---|---:|---|
| Hero/title | `clamp(2.5rem, 7vw, 6.5rem)` | Besar, tetapi panjang judul harus tetap terkendali |
| Heading halaman | `clamp(2rem, 4vw, 4rem)` | Hierarki utama halaman |
| Heading section | `1.5–2.25rem` | Judul galeri/produk pilihan |
| Body | `1rem–1.125rem` | Keterbacaan utama |
| Caption/metadata | `0.8125–0.9375rem` | Jangan dijadikan teks untuk informasi penting yang sulit terlihat |

Skala di atas merupakan titik awal, bukan nilai piksel yang wajib untuk semua desain.

## 4. Layout dan spacing

### 4.1 Grid dan kontainer

- Gunakan kontainer dengan lebar maksimum yang cukup luas agar foto berukuran besar mendapat ruang.
- Jaga jarak kiri/kanan pada mobile; foto tidak boleh menempel ke tepi layar tanpa alasan desain.
- Gunakan CSS Grid sebagai baseline karena mudah diatur dan diprediksi. Layout berukuran tidak sama diperbolehkan jika rasio foto dan urutan baca tetap jelas.
- Hindari masonry kompleks jika menyebabkan urutan keyboard, layout shift, atau perilaku responsif yang sulit diprediksi.
- Jangan memaksa semua foto ke crop yang sama apabila crop tersebut merusak isi karya.

Skala spacing awal berbasis kelipatan 4/8 px: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Gunakan jarak section yang lebih lega daripada jarak antar-elemen di dalam komponen.

### 4.2 Responsivitas

- **Mobile (sekitar 360–767 px):** satu atau dua kolom sesuai orientasi gambar; navigasi ringkas; judul dan CTA tidak meluap; kontrol mudah disentuh.
- **Tablet (sekitar 768–1199 px):** dua atau tiga kolom bergantung pada ruang dan proporsi foto.
- **Desktop (1200 px ke atas):** tiga atau empat kolom jika ukuran gambar tetap nyaman dilihat; bisa memakai komposisi editorial yang lebih lebar.
- Jangan menentukan jumlah kolom hanya dari breakpoint; cek lebar aktual kartu, panjang judul, dan proporsi gambar.
- Gunakan `aspect-ratio`, ukuran gambar yang sesuai, serta `width`/`height` atau mekanisme reservasi ruang untuk mengurangi layout shift.

## 5. Aturan gambar

### 5.1 Galeri dan preview

- Gunakan preview hasil pipeline gambar, bukan foto master.
- Pertahankan rasio asli jika rasio merupakan bagian penting karya; crop hanya jika dikonfirmasi sesuai kebutuhan komposisi.
- Tentukan variasi ukuran berdasarkan tempat pemakaian, bukan satu ukuran maksimal untuk seluruh konteks.
- Beri `alt` yang mendeskripsikan isi foto secara ringkas. Untuk gambar dekoratif yang tidak menambah informasi, gunakan alt kosong dengan benar.
- Jangan memakai nama file atau kata kunci berulang sebagai pengganti alt text.
- Watermark preview harus terlihat dengan tujuan yang disepakati, tetapi tidak sampai menutupi subjek utama. Posisi/opacity dapat diubah sesuai materi dan risiko penggunaan.
- Watermark tidak boleh dipasarkan sebagai jaminan foto tidak dapat diunduh atau dicuri.

### 5.2 Lightbox

Jika masuk scope:
- Tampilkan foto pada ukuran yang sesuai viewport dan sediakan tombol tutup yang jelas.
- Mendukung tombol Escape, navigasi keyboard bila ada perpindahan foto, fokus yang terlihat, serta kontrol sentuh.
- Cegah scroll latar yang mengganggu saat lightbox terbuka dan pulihkan fokus saat ditutup.
- Sediakan nama/alt foto bila relevan.
- Hindari autoplay, zoom efek berlebihan, atau animasi panjang.

### 5.3 Performa gambar

- Gunakan WebP sebagai baseline jika sesuai pipeline. Tambahkan AVIF hanya jika memberi keuntungan yang terukur dan fallback-nya benar.
- Atur ukuran sumber yang disajikan agar tidak mengunduh gambar jauh lebih besar dari kebutuhan tampilan.
- Hindari lazy-load pada gambar hero/LCP utama; gunakan lazy-load untuk gambar di bawah lipatan sesuai perilaku browser.
- Pastikan dimensi gambar atau ruang rasio sudah diketahui untuk mengurangi CLS.

## 6. Komponen dan pola UI

### Header/navigasi

- Logo/nama fotografer terlihat tanpa mengambil ruang berlebihan.
- Navigasi sederhana: misalnya Work/Galeri, Store bila ada penjualan, About, Contact.
- Tautan aktif harus dapat dikenali tanpa warna saja.
- Navigasi mobile harus mudah digunakan keyboard dan sentuhan.

### Hero

- Utamakan satu karya atau kelompok karya yang kuat, headline ringkas, identitas, dan CTA yang relevan.
- Hindari slideshow otomatis pada baseline.
- Jangan menambahkan teks panjang di atas foto jika kontras atau keterbacaan buruk.

### Gallery card

- Gunakan gambar sebagai elemen utama.
- Caption memuat judul dan kategori jika berguna.
- Efek hover hanya peningkatan progresif; informasi penting harus tetap terlihat pada perangkat sentuh.
- Jangan membuat seluruh kartu terlihat seperti tombol jika bagian yang dapat diklik tidak jelas.

### Product card/detail

- Tampilkan foto, nama, harga, dan jenis/label produk dengan jelas.
- Pada detail, jelaskan lisensi digital atau spesifikasi fisik menggunakan informasi yang disediakan klien.
- CTA harus menyebut tindakan yang jelas, misalnya “Beli foto” atau “Pesan cetak”.
- Jangan menampilkan status stok, diskon, rating, atau label “terjual” kecuali data benar-benar tersedia dan dikelola.
- Karena tidak ada cart, CTA mengarah ke checkout eksternal per produk atau WhatsApp.

### Tombol dan tautan

- Tentukan satu gaya primary CTA dan satu gaya secondary.
- Hover, active, disabled (bila ada), dan focus-visible harus terlihat.
- Teks CTA lebih baik spesifik daripada sekadar “Klik di sini”.
- Tautan eksternal membuka tab baru hanya bila memang berguna; gunakan `rel="noopener noreferrer"` saat memakai `target="_blank"`.

### Footer

- Kontak, tautan sosial, copyright, dan tautan legal yang relevan.
- Jangan mengarang kebijakan legal. Teks legal/privasi yang diperlukan harus disediakan atau disetujui pemilik bisnis.

## 7. Motion dan interaksi

- Gunakan transisi cepat dan halus untuk hover/focus; utamakan fungsi daripada efek.
- Hormati `prefers-reduced-motion`.
- Hindari parallax, scroll-jacking, cursor kustom, animasi berat, atau animasi yang menunda interaksi utama pada MVP.
- Jangan memuat library animasi sebelum ada kebutuhan jelas.
- Filter galeri harus tetap mudah digunakan tanpa animasi.

## 8. Aksesibilitas

- Semua fungsi inti tersedia dengan keyboard.
- Fokus keyboard terlihat jelas.
- Gunakan heading secara hierarkis; jangan memilih heading hanya demi ukuran visual.
- Tombol/tautan punya nama yang jelas dan area sentuh memadai.
- Jangan mengandalkan warna saja untuk menandai kategori atau status.
- Teks di atas gambar harus punya kontras; gunakan overlay hanya bila diperlukan dan tidak menutupi karya secara berlebihan.
- Pastikan lightbox memiliki nama dialog, tombol tutup yang berlabel, dan perilaku fokus yang wajar.
- Gunakan target Lighthouse minimal 75 mobile dan 80 desktop sebagai ambang proyek, tetapi perbaiki isu aksesibilitas nyata meskipun skor sudah mencapai target.

## 9. Aturan brand per klien

Token default adalah baseline starter. Saat proyek klien dimulai:

1. Identifikasi jenis fotografi, audiens, dan karakter merek.
2. Sesuaikan warna aksen, font heading, lebar kontainer, komposisi hero, dan perlakuan caption.
3. Pastikan perubahan tetap memakai komponen dan pola yang sudah ada sejauh mungkin.
4. Catat perubahan visual khusus dalam konfigurasi/theme, bukan dengan menyalin seluruh komponen bila bisa dihindari.
5. Konfirmasi arah visual lewat satu halaman/komposisi utama sebelum menerapkan ke semua halaman.

Jangan menjadikan satu referensi sebagai desain final semua klien. Starter harus dapat menampung gaya editorial, landscape, travel, fine-art, maupun jenis fotografi lain tanpa kehilangan konsistensi.

## 10. Kriteria penerimaan visual

- [ ] Karya fotografi menjadi fokus utama dan tidak dikalahkan ornamen.
- [ ] Identitas, navigasi, galeri/katalog, dan CTA mudah ditemukan.
- [ ] Grid mempertahankan rasio/crop yang pantas dan tidak menimbulkan layout shift yang mencolok.
- [ ] Tipografi hierarkis, dapat dibaca, serta tidak meluap pada mobile.
- [ ] Warna teks, link, fokus, dan tombol memiliki kontras yang memadai.
- [ ] Semua interaksi utama bisa digunakan dengan mouse, keyboard, dan sentuhan sesuai konteks.
- [ ] Tidak ada animasi yang menghalangi akses ke foto atau CTA.
- [ ] Tampilan diuji pada 360 px, 768 px, dan 1200 px atau lebih.
- [ ] Preview saja yang digunakan pada halaman publik.
- [ ] Target Lighthouse ≥75 mobile dan ≥80 desktop dicatat pada halaman representatif.

## 11. Hal yang tidak termasuk dalam sistem visual MVP

- Menyalin halaman atau identitas dua situs referensi.
- Desain ulang tanpa batas di luar jumlah revisi proposal.
- Mode gelap/terang yang bisa ditukar pengguna kecuali diminta dan disepakati.
- Animasi kompleks, 3D, video background, WebGL, atau efek yang membutuhkan pemeliharaan khusus.
- Layout toko yang mengandalkan keranjang atau checkout internal.
- Komponen UI dekoratif yang tidak mendukung penemuan karya, pemahaman produk, atau pembelian.
