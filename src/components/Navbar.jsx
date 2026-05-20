import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDark = theme === 'dark';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Portfolio', 'Projects', 'Blog', 'Contact'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
          ROY<span className="text-blue-500">.</span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const href = item === 'Blog' ? '/blog' : `#${item.toLowerCase()}`;
              const isExternal = item === 'Blog';
              
              return (
                <li key={item}>
                  {isExternal ? (
                    <Link 
                      to={href} 
                      className={`text-sm font-bold transition-colors ${location.pathname === href ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                    >
                      {item}
                    </Link>
                  ) : (
                    <a 
                      href={isHomePage ? href : `/${href}`} 
                      className="text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Toggle Theme"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
            </button>
            <a href={isHomePage ? "#contact" : "/#contact"} className="clay-btn-primary !px-5 !py-2 !text-sm">
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
