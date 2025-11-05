/**
 * Hero Section Component
 * Displays the main hero section with logo, title, and CTA buttons
 * 
 * @class HeroSection
 */
class HeroSection {
    constructor(i18n) {
        this.i18n = i18n;
        this.container = null;
    }

    /**
     * Render the hero section
     * @param {HTMLElement} container - Container element to render into
     */
    render(container) {
        this.container = container;
        
        const heroHTML = `
            <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                <div class="absolute inset-0 bg-black opacity-50"></div>
                <div class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
                    <img src="assets/images/logo.png" alt="Blacklodge Logo" class="mx-auto mb-8 h-24 w-auto animate-fade-in">
                    <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in" style="animation-delay: 0.2s;">
                        Blacklodge
                    </h1>
                    <p class="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed animate-fade-in" style="animation-delay: 0.4s;" data-i18n="hero.description">
                        Premium Event-Services für die Schweiz: Mobile Cocktailbar, 360° Booth & Event Entertainment
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style="animation-delay: 0.6s;">
                        <a href="kontakt.html" class="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105" data-i18n="hero.cta_primary">
                            Jetzt Anfrage starten
                        </a>
                        <a href="assets/images/catalog.pdf" target="_blank" class="inline-flex items-center px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300" data-i18n="hero.cta_secondary">
                            Katalog ansehen
                        </a>
                    </div>
                </div>
            </section>
        `;
        
        container.innerHTML = heroHTML;
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
window.HeroSection = HeroSection;