/**
 * Swiss Language Detection Modal Component
 * Detects Swiss users and offers language selection modal
 * 
 * @class SwissLanguageModal
 */
class SwissLanguageModal {
    constructor(i18nInstance) {
        this.i18n = i18nInstance;
        this.isSwissUser = false;
        this.modalShown = false;
        this.modalId = 'swiss-language-modal';
        
        // Swiss detection patterns
        this.swissIndicators = [
            'ch', 'schweiz', 'suisse', 'svizzera', 'switzerland'
        ];
    }

    /**
     * Initialize Swiss detection and modal system
     */
    async init() {
        // Check if user is likely from Switzerland
        this.detectSwissUser();
        
        // Create modal if Swiss user detected and modal not seen before
        if (this.isSwissUser && !this.hasSeenModal()) {
            // Wait a bit for i18n to be fully ready
            setTimeout(() => {
                this.createModal();
                this.showModal();
            }, 500);
        }
    }

    /**
     * Detect if user is likely from Switzerland
     */
    detectSwissUser() {
        // Check browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.includes('ch') || browserLang === 'de-ch') {
            this.isSwissUser = true;
            return;
        }

        // Check timezone (Swiss timezone)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (timezone === 'Europe/Zurich') {
            this.isSwissUser = true;
            return;
        }

        // Check URL parameters or referrer for Swiss domains
        const referrer = document.referrer.toLowerCase();
        const currentUrl = window.location.href.toLowerCase();
        
        if (this.swissIndicators.some(indicator => 
            referrer.includes(indicator) || currentUrl.includes(indicator))) {
            this.isSwissUser = true;
        }

        // For demo purposes, force Swiss detection (remove in production)
        // this.isSwissUser = true;
        
        console.log('Swiss user detection:', this.isSwissUser ? 'Swiss user detected' : 'Not Swiss user');
    }

    /**
     * Check if user has already seen the modal
     */
    hasSeenModal() {
        return localStorage.getItem('swiss-modal-seen') === 'true';
    }

    /**
     * Mark modal as seen
     */
    markModalSeen() {
        localStorage.setItem('swiss-modal-seen', 'true');
        this.modalShown = true;
    }

    /**
     * Create the language selection modal
     */
    createModal() {
        const modal = document.createElement('div');
        modal.id = this.modalId;
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 opacity-0 pointer-events-none transition-all duration-300';
        
        modal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl max-w-md mx-4 transform scale-95 transition-all duration-300" id="modal-content">
                <!-- Swiss Flag Header -->
                <div class="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl text-center">
                    <div class="text-4xl mb-2">🇨🇭</div>
                    <h2 class="text-xl font-bold" data-i18n="swiss_modal.greeting">Grüezi!</h2>
                    <p class="text-red-100 text-sm" data-i18n="swiss_modal.welcome">Willkommen bei Blacklodge</p>
                </div>
                
                <!-- Content -->
                <div class="p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3 text-center" data-i18n="swiss_modal.language_prompt">
                        Wählen Sie Ihre bevorzugte Sprache
                    </h3>
                    <p class="text-gray-600 text-sm text-center mb-6" data-i18n="swiss_modal.language_prompt_multi">
                        Choisissez votre langue préférée • Choose your preferred language
                    </p>
                    
                    <!-- Language Options -->
                    <div class="space-y-3">
                        <button class="language-option w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300" data-lang="ch">
                            <span class="text-2xl mr-3">🇨🇭</span>
                            <div class="text-left">
                                <div class="font-medium text-gray-900" data-i18n="swiss_modal.swiss_german">Schwiizerdütsch</div>
                                <div class="text-sm text-gray-500" data-i18n="swiss_modal.swiss_german_desc">Authentisches Schwiizerdütsch</div>
                            </div>
                        </button>
                        
                        <button class="language-option w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300" data-lang="de">
                            <span class="text-2xl mr-3">🇩🇪</span>
                            <div class="text-left">
                                <div class="font-medium text-gray-900" data-i18n="swiss_modal.german">Deutsch</div>
                                <div class="text-sm text-gray-500" data-i18n="swiss_modal.german_desc">Hochdeutsch</div>
                            </div>
                        </button>
                        
                        <button class="language-option w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300" data-lang="fr">
                            <span class="text-2xl mr-3">🇫🇷</span>
                            <div class="text-left">
                                <div class="font-medium text-gray-900" data-i18n="swiss_modal.french">Français</div>
                                <div class="text-sm text-gray-500" data-i18n="swiss_modal.french_desc">Langue française</div>
                            </div>
                        </button>
                        
                        <button class="language-option w-full flex items-center p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300" data-lang="en">
                            <span class="text-2xl mr-3">🇬🇧</span>
                            <div class="text-left">
                                <div class="font-medium text-gray-900" data-i18n="swiss_modal.english">English</div>
                                <div class="text-sm text-gray-500" data-i18n="swiss_modal.english_desc">English language</div>
                            </div>
                        </button>
                    </div>
                    
                    <!-- Footer -->
                    <div class="mt-6 pt-4 border-t border-gray-100">
                        <button id="close-modal" class="w-full text-sm text-gray-500 hover:text-gray-700 transition-colors focus:outline-none" data-i18n="swiss_modal.choose_later">
                            Später wählen • Choisir plus tard • Choose later
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Apply translations to modal content
        if (this.i18n && this.i18n.translateElement) {
            this.i18n.translateElement(modal);
        }
        
        this.attachEventListeners();
        
        console.log('🇨🇭 Swiss language modal created');
    }

    /**
     * Attach event listeners to modal elements
     */
    attachEventListeners() {
        const modal = document.getElementById(this.modalId);
        const languageOptions = modal.querySelectorAll('.language-option');
        const closeButton = modal.querySelector('#close-modal');
        
        // Language selection
        languageOptions.forEach(option => {
            option.addEventListener('click', async (e) => {
                e.preventDefault();
                const selectedLang = option.getAttribute('data-lang');
                
                // Add loading state
                option.classList.add('opacity-50', 'pointer-events-none');
                
                // Switch language
                await this.i18n.switchLanguage(selectedLang);
                
                // Close modal with success animation
                this.hideModal(true);
            });
        });
        
        // Close button
        closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.hideModal(false);
        });
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideModal(false);
            }
        });
        
        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modalShown) {
                this.hideModal(false);
            }
        });
    }

    /**
     * Show the modal with animation
     */
    showModal() {
        const modal = document.getElementById(this.modalId);
        const content = modal.querySelector('#modal-content');
        
        if (modal) {
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Show modal
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modal.classList.add('opacity-100');
            
            // Animate content
            setTimeout(() => {
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }, 50);
        }
    }

    /**
     * Hide the modal with animation
     * @param {boolean} languageSelected - Whether a language was selected
     */
    hideModal(languageSelected = false) {
        const modal = document.getElementById(this.modalId);
        const content = modal.querySelector('#modal-content');
        
        if (modal) {
            // Animate out
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
            
            setTimeout(() => {
                modal.classList.add('opacity-0', 'pointer-events-none');
                modal.classList.remove('opacity-100');
                
                // Restore body scroll
                document.body.style.overflow = '';
                
                // Remove modal after animation
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }, 150);
            
            // Mark as seen
            this.markModalSeen();
            
            // Fire analytics event
            if (languageSelected) {
                this.trackLanguageSelection();
            }
        }
    }

    /**
     * Track language selection for analytics
     */
    trackLanguageSelection() {
        // Send custom event for analytics
        window.dispatchEvent(new CustomEvent('swissLanguageSelected', {
            detail: {
                language: this.i18n.getCurrentLanguage(),
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            }
        }));
        
        console.log('Swiss user selected language:', this.i18n.getCurrentLanguage());
    }

    /**
     * Reset modal seen status (for testing)
     */
    resetModalStatus() {
        localStorage.removeItem('swiss-modal-seen');
        this.modalShown = false;
    }

    /**
     * Force show modal (for testing)
     */
    forceShow() {
        this.isSwissUser = true;
        this.resetModalStatus();
        this.createModal();
        this.showModal();
    }
}

// Export for use in other files
window.SwissLanguageModal = SwissLanguageModal;