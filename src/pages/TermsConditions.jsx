import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-bold text-sm"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Beranda
      </Link>

      <div className="clay-panel border-l-4 border-l-amber-500 relative overflow-hidden">
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
            Syarat dan <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-emerald-500">Ketentuan</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
            <p>
              Selamat datang di <strong>idlanyor-web</strong>!
            </p>
            <p>
              Syarat dan ketentuan ini menguraikan aturan dan ketentuan untuk penggunaan situs web idlanyor-web, yang beralamat di <a href="https://idlanyor.web.id" className="text-emerald-500 underline">https://idlanyor.web.id</a>.
            </p>
            <p>
              Dengan mengakses situs web ini, kami menganggap Anda menerima syarat dan ketentuan ini. Jangan terus menggunakan idlanyor-web jika Anda tidak setuju untuk menerima semua syarat dan ketentuan yang dinyatakan di halaman ini.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              1. Hak Kekayaan Intelektual
            </h2>
            <p>
              Kecuali dinyatakan lain, idlanyor-web dan/atau pemberi lisensinya memiliki hak kekayaan intelektual atas semua materi di idlanyor-web. Semua hak kekayaan intelektual dilindungi undang-undang. Anda dapat mengakses materi ini dari idlanyor-web untuk penggunaan pribadi Anda sendiri yang tunduk pada batasan yang diatur dalam syarat dan ketentuan ini.
            </p>
            <p>Anda dilarang keras untuk:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Mempublikasikan ulang materi dari idlanyor-web tanpa izin tertulis.</li>
              <li>Menjual, menyewakan, atau mensublisensikan materi dari idlanyor-web.</li>
              <li>Mereproduksi, menggandakan, atau menyalin materi dari idlanyor-web.</li>
              <li>Mendistribusikan ulang konten dari idlanyor-web.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              2. Komentar Pengguna
            </h2>
            <p>
              Bagian dari situs web ini menawarkan kesempatan bagi pengguna untuk memposting dan bertukar pendapat dan informasi di area situs web tertentu. idlanyor-web tidak menyaring, mengedit, mempublikasikan, atau meninjau Komentar sebelum kehadirannya di situs web. Komentar tidak mencerminkan pandangan dan pendapat idlanyor-web, agen, dan/atau afiliasinya. Komentar mencerminkan pandangan dan pendapat orang yang memposting pandangan dan pendapat mereka.
            </p>
            <p>
              idlanyor-web berhak memantau semua Komentar dan menghapus Komentar apa pun yang dianggap tidak pantas, menyinggung, atau menyebabkan pelanggaran terhadap Syarat dan Ketentuan ini.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              3. Batasan Tanggung Jawab
            </h2>
            <p>
              Dalam batas maksimal yang diizinkan oleh hukum yang berlaku, kami mengecualikan semua representasi, jaminan, dan ketentuan yang berkaitan dengan situs web kami dan penggunaan situs web ini. Tidak ada bagian dari penafian ini yang akan:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Membatasi atau mengecualikan tanggung jawab kami atau Anda atas kematian atau cedera pribadi.</li>
              <li>Membatasi atau mengecualikan tanggung jawab kami atau Anda atas penipuan atau representasi salah yang menipu.</li>
              <li>Membatasi tanggung jawab kami atau Anda dengan cara apa pun yang tidak diizinkan berdasarkan hukum yang berlaku.</li>
            </ul>
            <p>
              Batasan dan pengecualian tanggung jawab yang diatur dalam Bagian ini dan di bagian lain dalam penafian ini: (a) tunduk pada paragraf sebelumnya; dan (b) mengatur semua tanggung jawab yang timbul berdasarkan penafian, termasuk tanggung jawab yang timbul dalam kontrak, dalam perbuatan melanggar hukum, dan untuk pelanggaran kewajiban hukum.
            </p>
            <p>
              Selama situs web dan informasi serta layanan di situs web disediakan secara gratis, kami tidak akan bertanggung jawab atas kehilangan atau kerusakan dalam bentuk apa pun.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              4. Perubahan Ketentuan
            </h2>
            <p>
              idlanyor-web berhak untuk merevisi syarat dan ketentuan ini kapan saja sesuai keinginan kami. Dengan menggunakan situs web ini secara teratur, Anda diharapkan untuk meninjau syarat dan ketentuan ini secara berkala untuk memastikan Anda memahami semua syarat dan ketentuan yang mengatur penggunaan situs web ini.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              5. Hukum yang Berlaku
            </h2>
            <p>
              Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Negara Republik Indonesia, dan Anda tunduk pada yurisdiksi non-eksklusif pengadilan negeri yang berlokasi di Indonesia untuk penyelesaian sengketa apa pun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
