/**
 * Configuration file for Blacklodge website
 */

const CONFIG = {
    // Contact form configuration
    contact: {
        // Target email address where form submissions will be sent
        targetEmail: 'the.blacklodge@outlook.com',
        
        // Alternative contact methods
        phone: '+41 79 778 48 61',
        
        // Response times (in hours)
        emailResponseTime: 24,
        phoneAvailability: 'Mo-Fr 09:00-18:00',
        quoteResponseTime: 72 // 3 business days in hours
    },
    
    // Social media links
    social: {
        instagram: 'https://www.instagram.com/_the.black.lodge_/',
        tiktok: 'https://www.tiktok.com/@the.blacklodge'
    },
    
    // Business information
    business: {
        name: 'Blacklodge',
        fullName: 'Blacklodge – Mobile Cocktailbar & Event-Services',
        owner: 'Mario Kantharoobarajah',
        serviceArea: 'Schweizweit verfügbar',
        founded: '2025'
    },
    
    // Analytics and tracking (if needed)
    analytics: {
        googleAnalyticsId: null, // Set your GA4 ID here if needed
        facebookPixelId: null    // Set your Facebook Pixel ID here if needed
    }
};

// Export configuration
window.BLACKLODGE_CONFIG = CONFIG;