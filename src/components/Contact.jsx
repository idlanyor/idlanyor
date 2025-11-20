const Contact = () => {
    // Social media links configuration
    const socialLinks = [
        {
            icon: 'fab fa-github',
            name: 'GitHub',
            link: 'https://github.com/idlanyor',
            color: 'hover:text-gray-400',
            ariaLabel: 'Visit my GitHub profile'
        },
        {
            icon: 'fas fa-globe',
            name: 'Website',
            link: 'https://roidev.my.id',
            color: 'hover:text-blue-400',
            ariaLabel: 'Visit my personal website'
        },
        {
            icon: 'fab fa-instagram',
            name: 'Instagram',
            link: 'https://instagram.com/idlanyor',
            color: 'hover:text-pink-500',
            ariaLabel: 'Follow me on Instagram'
        },
        {
            icon: 'fab fa-discord',
            name: 'Discord',
            link: 'https://discord.com/users/idlanyor',
            color: 'hover:text-indigo-500',
            ariaLabel: 'Chat with me on Discord'
        },
    ];

    // Email configuration
    const email = 'contact@roidev.my.id';

    return (
        <section
            id="contact"
            className="contact section-padding"
            aria-labelledby="contact-heading"
        >
            <div className="container">
                {/* Section Header */}
                <div
                    className="section-header text-center mb-12"
                    data-aos="fade-up"
                >
                    <h2
                        id="contact-heading"
                        className="section-title text-3xl font-bold mb-4"
                    >
                        Get In Touch
                    </h2>
                    <p className="section-subtitle text-gray-400">
                        Let&apos;s work together!
                    </p>
                </div>

                {/* Contact Content */}
                <div className="contact-content grid md:grid-cols-2 gap-12 items-center">
                    {/* Contact Info */}
                    <div
                        className="contact-info space-y-6"
                        data-aos="fade-right"
                    >
                        <h3 className="text-2xl font-semibold mb-4">
                            Let&apos;s Connect and Create Something Amazing Together!
                        </h3>

                        {/* Social Links */}
                        <div className="social-links flex flex-wrap gap-4 mt-8">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={`${social.name}-${index}`}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.ariaLabel}
                                    className={`
                                        social-link
                                        flex items-center gap-2
                                        px-4 py-2
                                        rounded-full
                                        bg-gray-800
                                        text-gray-200
                                        transition-all duration-300
                                        hover:-translate-y-1
                                        hover:shadow-lg
                                        hover:bg-gray-700
                                        ${social.color}
                                    `}
                                >
                                    <i className={`${social.icon} text-xl`} aria-hidden="true"></i>
                                    <span className="font-medium">{social.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* CTA Box */}
                    <div
                        className="contact-cta"
                        data-aos="fade-left"
                    >
                        <div className="
                            cta-box
                            bg-gray-800
                            p-8
                            rounded-2xl
                            text-center
                            shadow-lg
                            hover:shadow-xl
                            transition-shadow duration-300
                            border border-gray-700
                        ">
                            <div className="
                                icon-wrapper
                                w-16 h-16
                                bg-indigo-500/10
                                rounded-full
                                flex items-center justify-center
                                mx-auto mb-6
                            ">
                                <i
                                    className="fas fa-envelope-open-text text-3xl text-indigo-500"
                                    aria-hidden="true"
                                ></i>
                            </div>

                            <h3 className="text-2xl font-bold mb-4">
                                Email Me
                            </h3>

                            <p className="text-gray-400 mb-8">
                                Drop me an email and I&apos;ll get back to you as soon as possible
                            </p>

                            <a
                                href={`mailto:${email}`}
                                className="
                                    btn btn-primary
                                    inline-flex items-center justify-center gap-3
                                    px-10 py-8
                                    rounded-full
                                    bg-gradient-to-r from-indigo-500 to-purple-600
                                    hover:from-indigo-600 hover:to-purple-700
                                    text-white font-semibold text-base
                                    transition-all duration-300
                                    hover:shadow-lg hover:shadow-indigo-500/50
                                    hover:scale-105
                                    no-underline
                                "
                                aria-label={`Send email to ${email}`}
                            >
                                <div className="flex align-items-center">
                                    <i
                                        className="fas fa-paper-plane"
                                        aria-hidden="true"
                                        style={{
                                            color: 'white',
                                            opacity: 1,
                                            fontSize: '1.5rem',
                                            marginRight: '1rem',
                                        }}
                                    ></i>
                                    <span style={{ color: 'white' }}>Send Email</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
