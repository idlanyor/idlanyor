const Contact = () => {
  const socialLinks = [
    { name: 'Github', link: 'https://github.com/idlanyor', icon: 'fab fa-github' },
    { name: 'Website', link: 'https://antidonasi.web.id', icon: 'fas fa-globe' },
    { name: 'Instagram', link: 'https://instagram.com/kang.potokopi', icon: 'fab fa-instagram' },
    { name: 'Twitter', link: '#', icon: 'fab fa-twitter' },
  ];

  return (
    <div className="py-20 space-y-12">
      <div className="text-center space-y-3">
        <div className="text-blue-600 dark:text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em]">Connect</div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          Let's Build Something <br />
          <span className="text-blue-600 dark:text-blue-500">Amazing Together.</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0f172a]/50 border border-black/5 dark:border-white/5 backdrop-blur-sm flex flex-col justify-center space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Have a project in mind?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
          </p>
          <div className="pt-2">
            <a 
              href="mailto:support@antidonasi.web.id"
              className="text-xl font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors flex items-center gap-3 group"
            >
              hi@idlanyor.dev
              <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform text-sm"></i>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {socialLinks.map((social) => (
            <a 
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-white dark:bg-[#030712] border border-black/5 dark:border-white/5 flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 transition-all group shadow-sm dark:shadow-none"
            >
              <i className={`${social.icon} text-xl text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors`}></i>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
