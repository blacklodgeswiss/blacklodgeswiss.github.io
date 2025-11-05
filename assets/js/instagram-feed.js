class InstagramFeed {
    constructor() {
        this.feedContainer = document.getElementById('instagram-feed');
        this.posts = [];
        this.isLoading = false;
        
        // No placeholder posts - will only show real Instagram content or direct link
        this.realPosts = [];

        // Configuration for Instagram Basic Display API (for future implementation)
        this.instagramConfig = {
            accessToken: null, // Will be set when user authorizes
            apiUrl: 'https://graph.instagram.com/me/media',
            fields: 'id,caption,media_type,media_url,permalink,timestamp'
        };
    }

    async init() {
        if (!this.feedContainer) return;
        
        await this.loadPosts();
        this.renderPosts();
    }

    async loadPosts() {
        this.isLoading = true;
        
        try {
            // Try to load real Instagram posts first
            if (this.instagramConfig.accessToken) {
                await this.loadRealInstagramPosts();
            } else {
                // No placeholder posts - show message to visit Instagram directly
                console.log('No Instagram access token available - showing direct link');
                await new Promise(resolve => setTimeout(resolve, 500));
                this.posts = []; // Empty array means no posts to show
            }
            
        } catch (error) {
            console.error('Error loading Instagram posts:', error);
            this.showError();
        } finally {
            this.isLoading = false;
        }
    }

    async loadRealInstagramPosts() {
        const url = `${this.instagramConfig.apiUrl}?fields=${this.instagramConfig.fields}&access_token=${this.instagramConfig.accessToken}`;
        
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram posts');
        }
        
        const data = await response.json();
        this.posts = data.data.slice(0, 6).map(post => ({
            id: post.id,
            image_url: post.media_url,
            caption: post.caption || '',
            permalink: post.permalink,
            timestamp: post.timestamp
        }));
    }

    renderPosts() {
        if (!this.posts || this.posts.length === 0) {
            this.showEmpty();
            return;
        }

        const postsHTML = this.posts.map(post => this.createPostHTML(post)).join('');
        this.feedContainer.innerHTML = postsHTML;

        // Add click tracking
        this.addEventListeners();
    }

    createPostHTML(post) {
        const date = new Date(post.timestamp);
        const formattedDate = date.toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        return `
            <div class="instagram-post bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer" 
                 data-permalink="${post.permalink}">
                <div class="aspect-square relative overflow-hidden">
                    <img src="${post.image_url}" 
                         alt="${this.truncateText(post.caption, 50)}" 
                         class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                         loading="lazy">
                    <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div class="opacity-0 hover:opacity-100 transition-opacity duration-300">
                            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="p-4">
                    <p class="text-sm text-gray-700 mb-2 line-clamp-3">${this.truncateText(post.caption, 100)}</p>
                    <div class="flex justify-between items-center text-xs text-gray-500">
                        <span>${formattedDate}</span>
                        <span class="text-purple-600 hover:text-purple-700">Ansehen →</span>
                    </div>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const posts = this.feedContainer.querySelectorAll('.instagram-post');
        posts.forEach(post => {
            post.addEventListener('click', (e) => {
                const permalink = post.dataset.permalink;
                if (permalink) {
                    window.open(permalink, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    truncateText(text, maxLength) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    showError() {
        this.feedContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 mb-4">
                    <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <p class="text-gray-500" data-i18n="instagram.error">Fehler beim Laden der Instagram Posts</p>
                <button onclick="instagramFeed.init()" class="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                    <span data-i18n="instagram.retry">Erneut versuchen</span>
                </button>
            </div>
        `;
    }

    showEmpty() {
        this.feedContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-gray-400 mb-4">
                    <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <p class="text-gray-500" data-i18n="instagram.empty">Keine Instagram Posts verfügbar</p>
            </div>
        `;
    }
}

// Initialize Instagram feed when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.instagramFeed = new InstagramFeed();
    instagramFeed.init();
});