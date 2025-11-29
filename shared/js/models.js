/**
 * Model Configurations - Setset Playground
 * Centralized model definitions and utilities
 */

const MODELS = {
    // Text to Image
    reve: {
        name: 'Reve',
        type: 'text-to-image',
        endpoint: 'fal-ai/reve/text-to-image',
        costPerImage: 0.04,
        usesAspectRatio: true,
        description: 'High quality, artistic style'
    },
    zimage: {
        name: 'Z Image',
        type: 'text-to-image',
        endpoint: 'fal-ai/z-image/turbo',
        costPerImage: 0.01,
        usesAspectRatio: false,
        hasSteps: true,
        description: 'Fast, good for iteration'
    },
    flux2: {
        name: 'Flux 2',
        type: 'text-to-image',
        endpoint: 'fal-ai/flux-2-flex',
        costPerImage: 0.08,
        usesAspectRatio: false,
        description: 'Latest Flux model'
    },
    krea: {
        name: 'Krea',
        type: 'text-to-image',
        endpoint: 'fal-ai/flux/krea',
        costPerImage: 0.03,
        usesAspectRatio: false,
        description: 'Krea-tuned Flux'
    },
    nanobanana: {
        name: 'Nano Banana',
        type: 'text-to-image',
        endpoint: 'fal-ai/nano-banana-pro',
        costPerImage: 0.15,
        usesAspectRatio: true,
        supportsResolution: true,
        description: 'High quality, supports 1K/2K/4K'
    },

    // Image to Image (Remix)
    'nanobanana-edit': {
        name: 'Nano Banana Edit',
        type: 'image-to-image',
        endpoint: 'fal-ai/nano-banana-pro-edit',
        costPerImage: 0.15,
        usesAspectRatio: true,
        description: 'Edit/remix images'
    },
    'flux2-redux': {
        name: 'Flux 2 Redux',
        type: 'image-to-image',
        endpoint: 'fal-ai/flux-2-flex/redux',
        costPerImage: 0.08,
        usesAspectRatio: false,
        description: 'Flux 2 image remix'
    }
};

// Aspect ratio to dimensions mapping
const ASPECT_SIZES = {
    '1K': {
        '16:9': { width: 1168, height: 657 },
        '9:16': { width: 657, height: 1168 },
        '3:2': { width: 1168, height: 779 },
        '2:3': { width: 779, height: 1168 },
        '4:3': { width: 1168, height: 876 },
        '3:4': { width: 876, height: 1168 },
        '1:1': { width: 1168, height: 1168 }
    },
    '2K': {
        '16:9': { width: 2048, height: 1152 },
        '9:16': { width: 1152, height: 2048 },
        '3:2': { width: 2048, height: 1365 },
        '2:3': { width: 1365, height: 2048 },
        '4:3': { width: 2048, height: 1536 },
        '3:4': { width: 1536, height: 2048 },
        '1:1': { width: 2048, height: 2048 }
    }
};

/**
 * Get dimensions for aspect ratio and resolution
 */
function getAspectSize(aspectRatio, resolution = '1K') {
    return ASPECT_SIZES[resolution]?.[aspectRatio] || ASPECT_SIZES['1K']['3:2'];
}

/**
 * Get model by key
 */
function getModel(key) {
    return MODELS[key];
}

/**
 * Get models by type
 */
function getModelsByType(type) {
    return Object.entries(MODELS)
        .filter(([_, model]) => model.type === type)
        .reduce((acc, [key, model]) => ({ ...acc, [key]: model }), {});
}

/**
 * Calculate cost for generation
 */
function calculateCost(modelKeys, numPrompts, numSeeds) {
    let total = 0;
    modelKeys.forEach(key => {
        const model = MODELS[key];
        if (model) {
            total += model.costPerImage * numPrompts * numSeeds;
        }
    });
    return total;
}

// Export
window.MODELS = MODELS;
window.ASPECT_SIZES = ASPECT_SIZES;
window.getAspectSize = getAspectSize;
window.getModel = getModel;
window.getModelsByType = getModelsByType;
window.calculateCost = calculateCost;
