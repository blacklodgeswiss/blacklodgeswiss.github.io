/**
 * Application Controller
 * Manages all components and application state
 * 
 * @class AppController
 */
class AppController {
    constructor() {
        this.i18n = null;
        this.navigation = null;
        this.swissModal = null;
        this.components = new Map();
        this.isInitialized = false;
    }

    /**
     * Initialize the application
     * @param {Object} config - Application configuration
     */
    async init(config = {}) {
        try {
            console.log('🚀 Initializing Blacklodge Application...');
            
            // Initialize i18n system first
            await this.initI18n();
            
            // Initialize components
            await this.initComponents(config);
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            this.isInitialized = true;
            console.log('✅ Application initialized successfully');
            
            // Dispatch ready event
            window.dispatchEvent(new CustomEvent('appReady', {
                detail: { timestamp: Date.now() }
            }));
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.handleInitError(error);
        }
    }

    /**
     * Initialize internationalization system
     */
    async initI18n() {
        if (window.i18n) {
            this.i18n = window.i18n;
            // If not already initialized, initialize it
            if (!this.i18n.currentLanguage) {
                await this.i18n.init();
            }
            console.log('🌍 i18n system initialized');
        } else {
            throw new Error('i18n instance not found');
        }
    }

    /**
     * Initialize all components
     * @param {Object} config - Configuration object
     */
    async initComponents(config) {
        const { currentPage = 'home', enableSwissModal = true } = config;
        
        // Initialize Navigation
        if (window.NavigationComponent) {
            this.navigation = new NavigationComponent(this.i18n);
            this.components.set('navigation', this.navigation);
            console.log('🧭 Navigation component initialized');
        }
        
        // Initialize Swiss Language Modal (only if enabled and user is Swiss)
        if (enableSwissModal && window.SwissLanguageModal) {
            this.swissModal = new SwissLanguageModal(this.i18n);
            await this.swissModal.init();
            this.components.set('swissModal', this.swissModal);
            console.log('🇨🇭 Swiss Modal component initialized');
        }
        
        // Initialize other components based on page
        await this.initPageSpecificComponents(currentPage);
    }

    /**
     * Initialize components specific to current page
     * @param {string} currentPage - Current page identifier
     */
    async initPageSpecificComponents(currentPage) {
        switch (currentPage) {
            case 'home':
                await this.initHomeComponents();
                break;
            case 'contact':
                await this.initContactComponents();
                break;
            default:
                console.log(`📄 Page: ${currentPage}`);
        }
    }

    /**
     * Initialize home page components
     */
    async initHomeComponents() {
        console.log('🏠 Initializing home page components');
        
        // Initialize smooth scrolling for anchor links
        this.setupSmoothScrolling();
        
        // Initialize intersection observer for animations
        this.setupScrollAnimations();
        
        // The actual component rendering is handled by main.js
        // after the app is ready to ensure proper initialization order
    }

    /**
     * Initialize contact page components
     */
    async initContactComponents() {
        console.log('📞 Initializing contact page components');
        
        // Initialize contact form (if component exists)
        if (window.ContactForm) {
            const contactForm = new ContactForm(this.i18n);
            this.components.set('contactForm', contactForm);
        }
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }

