// ========================================
// LUXURY RESORT & SPA - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.querySelector('.loader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.classList.add('loaded');
        }, 1500);
    });

    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const burgerBtn = document.querySelector('.burger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    const heroPrev = document.querySelector('.hero-arrow.prev');
    const heroNext = document.querySelector('.hero-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    function showHeroSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentSlide = index;
    }

    function nextHeroSlide() {
        const nextIndex = (currentSlide + 1) % heroSlides.length;
        showHeroSlide(nextIndex);
    }

    function prevHeroSlide() {
        const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(prevIndex);
    }

    function startHeroSlider() {
        slideInterval = setInterval(nextHeroSlide, 5000);
    }

    function stopHeroSlider() {
        clearInterval(slideInterval);
    }

    heroNext.addEventListener('click', () => {
        stopHeroSlider();
        nextHeroSlide();
        startHeroSlider();
    });

    heroPrev.addEventListener('click', () => {
        stopHeroSlider();
        prevHeroSlide();
        startHeroSlider();
    });

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopHeroSlider();
            showHeroSlide(index);
            startHeroSlider();
        });
    });

    startHeroSlider();

    // Rooms Slider
    const roomCards = document.querySelectorAll('.room-card');
    const roomDots = document.querySelectorAll('.slider-dots .dot');
    const roomPrev = document.querySelector('.slider-arrow.prev');
    const roomNext = document.querySelector('.slider-arrow.next');
    let currentRoom = 0;

    function showRoom(index) {
        roomCards.forEach(card => card.classList.remove('active'));
        roomDots.forEach(dot => dot.classList.remove('active'));
        
        roomCards[index].classList.add('active');
        roomDots[index].classList.add('active');
        currentRoom = index;
    }

    roomNext.addEventListener('click', () => {
        const nextIndex = (currentRoom + 1) % roomCards.length;
        showRoom(nextIndex);
    });

    roomPrev.addEventListener('click', () => {
        const prevIndex = (currentRoom - 1 + roomCards.length) % roomCards.length;
        showRoom(prevIndex);
    });

    roomDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showRoom(index);
        });
    });

    // Room thumbnails
    document.querySelectorAll('.thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const parentCard = this.closest('.room-card');
            const mainImage = parentCard.querySelector('.main-image');
            mainImage.src = this.src;
            
            parentCard.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Scroll animations
    const fadeElements = document.querySelectorAll('.section-title, .section-pretitle, .territory-card, .service-item, .feature, .stat-item, .room-card, .invest-stat');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Form handling
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            alert('Спасибо за вашу заявку! Наш менеджер свяжется с вами в ближайшее время.');
            
            // Reset form
            this.reset();
        });
    }

    // Parallax effect for territory section
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const sectionTop = parallaxBg.parentElement.offsetTop;
            const sectionHeight = parallaxBg.parentElement.offsetHeight;
            
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const yPos = (scrolled - sectionTop) * 0.3;
                parallaxBg.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // Counter animation for stats
    const statValues = document.querySelectorAll('.stat-value, .stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element) {
        const text = element.textContent;
        const hasPercent = text.includes('%');
        const hasKm = text.includes('км');
        const hasMin = text.includes('мин');
        const hasM = text.includes('м');
        
        let number = parseFloat(text.replace(/[^0-9.-]/g, ''));
        if (isNaN(number)) return;
        
        const duration = 2000;
        const steps = 60;
        const increment = number / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            let displayValue = Math.floor(current);
            if (hasPercent) displayValue += '%';
            if (hasKm) displayValue += ' км';
            if (hasMin) displayValue += ' мин';
            if (hasM) displayValue += ' м';
            
            element.textContent = displayValue;
        }, duration / steps);
    }

    console.log('Luxury Resort & SPA - Ready');
});
