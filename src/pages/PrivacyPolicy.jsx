import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-500 transition-colors mb-8 font-bold text-sm"
      >
        <i className="fas fa-arrow-left"></i> Kembali ke Beranda
      </Link>

      <div className="clay-panel border-l-4 border-l-emerald-500 relative overflow-hidden">
        {/* Decorative lights */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
              Legalitas Situs
            </span>
            <span className="text-xs text-slate-400">Terakhir Diperbarui: 20 Mei 2026</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-8">
            Kebijakan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">Privasi</span>
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
            <p>
              Di <strong>idlanyor-web</strong>, yang dapat diakses dari <a href="https://idlanyor.web.id" className="text-emerald-500 underline">https://idlanyor.web.id</a>, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh idlanyor-web dan bagaimana kami menggunakannya.
            </p>

            <p>
              Jika Anda memiliki pertanyaan tambahan atau memerlukan informasi lebih lanjut tentang Kebijakan Privasi kami, jangan ragu untuk menghubungi kami melalui halaman kontak kami.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              1. Log Files (File Log)
            </h2>
            <p>
              idlanyor-web mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung ketika mereka mengunjungi situs web. Semua perusahaan hosting melakukan ini dan merupakan bagian dari analisis layanan hosting. Informasi yang dikumpulkan oleh file log termasuk alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), stempel tanggal dan waktu, halaman rujukan/keluar, dan mungkin jumlah klik. Ini tidak terkait dengan informasi apa pun yang dapat diidentifikasi secara pribadi. Tujuan dari informasi ini adalah untuk menganalisis tren, mengelola situs, melacak pergerakan pengguna di situs web, dan mengumpulkan informasi demografis.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              2. Cookies dan Web Beacons
            </h2>
            <p>
              Seperti situs web lainnya, idlanyor-web menggunakan 'cookies'. Cookies digunakan untuk menyimpan informasi termasuk preferensi pengunjung, dan halaman-halaman di situs web yang diakses atau dikunjungi pengunjung. Informasi tersebut digunakan untuk mengoptimalkan pengalaman pengguna dengan menyesuaikan konten halaman web kami berdasarkan jenis browser pengunjung dan/atau informasi lainnya.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              3. Google DoubleClick DART Cookie
            </h2>
            <p>
              Google adalah salah satu vendor pihak ketiga di situs kami. Google juga menggunakan cookies, yang dikenal sebagai DART cookies, untuk menayangkan iklan kepada pengunjung situs kami berdasarkan kunjungan mereka ke situs kami dan situs lain di internet. Namun, pengunjung dapat memilih untuk menolak penggunaan DART cookies dengan mengunjungi Kebijakan Privasi jaringan iklan dan konten Google di URL berikut – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-500 underline">https://policies.google.com/technologies/ads</a>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              4. Kebijakan Privasi Mitra Iklan Kami
            </h2>
            <p>
              Beberapa pengiklan di situs kami mungkin menggunakan cookies dan web beacons. Mitra iklan kami meliputi:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AdSense:</strong> Kebijakan privasi mereka dapat diakses di situs resmi Google.</li>
            </ul>
            <p>
              Server iklan pihak ketiga atau jaringan iklan menggunakan teknologi seperti cookies, JavaScript, atau Web Beacons yang digunakan dalam iklan masing-masing dan tautan yang muncul di idlanyor-web, yang dikirim langsung ke browser pengguna. Mereka secara otomatis menerima alamat IP Anda saat ini terjadi. Teknologi ini digunakan untuk mengukur efektivitas kampanye iklan mereka dan/atau untuk mempersonalisasi konten iklan yang Anda lihat di situs web yang Anda kunjungi.
            </p>
            <p>
              Harap dicatat bahwa idlanyor-web tidak memiliki akses atau kontrol atas cookies yang digunakan oleh pengiklan pihak ketiga tersebut.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              5. Kebijakan Privasi Pihak Ketiga
            </h2>
            <p>
              Kebijakan Privasi idlanyor-web tidak berlaku untuk pengiklan atau situs web lain. Karena itu, kami menyarankan Anda untuk berkonsultasi dengan masing-masing Kebijakan Privasi dari server iklan pihak ketiga ini untuk informasi yang lebih rinci. Ini mungkin termasuk praktik mereka dan petunjuk tentang cara menyisih dari opsi tertentu.
            </p>
            <p>
              Anda dapat memilih untuk menonaktifkan cookies melalui pengaturan browser individual Anda. Untuk mengetahui informasi lebih rinci tentang manajemen cookie dengan browser web tertentu, ini dapat ditemukan di situs web masing-masing browser.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              6. Hak Perlindungan Data (GDPR & CCPA)
            </h2>
            <p>
              Kami ingin memastikan Anda menyadari semua hak perlindungan data Anda. Setiap pengguna berhak atas hal-hal berikut:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hak untuk mengakses:</strong> Anda berhak meminta salinan data pribadi Anda. Kami mungkin mengenakan biaya kecil untuk layanan ini.</li>
              <li><strong>Hak untuk perbaikan:</strong> Anda berhak meminta kami memperbaiki informasi apa pun yang Anda yakini tidak akurat. Anda juga berhak meminta kami melengkapi informasi yang Anda yakini tidak lengkap.</li>
              <li><strong>Hak untuk menghapus:</strong> Anda berhak meminta kami menghapus data pribadi Anda, dalam kondisi tertentu.</li>
              <li><strong>Hak untuk membatasi pemrosesan:</strong> Anda berhak meminta kami membatasi pemrosesan data pribadi Anda, dalam kondisi tertentu.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              7. Informasi Anak-Anak
            </h2>
            <p>
              Bagian lain dari prioritas kami adalah menambahkan perlindungan untuk anak-anak saat menggunakan internet. Kami mendorong orang tua dan wali untuk mengamati, berpartisipasi dalam, dan/atau memantau dan membimbing aktivitas online mereka.
            </p>
            <p>
              idlanyor-web tidak dengan sengaja mengumpulkan Informasi Identitas Pribadi apa pun dari anak-anak di bawah usia 13 tahun. Jika Anda berpikir bahwa anak Anda memberikan informasi semacam ini di situs web kami, kami sangat menyarankan Anda untuk segera menghubungi kami dan kami akan melakukan upaya terbaik kami untuk segera menghapus informasi tersebut dari catatan kami.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-4 border-t border-black/5 dark:border-white/5">
              8. Persetujuan
            </h2>
            <p>
              Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui Syarat dan Ketentuannya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
