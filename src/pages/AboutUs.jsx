import React from 'react';
import { skillsData, statsData, badgesData, infoCardsData } from '../data/portfolioData';
import { useGitHubData } from '../hooks/useGitHubData';
import AdPlaceholder from '../components/AdPlaceholder';

const AboutUs = () => {
  const { data, loading } = useGitHubData();

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-20">
      {/* Header Section */}
      <div className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto px-4">
        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full">
          Tentang Kami
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mt-4 mb-4 sm:mb-6 leading-tight">
          Di Balik Portal <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">idlanyor-web</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
          Kami berkomitmen membagikan tutorial teknologi berkualitas tinggi, dari dasar pemrograman hingga panduan produktivitas kerja harian.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-7xl mx-auto px-0">
        {/* Left Column: Author Bio & Details */}
        <div className="lg:col-span-8 space-y-12">
          {/* Main Biography Card */}
          <div className="clay-panel border-l-4 border-l-emerald-500 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl overflow-hidden clay-card border-2 border-emerald-500/30 flex-shrink-0 animate-float">
                <img 
                  src={data?.user?.avatar_url || "https://avatars.githubusercontent.com/u/52753423"} 
                  alt="Roynaldi" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  Roynaldi <span className="text-emerald-500">(idlanyor)</span>
                </h2>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm tracking-wide uppercase">
                  Founder, Writer, & Full Stack Developer
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Halo! Saya adalah seorang mahasiswa semester 4 di <strong>STMIK Widya Utama Purwokerto</strong> sekaligus freelancer dan desainer grafis asal Indonesia. Dengan latar belakang pendidikan IT dan kecintaan mendalam pada dunia desain visual serta pemrograman, saya mendirikan <strong>idlanyor-web</strong> sebagai wadah berbagi ilmu.
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Di era digital yang serba cepat ini, saya percaya bahwa membagikan pengetahuan adalah cara terbaik untuk bertumbuh bersama. Melalui blog ini, saya menyajikan panduan praktis Microsoft Word, Excel, CorelDRAW, pemrograman web (React, PHP, Node.js), hingga artikel produktivitas dengan gaya bahasa kasual dan mudah dimengerti pemula.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Info Cards */}
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="w-2 h-8 bg-amber-400 rounded-full"></span> Detail & Kredibilitas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {infoCardsData.map((card, idx) => (
                <div key={idx} className="clay-card-interactive p-6 border border-emerald-500/5 hover:border-emerald-500/20 bg-white/40 dark:bg-slate-900/40">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white mb-4">
                    <i className={card.icon}></i>
                  </div>
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest">{card.title}</h4>
                  <p className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-2">{card.subtitle || card.highlight}</p>
                  {card.subtitle && <p className="text-emerald-500 dark:text-emerald-400 text-sm font-bold mt-1">{card.highlight}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Statistics & Badges */}
          <div className="clay-panel relative overflow-hidden bg-slate-900/10 dark:bg-slate-900/40">
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Open Source Contributions & Badges
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Sebagai pengembang software, saya juga aktif berkontribusi di komunitas open source melalui GitHub. Berikut adalah lencana pencapaian dan statistik langsung repositori saya:
              </p>
              
              <div className="flex flex-wrap gap-3">
                {badgesData.map((badge, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-black/5 dark:border-white/5 text-xs font-bold text-slate-700 dark:text-slate-200">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-black/5 dark:border-white/5 text-center">
                {[
                  { label: 'Repositories', value: data?.user?.public_repos || '185+' },
                  { label: 'Stars', value: data?.user?.total_stars || '52' },
                  { label: 'Followers', value: data?.user?.followers || '33' },
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-black text-slate-900 dark:text-white">
                      {loading ? '...' : stat.value}
                    </div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Skills & Ad */}
        <div className="lg:col-span-4 space-y-12">
          {/* Editorial Skills Grid */}
          <div className="clay-panel border-t-4 border-t-amber-400">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">
              Keahlian Teknis Penulis
            </h3>
            <div className="space-y-6">
              {skillsData.map((cat, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 tracking-wider">
                    <i className={cat.icon}></i>
                    <span>{cat.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="px-2.5 py-1.5 rounded-lg bg-white/40 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 text-xs text-slate-600 dark:text-slate-300">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ad Placeholder sidebar */}
          <AdPlaceholder label="ADVERTISEMENT" className="!my-0" />

          {/* Site Mission */}
          <div className="clay-card p-6 bg-gradient-to-br from-emerald-500/10 to-amber-500/10 border border-emerald-500/10">
            <h4 className="text-md font-bold text-slate-900 dark:text-white mb-3">Tagline Kami</h4>
            <p className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-amber-500 dark:from-emerald-400 dark:to-amber-300 italic mb-4">
              "Learn anything, Share everything"
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Misi utama idlanyor-web adalah meruntuhkan tembok kerumitan teknologi. Kami membedah tutorial canggih menjadi potongan instruksi kecil yang ramah pemula, sehingga siapa pun bisa belajar apa saja dan membagikannya ke dunia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
