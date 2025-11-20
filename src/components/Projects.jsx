import { useGitHubData } from '../hooks/useGitHubData';
import SkeletonCard from './skeletons/SkeletonCard';

const Projects = () => {
  const { data, loading } = useGitHubData();

  // Helper to get icon based on language
  const getLanguageIcon = (language) => {
    const icons = {
      JavaScript: 'fab fa-js-square',
      TypeScript: 'fab fa-js-square',
      Python: 'fab fa-python',
      PHP: 'fab fa-php',
      Java: 'fab fa-java',
      HTML: 'fab fa-html5',
      CSS: 'fab fa-css3-alt',
      Vue: 'fab fa-vuejs',
      React: 'fab fa-react',
      Dart: 'fas fa-code',
      Flutter: 'fas fa-mobile-alt',
      'C++': 'fas fa-code',
      'C#': 'fas fa-code',
      Shell: 'fas fa-terminal',
      Blade: 'fab fa-laravel',
      Laravel: 'fab fa-laravel',
    };
    return icons[language] || 'fas fa-code';
  };

  // Helper to get gradient based on index
  const getGradient = (index) => {
    const gradients = [
      'from-blue-500 via-blue-600 to-cyan-500',
      'from-purple-500 via-purple-600 to-pink-500',
      'from-orange-500 via-orange-600 to-red-500',
      'from-green-500 via-green-600 to-emerald-500',
      'from-indigo-500 via-indigo-600 to-purple-500',
      'from-pink-500 via-pink-600 to-rose-500',
    ];
    return gradients[index % gradients.length];
  };

  // Static fallback projects
  const staticProjects = [
    {
      icon: 'fab fa-js',
      title: 'TeleExpress',
      description: 'JavaScript project with 4 stars - A telegram bot application',
      tech: 'JavaScript',
      stars: 4,
      forks: null,
      link: 'https://github.com/idlanyor/teleexpress',
    },
    {
      icon: 'fab fa-php',
      title: 'Backend-2',
      description: 'PHP backend project with clean architecture',
      tech: 'PHP',
      stars: 1,
      forks: 1,
      link: 'https://github.com/idlanyor/backend-2',
    },
    {
      icon: 'fab fa-js',
      title: 'UTS WebPro',
      description: 'TypeScript web programming project',
      tech: 'TypeScript',
      stars: 2,
      forks: null,
      link: 'https://github.com/idlanyor/uts-webpro',
    },
    {
      icon: 'fab fa-laravel',
      title: 'Laravue',
      description: 'Laravel + Vue.js full-stack application',
      tech: 'Blade',
      stars: 2,
      forks: null,
      link: 'https://github.com/idlanyor/laravue',
    },
    {
      icon: 'fas fa-robot',
      title: 'WBot',
      description: 'WhatsApp Bot using Baileys library',
      tech: 'JavaScript',
      stars: 2,
      forks: null,
      link: 'https://github.com/idlanyor/wbot',
    },
    {
      icon: 'fas fa-gamepad',
      title: 'Kanata Reborn',
      description: 'Special noted project',
      tech: 'Featured',
      stars: null,
      forks: null,
      link: 'https://github.com/idlanyor/kanata-reborn',
    },
  ];

  // Use dynamic data if available, otherwise static
  const projects = data?.repos?.length > 0 
    ? data.repos.map(repo => ({
        icon: getLanguageIcon(repo.language),
        title: repo.name,
        description: repo.description || 'No description available',
        tech: repo.language || 'Code',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        link: repo.html_url
      }))
    : staticProjects;
  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" data-aos="fade-up">
          <h2 id="projects-heading" className="section-title text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="section-subtitle text-lg">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fas fa-spinner fa-spin"></i>
                Loading projects from GitHub...
              </span>
            ) : (
              'Explore my latest creative works and open-source contributions'
            )}
          </p>
        </div>

        {/* Projects Grid - Modern Design */}
        <div className="projects-grid-modern">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <SkeletonCard type="project" />
                </div>
              ))}
            </>
          ) : (
            projects.map((project, index) => (
              <article
                key={`${project.title}-${index}`}
                className="project-card-modern group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Card Banner with Gradient */}
                <div className={`project-banner bg-gradient-to-br ${getGradient(index)} relative overflow-hidden`}>
                  <div className="banner-overlay absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>

                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-white/5 transform rotate-12 scale-150"></div>
                  </div>

                  {/* GitHub Link Button */}
                  <div className="project-links-top absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-icon w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                      aria-label={`View ${project.title} on GitHub`}
                      title="View on GitHub"
                    >
                      <i className="fab fa-github text-white text-xl"></i>
                    </a>
                  </div>
                </div>

                {/* Card Content */}
                <div className="project-content-modern">
                  {/* Floating Icon */}
                  <div className="project-icon-floating group-hover:scale-110 transition-transform duration-300">
                    <i className={project.icon} aria-hidden="true"></i>
                  </div>

                  {/* Project Title */}
                  <h3 className="project-title-modern">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="project-desc-modern">
                    {project.description}
                  </p>

                  {/* Tech Badge */}
                  <div className="project-tech-stack mb-4">
                    <span className="tech-badge inline-flex items-center gap-2">
                      <i className="fas fa-code" aria-hidden="true"></i>
                      <span>{project.tech}</span>
                    </span>
                  </div>

                  {/* Footer with Stats and Link */}
                  <div className="project-footer-modern">
                    <div className="project-stats-modern flex gap-3">
                      <div
                        className="stat-badge flex items-center gap-1"
                        title={`${project.stars || 0} stars`}
                        aria-label={`${project.stars || 0} stars`}
                      >
                        <i className="fas fa-star text-yellow-400" aria-hidden="true"></i>
                        <span className="text-sm font-medium">{project.stars || 0}</span>
                      </div>
                      <div
                        className="stat-badge flex items-center gap-1"
                        title={`${project.forks || 0} forks`}
                        aria-label={`${project.forks || 0} forks`}
                      >
                        <i className="fas fa-code-branch text-blue-400" aria-hidden="true"></i>
                        <span className="text-sm font-medium">{project.forks || 0}</span>
                      </div>
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-project-btn group/link"
                      aria-label={`View details of ${project.title}`}
                    >
                      <span>Details</span>
                      <i className="fas fa-arrow-right transition-transform duration-300 group-hover/link:translate-x-1" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        
      </div>
    </section>
  );
};

export default Projects;
