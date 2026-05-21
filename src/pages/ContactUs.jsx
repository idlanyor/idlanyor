import React, { useState } from 'react';
import { socialLinksData } from '../data/portfolioData';
import AdPlaceholder from '../components/AdPlaceholder';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-20">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto px-4">
        <span className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-black uppercase tracking-widest rounded-full">
          Hubungi Kami
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mt-4 mb-4 sm:mb-6 leading-tight">
          Ada Pertanyaan? <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">Mari Hubungi Kami</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
          Apakah Anda ingin menanyakan perihal tutorial, memberikan masukan, atau menawarkan kerjasama periklanan? Kami selalu terbuka untuk berdiskusi!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto px-0">
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-8 space-y-8">
          <div className="clay-panel border-l-4 border-l-emerald-500 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
                Kirimkan Pesan Anda
              </h2>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl mx-auto shadow-lg shadow-emerald-500/20">
                    <i className="fas fa-check"></i>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pesan Berhasil Terkirim!</h3>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm">
                    Terima kasih telah menghubungi idlanyor-web. Tim administrasi kami akan segera meninjau pesan Anda dan merespons melalui email dalam kurun waktu 1x24 jam.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="clay-btn-secondary !py-2.5 !px-6 !text-xs !mt-4"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Nama Lengkap
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Masukkan nama Anda"
                        className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                        Alamat Email
                      </label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="contoh@domain.com"
                        className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Subjek Pesan
                    </label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Apa pokok pembahasan pesan Anda?"
                      className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Isi Pesan Lengkap
                    </label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="Tuliskan pesan atau pertanyaan Anda secara rinci di sini..."
                      className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none dark:text-white"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="clay-btn-primary !bg-emerald-500 hover:!bg-emerald-600 !w-full md:!w-auto flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner animate-spin"></i> Sending...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Kirim Pesan
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <AdPlaceholder label="ADVERTISEMENT INLINE" />
        </div>

        {/* Right Column: Contact info & Socials */}
        <div className="lg:col-span-4 space-y-8">
          <div className="clay-panel border-t-4 border-t-amber-400 space-y-8">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Informasi Kontak
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white flex-shrink-0">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Email Resmi</h4>
                  <a href="mailto:contact@idlanyor.web.id" className="text-slate-800 dark:text-slate-200 font-bold hover:text-emerald-500 transition-colors text-sm break-all">
                    contact@idlanyor.web.id
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white flex-shrink-0">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Lokasi Kantor</h4>
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-sm">
                    Wisesa Karangreja
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="clay-panel space-y-6">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Sosial Media
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kunjungi dan ikuti saluran sosial media kami untuk mendapatkan update cuplikan tutorial cepat setiap harinya.
            </p>
            <div className="flex flex-col gap-3">
              {socialLinksData.map((social) => (
                <a 
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-black/5 dark:border-white/5 hover:border-emerald-500/30 dark:hover:border-amber-400/20 hover:-translate-y-0.5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-emerald-500 transition-colors">
                      <i className={social.icon}></i>
                    </div>
                    <span className="font-bold text-sm text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{social.name}</span>
                  </div>
                  <i className="fas fa-chevron-right text-xs text-slate-400 group-hover:translate-x-1 transition-transform"></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
