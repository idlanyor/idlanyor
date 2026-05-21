import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="pt-20 pb-12 border-t border-emerald-500/10 dark:border-white/5 mt-20 relative overflow-hidden">
      {/* Decorative accent background light */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-black/5 dark:border-white/5">
          
          {/* Column 1: About the Blog */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white text-xs font-black shadow-md">
                i
              </div>
              idlanyor<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">-web</span>
            </Link>
            <p className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-emerald-400 dark:to-amber-300 italic tracking-tight">
              "Learn anything, Share everything"
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Platform blog edukasi yang menyajikan tutorial microsoft office, tips programming, panduan vektor CorelDRAW, dan ulasan teknologi ramah pemula.
            </p>
          </div>

          {/* Column 2: Popular Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span> Kategori Utama
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Microsoft Office (Excel, Word)
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Desain Grafis & Vektor (CorelDRAW)
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Web Development (React, Node.js)
                </Link>
              </li>
              <li>
                <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Kecerdasan Buatan (AI Prompting)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal Links (AdSense Compliance) */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-amber-400 rounded-full"></span> Kebijakan Hukum
            </h4>
            <ul className="space-y-2 text-xs font-bold">
              <li>
                <Link to="/privacy-policy" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Kebijakan Privasi (Privacy Policy)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Syarat & Ketentuan (Terms of Service)
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Penafian (Disclaimer)
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors">
                  Tentang Redaksi & Penulis
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full"></span> Informasi Kontak
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Punya ide kolaborasi konten atau penempatan iklan sponsor? Hubungi redaksi kami:
            </p>
            <div className="space-y-2 text-xs font-bold">
              <a href="mailto:contact@idlanyor.web.id" className="text-emerald-600 dark:text-emerald-400 hover:underline block break-all">
                contact@idlanyor.web.id
              </a>
              <span className="text-slate-400 block font-normal">Wisesa Karangreja, Indonesia</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 pt-8 sm:pt-12 text-xs text-slate-500 font-bold">
          <div>
            © {new Date().getFullYear()} <span className="text-slate-800 dark:text-slate-300">idlanyor-web</span>. Semua Hak Cipta Dilindungi.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://github.com/idlanyor" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
              <i className="fab fa-github text-sm"></i> GitHub Contributions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
