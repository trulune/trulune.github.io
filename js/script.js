// Enhanced client-side functionality with all requested features
class TruPerfume {
    constructor() {
        this.init();
    }

    init() {
        this.initModal();
        this.initMobileMenu();
        this.initVerifiedBadge();
        this.initScrollEffects();
        this.initSmoothScroll();
        this.initBackToTop();
        this.initSocialSticky();
        this.initStickyHeader();
        this.initProductSlideshows();
    }

    // Sticky Header functionality
    initStickyHeader() {
        const header = document.querySelector('.site-header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Product Slideshow functionality
    initProductSlideshows() {
        const slideshowContainers = document.querySelectorAll('.slideshow-container');
        
        slideshowContainers.forEach(container => {
            const slides = container.querySelectorAll('.slide');
            const dots = container.querySelectorAll('.dot');
            const prevBtn = container.querySelector('.prev');
            const nextBtn = container.querySelector('.next');
            let currentSlide = 0;
            
            function showSlide(index) {
                // Hide all slides
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                // Show current slide
                slides[index].classList.add('active');
                dots[index].classList.add('active');
                currentSlide = index;
            }
            
            // Next slide
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    let nextIndex = (currentSlide + 1) % slides.length;
                    showSlide(nextIndex);
                });
            }
            
            // Previous slide
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                });
            }
            
            // Dot navigation
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    showSlide(index);
                });
            });
            
            // Auto-advance slides
            setInterval(() => {
                let nextIndex = (currentSlide + 1) % slides.length;
                showSlide(nextIndex);
            }, 5000);
        });
    }

    // Mobile Menu functionality
    initMobileMenu() {
        this.hamburger = document.querySelector('.hamburger-menu');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.mobileOverlay = document.querySelector('.mobile-menu-overlay');
        this.closeMobileMenu = document.querySelector('.close-mobile-menu');
        this.mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }
        if (this.closeMobileMenu) {
            this.closeMobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        }
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.toggleMobileMenu());
        }

        this.mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggleMobileMenu();
                // Smooth scroll after menu close
                setTimeout(() => {
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        const headerHeight = document.querySelector('.site-header').offsetHeight;
                        const targetPosition = target.offsetTop - headerHeight - 20;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            });
        });
    }

    toggleMobileMenu() {
        if (this.hamburger) this.hamburger.classList.toggle('active');
        if (this.mobileMenu) this.mobileMenu.classList.toggle('active');
        if (this.mobileOverlay) {
            this.mobileOverlay.style.display = this.mobileMenu.classList.contains('active') ? 'block' : 'none';
        }
        document.body.style.overflow = this.mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Verified Badge functionality
    initVerifiedBadge() {
        this.verifiedBadges = document.querySelectorAll('.verified-badge');
        this.tooltip = document.getElementById('verifiedTooltip');
        this.isTooltipVisible = false;

        this.verifiedBadges.forEach(badge => {
            badge.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showTooltip(e.target.closest('.verified-badge'));
            });
        });

        // Close tooltip when clicking outside
        document.addEventListener('click', () => {
            if (this.isTooltipVisible) {
                this.hideTooltip();
            }
        });

        // Close tooltip on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isTooltipVisible) {
                this.hideTooltip();
            }
        });
    }

    showTooltip(badge) {
        if (this.isTooltipVisible) {
            this.hideTooltip();
            return;
        }

        const rect = badge.getBoundingClientRect();
        this.tooltip.style.display = 'block';
        this.tooltip.style.top = (rect.bottom + 10) + 'px';
        this.tooltip.style.left = (rect.left - 100) + 'px';
        
        this.isTooltipVisible = true;
    }

    hideTooltip() {
        this.tooltip.style.display = 'none';
        this.isTooltipVisible = false;
    }

    // Social Sticky functionality
    initSocialSticky() {
        this.socialSticky = document.querySelector('.social-sticky');
        this.socialToggle = document.querySelector('.social-toggle');
        this.socialIcons = document.querySelector('.social-icons');

        if (this.socialSticky && this.socialIcons) {
            let hideTimeout;
            
            this.socialSticky.addEventListener('mouseenter', () => {
                clearTimeout(hideTimeout);
                this.socialIcons.style.display = 'flex';
            });

            this.socialSticky.addEventListener('mouseleave', () => {
                hideTimeout = setTimeout(() => {
                    this.socialIcons.style.display = 'none';
                }, 300);
            });

            // Touch support for mobile
            this.socialSticky.addEventListener('touchstart', () => {
                clearTimeout(hideTimeout);
                this.socialIcons.style.display = this.socialIcons.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }

    // Back to Top functionality
    initBackToTop() {
        this.backToTop = document.querySelector('.back-to-top');
        
        if (this.backToTop) {
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    this.backToTop.style.display = 'flex';
                } else {
                    this.backToTop.style.display = 'none';
                }
            });

            this.backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Modal functionality
    initModal() {
        this.modal = document.getElementById('quickViewModal');
        this.modalContent = document.getElementById('modalContent');
        this.closeBtn = document.querySelector('.close');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    showQuickView(productId) {
        const products = {
            2: {
                name: 'Ocean Mist',
                price: 'RM 159',
                description: 'Fresh aquatic notes with citrus top — day-ready and breezy.',
                notes: ['Top: Citrus, Sea Salt', 'Middle: Marine Accord, Lily', 'Base: Musk, Amberwood'],
                size: '100ml',
                whatsapp: 'https://wa.me/60123456789?text=I\'m%20interested%20in%20Ocean%20Mist%20perfume'
            },
            3: {
                name: 'Rose Noire',
                price: 'RM 199',
                description: 'Intense rose with patchouli — dramatic & sensual.',
                notes: ['Top: Black Currant, Saffron', 'Middle: Rose, Patchouli', 'Base: Leather, Vanilla'],
                size: '100ml',
                whatsapp: 'https://wa.me/60123456789?text=I\'m%20interested%20in%20Rose%20Noire%20perfume'
            }
        };

        const product = products[productId];
        if (!product) return;

        this.modalContent.innerHTML = `
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <p>${product.description}</p>
            <div class="product-details">
                <h4>Fragrance Notes:</h4>
                <ul>
                    ${product.notes.map(note => `<li>${note}</li>`).join('')}
                </ul>
                <p><strong>Size:</strong> ${product.size}</p>
            </div>
            <div class="modal-actions">
                <a href="${product.whatsapp}" class="btn-primary" target="_blank">Buy Now</a>
            </div>
        `;

        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // UI Effects
    initScrollEffects() {
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

        // Observe cards and sections
        document.querySelectorAll('.card, .section-title, .review-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.site-header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Initialize the application
const truPerfume = new TruPerfume();

// Global functions for HTML onclick attributes
function showQuickView(productId) {
    truPerfume.showQuickView(productId);
}