
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

## 📦 Teknologi & Library yang Digunakan

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

## 🛠️ Setup Project

### 1. Install PostgreSQL di MacBook

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



