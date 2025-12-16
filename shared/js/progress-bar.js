/**
 * Progress Bar Component - Setset Playground
 * Reusable progress bar for tracking generation progress
 */

class ProgressBar {
    constructor(options = {}) {
        this.containerElement = options.containerElement || document.getElementById('progress-section');
        this.countElement = options.countElement || document.getElementById('progress-count');
        this.barElement = options.barElement || document.getElementById('progress-bar');

        this.total = 0;
        this.completed = 0;

        // Create default HTML if elements don't exist
        if (!this.containerElement) {
            this.createProgressHTML();
        }
    }

    createProgressHTML() {
        const html = `
            <div class="progress-section" id="progress-section">
                <div class="progress-header">
                    <span class="progress-title">Generating</span>
                    <span class="progress-count" id="progress-count">0 / 0</span>
                </div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-bar"></div>
                </div>
            </div>
        `;

        // Insert before results section if it exists
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.insertAdjacentHTML('beforebegin', html);
        } else {
            const container = document.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', html);
            }
        }

        this.containerElement = document.getElementById('progress-section');
        this.countElement = document.getElementById('progress-count');
        this.barElement = document.getElementById('progress-bar');
    }

    start(total) {
        this.total = total;
        this.completed = 0;
        this.update();
        if (this.containerElement) {
            this.containerElement.classList.add('visible');
        }
    }

    increment(count = 1) {
        this.completed += count;
        this.update();
    }

    setProgress(completed, total = null) {
        if (total !== null) {
            this.total = total;
        }
        this.completed = completed;
        this.update();
    }

    update() {
        if (this.countElement) {
            this.countElement.textContent = `${this.completed} / ${this.total}`;
        }
        if (this.barElement) {
            const percent = this.total > 0 ? (this.completed / this.total) * 100 : 0;
            this.barElement.style.width = `${percent}%`;
        }
    }

    hide() {
        if (this.containerElement) {
            this.containerElement.classList.remove('visible');
        }
    }

    reset() {
        this.total = 0;
        this.completed = 0;
        this.update();
        this.hide();
    }
}

// Simple function-based API for backward compatibility
let globalProgressBar = null;

function getProgressBar() {
    if (!globalProgressBar) {
        globalProgressBar = new ProgressBar();
    }
    return globalProgressBar;
}

function startProgress(total) {
    getProgressBar().start(total);
}

function incrementProgress(count = 1) {
    getProgressBar().increment(count);
}

function setProgress(completed, total = null) {
    getProgressBar().setProgress(completed, total);
}

function hideProgress() {
    getProgressBar().hide();
}

// Export
window.ProgressBar = ProgressBar;
window.startProgress = startProgress;
window.incrementProgress = incrementProgress;
window.setProgress = setProgress;
window.hideProgress = hideProgress;
