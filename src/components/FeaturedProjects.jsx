import { featuredProjects } from '../data/portfolioData';

const FeaturedProjects = () => {
  return (
    <div className="py-20 space-y-16">
      <div className="text-center space-y-4">
        <div className="text-blue-600 dark:text-blue-500 text-xs font-bold uppercase tracking-widest">Featured</div>
        <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white">Product Portfolio</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          High-performance applications and services built to solve real-world problems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProjects.map((project) => (
          <a 
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#0f172a]/50 border border-black/5 dark:border-white/5 transition-all hover:border-blue-500/50 shadow-sm dark:shadow-none"
          >
            <div className="aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800/50 flex items-center justify-center p-6">
              <img 
                src={project.image} 
                alt={project.title} 
                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
            </div>
            
            <div className="p-5 space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 2).map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-bold uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors leading-tight">
                {project.title}
              </h3>
              
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed line-clamp-2">
                {project.description}
              </p>
              
              <div className="pt-2 flex items-center text-blue-600 dark:text-blue-500 font-bold text-[10px] gap-2 uppercase tracking-widest">
                Visit
                <i className="fas fa-arrow-right text-[8px]"></i>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