    /**
     * Setup scroll animations with Intersection Observer
     */
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and cards
        const elementsToAnimate = document.querySelectorAll('section, .card-hover');
        elementsToAnimate.forEach(el => observer.observe(el));
    }

    /**
     * Setup global event listeners
     */
    setupGlobalEvents() {
        // Language change events
        window.addEventListener('languageChanged', (e) => {
            console.log('🌍 Language changed to:', e.detail.language);
            this.handleLanguageChange(e.detail.language);
        });

        // Swiss language selection events
        window.addEventListener('swissLanguageSelected', (e) => {
            console.log('🇨🇭 Swiss user selected language:', e.detail.language);
            this.handleSwissLanguageSelection(e.detail);
        });

        // Window resize events (debounced)
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleWindowResize();
            }, 250);
        });

        // Error handling
        window.addEventListener('error', (e) => {
            this.handleGlobalError(e);
        });

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            this.handleUnhandledRejection(e);
        });
    }

    /**
     * Handle language changes
     * @param {string} newLanguage - New language code
     */
    handleLanguageChange(newLanguage) {
        // Update all components that need language updates
        this.components.forEach((component, name) => {
            if (component.onLanguageChange) {
                component.onLanguageChange(newLanguage);
            }
        });

        // Update page meta information
        this.updatePageMeta(newLanguage);
    }

    /**
     * Handle Swiss language selection
     * @param {Object} data - Selection data
     */
    handleSwissLanguageSelection(data) {
        // Could send analytics, update preferences, etc.
        if (window.gtag) {
            gtag('event', 'swiss_language_selected', {
                event_category: 'User Interaction',
                event_label: data.language,
                value: 1
            });
        }
    }

    /**
     * Handle window resize
     */
    handleWindowResize() {
        // Close mobile menus on resize to desktop
        if (window.innerWidth >= 768) {
            this.components.forEach(component => {
                if (component.closeMobileMenu) {
                    component.closeMobileMenu();
                }
            });
        }
    }

    /**
     * Update page meta information
     * @param {string} language - Current language
     */
    updatePageMeta(language) {
        if (this.i18n && this.i18n.translations[language]) {
            const meta = this.i18n.translations[language].meta;
            if (meta) {
                document.title = meta.title;
                
                const description = document.querySelector('meta[name="description"]');
                if (description && meta.description) {
                    description.setAttribute('content', meta.description);
                }
            }
        }
    }

    /**
     * Handle initialization errors
     * @param {Error} error - The error that occurred
     */
    handleInitError(error) {
        // Show user-friendly error message
        console.error('Application failed to initialize:', error);
        
        // Could show a fallback UI or reload the page
        if (error.message.includes('translation') || error.message.includes('i18n')) {
            // Translation error - continue with default language
            console.warn('Continuing with default language due to translation error');
        } else {
            // More serious error - might want to reload
            setTimeout(() => {
                if (confirm('Die Anwendung konnte nicht geladen werden. Seite neu laden?')) {
                    window.location.reload();
                }
            }, 1000);
        }
    }

    /**
     * Handle global errors
     * @param {ErrorEvent} event - Error event
     */
    handleGlobalError(event) {
        console.error('Global error:', event.error);
        
        // Could send to error reporting service
        if (window.Sentry) {
            Sentry.captureException(event.error);
        }
    }

    /**
     * Handle unhandled promise rejections
     * @param {PromiseRejectionEvent} event - Promise rejection event
     */
    handleUnhandledRejection(event) {
        console.error('Unhandled promise rejection:', event.reason);
        event.preventDefault(); // Prevent default browser behavior
        
        // Could send to error reporting service
        if (window.Sentry) {
            Sentry.captureException(event.reason);
        }
    }

    /**
     * Get component instance
     * @param {string} name - Component name
     * @returns {Object|null} Component instance
     */
    getComponent(name) {
        return this.components.get(name) || null;
    }

    /**
     * Check if app is ready
     * @returns {boolean} Whether app is initialized
     */
    isReady() {
        return this.isInitialized;
    }

    /**
     * Destroy app and cleanup
     */
    destroy() {
        // Cleanup all components
        this.components.forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        this.components.clear();
        this.isInitialized = false;
        
        console.log('🧹 Application destroyed and cleaned up');
    }
}

// Create global app instance
window.BlacklodgeApp = new AppController();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Get page configuration from data attributes or meta tags
    const pageConfig = {
        currentPage: document.documentElement.getAttribute('data-page') || 'home',
        enableSwissModal: document.documentElement.getAttribute('data-swiss-modal') !== 'false'
    };
    
    // Initialize app
    window.BlacklodgeApp.init(pageConfig);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
}