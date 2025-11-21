import { useState, useEffect } from 'react';
import { useGitHubData } from '../hooks/useGitHubData';
import SkeletonCard from './skeletons/SkeletonCard';

const Hero = () => {
  const { data, loading } = useGitHubData();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for background animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to viewport center
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Default/Fallback data
  const stats = [
    {
      icon: 'fas fa-code',
      value: loading ? '...' : data?.user?.public_repos || '185+',
      label: 'Repositories'
    },
    {
      icon: 'fas fa-star',
      value: loading ? '...' : data?.user?.total_stars || '52',
      label: 'Stars'
    },
    {
      icon: 'fas fa-users',
      value: loading ? '...' : data?.user?.followers || '33',
      label: 'Followers'
    },
  ];

  return (
    <section id="home" className="hero">
      {/* Animated Background Particles */}
      <div
        className="hero-particles"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>

      {/* Gradient Orbs that follow mouse */}
      <div className="hero-orbs">
        <div
          className="orb orb-1"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        ></div>
        <div
          className="orb orb-2"
          style={{
            transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`,
            transition: 'transform 0.6s ease-out'
          }}
        ></div>
        <div
          className="orb orb-3"
          style={{
            transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        ></div>
      </div>

      <div className="container">
        <div className="hero-content">
          {/* Hero Text */}
          <div className="hero-text" data-aos="fade-right">
            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{data?.user?.name || 'Roynaldi'}</span>
            </h1>
            <h2 className="hero-subtitle">
              Mandor AI & Tukang Fotokopi
            </h2>
            <p className="hero-description">
              {data?.user?.bio || '"Let\'s Play the game like coding" - Seorang tukang fotokopi yang terobsesi dengan koding dan grafis. berdedikasi untuk meningkatkan kemampuan programming dan desain grafis melalui coba coba.'}
            </p>

            {/* Stats */}
            <div className="hero-stats">
              {loading ? (
                <>
                  <SkeletonCard type="stat" />
                  <SkeletonCard type="stat" />
                  <SkeletonCard type="stat" />
                </>
              ) : (
                stats.map((stat, index) => (
                  <div key={index} className="stat-item" data-aos="fade-up" data-aos-delay={index * 100}>
                    <i className={stat.icon}></i>
                    <div>
                      <h3>{stat.value}</h3>
                      <p>{stat.label}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Buttons */}
            <div className="hero-buttons" data-aos="fade-up" data-aos-delay="300">
              <a href="#contact" className="btn btn-primary">
                <i className="fas fa-envelope"></i> Get In Touch
              </a>
              <a
                href={data?.user?.html_url || "https://github.com/idlanyor"}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <i className="fab fa-github"></i> View GitHub
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="hero-image" data-aos="fade-left">
            <div className="image-wrapper">
              <img
                src={data?.user?.avatar_url || "https://avatars.githubusercontent.com/u/52753423"}
                alt="Roynaldi"
              />
              <div className="image-bg"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" data-aos="fade-up" data-aos-delay="500">
        <i className="fas fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;
