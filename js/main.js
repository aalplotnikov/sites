// ========================================
// LUXURY RESORT - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Loader
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Hero slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentHeroSlide = 0;
    
    function nextHeroSlide() {
        heroSlides[currentHeroSlide].classList.remove('active');
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
        heroSlides[currentHeroSlide].classList.add('active');
    }
    
    setInterval(nextHeroSlide, 5000);

    // Rooms slider
    const roomCards = document.querySelectorAll('.room-card');
    const roomPrev = document.querySelector('.room-prev');
    const roomNext = document.querySelector('.room-next');
    const roomDots = document.querySelector('.room-dots');
    let currentRoom = 0;

    // Create dots
    roomCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('room-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToRoom(index));
        roomDots.appendChild(dot);
    });

    const dots = document.querySelectorAll('.room-dot');

    function updateRooms() {
        roomCards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentRoom) {
                card.classList.add('active');
            }
        });
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index === currentRoom) {
                dot.classList.add('active');
            }
        });
    }

    function goToRoom(index) {
        currentRoom = index;
        if (currentRoom < 0) currentRoom = roomCards.length - 1;
        if (currentRoom >= roomCards.length) currentRoom = 0;
        updateRooms();
    }

    roomPrev.addEventListener('click', () => goToRoom(currentRoom - 1));
    roomNext.addEventListener('click', () => goToRoom(currentRoom + 1));

    // Auto-advance rooms every 6 seconds
    setInterval(() => {
        goToRoom(currentRoom + 1);
    }, 6000);

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll animations
    const fadeElements = document.querySelectorAll('.section-header, .feature-card, .location-content, .location-image, .spa-content, .spa-images, .room-card, .invest-content, .invest-image, .contacts-info, .contact-form');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        observer.observe(el);
    });

    // Parallax effect for territory section
    const parallaxBg = document.querySelector('.parallax-bg');
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const section = document.querySelector('.territory-section');
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                    const yPos = (scrolled - sectionTop) * 0.3;
                    parallaxBg.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    }

    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Simple validation
            const inputs = this.querySelectorAll('input[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#C9A962';
                } else {
                    input.style.borderColor = '#E0E0E0';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Спасибо за вашу заявку! Наш менеджер свяжется с вами в ближайшее время.');
                this.reset();
            }
        });
    }

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number, .benefit-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Check if it contains numbers
                if (text.match(/\d/)) {
                    element.classList.add('counted');
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = '#C9A962';
                    }
                });
            }
        });
    });

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                
                img.onload = () => {
                    img.style.transition = 'opacity 0.6s ease';
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('Paradise Resort - Luxury Landing Page Loaded Successfully ✦');
});
