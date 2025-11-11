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
    lastGeneratedPrompt: null,
    // Sequential generation state
    currentStep: 0,
    uploadedItemsList: [],
    currentBaseImage: null,
    selectedImageForNextStep: null,
    allStepResults: [],
    isGenerating: false
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
    renderStylingCards();
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
            <div class="model-card" onclick="selectModel('${model.id}')">
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
    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.target.closest('.model-card').classList.add('selected');

    updateBuildTimeline();
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
    const timestamp = new Date().toLocaleTimeString();

    console.log(`\n📤 [${timestamp}] Analyzing ${category} garment...`);

    try {
        const analysis = await analyzeGarment(file);
        state.items[category].analysis = analysis;

        // Time tracking log with duration
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.log(`✅ [${timestamp}] ${getCategoryName(category)} analyzed in ${duration}s:`);
        console.log(`   Type: ${analysis.garment_type}`);
        console.log(`   Color: ${analysis.color}`);
        console.log(`   Material: ${analysis.material}`);
        console.log(`   Style: ${analysis.style}\n`);

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
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.error(`❌ [${timestamp}] Analysis failed for ${category} after ${duration}s:`, error.message);
        showError('Failed to analyze image: ' + error.message);
    } finally {
        // Hide analyzing loader
        uploadArea.classList.remove('analyzing');
        preview.classList.remove('analyzing');
        if (loader) {
            loader.classList.remove('show');
        }
    }

    updateBuildTimeline();
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
        const errorData = await response.json().catch(() => ({ error: 'Analysis failed' }));
        throw new Error(errorData.error || 'Analysis failed');
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

    updateBuildTimeline();
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
// Generate styled look - SEQUENTIAL VERSION
// Generate styled look - INTERACTIVE MULTI-STEP VERSION
async function generateStyled() {
    // Prevent concurrent execution
    if (state.isGenerating) {
        console.warn('⚠️  Generation already in progress');
        showError('Generation already in progress, please wait...');
        return;
    }

    console.log('\n🎬 ============================================');
    console.log('🎬 STARTING INTERACTIVE SEQUENTIAL GENERATION');
    console.log('🎬 ============================================\n');

    if (!state.selectedModel) {
        showError('Please select a model first');
        return;
    }

    console.log(`👤 Model Selected: ${state.selectedModel.name}`);

    // Hide previous results
    document.getElementById('resultsSection').classList.remove('show');

    // Build list of uploaded items in PRIORITY order
    // Order: Short sleeve → Long sleeve → Bottom → Outerwear → Shoes → Head → Face/Neck → Accessories
    const categoryOrder = ['shortsleeve', 'longsleeve', 'bottom', 'outerwear', 'shoes', 'head', 'face', 'accessories'];
    const uploadedItems = [];

    console.log('\n📦 Checking uploaded items...');
    categoryOrder.forEach(category => {
        const data = state.items[category];
        console.log(`   🔍 ${category}: ${data.file ? '✓ file' : '✗ no file'} | ${data.analysis ? '✓ analysis' : '✗ no analysis'}`);
        if (data.file && data.analysis) {
            uploadedItems.push({
                category,
                file: data.file,
                analysis: data.analysis,
                name: getCategoryName(category)
            });
            console.log(`      ✅ Added to queue: ${getCategoryName(category)} (${data.analysis.color} ${data.analysis.garment_type})`);
        } else {
            if (data.file && !data.analysis) {
                console.warn(`      ⚠️  SKIPPED - Missing analysis!`);
            }
        }
    });

    console.log('\n📋 Generation Queue:');
    console.log(`   ${uploadedItems.map((item, i) => `${i + 1}. ${item.name}`).join('\n   ')}`);
    console.log(`   Total steps: ${uploadedItems.length}\n`);

    if (uploadedItems.length === 0) {
        showError('Please upload at least one garment image');
        return;
    }

    // Initialize state for sequential generation
    state.currentStep = 0;
    state.uploadedItemsList = uploadedItems;
    state.selectedImageForNextStep = null;
    state.allStepResults = [];

    // Convert model image to base64
    console.log('🖼️  Loading model base image...');
    const modelImageResponse = await fetch(state.selectedModel.image);
    const modelImageBlob = await modelImageResponse.blob();
    state.currentBaseImage = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(modelImageBlob);
    });
    console.log('   ✓ Model image loaded\n');

    // Show process description
    const processDesc = document.getElementById('processDescription');
    processDesc.innerHTML = `
        <strong>Interactive Sequential Generation:</strong><br>
        Building your look in ${uploadedItems.length} steps. At each step, you'll see 4 variations and pick your favorite to continue.
    `;

    // Show progress section
    const progressSection = document.getElementById('progressSection');
    progressSection.classList.add('show');

    // Initialize progress steps
    initializeProgressSteps(uploadedItems);

    // Generate first step
    console.log('🚀 Starting Step 1...\n');
    await generateCurrentStep();
}

