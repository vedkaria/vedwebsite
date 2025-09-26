// Create fireworks effect
function createFireworks() {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.className = 'fireworks';
    document.body.appendChild(fireworksContainer);

    const colors = ['#ff6b9d', '#c44569', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7', '#a29bfe', '#fd79a8'];
    
    function createFirework() {
        const firework = document.createElement('div');
        firework.className = 'firework';
        
        // Random position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * (window.innerHeight * 0.7) + 50; // Keep fireworks in upper portion
        
        // Random color
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        firework.style.left = x + 'px';
        firework.style.top = y + 'px';
        firework.style.background = color;
        firework.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
        
        fireworksContainer.appendChild(firework);
        
        // Create main particles (bigger explosion)
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'firework-particle';
            particle.style.background = color;
            particle.style.position = 'absolute';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.boxShadow = `0 0 15px ${color}`;
            
            // Random direction and distance
            const angle = (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
            const distance = 60 + Math.random() * 80;
            
            // Animate the particle movement
            particle.style.transition = 'all 2s ease-out';
            particle.style.opacity = '1';
            
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.3)`;
            }, 100);
            
            fireworksContainer.appendChild(particle);
        }
        
        // Create secondary sparks
        const sparkCount = 30;
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'firework-spark';
            spark.style.background = color;
            spark.style.position = 'absolute';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.width = '4px';
            spark.style.height = '4px';
            spark.style.borderRadius = '50%';
            spark.style.boxShadow = `0 0 8px ${color}`;
            
            // Random direction and distance for sparks
            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 50;
            
            spark.style.transition = 'all 1.5s ease-out';
            spark.style.opacity = '1';
            
            setTimeout(() => {
                spark.style.opacity = '0';
                spark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0.2)`;
            }, 150);
            
            fireworksContainer.appendChild(spark);
        }
        
        // Create trailing sparks
        setTimeout(() => {
            for (let i = 0; i < 15; i++) {
                const trailSpark = document.createElement('div');
                trailSpark.style.position = 'absolute';
                trailSpark.style.left = x + 'px';
                trailSpark.style.top = y + 'px';
                trailSpark.style.width = '2px';
                trailSpark.style.height = '2px';
                trailSpark.style.borderRadius = '50%';
                trailSpark.style.background = color;
                trailSpark.style.boxShadow = `0 0 5px ${color}`;
                
                const angle = Math.random() * Math.PI * 2;
                const distance = 20 + Math.random() * 30;
                
                trailSpark.style.transition = 'all 1s ease-out';
                trailSpark.style.opacity = '0.7';
                
                setTimeout(() => {
                    trailSpark.style.opacity = '0';
                    trailSpark.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
                }, 50);
                
                fireworksContainer.appendChild(trailSpark);
            }
        }, 300);
        
        // Clean up
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
            const particles = fireworksContainer.querySelectorAll('.firework-particle, .firework-spark');
            particles.forEach(particle => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            });
        }, 3000);
    }

    // Create multiple fireworks with staggered timing
    const fireworkCount = 12;
    const delay = 300;
    
    for (let i = 0; i < fireworkCount; i++) {
        setTimeout(() => {
            createFirework();
            // Create a second firework slightly offset for more impact
            if (i % 2 === 0) {
                setTimeout(() => createFirework(), 100);
            }
        }, i * delay);
    }
    
    // Remove fireworks container after animation
    setTimeout(() => {
        if (fireworksContainer.parentNode) {
            fireworksContainer.parentNode.removeChild(fireworksContainer);
        }
    }, 6000);
}

// Create shooting stars effect
function createShootingStars() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    document.body.appendChild(starsContainer);

    function createStar() {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        // Random starting position
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = Math.random() * 3 + 2;
        star.style.animationDuration = duration + 's';
        
        starsContainer.appendChild(star);
        
        // Remove star after animation
        setTimeout(() => {
            if (star.parentNode) {
                star.parentNode.removeChild(star);
            }
        }, duration * 1000);
    }

    // Create stars periodically
    setInterval(createStar, 800);
}

// Experience items toggle functionality
function initExperienceToggles() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        const toggle = item.querySelector('.experience-toggle');
        
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            experienceItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Scroll to corresponding section
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Resume download functionality
function initResumeDownload() {
    const resumeBtn = document.querySelector('.resume-btn');
    
    resumeBtn.addEventListener('click', () => {
        // Create a temporary link to download the resume
        const link = document.createElement('a');
        link.href = 'resume.pdf'; // Make sure you have a file named 'resume.pdf' in your website folder
        link.download = 'Ved_Karia_Resume.pdf';
        link.click();
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for background
function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body::before');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Typing effect for hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    const gradientText = heroTitle.querySelector('.gradient-text');
    
    if (gradientText) {
        const gradientTextContent = gradientText.textContent;
        gradientText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < gradientTextContent.length) {
                gradientText.textContent += gradientTextContent.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createShootingStars();
    initExperienceToggles();
    initNavigation();
    initResumeDownload();
    initSmoothScrolling();
    initScrollAnimations();
    initTypingEffect();
    
    // Check if this is the first visit and show fireworks
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
        // Show fireworks on first visit
        setTimeout(() => {
            createFireworks();
        }, 500);
        sessionStorage.setItem('hasVisited', 'true');
    }
    
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate any layout-dependent features if needed
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effect to project items
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.resume-btn, .nav-item');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});
