/**
 * Lightbox Component - Setset Playground
 * Reusable lightbox for viewing images with metadata
 */

class Lightbox {
    constructor(options = {}) {
        this.results = [];
        this.currentIndex = 0;
        this.playbackSpeed = 1.0;
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
            video: document.getElementById('lightbox-video'),
            model: document.getElementById('lightbox-model'),
            prompt: document.getElementById('lightbox-prompt'),
            close: document.getElementById('lightbox-close'),
            download: document.getElementById('lightbox-download'),
            prev: document.getElementById('lightbox-prev'),
            next: document.getElementById('lightbox-next'),
            speedSection: document.getElementById('lightbox-speed-section'),
            speedButtons: document.querySelectorAll('.speed-btn'),
            inputsSection: document.getElementById('lightbox-inputs-section'),
            inputsGrid: document.getElementById('lightbox-inputs-grid'),
            poseSection: document.getElementById('lightbox-pose-section'),
            poseIndicator: document.getElementById('lightbox-pose-indicator')
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
                        <video src="" class="lightbox-video" id="lightbox-video" controls loop style="display: none;"></video>
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
                        <div class="lightbox-section lightbox-pose-section" id="lightbox-pose-section" style="display: none;">
                            <div class="lightbox-pose-indicator" id="lightbox-pose-indicator"></div>
                        </div>
                        <div class="lightbox-section lightbox-inputs-section" id="lightbox-inputs-section" style="display: none;">
                            <h3 class="lightbox-section-title">Input Images</h3>
                            <div class="lightbox-inputs-grid" id="lightbox-inputs-grid"></div>
                        </div>
                        <div class="lightbox-section lightbox-speed-section" id="lightbox-speed-section" style="display: none;">
                            <h3 class="lightbox-section-title">Playback Speed</h3>
                            <div class="lightbox-speed-controls">
                                <button class="speed-btn" data-speed="0.25">0.25x</button>
                                <button class="speed-btn" data-speed="0.5">0.5x</button>
                                <button class="speed-btn active" data-speed="1">1x</button>
                                <button class="speed-btn" data-speed="1.5">1.5x</button>
                                <button class="speed-btn" data-speed="2">2x</button>
                                <button class="speed-btn" data-speed="3">3x</button>
                            </div>
                            <p class="lightbox-speed-hint">Speed will be applied to download</p>
                        </div>
                        <button class="lightbox-download" id="lightbox-download">
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <style>
                .lightbox-speed-controls {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 8px;
                }
                .speed-btn {
                    padding: 6px 12px;
                    font-size: 12px;
                    border: 1px solid #e5e5e5;
                    border-radius: 4px;
                    background: #f5f5f5;
                    cursor: pointer;
                    transition: all 0.15s;
                }
                .speed-btn:hover {
                    border-color: #333;
                }
                .speed-btn.active {
                    background: #333;
                    color: white;
                    border-color: #333;
                }
                .lightbox-speed-hint {
                    font-size: 11px;
                    color: #888;
                    margin-top: 8px;
                }
                .lightbox-inputs-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                    margin-top: 8px;
                }
                .lightbox-input-thumb {
                    width: 50px;
                    height: 50px;
                    object-fit: cover;
                    border-radius: 4px;
                    border: 1px solid #e5e5e5;
                    cursor: pointer;
                    transition: transform 0.15s, border-color 0.15s;
                }
                .lightbox-input-thumb:hover {
                    transform: scale(1.1);
                    border-color: #333;
                }
                .lightbox-input-label {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .lightbox-input-label span {
                    font-size: 9px;
                    color: #666;
                    margin-top: 2px;
                }
                .lightbox-pose-indicator {
                    font-size: 13px;
                    font-weight: 500;
                    padding: 6px 12px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    display: inline-block;
                }
            </style>
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
                const filename = result.filename || `image-${this.currentIndex + 1}.png`;
                this.onDownload(result.url, filename);
            }
        });

        // Navigation
        if (this.elements.prev) {
            this.elements.prev.addEventListener('click', () => this.navigate(-1));
        }
        if (this.elements.next) {
            this.elements.next.addEventListener('click', () => this.navigate(1));
        }

        // Speed buttons
        this.elements.speedButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const speed = parseFloat(btn.dataset.speed);
                this.setPlaybackSpeed(speed);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.elements.container.classList.contains('visible')) return;

            switch (e.key) {
                case 'Escape':
                case 'x':
                case 'X':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    this.navigate(1);
                    break;
                case 'd':
                case 'D':
                    const result = this.results[this.currentIndex];
                    if (result) {
                        const filename = result.filename || `image-${this.currentIndex + 1}.png`;
                        this.onDownload(result.url, filename);
                    }
                    break;
            }
        });
    }

    setPlaybackSpeed(speed) {
        this.playbackSpeed = speed;
        if (this.elements.video) {
            this.elements.video.playbackRate = speed;
        }
        // Update button states
        this.elements.speedButtons.forEach(btn => {
            btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
        });
        // Update download button text if not 1x
        if (speed !== 1) {
            this.elements.download.textContent = `Download (${speed}x)`;
        } else {
            this.elements.download.textContent = 'Download';
        }
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
        // Stop video playback when closing
        if (this.elements.video) {
            this.elements.video.pause();
            this.elements.video.src = '';
        }
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

        // Determine if this is a video based on URL or type flag
        const isVideo = result.type === 'video' ||
                        result.url?.includes('.mp4') ||
                        result.url?.includes('.webm') ||
                        result.url?.includes('.mov');

        if (isVideo) {
            // Show video, hide image
            this.elements.image.style.display = 'none';
            this.elements.video.style.display = 'block';
            this.elements.video.src = result.url;
            this.elements.video.playbackRate = this.playbackSpeed;
            this.elements.video.play().catch(() => {}); // Auto-play if allowed
            // Show speed controls for video
            if (this.elements.speedSection) {
                this.elements.speedSection.style.display = 'block';
            }
        } else {
            // Show image, hide video
            this.elements.image.style.display = 'block';
            this.elements.video.style.display = 'none';
            this.elements.video.pause();
            this.elements.video.src = '';
            this.elements.image.src = result.url;
            // Hide speed controls for images
            if (this.elements.speedSection) {
                this.elements.speedSection.style.display = 'none';
            }
            // Reset speed for next video
            this.setPlaybackSpeed(1);
        }

        this.elements.model.textContent = result.modelName || 'Unknown';
        this.elements.prompt.textContent = result.prompt || '';

        // Show pose indicator if usedCopyPose is defined
        if (this.elements.poseSection && this.elements.poseIndicator) {
            if (typeof result.usedCopyPose !== 'undefined') {
                this.elements.poseSection.style.display = 'block';
                if (result.usedCopyPose) {
                    this.elements.poseIndicator.textContent = 'Pose: Copied from environment';
                    this.elements.poseIndicator.style.color = '#2196F3';
                } else {
                    this.elements.poseIndicator.textContent = 'Pose: Generated from library';
                    this.elements.poseIndicator.style.color = '#4CAF50';
                }
            } else {
                this.elements.poseSection.style.display = 'none';
            }
        }

        // Render input images if available
        if (this.elements.inputsSection && this.elements.inputsGrid) {
            if (result.inputImages && result.inputImages.length > 0) {
                this.elements.inputsSection.style.display = 'block';
                this.elements.inputsGrid.innerHTML = result.inputImages.map((url, i) => `
                    <div class="lightbox-input-label">
                        <img src="${url}" class="lightbox-input-thumb" onclick="window.open('${url}', '_blank')" title="Image ${i + 1}">
                        <span>${i + 1}</span>
                    </div>
                `).join('');
            } else {
                this.elements.inputsSection.style.display = 'none';
                this.elements.inputsGrid.innerHTML = '';
            }
        }

        // Update nav visibility
        if (this.elements.prev) {
            this.elements.prev.style.display = this.currentIndex > 0 ? 'block' : 'none';
        }
        if (this.elements.next) {
            this.elements.next.style.display = this.currentIndex < this.results.length - 1 ? 'block' : 'none';
        }
    }

    async defaultDownload(url, filename) {
        const result = this.results[this.currentIndex];
        const isVideo = result?.type === 'video' ||
                        url?.includes('.mp4') ||
                        url?.includes('.webm') ||
                        url?.includes('.mov');

        // If video with non-1x speed, process with FFmpeg on server
        if (isVideo && this.playbackSpeed !== 1) {
            await this.downloadSpeedAdjustedVideo(url, filename, this.playbackSpeed);
            return;
        }

        // Normal download
        try {
            // Use proxy to bypass CORS issues (especially for videos from CDNs)
            const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);

            if (!response.ok) {
                throw new Error('Proxy download failed');
            }

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
            console.error('Proxy download failed, trying direct:', error);
            // Fallback: try direct fetch
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
            } catch (e) {
                console.error('Direct download also failed:', e);
                window.open(url, '_blank');
            }
        }
    }

    async downloadSpeedAdjustedVideo(url, filename, speed) {
        // Update button to show processing
        const originalText = this.elements.download.textContent;
        this.elements.download.textContent = 'Processing...';
        this.elements.download.disabled = true;

        try {
            const response = await fetch('/api/video/speed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, speed })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Speed adjustment failed');
            }

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            // Add speed to filename
            const speedSuffix = `_${speed}x`;
            const extIndex = filename.lastIndexOf('.');
            const newFilename = extIndex > 0
                ? filename.slice(0, extIndex) + speedSuffix + filename.slice(extIndex)
                : filename + speedSuffix + '.mp4';

            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = newFilename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Speed adjustment failed:', error);
            alert('Failed to process video speed: ' + error.message + '\nDownloading original instead.');
            // Fallback to original
            await this.defaultDownloadDirect(url, filename);
        } finally {
            this.elements.download.textContent = originalText;
            this.elements.download.disabled = false;
        }
    }

    async defaultDownloadDirect(url, filename) {
        try {
            const proxyUrl = `/api/proxy-download?url=${encodeURIComponent(url)}`;
            const response = await fetch(proxyUrl);
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = blobUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
        } catch (e) {
            window.open(url, '_blank');
        }
    }
}


// Export
window.Lightbox = Lightbox;
