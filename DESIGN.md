# DESIGN — Sistem Visual Portfolio Foto & Store

> **Status:** Arah visual untuk starter (v2), bukan desain final setiap klien.  
> **Referensi:** [Per Appelgren](https://perappelgren.de/) dan [Gogoko Foto](https://www.gogokofoto.com/).  
> **Aturan:** ambil prinsip dan pola UX umum; jangan menyalin komposisi, teks, identitas, logo, foto, atau aset referensi.  
> **Dokumen terkait:** `PRD.md` (cakupan dan paket), `ARCHITECTURE.md` (data, rute, checkout). Bila DESIGN bertentangan dengan keduanya, keduanya menang; lihat §15 untuk hal yang perlu diselaraskan.

### Perubahan dari v1

1. Palet default krem + terakota diganti dua **preset tema** yang diturunkan langsung dari referensi: *Editorial* (netral monokrom, ala Per Appelgren) dan *Bold* (putih + satu warna merek jenuh, ala Gogoko).
2. §2 kini berisi **analisis pola** dari tangkapan layar kedua referensi, lengkap dengan keputusan adopsi, prioritas, dan pola yang sengaja tidak diambil.
3. Ditambah pola khas referensi: hero tipografi raksasa (dua varian), garis grid terlihat, tombol outline dengan bayangan keras, caption di atas foto, filter berhitung, tombol WhatsApp melayang.
4. Motion dibagi tiga level (M0–M2) supaya efek ala Per Appelgren tidak menyusup ke paket murah.
5. Ditambah rasio kontras yang sudah dihitung, matriks fitur visual per paket, dan daftar sinkronisasi dengan dokumen lain.

---

## 1. Prinsip desain

### 1.1 Arah visual

Konsepnya: **etalase editorial dengan satu momen tipografi yang berani.** Foto dan satu elemen tipografi raksasa memegang halaman; semua yang lain tenang dan disiplin.

Dua referensi punya peran berbeda:

- **Per Appelgren — struktur dan keheningan.** Header tiga zona yang sangat ringkas, latar netral, teks display raksasa yang ditimpa foto, foto berukuran bervariasi tanpa crop seragam, serta halaman arsip dengan filter berhitung dan pengalih tampilan.
- **Gogoko Foto — kejelasan katalog dan keberanian warna.** Headline raksasa bertingkat dalam satu warna jenuh, garis grid tipis yang terlihat, tombol outline dengan bayangan keras, caption judul di atas foto, tombol toko yang menonjol, dan tombol WhatsApp melayang.

**Hasil yang diinginkan:** terasa seperti portofolio fotografer yang dikurasi, bukan template toko generik, tetapi pengunjung tetap tahu di mana koleksinya dan bagaimana cara membeli.

### 1.2 Prinsip utama

1. **Foto adalah konten utama.** Elemen dekoratif tidak boleh bersaing dengan karya.
2. **Satu momen berani.** Hero memegang seluruh keberanian tipografi. Halaman lain memakai skala biasa. Jika semua bagian dibuat besar dan berwarna, tidak ada yang terasa istimewa.
3. **Katalog jelas.** Harga, nama karya, kategori, lisensi atau spesifikasi, dan CTA tidak boleh tersembunyi.
4. **Ritme visual.** Variasikan ukuran dan posisi foto secara terarah; hindari kumpulan thumbnail seragam bila materinya tidak cocok.
5. **Struktur visual membawa informasi.** Garis, border, dan penanda harus berarti sesuatu (pemisah section, penunjuk aktif). Jangan menambah nomor urut, label kecil di atas heading, atau badge hanya sebagai hiasan.
6. **Identitas fleksibel.** Warna dan font dikonfigurasi per klien tanpa mengubah komponen inti.
7. **Interaksi sederhana dan jujur.** Tidak ada keranjang, status stok, atau status pembayaran palsu. Semua CTA mengarah ke checkout eksternal per produk atau WhatsApp.

---

## 2. Analisis referensi

Tabel ini menerjemahkan pola yang terlihat pada tangkapan layar menjadi keputusan desain. Prioritas: **P0** wajib ada di starter, **P1** diaktifkan sesuai paket, **P2** opsional atau add-on.

| # | Pola yang teramati | Sumber | Keputusan di starter | Prioritas |
|---|---|---|---|---|
| 1 | Header tiga zona: tautan kecil di kiri, nama fotografer di tengah, tautan di kanan; tanpa dekorasi | Per | Varian header `centered-wordmark` (default preset Editorial) | P0 |
| 2 | Logo di kiri, navigasi di tengah, tombol toko menonjol di kanan | Gogoko | Varian header `split-nav` (default preset Bold), **tanpa ikon keranjang** | P1 |
| 3 | Foto potret di tengah menimpa kata display raksasa yang terpotong tepi layar; caption kecil di margin kiri | Per | Hero `overlap` | P0 |
| 4 | Headline raksasa tiga baris dengan indentasi bertingkat, melintasi garis grid; foto unggulan di sisi kiri | Gogoko | Hero `stagger` | P0 |
| 5 | Garis grid tipis (vertikal dan horizontal) terlihat di seluruh halaman | Gogoko | Komponen dekoratif `GridLines`, hanya desktop | P1 |
| 6 | Tombol dengan border tebal, bayangan keras bergeser, teks bergaris bawah dan panah | Gogoko | Gaya CTA preset Bold (§7.4) | P0 |
| 7 | Judul karya dan nama pemilik di kiri bawah foto, di atas gradien gelap | Gogoko | Caption overlay pada kartu galeri dan hero | P0 |
| 8 | Foto berukuran berbeda, posisi asimetris, rasio asli dipertahankan | Per, Gogoko | Dasar layout galeri: CSS Grid dengan rasio asli | P0 |
| 9 | Foto masuk dari tepi kiri dan kanan layar, teks display tertutup sebagian oleh foto (efek scroll) | Per | Hanya komposisi statis; versi scroll-driven masuk M2 | P2 |
| 10 | Filter dengan jumlah per kategori: "ALL (48) FASHION (34) BEAUTY (14)" | Per | `FilterBar` berhitung, dihitung saat build | P1 |
| 11 | Baris indeks: tahun di kiri, judul proyek di kolom berikutnya | Per | Tampilan daftar opsional (§7.6) | P2 |
| 12 | Pil melayang di tengah bawah untuk berganti tampilan BOARD / STACK / GRID | Per | Hanya `grid` dan `stack`; pengalih muncul bila minimal dua tampilan aktif | P2 |
| 13 | Tombol WhatsApp bulat hijau dengan label pertanyaan di kiri bawah | Gogoko | Varian `floating` pada `WhatsAppButton` | P1 |
| 14 | Ikon keranjang dengan badge jumlah | Gogoko | **Tidak diadopsi** (tidak ada cart) | n/a |
| 15 | Logo wordmark outline berkotak | Gogoko | **Tidak diadopsi** (identitas milik Gogoko) | n/a |

### 2.1 Batas penggunaan

- **Jangan menyalin:** headline, caption, nama kampanye atau merek pada foto, susunan halaman, logo, dan seluruh foto kedua situs.
- **Jangan memakai foto referensi sebagai placeholder**, termasuk saat pengembangan lokal. Foto pada tangkapan layar adalah karya pihak ketiga dan kampanye merek. Gunakan kotak abu netral, gradien polos, atau foto milik klien.
- **Jangan menyalin kata kunci headline** dari referensi dalam bahasa lain atau terjemahannya. Copy hero ditulis dari identitas klien.
- **Efek scroll yang kaya milik Per Appelgren** adalah pekerjaan kustom. Starter hanya mengambil komposisi statisnya.

---

## 3. Preset tema dan token

Starter menyediakan dua preset. Pilih satu per proyek lewat konfigurasi; keduanya memakai nama token yang sama sehingga komponen tidak berubah.

| | **Editorial** (default) | **Bold** |
|---|---|---|
| Karakter | Netral, monokrom, tenang, foto menjadi satu-satunya warna | Putih bersih + satu warna merek jenuh untuk teks, garis, dan tombol |
| Cocok untuk | Fashion, potret, komersial, fine-art | Fotografi komunitas, travel, katalog yang ramai, merek yang ingin lantang |
| Hero bawaan | `overlap` | `stagger` |
| Header bawaan | `centered-wordmark` | `split-nav` |
| Gaya CTA | Tombol solid warna tinta | Tombol outline dengan bayangan keras |

### 3.1 Token warna

```css
:root[data-theme-preset="editorial"] {
  --color-bg: #F3F3F1;
  --color-surface: #FFFFFF;
  --color-text: #0A0B10;
  --color-muted: #62625E;
  --color-border: #D9D9D5;
  --color-brand: #0A0B10;      /* teks display, garis, tombol */
  --color-on-brand: #FFFFFF;
  --color-focus: #1D5FCC;
  --color-whatsapp: #167D48;
  --color-grid-line: rgb(10 11 16 / 0.08);
  --color-scrim: rgb(0 0 0 / 0.55);
}

:root[data-theme-preset="bold"] {
  --color-bg: #FFFFFF;
  --color-surface: #FFFFFF;
  --color-text: #1B1111;
  --color-muted: #6A6060;
  --color-border: #EBC9C9;
  --color-brand: #D40000;
  --color-on-brand: #FFFFFF;
  --color-focus: #1D5FCC;
  --color-whatsapp: #167D48;
  --color-grid-line: rgb(212 0 0 / 0.22);
  --color-scrim: rgb(0 0 0 / 0.55);
}

/* Kompatibilitas dengan v1 */
:root {
  --color-accent: var(--color-brand);
  --color-on-accent: var(--color-on-brand);
}
```

| Token | Penggunaan |
|---|---|
| `--color-bg` | Latar utama |
| `--color-surface` | Panel atau kartu yang perlu dipisahkan dari latar |
| `--color-text` | Teks utama |
| `--color-muted` | Teks sekunder, metadata, caption di luar foto |
| `--color-border` | Pemisah halus dan hairline dekoratif |
| `--color-brand` | Teks display, tautan aktif, garis, border dan isi tombol utama |
| `--color-on-brand` | Teks di atas `--color-brand` |
| `--color-focus` | Indikator fokus keyboard |
| `--color-whatsapp` | Tombol WhatsApp saja |
| `--color-grid-line` | Garis grid dekoratif (§5.3) |
| `--color-scrim` | Gradien gelap di bawah foto untuk caption |

### 3.2 Kontras yang sudah dihitung

Dihitung dengan rumus kontras WCAG 2.x. Hitung ulang untuk setiap warna merek klien.

| Pasangan | Rasio |
|---|---:|
| Editorial: teks pada latar | 17,7 : 1 |
| Editorial: teks muted pada latar | 5,5 : 1 |
| Editorial: putih pada tombol tinta | 19,7 : 1 |
| Editorial: fokus pada latar | 5,3 : 1 |
| Bold: merah `#D40000` pada putih (dan sebaliknya) | 5,5 : 1 |
| Bold: teks pada putih | 18,5 : 1 |
| Bold: teks muted pada putih | 6,1 : 1 |
| Bold: fokus pada putih | 5,9 : 1 |
| Putih pada hijau WhatsApp | 5,2 : 1 |
| Merah murni `#FF0000` pada putih | 4,0 : 1 |

Ketentuan:

- Merah murni `#FF0000` **gagal untuk teks kecil** (di bawah 4,5 : 1). Preset Bold memakai `#D40000`. Warna yang lebih terang hanya boleh untuk teks display besar (minimal 24 px, atau 18,66 px tebal) dan harus tetap mencapai 3 : 1.
- `--color-border` dan `--color-grid-line` bersifat dekoratif (kontras jauh di bawah 3 : 1). Jangan memakainya untuk menandai elemen yang harus dikenali; beri petunjuk lain (garis bawah, teks, bentuk).
- Jangan menerapkan semua token sekaligus. Warna fotografi sudah menjadi sumber variasi utama.
- Warna WhatsApp hanya untuk CTA WhatsApp agar maknanya konsisten.
- Tema gelap dan pengalih tema tidak termasuk MVP.

---

## 3.3 Tailwind CSS v4 Theme Tokens — Three-Layer Architecture

Starter ini menggunakan **Tailwind CSS v4** dengan arsitektur `@import "tailwindcss"` (tanpa file konfigurasi terpisah). Token desain dideklarasikan di `@theme` dalam `src/styles/global.css` untuk nilai-nilai yang digunakan oleh utility Tailwind. Proyek ini mempertahankan **tiga lapis token** dengan peran berbeda — lihat §3.3.1.

### 3.3.1 Arsitektur Token Tiga Lapis

Proyek ini mempertahankan tiga lapis token dengan peran yang berbeda:

| Lapis | Lokasi | Peran | Contoh |
|---|---|---|---|
| **Tailwind `@theme`** | `src/styles/global.css` lines 3–16 | Sumber kebenaran untuk utility Tailwind (`bg-brand`, `text-muted`, `rounded-lg`, dll.) | `--color-brand: #0A0B10` |
| **Preset runtime (CSS custom properties)** | `src/styles/global.css` lines 19–37 | Nilai yang **berubah per preset** via `data-theme-preset` pada `<html>`; dibaca langsung oleh component CSS | `--color-brand: #D40000` (Bold) |
| **Compatibilitas v1** | `src/styles/global.css` lines 34–37 | Alias lama (`--color-accent`, `--color-on-accent`) untuk kode warisan | `--color-accent: var(--color-brand)` |

**Aturan sinkronisasi:**
- `@theme` mendefinisikan nilai **default (Editorial)**.
- Preset runtime **meng-override** nilai yang berubah (warna, grid-line) via selector `:root[data-theme-preset="bold"]`.
- Lapis compatibilitas **mengikuti** `--color-brand` via `var()` — tidak didefinisikan ulang.
- **Jangan** menduplikasi nilai yang sama di ketiga lapis. Gunakan `var()` untuk merujuk ke atas.

### 3.3.2 Token `@theme` (Editorial Default)

```css
@theme {
  /* Editorial preset (default) */
  --color-bg: #F3F3F1;
  --color-surface: #FFFFFF;
  --color-text: #0A0B10;
  --color-muted: #62625E;
  --color-border: #D9D9D5;
  --color-brand: #0A0B10;
  --color-on-brand: #FFFFFF;
  --color-focus: #1D5FCC;
  --color-whatsapp: #167D48;
  --color-grid-line: rgb(10 11 16 / 0.08);
  --color-scrim: rgb(0 0 0 / 0.55);
}
```

Token ini otomatis menghasilkan utility Tailwind:
- Warna: `bg-brand`, `text-muted`, `border-border`, `bg-surface`, `text-on-brand`, dll.
- Semantic: `focus:ring-focus`, `bg-whatsapp`

### 3.3.3 Preset Runtime Override (Bold)

```css
:root[data-theme-preset="bold"] {
  --color-bg: #FFFFFF;
  --color-surface: #FFFFFF;
  --color-text: #1B1111;
  --color-muted: #6A6060;
  --color-border: #EBC9C9;
  --color-brand: #D40000;
  --color-on-brand: #FFFFFF;
  --color-focus: #1D5FCC;
  --color-whatsapp: #167D48;
  --color-grid-line: rgb(212 0 0 / 0.22);
  --color-scrim: rgb(0 0 0 / 0.55);
}
```

Nilai-nilai ini **tidak** ada di `@theme` karena mereka sengaja berubah per preset. Component CSS yang memakai `var(--color-brand)` akan otomatis menerima nilai Bold ketika `<html data-theme-preset="bold">`.

### 3.3.4 Token Spacing, Typography, Breakpoints, Shadows

```css
@theme {
  /* Spacing — skala 4/8 px + clamp gutter */
  --spacing-gutter: clamp(16px, 3vw, 48px);
  --container-max: 1600px;

  /* Typography — clamp values from DESIGN.md §4.2 */
  --text-display-overlap: clamp(4rem, 18vw, 16rem);
  --text-display-stagger: clamp(2.75rem, 6vw, 6.5rem);
  --text-heading-page: clamp(2.25rem, 4.5vw, 4.25rem);
  --text-heading-section: clamp(1.75rem, 2.8vw, 2.75rem);
  --text-body: clamp(1rem, 1.2vw, 1.125rem);
  --text-caption: clamp(0.8125rem, 1.1vw, 0.875rem);
  --text-nav-filter: clamp(0.8125rem, 1vw, 0.9375rem);

  /* Line heights */
  --leading-display-overlap: 0.85;
  --leading-display-stagger: 0.96;
  --leading-heading-page: 1.05;
  --leading-heading-section: 1.1;
  --leading-body: 1.7;
  --leading-caption: 1.5;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-tighter: -0.03em;
  --tracking-wide: 0.08em;
  --tracking-wider: 0.12em;

  /* Breakpoints — match existing media queries (NOT Tailwind defaults) */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1200px;

  /* Shadows — Bold button hard shadow */
  --shadow-btn-hard: 4px 4px 0 var(--color-brand);
  --shadow-btn-hard-hover: 2px 2px 0 var(--color-brand);
  --shadow-btn-hard-active: 0 0 0 var(--color-brand);
  --shadow-whatsapp-float: 0 4px 12px rgba(0, 0, 0, 0.15);
  --shadow-whatsapp-float-hover: 0 6px 16px rgba(0, 0, 0, 0.2);
  --shadow-product-card: 0 4px 12px rgba(0, 0, 0, 0.05);

  /* Transitions */
  --transition-fast: 120ms;
  --transition-base: 200ms;
}
```

> **Catatan:** Token spacing, typography, breakpoints, shadows, dan transitions di atas **belum diimplementasikan** di `@theme` saat ini. Saat ini hanya warna yang ada di `@theme`. Bagian ini mendokumentasikan **kontrak yang diinginkan** untuk migrasi. Agent migrasi harus menambahkan token ini ke `@theme` sebelum menggunakannya.

---

## 3.4 Breakpoint Tokens

Breakpoint yang digunakan di codebase **tidak cocok** dengan default Tailwind:

| Nama | Nilai | Digunakan Di | Tailwind Default |
|---|---|---|---|
| `sm` | 640px | Gallery 2-col, hero overlap grid | 640px ✓ |
| `md` | 768px | Header mobile restructure, product sticky CTA, contact 2-col, about 2-col | 768px ✓ |
| `lg` | 1024px | GridLines active, hero stagger 2-col, product 2-col | 1024px ✓ |
| `xl` | 1200px | Featured 12-col grid, shop 3-col, intro 2-col | 1280px ✗ |

**Migrasi:** Tambahkan `@theme` breakpoints seperti §3.3.4. Kemudian gunakan prefix `sm:`, `md:`, `lg:`, `xl:` di utility. **Jangan** mengubah media query component yang sudah ada sebelum token breakpoint tersedia dan diverifikasi visual parity.

---

## 3.5 Typography Utility Classes (Migration Target)

Kelas utilitas tipografi saat ini di `global.css` (lines 117–164) akan dipindahkan ke `@utility` atau component-scoped utilities:

| Kelas Saat Ini | Nilai | Rencana Migrasi |
|---|---|---|
| `.text-display-overlap` | `font-size: clamp(4rem, 18vw, 16rem); line-height: 0.85; font-weight: 800; text-transform: uppercase; letter-spacing: -0.02em;` | `@utility text-display-overlap` |
| `.text-display-stagger` | `font-size: clamp(2.75rem, 6vw, 6.5rem); line-height: 0.96; font-weight: 800; text-transform: uppercase; letter-spacing: -0.03em;` | `@utility text-display-stagger` |
| `.text-heading-page` | `font-size: clamp(2.25rem, 4.5vw, 4.25rem); font-weight: 800; line-height: 1.05; letter-spacing: -0.02em;` | `@utility text-heading-page` |
| `.text-heading-section` | `font-size: clamp(1.75rem, 2.8vw, 2.75rem); font-weight: 800; line-height: 1.1; letter-spacing: -0.01em;` | `@utility text-heading-section` |
| `.text-body` | `font-size: clamp(1rem, 1.2vw, 1.125rem); line-height: 1.7; max-width: 68ch;` | `@utility text-body` (max-width butuh arbitrary) |
| `.text-caption` | `font-size: clamp(0.8125rem, 1.1vw, 0.875rem); line-height: 1.5; color: var(--color-muted);` | `text-caption text-muted` (Tailwind) |
| `.text-nav-filter` | `font-size: clamp(0.8125rem, 1vw, 0.9375rem); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em;` | `@utility text-nav-filter` |

---

## 4. Tipografi

### 4.1 Arah

Satu keluarga sans-serif per proyek sudah cukup; maksimal dua. Karakter tipografi dibawa oleh **skala, bobot, dan penempatan**, bukan oleh banyaknya font.

| Preset | Karakter huruf | Contoh kandidat (bukan kewajiban) |
|---|---|---|
| Editorial | Grotesk netral, lebar normal, bobot tebal untuk display | Hanken Grotesk, Geist, Instrument Sans |
| Bold | Sans geometris dengan bukaan bulat, bobot tebal | Outfit, Red Hat Display |

- Muat font lewat paket self-hosted (mis. Fontsource), subset Latin, maksimal dua bobot atau satu variable font, `font-display: swap`.
- Fallback: `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.
- Hindari unduhan font besar yang tidak menambah nilai visual.

### 4.2 Skala

| Peran | Ukuran | Catatan |
|---|---|---|
| Display overlap | `clamp(4rem, 18vw, 16rem)` | Satu kata atau frasa pendek, huruf kapital lewat CSS, `line-height: 0.85` |
| Display stagger | `clamp(2.75rem, 9vw, 8rem)` | Tiga baris pendek, `line-height: 0.92` |
| Heading halaman | `clamp(2rem, 4vw, 4rem)` | Hierarki utama halaman dalam |
| Heading section | `1.5–2.25rem` | Judul galeri atau produk pilihan |
| Body | `1–1.125rem` | Panjang baris maksimal sekitar 70 karakter |
| Navigasi dan filter | `0.8125–0.9375rem` | Huruf kapital lewat CSS dengan jarak huruf 0,06–0,08em |
| Caption dan metadata | `0.8125–0.9375rem` | Informasi penting tidak boleh hanya di caption |

Per Appelgren memakai label navigasi sekitar 11 px. Starter menaikkannya ke minimal 13 px agar tetap terbaca.

### 4.3 Aturan

- **Huruf kapital hanya untuk tiga hal:** display hero, navigasi, dan filter. Paragraf, caption, judul produk, dan label kecil di atas heading tidak dikapitalkan. Gunakan `text-transform: uppercase` di CSS, bukan menulis kapital di konten.
- Display besar memakai letter-spacing sedikit negatif (sekitar `-0.02em`) dan bobot 700–800.
- Teks display yang terpotong tepi layar boleh hanya jika **teks yang sama tersedia sebagai teks biasa yang terbaca** (judul `h1` atau caption). Salinan raksasa yang terpotong ditandai `aria-hidden="true"`.
- Teks display tidak boleh menyebabkan scroll horizontal pada 360 px. Bungkus dengan `overflow-x: clip`.
- Jangan menonjolkan satu kata di dalam headline dengan warna atau italic berbeda sebagai kebiasaan.
- Italic dan serif editorial hanya bila cocok dengan klien, tidak sebagai default.

---

## 5. Layout dan spacing

### 5.1 Grid dan kontainer

- Dasar: CSS Grid 12 kolom. Layout tidak simetris diperbolehkan bila rasio foto dan urutan baca tetap jelas.
- Kontainer lebar: `width: min(100% - 2 * var(--gutter), 1600px)` dengan `--gutter: clamp(16px, 3vw, 48px)`. Foto besar membutuhkan ruang; kedua referensi memakai ruang tepi yang kecil.
- Jaga jarak kiri dan kanan pada mobile. Foto tidak menempel ke tepi tanpa alasan desain. Foto yang sengaja terpotong tepi layar hanya pada komposisi dekoratif (hero atau kolase), bukan pada galeri fungsional.
- Hindari masonry kompleks bila menyebabkan urutan keyboard, layout shift, atau perilaku responsif yang sulit diprediksi.
- Jangan memaksa semua foto ke crop yang sama bila merusak karya. Boleh menyatukan **tinggi baris** dan membiarkan lebar mengikuti rasio.
- Dua foto yang saling melengkapi boleh bersentuhan tanpa celah (seperti tumpukan pada referensi). Default tetap celah 8–24 px.

Skala spacing berbasis kelipatan 4/8 px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Jarak antar-section harus lebih lega daripada jarak antar-elemen di dalam komponen.

### 5.2 Responsivitas

| Lebar | Perilaku |
|---|---|
| **Mobile (360–767 px)** | Satu atau dua kolom sesuai orientasi foto. Hero overlap: foto 70–80% lebar, kata display diskalakan dan boleh terpotong di tepi. Hero stagger: indentasi bertingkat dihapus, rata kiri. Navigasi ringkas. |
| **Tablet (768–1199 px)** | Dua atau tiga kolom. Indentasi stagger dikurangi sekitar separuh. |
| **Desktop (1200 px ke atas)** | Tiga atau empat kolom bila foto tetap nyaman dilihat. Komposisi editorial penuh. Garis grid aktif. |

Jangan menentukan jumlah kolom hanya dari breakpoint; cek lebar aktual kartu, panjang judul, dan proporsi gambar. Gunakan `aspect-ratio`, `width`/`height` atau mekanisme reservasi ruang agar tidak ada layout shift.

### 5.3 Garis grid terlihat (opsional, preset Bold)

Meniru pola Gogoko: garis hairline yang tampak melewati section, dengan foto dan teks ditempatkan mengikuti garis.

- Komponen `GridLines`: lapisan `position: absolute`, `pointer-events: none`, `aria-hidden="true"`, berada **di belakang** foto dan di belakang teks.
- Garis vertikal mengikuti kolom (misalnya setiap dua dari dua belas kolom). Garis horizontal berupa `border-top: 1px solid var(--color-grid-line)` pada section.
- Aktif hanya mulai 1024 px. Tidak ditampilkan di mobile.
- Jangan membuat penempatan foto bergantung pada garis; garis mengikuti tata letak, bukan sebaliknya.
- Contoh dasar:

```css
.grid-lines {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    to right,
    var(--color-grid-line) 0 1px,
    transparent 1px calc(100% / 6)
  );
}
```

---

## 6. Pola halaman

Rute mengikuti `ARCHITECTURE.md`. Paket menentukan halaman yang benar-benar aktif.

### 6.1 `/` — Beranda

1. **Hero** (satu varian per proyek, lihat di bawah).
2. **Karya pilihan:** 4–6 foto `featured`, komposisi asimetris dengan ukuran bervariasi, caption overlay.
3. **Jalur ke galeri dan toko:** dua CTA yang jelas.
4. **Pengantar fotografer:** singkat, dua sampai tiga kalimat.

**Hero `overlap` (default Editorial):**

```text
┌────────────────────────────────────────────────────┐
│ ARSIP                Nama Fotografer       KONTAK  │
│                                                    │
│                    ┌────────────┐                  │
│ Judul karya        │            │                  │
│ (caption kecil)    │    FOTO    │                  │
│                    │            │                  │
│                    │            │                  │
│ JUDUL RAKSASA ─────┼────────────┼───── TERPOTONG   │
└────────────────────────────────────────────────────┘
  kata display di belakang foto, rata bawah, bleed ke tepi
