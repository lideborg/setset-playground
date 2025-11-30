// SocialSet Application
// Instagram-ready fashion content generator

// State Management
const state = {
    // Model selection
    selectedModel: null,
    uploadedPortrait: null,
    uploadedFullbody: null,
    models: [],

    // Pose selection
    selectedPoses: {},  // { poseId: count }

    // Outfit selection
    gender: 'female',
    enabledCategories: ['top', 'bottom', 'shoes'],  // Default enabled
    selectedProducts: {},  // { categoryId: productObject }
    availableProducts: {},  // Loaded from folders

    // Generation settings
    aspectRatio: '4:5',
    generationModel: 'nanobanana',
    resolution: '1K',

    // Results
    results: [],
    lightboxIndex: 0
};

// DOM Elements
const elements = {
    modelGrid: document.getElementById('model-grid'),
    modelStatus: document.getElementById('model-status'),
    posesPdp: document.getElementById('poses-pdp'),
    posesLifestyle: document.getElementById('poses-lifestyle'),
    poseStatus: document.getElementById('pose-status'),
    productGrid: document.getElementById('product-grid'),
    outfitStatus: document.getElementById('outfit-status'),
    calcDisplay: document.getElementById('calc-display'),
    generateBtn: document.getElementById('generate-btn'),
    progressSection: document.getElementById('progress-section'),
    progressCount: document.getElementById('progress-count'),
    progressBar: document.getElementById('progress-bar'),
    resultsSection: document.getElementById('results-section'),
    resultsGrid: document.getElementById('results-grid'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightbox-image'),
    lightboxModel: document.getElementById('lightbox-model'),
    lightboxOutfit: document.getElementById('lightbox-outfit'),
    lightboxPrompt: document.getElementById('lightbox-prompt'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxDownload: document.getElementById('lightbox-download'),
    randomizeBtn: document.getElementById('randomize-btn'),
    clearOutfitBtn: document.getElementById('clear-outfit-btn'),
    uploadPortrait: document.getElementById('upload-portrait'),
    uploadFullbody: document.getElementById('upload-fullbody'),
    portraitInput: document.getElementById('portrait-input'),
    fullbodyInput: document.getElementById('fullbody-input')
};

// Initialize Application
async function init() {
    console.log('Initializing SocialSet...');

    // Load models from JSON
    await loadModels();

    // Render UI
    renderModels();
    renderPoses();
    renderProductCategories();

    // Load available products from folders
    await loadAvailableProducts();

    // Setup event listeners
    setupEventListeners();

    // Update UI state
    updateUI();

    console.log('SocialSet initialized');
}

// Load models from shared data
async function loadModels() {
    try {
        const response = await fetch('/shared/data/model-descriptions.json');
        state.models = await response.json();
        console.log(`Loaded ${state.models.length} models`);
    } catch (error) {
        console.error('Failed to load models:', error);
        state.models = [];
    }
}

// Load available products from folders
async function loadAvailableProducts() {
    // For now, initialize empty structure
    // Products will be loaded from /tools/socialset/products/{category}/{gender}/
    for (const category of PRODUCT_CATEGORIES) {
        state.availableProducts[category.id] = {
            female: [],
            male: []
        };
    }

    // TODO: Implement actual folder scanning via server endpoint
    // For now, products will be added manually or via upload
    console.log('Product folders initialized');
}

// Render Models Grid
function renderModels() {
    if (!elements.modelGrid) return;

    elements.modelGrid.innerHTML = state.models.map(model => `
        <div class="model-card ${state.selectedModel?.id === model.id ? 'selected' : ''}"
             data-model-id="${model.id}"
             onclick="selectModel('${model.id}')">
            <img src="/shared/images/models/${model.id}-portrait.jpg"
                 alt="${model.name}"
                 onerror="this.src='/shared/images/placeholder.jpg'">
            <div class="check-mark">✓</div>
            <div class="model-name">${model.name}</div>
        </div>
    `).join('');
}

// Select a model
function selectModel(modelId) {
    const model = state.models.find(m => m.id === modelId);
    if (!model) return;

    // Toggle selection
    if (state.selectedModel?.id === modelId) {
        state.selectedModel = null;
    } else {
        state.selectedModel = model;
    }

    // Clear uploaded model when selecting from library
    state.uploadedPortrait = null;
    state.uploadedFullbody = null;

    renderModels();
    updateUI();
}

// Render Poses Grid
function renderPoses() {
    const pdpPoses = POSES.filter(p => p.category === 'pdp' || p.category === 'detail');
    const lifestylePoses = POSES.filter(p => p.category === 'lifestyle');

    elements.posesPdp.innerHTML = renderPoseCards(pdpPoses);
    elements.posesLifestyle.innerHTML = renderPoseCards(lifestylePoses);
}

function renderPoseCards(poses) {
    return poses.map(pose => {
        const count = state.selectedPoses[pose.id] || 0;
        const isActive = count > 0;

        return `
            <div class="pose-card ${isActive ? 'active' : ''}" data-pose-id="${pose.id}">
                <div class="pose-card-image" onclick="togglePose('${pose.id}')">
                    <img src="${pose.defaultImage}" alt="${pose.name}"
                         onerror="this.src='/shared/images/placeholder.jpg'">
                    <div class="pose-count">${count}</div>
                </div>
                <div class="pose-name">${pose.name}</div>
                <div class="pose-slider-row">
                    <input type="range" class="pose-slider"
                           min="0" max="4" value="${count}"
                           onchange="setPoseCount('${pose.id}', this.value)">
                </div>
            </div>
        `;
    }).join('');
}

// Toggle pose selection
function togglePose(poseId) {
    if (state.selectedPoses[poseId]) {
        delete state.selectedPoses[poseId];
    } else {
        state.selectedPoses[poseId] = 1;
    }
    renderPoses();
    updateUI();
}

// Set pose count
function setPoseCount(poseId, count) {
    count = parseInt(count);
    if (count > 0) {
        state.selectedPoses[poseId] = count;
    } else {
        delete state.selectedPoses[poseId];
    }
    renderPoses();
    updateUI();
}

// Render Product Categories
function renderProductCategories() {
    if (!elements.productGrid) return;

    elements.productGrid.innerHTML = PRODUCT_CATEGORIES.map(category => {
        const isEnabled = state.enabledCategories.includes(category.id);
        const isDisabled = !STYLING_RULES.canEnable(category.id, state.enabledCategories);
        const product = state.selectedProducts[category.id];

        return `
            <div class="product-card ${isDisabled ? 'disabled' : ''}" data-category="${category.id}">
                <div class="product-card-header">
                    <span class="product-card-title">${category.name}</span>
                    <div class="product-card-toggle ${isEnabled ? 'active' : ''}"
                         onclick="toggleCategory('${category.id}')"></div>
                </div>
                <div class="product-card-content">
                    <div class="product-preview ${product ? 'has-image' : ''}"
                         onclick="cycleProduct('${category.id}')">
                        ${product ? `
                            <img src="${product.url}" alt="${category.name}">
                            <div class="product-nav">
                                <button class="product-nav-btn" onclick="event.stopPropagation(); prevProduct('${category.id}')">‹</button>
                                <button class="product-nav-btn" onclick="event.stopPropagation(); nextProduct('${category.id}')">›</button>
                            </div>
                        ` : `
                            <div class="product-preview-placeholder">
                                ${category.icon}
                                <div>No products</div>
                            </div>
                        `}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Toggle category enabled/disabled
function toggleCategory(categoryId) {
    const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
    if (!category) return;

    const index = state.enabledCategories.indexOf(categoryId);

    if (index > -1) {
        // Disable - remove from enabled
        state.enabledCategories.splice(index, 1);
        delete state.selectedProducts[categoryId];
    } else {
        // Enable - add to enabled (if allowed)
        if (STYLING_RULES.canEnable(categoryId, state.enabledCategories)) {
            state.enabledCategories.push(categoryId);

            // If enabling dress, disable top and bottom
            if (categoryId === 'dress') {
                state.enabledCategories = state.enabledCategories.filter(c => c !== 'top' && c !== 'bottom');
                delete state.selectedProducts['top'];
                delete state.selectedProducts['bottom'];
            }

            // If enabling top or bottom, disable dress
            if (categoryId === 'top' || categoryId === 'bottom') {
                state.enabledCategories = state.enabledCategories.filter(c => c !== 'dress');
                delete state.selectedProducts['dress'];
            }
        }
    }

    renderProductCategories();
    updateUI();
}

// Cycle through products in a category
function cycleProduct(categoryId) {
    const products = state.availableProducts[categoryId]?.[state.gender] || [];
    if (products.length === 0) return;

    const currentIndex = products.findIndex(p => p.url === state.selectedProducts[categoryId]?.url);
    const nextIndex = (currentIndex + 1) % products.length;
    state.selectedProducts[categoryId] = products[nextIndex];

    renderProductCategories();
    updateUI();
}

function prevProduct(categoryId) {
    const products = state.availableProducts[categoryId]?.[state.gender] || [];
    if (products.length === 0) return;

    const currentIndex = products.findIndex(p => p.url === state.selectedProducts[categoryId]?.url);
    const prevIndex = currentIndex <= 0 ? products.length - 1 : currentIndex - 1;
    state.selectedProducts[categoryId] = products[prevIndex];

    renderProductCategories();
    updateUI();
}

function nextProduct(categoryId) {
    cycleProduct(categoryId);
}

// Randomize outfit
function randomizeOutfit() {
    const outfit = STYLING_RULES.generateRandomOutfit(state.availableProducts, state.gender);

    // Update enabled categories and selected products
    state.enabledCategories = Object.keys(outfit);
    state.selectedProducts = outfit;

    renderProductCategories();
    updateUI();
}

// Clear outfit
function clearOutfit() {
    state.selectedProducts = {};
    state.enabledCategories = ['top', 'bottom', 'shoes'];
    renderProductCategories();
    updateUI();
}

// Setup Event Listeners
function setupEventListeners() {
    // Model tabs
    document.querySelectorAll('.model-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.model-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.model-tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.querySelector(`[data-content="${tab.dataset.tab}"]`)?.classList.add('active');
        });
    });

    // Gender filter
    document.querySelectorAll('[data-gender]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-gender]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.gender = btn.dataset.gender;
            clearOutfit();  // Clear outfit when changing gender
        });
    });

    // Aspect ratio
    document.querySelectorAll('[data-ratio]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-ratio]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.aspectRatio = btn.dataset.ratio;
            updateUI();
        });
    });

    // Generation model
    document.querySelectorAll('[data-model]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-model]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.generationModel = btn.dataset.model;
        });
    });

    // Resolution
    document.querySelectorAll('[data-res]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-res]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.resolution = btn.dataset.res;
        });
    });

    // Randomize button
    elements.randomizeBtn?.addEventListener('click', randomizeOutfit);

    // Clear outfit button
    elements.clearOutfitBtn?.addEventListener('click', clearOutfit);

    // Generate button
    elements.generateBtn?.addEventListener('click', generate);

    // Lightbox
    elements.lightboxClose?.addEventListener('click', closeLightbox);
    elements.lightbox?.addEventListener('click', (e) => {
        if (e.target === elements.lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!elements.lightbox?.classList.contains('visible')) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') navigateLightbox(-1);
        else if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Portrait upload
    elements.portraitInput?.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            state.uploadedPortrait = await fileToBase64(e.target.files[0]);
            state.selectedModel = null;  // Clear library selection
            updateUploadPreview('portrait', state.uploadedPortrait);
            updateUI();
        }
    });

    // Full body upload
    elements.fullbodyInput?.addEventListener('change', async (e) => {
        if (e.target.files[0]) {
            state.uploadedFullbody = await fileToBase64(e.target.files[0]);
            state.selectedModel = null;  // Clear library selection
            updateUploadPreview('fullbody', state.uploadedFullbody);
            updateUI();
        }
    });

    // Drag and drop for upload areas
    setupDragDrop(elements.uploadPortrait, async (file) => {
        state.uploadedPortrait = await fileToBase64(file);
        state.selectedModel = null;
        updateUploadPreview('portrait', state.uploadedPortrait);
        updateUI();
    });

    setupDragDrop(elements.uploadFullbody, async (file) => {
        state.uploadedFullbody = await fileToBase64(file);
        state.selectedModel = null;
        updateUploadPreview('fullbody', state.uploadedFullbody);
        updateUI();
    });
}

// Setup drag and drop
function setupDragDrop(element, onDrop) {
    if (!element) return;

    element.addEventListener('dragover', (e) => {
        e.preventDefault();
        element.classList.add('drag-over');
    });

    element.addEventListener('dragleave', () => {
        element.classList.remove('drag-over');
    });

    element.addEventListener('drop', async (e) => {
        e.preventDefault();
        element.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            await onDrop(file);
        }
    });
}

// Update upload preview
function updateUploadPreview(type, dataUrl) {
    const element = type === 'portrait' ? elements.uploadPortrait : elements.uploadFullbody;
    if (!element) return;

    element.classList.add('has-image');
    element.innerHTML = `<img src="${dataUrl}" alt="${type}">`;
}

// Update UI state
function updateUI() {
    // Model status
    if (state.selectedModel) {
        elements.modelStatus.textContent = state.selectedModel.name;
    } else if (state.uploadedPortrait || state.uploadedFullbody) {
        elements.modelStatus.textContent = 'Custom model';
    } else {
        elements.modelStatus.textContent = 'No model selected';
    }

    // Pose status
    const totalPoses = Object.values(state.selectedPoses).reduce((a, b) => a + b, 0);
    elements.poseStatus.textContent = `${totalPoses} pose${totalPoses !== 1 ? 's' : ''} selected`;

    // Outfit status
    const itemCount = Object.keys(state.selectedProducts).length;
    elements.outfitStatus.textContent = `${itemCount} item${itemCount !== 1 ? 's' : ''} selected`;

    // Calculate total images
    const hasModel = state.selectedModel || state.uploadedPortrait;
    const poseCount = totalPoses;
    const totalImages = hasModel && poseCount > 0 ? poseCount : 0;

    elements.calcDisplay.textContent = `${hasModel ? 1 : 0} model × ${poseCount} poses × 1 variation = ${totalImages} images`;

    // Enable/disable generate button
    elements.generateBtn.disabled = !hasModel || poseCount === 0;
}

// Generate Images
async function generate() {
    if (!state.selectedModel && !state.uploadedPortrait) {
        alert('Please select a model first');
        return;
    }

    const selectedPoseIds = Object.keys(state.selectedPoses);
    if (selectedPoseIds.length === 0) {
        alert('Please select at least one pose');
        return;
    }

    state.results = [];
    elements.resultsGrid.innerHTML = '';

    // Build outfit description
    const outfitDescription = buildOutfitDescription(state.selectedProducts);

    // Get model reference images
    let portraitUrl, fullbodyUrl;
    if (state.selectedModel) {
        // Use model from library
        portraitUrl = `/shared/images/models/${state.selectedModel.id}-portrait.jpg`;
        fullbodyUrl = `/shared/images/models/${state.selectedModel.id}-fullbody.jpg`;
    } else {
        // Upload custom images
        if (state.uploadedPortrait) {
            const uploadResult = await api.uploadBase64(state.uploadedPortrait);
            portraitUrl = uploadResult.url;
        }
        if (state.uploadedFullbody) {
            const uploadResult = await api.uploadBase64(state.uploadedFullbody);
            fullbodyUrl = uploadResult.url;
        }
    }

    // Build generation tasks
    const tasks = [];

    for (const poseId of selectedPoseIds) {
        const pose = POSES.find(p => p.id === poseId);
        if (!pose) continue;

        const count = state.selectedPoses[poseId];
        const prompts = POSE_PROMPTS[poseId] || [];

        for (let i = 0; i < count; i++) {
            // Pick a random prompt variation for this pose
            const basePrompt = prompts[i % prompts.length] || prompts[0];
            const prompt = basePrompt.replace('[PRODUCT_DESCRIPTION]', `Wearing ${outfitDescription}`);

            tasks.push({
                poseId,
                poseName: pose.name,
                prompt,
                outfitDescription
            });
        }
    }

    if (tasks.length === 0) return;

    // Show progress
    elements.progressSection.classList.add('visible');
    elements.progressCount.textContent = `0 / ${tasks.length}`;
    elements.progressBar.style.width = '0%';

    let completed = 0;

    // Generate in parallel (batches of 3)
    const batchSize = 3;
    for (let i = 0; i < tasks.length; i += batchSize) {
        const batch = tasks.slice(i, i + batchSize);

        const promises = batch.map(async (task) => {
            try {
                const params = {
                    prompt: task.prompt,
                    num_images: 1,
                    aspect_ratio: state.aspectRatio,
                    resolution: state.resolution,
                    output_format: 'png'
                };

                // Add subject reference
                if (portraitUrl) {
                    params.subject_image_url = portraitUrl;
                }

                const data = await api.generateImage(state.generationModel, params);

                if (data.images && data.images.length > 0) {
                    state.results.push({
                        url: data.images[0].url,
                        prompt: task.prompt,
                        poseName: task.poseName,
                        outfit: task.outfitDescription,
                        model: state.selectedModel?.name || 'Custom'
                    });
                    renderResults();
                }
            } catch (error) {
                console.error('Generation error:', error);
            }

            completed++;
            elements.progressCount.textContent = `${completed} / ${tasks.length}`;
            elements.progressBar.style.width = `${(completed / tasks.length) * 100}%`;
        });

        await Promise.all(promises);
    }

    // Hide progress, show results
    elements.progressSection.classList.remove('visible');
    elements.resultsSection.classList.add('visible');
}

// Render Results
function renderResults() {
    elements.resultsGrid.innerHTML = state.results.map((result, idx) => `
        <div class="result-card" onclick="openLightbox(${idx})">
            <img src="${result.url}" alt="Generated ${idx + 1}">
            <div class="result-overlay">
                <p class="result-prompt">${result.poseName}</p>
            </div>
        </div>
    `).join('');

    elements.resultsSection.classList.add('visible');
}

// Lightbox functions
function openLightbox(idx) {
    state.lightboxIndex = idx;
    updateLightboxContent();
    elements.lightbox.classList.add('visible');
}

function closeLightbox() {
    elements.lightbox.classList.remove('visible');
}

function navigateLightbox(direction) {
    const newIndex = state.lightboxIndex + direction;
    if (newIndex >= 0 && newIndex < state.results.length) {
        state.lightboxIndex = newIndex;
        updateLightboxContent();
    }
}

function updateLightboxContent() {
    const result = state.results[state.lightboxIndex];
    elements.lightboxImage.src = result.url;
    elements.lightboxModel.textContent = result.model || 'Unknown';
    elements.lightboxOutfit.textContent = result.outfit || 'N/A';
    elements.lightboxPrompt.textContent = result.prompt;
    elements.lightboxDownload.onclick = () => downloadFile(result.url, `socialset-${state.lightboxIndex + 1}.png`);
}

// Initialize on load
document.addEventListener('DOMContentLoaded', init);

// Make functions available globally
window.selectModel = selectModel;
window.togglePose = togglePose;
window.setPoseCount = setPoseCount;
window.toggleCategory = toggleCategory;
window.cycleProduct = cycleProduct;
window.prevProduct = prevProduct;
window.nextProduct = nextProduct;
window.openLightbox = openLightbox;
