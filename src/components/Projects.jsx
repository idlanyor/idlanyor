import { useGitHubData } from '../hooks/useGitHubData';

const Projects = () => {
  const { data, loading } = useGitHubData();
  const projects = data?.repos?.slice(0, 6) || [];

  return (
    <div className="py-20 space-y-12">
      <div className="text-center space-y-3">
        <div className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">GitHub</div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">Open Source</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
          Public repositories and contributions to the developer community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 animate-pulse"></div>
          ))
        ) : (
          projects.map((repo) => (
            <a 
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-2xl bg-slate-50 dark:bg-[#0f172a]/50 border border-black/5 dark:border-white/5 hover:border-blue-500/50 transition-all shadow-sm dark:shadow-none flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#030712] flex items-center justify-center border border-black/5 dark:border-white/5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
                    <i className="fab fa-github text-xl"></i>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white dark:bg-[#030712] border border-black/5 dark:border-white/5 text-[9px] font-bold text-slate-500">
                    <i className="fas fa-star text-yellow-500"></i>
                    {repo.stargazers_count}
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors mb-1 truncate">
                    {repo.name.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {repo.language || 'Code'}
                  </span>
                </div>
                <i className="fas fa-chevron-right text-[10px] text-slate-300 dark:text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"></i>
              </div>
            </a>
          ))
        )}
      </div>

      <div className="text-center pt-4">
        <a 
          href={data?.user?.html_url + "?tab=repositories"} 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          VIEW ALL REPOSITORIES
          <i className="fas fa-external-link-alt text-[10px]"></i>
        </a>
      </div>
    </div>
  );
};

export default Projects;
