import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#030712] text-slate-900 dark:text-slate-200 selection:bg-blue-500/30 transition-colors duration-300">
      <BackgroundAnimation theme={theme} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="pt-20 space-y-32 pb-20">
          <section id="home">
            <Hero theme={theme} />
          </section>

          <section id="portfolio">
            <FeaturedProjects />
          </section>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <section id="about" className="lg:col-span-7">
              <About />
            </section>
            
            <section id="skills" className="lg:col-span-5">
              <Skills />
            </section>
          </div>

          <section id="projects">
            <Projects />
          </section>
          
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}

export default App;
