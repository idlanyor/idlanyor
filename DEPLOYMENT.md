# Deployment Guide - GitHub Pages dengan CI/CD

Panduan lengkap untuk deploy website bio Anda ke GitHub Pages dengan otomasi CI/CD menggunakan GitHub Actions.

## 📋 Persyaratan

- Akun GitHub
- Git terinstall di komputer Anda
- Repository GitHub (akan dibuat di langkah 1)

## 🚀 Langkah-langkah Deploy

### 1. Inisialisasi Git Repository

```bash
cd /home/roy/bioku

# Inisialisasi git
git init

# Tambahkan semua file
git add .

# Buat commit pertama
git commit -m "Initial commit: Portfolio website

- Add responsive HTML structure
- Add modern CSS styling with animations
- Add interactive JavaScript features
- Setup GitHub Actions workflow for auto-deployment"
```

### 2. Buat Repository di GitHub

1. Buka [GitHub](https://github.com) dan login
2. Klik tombol **"+"** di pojok kanan atas → **"New repository"**
3. Isi detail repository:
   - **Repository name**: `bioku` (atau nama lain yang Anda inginkan)
   - **Description**: "Personal portfolio website"
   - **Visibility**: Public (untuk GitHub Pages gratis)
   - **JANGAN** centang "Initialize repository" (karena sudah ada local repo)
4. Klik **"Create repository"**

### 3. Connect Local Repository ke GitHub

```bash
# Ganti 'idlanyor' dengan username GitHub Anda
# Ganti 'bioku' jika pakai nama repository yang berbeda
git remote add origin https://github.com/idlanyor/bioku.git

# Rename branch ke main (jika perlu)
git branch -M main

# Push ke GitHub
git push -u origin main
```

### 4. Konfigurasi GitHub Pages

1. Buka repository Anda di GitHub
2. Pergi ke **Settings** (tab di atas)
3. Scroll ke bawah atau klik **Pages** di sidebar kiri
4. Di bagian **Source**:
   - Pilih **"GitHub Actions"** (bukan "Deploy from a branch")
5. Klik **Save**

### 5. Trigger Deployment Pertama

Workflow akan otomatis berjalan setelah push pertama, tapi Anda bisa memicu manual:

1. Pergi ke tab **Actions** di repository
2. Klik workflow **"Deploy to GitHub Pages"**
3. Klik tombol **"Run workflow"** → **"Run workflow"**

Atau push perubahan baru:

```bash
# Buat perubahan kecil atau langsung push ulang
git commit --allow-empty -m "Trigger deployment"
git push
```

### 6. Cek Status Deployment

1. Buka tab **Actions** di repository
2. Anda akan melihat workflow sedang berjalan (lingkaran kuning)
3. Klik pada workflow run untuk melihat detail
4. Tunggu hingga selesai (centang hijau ✓)

### 7. Akses Website Anda

Setelah deployment berhasil, website akan tersedia di:

```
https://idlanyor.github.io/bioku/
```

Format: `https://<username>.github.io/<repository-name>/`

## 🔄 Workflow CI/CD

Workflow GitHub Actions akan otomatis berjalan saat:

- ✅ Push ke branch `main`
- ✅ Manual trigger melalui tab Actions

### Apa yang dilakukan workflow?

1. **Checkout Code**: Download source code dari repository
2. **Setup Pages**: Konfigurasi GitHub Pages environment
3. **Upload Artifact**: Package semua file website
4. **Deploy**: Deploy ke GitHub Pages

## 📝 Update Website di Masa Depan

Setiap kali Anda ingin update website:

```bash
# 1. Edit file yang ingin diubah (index.html, style.css, dll)

# 2. Commit perubahan
git add .
git commit -m "Update: deskripsi perubahan"

# 3. Push ke GitHub
git push

# 4. Workflow otomatis berjalan dan deploy perubahan!
```

Website akan otomatis ter-update dalam 1-2 menit!

## 🛠️ Troubleshooting

### Workflow gagal dengan error "permissions"

**Solusi:**
1. Pergi ke **Settings** → **Actions** → **General**
2. Scroll ke **"Workflow permissions"**
3. Pilih **"Read and write permissions"**
4. Centang **"Allow GitHub Actions to create and approve pull requests"**
5. Klik **Save**

### Website tidak muncul / 404

**Solusi:**
1. Pastikan repository visibility = **Public**
2. Cek Settings → Pages, pastikan Source = **GitHub Actions**
3. Tunggu 2-3 menit setelah deployment pertama
4. Clear browser cache atau buka di incognito mode
5. Cek apakah deployment success di tab Actions

### Perubahan tidak muncul di website

**Solusi:**
1. Hard refresh browser: `Ctrl + Shift + R` (Windows/Linux) atau `Cmd + Shift + R` (Mac)
2. Cek tab Actions, pastikan workflow selesai dengan sukses
3. Clear browser cache
4. Tunggu 1-2 menit untuk CDN GitHub propagation

### Custom domain tidak berfungsi

**Solusi:**
1. Di Settings → Pages, tambahkan custom domain
2. Di DNS provider Anda, tambahkan CNAME record:
   ```
   Type: CNAME
   Name: www
   Value: idlanyor.github.io
   ```
3. Untuk apex domain (@), gunakan A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## 🎯 Tips & Best Practices

### 1. Gunakan Conventional Commits

```bash
git commit -m "feat: add new project to portfolio"
git commit -m "fix: correct email link in contact section"
git commit -m "style: improve mobile responsiveness"
git commit -m "docs: update README with new features"
```

### 2. Test Lokal Sebelum Push

Selalu test perubahan di lokal dulu sebelum push:

```bash
# Jalankan local server
python3 -m http.server 8000

# Test di browser: http://localhost:8000
```

### 3. Backup Branch untuk Experiment

```bash
# Buat branch baru untuk experiment
git checkout -b experiment

# Kembali ke main
git checkout main

# Merge jika experiment berhasil
git merge experiment
```

### 4. Optimize untuk Production

Sebelum push, pastikan:
- ✅ Gambar sudah di-compress
- ✅ Tidak ada console.log yang tidak perlu
- ✅ Link social media sudah benar
- ✅ Email sudah di-update

### 5. Monitor Performance

Gunakan tools berikut untuk cek performa:
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- Chrome DevTools Lighthouse

## 🌟 Custom Domain (Opsional)

Jika ingin pakai domain sendiri seperti `roynaldi.com`:

1. Beli domain di provider (Namecheap, GoDaddy, Cloudflare, dll)
2. Di GitHub Settings → Pages, masukkan custom domain
3. Di DNS provider, tambah CNAME record seperti di troubleshooting
4. Tunggu DNS propagation (bisa sampai 24 jam)
5. Enable **"Enforce HTTPS"** di GitHub Pages settings

## 📊 Monitoring Deployment

### Melihat History Deployment

```bash
# Lihat commit history
git log --oneline

# Lihat deployment history di GitHub Actions tab
```

### Rollback ke Versi Sebelumnya

```bash
# Lihat commit yang ingin di-rollback
git log --oneline

# Rollback ke commit tertentu
git revert <commit-hash>
git push

# Atau reset ke commit tertentu (hati-hati!)
git reset --hard <commit-hash>
git push --force
```

## 🔐 Security Best Practices

1. **Jangan commit sensitive data**:
   - API keys
   - Passwords
   - Email pribadi (jika tidak mau public)

2. **Gunakan environment variables** untuk data sensitif

3. **Enable branch protection** untuk main branch (Settings → Branches)

## 📞 Support

Jika ada masalah:

1. Cek [GitHub Pages Documentation](https://docs.github.com/pages)
2. Cek [GitHub Actions Documentation](https://docs.github.com/actions)
3. Cek [Status GitHub](https://www.githubstatus.com/)

## 🎉 Selamat!

Website Anda sekarang:
- ✅ Live di internet
- ✅ Auto-deploy saat ada perubahan
- ✅ Hosting gratis selamanya
- ✅ HTTPS otomatis
- ✅ Fast & reliable

Bagikan link website Anda: `https://idlanyor.github.io/bioku/`

---

**Happy Coding!** 🚀

Made with ❤️ by Claude Code