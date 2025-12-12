// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);

    // Add rotation animation to button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const theme = html.getAttribute('data-theme');

    if (currentScroll > 100) {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.style.background = 'rgba(248, 250, 252, 0.95)';
        }
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    } else {
        if (theme === 'dark') {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        } else {
            navbar.style.background = 'rgba(248, 250, 252, 0.9)';
        }
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.info-card, .skill-category, .project-card, .social-link');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing Effect for Hero Subtitle
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const subtitleText = subtitle.textContent;
    subtitle.textContent = '';
    let charIndex = 0;

    function typeWriter() {
        if (charIndex < subtitleText.length) {
            subtitle.textContent += subtitleText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Counter Animation for Stats
const statNumbers = document.querySelectorAll('.stat-item h3');

if (statNumbers.length > 0) {
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
            }
        }, 30);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
const heroImage = document.querySelector('.hero-image');

if (hero && heroImage) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < hero.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        }
    });
}

// Smooth appearance for project cards (index page only)
const projectCardsIndex = document.querySelectorAll('.projects .project-card');
if (projectCardsIndex.length > 0) {
    projectCardsIndex.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Add hover effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const ripple = document.createElement('span');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Skills hover effect with tooltip
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, rgba(20, 184, 166, 0.2), rgba(13, 148, 136, 0.2))';
    });

    skill.addEventListener('mouseleave', function() {
        this.style.background = 'var(--dark-bg)';
    });
});

// Scroll to top button (hidden by default)
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 10px rgba(20, 184, 166, 0.3);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.visibility = 'visible';
    } else {
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Dynamic particle effect (optional - creates floating elements)
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 5 + 2}px;
        height: ${Math.random() * 5 + 2}px;
        background: rgba(20, 184, 166, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
        animation: float-particle ${Math.random() * 10 + 5}s linear infinite;
    `;
    return particle;
}

// Add floating particles to hero section
const heroParticles = document.querySelector('.hero-particles');
if (heroParticles) {
    for (let i = 0; i < 20; i++) {
        heroParticles.appendChild(createParticle());
    }
}

// Add CSS animation for particles
const style = document.createElement('style');
style.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
            opacity: 0;
        }
    }

    .nav-link.active {
        color: var(--primary-color);
    }

    .scroll-top-btn:active {
        transform: scale(0.95);
    }
`;
document.head.appendChild(style);

// Console Easter Egg
console.log('%c🚀 Welcome to Roynaldi\'s Portfolio!', 'color: #14b8a6; font-size: 20px; font-weight: bold;');
console.log('%c👨‍💻 Interested in the code? Check out my GitHub: https://github.com/idlanyor', 'color: #0d9488; font-size: 14px;');
console.log('%c💼 Let\'s connect and build something amazing together!', 'color: #ec4899; font-size: 14px;');

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===== GALLERY PAGE FUNCTIONALITY =====

// Gallery Accordion Toggle
const galleryAccordionHeaders = document.querySelectorAll('.gallery-accordion-header');

if (galleryAccordionHeaders.length > 0) {
    galleryAccordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-toggle');
            const content = document.getElementById(targetId);

            // Toggle active class on header
            header.classList.toggle('active');

            // Toggle active class on content
            if (content) {
                content.classList.toggle('active');
            }
        });
    });
}

// Gallery Filter (will be initialized after data loads)
function initializeGalleryFilters() {
    const galleryFilterBtns = document.querySelectorAll('.gallery-filters .filter-btn');

    if (galleryFilterBtns.length > 0) {
        galleryFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                galleryFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');
                const galleryItems = document.querySelectorAll('.gallery-item');

                galleryItems.forEach(item => {
                    // Close all accordions when filtering
                    const accordionContent = item.querySelector('.gallery-accordion-content');
                    const accordionHeader = item.querySelector('.gallery-accordion-header');
                    if (accordionContent && accordionHeader) {
                        accordionContent.classList.remove('active');
                        accordionHeader.classList.remove('active');
                    }

                    if (filterValue === 'all') {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        const itemCategory = item.getAttribute('data-category');
                        if (itemCategory === filterValue) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 10);
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}

// Initialize gallery items with transition
function initializeGalleryItemsTransition() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

// ===== PROJECTS PAGE FUNCTIONALITY =====

// Projects Accordion Toggle
const projectToggleBtns = document.querySelectorAll('.project-toggle-btn');

if (projectToggleBtns.length > 0) {
    projectToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute('data-toggle');
            const content = document.getElementById(targetId);

            // Toggle active class on button
            btn.classList.toggle('active');

            // Toggle active class on content
            if (content) {
                content.classList.toggle('active');
            }
        });
    });
}

