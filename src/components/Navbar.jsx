import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (isHomePage) {
        const sections = ['home', 'portfolio', 'about', 'skills', 'blog', 'projects', 'contact'];
        const current = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        if (current) setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Skills', href: 'skills' },
    { name: 'Portfolio', href: 'portfolio' },
    { name: 'Projects', href: 'projects' },
    { name: 'Blog', href: '/blog', isExternal: true },
    { name: 'Contact', href: 'contact' }
  ];

  const handleNavClick = (e, href, isExternal) => {
    if (isExternal) return;
    
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(href);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${href}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm transition-transform group-hover:rotate-12">R</div>
          ROY<span className="text-blue-500">.</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.name}>
                {item.isExternal ? (
                  <Link 
                    to={item.href} 
                    className={`text-xs font-bold uppercase tracking-widest transition-all ${location.pathname === item.href ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a 
                    href={`#${item.href}`}
                    onClick={(e) => handleNavClick(e, item.href, false)}
                    className={`text-xs font-bold uppercase tracking-widest transition-all ${isHomePage && activeSection === item.href ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-3 pl-6 border-l border-black/5 dark:border-white/10">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-all border border-black/5 dark:border-white/5"
              aria-label="Toggle Theme"
            >
              <i className={`fas ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact', false)}
              className="clay-btn-primary !px-5 !py-2.5 !text-[10px] !uppercase !tracking-widest"
            >
              Let's Talk
            </a>
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
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5"
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
              {item.isExternal ? (
                <Link 
                  to={item.href}
                  className={`text-4xl font-black ${location.pathname === item.href ? 'text-blue-500' : 'text-slate-900 dark:text-white'}`}
                >
                  {item.name}
                </Link>
              ) : (
                <a 
                  href={`#${item.href}`}
                  onClick={(e) => handleNavClick(e, item.href, false)}
                  className={`text-4xl font-black ${isHomePage && activeSection === item.href ? 'text-blue-500' : 'text-slate-900 dark:text-white'}`}
                >
                  {item.name}
                </a>
              )}
            </div>
          ))}
          
          <div className={`mt-8 transition-all duration-500 delay-500 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, 'contact', false)}
              className="clay-btn-primary w-full py-4 text-lg"
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
