/**
 * EmailJS Configuration with Environment Variables
 * 
 * This file loads EmailJS configuration from GitHub Pages environment
 * or falls back to runtime configuration via URL parameters
 */

window.EMAILJS_CONFIG = {
    // Configuration will be loaded from environment or URL params
    publicKey: null,
    serviceId: null, 
    templateId: null,
    
    // Template parameters mapping
    templateParams: {
        from_name: '{{name}}',
        from_email: '{{email}}',
        phone: '{{phone}}',
        event_type: '{{event_type}}',
        event_date: '{{event_date}}',
        location: '{{location}}',
        guests: '{{guests}}',
        services: '{{services}}',
        budget: '{{budget}}',
        message: '{{message}}',
        reply_to: '{{email}}'
    },
    
    // Rate limiting (prevent spam)
    rateLimiting: {
        enabled: true,
        maxSubmissions: 3, // Max submissions per hour
        cooldownMinutes: 20 // Cooldown between submissions
    },
    
    // Honeypot field name (hidden spam trap)
    honeypotField: 'website_url'
};

/**
 * Load EmailJS configuration from environment or URL parameters
 */
function loadEmailJSConfig() {
    // Try to load from GitHub Pages environment variables
    // These will be injected during build process
    const config = window.EMAILJS_CONFIG;
    
    // Method 1: From build-time environment variables (recommended)
    if (typeof window.EMAILJS_PUBLIC_KEY !== 'undefined') {
        config.publicKey = window.EMAILJS_PUBLIC_KEY;
    }
    if (typeof window.EMAILJS_SERVICE_ID !== 'undefined') {
        config.serviceId = window.EMAILJS_SERVICE_ID;
    }
    if (typeof window.EMAILJS_TEMPLATE_ID !== 'undefined') {
        config.templateId = window.EMAILJS_TEMPLATE_ID;
    }
    
    // Method 2: From URL parameters (for testing)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('emailjs_key')) {
        config.publicKey = urlParams.get('emailjs_key');
    }
    if (urlParams.get('emailjs_service')) {
        config.serviceId = urlParams.get('emailjs_service');
    }
    if (urlParams.get('emailjs_template')) {
        config.templateId = urlParams.get('emailjs_template');
    }
    
    // Method 3: From localStorage (for development)
    if (localStorage.getItem('emailjs_public_key')) {
        config.publicKey = localStorage.getItem('emailjs_public_key');
    }
    if (localStorage.getItem('emailjs_service_id')) {
        config.serviceId = localStorage.getItem('emailjs_service_id');
    }
    if (localStorage.getItem('emailjs_template_id')) {
        config.templateId = localStorage.getItem('emailjs_template_id');
    }
    
    // Log configuration status (without exposing keys)
    console.log('📧 EmailJS Config Status:', {
        publicKey: config.publicKey ? '✅ Loaded' : '❌ Missing',
        serviceId: config.serviceId ? '✅ Loaded' : '❌ Missing', 
        templateId: config.templateId ? '✅ Loaded' : '❌ Missing'
    });
    
    return config;
}

/**
 * Check if EmailJS is properly configured
 */
function isEmailJSConfigured() {
    const config = window.EMAILJS_CONFIG;
    return !!(config.publicKey && config.serviceId && config.templateId);
}

/**
 * Rate limiting storage helper
 */
const RateLimiter = {
    key: 'blacklodge_form_submissions',
    
    canSubmit() {
        if (!window.EMAILJS_CONFIG.rateLimiting.enabled) return true;
        
        const submissions = this.getSubmissions();
        const now = Date.now();
        const oneHour = 60 * 60 * 1000;
        const cooldown = window.EMAILJS_CONFIG.rateLimiting.cooldownMinutes * 60 * 1000;
        
        // Clean old submissions (older than 1 hour)
        const recentSubmissions = submissions.filter(time => now - time < oneHour);
        
        // Check if too many recent submissions
        if (recentSubmissions.length >= window.EMAILJS_CONFIG.rateLimiting.maxSubmissions) {
            return false;
        }
        
        // Check cooldown from last submission
        if (recentSubmissions.length > 0) {
            const lastSubmission = Math.max(...recentSubmissions);
            if (now - lastSubmission < cooldown) {
                return false;
            }
        }
        
        return true;
    },
    
    recordSubmission() {
        const submissions = this.getSubmissions();
        submissions.push(Date.now());
        localStorage.setItem(this.key, JSON.stringify(submissions));
    },
    
    getSubmissions() {
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored) : [];
    },
    
    getNextAllowedTime() {
        const submissions = this.getSubmissions();
        if (submissions.length === 0) return null;
        
        const lastSubmission = Math.max(...submissions);
        const cooldown = window.EMAILJS_CONFIG.rateLimiting.cooldownMinutes * 60 * 1000;
        
        return new Date(lastSubmission + cooldown);
    }
};

// Load configuration when script loads
loadEmailJSConfig();

// Export for use in main.js
window.BlacklodgeRateLimiter = RateLimiter;
window.loadEmailJSConfig = loadEmailJSConfig;
window.isEmailJSConfigured = isEmailJSConfigured;