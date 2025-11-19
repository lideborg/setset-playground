// State management
const state = {
    uploadedImages: [], // { file, url, analysis }
    angleCards: Array(6).fill(null).map(() => ({ selectedImage: null, selectedAngle: null, result: null }))
};

// Camera angle options
const cameraAngles = [
    { value: 'wide-angle', label: 'Wide Angle' },
    { value: 'fisheye', label: 'Fisheye' },
    { value: 'close-up', label: 'Close-up' },
    { value: 'birds-eye', label: "Bird's Eye View" },
    { value: 'worms-eye', label: "Worm's Eye View" }
];

// Initialize
function init() {
    setupUploadZone();
    renderAngleCards();
    updateGenerateButton();
}

// Setup drag and drop
function setupUploadZone() {
    const uploadZone = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');

    // Click to upload
    uploadZone.addEventListener('click', () => {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.add('dragging');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadZone.addEventListener(eventName, () => {
            uploadZone.classList.remove('dragging');
        }, false);
    });

    uploadZone.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    }, false);
}

// Handle uploaded files
async function handleFiles(files) {
    const filesArray = Array.from(files);

    // Limit to 5 images
    const remainingSlots = 5 - state.uploadedImages.length;
    const filesToAdd = filesArray.slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
        alert('Maximum 5 images allowed');
        return;
    }

    console.log(`📤 Uploading ${filesToAdd.length} image(s)...`);

    for (const file of filesToAdd) {
        const imageData = {
            file: file,
            url: URL.createObjectURL(file),
            analysis: null,
            analyzing: true
        };

        state.uploadedImages.push(imageData);
        renderImagePreviews();

        // Analyze image with GPT-4V
        try {
            console.log(`🔍 Analyzing: ${file.name}...`);
            const analysis = await analyzeImage(file);
            imageData.analysis = analysis;
            imageData.analyzing = false;
            console.log(`✅ Analysis complete: ${analysis}`);
        } catch (error) {
            console.error('❌ Analysis failed:', error);
            imageData.analysis = 'Unknown image';
            imageData.analyzing = false;
        }

        renderImagePreviews();
    }

    updateImageSelectors();
    updateGenerateButton();
}

// Analyze image with GPT-4 Vision
async function analyzeImage(file) {
    const base64 = await fileToBase64(file);

    const response = await fetch('http://localhost:3001/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageUrl: base64,
            prompt: 'Describe what is in this image in one short sentence (10 words max). Be specific about the main subject.'
        })
    });

    if (!response.ok) {
        throw new Error('Analysis failed');
    }

    const result = await response.json();
    return result.description || 'Unknown image';
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Render image previews
function renderImagePreviews() {
    const container = document.getElementById('imagesPreview');

    container.innerHTML = state.uploadedImages.map((img, index) => `
        <div class="image-preview">
            <img src="${img.url}" alt="Uploaded image ${index + 1}">
            <button class="remove-btn" onclick="removeImage(${index})">×</button>
            ${img.analyzing ? '<div class="analyzing">Analyzing...</div>' : ''}
        </div>
    `).join('');
}

// Remove image
function removeImage(index) {
    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(state.uploadedImages[index].url);

    state.uploadedImages.splice(index, 1);
    renderImagePreviews();
    updateImageSelectors();
    updateGenerateButton();
}

// Render angle cards
function renderAngleCards() {
    const grid = document.getElementById('anglesGrid');

    grid.innerHTML = state.angleCards.map((card, index) => `
        <div class="angle-card">
            <div class="angle-label">Angle ${index + 1}</div>

            <select class="image-selector" id="image-${index}" onchange="selectImage(${index}, this.value)">
                <option value="">Select Image</option>
            </select>

            <select class="angle-select" id="angle-${index}" onchange="selectAngle(${index}, this.value)">
                <option value="">Select Angle</option>
                ${cameraAngles.map(angle => `
                    <option value="${angle.value}">${angle.label}</option>
                `).join('')}
            </select>

            <div class="angle-result" id="result-${index}">
                <div class="loading">Result will appear here</div>
            </div>
        </div>
    `).join('');

    updateImageSelectors();
}

