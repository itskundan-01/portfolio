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
            // Only prevent default and modify URL if it doesn't already start with http/https
            if (!href.startsWith('http://') && !href.startsWith('https://')) {
                e.preventDefault();
                window.open(`https://${href}`, '_blank');
            }
            // If it already has http/https, let it open normally
        }
    });
});

// Simple Form Validation and Formspree Integration
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Basic validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            showFormStatus('Please fill in all fields.', 'error');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Submit to Formspree
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    showFormStatus('There was an error sending your message. Please try again.', 'error');
                } else {
                    showFormStatus('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                }
            }
        } catch (error) {
            showFormStatus('There was an error sending your message. Please try again.', 'error');
        } finally {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    });
    
    // Function to show form status messages
    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.innerHTML = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';
            
            // Hide success message after 5 seconds
            if (type === 'success') {
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);
            }
        }
    }
}

// Add CSS for form validation and status messages
document.head.insertAdjacentHTML('beforeend', `
    <style>
        input.error, textarea.error {
            border-color: #ff3860 !important;
            box-shadow: 0 0 5px rgba(255, 56, 96, 0.3) !important;
        }
        
        .form-status {
            margin: 15px 0;
            padding: 12px 15px;
            border-radius: 5px;
            font-size: 0.9rem;
            font-weight: 500;
            display: none;
        }
        
        .form-status.success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .form-status.error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        
        .contact-form button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
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