// Project Filter (will be initialized after data loads)
function initializeProjectFilters() {
    const projectFilterBtns = document.querySelectorAll('.filter-buttons .filter-btn');
    const projectSearch = document.getElementById('project-search');

    if (projectFilterBtns.length > 0) {
        projectFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                projectFilterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const techValue = btn.getAttribute('data-tech');
                filterProjects(techValue, projectSearch ? projectSearch.value : '');
            });
        });
    }

    // Project Search
    if (projectSearch) {
        projectSearch.addEventListener('input', (e) => {
            const searchValue = e.target.value.toLowerCase();
            const activeTech = document.querySelector('.filter-buttons .filter-btn.active');
            const techValue = activeTech ? activeTech.getAttribute('data-tech') : 'all';
            filterProjects(techValue, searchValue);
        });
    }
}

// Filter Projects Function
function filterProjects(tech, searchTerm) {
    let visibleCount = 0;
    const projectAccordionItems = document.querySelectorAll('.project-accordion-item');
    const noResults = document.getElementById('no-results');

    projectAccordionItems.forEach(item => {
        const cardTech = item.getAttribute('data-tech');
        const cardTitle = item.querySelector('.project-title-info h3').textContent.toLowerCase();
        const cardDesc = item.querySelector('.project-title-info p').textContent.toLowerCase();

        // Close accordion when filtering
        const accordionContent = item.querySelector('.project-card-content');
        const toggleBtn = item.querySelector('.project-toggle-btn');
        if (accordionContent && toggleBtn) {
            accordionContent.classList.remove('active');
            toggleBtn.classList.remove('active');
        }

        const matchesTech = tech === 'all' || cardTech === tech;
        const matchesSearch = searchTerm === '' ||
                             cardTitle.includes(searchTerm) ||
                             cardDesc.includes(searchTerm);

        if (matchesTech && matchesSearch) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 10);
            visibleCount++;
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });

    // Show/hide no results message
    if (noResults) {
        if (visibleCount === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    }
}

// Initialize project accordion items with transition
function initializeProjectItemsTransition() {
    const projectAccordionItems = document.querySelectorAll('.project-accordion-item');
    if (projectAccordionItems.length > 0) {
        projectAccordionItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }
}

// ===== LOAD DATA FROM JSON =====

