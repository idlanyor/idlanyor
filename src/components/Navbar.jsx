import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Beranda', href: '/' },
    { name: 'Daftar Artikel', href: '/blog' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Hubungi Kami', href: '/contact' }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-emerald-500/10 dark:border-amber-400/5 py-3 shadow-sm' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo idlanyor-web */}
        <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white text-sm font-black transition-transform group-hover:rotate-12 shadow-lg shadow-emerald-500/20">
            i
          </div>
          idlanyor<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400">-web</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link 
                  to={item.href} 
                  className={`text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isActive(item.href) 
                      ? 'text-emerald-500 dark:text-amber-400' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-amber-400'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-3 pl-6 border-l border-black/5 dark:border-white/10">
            {/* Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-amber-400 transition-all border border-black/5 dark:border-white/5 cursor-pointer"
              aria-label="Toggle Theme"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            
            {/* CTA Contact Button */}
            <Link 
              to="/contact" 
              className="clay-btn-primary !bg-emerald-500 hover:!bg-emerald-600 !px-5 !py-2.5 !text-[10px] !uppercase !tracking-widest border-none shadow-none"
            >
              Langganan
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400"
          >
            <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <div className={`w-6 h-0.5 bg-slate-900 dark:bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-slate-900 dark:bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-4 h-0.5 bg-slate-900 dark:bg-white self-end transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`}></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-[90] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="flex flex-col h-full pt-32 px-10 gap-8">
          {navItems.map((item, index) => (
            <div 
              key={item.name}
              style={{ transitionDelay: `${index * 100}ms` }}
              className={`transition-all duration-500 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
            >
              <Link 
                to={item.href}
                className={`text-4xl font-black cursor-pointer ${
                  isActive(item.href) 
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-amber-400' 
                    : 'text-slate-900 dark:text-white'
                }`}
              >
                {item.name}
              </Link>
            </div>
          ))}
          
          <div className={`mt-8 transition-all duration-500 delay-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link 
              to="/contact" 
              className="clay-btn-primary !bg-emerald-500 hover:!bg-emerald-600 w-full py-4 text-lg border-none shadow-none text-center block"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
