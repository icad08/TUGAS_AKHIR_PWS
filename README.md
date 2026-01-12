# ☕ Coffee API Service (Fullstack)

Aplikasi Fullstack modern untuk manajemen data Coffee Shop dan Produk, dilengkapi dengan Developer Console untuk mengelola API Key. Project ini dibangun menggunakan arsitektur Client-Server yang terpisah.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🚀 Tech Stack

### Backend (Server)
* **Framework:** [NestJS](https://nestjs.com/) (Node.js)
* **Database:** MySQL
* **ORM:** Prisma
* **Auth:** JWT (JSON Web Token) & Passport
* **Docs:** Swagger UI

### Frontend (Client)
* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM
* **Icons:** Lucide React
* **HTTP Client:** Axios
* **Utils:** JWT Decode

---

## 🔥 Fitur Utama

### 1. Otentikasi & Keamanan
* **Register & Login:** User bisa mendaftar dan login untuk mendapatkan Access Token.
* **Role Identification:** Sistem mendeteksi apakah user adalah Admin atau User biasa.
* **Protected Routes:** Halaman Dashboard tidak bisa diakses tanpa login.
* **Auto Logout:** Fitur logout aman yang menghapus token.

### 2. Dashboard & Statistik
* **Real-time Stats:** Menampilkan jumlah total request (Total Data Entitas) yang diambil langsung dari Database.
* **Dynamic Profile:** Menampilkan nama user dan role (Admin/User) yang sedang login.
* **Status Server:** Indikator status operasional server.

### 3. Manajemen Data (CRUD)
* **Browse Coffee:** Melihat daftar mitra Coffee Shop dan menu andalannya.
* **Swagger Interface:** Menambah, mengedit, dan menghapus data Toko & Produk via Swagger UI.

### 4. Developer Tools
* **API Credentials:** User bisa men-generate `x-api-key` rahasia untuk keperluan integrasi.
* **Integration Guide:** Dokumentasi lengkap cara penggunaan API untuk pihak ketiga.

---

## 🛠️ Cara Install & Menjalankan

Ikuti langkah ini secara berurutan agar aplikasi berjalan lancar.

### Prasyarat
* Node.js (v18+)
* MySQL Server (XAMPP/Laragon/Docker)

### 1. Setup Backend
Masuk ke folder backend dan install dependencies.

```bash
cd backend
npm install
Konfigurasi Database:

Buat file .env di dalam folder backend.

Isi dengan konfigurasi berikut:

Cuplikan kode

DATABASE_URL="mysql://root:@localhost:3306/tugasakhir_pwsdb"
JWT_SECRET="rahasia_negara_tugas_akhir_2026"


Migrasi Database: Push skema Prisma ke database MySQL.

Bash

npx prisma migrate dev --name init
Jalankan Server:

Bash

npm run start:dev
Backend akan berjalan di: http://localhost:3000

2. Setup Frontend
Buka terminal baru, masuk ke folder frontend.

Bash

cd frontend
npm install
Jalankan Client:

Bash

npm run dev
Frontend akan berjalan di: http://localhost:5173

📚 Dokumentasi API (Swagger)
Backend menyediakan dokumentasi interaktif untuk testing API.

URL: http://localhost:3000/docs

Prefix API: Semua endpoint API memiliki prefix /api (contoh: /api/products).

Akun Demo :

Email: admin@kopi.com

Password: admin12345

📂 Struktur Project
root/
├── backend/                # Server Side (NestJS)
│   ├── src/
│   │   ├── auth/           # Login & Register Logic
│   │   ├── coffee-shops/   # CRUD Toko Kopi
│   │   ├── products/       # CRUD Menu Kopi
│   │   ├── dashboard/      # Statistik Dashboard
│   │   └── api-keys/       # Logic API Key Generator
│   └── prisma/             # Schema Database
│
└── frontend/               # Client Side (React)
    ├── src/
    │   ├── components/     # Sidebar, PrivateRoute
    │   ├── pages/          # Login, Register, Dashboard, Browse, Docs
    │   └── App.jsx         # Routing Configuration


🧪 Cara Testing Flow Aplikasi
Buka Frontend (localhost:5173).
Klik Register, buat akun baru.
Login menggunakan akun tersebut.
Anda akan diarahkan ke Dashboard. Lihat statistik total data.
Buka Swagger (localhost:3000/docs), login (Authorize) dengan token user.
Gunakan endpoint POST /coffee-shops atau POST /products untuk menambah data.
Refresh halaman Dashboard di Frontend, angka statistik akan bertambah otomatis.
Buka menu Browse Coffee untuk melihat hasil input data.

Happy Coding! ☕