// Generate images for current step
async function generateCurrentStep() {
    // Prevent concurrent generations
    if (state.isGenerating) {
        console.warn('⚠️  Generation already in progress, ignoring duplicate call');
        return;
    }

    state.isGenerating = true;

    const item = state.uploadedItemsList[state.currentStep];
    const aspectRatio = document.getElementById('aspectRatio').value;
    const stepNum = state.currentStep + 1;
    const totalSteps = state.uploadedItemsList.length;

    console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📍 STEP ${stepNum}/${totalSteps}: ${item.name.toUpperCase()}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`   Item: ${item.analysis.color} ${item.analysis.garment_type}`);
    console.log(`   Material: ${item.analysis.material}`);
    console.log(`   Style: ${item.analysis.style}\n`);

    // Update progress
    updateProgressStep(state.currentStep, 'generating');

    // Build prompt for this step
    let stepPrompt;
    if (state.currentStep === 0) {
        console.log('🎯 Building first step prompt (model + garment)...');
        stepPrompt = buildFirstStepPrompt(item);
    } else {
        console.log('🎯 Building prompt using previous step\'s image...');
        // Use analysis from previous step to maintain exact consistency
        const previousStepAnalysis = state.allStepResults[state.currentStep - 1]?.analysis || 'a model in a white photo studio';
        stepPrompt = `Take this EXACT image of ${previousStepAnalysis} and add these EXACT ${item.analysis.color} ${item.analysis.garment_type} to this exact model. Maintain the exact same white studio background, pose, lighting, and framing. Full body shot visible from head to toe.`;
    }

    console.log(`   📝 Prompt: "${stepPrompt.substring(0, 120)}..."\n`);

    const startTime = performance.now();

    try {
        // Convert garment image to base64
        const garmentBase64 = await fileToBase64(item.file);

        // Use selected image from previous step or initial model image
        const baseImage = state.selectedImageForNextStep || state.currentBaseImage;
        const imageUrls = [baseImage, garmentBase64];

        console.log(`🎨 Calling Nanobanana API to generate 4 variations...`);
        console.log(`   Aspect ratio: ${aspectRatio}`);
        console.log(`   Base image: ${state.currentStep === 0 ? 'Model photo' : 'Previous step result'}`);

        // Call API for 4 images
        const response = await fetch('http://localhost:3001/api/generate-styled', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: stepPrompt,
                imageUrls: imageUrls,
                items: state.items,
                numImages: 4,
                aspectRatio: aspectRatio
            })
        });

        if (!response.ok) {
            throw new Error(`Step ${state.currentStep + 1} generation failed`);
        }

        const result = await response.json();
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);

        console.log(`   ✅ Generated 4 variations in ${duration}s`);
        console.log(`   🖼️  Images ready for selection\n`);

        // Update progress
        updateProgressStep(state.currentStep, 'completed', result.images[0]);

        // Show results with selection UI
        showStepResults(result.images, item);

        // Reset generating flag
        state.isGenerating = false;

    } catch (error) {
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.error(`   ❌ Generation failed after ${duration}s:`, error.message);
        showError('Generation failed: ' + error.message);
        console.error(error);

        // Reset generating flag
        state.isGenerating = false;
    }
}

