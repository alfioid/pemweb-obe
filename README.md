# Peraktikum Pemrograman Web
## Identitas Mata Kuliah
* Nama : Muhammad Nur Alfian
* Program Studi : Teknik Komputer 
* Institude : Universitas Borneo Tarakan
* Mata Kuliah  : Pemrograman Web


## Deskripsi Proyek
Proyek ini berisikan judul dengan tulisan "Peraktikum Pemrograman WEb" dan paragraf yang berisi "Repository awal OBE."

## Teknologi 
* HTML
* Laragon 5
* git/github

## Cara menjalankan Program
1. Jalankan Laragon 5, klik `Start All`, lalu buka `http://localhost` untuk memastikan Apache berjalan.
2. Pastikan direktori repository "pemweb-obe" disimpan ke direktory C:\laragon\www
3. Kemudian Akses halaman melalui `http://localhost/pemweb-obe/

## Modul 2
Pada halaman website ini sudah terdapat beberapa struktur dasar HTML, seperti head dan body. Pada bagian body, terdapat header yang berfungsi sebagai judul halaman dan dilengkapi dengan navigation (nav) untuk mengarahkan pengguna ke bagian atau bab yang dipilih.


## Checklist aksesibilitas dasar
| Parameter |	Implementasi pada Kode | Status |
| -- | -- | -- |
| lang |	Menggunakan <html lang="id"> untuk bahasa Indonesia. |	✓ |
| Heading |	Terstruktur runtut: 1x h1, 3x h2, dan h3 (tidak melompat). |	✓ |
| alt |	Gambar memiliki deskripsi jelas, ikon dekoratif memakai alt="". |	✓ |
| Label Form |	Setiap input terhubung dengan <label> via atribut for dan id. |	✓ |
| Teks Link |	Tautan deskriptif (misal: "Alur Layanan", bukan "klik di sini"). |	✓ |
| Keyboard |	Bisa dinavigasi pakai tombol Tab dan ada tombol skip link. |	✓ |


---

### Catatan Keputusan Desain

**1. Tata Letak (Grid & Flexbox)**

* **Keputusan:** Menggunakan **CSS Grid** untuk membagi halaman menjadi 2 kolom dan **Flexbox** untuk merapikan isi di dalam kartu (*card*) serta navigasi header.
* **Alasan:** Agar tampilan rapi, seimbang antara gambar di satu sisi dan informasi di sisi lainnya, serta otomatis berubah menjadi 1 kolom yang menumpuk saat dibuka di HP (Mobile-first).

**2. Warna & Ukuran (`:root`)**

* **Keputusan:** Menyimpan semua warna dasar, *margin*, dan *padding* ke dalam variabel `:root`.
* **Alasan:** Memudahkan perubahan warna atau tema web di kemudian hari secara instan tanpa perlu mengubah ratusan baris kode satu per satu.

**3. Komponen Berulang (Reusable)**

* **Keputusan:** Membuat kelas CSS khusus yang bisa dipakai berulang kali, seperti `.card` (kotak informasi) dan `.btn` (tombol).
* **Alasan:** Menghemat penulisan kode CSS agar tidak berulang-ulang (*efisiensi kode*).

**4. Aksesibilitas (`:focus-visible`)**

* **Keputusan:** Menambahkan efek garis luar (*outline*) tebal saat tombol atau link ditekan menggunakan tombol `Tab` keyboard.
* **Alasan:** Memudahkan navigasi bagi pengguna yang tidak menggunakan *mouse*.

**5. Responsif Gambar & Tabel**

* **Keputusan:** Menggunakan `object-fit: cover` pada gambar dan `overflow-x: auto` pada tabel.
* **Alasan:** Mencegah gambar terlihat gepeng serta menjaga tabel agar tidak merusak/melebarkan tampilan layar HP saat di-scroll.


## Latihan Praktikum A: Accessible Form Proyek

### 1. Tujuan Form
Modul form ini dibangun untuk memfasilitasi dua fungsi utama pada sistem Manajemen Kost Modern:
* **Pendaftaran Sewa Kamar:** Memungkinkan calon penyewa mendaftar, memilih kamar, menentukan durasi sewa, serta jadwal tanggal mulai masuk.
* **Pengaduan Kendala / Laporan:** Memungkinkan penghuni aktif menyampaikan keluhan atau gangguan fasilitas (listrik, air, kebersihan, keamanan) secara mandiri.

---

### 2. Catatan Aksesibilitas (Accessibility / A11y)
Form ini dirancang sesuai standar aksesibilitas web W3C WCAG:
1. **Pemanfaatan Semantik HTML & ARIA Attributes:**
   * Menggunakan atribut `aria-required="true"` pada setiap input yang wajib diisi.
   * Penggunaan `role="tablist"`, `role="tab"`, dan `role="tabpanel"` untuk navigasi tab form yang ramah *screen reader*.
   * Menggunakan `aria-describedby` untuk menghubungkan input dengan pesan petunjuk penjelas.
2. **Keterhubungan Label & Input (`for` - `id`):**
   * Semua bidang input terhubung eksplisit dengan elemen `<label>` melalui atribut `for` dan `id`, sehingga pengguna *screen reader* dapat mendengar konteks input secara tepat.
3. **Pesan Pemberitahuan Dinamis (`aria-live="polite"`):**
   * Elemen notifikasi status form menggunakan `aria-live="polite"` agar perubahan status validasi/berhasil langsung dibacakan oleh perangkat bantu tanpa mengganggu pengguna.
4. **Ukuran Target Sentuh & Kontras Warna:**
   * Tombol dan bidang input memiliki ukuran yang memenuhi standar layar sentuh perangkat mobile.
   * Kontras warna antara teks dan latar belakang memenuhi standar minimum kecerahan.