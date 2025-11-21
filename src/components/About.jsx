import { useGitHubData } from '../hooks/useGitHubData';

const About = () => {
    const { data } = useGitHubData();

    const infoCards = [
        {
            icon: 'fas fa-graduation-cap',
            title: 'Education',
            subtitle: 'Light Vehicle Engineering',
            highlight: 'SMK Maarif Karangreja',
        },
        {
            icon: 'fas fa-briefcase',
            title: 'Work',
            subtitle: 'Tukang Potokopi',
            highlight: 'Wisesa Cell & Copier Karangreja',
        },
        {
            icon: 'fas fa-map-marker-alt',
            title: 'Location',
            subtitle: data?.user?.location || 'Wisesa Karangreja',
            highlight: 'Indonesia',
        },
        {
            icon: 'fas fa-globe',
            title: 'Website',
            subtitle: 'My Personal Bio',
            highlight: data?.user?.blog || 'antidonasi.web.id',
            link: data?.user?.blog ? (data.user.blog.startsWith('http') ? data.user.blog : `https://${data.user.blog}`) : 'https://antidonasi.web.id',
        },
    ];

    const badges = [
        { icon: 'fas fa-trophy', text: 'YOLO' },
        { icon: 'fas fa-fish', text: 'Pull Shark x2' },
        { icon: 'fas fa-star', text: 'Starstruck' },
        { icon: 'fas fa-bolt', text: 'Quickdraw' },
        { icon: 'fas fa-laptop-code', text: 'Developer Program Member' },
    ];

    return (
        <section id="about" className="about">
            <div className="container">
                {/* Section Header */}
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </div>

                <div className="about-content">
                    {/* Info Cards */}
                    <div className="about-info">
                        {infoCards.map((card, index) => (
                            <div
                                key={index}
                                className="info-card"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <i className={card.icon}></i>
                                <h3>{card.title}</h3>
                                {card.subtitle && <p>{card.subtitle}</p>}
                                {card.link ? (
                                    <p>
                                        <a
                                            href={card.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="highlight"
                                        >
                                            {card.highlight}
                                        </a>
                                    </p>
                                ) : (
                                    <p className="highlight">{card.highlight}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Description */}
                    <div className="about-description" data-aos="fade-left">
                        <p>
                            {data?.user?.bio ? (
                                data.user.bio
                            ) : (
                                "Saya adalah seorang Mandor AI yang passionate dalam mengembangkan aplikasi web dan mobile. Dengan pengalaman sebagai freelancer dan graphic designer, saya menggabungkan kreativitas desain dengan kemampuan teknis programming untuk menciptakan solusi yang tidak hanya fungsional, tetapi juga estetis."
                            )}
                        </p>
                        <p>
                            Saat ini saya aktif mengembangkan berbagai proyek open source dan terus belajar teknologi-teknologi baru untuk meningkatkan skill saya. Saya percaya bahwa coding adalah seperti bermain game - penuh tantangan, menyenangkan, dan selalu ada hal baru untuk dipelajari.
                        </p>

                        {/* Achievements */}
                        <div className="achievements">
                            <h3>GitHub Achievements</h3>
                            <div className="achievement-badges">
                                {badges.map((badge, index) => (
                                    <span key={index} className="badge">
                                        <i className={badge.icon}></i> {badge.text}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
