/**
 * Lightbox Component - Setset Playground
 * Reusable lightbox for viewing images with metadata
 */

class Lightbox {
    constructor(options = {}) {
        this.results = [];
        this.currentIndex = 0;
        this.onDownload = options.onDownload || this.defaultDownload.bind(this);

        this.init();
    }

    init() {
        // Create lightbox HTML if it doesn't exist
        if (!document.getElementById('lightbox')) {
            this.createLightboxHTML();
        }

        this.elements = {
            container: document.getElementById('lightbox'),
            image: document.getElementById('lightbox-image'),
            model: document.getElementById('lightbox-model'),
            prompt: document.getElementById('lightbox-prompt'),
            close: document.getElementById('lightbox-close'),
            download: document.getElementById('lightbox-download'),
            prev: document.getElementById('lightbox-prev'),
            next: document.getElementById('lightbox-next')
        };

        this.bindEvents();
    }

    createLightboxHTML() {
        const html = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightbox-close">&times;</button>
                    <button class="lightbox-nav lightbox-prev" id="lightbox-prev">&larr;</button>
                    <button class="lightbox-nav lightbox-next" id="lightbox-next">&rarr;</button>
                    <div class="lightbox-left">
                        <img src="" alt="" class="lightbox-image" id="lightbox-image">
                    </div>
                    <div class="lightbox-right">
                        <div class="lightbox-section">
                            <h3 class="lightbox-section-title">Model</h3>
                            <p class="lightbox-model-text" id="lightbox-model"></p>
                        </div>
                        <div class="lightbox-section">
                            <h3 class="lightbox-section-title">Prompt</h3>
                            <p class="lightbox-prompt-text" id="lightbox-prompt"></p>
                        </div>
                        <button class="lightbox-download" id="lightbox-download">
                            Download Image
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', html);
    }

    bindEvents() {
        // Close button
        this.elements.close.addEventListener('click', () => this.close());

        // Click outside to close
        this.elements.container.addEventListener('click', (e) => {
            if (e.target === this.elements.container) this.close();
        });

        // Download
        this.elements.download.addEventListener('click', () => {
            const result = this.results[this.currentIndex];
            if (result) {
                this.onDownload(result.url, `image-${this.currentIndex + 1}.png`);
            }
        });

        // Navigation
        if (this.elements.prev) {
            this.elements.prev.addEventListener('click', () => this.navigate(-1));
        }
        if (this.elements.next) {
            this.elements.next.addEventListener('click', () => this.navigate(1));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.elements.container.classList.contains('visible')) return;

            switch (e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
            }
        });
    }

    setResults(results) {
        this.results = results;
    }

    open(index = 0) {
        this.currentIndex = index;
        this.updateContent();
        this.elements.container.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.elements.container.classList.remove('visible');
        document.body.style.overflow = '';
    }

    navigate(direction) {
        const newIndex = this.currentIndex + direction;
        if (newIndex >= 0 && newIndex < this.results.length) {
            this.currentIndex = newIndex;
            this.updateContent();
        }
    }

    updateContent() {
        const result = this.results[this.currentIndex];
        if (!result) return;

        this.elements.image.src = result.url;
        this.elements.model.textContent = result.modelName || 'Unknown';
        this.elements.prompt.textContent = result.prompt || '';

        // Update nav visibility
        if (this.elements.prev) {
            this.elements.prev.style.display = this.currentIndex > 0 ? 'block' : 'none';
        }
        if (this.elements.next) {
            this.elements.next.style.display = this.currentIndex < this.results.length - 1 ? 'block' : 'none';
        }
    }

    async defaultDownload(url, filename) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            window.open(url, '_blank');
        }
    }
}

// Export
window.Lightbox = Lightbox;
