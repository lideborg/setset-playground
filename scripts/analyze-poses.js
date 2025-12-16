const fs = require('fs');
const path = require('path');

// Source: Desktop folder where you add new poses
const SOURCE_DIR = '/Users/lidelaptop/Desktop/Poses';
// Destination: repo assets folder
const POSES_DIR = path.join(__dirname, '../assets/poses');
const OUTPUT_FILE = path.join(__dirname, '../shared/data/pose-library.json');

// First, copy any new images from source to assets
function syncPosesFolder() {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.log('Source folder not found, using assets folder only');
        return;
    }

    const sourceFiles = fs.readdirSync(SOURCE_DIR).filter(f =>
        /\.(jpg|jpeg|png|webp)$/i.test(f)
    );
    const existingFiles = new Set(fs.readdirSync(POSES_DIR));

    let copied = 0;
    for (const file of sourceFiles) {
        if (!existingFiles.has(file)) {
            fs.copyFileSync(
                path.join(SOURCE_DIR, file),
                path.join(POSES_DIR, file)
            );
            copied++;
        }
    }

    if (copied > 0) {
        console.log(`Copied ${copied} new images from Desktop to assets/poses`);
    }
}

const TAG_GROUPS = {
    'Framing': ['full-body', 'three-quarter', 'half-body', 'close-up'],
    'Orientation': ['frontal', '3/4-angle', 'profile', 'back-view', 'over-shoulder'],
    'Stance': ['standing', 'sitting', 'walking', 'leaning', 'floor', 'crouching'],
    'Arms': ['arms-at-sides', 'hands-in-pockets', 'hands-on-hips', 'arms-crossed', 'arms-raised', 'touching-face', 'holding-garment', 'hands-clasped'],
    'Legs': ['feet-together', 'weight-shifted', 'wide-stance', 'legs-crossed', 'one-knee-bent'],
    'Mood': ['confident', 'relaxed', 'editorial', 'dynamic', 'candid'],
    'Use Case': ['e-commerce', 'lookbook', 'campaign', 'social'],
    'Props': ['with-chair', 'with-stool', 'against-wall', 'with-bag']
};

const ALL_TAGS = Object.values(TAG_GROUPS).flat();

function getBase64DataUrl(filePath) {
    const fileBuffer = fs.readFileSync(filePath);
    const base64 = fileBuffer.toString('base64');
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    return `data:${mimeType};base64,${base64}`;
}

async function analyzeImage(base64DataUrl) {
    const tagList = ALL_TAGS.join(', ');
    const prompt = `Analyze this pose image for a fashion photography pose library. Select ALL applicable tags from the list below.

Available tags: ${tagList}

Respond in JSON format only:

{
    "gender": "male" | "female" | "unisex",
    "tags": ["array of applicable tags from the list above - select all that apply"],
    "description": "A detailed description of the pose for image generation prompts. Include body position, arm placement, head direction, weight distribution, and overall mood/energy."
}`;

    const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            images: [base64DataUrl],
            prompt
        })
    });

    const result = await response.json();

    if (result.content) {
        try {
            const jsonMatch = result.content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }
        } catch (e) {
            console.error('Failed to parse:', e);
        }
    }
    return null;
}

async function main() {
    // First sync any new images from Desktop folder
    syncPosesFolder();

    const files = fs.readdirSync(POSES_DIR).filter(f =>
        /\.(jpg|jpeg|png|webp)$/i.test(f)
    );

    // Load existing poses to skip already analyzed ones
    let existingPoses = [];
    if (fs.existsSync(OUTPUT_FILE)) {
        try {
            const existing = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
            existingPoses = existing.poses || [];
        } catch (e) {
            console.log('Could not load existing poses, starting fresh');
        }
    }

    const existingFilenames = new Set(existingPoses.map(p => p.filename));
    const newFiles = files.filter(f => !existingFilenames.has(f));

    console.log(`Found ${files.length} total pose images`);
    console.log(`Already analyzed: ${existingFilenames.size}`);
    console.log(`New to analyze: ${newFiles.length}`);

    if (newFiles.length === 0) {
        console.log('\nNo new poses to analyze!');
        return;
    }

    const poses = [...existingPoses];

    for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        const filePath = path.join(POSES_DIR, file);

        console.log(`\n[${i + 1}/${newFiles.length}] Analyzing: ${file}`);

        try {
            // Get base64 data URL
            console.log('  Loading image...');
            const base64DataUrl = getBase64DataUrl(filePath);

            // Analyze
            console.log('  Analyzing...');
            const analysis = await analyzeImage(base64DataUrl);

            if (analysis) {
                const pose = {
                    id: Date.now().toString() + '-' + i,
                    filename: file,
                    imagePath: `/assets/poses/${file}`,
                    gender: analysis.gender || 'unisex',
                    tags: (analysis.tags || []).filter(t => ALL_TAGS.includes(t)),
                    description: analysis.description || '',
                    createdAt: new Date().toISOString()
                };
                poses.push(pose);
                console.log(`  Tags: ${pose.tags.slice(0, 5).join(', ')}${pose.tags.length > 5 ? '...' : ''}`);
            } else {
                console.log('  Failed to analyze');
            }
        } catch (error) {
            console.error(`  Error: ${error.message}`);
        }

        // Small delay to avoid rate limiting
        await new Promise(r => setTimeout(r, 500));
    }

    // Save results
    const library = {
        poses,
        tagGroups: TAG_GROUPS,
        lastUpdated: new Date().toISOString()
    };

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(library, null, 2));
    console.log(`\n\nSaved ${poses.length} poses to ${OUTPUT_FILE}`);
}

main().catch(console.error);
