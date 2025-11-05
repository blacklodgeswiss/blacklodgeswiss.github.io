/**
 * Main Application Entry Point
 * Handles component initialization and legacy compatibility
 */

// Initialize components when app is ready
window.addEventListener('appReady', () => {
    console.log('🎉 Blacklodge App is ready!');
    initializePageComponents();
});

/**
 * Initialize page-specific components
 */
function initializePageComponents() {
    const app = window.BlacklodgeApp;
    
    if (!app.isReady()) {
        console.warn('App not ready yet, waiting...');
        return;
    }

    // Initialize page components based on current page
    const currentPage = document.documentElement.getAttribute('data-page') || 'home';
    
    // Initialize and render Navigation (for all pages)
    initializeNavigation(app, currentPage);
    
    if (currentPage === 'home') {
        initializeHomePageComponents(app);
    } else if (currentPage === 'contact') {
        initializeContactPageComponents(app);
    }
    
    // Initialize Instagram feed for all pages that have it
    initializeInstagramFeed();
    
    // Initialize legacy features
    initializeLegacyFeatures();
}

/**
 * Initialize and render Navigation component
 * @param {AppController} app - App controller instance
 * @param {string} currentPage - Current page identifier
 */
function initializeNavigation(app, currentPage) {
    const navigation = app.getComponent('navigation');
    const navigationContainer = document.getElementById('navigation-root');
    
    if (navigation && navigationContainer) {
        const navigationHTML = navigation.render({ currentPage });
        navigationContainer.innerHTML = navigationHTML;
        navigation.init();
        console.log('🧭 Navigation component rendered');
    }
}

/**
 * Initialize contact page specific components
 * @param {AppController} app - App controller instance
 */
function initializeContactPageComponents(app) {
    const i18n = app.i18n;
    
    // Initialize and render Footer
    if (window.FooterComponent) {
        const footerContainer = document.getElementById('footer-root');
        if (footerContainer) {
            const footer = new FooterComponent(i18n);
            footer.render(footerContainer);
            app.components.set('footer', footer);
        }
    }
    
    console.log('📞 Contact page components initialized');
}

/**
 * Initialize home page specific components
 * @param {AppController} app - App controller instance
 */
function initializeHomePageComponents(app) {
    const i18n = app.i18n;
    
    // Initialize and render Hero Section
    if (window.HeroSection) {
        const heroContainer = document.getElementById('hero-section');
        if (heroContainer) {
            const heroSection = new HeroSection(i18n);
            heroSection.render(heroContainer);
            app.components.set('heroSection', heroSection);
        }
    }
    
    // Initialize and render Services Section
    if (window.ServicesSection) {
        const servicesContainer = document.getElementById('services-section');
        if (servicesContainer) {
            const servicesSection = new ServicesSection(i18n);
            servicesSection.render(servicesContainer);
            app.components.set('servicesSection', servicesSection);
        }
    }
    
    // Initialize and render Catalog Section
    if (window.CatalogSection) {
        const catalogContainer = document.getElementById('catalog-section');
        if (catalogContainer) {
            const catalogSection = new CatalogSection(i18n);
            catalogSection.render(catalogContainer);
            app.components.set('catalogSection', catalogSection);
        }
    }
    
    // Initialize and render Footer
    if (window.FooterComponent) {
        const footerContainer = document.getElementById('footer-root');
        if (footerContainer) {
            const footer = new FooterComponent(i18n);
            footer.render(footerContainer);
            app.components.set('footer', footer);
        }
    }
    
    console.log('🏠 Home page components initialized');
}

/**
 * Initialize Instagram feed (legacy)
 */
