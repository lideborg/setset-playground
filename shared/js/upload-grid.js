/**
 * Upload Grid Component - Setset Playground
 * Reusable drag-and-drop image upload grid
 */

class UploadGrid {
    constructor(options = {}) {
        this.container = options.container;
        this.type = options.type || 'default';
        this.slots = options.slots || 10;
        this.aspectRatio = options.aspectRatio || '3/4';
        this.columns = options.columns || 5;
        this.allowDeselect = options.allowDeselect !== false;
        this.onImagesChange = options.onImagesChange || (() => {});

        this.images = new Array(this.slots).fill(null);
        this.selectedSlotIndex = null;

        if (this.container) {
            this.init();
        }
    }

    init() {
        this.container.classList.add('upload-grid');
        this.container.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;
        this.container.dataset.type = this.type;

        // Create slots
        for (let i = 0; i < this.slots; i++) {
            this.container.appendChild(this.createSlot(i));
        }

        this.setupDragAndDrop();
    }

    createSlot(index) {
        const slot = document.createElement('div');
        slot.className = 'upload-slot';
        slot.innerHTML = '+';
        slot.dataset.index = index;
        slot.dataset.type = this.type;
        slot.style.aspectRatio = this.aspectRatio;

        slot.addEventListener('click', (e) => {
            e.stopPropagation();
            if (e.target.closest('.remove-btn')) return;

            if (this.images[index]) {
                // If slot has image and deselection is allowed, toggle it
                if (this.allowDeselect) {
                    this.toggleImage(index, !this.images[index].selected);
                }
            }
            // Always select slot for paste target
            this.selectSlot(index);
        });

        return slot;
    }

    setupDragAndDrop() {
        this.container.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.container.classList.add('drag-over');
        });

        this.container.addEventListener('dragleave', () => {
            this.container.classList.remove('drag-over');
        });

        this.container.addEventListener('drop', (e) => {
            e.preventDefault();
            this.container.classList.remove('drag-over');
            const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
            if (files.length > 0) {
                this.addFiles(files);
            }
        });
    }

    selectSlot(index) {
        // Clear previous selection
        this.container.querySelectorAll('.upload-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });

        this.selectedSlotIndex = index;
        this.container.children[index].classList.add('selected');
    }

    clearSelection() {
        this.container.querySelectorAll('.upload-slot.selected').forEach(el => {
            el.classList.remove('selected');
        });
        this.selectedSlotIndex = null;
    }

    addFiles(files, startIndex = null) {
        files.forEach((file, i) => {
            let index = startIndex !== null ? startIndex + i : this.findNextEmptySlot(i);
            if (index === -1 || index >= this.slots) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                this.images[index] = {
                    file,
                    url: e.target.result,
                    selected: true
                };
                this.renderSlot(index);
                this.onImagesChange(this.getSelectedImages());
            };
            reader.readAsDataURL(file);
        });
    }

    addImageUrl(url, index = null) {
        const targetIndex = index !== null ? index : this.findNextEmptySlot();
        if (targetIndex === -1 || targetIndex >= this.slots) return;

        this.images[targetIndex] = {
            file: null,
            url: url,
            selected: true
        };
        this.renderSlot(targetIndex);
        this.onImagesChange(this.getSelectedImages());
    }

    findNextEmptySlot(startFrom = 0) {
        for (let i = startFrom; i < this.slots; i++) {
            if (!this.images[i]) return i;
        }
        return -1;
    }

    renderSlot(index) {
        const slot = this.container.children[index];
        const image = this.images[index];

        if (image) {
            slot.className = 'upload-slot filled' + (image.selected ? '' : ' deselected');
            if (this.selectedSlotIndex === index) {
                slot.classList.add('selected');
            }
            slot.innerHTML = `
                <img src="${image.url}" alt="Image ${index + 1}">
                <button class="remove-btn" data-index="${index}">&times;</button>
            `;
            slot.querySelector('.remove-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeImage(index);
            });
        } else {
            slot.className = 'upload-slot';
            if (this.selectedSlotIndex === index) {
                slot.classList.add('selected');
            }
            slot.innerHTML = '+';
        }
        slot.style.aspectRatio = this.aspectRatio;
    }

    toggleImage(index, selected) {
        if (this.images[index]) {
            this.images[index].selected = selected;
            this.container.children[index].classList.toggle('deselected', !selected);
            this.onImagesChange(this.getSelectedImages());
        }
    }

    removeImage(index) {
        // Shift images down
        this.images.splice(index, 1);
        this.images.push(null);
        this.rerenderAll();
        this.onImagesChange(this.getSelectedImages());
    }

    rerenderAll() {
        for (let i = 0; i < this.slots; i++) {
            this.renderSlot(i);
        }
    }

    getSelectedImages() {
        return this.images.filter(img => img && img.selected);
    }

    getAllImages() {
        return this.images.filter(img => img);
    }

    clear() {
        this.images = new Array(this.slots).fill(null);
        this.rerenderAll();
        this.onImagesChange([]);
    }

    handlePaste(file) {
        if (this.selectedSlotIndex !== null) {
            this.addFiles([file], this.selectedSlotIndex);
            // Move selection to next empty slot
            const nextEmpty = this.findNextEmptySlot(this.selectedSlotIndex + 1);
            if (nextEmpty !== -1) {
                this.selectSlot(nextEmpty);
            } else {
                this.clearSelection();
            }
        } else {
            // No slot selected, add to first empty
            this.addFiles([file]);
        }
    }
}

// Export
window.UploadGrid = UploadGrid;
