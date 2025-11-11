// State management
const state = {
    selectedModel: null,
    items: {
        head: { file: null, analysis: null, style: '' },
        face: { file: null, analysis: null, style: '' },
        outerwear: { file: null, analysis: null, style: '' },
        longsleeve: { file: null, analysis: null, style: 'minimal' },
        shortsleeve: { file: null, analysis: null, style: '' },
        bottom: { file: null, analysis: null, style: 'minimal' },
        shoes: { file: null, analysis: null, style: 'minimal' },
        accessories: { file: null, analysis: null, style: '' }
    },
    lastGeneratedPrompt: null
};

// Load model descriptions
let modelDescriptions = {};
fetch('../SetCast/app/model-descriptions.json')
    .then(res => res.json())
    .then(data => {
        modelDescriptions = data.reduce((acc, model) => {
            acc[model.id] = model;
            return acc;
        }, {});
        console.log('✓ Model descriptions loaded:', Object.keys(modelDescriptions).length, 'models');
    })
    .catch(err => console.error('Error loading model descriptions:', err));

// Models data (matching Looks page) - All 24 models
const models = [
    { name: "James Wilson", image: "../SetCast/images/talent-01_JamesWilson.png", id: "james" },
    { name: "Maya Johnson", image: "../SetCast/images/talent-02_MayaJohnson.png", id: "maya" },
    { name: "River Blake", image: "../SetCast/images/talent-03_RiverBlake.png", id: "river" },
    { name: "Emma Sullivan", image: "../SetCast/images/talent-04_EmmaSullivan.png", id: "emma" },
    { name: "Marcus Brown", image: "../SetCast/images/talent-05_MarcusBrown.png", id: "marcus" },
    { name: "Zara Mitchell", image: "../SetCast/images/talent-06_ZaraMitchell.png", id: "zara" },
    { name: "Sophia Anderson", image: "../SetCast/images/talent-07_SophiaAnderson.png", id: "sophia" },
    { name: "Liam Garcia", image: "../SetCast/images/talent-08_LiamGarcia.png", id: "liam" },
    { name: "Nina Davis", image: "../SetCast/images/talent-09_NinaDavis.png", id: "nina" },
    { name: "Ava Martinez", image: "../SetCast/images/talent-10_AvaMartinez.png", id: "ava" },
    { name: "Luna Park", image: "../SetCast/images/talent-11_LunaPark.png", id: "luna" },
    { name: "Noah Chen", image: "../SetCast/images/talent-12_NoahChen.png", id: "noah" },
    { name: "Kai Thompson", image: "../SetCast/images/talent-13_KaiThompson.png", id: "kai" },
    { name: "Riley Morgan", image: "../SetCast/images/talent-14_RileyMorgan.png", id: "riley" },
    { name: "Jordan Lee", image: "../SetCast/images/talent-15_JordanLee.png", id: "jordan" },
    { name: "Isabella Rodriguez", image: "../SetCast/images/talent-16_IsabellaRodriguez.png", id: "isabella" },
    { name: "Quinn Santos", image: "../SetCast/images/talent-17_QuinnSantos.png", id: "quinn" },
    { name: "Casey White", image: "../SetCast/images/talent-18_CaseyWhite.png", id: "casey" },
    { name: "Sam Wilson", image: "../SetCast/images/talent-19_SamWilson.png", id: "sam" },
    { name: "Drew Martinez", image: "../SetCast/images/talent-20_DrewMartinez.png", id: "drew" },
    { name: "Avery Taylor", image: "../SetCast/images/talent-21_AveryTaylor.png", id: "avery" },
    { name: "Parker Miller", image: "../SetCast/images/talent-22_ParkerMiller.png", id: "parker" },
    { name: "Morgan Kim", image: "../SetCast/images/talent-23_MorganKim.png", id: "morgan" },
    { name: "Andre Jackson", image: "../SetCast/images/talent-24_AndreJackson.png", id: "andre" }
];

// Initialize
function init() {
    renderModelGrid();
    updateGenerateButton();
    setupDragAndDrop();
}

