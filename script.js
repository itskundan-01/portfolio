// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// Todo App Redirect
const todoApp = document.getElementById('todo-app');
if (todoApp) {
    todoApp.addEventListener('click', () => {
        const redirectUrl = todoApp.getAttribute('data-redirect');
        if (redirectUrl) {
            window.open(`https://${redirectUrl}`, '_blank');
        }
    });
}

// Project links redirect
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering the parent card's click event
        const href = link.getAttribute('href');
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            window.open(`https://${href}`, '_blank');
        }
    });
});

// Simple Form Validation (Replacing EmailJS)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Basic validation only
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                e.preventDefault();
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (isValid) {
            // The form will submit naturally to Formspree
            // We just show a loading state on the button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }
    });
}

// Add CSS for form validation
document.head.insertAdjacentHTML('beforeend', `
    <style>
        input.error, textarea.error {
            border-color: #ff3860 !important;
        }
        
        #form-status {
            margin: 15px 0;
            font-size: 0.9rem;
            font-weight: 500;
        }
    </style>
`);

// Scroll Reveal Animation
window.addEventListener('load', () => {
    // Animate sections
    const revealSections = document.querySelectorAll('section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, sectionOptions);
    
    revealSections.forEach(section => {
        section.classList.add('reveal-section');
        sectionObserver.observe(section);
    });
    
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    const revealItems = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay for each item
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const itemOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const itemObserver = new IntersectionObserver(revealItems, itemOptions);
    
    projectCards.forEach(card => {
        card.classList.add('reveal-item');
        itemObserver.observe(card);
    });
    
    skillItems.forEach(item => {
        item.classList.add('reveal-item');
        itemObserver.observe(item);
    });
    
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('revealed');
        }, 300);
    }
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .reveal-section {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s, transform 1s;
        }
        
        .reveal-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s, transform 0.6s;
        }
        
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        @keyframes floatAnimation {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        .project-icon {
            animation: floatAnimation 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(74, 109, 229, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(74, 109, 229, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(74, 109, 229, 0);
            }
        }
        
        .logo {
            animation: pulse 2s infinite;
        }
    </style>
`);

// Immediately show hero content, then animate it
document.addEventListener('DOMContentLoaded', () => {
    // Update copyright year
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.innerHTML = footerYear.innerHTML.replace('2023', currentYear);
    }
    
    // Show hero content immediately
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Make the hero content visible immediately
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        
        // Then apply the animation class for future page visits when cached
        setTimeout(() => {
            heroContent.classList.add('revealed');
        }, 300);
    }
});