// Update image selectors in all cards
function updateImageSelectors() {
    state.angleCards.forEach((card, index) => {
        const selector = document.getElementById(`image-${index}`);
        if (!selector) return;

        const currentValue = selector.value;

        selector.innerHTML = `
            <option value="">Select Image</option>
            ${state.uploadedImages.map((img, imgIndex) => `
                <option value="${imgIndex}" ${currentValue == imgIndex ? 'selected' : ''}>
                    Image ${imgIndex + 1}${img.analysis ? ` - ${img.analysis.substring(0, 30)}` : ''}
                </option>
            `).join('')}
        `;
    });
}

// Select image for angle card
function selectImage(cardIndex, imageIndex) {
    if (imageIndex === '') {
        state.angleCards[cardIndex].selectedImage = null;
    } else {
        state.angleCards[cardIndex].selectedImage = parseInt(imageIndex);
    }
    updateGenerateButton();
}

// Select angle for card
function selectAngle(cardIndex, angle) {
    state.angleCards[cardIndex].selectedAngle = angle || null;
    updateGenerateButton();
}

// Update generate button state
function updateGenerateButton() {
    const btn = document.getElementById('generateBtn');

    // Check if at least one card has both image and angle selected
    const hasValidCard = state.angleCards.some(card =>
        card.selectedImage !== null && card.selectedAngle !== null
    );

    btn.disabled = !hasValidCard;
}

// Generate transformations
async function generateTransformations() {
    const btn = document.getElementById('generateBtn');
    btn.disabled = true;
    btn.textContent = 'Generating...';

    console.log('\n🎬 Starting camera angle transformations...\n');

    // Process each card that has both image and angle selected
    const promises = state.angleCards.map(async (card, index) => {
        if (card.selectedImage === null || card.selectedAngle === null) {
            return;
        }

        const imageData = state.uploadedImages[card.selectedImage];
        const angleName = cameraAngles.find(a => a.value === card.selectedAngle)?.label;

        console.log(`📸 Card ${index + 1}: Transforming to ${angleName}...`);

        // Show loading state
        const resultDiv = document.getElementById(`result-${index}`);
        resultDiv.classList.add('show');
        resultDiv.innerHTML = '<div class="loading">Generating...</div>';

        try {
            // Build prompt based on image analysis and camera angle
            const prompt = buildPrompt(imageData.analysis, card.selectedAngle);
            console.log(`   Prompt: ${prompt}`);

            // Call nano-banana API
            const result = await callNanoBananaAPI(imageData.file, prompt);

            // Display result
            resultDiv.innerHTML = `<img src="${result}" alt="Transformed ${angleName}">`;
            card.result = result;

            console.log(`   ✅ Card ${index + 1} complete`);
        } catch (error) {
            console.error(`   ❌ Card ${index + 1} failed:`, error);
            resultDiv.innerHTML = `<div class="loading">Failed: ${error.message}</div>`;
        }
    });

    await Promise.all(promises);

    console.log('\n✨ All transformations complete!\n');

    btn.disabled = false;
    btn.textContent = 'Generate Transformations';
}

// Build prompt based on analysis and camera angle
function buildPrompt(imageAnalysis, cameraAngle) {
    const angleDescriptions = {
        'wide-angle': 'wide-angle lens perspective with dramatic depth and expanded field of view',
        'fisheye': 'fisheye lens effect with extreme barrel distortion and 180-degree view',
        'close-up': 'extreme close-up shot with shallow depth of field, detailed and intimate',
        'birds-eye': "bird's eye view from directly above, top-down perspective looking straight down",
        'worms-eye': "worm's eye view from ground level looking up, dramatic low angle perspective"
    };

    const angleDesc = angleDescriptions[cameraAngle] || cameraAngle;

    return `Transform this image of ${imageAnalysis} to have a ${angleDesc}. Maintain the subject and scene but change the camera perspective dramatically. Keep the same lighting and style.`;
}

// Call nano-banana API (fal.ai)
async function callNanoBananaAPI(imageFile, prompt) {
    const base64 = await fileToBase64(imageFile);

    const response = await fetch('http://localhost:3001/api/nano-banana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            imageUrl: base64,
            prompt: prompt,
            strength: 0.75 // How much to transform (0.5-1.0, higher = more transformation)
        })
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'API call failed' }));
        throw new Error(error.error || 'Failed to generate transformation');
    }

    const result = await response.json();
    return result.image;
}

// Initialize on load
init();

// Attach to window for onclick handlers
window.removeImage = removeImage;
window.selectImage = selectImage;
window.selectAngle = selectAngle;

// Attach generate button
document.getElementById('generateBtn').addEventListener('click', generateTransformations);
