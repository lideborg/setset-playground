/**
 * Studio Loader Component - Setset Playground
 * Animated loading messages for image generation
 */

const STUDIO_MESSAGES = [
    "Setting up the Studio...",
    "Adjusting the Key Light...",
    "Loading the Film...",
    "Warming up the Strobes...",
    "Preparing the Backdrop...",
    "Adjusting the Fill Light...",
    "Checking the Framing...",
    "Setting the Aperture...",
    "Loading Color Profiles...",
    "Positioning the C-Stand...",
    "Focusing...",
    "Checking Tethering...",
    "Rolling...",
    "Adjusting the Umbrella...",
    "Metering...",
    "Standby...",
    "Loading the Presets...",
    "Quiet on Set...",
    "Final Touches...",
    "Almost There..."
];

class StudioLoader {
    constructor(options = {}) {
        this.messages = options.messages || STUDIO_MESSAGES;
        this.interval = options.interval || 1500;
        this.loadingInterval = null;
        this.lastMessageIndex = -1;

        // Find or create loader elements
        this.loaderElement = options.loaderElement || document.getElementById('inline-loader');
        this.messageElement = options.messageElement || document.getElementById('loader-message');
        this.progressElement = options.progressElement || document.getElementById('loader-progress');

        // Create default HTML if elements don't exist
        if (!this.loaderElement) {
            this.createLoaderHTML();
        }
    }

    createLoaderHTML() {
        const html = `
            <div class="inline-loader" id="inline-loader">
                <div class="loader-message" id="loader-message">Setting up the Studio...</div>
                <div class="loader-progress" id="loader-progress">Preparing...</div>
            </div>
        `;

        // Insert before results section or at end of container
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.insertAdjacentHTML('beforebegin', html);
        } else {
            const container = document.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', html);
            }
        }

        this.loaderElement = document.getElementById('inline-loader');
        this.messageElement = document.getElementById('loader-message');
        this.progressElement = document.getElementById('loader-progress');
    }

    start(progressText = 'Preparing...') {
        if (!this.loaderElement || !this.messageElement) return;

        this.loaderElement.classList.add('visible');
        if (this.progressElement) {
            this.progressElement.textContent = progressText;
        }

        // Set initial random message
        const initialIdx = Math.floor(Math.random() * this.messages.length);
        this.messageElement.textContent = this.messages[initialIdx];
        this.lastMessageIndex = initialIdx;

        // Rotate messages with fade effect
        this.loadingInterval = setInterval(() => {
            let idx;
            do {
                idx = Math.floor(Math.random() * this.messages.length);
            } while (idx === this.lastMessageIndex && this.messages.length > 1);
            this.lastMessageIndex = idx;

            this.messageElement.classList.add('fade-out');
            this.messageElement.classList.remove('fade-in');

            setTimeout(() => {
                this.messageElement.textContent = this.messages[idx];
                this.messageElement.classList.remove('fade-out');
                this.messageElement.classList.add('fade-in');
            }, 250);
        }, this.interval);
    }

    updateProgress(text) {
        if (this.progressElement) {
            this.progressElement.textContent = text;
        }
    }

    stop() {
        if (this.loadingInterval) {
            clearInterval(this.loadingInterval);
            this.loadingInterval = null;
        }
        if (this.loaderElement) {
            this.loaderElement.classList.remove('visible');
        }
    }
}

// Simple function-based API for backward compatibility
let globalLoader = null;

function getLoader() {
    if (!globalLoader) {
        globalLoader = new StudioLoader();
    }
    return globalLoader;
}

function startLoadingAnimation(progressText = 'Preparing...') {
    getLoader().start(progressText);
}

function updateLoadingProgress(text) {
    getLoader().updateProgress(text);
}

function stopLoadingAnimation() {
    getLoader().stop();
}

// Export
window.STUDIO_MESSAGES = STUDIO_MESSAGES;
window.StudioLoader = StudioLoader;
window.startLoadingAnimation = startLoadingAnimation;
window.updateLoadingProgress = updateLoadingProgress;
window.stopLoadingAnimation = stopLoadingAnimation;
