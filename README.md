
# Backend UrbanFarm

## Tahap 1 — Authentication, Role, Approval

### Fitur:
- Register dengan role: `farmer`, `agronomist`
- Login dengan role: `admin`,`farmer`, `agronomist`
- OTP Login via Email untuk Farmer
- Agronomist harus menunggu approval admin sebelum login
- Admin dapat melihat dan menyetujui agronomist
- Autentikasi JWT
- Role-based authorization (Admin, Farmer, Agronomist)

---

##  Teknologi & Library yang Digunakan

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT (jsonwebtoken)
- bcryptjs
- nodemailer (untuk kirim OTP via email)
- dotenv
- nodemon (dev dependency)

---

## Setup Project

### 1. Install PostgreSQL 

Lalu buat database baru dengan nama `urbanfarm_db`.

---

### 2. Inisialisasi Project

```bash
mkdir urbanfarm-backend
cd urbanfarm-backend
npm init -y
```

---

### 3. Install Dependencies

```bash
npm install express pg sequelize sequelize-cli bcryptjs jsonwebtoken dotenv nodemailer
```

Tambahkan juga nodemon untuk development:

```bash
npm install --save-dev nodemon
```

---

### 4. Setup Sequelize

```bash
npx sequelize-cli init
```

---

### 5. Konfigurasi `.env`

Buat file `.env`:

```env
PORT=3000
DATABASE_URL=
JWT_SECRET=your_jwt_secret
EMAIL_USER=y
EMAIL_PASS=
```

---

### 6. Migrasi & Seed

```bash
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
```

---

### 7. Menjalankan Server

```bash
npm run dev
```



## Tahap 2 — Tanaman dan Perawatan (Backend)

### Fitur:
- CRUD (Create, Read, Update, Delete) untuk data tanaman
- Tanaman
- Setiap tanaman memiliki:
   - name (nama tanaman)
   - species (spesies tanaman)
   - location (lokasi geografis)
   - photo (upload gambar)
   - latitude, longitude

- CRUD (Create, Read, Update, Delete) untuk data farmerplant(perawatan tanaman oleh farmer)
   - Farmer hanya dapat memilih tanaman dari daftar yang sudah dibuat Admin
   - Farmer dapat nemanbahkan catatan , kapan mulai tanaman, status tanaman , jenis pupuk, dll

### Library Tambahan yang Digunakan di Tahap 2
- Multer untuk mengupload gambar
- Sequelize untuk mengatur database

### Setup middleware baru dan route 
- Multer untuk mengupload gambar
- middleware upload.js
- controller baru untuk CRUD tanaman dan perawatan
- route baru untuk CRUD tanaman dan perawatan
- controller baru untuk CRUD tanaman oleh admin
- route baru untuk CRUD tanaman oleh admin

---