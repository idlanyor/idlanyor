import { useGitHubData } from '../hooks/useGitHubData';

const About = () => {
  const { data } = useGitHubData();

  const infoCards = [
    { label: 'Education', value: 'SMK Maarif Karangreja', sub: 'Light Vehicle Engineering', icon: 'fas fa-graduation-cap' },
    { label: 'Work', value: 'Wisesa Cell & Copier', sub: 'Tukang Potokopi', icon: 'fas fa-briefcase' },
    { label: 'Location', value: data?.user?.location || 'Indonesia', sub: 'Remote / On-site', icon: 'fas fa-map-marker-alt' },
    { label: 'Website', value: 'antidonasi.web.id', sub: 'Visit Portfolio', icon: 'fas fa-globe' },
  ];

  return (
    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0f172a]/50 border border-black/5 dark:border-white/5 backdrop-blur-sm transition-colors">
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">Biography</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            Decoding My Journey
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            I'm a developer who started from the world of copier machines. 
            I believe coding is the perfect blend of machine logic and visual aesthetics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoCards.map((card) => (
            <div key={card.label} className="p-4 rounded-xl bg-white dark:bg-[#030712] border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                  <i className={`${card.icon} text-sm`}></i>
                </div>
                <div>
                  <div className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider leading-none mb-1">{card.label}</div>
                  <div className="text-xs text-slate-900 dark:text-white font-bold">{card.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
