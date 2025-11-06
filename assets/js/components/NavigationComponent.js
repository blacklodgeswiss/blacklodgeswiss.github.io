/**
 * Navigation Component
 * Handles main navigation, mobile menu, and language switcher
 * 
 * @class NavigationComponent
 */
class NavigationComponent {
    constructor(i18nInstance) {
        this.i18n = i18nInstance;
        this.isMobileMenuOpen = false;
        this.isLanguageDropdownOpen = false;
    }

    /**
     * Render the complete navigation component
     * @param {Object} options - Navigation options
     * @returns {string} HTML string for navigation
     */
    render(options = {}) {
        const {
            currentPage = 'home',
            logoSrc = 'assets/images/logo.png',
            logoAlt = 'Blacklodge Logo'
        } = options;

        return `
            <nav class="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 sticky top-0 z-40">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <!-- Logo -->
                        <div class="flex-shrink-0 flex items-center">
                            <a href="index.html" class="flex items-center group">
                                <img class="h-8 w-auto transition-transform group-hover:scale-105" src="${logoSrc}" alt="${logoAlt}">
                                <span class="ml-2 text-xl font-bold text-gray-900 hidden sm:block">Blacklodge</span>
                            </a>
                        </div>
                        
                        <!-- Desktop Navigation -->
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline space-x-8">
                                ${this.renderNavLinks(currentPage)}
                            </div>
                        </div>
                        
                        <!-- Desktop Language Switcher & Mobile Menu Button -->
                        <div class="flex items-center space-x-4">
                            ${this.renderLanguageSwitcher('desktop')}
                            ${this.renderMobileMenuButton()}
                        </div>
                    </div>
                </div>
                
                <!-- Mobile Navigation -->
                ${this.renderMobileMenu(currentPage)}
            </nav>
        `;
    }

    /**
     * Render navigation links
     * @param {string} currentPage - Current active page
     * @returns {string} HTML for navigation links
     */
    renderNavLinks(currentPage) {
        const links = [
            { key: 'home', href: 'index.html', i18nKey: 'navigation.home' },
            { key: 'services', href: 'index.html#services', i18nKey: 'navigation.services' },
            { key: 'catalog', href: 'index.html#katalog', i18nKey: 'navigation.catalog' },
            { key: 'social', href: 'index.html#social', i18nKey: 'navigation.social' },
            { key: 'contact', href: 'kontakt.html', i18nKey: 'navigation.contact', isButton: true }
        ];

        return links.map(link => {
            const isActive = currentPage === link.key;
            const baseClasses = 'px-3 py-2 text-sm font-medium transition-colors duration-200';
            
            let classes;
            if (link.isButton) {
                classes = `${baseClasses} bg-amber-600 text-white rounded-full hover:bg-amber-700 transform hover:scale-105`;
            } else if (isActive) {
                classes = `${baseClasses} text-amber-600 border-b-2 border-amber-600`;
            } else {
                classes = `${baseClasses} text-gray-700 hover:text-amber-600`;
            }

            return `
                <a href="${link.href}" 
                   class="${classes}" 
                   data-i18n="${link.i18nKey}"
                   ${isActive ? 'aria-current="page"' : ''}>
                    ${this.getDefaultText(link.i18nKey)}
                </a>
            `;
        }).join('');
    }

    /**
     * Render language switcher for desktop or mobile
     * @param {string} type - 'desktop' or 'mobile'
     * @returns {string} HTML for language switcher
     */
    renderLanguageSwitcher(type) {
        const isDesktop = type === 'desktop';
        const containerClasses = isDesktop ? 'hidden md:block relative' : 'relative md:hidden';
        const buttonClasses = isDesktop 
            ? 'language-toggle flex items-center text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none'
            : 'language-toggle flex items-center text-gray-700 hover:text-amber-600 p-2 text-sm font-medium transition-colors focus:outline-none';
        const dropdownClasses = isDesktop 
            ? 'language-dropdown hidden absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50'
            : 'language-dropdown hidden absolute right-0 mt-2 w-20 bg-white rounded-lg shadow-lg border border-gray-200 z-50';

        return `
            <div class="${containerClasses}">
                <button class="${buttonClasses}">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                    </svg>
                    <span class="current-language font-semibold">DE</span>
                    <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="${dropdownClasses}">
                    ${this.renderLanguageOptions(isDesktop)}
                </div>
            </div>
        `;
    }

