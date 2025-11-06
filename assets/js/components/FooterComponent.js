/**
 * Footer Component
 * Displays the website footer with navigation and social links
 * 
 * @class FooterComponent
 */
class FooterComponent {
    constructor(i18n) {
        this.i18n = i18n;
        this.container = null;
    }

    /**
     * Render the footer
     * @param {HTMLElement} container - Container element to render into
     */
    render(container) {
        this.container = container;
        
        const footerHTML = `
            <footer class="bg-gray-900 text-white py-12">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div class="col-span-1 md:col-span-2">
                            <img src="assets/images/logo.png" alt="Blacklodge Logo" class="h-12 mb-4">
                            <p class="text-gray-400 mb-4" data-i18n="footer.description">
                                Unvergessliche Momente, serviert in Style. Premium Event-Services für die Schweiz.
                            </p>
                            <div class="flex space-x-4">
                                <a href="https://www.instagram.com/_the.black.lodge_/" target="_blank" class="text-gray-400 hover:text-amber-500 transition-colors" aria-label="Instagram">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                                        <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                                        <circle cx="18.406" cy="5.594" r="1.44"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-4" data-i18n="footer.navigation_title">Navigation</h3>
                            <ul class="space-y-2">
                                <li><a href="#services" class="text-gray-400 hover:text-white transition-colors" data-i18n="navigation.services">Leistungen</a></li>
                                <li><a href="#katalog" class="text-gray-400 hover:text-white transition-colors" data-i18n="navigation.catalog">Katalog</a></li>
                                <li><a href="#instagram" class="text-gray-400 hover:text-white transition-colors" data-i18n="navigation.social">Social Media</a></li>
                                <li><a href="kontakt.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="navigation.contact">Kontakt</a></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="font-semibold mb-4" data-i18n="footer.legal_title">Rechtliches</h3>
                            <ul class="space-y-2">
                                <li><a href="impressum.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="footer.imprint">Impressum</a></li>
                                <li><a href="datenschutz.html" class="text-gray-400 hover:text-white transition-colors" data-i18n="footer.privacy">Datenschutz</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p class="text-gray-400" data-i18n="footer.copyright">© 2025 Blacklodge. Alle Rechte vorbehalten.</p>
                    </div>
                </div>
            </footer>
        `;
        
        container.innerHTML = footerHTML;
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
window.FooterComponent = FooterComponent;