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
    
    // Initialize contact form first
    initializeContactForm();
    
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
        const servicesContainer = document.getElementById('services');
        if (servicesContainer) {
            const servicesSection = new ServicesSection(i18n);
            servicesSection.render(servicesContainer);
            app.components.set('servicesSection', servicesSection);
        }
    }
    
    // Initialize and render Catalog Section
    if (window.CatalogSection) {
        const catalogContainer = document.getElementById('katalog');
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
    // Header scroll effect
    initializeHeaderScrollEffect();
    
    // Contact form only initialized on contact page now
    console.log('🔗 Legacy features initialized');
}

// Global variable to prevent duplicate initialization
let contactFormInitialized = false;

/**
 * Initialize contact form functionality with EmailJS and spam protection
 */
function initializeContactForm() {
    // Global check first
    if (contactFormInitialized) {
        console.log('⚠️ Contact form already initialized globally, skipping...');
        return;
    }
    
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        return;
    }
    
    // Initialize EmailJS if not already done
    if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG?.publicKey) {
        emailjs.init(window.EMAILJS_CONFIG.publicKey);
    }
    
    // Set global flag
    contactFormInitialized = true;
    
    console.log('✅ Initializing contact form (first time)...');
    
    // Add event listener to the form
    contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            console.log('🎯 Form submission started from:', this.id);
            console.log('🔍 Form element details:', {
                id: this.id,
                action: this.action,
                method: this.method,
                elements: this.elements.length
            });
            
            // Get i18n for messages - try multiple sources
            const i18n = window.BlacklodgeApp?.i18n || window.i18n;
            
            // Prevent double submission with better logging
            if (this.submitting || this.dataset.submitting === 'true') {
                console.log('⚠️ DUPLICATE SUBMISSION BLOCKED - Form is already being submitted');
                if (i18n && typeof i18n.t === 'function') {
                    alert(i18n.t('messages.duplicate_submission'));
                } else {
                    alert('Form is already being submitted, please wait...');
                }
                return;
            }
            
            console.log('📧 Starting form submission...');
            this.submitting = true;
            this.dataset.submitting = 'true';
            
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
            
            // Debug: Log form data to see what we're getting
            console.log('📝 Form data collected:', {
                first_name: data.first_name || 'EMPTY',
                last_name: data.last_name || 'EMPTY', 
                email: data.email || 'EMPTY',
                datenschutz: data.datenschutz || 'UNCHECKED',
                allKeys: Object.keys(data)
            });
            
            // SPAM PROTECTION: Check honeypot field
            if (data.website_url && data.website_url.trim() !== '') {
                console.log('🚫 Spam detected - honeypot field filled');
                // Silent fail for spam
                contactForm.reset();
                return;
            }
            
            // SPAM PROTECTION: Rate limiting happens after successful send
            
            // Basic validation
            if (!data.first_name || !data.last_name || !data.email) {
                console.error('❌ Validation failed. Missing fields:', {
                    first_name: data.first_name ? '✅' : '❌ MISSING',
                    last_name: data.last_name ? '✅' : '❌ MISSING',
                    email: data.email ? '✅' : '❌ MISSING'
                });
                const message = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.required_fields') : 'Please fill in all required fields.';
                alert(message);
                return;
            }
            
            if (!data.datenschutz) {
                console.error('❌ Privacy checkbox not checked:', data.datenschutz);
                const message = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.privacy_required') : 'Please accept the privacy policy.';
                alert(message);
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                const message = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.invalid_email') : 'Please enter a valid email address.';
                alert(message);
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const sendingText = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.sending') : 'Sending...';
            submitButton.textContent = sendingText;
            submitButton.disabled = true;
            
            try {
                // Send email via EmailJS
                if (typeof emailjs !== 'undefined' && window.EMAILJS_CONFIG && isEmailJSConfigured()) {
                    console.log('📧 Using EmailJS for form submission');
                    await sendViaEmailJS(data);
                    
                    // ✅ Only record submission if EmailJS was successful
                    if (window.BlacklodgeRateLimiter) {
                        window.BlacklodgeRateLimiter.recordSubmission();
                        console.log('📊 Rate limiting: Successful submission recorded');
                    }
                    
                } else {
                    const message = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.emailjs_not_configured') : 'Email service not configured. Please contact us directly.';
                    throw new Error(message);
                }
                
                const successMessage = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.form_success') : 'Thank you for your inquiry! We will contact you within 24 hours.';
                alert(successMessage);
                contactForm.reset();
                
            } catch (error) {
                console.error('Error submitting form:', error);
                console.log('❌ Rate limiting: Failed submission NOT recorded');
                const errorMessage = (i18n && typeof i18n.t === 'function') ? i18n.t('messages.form_error') : 'There was an error sending your inquiry. Please try again or contact us directly via email or phone.';
                alert(errorMessage);
            } finally {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Reset submitting flags
                this.submitting = false;
                this.dataset.submitting = 'false';
                console.log('✅ Form submission completed, flags reset');
            }
        });
}

/**
 * Send email via EmailJS
 * @param {Object} data - Form data
 */
async function sendViaEmailJS(data) {
    const config = window.EMAILJS_CONFIG;
    
    // Template parameters for the main email (to you)
    const mainTemplateParams = {
        from_name: `${data.first_name} ${data.last_name}`,
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
    
    // Template parameters for auto-reply (to customer)
    // Based on your EmailJS template fields: from_name and email
    const autoReplyParams = {
        // Exact fields from your EmailJS auto-reply template
        from_name: `${data.first_name} ${data.last_name}`, // Kundenname
        email: data.email,  // Empfänger-E-Mail (Kunde)
        
        // Additional event details for confirmation message
        event_type: data.event_type || 'Ihr Anlass',
        event_date: data.event_date || 'dem gewünschten Datum',
        location: data.location || 'dem gewünschten Ort',
        services: data.services ? data.services.join(', ') : 'den gewünschten Services',
        phone: data.phone || 'Nicht angegeben',
        customer_name: data.first_name,
        
        // Company contact info
        company_name: 'Blacklodge',
        company_email: 'the.blacklodge@outlook.com',
        company_phone: '+41 79 778 48 61'
    };
    
    try {
        // Send main email to you
        console.log('📧 Sending main inquiry email...');
        const mainResult = await emailjs.send(config.serviceId, config.templateId, mainTemplateParams);
        
        if (mainResult.status !== 200) {
            throw new Error('Main email failed');
        }
        
        // Send auto-reply to customer (if auto-reply template is configured)
        if (config.autoReplyTemplateId) {
            console.log('📧 Sending auto-reply to customer...');
            console.log('🔍 Auto-reply parameters:', {
                reply_to: autoReplyParams.reply_to,
                to_email: autoReplyParams.to_email,
                to_name: autoReplyParams.to_name,
                templateId: config.autoReplyTemplateId
            });
            const autoReplyResult = await emailjs.send(config.serviceId, config.autoReplyTemplateId, autoReplyParams);
            
            if (autoReplyResult.status !== 200) {
                console.warn('⚠️ Auto-reply failed, but main email was sent successfully');
            } else {
                console.log('✅ Auto-reply sent to customer');
            }
        } else {
            console.log('ℹ️ No auto-reply template configured');
        }
        
        console.log('✅ Email sent via EmailJS:', mainResult);
        
    } catch (error) {
        console.error('❌ EmailJS sending failed:', error);
        throw error;
    }
}

/**
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