import { useState } from 'react';

const Navbar = ({ theme, toggleTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#skills', label: 'Skills' },
        { href: '#projects', label: 'Projects' },
        { href: '#contact', label: 'Contact' },
    ];

    return (
        <nav className="navbar">
            <div className="container">
                <a href="#" className="logo">
                    Roynaldi
                </a>

                {/* Desktop Navigation */}
                <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="nav-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Theme Toggle & Hamburger */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <i className="fas fa-moon"></i> : <i className="fas fa-sun"></i>}
                    </button>

                    {/* Hamburger Menu */}
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`hamburger ${isOpen ? 'active' : ''}`}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
