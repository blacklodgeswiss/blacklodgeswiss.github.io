// Internationalization System for Blacklodge Website
class I18n {
    constructor() {
        this.currentLanguage = null;
        this.translations = {};
        this.defaultLanguage = 'de';
        this.supportedLanguages = ['de', 'en', 'fr', 'ch'];
        this.fallbackLanguage = 'de';
        this.languageNames = {
            'de': 'Deutsch',
            'en': 'English', 
            'fr': 'Français',
            'ch': 'Schwiizerdütsch'
        };
    }

    // Initialize the internationalization system
    async init() {
        try {
            // Load translation files
            await this.loadTranslations();
            
            // Detect language from URL, localStorage, or browser
            const detectedLanguage = this.detectLanguage();
            
            // Set the detected language
            await this.setLanguage(detectedLanguage);
            
            // Update the language switcher UI
            this.updateLanguageSwitcher();
            
            console.log(`I18n initialized with language: ${this.currentLanguage}`);
        } catch (error) {
            console.error('Failed to initialize I18n:', error);
            // Fallback to default language
            this.currentLanguage = this.defaultLanguage;
        }
    }

    // Detect the user's preferred language
    detectLanguage() {
        // 1. Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.supportedLanguages.includes(urlLang)) {
            return urlLang;
        }

        // 2. Check localStorage
        const storedLang = localStorage.getItem('blacklodge-language');
        if (storedLang && this.supportedLanguages.includes(storedLang)) {
            return storedLang;
        }

