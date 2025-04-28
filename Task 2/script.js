document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksA = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo');
    const heroSection = document.querySelector('#home');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            // Force dark color for hamburger lines when menu is open
            document.querySelectorAll('.hamburger .line').forEach(line => {
                line.style.backgroundColor = 'var(--dark-color)';
            });
        } else {
            document.body.style.overflow = '';
            // Restore original color based on scroll position
            updateScrollStyles();
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // ======================
    // Scroll-Based Color Changes
    // ======================
    function updateScrollStyles() {
        const scrolled = window.scrollY > heroSection.offsetHeight - 100;
        const isMobile = window.innerWidth <= 768;
        
        // Update navbar
        navbar.classList.toggle('scrolled', scrolled);
        
        // Update logo
        logo.classList.toggle('scrolled', scrolled);
        
        // Update hamburger (only if menu isn't active)
        if (!navLinks.classList.contains('active')) {
            hamburger.classList.toggle('scrolled', scrolled);
            document.querySelectorAll('.hamburger .line').forEach(line => {
                line.style.backgroundColor = scrolled ? 'var(--dark-color)' : 'var(--light-color)';
            });
        }
        
        // Only update desktop link colors
        if (!isMobile) {
            navLinksA.forEach(link => {
                link.style.color = scrolled ? 'var(--dark-color)' : 'var(--light-color)';
            });
        }
    }
    
    // Initialize and listen to scroll events
    updateScrollStyles();
    window.addEventListener('scroll', updateScrollStyles);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // If switching to desktop view
        if (window.innerWidth > 768) {
            // Reset mobile menu state
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            
            // Update link colors based on scroll position
            updateScrollStyles();
        }
    });

    // ======================
    // Back to Top Button
    // ======================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }
    
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop);
    
    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate position with navbar offset
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL without jumping
            history.pushState(null, null, targetId);
        });
    });
    
    // ======================
    // Project Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    
    
    // Add this with your other event listeners
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    // Mouse enter effect
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'translateY(-5px) scale(1.03)';
        
        // Add particles on hover
        if (!button.dataset.particlesAdded) {
            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.className = 'button-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                particle.style.animationDelay = `${Math.random() * 0.5}s`;
                button.appendChild(particle);
            }
            button.dataset.particlesAdded = true;
        }
    });
    
    // Mouse leave effect
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translateY(0) scale(1)';
    });
    
    // Click effect
    button.addEventListener('click', (e) => {
        // Create click effect
        const clickEffect = document.createElement('div');
        clickEffect.className = 'click-effect';
        clickEffect.style.left = `${e.offsetX}px`;
        clickEffect.style.top = `${e.offsetY}px`;
        button.appendChild(clickEffect);
        
        setTimeout(() => {
            clickEffect.remove();
        }, 1000);
    });
});

// Add this CSS for the particles and click effects
const style = document.createElement('style');
style.textContent = `
.button-particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    pointer-events: none;
    animation: particle-float 1.5s ease-out forwards;
    z-index: 1;
}

.click-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    pointer-events: none;
    transform: scale(0);
    animation: click-expand 0.6s ease-out forwards;
    z-index: 2;
}

@keyframes particle-float {
    0% {
        transform: translate(0, 0);
        opacity: 1;
    }
    100% {
        transform: translate(${Math.random() > 0.5 ? '-' : ''}${10 + Math.random() * 20}px, -${20 + Math.random() * 30}px);
        opacity: 0;
    }
}

@keyframes click-expand {
    0% {
        transform: scale(0);
        opacity: 1;
    }
    100% {
        transform: scale(10);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);
    
    // ======================
    // Typewriter Effect
    // ======================
    function initTypewriter() {
        const typewriterElement = document.querySelector('.typing-text');
        if (!typewriterElement) return;
        
        const texts = ["Game Developer", "Web Developer", "UI/UX Designer", "Coder"];
        let count = 0;
        let index = 0;
        let currentText = '';
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const fullText = texts[count];
            
            if (isDeleting) {
                currentText = fullText.substring(0, currentText.length - 1);
                typingSpeed = 50;
            } else {
                currentText = fullText.substring(0, currentText.length + 1);
                typingSpeed = 100;
            }
            
            typewriterElement.textContent = currentText;
            
            if (!isDeleting && currentText === fullText) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                count = (count + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        type();
    }
    
    initTypewriter();
    
    // ======================
    // Counter Animation
    // ======================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    }
    
    function checkCounterVisibility() {
        const aboutSection = document.querySelector('.about');
        const aboutPosition = aboutSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (aboutPosition < screenPosition) {
            animateCounters();
            window.removeEventListener('scroll', checkCounterVisibility);
        }
    }
    
    window.addEventListener('scroll', checkCounterVisibility);
    
    // ======================
    // Form Submission
    // ======================
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => formObject[key] = value);
            
            simulateFormSubmit(formObject)
                .then(response => {
                    showAlert('success', 'Thank you for your message! I will get back to you soon.');
                    this.reset();
                })
                .catch(error => {
                    showAlert('error', 'Something went wrong. Please try again later.');
                });
        });
    }
    
    function simulateFormSubmit(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve({ status: 'success' });
            }, 1500);
        });
    }
    
    // ======================
    // Newsletter Form
    // ======================
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!validateEmail(email)) {
                showAlert('error', 'Please enter a valid email address.');
                return;
            }
            
            simulateSubscription(email)
                .then(() => {
                    showAlert('success', `Thank you for subscribing with ${email}!`);
                    emailInput.value = '';
                })
                .catch(() => {
                    showAlert('error', 'Subscription failed. Please try again.');
                });
        });
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function simulateSubscription(email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Subscribed:', email);
                resolve();
            }, 1000);
        });
    }
    
    // ======================
    // Alert Notification
    // ======================
    function showAlert(type, message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 5000);
    }
    
    // ======================
    // Animation on Scroll
    // ======================
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .project-card, .about-image, .contact-info, .contact-form');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPoint) {
                element.classList.add('animate');
            }
        });
    }
    
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

// Add this inside your updateScrollStyles() function
document.querySelectorAll('.hero-buttons .btn').forEach(button => {
    if (scrolled) {
        button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    } else {
        button.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.2)';
    }
});