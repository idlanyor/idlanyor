import { useGitHubData } from '../hooks/useGitHubData';

const Hero = () => {
  const { data, loading } = useGitHubData();

  return (
    <div className="relative min-h-[80vh] flex items-center pt-16 md:pt-20">
      {/* Grid layout: stack on mobile, side-by-side on lg */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6 md:space-y-8 px-4 lg:px-0 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider uppercase">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            Junior Developer & Freelancer
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-none">
              ROYNALDI<span className="text-blue-600">.</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Freelancer <span className="text-slate-300 dark:text-slate-700 mx-2">/</span> Tukang Fotokopi
              <span className="block text-sm sm:text-base font-normal mt-3 sm:mt-4 text-slate-500">
                I'm always increasing my skills with <code className="text-blue-600 dark:text-blue-400 font-mono">ngoding</code>.
                Building functional and efficient digital experiences.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
            <a href="#projects" className="clay-btn-primary !px-6 !py-3 !text-sm">
              View Projects
            </a>
            <a href="#contact" className="clay-btn-secondary !px-6 !py-3 !text-sm">
              Get in Touch
            </a>
          </div>

          <div className="flex justify-center lg:justify-start gap-6 sm:gap-8 pt-6 sm:pt-12">
            {[
              { label: 'Repos', value: data?.user?.public_repos || '180+' },
              { label: 'Stars', value: data?.user?.total_stars || '50+' },
              { label: 'Followers', value: data?.user?.followers || '30+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{loading ? '...' : stat.value}</div>
                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="flex justify-center order-1 lg:order-2 px-4 lg:px-0">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 clay-panel animate-float overflow-hidden group">
            <img
              src={data?.user?.avatar_url || "https://avatars.githubusercontent.com/u/52753423"}
              alt="Profile"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;