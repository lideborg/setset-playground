/**
 * Results Renderer Component - Setset Playground
 * Reusable results grid for displaying generated images
 */

class ResultsRenderer {
    constructor(options = {}) {
        this.container = options.container || document.getElementById('results-grid');
        this.sectionElement = options.sectionElement || document.getElementById('results-section');
        this.lightbox = options.lightbox || null;
        this.aspectRatio = options.aspectRatio || '3/4';
        this.showModelTag = options.showModelTag !== false;
        this.showPromptOverlay = options.showPromptOverlay !== false;
        this.onImageClick = options.onImageClick || null;

        this.results = [];
    }

    setResults(results) {
        this.results = results;
        this.render();
    }

    addResult(result) {
        this.results.push(result);
        this.render();
    }

    addResults(results) {
        this.results.push(...results);
        this.render();
    }

    clear() {
        this.results = [];
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.hide();
    }

    show() {
        if (this.sectionElement) {
            this.sectionElement.classList.add('visible');
        }
    }

    hide() {
        if (this.sectionElement) {
            this.sectionElement.classList.remove('visible');
        }
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = this.results.map((result, idx) => {
            const modelTag = this.showModelTag && result.modelName
                ? `<span class="model-tag">${result.modelName}</span>`
                : '';

            const promptOverlay = this.showPromptOverlay && result.prompt
                ? `<div class="result-overlay"><p class="result-prompt">${this.truncatePrompt(result.prompt)}</p></div>`
                : '';

            return `
                <div class="result-card" data-index="${idx}">
                    <img src="${result.url}" alt="Result ${idx + 1}" class="result-image" style="aspect-ratio: ${this.aspectRatio};">
                    ${modelTag}
                    ${promptOverlay}
                </div>
            `;
        }).join('');

        // Add click handlers
        this.container.querySelectorAll('.result-card').forEach(card => {
            card.addEventListener('click', () => {
                const idx = parseInt(card.dataset.index);
                if (this.onImageClick) {
                    this.onImageClick(idx, this.results[idx]);
                } else if (this.lightbox) {
                    this.lightbox.setResults(this.results);
                    this.lightbox.open(idx);
                }
            });
        });

        this.show();
    }

    truncatePrompt(prompt, maxLength = 100) {
        if (prompt.length <= maxLength) return prompt;
        return prompt.substring(0, maxLength) + '...';
    }

    getResults() {
        return this.results;
    }
}

// Simple function for rendering results without class instantiation
function renderResults(container, results, options = {}) {
    const renderer = new ResultsRenderer({
        container: typeof container === 'string' ? document.getElementById(container) : container,
        ...options
    });
    renderer.setResults(results);
    return renderer;
}

// Export
window.ResultsRenderer = ResultsRenderer;
window.renderResults = renderResults;
