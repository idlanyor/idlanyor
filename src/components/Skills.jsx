const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'JavaScript', icon: 'fab fa-js text-yellow-500' },
        { name: 'PHP', icon: 'fab fa-php text-blue-500' },
        { name: 'Python', icon: 'fab fa-python text-blue-400' },
        { name: 'C++', icon: 'fas fa-code text-slate-400' }
      ],
    },
    {
      title: 'Frontend',
      skills: [
        { name: 'React', icon: 'fab fa-react text-blue-400' },
        { name: 'Tailwind', icon: 'fas fa-wind text-cyan-400' },
        { name: 'Node.js', icon: 'fab fa-node-js text-green-500' }
      ],
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Docker', icon: 'fab fa-docker text-blue-500' },
        { name: 'Git', icon: 'fab fa-git-alt text-orange-500' },
        { name: 'Linux', icon: 'fab fa-linux text-slate-500' }
      ],
    },
  ];

  return (
    <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0f172a]/50 border border-black/5 dark:border-white/5 backdrop-blur-sm h-full transition-colors">
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">Stack</div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Abilities</h2>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-3">
              <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-black/5 dark:border-white/5 pb-1">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#030712] border border-black/5 dark:border-white/5 text-slate-700 dark:text-white text-xs font-bold hover:border-blue-500/50 transition-all cursor-default shadow-sm dark:shadow-none group"
                  >
                    <i className={`${skill.icon} text-sm group-hover:scale-110 transition-transform`}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
