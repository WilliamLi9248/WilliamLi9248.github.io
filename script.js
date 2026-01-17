// ==========================================
// WILLIAM LI - PERSONAL WEBSITE
// JavaScript Interactions & Animations
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initTextAnimations();
    initRevealAnimations();
    initParallax();
    initSmoothScroll();
});

// ==========================================
// NAVIGATION
// ==========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    });
}

// ==========================================
// SCROLL EFFECTS
// ==========================================
function initScrollEffects() {
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        shapes.forEach((shape, index) => {
            const speed = 0.05 + (index * 0.02);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Hide scroll indicator after scrolling
    const scrollIndicator = document.querySelector('.scroll-indicator');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ==========================================
// TEXT ANIMATIONS
// ==========================================
function initTextAnimations() {
    // Rotating text for hero tagline
    const rotatingTexts = [
        'AI & Healthcare',
        'Code & Creativity',
        'Data & Discovery',
        'Tech & Biology'
    ];

    const rotatingElement = document.querySelector('.rotating-text');
    let currentIndex = 0;

    if (rotatingElement) {
        setInterval(() => {
            rotatingElement.style.opacity = '0';
            rotatingElement.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                currentIndex = (currentIndex + 1) % rotatingTexts.length;
                rotatingElement.textContent = rotatingTexts[currentIndex];
                rotatingElement.style.opacity = '1';
                rotatingElement.style.transform = 'translateY(0)';
            }, 300);
        }, 3000);

        // Add transition styles
        rotatingElement.style.transition = 'all 0.3s ease';
    }

    // Typewriter effect for code block (optional enhancement)
    const codeContent = document.querySelector('.code-content code');
    if (codeContent) {
        codeContent.style.opacity = '1';
    }
}

// ==========================================
// REVEAL ANIMATIONS (Intersection Observer)
// ==========================================
function initRevealAnimations() {
    const revealElements = document.querySelectorAll(
        '.section-title, .about-text, .skills-container, .stats-card, ' +
        '.timeline-item, .project-card, .education-card, .contact-content'
    );

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });

    // Staggered reveal for skills
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered reveal for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    // Timeline items stagger
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
    });
}

// ==========================================
// PARALLAX EFFECTS
// ==========================================
function initParallax() {
    const codeBlock = document.querySelector('.code-block');

    if (codeBlock && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            codeBlock.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset on mouse leave
        codeBlock.addEventListener('mouseleave', () => {
            codeBlock.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        });
    }

    // Tilt effect for project cards
    const projectCards = document.querySelectorAll('.project-card:not(.featured)');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth <= 768) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// SMOOTH SCROLL
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Debounce function for performance
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// CURSOR GLOW EFFECT (Optional Enhancement)
// ==========================================
function initCursorGlow() {
    if (window.innerWidth <= 768) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
}

// Initialize cursor glow (uncomment to enable)
// initCursorGlow();

// ==========================================
// STATS COUNTER ANIMATION
// ==========================================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const countOptions = {
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;

                // Check if it's a number or percentage
                if (finalValue.includes('%')) {
                    animateValue(target, 0, parseInt(finalValue), 1500, '%');
                } else if (finalValue.includes('+')) {
                    animateValue(target, 0, parseInt(finalValue), 1500, '+');
                } else if (finalValue.includes('.')) {
                    animateDecimal(target, 0, parseFloat(finalValue), 1500);
                }

                observer.unobserve(target);
            }
        });
    }, countOptions);

    stats.forEach(stat => countObserver.observe(stat));
}

function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

function animateDecimal(element, start, end, duration) {
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = (progress * (end - start) + start).toFixed(2);
        element.textContent = currentValue;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
}

// Initialize stats counter
initStatsCounter();

// ==========================================
// EASTER EGG: Konami Code
// ==========================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear';

    setTimeout(() => {
        document.body.style.animation = '';
    }, 2000);

    console.log('🎮 Konami Code Activated! You found the easter egg!');
}

// Add rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold; color: #8b5cf6;');
console.log('%cInterested in how this site was built? Let\'s connect!', 'font-size: 14px; color: #a78bfa;');
console.log('%cwilliamli@uchicago.edu', 'font-size: 12px; color: #6366f1;');
