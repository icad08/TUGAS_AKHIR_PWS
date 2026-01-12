☕ Kopi API Service (Open API Platform)
Kopi API Service adalah layanan backend RESTful yang dirancang sebagai platform Open API. Sistem ini memungkinkan pengembang (developer) untuk mendaftar, mendapatkan API Key secara mandiri, dan mengakses data produk kopi secara aman.

Dibangun dengan arsitektur modern menggunakan NestJS, sistem ini menerapkan standar keamanan ganda (Dual Guard System) menggunakan JWT untuk manajemen user dan API Key untuk akses data publik.

🌟 Fitur Utama
1. Authentication & Security
User Registration & Login: Sistem autentikasi berbasis JWT (JSON Web Token).
Password Hashing: Keamanan password menggunakan bcrypt.
Secure API Key Storage: API Key disimpan dalam bentuk hash (SHA-256) di database, hanya prefix dan key asli yang ditampilkan sekali saat generate (seperti standar AWS/Stripe).

2. Developer Dashboard (API Management)
Generate API Key: User dapat membuat API Key sendiri setelah login.
Auto-Revoke & Upsert: Logika cerdas dimana satu user hanya boleh memiliki satu kunci aktif (menggunakan metode upsert).
Key Status: Cek status aktif/non-aktif kunci.

3. Product Management
CRUD Operations: Create, Read, Update, Delete data produk.
Public Access Protection: Endpoint produk dilindungi oleh Guard yang memvalidasi x-api-key di header.

4. Interactive Documentation
Swagger UI (OpenAPI 3.0): Dokumentasi otomatis yang interaktif. Mendukung fitur "Try it out" dengan otorisasi ganda (Bearer Token & API Key).

🛠️ Tech Stack
Framework: NestJS (Node.js)
Language: TypeScript
Database: MySQL
ORM: Prisma
Documentation: NestJS Swagger
Environment: Node.js v16+

🚀 Instalasi & Setup
Ikuti langkah-langkah ini untuk menjalankan project di lokal:

1. Clone Repository (git clone https://github.com/icad08/TUGAS_AKHIR_PWS.git)

2. Install Dependencies
npm install

3. Konfigurasi Environment
Buat file .env di root folder dan sesuaikan dengan konfigurasi database kamu:

Cuplikan kode
# Database Connection (MySQL)
DATABASE_URL="mysql://root:password@localhost:3306/tugasakhir_pwsdb"

# JWT Secret (Bebas, contoh: rahasia123)
JWT_SECRET="kunci_rahasia_skripsi_aman_jaya"
4. Database Migration (Prisma)
Jalankan perintah ini untuk membuat tabel di database MySQL secara otomatis:
Bash
npx prisma migrate dev --name init

5. Jalankan Server
Bash
npm run start:dev
Tunggu hingga muncul pesan: 🚀 Application is running on: http://localhost:3000

📖 Dokumentasi API (Swagger)
Akses dokumentasi lengkap dan lakukan pengujian endpoint langsung di browser:

👉 http://localhost:3000/api/docs (Atau http://127.0.0.1:3000/api/docs jika localhost bermasalah)

Cara Menggunakan Swagger:
Register: Buat akun di POST /auth/register.
Login: Masuk di POST /auth/login dan copy access_token.
Authorize: Klik tombol gembok 🔓 di atas, masukkan token (tanpa prefix Bearer).
Generate Key: Panggil POST /api-keys/generate untuk mendapatkan API Key (pk_live_...).
Akses Data: Gunakan API Key tersebut pada header x-api-key untuk mengakses GET /products.

🔒 Arsitektur Keamanan (Security Flow)
Sistem ini menggunakan dua layer keamanan (Guards) yang berbeda sesuai fungsinya:
Guard	Tipe	Digunakan di	Deskripsi
JwtAuthGuard	Bearer Token	Dashboard, Profile, Key Management	Memastikan yang mengakses adalah User yang sudah login.
ProductGuard	API Key	Public Data (Products)	Memvalidasi apakah Client mengirimkan x-api-key yang valid dan aktif di database.
