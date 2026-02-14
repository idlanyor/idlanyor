const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5 mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
        <div>
          © {new Date().getFullYear()} Roynaldi. Built with React & Tailwind.
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#home" className="hover:text-white transition-colors uppercase font-bold tracking-widest text-[10px]">Back to top</a>
          <a href="https://github.com/idlanyor" className="hover:text-white transition-colors uppercase font-bold tracking-widest text-[10px]">Github</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
