// Instagram API Handler for Black Lodge
// This file handles Instagram Basic Display API integration

class InstagramAPI {
    constructor() {
        this.clientId = 'YOUR_INSTAGRAM_APP_ID'; // Replace with actual App ID
        this.clientSecret = 'YOUR_INSTAGRAM_APP_SECRET'; // Replace with actual App Secret
        this.redirectUri = 'https://blacklodgeswiss.github.io/auth/instagram';
        this.accessToken = localStorage.getItem('instagram_access_token');
        
        // Initialize if we have a stored token
        if (this.accessToken) {
            this.initializeWithToken();
        }
    }

    // Step 1: Redirect user to Instagram authorization
    authorize() {
        const scope = 'user_profile,user_media';
        const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${scope}&response_type=code`;
        
        window.open(authUrl, 'instagram_auth', 'width=500,height=600');
        
        // Listen for the auth completion
        window.addEventListener('message', this.handleAuthResponse.bind(this));
    }

    // Step 2: Handle the authorization response
    handleAuthResponse(event) {
        if (event.origin !== window.location.origin) return;
        
        const { code, error } = event.data;
        
        if (error) {
            console.error('Instagram authorization failed:', error);
            return;
        }

        if (code) {
            this.exchangeCodeForToken(code);
        }
    }

    // Step 3: Exchange authorization code for access token
    async exchangeCodeForToken(code) {
        try {
            const response = await fetch('/api/instagram/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    grant_type: 'authorization_code',
                    redirect_uri: this.redirectUri,
                    code: code
                })
            });

            const data = await response.json();
            
            if (data.access_token) {
                this.accessToken = data.access_token;
                localStorage.setItem('instagram_access_token', this.accessToken);
                this.initializeWithToken();
                
                // Refresh the Instagram feed
                if (window.instagramFeed) {
                    window.instagramFeed.instagramConfig.accessToken = this.accessToken;
                    window.instagramFeed.init();
                }
            }
        } catch (error) {
            console.error('Error exchanging code for token:', error);
        }
    }

    // Initialize with existing token
    initializeWithToken() {
        if (window.instagramFeed) {
            window.instagramFeed.instagramConfig.accessToken = this.accessToken;
        }
    }

    // Get user's media
    async getMedia() {
        if (!this.accessToken) {
            throw new Error('No access token available');
        }

        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${this.accessToken}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch Instagram media');
        }

        return await response.json();
    }

    // Disconnect Instagram
    disconnect() {
        localStorage.removeItem('instagram_access_token');
        this.accessToken = null;
        
        if (window.instagramFeed) {
            window.instagramFeed.instagramConfig.accessToken = null;
            window.instagramFeed.init();
        }
    }
}

// Create global instance
window.instagramAPI = new InstagramAPI();

// Add Instagram authorization button to the feed
document.addEventListener('DOMContentLoaded', () => {
    const instagramContainer = document.getElementById('instagram-feed');
    if (instagramContainer && !window.instagramAPI.accessToken) {
        // Add authorization prompt
        const authPrompt = document.createElement('div');
        authPrompt.className = 'col-span-full text-center py-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg mb-6';
        authPrompt.innerHTML = `
            <div class="mb-4">
                <svg class="w-12 h-12 mx-auto text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 7.652.025 6.465.073 5.277.121 4.469.264 3.752.428c-.738.163-1.365.378-1.99.753-.626.374-1.153.861-1.602 1.602-.375.625-.59 1.252-.753 1.99C-.076 4.469-.22 5.277-.073 6.465-.025 7.652 0 8.396 0 12.017c0 3.62.025 4.365.073 5.552.048 1.188.191 1.996.355 2.714.163.738.378 1.365.753 1.99.374.626.861 1.153 1.602 1.602.625.375 1.252.59 1.99.753.718.164 1.526.307 2.714.355 1.187.048 1.931.073 5.552.073 3.62 0 4.365-.025 5.552-.073 1.188-.048 1.996-.191 2.714-.355.738-.163 1.365-.378 1.99-.753.626-.374 1.153-.861 1.602-1.602.375-.625.59-1.252.753-1.99.164-.718.307-1.526.355-2.714.048-1.187.073-1.931.073-5.552 0-3.62-.025-4.365-.073-5.552-.048-1.188-.191-1.996-.355-2.714-.163-.738-.378-1.365-.753-1.99-.374-.626-.861-1.153-1.602-1.602-.625-.375-1.252-.59-1.99-.753C16.465.264 15.657.121 14.469.073 13.282.025 12.538 0 8.917 0h3.1zm0 2.163c3.564 0 3.987.014 5.393.072 1.3.06 2.006.276 2.476.458.622.242.966.532 1.389.955.423.423.713.767.955 1.389.182.47.398 1.176.458 2.476.058 1.406.072 1.829.072 5.393 0 3.564-.014 3.987-.072 5.393-.06 1.3-.276 2.006-.458 2.476-.242.622-.532.966-.955 1.389-.423.423-.767.713-1.389.955-.47.182-1.176.398-2.476.458-1.406.058-1.829.072-5.393.072-3.564 0-3.987-.014-5.393-.072-1.3-.06-2.006-.276-2.476-.458-.622-.242-.966-.532-1.389-.955-.423-.423-.713-.767-.955-1.389-.182-.47-.398-1.176-.458-2.476C2.177 16.004 2.163 15.581 2.163 12.017c0-3.564.014-3.987.072-5.393.06-1.3.276-2.006.458-2.476.242-.622.532-.966.955-1.389.423-.423.767-.713 1.389-.955.47-.182 1.176-.398 2.476-.458 1.406-.058 1.829-.072 5.393-.072z"/>
                    <path d="M12.017 5.838a6.18 6.18 0 1 0 0 12.36 6.18 6.18 0 0 0 0-12.36zm0 10.197a4.017 4.017 0 1 1 0-8.034 4.017 4.017 0 0 1 0 8.034z"/>
                    <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Echte Instagram Posts anzeigen</h3>
            <p class="text-gray-600 mb-4">Verbinden Sie sich mit Instagram um die echten Posts von @_the.black.lodge_ zu sehen</p>
            <button onclick="window.instagramAPI.authorize()" 
                    class="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Mit Instagram verbinden
            </button>
        `;
        
        instagramContainer.parentNode.insertBefore(authPrompt, instagramContainer);
    }
});