// Setup drag-and-drop for all upload areas
function setupDragAndDrop() {
    const categories = ['head', 'face', 'outerwear', 'longsleeve', 'shortsleeve', 'bottom', 'shoes', 'accessories'];

    categories.forEach(category => {
        const uploadArea = document.querySelector(`[data-category="${category}"] .upload-area`);
        if (!uploadArea) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop area when item is dragged over it
        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragging');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragging');
            }, false);
        });

        // Handle dropped files
        uploadArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;

            if (files.length > 0) {
                const file = files[0];
                // Create a fake event object to reuse handleUpload
                const fakeEvent = { target: { files: [file] } };
                handleUpload(fakeEvent, category);
            }
        }, false);
    });
}

// Render model grid
function renderModelGrid() {
    const grid = document.getElementById('modelGrid');
    grid.innerHTML = models.map(model => {
        const nameParts = model.name.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        return `
            <div class="model-option" onclick="selectModel('${model.id}')">
                <img src="${model.image}" class="model-thumbnail"
                     onerror="this.style.background='#e5e5e5';">
                <div class="model-name">${firstName}<br>${lastName}</div>
            </div>
        `;
    }).join('');
}

// Select model
function selectModel(modelId) {
    state.selectedModel = models.find(m => m.id === modelId);

    // Update UI
    document.querySelectorAll('.model-option').forEach(option => {
        option.classList.remove('selected');
    });
    event.target.closest('.model-option').classList.add('selected');

    updateGenerateButton();
}

// Trigger file upload
function triggerUpload(category) {
    document.getElementById(`upload-${category}`).click();
}

// Handle file upload
async function handleUpload(event, category) {
    const file = event.target.files[0];
    if (!file) return;

    // Store file
    state.items[category].file = file;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById(`preview-${category}`);
        const uploadArea = preview.parentElement;
        const dropdown = document.getElementById(`style-${category}`);

        preview.src = e.target.result;
        preview.classList.add('show');
        uploadArea.classList.add('has-image');
        uploadArea.querySelector('.upload-icon').style.display = 'none';
        uploadArea.querySelector('.upload-text').style.display = 'none';

        // Hide dropdown when image is uploaded
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    };
    reader.readAsDataURL(file);

    // Show analyzing loader
    const loader = document.getElementById(`loader-${category}`);
    const uploadArea = document.getElementById(`preview-${category}`).parentElement;
    const preview = document.getElementById(`preview-${category}`);

    uploadArea.classList.add('analyzing');
    preview.classList.add('analyzing');
    if (loader) {
        loader.classList.add('show');
    }

    const startTime = performance.now();

    try {
        const analysis = await analyzeGarment(file);
        state.items[category].analysis = analysis;

        // Time tracking log with duration
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);
        const timestamp = new Date().toLocaleTimeString();
        console.log(`✓ [${timestamp}] Garment analyzed (${category}) in ${duration}s:`, analysis);

        // Helper to capitalize first letter only
        const capitalizeFirst = (str) => {
            if (!str) return str;
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        // Format color - simplify multicolor
        let displayColor = analysis.color;
        if (displayColor.toLowerCase().includes('multicolor') || displayColor.includes(',') || displayColor.includes(' and ')) {
            displayColor = 'Multicolor';
        } else {
            displayColor = capitalizeFirst(displayColor);
        }

        // Show analysis with formatted display
        const details = document.getElementById(`details-${category}`);
        details.innerHTML = `
            <strong>Analyzed:</strong><br>
            Type: ${capitalizeFirst(analysis.garment_type)}<br>
            Color: ${displayColor}<br>
            Material: ${capitalizeFirst(analysis.material)}<br>
            Style: ${capitalizeFirst(analysis.style)}
        `;
        details.classList.add('show');
    } catch (error) {
        showError('Failed to analyze image: ' + error.message);
    } finally {
        // Hide analyzing loader
        uploadArea.classList.remove('analyzing');
        preview.classList.remove('analyzing');
        if (loader) {
            loader.classList.remove('show');
        }
    }

    updateGenerateButton();
}

// Analyze garment with GPT-4V
async function analyzeGarment(file) {
    const base64 = await fileToBase64(file);

    const response = await fetch('http://localhost:3001/api/analyze-garment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
    });

    if (!response.ok) {
        throw new Error('Analysis failed');
    }

    return await response.json();
}

