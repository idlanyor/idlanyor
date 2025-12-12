import { useState, useEffect } from 'react';
import AOS from 'aos';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';

// Deteksi apakah device mobile performa rendah (hp kentang)
function isLowPerformanceMobile() {
  if (typeof window === 'undefined') return false;

  // Cek berdasarkan jumlah core, RAM, dan layanan worker
  const userAgent = window.navigator.userAgent.toLowerCase();
  const memory = window.navigator.deviceMemory || 0;
  const hardwareConcurrency = window.navigator.hardwareConcurrency || 0;

  // HP kentang biasanya memiliki RAM <= 2GB dan core <= 4
  const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isLowRam = memory <= 2;
  const isLowCore = hardwareConcurrency <= 4;

  // Juga cek jika device menggunakan baterai hemat daya
  const isBatterySaver = window.navigator.connection?.saveData || false;

  return isMobile && (isLowRam || isLowCore || isBatterySaver);
}

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initialize AOS hanya jika bukan hp kentang
    if (!isLowPerformanceMobile()) {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-in-out',
      });
    } else {
      // Tambah class untuk disable animations di CSS
      document.body.classList.add('low-performance-mobile');
    }

    // Check for saved theme preference or default to 'dark'
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
    <div className="min-h-screen bg-dark text-primary transition-colors duration-300 relative">
      {/* Background Animation - Full page */}
      <BackgroundAnimation />

      {/* Content */}
      <div className="relative z-10">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}

export default App;
