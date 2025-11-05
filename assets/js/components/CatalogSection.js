/**
 * Catalog Section Component
 * Displays the catalog download section
 * 
 * @class CatalogSection
 */
class CatalogSection {
    constructor(i18n) {
        this.i18n = i18n;
        this.container = null;
    }

    /**
     * Render the catalog section
     * @param {HTMLElement} container - Container element to render into
     */
    render(container) {
        this.container = container;
        
        const catalogHTML = `
            <section id="katalog" class="py-20 bg-white">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8" data-i18n="catalog.title">Blacklodge Katalog 2025</h2>
                    <p class="text-lg text-gray-600 mb-10 max-w-2xl mx-auto" data-i18n="catalog.description">
                        Entdecken Sie alle unsere Services im Detail mit Preisen und Paketen für Ihr perfektes Event.
                    </p>
                    <a href="assets/images/catalog.pdf" target="_blank" class="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-all duration-300 transform hover:scale-105" data-i18n="catalog.download">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Katalog herunterladen
                    </a>
                </div>
            </section>
        `;
        
        container.innerHTML = catalogHTML;
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
window.CatalogSection = CatalogSection;