// Clear item
function clearItem(category) {
    state.items[category] = { file: null, analysis: null, style: state.items[category].style };

    // Reset UI
    const preview = document.getElementById(`preview-${category}`);
    const uploadArea = preview.parentElement;
    const details = document.getElementById(`details-${category}`);
    const dropdown = document.getElementById(`style-${category}`);

    preview.classList.remove('show');
    preview.src = '';
    uploadArea.classList.remove('has-image');
    uploadArea.querySelector('.upload-icon').style.display = 'block';
    uploadArea.querySelector('.upload-text').style.display = 'block';
    details.classList.remove('show');

    // Show dropdown again when cleared
    if (dropdown) {
        dropdown.style.display = 'block';
    }

    // Reset file input
    document.getElementById(`upload-${category}`).value = '';

    updateGenerateButton();
}

// Update style dropdown
function updateStyle(category, style) {
    state.items[category].style = style;
    updateGenerateButton();
}

// Attach style dropdown listeners
document.querySelectorAll('.style-dropdown').forEach(dropdown => {
    dropdown.addEventListener('change', (e) => {
        const category = e.target.id.replace('style-', '');
        updateStyle(category, e.target.value);
    });
});

// Update generate button state
function updateGenerateButton() {
    const btn = document.getElementById('generateBtn');
    const canGenerate = state.selectedModel !== null;
    btn.disabled = !canGenerate;
}

// Build prompt
function buildPrompt() {
    // Separate uploaded items from style-only items
    const uploadedItems = [];
    const styleOnlyItems = [];

    // Process all categories and separate uploaded vs style-only
    const allCategories = ['outerwear', 'longsleeve', 'shortsleeve', 'bottom', 'shoes', 'head', 'face', 'accessories'];

    allCategories.forEach(category => {
        const data = state.items[category];

        if (data.file && data.analysis) {
            // Uploaded item - add "these exact" emphasis
            uploadedItems.push(`these exact ${data.analysis.color} ${data.analysis.garment_type}`);
        } else if (data.style && data.style !== '') {
            // Style selection only
            if (category === 'face' || category === 'accessories') {
                styleOnlyItems.push(data.style);
            } else {
                const names = {
                    head: 'hat',
                    outerwear: 'jacket',
                    longsleeve: 'shirt',
                    shortsleeve: 'shirt',
                    bottom: 'pants',
                    shoes: 'shoes'
                };
                styleOnlyItems.push(`${data.style} ${names[category] || category}`);
            }
        }
    });

    // Build final prompt
    let prompt = '';

    // Start with basic intro
    if (state.selectedModel && modelDescriptions[state.selectedModel.id]) {
        // Shorter model description - just key features
        const modelDesc = modelDescriptions[state.selectedModel.id].overall_description;
        // Extract just gender and age if possible, otherwise use first part
        const shortDesc = modelDesc.split(',')[0] || modelDesc.substring(0, 50);
        prompt = `Editorial fashion photo of ${shortDesc}`;
    } else {
        prompt = `Editorial fashion photo of this model`;
    }

    // Add uploaded items FIRST and EARLY with emphasis
    if (uploadedItems.length > 0) {
        prompt += ` wearing ${uploadedItems.join(', ')}`;
    }

    // Add style-only items after uploaded items
    if (styleOnlyItems.length > 0) {
        if (uploadedItems.length > 0) {
            prompt += `, styled with ${styleOnlyItems.join(', ')}`;
        } else {
            prompt += ` wearing ${styleOnlyItems.join(', ')}`;
        }
    }

    // Add minimal background instruction at the end
    prompt += `. Clean minimal background, professional studio lighting.`;

    return prompt;
}

