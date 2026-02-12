# Next.js SSO dengan Clerk

Aplikasi Next.js dengan autentikasi SSO menggunakan Clerk.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables:

Clerk akan otomatis generate development keys saat pertama kali run. Atau dapatkan dari [Clerk Dashboard](https://dashboard.clerk.com):
   - Buat akun baru atau login
   - Buat aplikasi baru
   - Copy Publishable Key dan Secret Key
   - Update file `.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000)

5. Klik "Sign up" untuk membuat user pertama

6. (Opsional) Claim aplikasi Anda di Clerk Dashboard untuk konfigurasi lebih lanjut

## Fitur

- Login/Register dengan email dan password
- SSO dengan Google, GitHub, dll (konfigurasi di Clerk Dashboard)
- Protected routes
- User profile management
- Button logout custom

## Deploy ke Railway

1. Push kode ke GitHub repository

2. Buat project baru di [Railway](https://railway.app):
   - Login ke Railway
   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository Anda

3. Tambahkan environment variables di Railway:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
   - `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`
   - `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`

4. Railway akan otomatis build dan deploy aplikasi Anda

5. Update Clerk Dashboard:
   - Tambahkan domain Railway Anda ke allowed domains
   - Format: `https://your-app.up.railway.app`