// Show results for current step with selection UI
function showStepResults(images, item) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    const stepActions = document.getElementById('stepActions');

    const stepNum = state.currentStep + 1;
    const totalSteps = state.uploadedItemsList.length;

    resultsTitle.textContent = `Step ${stepNum} of ${totalSteps}: ${item.name}`;
    resultsSubtitle.textContent = 'Click an image to select it, then continue to the next step';

    const resultsContainer = resultsSection.querySelector('.results-grid') || createResultsGrid();
    resultsContainer.innerHTML = images.map((url, index) => `
        <div style="text-align: center;">
            <img src="${url}"
                 class="result-image"
                 data-image-url="${url}"
                 onclick="selectStepImage('${url}')">
        </div>
    `).join('');

    resultsSection.classList.add('show');
    stepActions.classList.add('show');

    // Update continue button text
    const continueBtn = document.getElementById('continueBtn');
    if (state.currentStep < state.uploadedItemsList.length - 1) {
        continueBtn.textContent = 'Continue to Next Step';
    } else {
        continueBtn.textContent = 'Finish & Show All Results';
    }
    continueBtn.disabled = true; // Will enable when image is selected
}

// Handle image selection
function selectStepImage(imageUrl) {
    // Remove selection from all images
    document.querySelectorAll('.result-image').forEach(img => {
        img.classList.remove('selected');
    });

    // Select clicked image
    const clickedImage = document.querySelector(`[data-image-url="${imageUrl}"]`);
    if (clickedImage) {
        clickedImage.classList.add('selected');
    }

    // Store selected image
    state.selectedImageForNextStep = imageUrl;

    // Enable continue button
    document.getElementById('continueBtn').disabled = false;

    const stepNum = state.currentStep + 1;
    const totalSteps = state.uploadedItemsList.length;
    const imageIndex = Array.from(document.querySelectorAll('.result-image')).indexOf(clickedImage) + 1;

    console.log(`\n✓ Step ${stepNum}/${totalSteps}: Selected variation #${imageIndex}`);
    if (stepNum < totalSteps) {
        console.log(`   Ready to continue to Step ${stepNum + 1}...\n`);
    } else {
        console.log(`   Ready to finish and view all results!\n`);
    }
}

// Continue to next step
async function continueToNextStep() {
    // Prevent concurrent execution
    if (state.isGenerating) {
        console.warn('⚠️  Already processing, please wait...');
        return;
    }

    if (!state.selectedImageForNextStep) {
        showError('Please select an image first');
        return;
    }

    // Disable button to prevent double-clicks
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.disabled = true;

    const currentStepNum = state.currentStep + 1;
    const totalSteps = state.uploadedItemsList.length;

    console.log(`\n⏩ Continuing from Step ${currentStepNum}/${totalSteps}...`);

    // Analyze the selected image for next step
    console.log('🔍 Analyzing selected image for consistency...');
    const imageAnalysis = await analyzeGeneratedImage(state.selectedImageForNextStep);

    // Store this step's result with analysis
    state.allStepResults.push({
        step: state.currentStep + 1,
        item: state.uploadedItemsList[state.currentStep],
        selectedImage: state.selectedImageForNextStep,
        analysis: imageAnalysis
    });

    console.log(`   ✓ Analysis complete: "${imageAnalysis.substring(0, 100)}..."\n`);

    // Move to next step
    state.currentStep++;

    // Check if we're done
    if (state.currentStep >= state.uploadedItemsList.length) {
        console.log('🎉 ============================================');
        console.log('🎉 ALL STEPS COMPLETE!');
        console.log('🎉 ============================================\n');
        console.log(`   Total steps: ${state.allStepResults.length}`);
        console.log(`   Items used: ${state.allStepResults.map(r => r.item.name).join(', ')}\n`);
        showFinalResults();
        return;
    }

    // Generate next step
    document.getElementById('resultsSection').classList.remove('show');
    const nextStepNum = state.currentStep + 1;
    console.log(`🚀 Starting Step ${nextStepNum}/${totalSteps}...\n`);
    await generateCurrentStep();
}

