/**
 * LUXURY RESORT - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Loader
    const loader = document.querySelector('.loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    burgerMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        burgerMenu.classList.toggle('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
        });
    });

    // Hero slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        heroSlides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % heroSlides.length;
        heroSlides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 5000);

    // Reveal on scroll animation
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Show success message (in real app, send to server)
            alert('Спасибо за заявку! Наш менеджер свяжется с вами в ближайшее время.');
            
            // Reset form
            this.reset();
        });
    }

    // Parallax effect for territory and beach sections
    const parallaxSections = document.querySelectorAll('.territory-parallax, .beach-parallax');
    
    window.addEventListener('scroll', () => {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrolled > sectionTop - window.innerHeight && scrolled < sectionTop + sectionHeight) {
                const yPos = (scrolled - sectionTop) * 0.3;
                section.style.backgroundPositionY = `${yPos}px`;
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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

    // Counter animation for location values
    const locationValues = document.querySelectorAll('.location-value');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;
        
        const locationSection = document.querySelector('.location-section');
        const sectionTop = locationSection.offsetTop;
        const sectionHeight = locationSection.offsetHeight;
        
        if (window.pageYOffset >= sectionTop - window.innerHeight + 200 && 
            window.pageYOffset < sectionTop + sectionHeight) {
            
            counterAnimated = true;
            
            locationValues.forEach(value => {
                const text = value.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const unit = text.replace(/[0-9]/g, '');
                
                if (number) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            value.textContent = number + unit;
                            clearInterval(timer);
                        } else {
                            value.textContent = Math.floor(current) + unit;
                        }
                    }, 30);
                }
            });
        }
    }

    window.addEventListener('scroll', animateCounters);

    // Invest cards hover effect enhancement
    const investCards = document.querySelectorAll('.invest-card');
    
    investCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            investCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            investCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });

    console.log('Luxury Resort loaded successfully!');
});