// Generate styled look
async function generateStyled() {
    if (!state.selectedModel) {
        showError('Please select a model first');
        return;
    }

    const basePrompt = buildPrompt();

    // Show prompt preview
    const preview = document.getElementById('promptPreview');
    preview.textContent = `Base Prompt: ${basePrompt}\n\nEnhancing with LLM...`;
    preview.classList.add('show');

    showLoading(true);
    document.getElementById('resultsSection').classList.remove('show');

    const totalStartTime = performance.now();

    try {
        // Convert model image to base64
        console.log(`📷 Converting model image to base64...`);
        const modelConvertStart = performance.now();
        const modelImageResponse = await fetch(state.selectedModel.image);
        const modelImageBlob = await modelImageResponse.blob();
        const modelImageBase64 = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(modelImageBlob);
        });
        const modelConvertDuration = ((performance.now() - modelConvertStart) / 1000).toFixed(2);
        console.log(`✓ Model image converted in ${modelConvertDuration}s`);

        // Get all image URLs starting with model
        const imageUrls = [modelImageBase64];

        // Add uploaded garment images
        for (const [category, data] of Object.entries(state.items)) {
            if (data.file) {
                const base64 = await fileToBase64(data.file);
                imageUrls.push(base64);
            }
        }

        console.log(`📤 Sending ${imageUrls.length} images to API (1 model + ${imageUrls.length - 1} garments)`);

        // Time tracking log - sending to API
        const apiStartTime = performance.now();
        const sendTimestamp = new Date().toLocaleTimeString();
        console.log(`✓ [${sendTimestamp}] Sending to API for prompt enhancement and generation...`);

        // Get generation settings
        const numImages = parseInt(document.getElementById('numImages').value);
        const aspectRatio = document.getElementById('aspectRatio').value;

        // Call API
        const response = await fetch('http://localhost:3001/api/generate-styled', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: basePrompt,
                imageUrls: imageUrls,
                items: state.items,
                numImages: numImages,
                aspectRatio: aspectRatio
            })
        });

        if (!response.ok) {
            throw new Error('Generation failed');
        }

        const result = await response.json();

        // Time tracking logs with durations
        const apiDuration = ((performance.now() - apiStartTime) / 1000).toFixed(2);
        const totalDuration = ((performance.now() - totalStartTime) / 1000).toFixed(2);

        const enhancedTimestamp = new Date().toLocaleTimeString();
        console.log(`✓ [${enhancedTimestamp}] Prompt enhanced and sent to Nano Banana`);
        console.log(`   Enhanced prompt:`, result.enhancedPrompt);

        const finalTimestamp = new Date().toLocaleTimeString();
        console.log(`✓ [${finalTimestamp}] Generation complete in ${apiDuration}s (total: ${totalDuration}s)`);
        console.log(`   Generated ${result.images.length} images:`, result.images);

        // Update preview with enhanced prompt
        preview.textContent = `Enhanced Prompt: ${result.enhancedPrompt}`;

        // Store enhanced prompt and images for lightbox
        state.lastGeneratedPrompt = result.enhancedPrompt;
        lightboxImages = result.images;

        // Show results - multiple images with click handlers
        const resultsSection = document.getElementById('resultsSection');
        const resultsContainer = resultsSection.querySelector('.results-grid') || createResultsGrid();
        resultsContainer.innerHTML = result.images.map((url, index) => `
            <img src="${url}" class="result-image" onclick="openLightbox('${url}')">
        `).join('');
        resultsSection.classList.add('show');

    } catch (error) {
        showError('Generation failed: ' + error.message);
    } finally {
        showLoading(false);
    }
}

// Helper: File to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Helper: Create results grid if it doesn't exist
function createResultsGrid() {
    const resultsSection = document.getElementById('resultsSection');
    const grid = document.createElement('div');
    grid.className = 'results-grid';
    resultsSection.appendChild(grid);
    return grid;
}

// Show/hide loading
function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
}

// Show error
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    setTimeout(() => errorDiv.classList.remove('show'), 5000);
}

// Lightbox functions
let currentLightboxImage = null;
let lightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imageUrl) {
    currentLightboxImage = imageUrl;

    // Find index of clicked image
    currentLightboxIndex = lightboxImages.indexOf(imageUrl);
    if (currentLightboxIndex === -1) {
        currentLightboxIndex = 0;
    }

    updateLightboxContent();
}