// Analyze generated image to maintain consistency
async function analyzeGeneratedImage(imageUrl) {
    const startTime = performance.now();

    try {
        console.log('   📸 Sending image to GPT-4V for analysis...');

        const response = await fetch('http://localhost:3001/api/analyze-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                imageUrl: imageUrl,
                prompt: 'Describe this fashion photo in detail: What is the model wearing? Describe the background, lighting, and pose. Be specific and concise.'
            })
        });

        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);

        if (!response.ok) {
            console.warn(`   ⚠️  Analysis API returned error (${duration}s), using fallback`);
            return 'a model in a white photo studio';
        }

        const result = await response.json();
        console.log(`   ✓ GPT-4V analysis complete (${duration}s)`);
        return result.description || 'a model in a white photo studio';
    } catch (error) {
        const endTime = performance.now();
        const duration = ((endTime - startTime) / 1000).toFixed(1);
        console.error(`   ❌ Analysis failed after ${duration}s:`, error.message);
        console.log('   Using fallback description');
        return 'a model in a white photo studio';
    }
}

// Show all final results
function showFinalResults() {
    const resultsSection = document.getElementById('resultsSection');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsSubtitle = document.getElementById('resultsSubtitle');
    const stepActions = document.getElementById('stepActions');

    resultsTitle.textContent = 'Final Results - All Steps';
    resultsSubtitle.textContent = 'Here\'s how your look evolved through each step';

    const resultsContainer = resultsSection.querySelector('.results-grid') || createResultsGrid();
    resultsContainer.innerHTML = state.allStepResults.map((result, index) => `
        <div style="text-align: center;">
            <img src="${result.selectedImage}" class="result-image" onclick="openLightbox('${result.selectedImage}')">
            <div style="margin-top: 8px; font-size: 12px; color: #737373;">Step ${result.step}: ${result.item.name}</div>
        </div>
    `).join('');

    stepActions.classList.remove('show');

    // Store for lightbox
    lightboxImages = state.allStepResults.map(r => r.selectedImage);

    resultsSection.classList.add('show');
}

// Helper: Get category display name
function getCategoryName(category) {
    const names = {
        face: 'Face Accessories',
        head: 'Headwear',
        outerwear: 'Outerwear',
        longsleeve: 'Long Sleeve',
        shortsleeve: 'Short Sleeve',
        bottom: 'Bottom',
        shoes: 'Shoes',
        accessories: 'Accessories'
    };
    return names[category] || category;
}