function initializeInstagramFeed() {
    const instagramFeed = document.getElementById('instagram-feed');
    
    if (instagramFeed) {
        // Placeholder images - replace with actual Instagram API integration
        const placeholderPosts = [
            { id: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', alt: 'Cocktail Event 1' },
            { id: 2, image: 'https://images.unsplash.com/photo-1587223075055-82e0a937ddff?w=400', alt: 'Bar Setup 1' },
            { id: 3, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400', alt: '360 Booth in Action' },
            { id: 4, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400', alt: 'Event Entertainment' },
            { id: 5, image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400', alt: 'Cocktail Close-up' },
            { id: 6, image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400', alt: 'Wedding Bar Setup' },
            { id: 7, image: 'https://images.unsplash.com/photo-1574391884720-bbc3278394db?w=400', alt: 'Party Atmosphere' },
            { id: 8, image: 'https://images.unsplash.com/photo-1502741126161-b048400d085d?w=400', alt: 'Professional Bartending' }
        ];
        
        // Create Instagram posts
        placeholderPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'relative group overflow-hidden rounded-lg aspect-square bg-gray-200 cursor-pointer';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.alt}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                        <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                </div>
            `;
            
            // Add click event to open Instagram
            postElement.addEventListener('click', () => {
                window.open('https://www.instagram.com/_the.black.lodge_/', '_blank');
            });
            
            instagramFeed.appendChild(postElement);
        });
        
        console.log('📸 Instagram feed initialized');
    }
}

/**
 * Initialize legacy features and compatibility
 */
function initializeLegacyFeatures() {
    // Contact form handling (for contact page)
    initializeContactForm();
    
    // Header scroll effect
    initializeHeaderScrollEffect();
    
    console.log('🔗 Legacy features initialized');
}

/**
 * Initialize contact form functionality with EmailJS and spam protection
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Initialize EmailJS if not already done
        if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG?.publicKey) {
            emailjs.init(window.EMAILJS_CONFIG.publicKey);
        }
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                if (key === 'services[]') {
                    if (!data.services) data.services = [];
                    data.services.push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // SPAM PROTECTION: Check honeypot field
            if (data.website_url && data.website_url.trim() !== '') {
                console.log('🚫 Spam detected - honeypot field filled');
                // Silent fail for spam
                contactForm.reset();
                return;
            }
            
            // SPAM PROTECTION: Check rate limiting
            if (window.BlacklodgeRateLimiter && !window.BlacklodgeRateLimiter.canSubmit()) {
                const nextAllowed = window.BlacklodgeRateLimiter.getNextAllowedTime();
                const waitTime = Math.ceil((nextAllowed - new Date()) / (1000 * 60)); // minutes
                alert(`Bitte warten Sie ${waitTime} Minuten vor der nächsten Anfrage.`);
                return;
            }
            
            // Basic validation
            if (!data.vorname || !data.nachname || !data.email) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            if (!data.datenschutz) {
                alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;
            
            try {
                // Send email via EmailJS (preferred) or fallback to Formspree
                if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG?.serviceId) {
                    await sendViaEmailJS(data);
                } else {
                    await sendViaFormspree(data);
                }
                
                // Record successful submission for rate limiting
                if (window.BlacklodgeRateLimiter) {
                    window.BlacklodgeRateLimiter.recordSubmission();
                }
                
                alert('Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.');
                contactForm.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail oder Telefon.');
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
}

/**
 * Send email via EmailJS
 * @param {Object} data - Form data
 */
async function sendViaEmailJS(data) {
    const templateParams = {
        from_name: `${data.vorname} ${data.nachname}`,
        from_email: data.email,
        phone: data.phone || 'Nicht angegeben',
        event_type: data.event_type || 'Nicht angegeben',
        event_date: data.event_date || 'Nicht angegeben',
        location: data.location || 'Nicht angegeben',
        guests: data.guests || 'Nicht angegeben',
        services: data.services ? data.services.join(', ') : 'Keine ausgewählt',
        budget: data.budget || 'Nicht angegeben',
        message: data.message || 'Keine zusätzlichen Informationen',
        reply_to: data.email
    };
    
    const config = window.EMAILJS_CONFIG;
    const result = await emailjs.send(config.serviceId, config.templateId, templateParams);
    
    if (result.status !== 200) {
        throw new Error('EmailJS failed');
    }
    
    console.log('✅ Email sent via EmailJS:', result);
}

/**
 * Fallback: Send email via Formspree
 * @param {Object} data - Form data
 */
async function sendViaFormspree(data) {
    const formspreeEndpoint = window.BLACKLODGE_CONFIG?.contact?.formspreeEndpoint || 'https://formspree.io/f/xpwwqbjy';
    const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: `${data.vorname} ${data.nachname}`,
            email: data.email,
            phone: data.phone || 'Nicht angegeben',
            event_type: data.event_type || 'Nicht angegeben',
            event_date: data.event_date || 'Nicht angegeben',
            location: data.location || 'Nicht angegeben',
            guests: data.guests || 'Nicht angegeben',
            services: data.services ? data.services.join(', ') : 'Keine ausgewählt',
            budget: data.budget || 'Nicht angegeben',
            message: data.message || 'Keine zusätzlichen Informationen',
            _subject: `Neue Anfrage von ${data.vorname} ${data.nachname}`,
            _replyto: data.email
        })
    });

    if (!response.ok) {
        throw new Error('Formspree submission failed');
    }
    
    console.log('✅ Email sent via Formspree fallback');
}

/**
 * Initialize header scroll effects
 */
function initializeHeaderScrollEffect() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('bg-white/95');
            } else {
                header.classList.remove('bg-white/95');
            }
        }
    });
}

// Fallback: Initialize if app is already ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for the app to initialize, then check
    setTimeout(() => {
        if (window.BlacklodgeApp && window.BlacklodgeApp.isReady()) {
            initializePageComponents();
        }
    }, 100);
});