# Portfolio Bio Website - Roynaldi

Website bio yang modern, responsif, dan interaktif untuk menampilkan profil GitHub Anda.

## Fitur

- **Responsif**: Tampilan sempurna di semua perangkat (desktop, tablet, mobile)
- **Modern Design**: Desain dengan gradient warna-warni dan animasi smooth
- **Interaktif**: Animasi scroll, typing effect, counter animation, dan parallax effect
- **SEO Friendly**: Meta tags yang optimal untuk search engines
- **Performance**: Loading cepat dengan optimasi assets

## Teknologi yang Digunakan

- HTML5
- CSS3 (dengan CSS Variables dan Flexbox/Grid)
- Vanilla JavaScript (ES6+)
- Font Awesome Icons
- Google Fonts (Poppins)

## Struktur File

```
bioku/
├── index.html      # File HTML utama
├── style.css       # Styling dan responsive design
├── script.js       # Interaktivitas dan animasi
└── README.md       # Dokumentasi
```

## Cara Menggunakan

1. **Buka langsung di browser**:
   ```bash
   # Buka file index.html di browser favorit Anda
   open index.html  # macOS
   xdg-open index.html  # Linux
   start index.html  # Windows
   ```

2. **Atau gunakan Live Server** (recommended):
   - Install Live Server extension di VS Code
   - Klik kanan pada index.html
   - Pilih "Open with Live Server"

3. **Atau gunakan Python HTTP Server**:
   ```bash
   # Python 3
   python -m http.server 8000

   # Kemudian buka browser dan akses:
   # http://localhost:8000
   ```

## Kustomisasi

### Mengubah Informasi Pribadi

Edit file `index.html` dan ubah bagian berikut:

1. **Profile Picture**: Ganti URL di bagian hero image
2. **Social Links**: Update href pada section contact
3. **Email**: Ubah email di tombol "Email Me"
4. **Projects**: Tambah/edit proyek di section projects

### Mengubah Warna

Edit file `style.css` pada bagian CSS Variables:

```css
:root {
    --primary-color: #6366f1;    /* Warna utama */
    --secondary-color: #8b5cf6;  /* Warna sekunder */
    --accent-color: #ec4899;     /* Warna aksen */
}
```

### Menambah Section Baru

Ikuti pattern yang ada di HTML dan tambahkan section dengan struktur:

```html
<section id="nama-section" class="nama-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Judul Section</h2>
            <p class="section-subtitle">Subtitle</p>
        </div>
        <!-- Konten section -->
    </div>
</section>
```

## Fitur Interaktif

- **Smooth Scrolling**: Navigasi dengan scroll yang smooth
- **Mobile Menu**: Hamburger menu untuk perangkat mobile
- **Typing Effect**: Efek mengetik pada subtitle hero
- **Counter Animation**: Animasi angka pada statistik
- **Scroll Animations**: Elemen muncul saat di-scroll
- **Parallax Effect**: Efek parallax pada hero section
- **Floating Particles**: Partikel mengambang di background
- **Scroll to Top Button**: Tombol untuk kembali ke atas

## Browser Support

Website ini kompatibel dengan browser modern:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deploy ke Hosting

### GitHub Pages (Gratis)

1. Buat repository baru di GitHub
2. Push semua file ke repository
3. Pergi ke Settings > Pages
4. Pilih branch main dan folder root
5. Website akan live di `https://username.github.io/repo-name`

### Netlify (Gratis)

1. Drag & drop folder ke netlify.com
2. Atau connect dengan GitHub repository
3. Website akan auto-deploy

### Vercel (Gratis)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` di folder project
3. Follow instructions

## Tips

- **Gambar**: Untuk loading lebih cepat, optimasi ukuran gambar
- **Fonts**: Jika ingin offline, download fonts dan host locally
- **Icons**: Bisa replace Font Awesome dengan icons lain
- **Performance**: Minify CSS dan JS untuk production

## Customisasi Lanjutan

### Tambah Dark/Light Mode Toggle

Tambahkan toggle button dan JavaScript untuk switch theme.

### Integrasi dengan GitHub API

Fetch repositories secara dinamis menggunakan GitHub API.

### Tambah Blog Section

Gunakan Markdown parser atau CMS headless seperti Strapi.

### Contact Form

Tambahkan form dengan backend (FormSpree, Netlify Forms, atau custom backend).

## Lisensi

Free to use untuk personal portfolio.

## Kontak

Dibuat dengan ❤️ untuk Roynaldi

- GitHub: [@idlanyor](https://github.com/idlanyor)
- Website: [roidev.my.id](https://roidev.my.id)

---

**Note**: Jangan lupa update social media links dan email di file HTML sebelum deploy!