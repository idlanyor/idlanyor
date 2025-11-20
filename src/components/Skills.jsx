const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: 'fas fa-code',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { icon: 'fab fa-js', name: 'JavaScript', level: 90 },
        { icon: 'fab fa-php', name: 'PHP', level: 85 },
        { icon: 'fab fa-python', name: 'Python', level: 70 },
        { icon: 'fab fa-java', name: 'Java', level: 30 },
        { icon: 'fas fa-code', name: 'C++', level: 40 },
      ],
    },
    {
      title: 'Frontend',
      icon: 'fas fa-laptop-code',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { icon: 'fab fa-react', name: 'React', level: 90 },
        { icon: 'fab fa-html5', name: 'HTML5', level: 70 },
        { icon: 'fab fa-css3-alt', name: 'CSS3', level: 80 },
        { icon: 'fas fa-wind', name: 'Tailwind CSS', level: 70 },
        { icon: 'fab fa-bootstrap', name: 'Bootstrap', level: 90 },
      ],
    },
    {
      title: 'Tools & Others',
      icon: 'fas fa-tools',
      color: 'from-orange-500 to-red-500',
      skills: [
        { icon: 'fab fa-git-alt', name: 'Git', level: 88 },
        { icon: 'fab fa-github', name: 'GitHub', level: 90 },
        { icon: 'fab fa-docker', name: 'Docker', level: 75 },
        { icon: 'fas fa-database', name: 'Database', level: 80 },
        { icon: 'fas fa-server', name: 'Cloud Services', level: 60 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">Technologies I work with and my proficiency levels</p>
        </div>

        {/* Skills Grid - New Modern Design */}
        <div className="skills-grid-modern">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="skill-category-card"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Category Header */}
              <div className={`category-header bg-gradient-to-r ${category.color}`}>
                <div className="category-icon-wrapper">
                  <i className={category.icon}></i>
                </div>
                <h3 className="category-title">{category.title}</h3>
              </div>

              {/* Skills List with Progress Bars */}
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex} 
                    className="skill-item-modern"
                    data-aos="fade-right"
                    data-aos-delay={index * 100 + skillIndex * 50}
                  >
                    <div className="skill-info">
                      <div className="skill-name-wrapper">
                        <i className={skill.icon}></i>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="skill-progress-bar">
                      <div 
                        className={`skill-progress-fill bg-gradient-to-r ${category.color}`}
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="progress-shine"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
