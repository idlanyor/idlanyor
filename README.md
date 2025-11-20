# Portfolio Roynaldi - React + Vite + TailwindCSS v4

Portfolio website pribadi yang dibangun menggunakan React, Vite, dan TailwindCSS v4.

## 🚀 Tech Stack

- **React 19** - UI Library
- **Vite 7** - Build Tool & Dev Server
- **TailwindCSS v4** - Utility-First CSS Framework
- **Font Awesome 6** - Icons
- **Google Fonts (Poppins)** - Typography

## ✨ Features

- ⚡ Lightning-fast performance dengan Vite
- 🎨 Modern & responsive design
- 🌙 Dark mode (default)
- 📱 Mobile-friendly
- 🎭 Smooth animations & transitions
- 🎯 SEO optimized
- 💅 Beautiful gradient effects
- 🔥 Component-based architecture

## 📂 Project Structure

```
bioku/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      # Navigation bar dengan theme toggle
│   │   ├── Hero.jsx        # Hero section dengan stats
│   │   ├── About.jsx       # About section dengan info cards
│   │   ├── Skills.jsx      # Skills & technologies
│   │   ├── Projects.jsx    # Featured projects
│   │   ├── Contact.jsx     # Contact & social links
│   │   └── Footer.jsx      # Footer section
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & TailwindCSS
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🛠️ Installation & Setup

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd bioku
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```
   Server akan berjalan di `http://localhost:5173/`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎨 Customization

### Colors
Warna utama dapat diubah di `src/index.css`:
```css
@theme {
  --color-primary: #6366f1;    /* Indigo */
  --color-secondary: #8b5cf6;  /* Purple */
  --color-accent: #ec4899;     /* Pink */
}
```

### Content
- **Personal Info**: Edit di masing-masing component file
- **Projects**: Update array `projects` di `src/components/Projects.jsx`
- **Skills**: Update array `skillCategories` di `src/components/Skills.jsx`
- **Social Links**: Update array `socialLinks` di `src/components/Contact.jsx`

## 📝 Components Overview

### Navbar
- Fixed navigation bar
- Responsive mobile menu
- Theme toggle button
- Smooth scroll navigation

### Hero
- Animated profile image
- GitHub stats (repos, stars, followers)
- Call-to-action buttons
- Gradient background effects

### About
- Info cards (Education, Work, Location, Website)
- Personal description
- GitHub achievements badges

### Skills
- Categorized skills (Languages, Frontend, Mobile, Tools)
- Icon-based skill items
- Hover effects

### Projects
- Featured GitHub projects
- Project cards with stats
- Links to repositories
- Tech stack badges

### Contact
- Social media links
- Email CTA
- Animated hover effects

### Footer
- Copyright information
- Personal quote

## 🌟 Key Features Explained

### TailwindCSS v4
Project ini menggunakan TailwindCSS v4 (next) dengan konfigurasi modern:
- Import langsung via `@import "tailwindcss"`
- Custom theme via `@theme` directive
- Vite plugin integration

### Animations
Custom animations didefinisikan di `index.css`:
- `animate-float` - Floating effect untuk profile image
- `animate-bounce-custom` - Custom bounce untuk scroll indicator
- Gradient text effects

### Responsive Design
- Mobile-first approach
- Breakpoints: `md:` (768px), `lg:` (1024px)
- Responsive grid layouts
- Mobile hamburger menu

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload folder 'dist' ke Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy folder 'dist' ke gh-pages branch
```

## 📄 License

MIT License - Feel free to use this template for your own portfolio!

## 👨‍💻 Author

**Roynaldi**
- GitHub: [@idlanyor](https://github.com/idlanyor)
- Website: [roidev.my.id](https://roidev.my.id)

---

Made with ❤️ and ⚡ by Roynaldi

*"Let's Play the game like coding"*