function updateLightboxContent() {
    const imageUrl = lightboxImages[currentLightboxIndex];
    if (!imageUrl) return;

    // Set main image
    document.getElementById('lightboxImage').src = imageUrl;
    currentLightboxImage = imageUrl;

    // Update counter
    const counter = document.getElementById('lightboxCounter');
    if (lightboxImages.length > 1) {
        counter.textContent = `${currentLightboxIndex + 1} / ${lightboxImages.length}`;
        counter.style.display = 'block';
    } else {
        counter.style.display = 'none';
    }

    // Update navigation buttons
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    if (lightboxImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';

        // Disable/enable based on position
        if (currentLightboxIndex === 0) {
            prevBtn.classList.add('disabled');
            prevBtn.disabled = true;
        } else {
            prevBtn.classList.remove('disabled');
            prevBtn.disabled = false;
        }

        if (currentLightboxIndex === lightboxImages.length - 1) {
            nextBtn.classList.add('disabled');
            nextBtn.disabled = true;
        } else {
            nextBtn.classList.remove('disabled');
            nextBtn.disabled = false;
        }
    }

    // Set model info
    const modelSection = document.getElementById('lightboxModel');
    if (state.selectedModel) {
        modelSection.innerHTML = `
            <div style="display: flex; gap: 12px; align-items: start;">
                <img src="${state.selectedModel.image}" style="width: 60px; height: 80px; object-fit: cover; border: 1px solid #e5e5e5;">
                <div style="flex: 1; font-size: 12px; line-height: 1.6;">
                    <div style="font-weight: 500;">${state.selectedModel.name}</div>
                </div>
            </div>
        `;
    }

    // Set styling items
    const itemsSection = document.getElementById('lightboxItems');
    const categoryNames = {
        head: 'Head',
        face: 'Face & Neck',
        outerwear: 'Outerwear',
        longsleeve: 'Long Sleeve',
        shortsleeve: 'Short Sleeve',
        bottom: 'Bottom',
        shoes: 'Shoes',
        accessories: 'Accessories'
    };

    let itemsHTML = '';
    for (const [category, data] of Object.entries(state.items)) {
        if (data.file && data.analysis) {
            // Helper to capitalize first letter only
            const capitalizeFirst = (str) => {
                if (!str) return str;
                return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
            };

            // Format color - simplify multicolor
            let displayColor = data.analysis.color;
            if (displayColor.toLowerCase().includes('multicolor') || displayColor.includes(',') || displayColor.includes(' and ')) {
                displayColor = 'Multicolor';
            } else {
                displayColor = capitalizeFirst(displayColor);
            }

            const preview = document.getElementById(`preview-${category}`);
            itemsHTML += `
                <div class="lightbox-item">
                    <img src="${preview.src}" class="lightbox-item-image">
                    <div class="lightbox-item-details">
                        <div class="lightbox-item-label">${categoryNames[category]}</div>
                        <div class="lightbox-item-value">
                            ${capitalizeFirst(data.analysis.garment_type)}<br>
                            ${displayColor} · ${capitalizeFirst(data.analysis.material)}<br>
                            ${capitalizeFirst(data.analysis.style)} style
                        </div>
                    </div>
                </div>
            `;
        }
    }
    itemsSection.innerHTML = itemsHTML || '<div style="color: #a3a3a3; font-size: 12px;">No items uploaded</div>';

    // Show lightbox
    document.getElementById('lightbox').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('show');
    document.body.style.overflow = 'auto';
    currentLightboxImage = null;
}

function navigateLightbox(direction) {
    const newIndex = currentLightboxIndex + direction;

    if (newIndex >= 0 && newIndex < lightboxImages.length) {
        currentLightboxIndex = newIndex;
        updateLightboxContent();
    }
}

function downloadImage() {
    if (!currentLightboxImage) return;

    const link = document.createElement('a');
    link.href = currentLightboxImage;
    link.download = `styled-look-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Close lightbox on ESC key, navigate with arrow keys
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox.classList.contains('show')) return;

    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
    } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
    }
});

// Close lightbox when clicking outside
document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') {
        closeLightbox();
    }
});

// Copy prompt to clipboard
async function copyPrompt() {
    const promptBtn = document.getElementById('copyPromptBtn');
    const promptText = state.lastGeneratedPrompt || '';

    if (!promptText) {
        return;
    }

    try {
        await navigator.clipboard.writeText(promptText);

        // Show "Copied!" confirmation in black
        const originalText = promptBtn.textContent;
        promptBtn.textContent = 'Copied!';
        promptBtn.classList.add('copied');

        // After 1 second, start fading back to white (0.5s fade via CSS)
        setTimeout(() => {
            promptBtn.classList.remove('copied');
            // After the 0.5s fade completes, reset the text
            setTimeout(() => {
                promptBtn.textContent = originalText;
            }, 500);
        }, 1000);
    } catch (err) {
        console.error('Failed to copy:', err);
        promptBtn.textContent = 'Failed to copy';
        setTimeout(() => {
            promptBtn.textContent = 'Prompt';
        }, 2000);
    }
}

// Initialize on load
init();
