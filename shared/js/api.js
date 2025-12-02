/**
 * API Client - Setset Playground
 * Centralized API calls - will proxy through backend in production
 */

class API {
    constructor(baseUrl = '') {
        this.baseUrl = baseUrl || window.location.origin;
    }

    /**
     * Generate image using fal.ai
     */
    async generateImage(model, params) {
        const response = await fetch(`${this.baseUrl}/api/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model, ...params })
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
            body: JSON.stringify({ model, ...params })
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

        const response = await fetch(`${this.baseUrl}/api/upload`, {
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
     */
    async uploadBase64(dataUrl) {
        const response = await fetch(`${this.baseUrl}/api/upload-base64`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl })
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
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'BG Replace failed');
        }

        return response.json();
    }
}

// Export singleton
window.api = new API();
