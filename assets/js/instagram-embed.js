// Instagram Embed Handler for Black Lodge
class InstagramEmbedHandler {
    constructor() {
        this.container = document.getElementById('instagram-embed-container');
        this.username = '_the.black.lodge_';
        this.embedAttempted = false;
        
        // Try to load Instagram embed script
        this.loadInstagramEmbedScript();
    }

    loadInstagramEmbedScript() {
        // Check if Instagram embed script is already loaded
        if (window.instgrm) {
            this.attemptEmbed();
            return;
        }

        // Load Instagram's embed script
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            this.attemptEmbed();
        };
        script.onerror = () => {
            console.log('Instagram embed script failed to load, showing fallback');
            this.showFallback();
        };
        
        document.head.appendChild(script);
    }

    attemptEmbed() {
        if (!this.container || this.embedAttempted) return;
        this.embedAttempted = true;

        try {
            // Method 1: Try Instagram's official embed
            this.createInstagramEmbed();
        } catch (error) {
            console.log('Instagram embed failed:', error);
            this.showFallback();
        }
    }

    createInstagramEmbed() {
        // Clear loading content
        this.container.innerHTML = '';

        // Create Instagram embed widget
        const embedWidget = document.createElement('div');
        embedWidget.innerHTML = `
            <!-- Instagram Embed Widget -->
            <div class="instagram-embed-widget">
                <!-- Try to show recent posts widget -->
                <div id="instagram-widget" class="text-center">
                    <div class="mb-6">
                        <div class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
                            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                                <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                                <circle cx="18.406" cy="5.594" r="1.44"/>
                            </svg>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-900 mb-2">@${this.username}</h3>
                        <p class="text-gray-600 mb-6">Entdecken Sie unsere neuesten Events und Impressionen</p>
                    </div>

                    <!-- No Preview Posts - Direct to Instagram -->
                    <div class="mb-6">
                        <div class="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
                            <p class="text-gray-700 text-center">
                                <strong>Besuchen Sie unser Instagram-Profil</strong><br>
                                um unsere neuesten Posts, Stories und Events zu sehen!
                            </p>
                        </div>
                    </div>

                    <!-- Call to Action -->
                    <div class="space-y-4">
                        <a href="https://www.instagram.com/${this.username}/" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                                <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                                <circle cx="18.406" cy="5.594" r="1.44"/>
                            </svg>
                            Vollständiges Profil ansehen
                        </a>
                        <p class="text-sm text-gray-500">
                            Klicken Sie hier, um alle Posts, Stories und mehr zu sehen
                        </p>
                    </div>
                </div>
            </div>
        `;

        this.container.appendChild(embedWidget);
        
        // Add click tracking
        this.addClickTracking();
    }

    createPreviewPosts() {
        // No preview posts - just show the call to action
        return '';
    }

    addClickTracking() {
        // Track clicks on preview posts
        const previewPosts = this.container.querySelectorAll('.group');
        previewPosts.forEach((post, index) => {
            post.addEventListener('click', () => {
                // Open Instagram profile
                window.open(`https://www.instagram.com/${this.username}/`, '_blank', 'noopener,noreferrer');
            });
        });
    }

    showFallback() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="text-center py-12">
                <div class="mb-6">
                    <svg class="w-16 h-16 text-purple-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                        <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">@${this.username}</h3>
                <p class="text-gray-600 mb-6">Instagram-Inhalte können nicht direkt eingebettet werden</p>
                <a href="https://www.instagram.com/${this.username}/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                        <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                        <circle cx="18.406" cy="5.594" r="1.44"/>
                    </svg>
                    Auf Instagram ansehen
                </a>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.instagramEmbedHandler = new InstagramEmbedHandler();
});