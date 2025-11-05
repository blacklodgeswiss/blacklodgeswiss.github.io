// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Try different selectors for mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button') || document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu') || document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                if (key === 'services[]') {
                    if (!data.services) data.services = [];
                    data.services.push(value);
                } else {
                    data[key] = value;
                }
            }
            
            // Basic validation
            if (!data.vorname || !data.nachname || !data.email) {
                alert('Bitte füllen Sie alle Pflichtfelder aus.');
                return;
            }
            
            if (!data.datenschutz) {
                alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                return;
            }
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Wird gesendet...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Vielen Dank für Ihre Anfrage! Wir melden uns bald bei Ihnen.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 1500);
            
            // In a real implementation, you would send the data to your server:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                alert('Vielen Dank für Ihre Anfrage! Wir melden uns bald bei Ihnen.');
                contactForm.reset();
            })
            .catch(error => {
                alert('Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es erneut.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
            */
        });
    }
});

// Instagram feed simulation (replace with actual API integration)
document.addEventListener('DOMContentLoaded', function() {
    const instagramFeed = document.getElementById('instagram-feed');
    
    if (instagramFeed) {
        // Placeholder images - replace with actual Instagram API integration
        const placeholderPosts = [
            { id: 1, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400', alt: 'Cocktail Event 1' },
            { id: 2, image: 'https://images.unsplash.com/photo-1587223075055-82e0a937ddff?w=400', alt: 'Bar Setup 1' },
            { id: 3, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400', alt: '360 Booth in Action' },
            { id: 4, image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400', alt: 'Event Entertainment' },
            { id: 5, image: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400', alt: 'Cocktail Close-up' },
            { id: 6, image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400', alt: 'Wedding Bar Setup' },
            { id: 7, image: 'https://images.unsplash.com/photo-1574391884720-bbc3278394db?w=400', alt: 'Party Atmosphere' },
            { id: 8, image: 'https://images.unsplash.com/photo-1502741126161-b048400d085d?w=400', alt: 'Professional Bartending' }
        ];
        
        // Create Instagram posts
        placeholderPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'relative group overflow-hidden rounded-lg aspect-square bg-gray-200';
            postElement.innerHTML = `
                <img src="${post.image}" alt="${post.alt}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                        <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                </div>
            `;
            
            // Add click event to open Instagram
            postElement.addEventListener('click', () => {
                window.open('https://www.instagram.com/_the.black.lodge_/', '_blank');
            });
            
            instagramFeed.appendChild(postElement);
        });
    }
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('bg-white/95');
        } else {
            header.classList.remove('bg-white/95');
        }
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
        }
    });
}, observerOptions);

// Observe all sections for animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});