    /**
     * Render language options
     * @param {boolean} isDesktop - Whether this is for desktop
     * @returns {string} HTML for language options
     */
    renderLanguageOptions(isDesktop) {
        const languages = [
            { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
            { code: 'en', flag: '🇬🇧', name: 'English' },
            { code: 'fr', flag: '🇫🇷', name: 'Français' },
            { code: 'ch', flag: '🇨🇭', name: 'Schwiizerdütsch' }
        ];

        return languages.map((lang, index) => {
            const isFirst = index === 0;
            const isLast = index === languages.length - 1;
            const roundedClasses = isFirst ? 'rounded-t-lg' : isLast ? 'rounded-b-lg' : '';
            
            if (isDesktop) {
                return `
                    <a href="#" class="language-btn flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 ${roundedClasses}" data-lang="${lang.code}">
                        <span class="mr-2">${lang.flag}</span>
                        <span class="hidden sm:inline">${lang.name}</span>
                        <span class="sm:hidden">${lang.code.toUpperCase()}</span>
                    </a>
                `;
            } else {
                return `
                    <a href="#" class="language-btn block px-2 py-2 text-xs text-gray-700 hover:bg-gray-100 ${roundedClasses}" data-lang="${lang.code}">
                        ${lang.flag} ${lang.code.toUpperCase()}
                    </a>
                `;
            }
        }).join('');
    }

    /**
     * Render mobile menu button
     * @returns {string} HTML for mobile menu button
     */
    renderMobileMenuButton() {
        return `
            <div class="md:hidden">
                <button type="button" 
                        class="mobile-menu-button bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-amber-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500 transition-colors" 
                        aria-controls="mobile-menu" 
                        aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        `;
    }

    /**
     * Render mobile menu
     * @param {string} currentPage - Current active page
     * @returns {string} HTML for mobile menu
     */
    renderMobileMenu(currentPage) {
        return `
            <div class="mobile-menu hidden md:hidden bg-white border-t border-gray-200 shadow-lg">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    ${this.renderMobileNavLinks(currentPage)}
                </div>
                <div class="pt-4 pb-3 border-t border-gray-200">
                    <div class="px-2">
                        ${this.renderLanguageSwitcher('mobile')}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render mobile navigation links
     * @param {string} currentPage - Current active page
     * @returns {string} HTML for mobile navigation links
     */
    renderMobileNavLinks(currentPage) {
        const links = [
            { key: 'home', href: 'index.html', i18nKey: 'navigation.home' },
            { key: 'services', href: 'index.html#services', i18nKey: 'navigation.services' },
            { key: 'catalog', href: 'index.html#katalog', i18nKey: 'navigation.catalog' },
            { key: 'social', href: 'index.html#social', i18nKey: 'navigation.social' },
            { key: 'contact', href: 'kontakt.html', i18nKey: 'navigation.contact' }
        ];

        return links.map(link => {
            const isActive = currentPage === link.key;
            const classes = isActive 
                ? 'text-amber-600 bg-amber-50 block px-3 py-2 rounded-md text-base font-medium border-l-4 border-amber-600'
                : 'text-gray-700 hover:text-amber-600 hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors';

            return `
                <a href="${link.href}" 
                   class="${classes}" 
                   data-i18n="${link.i18nKey}"
                   ${isActive ? 'aria-current="page"' : ''}>
                    ${this.getDefaultText(link.i18nKey)}
                </a>
            `;
        }).join('');
    }

    /**
     * Initialize navigation component with event listeners
     */
    init() {
        this.attachEventListeners();
        
        // Listen for language changes
        window.addEventListener('languageChanged', () => {
            this.updateLanguageDisplay();
        });
    }

    /**
     * Attach event listeners to navigation elements
     */
    attachEventListeners() {
        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mobile-menu-button')) {
                this.toggleMobileMenu();
            }
        });

        // Language switcher toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.language-toggle')) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleLanguageDropdown();
            }
        });

        // Language selection
        document.addEventListener('click', (e) => {
            const languageBtn = e.target.closest('.language-btn');
            if (languageBtn) {
                e.preventDefault();
                const targetLang = languageBtn.getAttribute('data-lang');
                if (targetLang && this.i18n) {
                    this.i18n.switchLanguage(targetLang);
                }
                this.closeLanguageDropdown();
            }
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-toggle') && !e.target.closest('.language-dropdown')) {
                this.closeLanguageDropdown();
            }
        });

        // Close mobile menu when clicking nav links
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mobile-menu a')) {
                this.closeMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu
     */
    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            mobileMenu.classList.toggle('hidden', !this.isMobileMenuOpen);
        }
    }

    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            this.isMobileMenuOpen = false;
            mobileMenu.classList.add('hidden');
        }
    }

    /**
     * Toggle language dropdown
     */
    toggleLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(dropdown => {
            this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
            dropdown.classList.toggle('hidden', !this.isLanguageDropdownOpen);
        });
    }

    /**
     * Close language dropdown
     */
    closeLanguageDropdown() {
        const dropdowns = document.querySelectorAll('.language-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('hidden');
        });
        this.isLanguageDropdownOpen = false;
    }

    /**
     * Update language display after language change
     */
    updateLanguageDisplay() {
        if (this.i18n) {
            const currentLang = this.i18n.getCurrentLanguage();
            const displays = document.querySelectorAll('.current-language');
            displays.forEach(display => {
                const displayText = currentLang === 'ch' ? 'CH' : currentLang.toUpperCase();
                display.textContent = displayText;
            });
        }
    }

    /**
     * Get default text for i18n key (fallback)
     * @param {string} key - i18n key
     * @returns {string} Default text
     */
    getDefaultText(key) {
        const defaults = {
            'navigation.home': 'Home',
            'navigation.services': 'Services',
            'navigation.catalog': 'Katalog',
            'navigation.social': 'Social Media',
            'navigation.contact': 'Kontakt'
        };
        return defaults[key] || key;
    }
}

// Export for use in other files
window.NavigationComponent = NavigationComponent;