```

- Foto berada di atas teks (`z-index` lebih tinggi). Teks raksasa selalu salinan dekoratif dari judul yang terbaca di caption.
- Foto hero adalah kandidat LCP: jangan lazy-load, beri `fetchpriority="high"`.
- Tidak ada slideshow otomatis.

**Hero `stagger` (default Bold):**

```text
┌────────────────────────────────────────────────────┐
│ LOGO      Galeri  Toko  Tentang  Kontak   [ Toko ] │
├────────┬───────────────────────────────────────────┤
│ ┌────┐ │ JUDUL HERO                                │
│ │FOTO│ │         BARIS KEDUA                       │
│ │    │ │    BARIS KETIGA                           │
│ │cap │ │                                           │
│ └────┘ │         [ LIHAT SEMUA FOTO ↓ ]            │
└────────┴───────────────────────────────────────────┘
  garis grid di belakang; foto dan teks mengikuti kolom
```

- Maksimal tiga baris pendek. Indentasi tiap baris kelipatan satu kolom grid.
- Satu `h1` dengan tiga `span` blok; bukan tiga heading.
- Satu foto unggulan dengan caption overlay, bukan kolase.

### 6.2 `/gallery`

- Judul halaman, lalu `FilterBar` berhitung bila masuk paket.
- Grid dengan rasio asli. Caption overlay atau caption di bawah foto, konsisten di seluruh halaman.
- Lightbox bila masuk paket. Foto yang punya `productId` menampilkan tautan ke detail produk.
- Tampilan `stack` (strip horizontal) hanya bila diminta (§7.6).

### 6.3 `/shop`

Lebih tertib daripada galeri. Kartu seragam dalam ukuran, grid yang rapi, informasi harga selalu terlihat. Foto tetap mempertahankan rasio aslinya di dalam bingkai tinggi yang sama (gunakan `object-fit: contain` pada latar `--color-surface` bila crop merusak karya).

### 6.4 `/products/[id]`

```text
┌───────────────────────────────┬───────────────────────┐
│                               │ Judul                 │
│                               │ Kategori · Jenis      │
│            FOTO               │ Rp 350.000            │
│          (preview)            │ Lisensi / spesifikasi │
│                               │ [ Beli foto ]         │
│                               │ [ Tanya via WhatsApp ]│
└───────────────────────────────┴───────────────────────┘
```

- Desktop: foto sekitar 7 dari 12 kolom, panel info sticky di kanan. Mobile: foto, lalu info, lalu CTA.
- CTA utama menyebut tindakan: "Beli foto" atau "Pesan cetak".
- Panel tidak menampilkan stok, diskon, rating, atau status "terjual" bila datanya tidak dikelola.
- Pada mobile, bar CTA lengket di bawah boleh dipakai; jika dipakai, tombol WhatsApp melayang disembunyikan di halaman itu.

### 6.5 `/about`, `/contact`, `/404`

- **About:** satu foto potret atau karya, teks singkat, tautan kontak.
- **Contact:** CTA WhatsApp sebagai jalur utama, media sosial, email bila ada.
- **404:** pesan yang menjelaskan apa yang terjadi dan dua tautan: galeri dan beranda.

---

## 7. Komponen dan pola UI

### 7.1 Header dan navigasi

- **`centered-wordmark`:** tiga zona. Kiri: satu tautan (Galeri atau Arsip). Tengah: nama fotografer. Kanan: Toko atau Kontak. Tanpa border dan tanpa dekorasi.
- **`split-nav`:** logo atau nama di kiri, navigasi di tengah, satu tombol menonjol (Toko) di kanan. Tidak ada ikon keranjang.
- Tautan aktif harus dikenali tanpa warna saja (garis bawah atau bobot).
- Area sentuh minimal 44 × 44 px walaupun teksnya kecil (tambahkan padding, bukan memperbesar huruf).
- Mobile: tiga tautan pada `centered-wordmark` cukup tetap terlihat; `split-nav` memakai menu ringkas yang bisa dioperasikan keyboard dan sentuh.
- Logo klien menggantikan teks nama; jangan meniru logo outline Gogoko atau wordmark Per Appelgren.

### 7.2 Hero

Lihat §6.1. Aturan umum: satu foto kuat atau satu komposisi, headline ringkas, satu atau dua CTA. Tanpa slideshow otomatis. Tidak ada teks panjang di atas foto bila kontras buruk.

### 7.3 Kartu galeri

- Foto adalah elemen utama.
- **Caption overlay:** judul (tebal) dan satu baris metadata (kategori atau tahun) di kiri bawah, di atas gradien `--color-scrim` (`linear-gradient(to top, var(--color-scrim), transparent 55%)`). Teks putih. Periksa kontras pada foto paling terang.
- Pada perangkat sentuh, caption selalu terlihat. Efek hover hanya peningkatan progresif.
- Seluruh kartu boleh menjadi tautan hanya bila tujuannya jelas (lightbox atau detail produk), dengan nama aksesibel yang menyebut judul foto.
- Caption tidak memuat nama pemilik foto kecuali klien adalah kolektif atau marketplace beberapa fotografer (butuh field `credit`, §15).

### 7.4 Tombol dan tautan

Tentukan satu gaya primary dan satu secondary per proyek. CTA harus spesifik ("Beli foto", "Pesan cetak", "Lihat semua foto"), bukan "Klik di sini".

**Editorial:**
- Primary: isi `--color-brand`, teks `--color-on-brand`, sudut persegi atau pil sesuai merek, tinggi minimal 44 px.
- Secondary: teks dengan garis bawah, tanpa kotak.

**Bold (outline dengan bayangan keras):**

```css
.btn-hard {
  min-height: 44px;
  padding: 0.75rem 1.25rem;
  border: 2px solid var(--color-brand);
  background: var(--color-bg);
  color: var(--color-brand);
  box-shadow: 4px 4px 0 var(--color-brand);
  text-decoration: underline;
  text-underline-offset: 0.25em;
}
@media (prefers-reduced-motion: no-preference) {
  .btn-hard { transition: transform 120ms, box-shadow 120ms; }
}
.btn-hard:hover  { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--color-brand); }
.btn-hard:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--color-brand); }
.btn-hard:focus-visible { outline: 3px solid var(--color-focus); outline-offset: 4px; }
```

Aturan bersama: hover, active, dan `focus-visible` harus terlihat jelas; status disabled hanya bila ada. Tautan eksternal membuka tab baru hanya bila berguna, dengan `rel="noopener noreferrer"`. Panah (↓) boleh pada satu atau dua CTA utama, bukan di setiap tautan.

### 7.5 Filter kategori

- Bentuk: baris tautan atau tombol: "Semua (48)", "Fashion (34)", "Beauty (14)". Jumlah dihitung dari `gallery.json` saat build, bukan ditulis tangan.
- Huruf kapital lewat CSS; jumlah ditampilkan lebih kecil di samping label.
- Item aktif ditandai dengan garis bawah atau bobot, bukan warna saja, dan memakai `aria-pressed` atau `aria-current`.
- Nama aksesibel memuat jumlah: "Fashion, 34 foto".
- Filter bekerja di browser tanpa backend dan tetap bisa dipakai tanpa animasi.

### 7.6 Pengalih tampilan dan tampilan alternatif (opsional, P2)

- **Pengalih tampilan:** hanya muncul bila minimal dua tampilan aktif. Bentuknya kontrol segmen (pil) dengan satu opsi aktif bergaya solid. Gunakan kelompok tombol dengan `aria-pressed` atau radio berlabel.
- **`grid`:** tampilan bawaan.
- **`stack`:** strip horizontal berisi foto dengan tinggi seragam dan lebar mengikuti rasio, memakai `overflow-x: auto` dan `scroll-snap`. Wajib bisa dioperasikan keyboard dan sentuh; tidak boleh mengunci scroll halaman.
- **`board`** (kanvas bebas pada referensi) tidak termasuk starter.
- **Tampilan daftar (indeks):** baris dengan tahun, judul, dan kategori. Sertakan thumbnail kecil yang selalu terlihat, bukan hanya pratinjau saat hover (tidak bisa dipakai di layar sentuh). Butuh field `year` (§15).
- Pil melayang di tengah bawah (seperti Per Appelgren) tunduk pada aturan elemen fixed di §7.8.

### 7.7 Lightbox

Jika masuk scope:

- Tampilkan foto sesuai viewport dan sediakan tombol tutup berlabel yang jelas.
- Dukung Escape, navigasi keyboard bila ada perpindahan foto, fokus yang terlihat, dan kontrol sentuh.
- Cegah scroll latar saat terbuka dan pulihkan fokus saat ditutup. Dialog memiliki nama aksesibel.
- Sembunyikan elemen fixed lain (WhatsApp melayang, pengalih tampilan) saat lightbox terbuka.
- Tanpa autoplay, zoom berlebihan, atau animasi panjang.

### 7.8 Elemen fixed

Referensi memakai dua elemen yang menempel di layar (pil di tengah bawah pada Per Appelgren, tombol WhatsApp di kanan bawah pada Gogoko). Agar tidak saling menutup:

- Maksimal **satu** elemen fixed di area bawah pada satu waktu.
- Hormati `env(safe-area-inset-bottom)`.
- Elemen fixed tidak boleh menutupi CTA utama, bar CTA produk, atau footer.
- **WhatsApp melayang:** bulat, `--color-whatsapp`, nama aksesibel jelas ("Chat WhatsApp"). Label teks ("Ada pertanyaan?") hanya ditampilkan mulai 640 px; di mobile cukup ikon. Pesan terisi otomatis memuat konteks halaman (nama produk bila ada).

### 7.9 Kartu produk dan detail

- Tampilkan foto, nama, harga, dan jenis atau label produk dengan jelas. Pada detail, jelaskan lisensi digital atau spesifikasi fisik dari informasi klien.
- Karena tidak ada cart, CTA mengarah ke checkout eksternal per produk atau WhatsApp.
- Jangan menampilkan stok, diskon, rating, atau "terjual" kecuali datanya dikelola.
- Jangan menampilkan klaim bahwa pembayaran berhasil; website tidak mengetahui status transaksi.

### 7.10 Footer

Kontak, tautan sosial, hak cipta, dan tautan legal yang relevan. Jangan mengarang kebijakan legal; teks legal dan privasi harus disediakan atau disetujui pemilik bisnis.

---

## 7.11 Tailwind CSS v4 Migration Boundaries

### 7.11.1 Kategori Migrasi

Setiap pola CSS diklasifikasikan sebelum dimigrasikan:

#### **Migrate** — Pindahkan ke Utility Tailwind
Pola presentasi dan layout standar yang aman diekspresikan sebagai utility:

| Pola | Contoh Lokasi | Utility Target |
|---|---|---|
| Display, flex, grid | Semua component `<style>` | `flex`, `grid`, `grid-cols-*`, `gap-*` |
| Spacing (margin, padding, gap) | Component styles | `p-*`, `m-*`, `gap-*` dengan arbitrary values `gap-[clamp(12px,2vw,24px)]` |
| Typography sederhana | `.text-body`, `.text-caption`, heading styles | `text-*`, `font-*`, `leading-*`, `tracking-*`, `uppercase` |
| Colors (bg, text, border) | `var(--color-brand)`, `var(--color-muted)`, dll. | `bg-brand`, `text-muted`, `border-border` (dari `@theme`) |
| Borders, radii | `border: 1px solid var(--color-border)`, `border-radius: 0` | `border`, `border-brand`, `rounded-none` |
| Shadows sederhana | `box-shadow: 0 4px 12px rgba(0,0,0,0.15)` | `shadow-md`, `shadow-[0_4px_12px_rgba(0,0,0,0.15)]` |
| Responsive layout | `@media (min-width: 640px)` → `sm:` | `sm:grid-cols-2`, `md:flex-row`, dll. |
| State variants | `:hover`, `:focus-visible`, `:active`, `.btn--disabled` | `hover:`, `focus-visible:`, `active:`, `disabled:` |
| Transitions | `transition: transform 120ms, box-shadow 120ms` | `transition-[transform,box-shadow] duration-120` |
| Container utility | `.container` class | `@utility container` atau component pattern |

#### **Evaluate Individually** — Perlu Penilaian Kasus-per-Kasus
Pola yang melibatkan arbitrary values, perilaku responsif kompleks, atau komposisi komponen khusus:

| Pola | Lokasi | Pertimbangan |
|---|---|---|
| GridLines decorative layer | `global.css` lines 82–98, `GridLines.astro` | `repeating-linear-gradient` + `position: absolute` + `pointer-events: none` — kandidat `@utility grid-lines` |
| Scrim gradient | `global.css` lines 101–103 | `linear-gradient(to top, var(--color-scrim), transparent 55%)` — kandidat `@utility scrim-gradient` |
| Photo frame system | `global.css` lines 319–341 | Multi-element (`.photo-frame`, `.frame-fallback`, `object-fit: cover/contain`) — pertahankan sebagai component CSS |
| Hero stagger indent | `index.astro` lines 517–523 | `span:nth-child(2) { margin-left: 8.333% }` — content-specific, pertahankan |
| Gallery mosaic grid | `gallery.astro` lines 306–341 | 12-col dengan `grid-column: span 7/5`, `grid-row: 1/3`, aspect-ratio per index — pertahankan |
| Header mobile restructure | `Header.astro` lines 185–220 | `flex-wrap`, `order`, `row-gap` changes — kompleks, pertahankan |
| Sticky CTA bar mobile | `[id].astro` lines 328–343, 363–369 | `position: sticky`, negative margins, `has-sticky-cta` body class + JS — pertahankan |
| WhatsApp float + IntersectionObserver | `global.css` 264–302, `BaseLayout.astro` script | `env(safe-area-inset)`, fixed positioning, JS coordination — pertahankan |

#### **Retain** — Tetap sebagai CSS Biasa
CSS yang lebih jelas, aman, dan maintainable sebagai CSS biasa:

| Pola | Alasan |
|---|---|
| **Complex keyframe animations** (M2 scroll-driven) | Awkward/brittle sebagai utility strings; belum diimplementasikan |
| **Lightbox** (overlay, focus trap, focus restoration, swipe, keyboard nav) | Tightly coupled ke JS behavior; vanilla JS minimal |
| **Reduced motion global reset** | `global.css` lines 354–362 — `*` selector dengan `!important`, global baseline |
| **Focus-visible global outline** | `global.css` lines 58–61 — accessibility baseline |
| **Skip link** | `global.css` lines 64–79 — accessibility pattern, tidak reusable |
| **Font loading / `@font-face`** | Belum ada; saat ditambah, pertahankan di CSS global |
| **Print styles** (jika ditambah) | Media-specific, tidak utility |

### 7.11.2 Aturan `@utility` Usage

Gunakan `@utility` **hanya** untuk:
1. Pola yang **benar-benar reusable** di seluruh design system (mis. `text-display-*`, `scrim-gradient`, `container`, `grid-lines`, `btn-hard`).
2. Pola yang **tidak bergantung pada state JS** atau struktur DOM khusus.
3. Pola yang **mengurangi duplikasi** signifikan di component.

**Jangan** buat `@utility` untuk:
- Pola yang hanya dipakai 1–2 kali.
- Pola yang butuh arbitrary values berbeda tiap pemakaian.
- Pola yang coupled ke JavaScript behavior.

### 7.11.3 CSS Cascade & Coexistence Rules

Selama migrasi bertahap:

1. **Existing CSS dan Tailwind utilities coexist** — Urutannya: `@import "tailwindcss"` (base, components, utilities) → component `<style>` blocks (spesifik, override).
2. **Selector specificity** — Component scoped styles (Astro) memiliki specificity lebih tinggi dari utility global. Hindari `!important` kecuali reduced motion.
3. **Duplicate declarations** — Saat memigrasi pola, hapus CSS lama **hanya setelah** memverifikasi utility Tailwind menghasilkan computed style yang sama (cek DevTools).
4. **Buildable state** — Setelah setiap batch migrasi, `npm run build` harus berhasil.
5. **Visual parity check** — Bandingkan viewport 360px, 768px, 1024px, 1200px+ sebelum dan sesudah.

---

## 8. Aturan gambar

### 8.1 Preview dan watermark

- Gunakan preview hasil pipeline gambar, bukan foto master.
- Pertahankan rasio asli bila rasio bagian dari karya; crop hanya bila dikonfirmasi.
- Tentukan ukuran berdasarkan tempat pemakaian, bukan satu ukuran maksimal untuk semua konteks.
- Watermark harus terlihat dengan tujuan yang disepakati, tetapi tidak menutupi subjek utama. Posisi dan opacity bisa diubah sesuai materi.
- Watermark tidak boleh dipasarkan sebagai jaminan foto tidak dapat diunduh atau dicuri.
- Pada foto yang ditimpa teks atau caption, periksa watermark tidak bertabrakan dengan caption.

### 8.2 Teks alternatif

- `alt` mendeskripsikan isi foto secara ringkas. Gambar dekoratif memakai `alt=""`.
- Jangan memakai nama file atau kata kunci SEO berulang sebagai pengganti alt.

### 8.3 Performa

- WebP sebagai baseline; AVIF hanya bila manfaatnya terukur dan fallback benar.
- Sajikan ukuran sumber sesuai kebutuhan tampilan.
- Foto hero atau LCP: tanpa lazy-load dan dengan `fetchpriority="high"`. Gambar di bawah lipatan: lazy-load.
- Dimensi (`width` dan `height`) harus diketahui untuk setiap foto agar tidak ada layout shift (§15).

---

## 9. Motion

Tiga level. Paket menentukan level tertinggi yang boleh dipakai.

| Level | Isi | Paket |
|---|---|---|
| **M0** | Tanpa motion kecuali transisi hover dan fokus yang cepat (100–200 ms) | Semua paket |
| **M1** | Satu urutan masuk saat halaman dimuat (misalnya foto hero dan baris judul muncul bergantian, maksimal 600 ms), hanya bila `prefers-reduced-motion: no-preference` | Standard ke atas |
| **M2** | Animasi terhubung scroll (foto masuk dari tepi, teks display tersingkap, seperti pada Per Appelgren) | Add-on terpisah, bukan bagian starter |

Aturan:

- Konten dan CTA tidak boleh tertunda atau tersembunyi oleh animasi. Tanpa JavaScript atau dengan reduced motion, halaman tetap lengkap.
- M2 dibuat sebagai peningkatan progresif (misalnya CSS `animation-timeline` dengan fallback statis); dukungan browser belum seragam, jadi tampilan statis harus tetap utuh.
- Hindari parallax, scroll-jacking, kursor kustom, video background, dan animasi berat pada MVP.
- Jangan memuat library animasi sebelum ada kebutuhan yang jelas dan disetujui.
- Satu momen masuk lebih kuat daripada efek di setiap section; jangan menambahkan fade-in pada semua blok.

---

## 10. Aksesibilitas

- Semua fungsi inti tersedia lewat keyboard, dan fokus terlihat jelas (`outline` dengan `outline-offset`, bukan hanya perubahan warna).
- Heading hierarkis; satu `h1` per halaman. Jangan memilih level heading hanya demi ukuran visual.
- Teks display raksasa: `h1` tetap berisi teks lengkap. Salinan dekoratif yang terpotong memakai `aria-hidden="true"`. Huruf kapital lewat CSS agar pembaca layar tidak mengeja huruf satu per satu.
- Garis grid dan elemen dekoratif lain: `aria-hidden="true"` dan `pointer-events: none`.
- Tombol dan tautan punya nama yang jelas dan area sentuh minimal 44 × 44 px.
- Jangan mengandalkan warna saja untuk menandai kategori, status, atau tautan aktif.
- Teks di atas foto: gunakan `--color-scrim` dan uji pada foto paling terang; jangan menutup karya secara berlebihan.
- Filter berhitung dan pengalih tampilan memakai atribut state (`aria-pressed` atau `aria-current`) dan nama yang memuat jumlah atau tampilan.
- Lightbox: dialog bernama, tombol tutup berlabel, fokus kembali ke pemicu.
- Hormati `prefers-reduced-motion` di semua level motion.
- Target Lighthouse minimal 75 mobile dan 80 desktop untuk halaman representatif; isu aksesibilitas nyata tetap diperbaiki walaupun skor sudah tercapai.

---

## 11. Aturan brand per klien dan konfigurasi

Token default adalah baseline starter. Saat proyek klien dimulai:

1. Identifikasi jenis fotografi, audiens, dan karakter merek.
2. Pilih preset (Editorial atau Bold), lalu sesuaikan `--color-brand`, font, lebar kontainer, varian hero, dan perlakuan caption.
3. **Hitung ulang kontras** setiap warna merek baru (§3.2). Jika merek klien terlalu terang untuk teks kecil, pakai versi lebih gelap untuk teks dan versi aslinya hanya untuk display besar.
4. Tetap memakai komponen dan pola yang ada; catat perubahan khusus di konfigurasi tema, bukan dengan menyalin komponen.
5. Konfirmasi arah visual lewat **satu komposisi hero** sebelum diterapkan ke semua halaman.

Pilihan yang sebaiknya dapat diatur lewat `src/config/site.ts` (nama kunci hanyalah usulan):

| Pilihan | Nilai |
|---|---|
| `theme.preset` | `editorial` \| `bold` |
| `theme.brand` | warna merek (hex) |
| `hero.variant` | `overlap` \| `stagger` |
| `header.variant` | `centered-wordmark` \| `split-nav` |
| `gallery.views` | daftar tampilan aktif, mis. `["grid"]` atau `["grid", "stack"]` |
| `features` | `filter`, `lightbox`, `gridLines`, `whatsappFloating`, `entranceMotion` |

Jangan menjadikan satu referensi sebagai desain final semua klien. Starter harus menampung gaya editorial, landscape, travel, fine-art, dan jenis fotografi lain tanpa kehilangan konsistensi.

---

## 12. Matriks fitur visual per paket (usulan)

Usulan awal selaras dengan paket Lite, Standard, dan Plus. Keputusan final tetap di proposal (lihat `PRD.md` §13). Sesuai `pholio-docs/PROPOSAL.md`, **filter kategori dan lightbox termasuk dalam paket Standard**; Plus mencakup seluruh fitur Standard ditambah kapasitas dan layanan yang disepakati di proposal.

| Fitur visual | Lite | Standard | Plus |
|---|:---:|:---:|:---:|
| Preset tema, warna merek, dan font klien | ✓ | ✓ | ✓ |
| Satu varian hero | ✓ | ✓ | ✓ |
| Header `centered-wordmark` atau `split-nav` | ✓ | ✓ | ✓ |
| Grid galeri dengan rasio asli | ✓ | ✓ | ✓ |
| WhatsApp melayang | ✓ | ✓ | ✓ |
| Caption overlay pada foto | n/a | ✓ | ✓ |
| Garis grid (preset Bold) | n/a | ✓ | ✓ |
| Motion M1 (urutan masuk) | n/a | ✓ | ✓ |
| Filter berhitung | n/a | ✓ | ✓ |
| Lightbox | n/a | ✓ | ✓ |
| Tampilan `stack` dan pengalih tampilan | n/a | n/a | Add-on |
| Tampilan daftar (indeks) | n/a | n/a | Add-on |
| Motion M2 (terhubung scroll) | n/a | n/a | Add-on terpisah |

---

## 13. Kriteria penerimaan visual

- [ ] Karya fotografi menjadi fokus utama dan tidak dikalahkan ornamen.
- [ ] Hero adalah satu-satunya momen tipografi raksasa; halaman lain memakai skala biasa.
- [ ] Teks display raksasa tidak menyebabkan scroll horizontal pada 360 px, dan teks lengkapnya tersedia sebagai teks yang terbaca.
- [ ] Identitas, navigasi, galeri atau katalog, dan CTA mudah ditemukan.
- [ ] Grid mempertahankan rasio dan crop yang pantas, tanpa layout shift mencolok.
- [ ] Tipografi hierarkis, terbaca, dan tidak meluap pada mobile; huruf kapital hanya pada display, navigasi, dan filter.
- [ ] Kontras teks, tautan, fokus, dan tombol dihitung dan memenuhi 4,5 : 1 untuk teks biasa dan 3 : 1 untuk teks besar serta kontrol.
- [ ] Caption di atas foto terbaca pada foto paling terang.
- [ ] Tidak ada elemen fixed yang menutupi CTA, footer, atau elemen fixed lain.
- [ ] Semua interaksi utama dapat dipakai dengan mouse, keyboard, dan sentuhan.
- [ ] Animasi tidak menghalangi akses ke foto atau CTA, dan halaman utuh dengan reduced motion.
- [ ] Tidak ada ikon keranjang, status stok, atau klaim status pembayaran.
- [ ] Tidak ada foto, logo, teks, atau nama merek dari situs referensi pada hasil akhir.
- [ ] Tampilan diuji pada 360 px, 768 px, dan 1200 px atau lebih.
- [ ] Hanya preview yang dipakai pada halaman publik.
- [ ] Target Lighthouse ≥ 75 mobile dan ≥ 80 desktop dicatat pada halaman representatif.

---

## 14. Hal yang tidak termasuk dalam sistem visual MVP

- Menyalin halaman atau identitas kedua situs referensi.
- Desain ulang tanpa batas di luar jumlah revisi proposal.
- Tema gelap atau pengalih tema oleh pengguna, kecuali diminta dan disepakati.
- Animasi terhubung scroll (M2), 3D, video background, WebGL, kursor kustom, dan efek yang membutuhkan pemeliharaan khusus.
- Tampilan `board` (kanvas bebas) dan galeri dengan posisi acak yang dihitung di klien.
- Ikon keranjang, mini-cart, badge jumlah item, dan layout toko yang bergantung pada checkout internal.
- Pratinjau saat hover sebagai satu-satunya cara melihat foto pada tampilan daftar.
- Komponen UI dekoratif yang tidak mendukung penemuan karya, pemahaman produk, atau pembelian.

---

## 16. Tailwind CSS v4 Implementation Notes

### 16.1 Setup Saat Ini

| Aspek | Implementasi |
|---|---|
| **Import** | `@import "tailwindcss";` di `src/styles/global.css` line 1 |
| **Theme tokens** | `@theme` block di `global.css` lines 3–16 (hanya warna saat ini) |
| **Preset switching** | CSS custom properties di `:root[data-theme-preset="bold"]` + `<html data-theme-preset={themePreset}>` di `BaseLayout.astro` |
| **Vite plugin** | `@tailwindcss/vite` di `astro.config.mjs` line 22 |
| **Config file** | Tidak ada `tailwind.config.js` (benar untuk v4) |
| **Content detection** | Auto via Vite plugin (scan `.astro`, `.ts`, `.tsx`, `.js`, `.jsx`, `.html`) |
| **CSS custom properties** | Digunakan untuk theme switching & compatibilitas v1 |

### 16.2 Konvensi Project-Specific

| Konvensi | Aturan |
|---|---|
| **Utility-first default** | Layout, spacing, typography, colors, borders, shadows, responsive, states → utility classes |
| **`@theme` untuk design tokens** | Warna, spacing, typography clamp, breakpoints, shadows, transitions |
| **`@utility` untuk reusable patterns** | `text-display-*`, `container`, `scrim-gradient`, `grid-lines`, `btn-hard` (Bold variant) |
| **Component `<style>` untuk complex patterns** | Photo frame, lightbox, mosaic grid, header restructure, sticky CTA, WhatsApp float |
| **CSS custom properties untuk theme switching** | `--color-brand`, `--color-bg`, `--color-grid-line` override via `data-theme-preset` |
| **Arbitrary values allowed** | `clamp()`, custom widths, exact spacing, specialized gradients, animation values — gunakan `[value]` syntax |
| **No `@apply`** | v4 tidak menganjurkan `@apply`; gunakan utility langsung di markup atau `@utility` |
| **No `@layer`** | v4 tidak menggunakan `@layer base/components/utilities` |

### 16.3 Class Detection & Dynamic Classes

- Tailwind v4 mendeteksi class dari **source code statis** (template literals, string concatenation tidak dideteksi).
- Pola dinamis yang ada: `.filter-btn--active`, `.header-nav-link--active`, `.featured-item--${i}`, `.gallery-item--${index}`.
- **Aturan:** Class yang dibangun dinamis harus ditulis utuh di string template atau dipindahkan ke data-driven class maps. Contoh: `class={`filter-btn${isActive ? ' filter-btn--active' : ''}`}` → OK karena `filter-btn--active` utuh di source.
- `hasPublicAsset()` helper tidak memengaruhi class detection.

### 16.4 Verification Checklist Per Migration Batch

- [ ] `npm run build` sukses
- [ ] Visual parity: 360px, 768px, 1024px, 1200px+ (mobile, tablet, desktop, wide)
- [ ] Responsive layout: grid columns, flex direction, container width, gutter
- [ ] Typography: clamp values, line-height, letter-spacing, text-transform
- [ ] Colors: both Editorial & Bold presets (toggle `data-theme-preset`)
- [ ] Interactions: hover, focus-visible, active, disabled states
- [ ] Animations: button hard shadow transform, WhatsApp float scale, transitions
- [ ] Reduced motion: `prefers-reduced-motion: reduce` disables all
- [ ] Accessibility: focus visible, skip link, aria attributes, heading hierarchy
- [ ] No console errors, no layout shift (CLS)
- [ ] Removed CSS verified no remaining consumers

---

## 15. Sinkronisasi dengan dokumen lain

DESIGN ini tidak mengubah `PRD.md` atau `ARCHITECTURE.md`. Hal berikut perlu diselaraskan **hanya bila fiturnya diaktifkan** pada paket:

| Kebutuhan desain | Dokumen yang perlu menyesuaikan |
|---|---|
| Field `width` dan `height` pada setiap item `gallery.json` (cegah layout shift, hero overlap) | `ARCHITECTURE.md` §4 |
| Field opsional `year` (tampilan daftar) dan `credit` (kolektif atau banyak fotografer) | `ARCHITECTURE.md` §4 |
| Varian `floating` pada `WhatsAppButton`; komponen baru `GridLines`, `FilterBar`, `ViewSwitch` (opsional) | `ARCHITECTURE.md` §2 |
| Kunci konfigurasi tema, hero, header, tampilan galeri, dan fitur (§11) | `ARCHITECTURE.md` (`config/site.ts`) |
| Tombol WhatsApp melayang sebagai persyaratan eksplisit | `PRD.md` §8 (terkait FR-06) |
| Motion level M1 dan M2 sebagai bagian atau add-on paket | `PRD.md` §5 dan §13 |
