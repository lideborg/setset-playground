const fs = require('fs');
const path = require('path');

const ANALYSIS_FILE = path.join(__dirname, '../assets/brand/rondorff/ecom/image-analysis.json');

// Consistent color definitions per product SKU
const PRODUCT_COLORS = {
    '21ts1505.rw': {
        colors: ['natural beige', 'cream'],
        colorDescription: 'natural beige crochet knit'
    },
    '21tk189.rw': {
        colors: ['natural beige', 'cream'],
        colorDescription: 'natural beige crochet knit'
    },
    '21ts1115dd.so': {
        colors: ['sunset orange gradient', 'warm pink to orange'],
        colorDescription: 'warm gradient from dusty pink to sunset orange'
    },
    '21sw2019.so': {
        colors: ['sunset orange gradient', 'warm pink to orange'],
        colorDescription: 'warm gradient from dusty pink to sunset orange'
    },
    '21ts1267.so': {
        colors: ['sunset orange gradient', 'warm pink to orange'],
        colorDescription: 'warm gradient from dusty pink to sunset orange'
    },
    '21ss20.rw': {
        colors: ['natural beige', 'cream'],
        colorDescription: 'natural beige crochet knit'
    },
    '21ss21.be': {
        colors: ['beige', 'tan'],
        colorDescription: 'tan beige corduroy'
    },
    '21sr20dd.so': {
        colors: ['sunset orange gradient', 'warm pink to orange'],
        colorDescription: 'warm gradient from dusty pink to sunset orange'
    },
    '21sr21b.s': {
        colors: ['sand', 'tan', 'white waistband'],
        colorDescription: 'sand/tan with white branded waistband'
    },
    '21ur30.w': {
        colors: ['white'],
        colorDescription: 'white with black branding details'
    },
    '21ur42.w': {
        colors: ['black'],
        colorDescription: 'black with branded waistband'
    },
    '21ca653dd.so': {
        colors: ['sunset orange'],
        colorDescription: 'sunset orange with black embroidery'
    },
    '21bg97.so': {
        colors: ['sunset orange gradient', 'mauve to orange'],
        colorDescription: 'warm gradient from mauve to sunset orange'
    }
};

// Load existing analysis
const analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf8'));

// Update each image with consistent product colors
for (const [filename, data] of Object.entries(analysis.images)) {
    // Extract SKU prefix from filename (e.g., "21bg97.so" from "21bg97.so_front.jpg")
    const skuMatch = filename.match(/^([^_]+)/);
    if (skuMatch) {
        const sku = skuMatch[1].toLowerCase();
        const productColors = PRODUCT_COLORS[sku];

        if (productColors) {
            data.colors = productColors.colors;
            data.productColor = productColors.colorDescription;
            console.log(`Updated ${filename}: ${productColors.colorDescription}`);
        } else {
            console.log(`No color mapping for ${sku}`);
        }
    }
}

// Update timestamp
analysis.analyzedAt = new Date().toISOString();
analysis.colorsNormalized = true;

// Save
fs.writeFileSync(ANALYSIS_FILE, JSON.stringify(analysis, null, 2));
console.log('\nColors normalized and saved!');
