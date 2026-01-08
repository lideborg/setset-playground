/**
 * API Client - Setset Playground
 * Centralized API calls - will proxy through backend in production
 */

class API {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl || window.location.origin;
        // Load saved key preference, default to 'setset'
        this.falKey = localStorage.getItem('falKeyType') || 'setset';
    }

    /**
     * Set the FAL API key type to use
     * @param {'personal' | 'setset'} keyType
     */
    setFalKey(keyType) {
        this.falKey = keyType;
        localStorage.setItem('falKeyType', keyType);
    }

    /**
     * Get the current FAL key type
     */
    getFalKey() {
        return this.falKey;
    }

    /**
     * Generate image using fal.ai
     */
    async generateImage(model, params) {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, falKey: this.falKey, ...params })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Generation failed');
        }

        return response.json();
    }

    /**
     * Remix/transform image using fal.ai
     */
    async remixImage(model, params) {
        const response = await fetch(`${this.baseUrl}/api/remix`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, falKey: this.falKey, ...params })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Remix failed');
        }

        return response.json();
    }

    /**
     * Generate prompts using OpenAI
     */
    async generatePrompts(idea, numPrompts = 4) {
        const response = await fetch(`${this.baseUrl}/api/prompts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idea, numPrompts })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Prompt generation failed');
        }

        return response.json();
    }

    /**
     * Upload image and get URL
     */
    async uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch(`${this.baseUrl}/api/upload?falKey=${this.falKey}`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        return response.json();
    }

    /**
     * Upload base64 data URL and get hosted URL
     * @returns {Promise<{url: string}>} Object with hosted URL
     */
    async uploadBase64(dataUrl) {
        const response = await fetch(`${this.baseUrl}/api/upload-base64`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl, falKey: this.falKey })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        return response.json();
    }

    /**
     * Replace background using Bria AI
     */
    async bgReplace(params) {
        const response = await fetch(`${this.baseUrl}/api/bg-replace`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ falKey: this.falKey, ...params })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'BG Replace failed');
        }

        return response.json();
    }

    /**
     * Analyze images using GPT-4 Vision
     * @param {string[]} images - Array of image URLs or data URLs
     * @param {string} prompt - Analysis prompt
     */
    async analyzeImages(images, prompt) {
        const response = await fetch(`${this.baseUrl}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ images, prompt })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Analysis failed');
        }

        return response.json();
    }

    /**
     * Create a variation of a base editorial mood prompt
     * Uses GPT-4o-mini for speed and cost efficiency
     * @param {string} basePrompt - The base mood prompt to vary
     * @param {string} moodName - Name of the mood for context
     * @param {string} gender - 'female' or 'male'
     */
    async varyPrompt(basePrompt, moodName, gender) {
        const response = await fetch(`${this.baseUrl}/api/prompts/vary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ basePrompt, moodName, gender })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Prompt variation failed');
        }

        return response.json();
    }
}

// Export singleton
window.api = new API();

// Listen for localStorage changes (from parent window toggle)
window.addEventListener('storage', (e) => {
    if (e.key === 'falKeyType') {
        window.api.falKey = e.newValue || 'setset';
        console.log(`🔑 API key switched to: ${window.api.falKey}`);
    }
});

/**
 * API Key Switcher Component
 * Creates a toggle UI to switch between personal and setset FAL keys
 *
 * Usage: Call createApiKeySwitcher() and append the returned element to your header
 */
function createApiKeySwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'api-key-switcher';
    switcher.innerHTML = `
        <span class="api-key-switcher__option" data-key="personal">Personal</span>
        <span class="api-key-switcher__option" data-key="setset">Setset</span>
    `;

    const options = switcher.querySelectorAll('.api-key-switcher__option');

    // Set initial state
    const currentKey = window.api.getFalKey();
    options.forEach(opt => {
        if (opt.dataset.key === currentKey) {
            opt.classList.add('active');
        }
    });

    // Handle clicks
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            window.api.setFalKey(opt.dataset.key);
            console.log(`🔑 Switched to ${opt.dataset.key} FAL key`);
        });
    });

    return switcher;
}

window.createApiKeySwitcher = createApiKeySwitcher;