        // 3. Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.supportedLanguages.includes(browserLang)) {
            return browserLang;
        }
        
        // 3.1 Special case: Swiss users might prefer Schweizerdeutsch
        const fullBrowserLang = navigator.language.toLowerCase();
        if (fullBrowserLang.includes('ch') || fullBrowserLang === 'de-ch') {
            return 'ch';
        }

        // 4. Fallback to default
        return this.defaultLanguage;
    }

    // Load translation files
    async loadTranslations() {
        const loadPromises = this.supportedLanguages.map(async (lang) => {
            try {
                const response = await fetch(`assets/i18n/${lang}.json`);
                if (!response.ok) {
                    throw new Error(`Failed to load ${lang}.json`);
                }
                const translations = await response.json();
                this.translations[lang] = translations;
            } catch (error) {
                console.error(`Error loading translations for ${lang}:`, error);
                // If it's the fallback language, create minimal translations
                if (lang === this.fallbackLanguage) {
                    this.translations[lang] = { error: 'Translation error' };
                }
            }
        });

        await Promise.all(loadPromises);
    }

    // Set the current language
    async setLanguage(language) {
        if (!this.supportedLanguages.includes(language)) {
            language = this.defaultLanguage;
        }

        this.currentLanguage = language;
        
        // Store in localStorage
        localStorage.setItem('blacklodge-language', language);
        
        // Update document language attribute
        document.documentElement.lang = language;
        
        // Apply translations
        this.applyTranslations();
        
        // Update URL without reload
        this.updateURL(language);
    }

    // Apply translations to the current page
    applyTranslations() {
        if (!this.translations[this.currentLanguage]) {
            console.warn(`No translations found for language: ${this.currentLanguage}`);
            return;
        }

        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                // Handle different content types
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    // For input and textarea elements, set placeholder
                    element.placeholder = translation;
                } else if (element.hasAttribute('title')) {
                    element.title = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update meta tags
        this.updateMetaTags();
    }

    // Get translation by key with fallback
    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        // Navigate through nested keys
        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                // Fallback to default language
                translation = this.translations[this.fallbackLanguage];
                for (const fk of keys) {
                    if (translation && typeof translation === 'object' && fk in translation) {
                        translation = translation[fk];
                    } else {
                        return key; // Return key if no translation found
                    }
                }
                break;
            }
        }
        
        return typeof translation === 'string' ? translation : key;
    }

    // Update meta tags for SEO
    updateMetaTags() {
        const currentTranslations = this.translations[this.currentLanguage];
        if (!currentTranslations || !currentTranslations.meta) return;

        const metaTags = {
            'description': currentTranslations.meta.description,
            'og:title': currentTranslations.meta.title,
            'og:description': currentTranslations.meta.description,
            'twitter:title': currentTranslations.meta.title,
            'twitter:description': currentTranslations.meta.description
        };

        Object.entries(metaTags).forEach(([name, content]) => {
            if (content) {
                let metaElement = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
                if (metaElement) {
                    metaElement.setAttribute('content', content);
                }
            }
        });

        // Update page title
        if (currentTranslations.meta && currentTranslations.meta.title) {
            document.title = currentTranslations.meta.title;
        }
    }

    // Update URL with language parameter
    updateURL(language) {
        const url = new URL(window.location);
        if (language === this.defaultLanguage) {
            url.searchParams.delete('lang');
        } else {
            url.searchParams.set('lang', language);
        }
        
        // Update URL without reload
        window.history.replaceState({}, '', url.toString());
    }

    // Update language switcher UI
    updateLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            if (btnLang === this.currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update current language display
        const currentLangDisplay = document.querySelectorAll('.current-language');
        currentLangDisplay.forEach(display => {
            const displayText = this.currentLanguage === 'ch' ? 'CH' : this.currentLanguage.toUpperCase();
            display.textContent = displayText;
        });
    }

    // Switch to a specific language
    async switchLanguage(language) {
        if (language !== this.currentLanguage && this.supportedLanguages.includes(language)) {
            await this.setLanguage(language);
            this.updateLanguageSwitcher();
            
            // Re-apply translations to ensure all elements are updated
            setTimeout(() => {
                this.applyTranslations();
            }, 50);
            
            // Trigger custom event for other components
            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { language: this.currentLanguage } 
            }));
        }
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Check if a language is supported
    isLanguageSupported(language) {
        return this.supportedLanguages.includes(language);
    }

    // Translate a specific element and its children
    translateElement(element) {
        if (!element) return;
        
        const elementsToTranslate = element.querySelectorAll('[data-i18n]');
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getTranslation(key);
            
            if (translation) {
                // Handle different content types
                if (el.tagName === 'INPUT' && el.type === 'submit') {
                    el.value = translation;
                } else if (el.hasAttribute('placeholder')) {
                    el.placeholder = translation;
                } else if (el.hasAttribute('title')) {
                    el.title = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });
    }
}

// Initialize global I18n instance
const i18n = new I18n();

// Auto-initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    await i18n.init();
    
    // Apply translations immediately after init
    setTimeout(() => {
        i18n.applyTranslations();
    }, 100);
    
    // Initialize Swiss Language Modal if SwissLanguageModal is available
    if (window.SwissLanguageModal) {
        const swissModal = new SwissLanguageModal(i18n);
        await swissModal.init();
    }
    
    // Setup language switcher event listeners
    document.addEventListener('click', (e) => {
        const languageBtn = e.target.closest('.language-btn');
        if (languageBtn) {
            e.preventDefault();
            const targetLang = languageBtn.getAttribute('data-lang');
            i18n.switchLanguage(targetLang);
        }
    });
    
    // Setup language dropdown toggle  
    document.addEventListener('click', (e) => {
        const langToggle = e.target.closest('.language-toggle');
        if (langToggle) {
            e.preventDefault();
            e.stopPropagation();
            const langDropdown = langToggle.parentElement.querySelector('.language-dropdown');
            if (langDropdown) {
                langDropdown.classList.toggle('hidden');
            }
        } else {
            // Close all language dropdowns when clicking outside
            document.querySelectorAll('.language-dropdown').forEach(dropdown => {
                dropdown.classList.add('hidden');
            });
        }
    });
});

// Export for use in other files
window.i18n = i18n;
window.I18n = I18n;