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
        shoes: { file: null, analysis: null, style: 'minimal' }
    }
};

// Models data (matching Looks page)
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
    { name: "Noah Chen", image: "../SetCast/images/talent-12_NoahChen.png", id: "noah" }
];

// Initialize
function init() {
    renderModelGrid();
    updateGenerateButton();
}

// Render model grid
function renderModelGrid() {
    const grid = document.getElementById('modelGrid');
    grid.innerHTML = models.map(model => `
        <div class="model-option" onclick="selectModel('${model.id}')">
            <img src="${model.image}" class="model-thumbnail"
                 onerror="this.style.background='#e5e5e5';">
            <div class="model-name">${model.name}</div>
        </div>
    `).join('');
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

        preview.src = e.target.result;
        preview.classList.add('show');
        uploadArea.classList.add('has-image');
        uploadArea.querySelector('.upload-icon').style.display = 'none';
        uploadArea.querySelector('.upload-text').style.display = 'none';
    };
    reader.readAsDataURL(file);

    // Analyze image
    showLoading(true);
    try {
        const analysis = await analyzeGarment(file);
        state.items[category].analysis = analysis;

        // Show analysis
        const details = document.getElementById(`details-${category}`);
        details.innerHTML = `
            <strong>Analyzed:</strong><br>
            Type: ${analysis.garment_type}<br>
            Color: ${analysis.color}<br>
            Material: ${analysis.material}<br>
            Style: ${analysis.style}
        `;
        details.classList.add('show');
    } catch (error) {
        showError('Failed to analyze image: ' + error.message);
    } finally {
        showLoading(false);
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

    preview.classList.remove('show');
    preview.src = '';
    uploadArea.classList.remove('has-image');
    uploadArea.querySelector('.upload-icon').style.display = 'block';
    uploadArea.querySelector('.upload-text').style.display = 'block';
    details.classList.remove('show');

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
    let prompt = `This exact person wearing `;
    const items = [];

    // Process each category
    Object.entries(state.items).forEach(([category, data]) => {
        if (data.file && data.analysis) {
            // Has uploaded image - use exact reference
            items.push(`these exact ${data.analysis.color} ${data.analysis.garment_type} (${data.analysis.material}, ${data.analysis.style} style)`);
        } else if (data.style && data.style !== '') {
            // No upload but has style selection
            const categoryNames = {
                head: 'hat',
                face: 'accessories',
                outerwear: 'jacket',
                longsleeve: 'long sleeve top',
                shortsleeve: 'short sleeve top',
                bottom: 'pants',
                shoes: 'shoes'
            };
            if (categoryNames[category]) {
                items.push(`${data.style} ${categoryNames[category]}`);
            }
        }
    });

    prompt += items.join(', ');
    prompt += '. Editorial fashion photography, clean background, professional lighting, high quality.';

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

    try {
        // Get all image URLs
        const imageUrls = [state.selectedModel.image];

        // Add uploaded garment images
        for (const [category, data] of Object.entries(state.items)) {
            if (data.file) {
                const base64 = await fileToBase64(data.file);
                imageUrls.push(base64);
            }
        }

        // Call API
        const response = await fetch('http://localhost:3001/api/generate-styled', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: basePrompt,
                imageUrls: imageUrls,
                items: state.items
            })
        });

        if (!response.ok) {
            throw new Error('Generation failed');
        }

        const result = await response.json();

        // Update preview with enhanced prompt
        preview.textContent = `Enhanced Prompt: ${result.enhancedPrompt}`;

        // Show result
        document.getElementById('resultImage').src = result.imageUrl;
        document.getElementById('resultsSection').classList.add('show');

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

// Initialize on load
init();
