const fs = require('fs');
const path = require('path');

const ALL_IMAGES = [
    '21bg97.so_2.jpg', '21bg97.so_back.jpg', '21bg97.so_eyelet.jpg', '21bg97.so_front.jpg', '21bg97.so_print.jpg',
    '21ca653dd.so_2.jpg', '21ca653dd.so_3.jpg', '21ca653dd.so_back.jpg', '21ca653dd.so_eyelet.jpg', '21ca653dd.so_front.jpg',
    '21sr20dd.so_2.jpg', '21sr20dd.so_3.jpg', '21sr20dd.so_back.jpg', '21sr20dd.so_belt.jpg', '21sr20dd.so_eyelet.jpg', '21sr20dd.so_front.jpg',
    '21sr21b.s_2.jpg', '21sr21b.s_back.jpg', '21sr21b.s_belt.jpg', '21sr21b.s_eyelet.jpg', '21sr21b.s_front.jpg',
    '21ss20.rw_back.jpg', '21ss20.rw_belt.jpg', '21ss20.rw_belt_2.jpg', '21ss20.rw_eyelet.jpg', '21ss20.rw_front.jpg',
    '21ss21.be_2.jpg', '21ss21.be_back.jpg', '21ss21.be_belt.jpg', '21ss21.be_belt_2.jpg', '21ss21.be_eyelet.jpg', '21ss21.be_front.jpg', '21ss21.be_pocket.jpg',
    '21sw2019.so_back.jpg', '21sw2019.so_collar.jpg', '21sw2019.so_eyelet.jpg', '21sw2019.so_fabrics.jpg', '21sw2019.so_front.jpg', '21sw2019.so_sleeves.jpg',
    '21tk189.rw_back.jpg', '21tk189.rw_collar.jpg', '21tk189.rw_eyelet.jpg', '21tk189.rw_front.jpg', '21tk189.rw_sleeves.jpg', '21tk189.rw_sleeves_2.jpg',
    '21ts1115dd.so_back.jpg', '21ts1115dd.so_collar.jpg', '21ts1115dd.so_fabrics.jpg', '21ts1115dd.so_front.jpg', '21ts1115dd.so_sleeves.jpg',
    '21ts1267.so_back.jpg', '21ts1267.so_collar.jpg', '21ts1267.so_fabrics.jpg', '21ts1267.so_front.jpg', '21ts1267.so_print.jpg', '21ts1267.so_sleeves.jpg',
    '21ts1505.rw_2.jpg', '21ts1505.rw_back.jpg', '21ts1505.rw_buttons.jpg', '21ts1505.rw_collar.jpg', '21ts1505.rw_eyelet.jpg', '21ts1505.rw_fabrics.jpg', '21ts1505.rw_front.jpg', '21ts1505.rw_sleeves.jpg', '21ts1505.rw_sleeves_2.jpg',
    '21ur30.w_2.jpg', '21ur30.w_back.jpg', '21ur30.w_eyelet.jpg', '21ur30.w_front.jpg',
    '21ur42.w_2.jpg', '21ur42.w_back.jpg', '21ur42.w_eyelet.jpg', '21ur42.w_front.jpg'
];

const OUTPUT_FILE = path.join(__dirname, '../assets/brand/rondorff/ecom/image-analysis.json');

async function analyzeImage(img) {
    const imageUrl = `http://localhost:8000/assets/brand/rondorff/ecom/originals/${img}`;

    const response = await fetch('http://localhost:8000/api/analyze-gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image_url: imageUrl,
            prompt: `Analyze this product image for e-commerce photography. Return a brief JSON:
{
  "shotType": "flat lay / detail / close-up / etc",
  "part": "front / back / collar / sleeve / eyelet / etc",
  "details": ["key visible details"],
  "colors": ["colors visible"],
  "description": "One sentence description for use in AI prompts"
}`
        })
    });

    const data = await response.json();
    if (data.content) {
        try {
            const cleaned = data.content.replace(/```json\n?|\n?```/g, '').trim();
            return JSON.parse(cleaned);
        } catch {
            return { description: data.content };
        }
    }
    return null;
}

async function main() {
    console.log(`Analyzing ${ALL_IMAGES.length} images...`);

    // Load existing analysis if any
    let analysis = { version: 1, analyzedAt: null, images: {} };
    try {
        const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
        analysis = existing;
    } catch (e) {
        console.log('Starting fresh analysis');
    }

    let count = 0;
    for (const img of ALL_IMAGES) {
        if (analysis.images[img]) {
            console.log(`[${++count}/${ALL_IMAGES.length}] ${img} - already analyzed`);
            continue;
        }

        console.log(`[${++count}/${ALL_IMAGES.length}] Analyzing ${img}...`);

        try {
            const result = await analyzeImage(img);
            if (result) {
                analysis.images[img] = result;
                // Save after each successful analysis
                analysis.analyzedAt = new Date().toISOString();
                fs.writeFileSync(OUTPUT_FILE, JSON.stringify(analysis, null, 2));
                console.log(`  -> ${result.description?.substring(0, 60) || 'analyzed'}...`);
            }
        } catch (e) {
            console.error(`  -> Error: ${e.message}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
    }

    console.log(`\nDone! Analyzed ${Object.keys(analysis.images).length} images.`);
    console.log(`Results saved to: ${OUTPUT_FILE}`);
}

main().catch(console.error);
