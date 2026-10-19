# ASSET_GUIDE.md — Panduan Aset Foto Pholio

Panduan praktis: tempat menyimpan setiap jenis foto, konvensi nama, field JSON terkait, dan cara menambah karya baru. Baca juga `ARCHITECTURE.md` §2 (alur foto) untuk gambaran besar.

---

## 1. Dua jenis foto (jangan tertukar)

| Jenis | Lokasi | Isi | Terpublikasi? | Untuk apa |
|---|---|---|---|---|
| **Master** (jual / kirim) | `private-assets/source/` | File asli resolusi penuh, **tanpa watermark** | ❌ tidak pernah | File yang **dijual & dikirim** ke pembeli (produk digital Mayar) atau sumber cetak |
| **Preview** (tampil) | `public/images/previews/` | WebP hasil resize + **watermark** | ✅ ya | Hanya untuk **ditampilkan di website** (galeri, hero, kartu produk, lightbox) |

Aturan emas:
- **Master = file untuk dijual/dikirim.** Simpan di `private-assets/`, atau unggah langsung ke produk digital Mayar. Jangan pernah taruh di `public/` (akan ikut ter-deploy dan bisa diunduh siapa saja).
- **Preview = file untuk tampil.** Ada di `public/images/previews/`, di-render website.
- `private-assets/` sudah masuk `.gitignore` — tidak akan di-commit.

---

## 2. Konvensi penamaan

### 2.1 Master (source)

Lokasi: `private-assets/source/`

Format nama bebas, tapi konsisten. Contoh saat ini:
- `previews01.jpeg`, `previews02.jpeg`, … `previews15.jpeg`

### 2.2 Preview (output)

Lokasi: `public/images/previews/`

Pola default (dari pipeline): `{nama-source}-wm.webp`

- `previews01.jpeg` → `previews01-wm.webp`
- `previews02.jpeg` → `previews02-wm.webp`

Suffix `-wm` menandakan **watermarked**. Jika ingin nama deskriptif (mis. `sunset-bromo`), tambahkan pemetaan di `src/config/images.json` (lihat §5).

> Catatan: file `galery01.webp` … `galery09.webp` yang sudah ada adalah hasil konversi manual **belum ber-watermark** dan memakai nama "galery" (typo). Saat pipeline dijalankan ulang, file `previewsNN-wm.webp` akan dihasilkan dan sebaiknya menggantikan file manual tersebut.

---

## 3. Known Documentation vs Implementation Discrepancies

### 3.1 `-wm` Naming Discrepancy

**Status:** Existing inconsistency between documentation and implementation.

| Aspect | Documentation / Config | Actual Implementation |
|---|---|---|
| **Output suffix** | `watermark.json` → `"outputSuffix": "-wm"` | Pipeline produces `-wm.webp` |
| **Existing previews in `public/images/previews/`** | `galery01.webp` … `galery09.webp` (typo "galery", no `-wm` suffix, no watermark) | Manual conversion artifacts, not from pipeline |
| **JSON references** | `gallery.json` / `products.json` reference `/images/previews/previews01-wm.webp` pattern | Actual files don't match; placeholders render instead |

**Impact:**
- Current `gallery.json` and `products.json` reference preview files that don't exist (`previews01-wm.webp` etc.)
- Placeholder frames render instead of actual images until pipeline is run
- Existing `galery01.webp`…`galery09.webp` files are orphaned (not referenced by JSON)

**Resolution (NOT part of this documentation task):**
- Run `node scripts/optimize-images.mjs` to generate proper `-wm.webp` previews from master sources
- Update JSON references to match generated filenames
- Remove orphaned `galery*.webp` files

> **Do not** rename assets, change `images.json`, modify the image pipeline, or claim the discrepancy has been fixed. This is recorded as an existing inconsistency for awareness during migration.

---

## 4. Field JSON yang menunjuk foto

### 4.1 Galeri — `src/content/gallery.json`

```json
{
  "id": "previews01",
  "title": "Judul karya (diisi pemilik)",
  "category": "landscape",
  "src": "/images/previews/previews01-wm.webp",
  "alt": "Deskripsi visual foto untuk aksesibilitas",
  "featured": true,
  "productId": "previews01-license"
}
```

- `src` → path preview (harus cocok dengan file di `public/images/previews/`).
- `featured` → tampil di homepage "Karya Pilihan".
- `productId` → isi bila foto ini dijual sebagai produk (cocokkan dengan `products.json` → `id`). Kosongkan bila hanya pameran.

### 4.2 Produk — `src/content/products.json`

```json
{
  "id": "previews01-license",
  "type": "digital",
  "title": "Judul produk",
  "price": 350000,
  "currency": "IDR",
  "preview": "/images/previews/previews01-wm.webp",
  "checkout": { "provider": "mayar", "url": "https://..." },
  "licenseLabel": "Lisensi personal",
  "featured": true
}
```

- `preview` → path preview produk (ditampilkan di toko & detail).
- `checkout.url` → URL checkout Mayar produk digital (lihat §7).

---

## 5. Pemetaan nama source → preview

`src/config/images.json`:

```json
{
  "mapping": {},
  "fallback": { "useSourceName": true, "addSuffix": "-wm" }
}
```

- Tanpa entri `mapping`, pipeline memakai nama source + `-wm`.
- Untuk nama deskriptif, tambahkan entri, contoh:
  ```json
  "mapping": { "previews01.jpeg": "sunset-bromo" }
  ```
  → output `sunset-bromo-wm.webp`.

---

## 6. Menambah karya baru (langkah demi langkah)

1. Taruh file **master** (resolusi penuh) di `private-assets/source/`.
2. (Sekali) isi nama fotografer di `src/config/site.json` → `photographer` agar watermark benar.
3. Jalankan pipeline:
   ```sh
   node scripts/optimize-images.mjs
   ```
   Output watermarked → `public/images/previews/{nama}-wm.webp`.
4. Tambah/update entri di `gallery.json` (field `src`) dan, jika dijual, `products.json` (field `preview`).
5. Jika produk digital: unggah file **master** ke produk digital Mayar, salin URL checkout ke `checkout.url`.
6. Verifikasi: `node scripts/validate-json.mjs` lalu `npm run build`, cek halaman galeri/detail.

---

## 7. Integrasi Mayar (tanpa API key)

Untuk MVP, Pholio memakai **checkout produk digital yang dihosting Mayar** — pendekatan paling sederhana dan andal untuk situs statis.

**Tidak butuh API key.** Yang dibutuhkan hanya URL checkout per produk:

1. Buat akun Mayar dan produk digital (unggah file master, set harga & deskripsi).
2. Mayar menyediakan **URL checkout** untuk produk tersebut.
3. Salin URL ke `products.json` → `checkout.url`.
4. Tombol "Beli Foto" di halaman detail akan mengarahkan pembeli ke checkout Mayar.
5. Mayar menangani pembayaran + **pengiriman file digital** secara otomatis.

API key + webhook + backend hanya diperlukan untuk pendekatan kustom (membuat pembayaran via API dan memproses webhook sendiri) — **tidak direkomendasikan** untuk starter ini dan membutuhkan server yang aman.

> Selama `checkout.url` kosong atau masih `example.invalid`, halaman detail menampilkan "Checkout belum tersedia" (bukan tautan mati).