// Helper: Build first step prompt
function buildFirstStepPrompt(firstItem) {
    // Get style-only items for first step
    const styleOnlyItems = [];
    const allCategories = ['outerwear', 'longsleeve', 'shortsleeve', 'bottom', 'shoes', 'head', 'face', 'accessories'];

    allCategories.forEach(category => {
        const data = state.items[category];
        if (!data.file && data.style && data.style !== '') {
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

    let prompt = '';
    if (state.selectedModel && modelDescriptions[state.selectedModel.id]) {
        const modelDesc = modelDescriptions[state.selectedModel.id].overall_description;
        const shortDesc = modelDesc.split(',')[0] || modelDesc.substring(0, 50);
        prompt = `White photorealistic photo studio. Full body shot. Editorial fashion photo of this exact model (${shortDesc})`;
    } else {
        prompt = `White photorealistic photo studio. Full body shot. Editorial fashion photo of this exact model`;
    }

    prompt += ` wearing these exact ${firstItem.analysis.color} ${firstItem.analysis.garment_type}`;

    if (styleOnlyItems.length > 0) {
        prompt += `, styled with ${styleOnlyItems.join(', ')}`;
    }

    prompt += `. Full body visible from head to toe, soft artistic lighting, white studio background.`;

    console.log('🎯 First step prompt:', prompt);
    return prompt;
}

// Initialize progress steps UI
function initializeProgressSteps(uploadedItems) {
    const stepsContainer = document.getElementById('progressSteps');
    stepsContainer.innerHTML = uploadedItems.map((item, index) => `
        <div class="progress-step" id="step-${index}">
            <div class="step-number">${index + 1}</div>
            <img src="${URL.createObjectURL(item.file)}" class="step-image" alt="${item.name}">
            <div class="step-info">
                <div class="step-title">${item.name}</div>
                <div class="step-detail">${item.analysis.color} ${item.analysis.garment_type}</div>
            </div>
            <img class="step-result-image" id="step-result-${index}" alt="Generated result">
            <div class="step-status" id="step-status-${index}">Waiting</div>
        </div>
    `).join('');
}

// Update progress step status
function updateProgressStep(stepIndex, status, imageUrl = null) {
    const stepElement = document.getElementById(`step-${stepIndex}`);
    const stepNumber = stepElement.querySelector('.step-number');
    const stepStatus = document.getElementById(`step-status-${stepIndex}`);
    const resultImage = document.getElementById(`step-result-${stepIndex}`);

    if (status === 'generating') {
        stepNumber.classList.add('active');
        stepStatus.textContent = 'Generating...';
        stepStatus.classList.add('generating');
    } else if (status === 'completed') {
        stepNumber.classList.remove('active');
        stepNumber.classList.add('completed');
        stepStatus.textContent = 'Complete';
        stepStatus.classList.remove('generating');

        // Show generated image
        if (imageUrl && resultImage) {
            resultImage.src = imageUrl;
            resultImage.classList.add('show');
        }
    }
}

// Show sequential results
function showSequentialResults(generatedImages) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = resultsSection.querySelector('.results-grid') || createResultsGrid();

    resultsContainer.innerHTML = generatedImages.map((img, index) => `
        <div style="text-align: center;">
            <img src="${img.url}" class="result-image" onclick="openLightbox('${img.url}')">
            <div style="margin-top: 8px; font-size: 12px; color: #737373;">Step ${img.step}: ${img.item.name}</div>
        </div>
    `).join('');

    resultsSection.classList.add('show');
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

// ===== V3 NEW FEATURES =====

// Batch Mode Functions
let batchMode = false;
let selectedModels = [];

function toggleBatchMode() {
    batchMode = document.getElementById('batchModeToggle').checked;
    selectedModels = [];

    document.querySelectorAll('.model-card').forEach(card => {
        card.classList.remove('selected');
    });

    updateBatchCount();
    updateGenerateButton();

    console.log('🔄 Batch mode:', batchMode ? 'ENABLED' : 'DISABLED');
}

function updateBatchCount() {
    const countEl = document.getElementById('batchCount');
    if (batchMode && selectedModels.length > 0) {
        countEl.style.display = 'inline';
        countEl.textContent = selectedModels.length + ' models selected';
    } else {
        countEl.style.display = 'none';
    }
}

// Style Presets Functions
let presets = JSON.parse(localStorage.getItem('stylingPresets') || '[]');

function savePreset() {
    const name = prompt('Enter a name for this preset:');
    if (!name) return;

    const preset = {
        id: Date.now(),
        name: name,
        created: new Date().toISOString(),
        items: JSON.parse(JSON.stringify(state.items)),
        modelId: state.selectedModel ? state.selectedModel.id : null
    };

    presets.push(preset);
    localStorage.setItem('stylingPresets', JSON.stringify(presets));

    renderPresets();
    showToast('Preset "' + name + '" saved!', 'success');
}

function loadPreset(presetId) {
    const preset = presets.find(p => p.id === presetId);
    if (!preset) return;

    // Restore items
    state.items = JSON.parse(JSON.stringify(preset.items));

    // Restore model
    if (preset.modelId) {
        state.selectedModel = models.find(m => m.id === preset.modelId);
    }

    // Update UI
    renderStylingCards();
    updateBuildTimeline();
    updateGenerateButton();

    showToast('Loaded preset "' + preset.name + '"', 'success');
}

function deletePreset(presetId) {
    if (!confirm('Delete this preset?')) return;

    presets = presets.filter(p => p.id !== presetId);
    localStorage.setItem('stylingPresets', JSON.stringify(presets));
    renderPresets();

    showToast('Preset deleted', 'success');
}

function renderPresets() {
    const grid = document.getElementById('presetsGrid');

    if (presets.length === 0) {
        grid.innerHTML = '<div style="text-align: center; padding: var(--space-lg); color: var(--slate); font-size: 12px;">No presets yet.<br>Generate a look and save it as a preset.</div>';
        return;
    }

    grid.innerHTML = presets.map(preset =>
        '<div class="preset-item" onclick="loadPreset(' + preset.id + ')">' +
            '<div class="preset-info">' +
                '<div class="preset-name">' + preset.name + '</div>' +
                '<div class="preset-meta">' + new Date(preset.created).toLocaleDateString() + '</div>' +
            '</div>' +
            '<div class="preset-actions" onclick="event.stopPropagation()">' +
                '<button class="preset-action-btn" onclick="deletePreset(' + preset.id + ')">🗑</button>' +
            '</div>' +
        '</div>'
    ).join('');
}

// Build Timeline Functions
function updateBuildTimeline() {
    const timeline = document.getElementById('buildTimeline');
    let html = '<div class="timeline-item"><div class="timeline-label">START</div></div>';

    // Add model
    if (state.selectedModel) {
        html += '<div class="timeline-connector">→</div>';
        html += '<div class="timeline-item">' +
                  '<div class="timeline-thumb">' +
                    '<img src="' + state.selectedModel.image + '">' +
                  '</div>' +
                  '<div class="timeline-label">Model</div>' +
                '</div>';
    }

    // Add items
    Object.entries(state.items).forEach(function(entry) {
        const category = entry[0];
        const data = entry[1];
        if (data.file) {
            const preview = document.getElementById('preview-' + category);
            if (preview && preview.src) {
                html += '<div class="timeline-connector">+</div>';
                html += '<div class="timeline-item">' +
                          '<div class="timeline-thumb">' +
                            '<img src="' + preview.src + '">' +
                          '</div>' +
                          '<div class="timeline-label">' + getCategoryName(category) + '</div>' +
                          '<button class="timeline-remove" onclick="clearItem(\'' + category + '\')">×</button>' +
                        '</div>';
            }
        }
    });

    html += '<div class="timeline-connector">=</div>';
    html += '<div class="timeline-item"><div class="timeline-label">RESULT</div></div>';

    timeline.innerHTML = html;
}

// Comparison Mode Functions
let comparisonImages = [];

function enableCompareMode() {
    const selected = document.querySelectorAll('.result-container.selected');

    if (selected.length < 2) {
        showError('Please select at least 2 images to compare');
        return;
    }

    comparisonImages = Array.from(selected).map(function(el) {
        return el.querySelector('.result-image').src;
    });

    showComparison();
}

function showComparison() {
    const view = document.getElementById('comparisonView');
    const container = document.getElementById('comparisonContainer');

    container.innerHTML = '<div class="comparison-side-by-side">' +
        comparisonImages.map(function(img, i) {
            return '<div class="comparison-item">' +
                     '<img src="' + img + '" class="comparison-image">' +
                     '<div class="comparison-label">Variation ' + (i + 1) + '</div>' +
                   '</div>';
        }).join('') +
        '</div>';

    view.classList.add('show');
}

function closeComparison() {
    document.getElementById('comparisonView').classList.remove('show');
}

// Enhanced Result Display
function selectResult(imageUrl) {
    const containers = document.querySelectorAll('.result-container');
    containers.forEach(function(container) {
        const img = container.querySelector('.result-image');
        if (img.src === imageUrl) {
            container.classList.toggle('selected');
        }
    });
}

function downloadSelected() {
    const selected = document.querySelectorAll('.result-container.selected .result-image');

    if (selected.length === 0) {
        showError('Please select images to download');
        return;
    }

    selected.forEach(function(img, i) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'styled-look-' + Date.now() + '-' + i + '.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    showToast('Downloaded ' + selected.length + ' images', 'success');
}

// Advanced Settings Toggle
function toggleAdvanced() {
    const settings = document.getElementById('advancedSettings');
    const toggle = document.getElementById('advancedToggle');
    const text = document.getElementById('advancedToggleText');

    const isExpanded = settings.classList.toggle('expanded');
    toggle.classList.toggle('expanded');

    text.textContent = isExpanded ? 'Hide Advanced Options' : 'Show Advanced Options';
}

// Toast Notifications
function showToast(message, type) {
    type = type || 'info';
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function() { toast.classList.add('show'); }, 10);
    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 3000);
}

// Render Styling Cards
function renderStylingCards() {
    const categories = ['head', 'face', 'outerwear', 'longsleeve', 'shortsleeve', 'bottom', 'shoes', 'accessories'];
    const grid = document.getElementById('stylingGrid');

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

    grid.innerHTML = categories.map(function(category) {
        const data = state.items[category];
        const hasStyleDropdown = !['face', 'accessories'].includes(category);

        return '<div class="style-card ' + (data.file ? 'has-image' : '') + '" data-category="' + category + '">' +
                '<div class="card-header">' +
                    '<span class="card-title">' + categoryNames[category] + '</span>' +
                    '<button class="clear-btn" onclick="clearItem(\'' + category + '\')">×</button>' +
                '</div>' +
                '<div class="upload-area ' + (data.file ? 'has-image' : '') + '" onclick="triggerUpload(\'' + category + '\')">' +
                    '<div class="upload-icon">📁</div>' +
                    '<div class="upload-text">Click or drag image</div>' +
                    '<img id="preview-' + category + '" class="preview-image ' + (data.file ? 'show' : '') + '" alt="' + category + '">' +
                    '<div id="loader-' + category + '" class="analyzing-loader"></div>' +
                '</div>' +
                '<div id="details-' + category + '" class="item-details"></div>' +
                (hasStyleDropdown ?
                    '<select class="style-dropdown" id="style-' + category + '" onchange="updateStyle(\'' + category + '\', this.value)">' +
                        '<option value="">Default Style</option>' +
                        '<option value="minimal"' + (data.style === 'minimal' ? ' selected' : '') + '>Minimal</option>' +
                        '<option value="street"' + (data.style === 'street' ? ' selected' : '') + '>Street</option>' +
                        '<option value="luxury"' + (data.style === 'luxury' ? ' selected' : '') + '>Luxury</option>' +
                    '</select>'
                    : '') +
            '</div>';
    }).join('');

    // Re-attach drag-and-drop
    setupDragAndDrop();
}

// Initialize v3
function initV3() {
    renderPresets();
    renderStylingCards();
    updateBuildTimeline();
}

// Override init to call v3 init
const originalInit = init;
init = function() {
    originalInit();
    initV3();
    console.log('🎨 Styling Studio v3 initialized');
    console.log('✨ New features: Batch Mode, Style Presets, Comparison View, Build Timeline');
};