// Load Gallery Data
async function loadGalleryData() {
    const galleryContainer = document.getElementById('gallery-container');
    const loadingMessage = document.getElementById('gallery-loading');

    if (!galleryContainer) return;

    try {
        const response = await fetch('gallery-data.json');
        const data = await response.json();

        // Hide loading message
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        // Render gallery items
        galleryContainer.innerHTML = data.albums.map(album => `
            <div class="gallery-item" data-category="${album.category}">
                <div class="gallery-accordion-item">
                    <button class="gallery-accordion-header" data-toggle="${album.id}">
                        <div class="accordion-header-content">
                            <div class="accordion-icon">
                                <i class="${album.icon}"></i>
                            </div>
                            <div class="accordion-info">
                                <h3>${album.title}</h3>
                                <p>${album.itemCount} Items • ${album.categoryLabel}</p>
                            </div>
                        </div>
                        <i class="fas fa-chevron-down accordion-arrow"></i>
                    </button>
                    <div class="gallery-accordion-content" id="${album.id}">
                        <div class="album-items-grid">
                            ${album.items.map(item => `
                                <div class="album-item">
                                    <img src="${item.image}" alt="${item.title}">
                                    <div class="album-item-overlay">
                                        <h4>${item.title}</h4>
                                        <p>${item.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-initialize accordion functionality
        initializeGalleryAccordion();
        initializeGalleryFilters();
        initializeGalleryItemsTransition();

        // Add click listeners to images for modal
        if (window.addImageClickListeners) {
            window.addImageClickListeners();
        }

    } catch (error) {
        console.error('Error loading gallery data:', error);
        if (loadingMessage) {
            loadingMessage.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load gallery data. Please try again later.</p>
            `;
        }
    }
}

// Load Projects Data
async function loadProjectsData() {
    const projectsContainer = document.getElementById('projects-container');
    const loadingMessage = document.getElementById('projects-loading');

    if (!projectsContainer) return;

    try {
        const response = await fetch('projects-data.json');
        const data = await response.json();

        // Hide loading message
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        // Render projects
        projectsContainer.innerHTML = data.projects.map(project => `
            <div class="project-accordion-item" data-tech="${project.tech}">
                <div class="project-card-collapsible">
                    <div class="project-card-header">
                        <div class="project-header-left">
                            <div class="project-icon">
                                <i class="${project.icon}"></i>
                            </div>
                            <div class="project-title-info">
                                <h3>${project.title}</h3>
                                <p>${project.shortDescription}</p>
                            </div>
                        </div>
                        <div class="project-header-right">
                            <span class="tech-tag">${project.techTag}</span>
                            <div class="project-stats">
                                ${project.stats.stars ? `<span><i class="fas fa-star"></i> ${project.stats.stars}</span>` : ''}
                                ${project.stats.views ? `<span><i class="fas fa-eye"></i> ${project.stats.views}</span>` : ''}
                                ${project.stats.forks ? `<span><i class="fas fa-code-branch"></i> ${project.stats.forks}</span>` : ''}
                            </div>
                            <button class="project-toggle-btn" data-toggle="${project.id}">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                    <div class="project-card-content" id="${project.id}">
                        <div class="project-details">
                            <div class="project-description">
                                <h4><i class="fas fa-info-circle"></i> Description</h4>
                                <p>${project.description}</p>
                            </div>
                            <div class="project-tech-stack">
                                <h4><i class="fas fa-layer-group"></i> Tech Stack</h4>
                                <div class="tech-tags">
                                    ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="project-actions">
                                <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                                    <i class="fab fa-github"></i> GitHub
                                </a>
                                <a href="${project.detailUrl}" class="btn btn-primary">
                                    <i class="fas fa-info-circle"></i> Full Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-initialize accordion functionality
        initializeProjectsAccordion();
        initializeProjectFilters();
        initializeProjectItemsTransition();

    } catch (error) {
        console.error('Error loading projects data:', error);
        if (loadingMessage) {
            loadingMessage.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>Failed to load projects data. Please try again later.</p>
            `;
        }
    }
}

// Initialize gallery accordion after loading data
function initializeGalleryAccordion() {
    const headers = document.querySelectorAll('.gallery-accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const targetId = header.getAttribute('data-toggle');
            const content = document.getElementById(targetId);
            header.classList.toggle('active');
            if (content) {
                content.classList.toggle('active');
            }
        });
    });
}

// Initialize projects accordion after loading data
function initializeProjectsAccordion() {
    const toggleBtns = document.querySelectorAll('.project-toggle-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const targetId = btn.getAttribute('data-toggle');
            const content = document.getElementById(targetId);
            btn.classList.toggle('active');
            if (content) {
                content.classList.toggle('active');
            }
        });
    });
}

// Load data on page load
window.addEventListener('DOMContentLoaded', () => {
    loadGalleryData();
    loadProjectsData();
});

// ===== GALLERY MODAL FUNCTIONALITY =====

let currentAlbumItems = [];
let currentImageIndex = 0;

// Open Modal
function openGalleryModal(albumItems, imageIndex) {
    currentAlbumItems = albumItems;
    currentImageIndex = imageIndex;

    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCurrent = document.getElementById('modal-current');
    const modalTotal = document.getElementById('modal-total');

    if (!modal || !currentAlbumItems.length) return;

    // Set current image data
    const currentItem = currentAlbumItems[currentImageIndex];
    modalImage.src = currentItem.image;
    modalImage.alt = currentItem.title;
    modalTitle.textContent = currentItem.title;
    modalDescription.textContent = currentItem.description;
    modalCurrent.textContent = currentImageIndex + 1;
    modalTotal.textContent = currentAlbumItems.length;

    // Update navigation buttons
    updateNavigationButtons();

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Navigate to previous image
function showPreviousImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModalContent();
    }
}

// Navigate to next image
function showNextImage() {
    if (currentImageIndex < currentAlbumItems.length - 1) {
        currentImageIndex++;
        updateModalContent();
    }
}

// Update modal content
function updateModalContent() {
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCurrent = document.getElementById('modal-current');

    const currentItem = currentAlbumItems[currentImageIndex];
    modalImage.src = currentItem.image;
    modalImage.alt = currentItem.title;
    modalTitle.textContent = currentItem.title;
    modalDescription.textContent = currentItem.description;
    modalCurrent.textContent = currentImageIndex + 1;

    updateNavigationButtons();
}

// Update navigation button states
function updateNavigationButtons() {
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    if (prevBtn) {
        prevBtn.disabled = currentImageIndex === 0;
    }

    if (nextBtn) {
        nextBtn.disabled = currentImageIndex === currentAlbumItems.length - 1;
    }
}

// Initialize modal event listeners
function initializeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementById('modal-close');
    const overlay = document.querySelector('.modal-overlay');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    // Close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeGalleryModal);
    }

    // Overlay click to close
    if (overlay) {
        overlay.addEventListener('click', closeGalleryModal);
    }

    // Navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', showPreviousImage);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', showNextImage);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal || !modal.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeGalleryModal();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Add click listeners to album items after they're rendered
    const addImageClickListeners = () => {
        document.querySelectorAll('.album-item').forEach((item, index) => {
            item.addEventListener('click', function() {
                const albumContent = this.closest('.gallery-accordion-content');
                const albumId = albumContent ? albumContent.id : null;

                if (albumId) {
                    // Find the album data
                    const albumItems = [];
                    albumContent.querySelectorAll('.album-item').forEach(albumItem => {
                        const img = albumItem.querySelector('img');
                        const title = albumItem.querySelector('h4').textContent;
                        const description = albumItem.querySelector('p').textContent;
                        albumItems.push({
                            image: img.src,
                            title: title,
                            description: description
                        });
                    });

                    // Find index of clicked item
                    const clickedIndex = Array.from(albumContent.querySelectorAll('.album-item')).indexOf(this);
                    openGalleryModal(albumItems, clickedIndex);
                }
            });
        });
    };

    // Call this function after gallery data is loaded
    window.addImageClickListeners = addImageClickListeners;
}

// Initialize modal on page load
if (document.getElementById('gallery-modal')) {
    initializeGalleryModal();
}