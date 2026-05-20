import React from 'react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-bold text-sm"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Beranda
      </Link>

      <div className="clay-panel border-l-4 border-l-yellow-500 relative overflow-hidden">
        {/* Decorative lights */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest rounded-full">
              Legalitas Situs
            </span>
            <span className="text-xs text-slate-400">Terakhir Diperbarui: 20 Mei 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-8">
            Penafian <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-500">(Disclaimer)</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
            <p>
              Apabila Anda memerlukan informasi lebih lanjut atau memiliki pertanyaan tentang penafian situs kami, jangan ragu untuk menghubungi kami melalui email atau halaman kontak.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              1. Informasi Umum
            </h2>
            <p>
              Semua informasi di situs web ini — <a href="https://idlanyor.web.id" className="text-emerald-500 underline">https://idlanyor.web.id</a> — diterbitkan dengan niat baik dan hanya untuk tujuan informasi umum serta edukasi saja.
            </p>
            <p>
              <strong>idlanyor-web</strong> tidak memberikan jaminan apa pun tentang kelengkapan, keandalan, dan keakuratan informasi ini. Setiap tindakan yang Anda lakukan atas informasi yang Anda temukan di situs web ini (idlanyor-web) sepenuhnya merupakan risiko Anda sendiri. idlanyor-web tidak akan bertanggung jawab atas kerugian dan/atau kerusakan sehubungan dengan penggunaan situs web kami.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              2. Tautan Eksternal (Outbound Links)
            </h2>
            <p>
              Dari situs web kami, Anda dapat mengunjungi situs web lain dengan mengikuti tautan ke situs eksternal tersebut. Meskipun kami berusaha menyediakan tautan berkualitas ke situs web yang berguna dan etis, kami tidak memiliki kendali atas konten dan sifat situs tersebut.
            </p>
            <p>
              Tautan ke situs web lain ini tidak menyiratkan rekomendasi untuk semua konten yang ditemukan di situs-situs tersebut. Pemilik situs dan konten dapat berubah tanpa pemberitahuan dan dapat terjadi sebelum kami memiliki kesempatan untuk menghapus tautan yang mungkin telah rusak atau tidak relevan.
            </p>
            <p>
              Harap perhatikan juga bahwa ketika Anda meninggalkan situs web kami, situs lain mungkin memiliki kebijakan privasi dan ketentuan berbeda yang berada di luar kendali kami. Pastikan untuk memeriksa Kebijakan Privasi situs-situs tersebut serta "Ketentuan Layanan" mereka sebelum terlibat dalam bisnis apa pun atau mengunggah informasi apa pun.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              3. Penafian Tutorial & Praktik Teknis
            </h2>
            <p>
              Situs idlanyor-web menyajikan banyak artikel panduan praktis, termasuk tutorial Microsoft Word, Excel, CorelDRAW, pemrograman web (React, Node.js, PHP), dan administrasi server (DevOps, Cloudflare, VPS).
            </p>
            <p>
              Seluruh kode program, langkah konfigurasi, dan instruksi penggunaan perangkat lunak disajikan untuk tujuan pembelajaran. Penulis tidak bertanggung jawab apabila terjadi kerusakan sistem, kehilangan data, atau kegagalan perangkat keras pada perangkat Anda akibat mempraktikkan tutorial yang ada di situs ini. Sangat disarankan untuk selalu melakukan backup data penting Anda sebelum memodifikasi konfigurasi sistem atau menjalankan perintah tingkat lanjut di server Anda.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              4. Persetujuan
            </h2>
            <p>
              Dengan menggunakan situs web kami, Anda dengan ini menyetujui penafian kami dan menyetujui ketentuan-ketentuannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
