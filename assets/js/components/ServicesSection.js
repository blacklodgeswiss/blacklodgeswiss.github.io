/**
 * Services Section Component
 * Displays the three main services in a card layout
 * 
 * @class ServicesSection
 */
class ServicesSection {
    constructor(i18n) {
        this.i18n = i18n;
        this.container = null;
    }

    /**
     * Render the services section
     * @param {HTMLElement} container - Container element to render into
     */
    render(container) {
        this.container = container;
        
        const servicesHTML = `
            <section id="services" class="py-20 bg-gray-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="text-center mb-16">
                        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-i18n="services.title">Unsere Services</h2>
                        <p class="text-lg text-gray-600 max-w-2xl mx-auto" data-i18n="services.subtitle">Drei einzigartige Erlebnisse für Ihr Event</p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        ${this.renderServiceCard('cocktail')}
                        ${this.renderServiceCard('booth')}
                        ${this.renderServiceCard('entertainment')}
                    </div>
                </div>
            </section>
        `;
        
        container.innerHTML = servicesHTML;
        this.addScrollAnimations();
    }

    /**
     * Render individual service card
     * @param {string} serviceType - Type of service (cocktail, booth, entertainment)
     * @returns {string} HTML string for the service card
     */
    renderServiceCard(serviceType) {
        const serviceConfig = {
            cocktail: {
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>`,
                features: [
                    '• Flexible Gästezahl',
                    '• Komplette Ausstattung', 
                    '• Individuelle Packages',
                    '• Schweizweite Anfahrt'
                ]
            },
            booth: {
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>`,
                features: [
                    '• Schneller Aufbau',
                    '• Professionelle Betreuung',
                    '• Sofort-Sharing',
                    '• Custom Branding'
                ]
            },
            entertainment: {
                icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>`,
                features: [
                    '• Professionelle DJs',
                    '• LED-Screens verfügbar',
                    '• Tanzchoreographie',
                    '• Individuelle Playlist'
                ]
            }
        };

        const config = serviceConfig[serviceType];
        
        return `
            <div class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 card-hover">
                <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <svg class="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        ${config.icon}
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-4" data-i18n="services.${serviceType}.title">
                    ${this.getDefaultTitle(serviceType)}
                </h3>
                <p class="text-gray-600 mb-6" data-i18n="services.${serviceType}.description">
                    ${this.getDefaultDescription(serviceType)}
                </p>
                <ul class="space-y-2 text-sm text-gray-500">
                    ${config.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    /**
     * Get default title for service type
     * @param {string} serviceType - Service type
     * @returns {string} Default title
     */
    getDefaultTitle(serviceType) {
        const titles = {
            cocktail: 'Cocktail & Bar Service',
            booth: '360° Booth & PhotoBooth', 
            entertainment: 'Event Entertainment'
        };
        return titles[serviceType] || '';
    }

    /**
     * Get default description for service type
     * @param {string} serviceType - Service type
     * @returns {string} Default description
     */
    getDefaultDescription(serviceType) {
        const descriptions = {
            cocktail: 'Mobile Premium-Bar mit professionellen Barkeepern und hochwertigen Spirituosen für Ihr Event.',
            booth: 'Innovative Videotechnologie für spektakuläre 360°-Aufnahmen und klassische PhotoBooth-Erinnerungen.',
            entertainment: 'Komplette Unterhaltung mit DJs, LED-Screens und choreographiertem Entertainment für Ihr Event.'
        };
        return descriptions[serviceType] || '';
    }

    /**
     * Add scroll animations to service cards
     */
    addScrollAnimations() {
        const cards = this.container.querySelectorAll('.card-hover');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-fade-in');
                        observer.unobserve(entry.target);
                    }, index * 200); // Staggered animation
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Handle language changes
     * @param {string} newLanguage - New language code
     */
    onLanguageChange(newLanguage) {
        if (this.i18n && this.container) {
            this.i18n.translateElement(this.container);
        }
    }

    /**
     * Destroy component
     */
    destroy() {
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

// Export for global usage
window.ServicesSection = ServicesSection;