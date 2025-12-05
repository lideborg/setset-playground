/**
 * Setset Playground - Backend Server
 * Handles API proxying to keep keys secure
 */

import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, statSync, existsSync } from 'fs';
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';

// Load environment variables (check both project root and server directory)
dotenv.config(); // Project root
dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '.env') }); // Server directory

// Configure fal client with default key (will be overridden per-request)
fal.config({
    credentials: process.env.FAL_API_KEY_SETSET
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Serve static files from parent directory
app.use(express.static(join(__dirname, '..')));

// API Keys from environment
const FAL_API_KEYS = {
    personal: process.env.FAL_API_KEY_PERSONAL,
    setset: process.env.FAL_API_KEY_SETSET
};
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Helper to get the right FAL key based on request
function getFalKey(req) {
    const keyType = req.body?.falKey || req.query?.falKey || 'setset';
    return FAL_API_KEYS[keyType] || FAL_API_KEYS.setset;
}

// Model endpoint mapping
const MODEL_ENDPOINTS = {
    // Text to Image
    'reve': 'https://fal.run/fal-ai/reve/text-to-image',
    'zimage': 'https://fal.run/fal-ai/z-image/turbo',
    'flux2': 'https://fal.run/fal-ai/flux-2-flex',
    'krea': 'https://fal.run/fal-ai/flux/krea',
    'nanobanana': 'https://fal.run/fal-ai/nano-banana-pro',

    // Image to Image (Remix)
    'nanobanana-edit': 'https://fal.run/fal-ai/nano-banana/edit',
    'nanobanana-pro-edit': 'https://fal.run/fal-ai/nano-banana-pro/edit',
    'flux2-redux': 'https://fal.run/fal-ai/flux-2-flex/edit',
    'nano': 'https://fal.run/fal-ai/nano-banana/edit',
    'nano-pro': 'https://fal.run/fal-ai/nano-banana-pro/edit',

    // Background Replace
    'bria-bg-replace': 'https://fal.run/fal-ai/bria/background/replace'
};

/**
 * POST /api/generate
 * Generate images using fal.ai
 */
app.post('/api/generate', async (req, res) => {
    try {
        const { model, ...params } = req.body;
        const endpoint = MODEL_ENDPOINTS[model];

        if (!endpoint) {
            return res.status(400).json({ error: `Unknown model: ${model}` });
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${getFalKey(req)}`
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error || 'Generation failed' });
        }

        res.json(data);
    } catch (error) {
        console.error('Generate error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/remix
 * Remix/transform images using fal.ai
 */
app.post('/api/remix', async (req, res) => {
    try {
        const { model, ...params } = req.body;
        const endpoint = MODEL_ENDPOINTS[model];

        console.log('📤 [Remix] Model:', model);
        console.log('📤 [Remix] Endpoint:', endpoint);
        console.log('📤 [Remix] Params:', JSON.stringify(params, null, 2));

        if (!endpoint) {
            return res.status(400).json({ error: `Unknown model: ${model}` });
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${getFalKey(req)}`
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();

        console.log('📥 [Remix] Response status:', response.status);
        console.log('📥 [Remix] Response:', JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error('❌ [Remix] API Error:', data);
            return res.status(response.status).json({ error: data.detail || data.error || 'Remix failed', details: data });
        }

        res.json(data);
    } catch (error) {
        console.error('❌ [Remix] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/bg-replace
 * Replace backgrounds using Bria AI
 */
app.post('/api/bg-replace', async (req, res) => {
    try {
        const params = req.body;
        const endpoint = MODEL_ENDPOINTS['bria-bg-replace'];

        console.log('📤 [BG Replace] Params:', JSON.stringify(params, null, 2));

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${getFalKey(req)}`
            },
            body: JSON.stringify(params)
        });

        const data = await response.json();

        console.log('📥 [BG Replace] Response status:', response.status);
        console.log('📥 [BG Replace] Response:', JSON.stringify(data, null, 2));

        if (!response.ok) {
            console.error('❌ [BG Replace] API Error:', data);
            return res.status(response.status).json({ error: data.detail || data.error || 'BG Replace failed', details: data });
        }

        res.json(data);
    } catch (error) {
        console.error('❌ [BG Replace] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/prompts
 * Generate prompts using OpenAI
 */
app.post('/api/prompts', async (req, res) => {
    try {
        const { idea, numPrompts = 4 } = req.body;

        const systemPrompt = `You are an expert at writing detailed, creative prompts for AI image generation. Given a simple concept, expand it into ${numPrompts} unique, detailed prompt variations.

Each prompt should:
1. Be a complete, self-contained image generation prompt
2. Include specific visual details (lighting, colors, composition, style)
3. Add artistic or photographic qualities (cinematic, editorial, documentary, etc.)
4. Create different creative interpretations/variations of the concept
5. Be 1-3 sentences long

IMPORTANT: Return ONLY the prompts. Separate each prompt with TWO blank lines. No numbering, no explanations, no extra text.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Create ${numPrompts} detailed image prompts based on: "${idea}"` }
                ],
                temperature: 0.9,
                max_tokens: 1000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Prompt generation failed' });
        }

        const content = data.choices[0].message.content.trim();
        // Split by double newlines first, then fall back to single newlines
        let prompts = content.split(/\n\n+/).filter(line => line.trim());
        if (prompts.length < 2) {
            prompts = content.split('\n').filter(line => line.trim());
        }
        prompts = prompts.slice(0, numPrompts);

        res.json({ prompts });
    } catch (error) {
        console.error('Prompts error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/prompts/environment
 * Generate environment-specific prompts optimized for Reve
 */
app.post('/api/prompts/environment', async (req, res) => {
    try {
        const { idea, numPrompts = 4 } = req.body;

        const systemPrompt = `You are an expert at writing highly detailed, photorealistic environment prompts for the Reve AI image generation model. Your prompts should create rich, cinematic backdrops for fashion photography.

Given a concept, create ${numPrompts} unique environment prompts following these Reve best practices:

PROMPT STRUCTURE:
1. Start with the location type and specific architectural/natural features
2. Add specific textures and materials (weathered brick, polished concrete, herringbone parquet, etc.)
3. Include props and objects that make spaces feel real (furniture, plants, books, flowers, ceramics)
4. Describe lighting quality and direction specifically (golden hour, soft diffused, dramatic side light)
5. Add atmospheric conditions (morning mist, dust particles in light beams, rain-slicked surfaces)
6. Include professional photography terms (shot on Arri Alexa, shallow depth of field, photorealistic)

IMPORTANT RULES:
- Each prompt must be 3-5 sentences long with rich visual detail
- Include specific textures (aged patina, board-formed concrete, worn oak planks)
- Add lived-in details for interiors (stacked books, fresh flowers, cashmere throws)
- Describe atmospheric depth (foreground, midground, background elements)
- Always end with: "EMPTY SCENE WITH ABSOLUTELY NO PEOPLE, no humans, no figures, uninhabited space, pure backdrop photograph"

STYLE:
- High-end editorial fashion photography aesthetic
- Cinematic and atmospheric
- Rich in texture, depth, and mood

Return ONLY the prompts. Separate each prompt with TWO blank lines. No numbering, no explanations.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Create ${numPrompts} detailed environment backdrop prompts based on: "${idea}"` }
                ],
                temperature: 0.85,
                max_tokens: 2000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Prompt generation failed' });
        }

        const content = data.choices[0].message.content.trim();
        let prompts = content.split(/\n\n+/).filter(line => line.trim());
        if (prompts.length < 2) {
            prompts = content.split('\n').filter(line => line.trim());
        }
        prompts = prompts.slice(0, numPrompts);

        res.json({ prompts });
    } catch (error) {
        console.error('Environment prompts error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/analyze-brand
 * Deep brand visual analysis using GPT-4 Vision + web context
 */
app.post('/api/analyze-brand', async (req, res) => {
    try {
        const { images, brandName, previousAnalysis, feedback } = req.body;

        if (!brandName) {
            return res.status(400).json({ error: 'Brand name is required' });
        }

        const hasImages = images && images.length > 0;
        console.log(`🎨 [Brand Analysis] ${hasImages ? `Analyzing ${images.length} images for` : 'Using GPT knowledge for'} brand: ${brandName}`);

        // Build content array
        const content = [];

        // Add images if provided
        if (hasImages) {
            for (const url of images) {
                content.push({
                    type: 'image_url',
                    image_url: {
                        url: url,
                        detail: 'high'
                    }
                });
            }
        }

        // Build the analysis prompt
        let analysisPrompt;

        if (previousAnalysis && feedback) {
            // Refinement mode
            analysisPrompt = `You previously analyzed the visual identity of ${brandName} and produced this analysis:

${previousAnalysis}

The user has provided this feedback for refinement:
"${feedback}"

Please update and refine your analysis based on this feedback. Keep the same structure but adjust the content based on the user's notes.`;
        } else {
            // Initial analysis - with or without images
            const imageContext = hasImages
                ? `Examine these campaign/Instagram images to understand the brand's visual language.`
                : `Based on your knowledge of ${brandName}'s visual identity, campaign imagery, and brand aesthetic, provide a comprehensive visual analysis. Think about their Instagram, campaigns, brand guidelines, and overall visual language.`;

            analysisPrompt = `You are an expert creative director ${hasImages ? 'extracting' : 'with deep knowledge of fashion and lifestyle brands, analyzing'} the VISUAL PRINCIPLES and AESTHETIC QUALITIES of ${brandName}.

${imageContext}

Your response must have TWO parts, clearly separated:

===SUMMARY===
Write a clear summary (6-10 lines) that captures the essence of the brand's visual identity. This is what the user sees to verify we understood the brand correctly. Include:
- The overall brand feeling and emotional quality
- Lighting style and how light is used
- Types of environments and settings that feel on-brand
- Color tendencies and tonal qualities
- Mood and atmosphere
- Any distinctive visual techniques or approaches
Keep it readable and flowing - no bullet points or headers, just descriptive prose.

===FULL ANALYSIS===
Now provide the detailed analysis for generating prompts:

**LIGHTING PRINCIPLES**
List 4-6 lighting approaches the brand uses:
- e.g., "Soft diffused natural light - even, gentle, flattering"
- e.g., "Dramatic directional side-light - sculptural shadows, depth"

**ENVIRONMENT CATEGORIES** (Abstract types, NOT specific locations)
List 6-8 categories of environments that fit the brand:
- e.g., "Natural landscapes with texture" (could be: desert, forest, coastline, mountains)
- e.g., "Architectural minimalism" (could be: museums, galleries, modern homes)

**MOOD SPECTRUM**
- Primary emotional tone
- 2-3 secondary moods
- Energy level (calm ←→ dynamic)

**COLOR PALETTE**
List 5-8 specific colors (be precise - "dusty sage" not "green")

**TEXTURE & SURFACE QUALITIES**
What textures feel on-brand? (raw concrete, weathered wood, soft fabrics, etc.)

**PROMPT BUILDING BLOCKS**
15-20 short phrases that can be mixed/matched:
- Lighting phrases (5-6)
- Environment types (5-6)
- Atmosphere phrases (4-5)
- Camera/technique phrases (3-4)

The goal is to create NEW campaign images that FEEL like ${brandName}, not recreate reference photos.`;
        }

        content.push({
            type: 'text',
            text: analysisPrompt
        });

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: content
                    }
                ],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Brand Analysis] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
        }

        const fullResponse = data.choices[0].message.content;
        console.log(`✅ [Brand Analysis] Complete for ${brandName}`);

        // Parse out summary and full analysis
        let summary = '';
        let fullAnalysis = fullResponse;

        if (fullResponse.includes('===SUMMARY===') && fullResponse.includes('===FULL ANALYSIS===')) {
            const summaryMatch = fullResponse.match(/===SUMMARY===\s*([\s\S]*?)===FULL ANALYSIS===/);
            const fullMatch = fullResponse.match(/===FULL ANALYSIS===\s*([\s\S]*)/);

            if (summaryMatch) summary = summaryMatch[1].trim();
            if (fullMatch) fullAnalysis = fullMatch[1].trim();
        }

        res.json({
            summary: summary || fullAnalysis.substring(0, 500), // Fallback to truncated if parsing fails
            fullAnalysis: fullAnalysis,
            // Keep 'analysis' for backward compatibility
            analysis: fullAnalysis
        });
    } catch (error) {
        console.error('❌ [Brand Analysis] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/campaign-prompts
 * Generate campaign-style prompts based on brand analysis + e-commerce image
 * Handles both MODEL shots (people) and PRODUCT shots (flat lays)
 */
app.post('/api/campaign-prompts', async (req, res) => {
    try {
        const { brandAnalysis, brandName, ecomDescription, numPrompts = 3, imageIndex = 0, numPeople = 1, imageType = 'model', previousPrompts = [] } = req.body;

        console.log(`📝 [Campaign Prompts] Generating ${numPrompts} prompts for ${brandName} (unit ${imageIndex + 1}, type: ${imageType}, ${previousPrompts.length} previous)`);

        // Build context about previous prompts to avoid repetition
        const avoidRepetitionContext = previousPrompts.length > 0
            ? `\n\nALREADY USED (DO NOT REPEAT these settings):
${previousPrompts.map((p, i) => `- ${p.substring(0, 100)}...`).join('\n')}

You MUST create completely DIFFERENT settings from the above.`
            : '';

        let systemPrompt, userPrompt;

        if (imageType === 'product') {
            // FLAT LAY / PRODUCT SHOT prompts
            systemPrompt = `You are an expert at writing prompts for AI image-to-image generation that transforms e-commerce product shots into styled product photography.

Your job: Based on the brand's visual identity, create ${numPrompts} prompts for PRODUCT/FLAT LAY photography that feels authentic to the brand.

RULES:
1. Study the brand analysis - understand textures, colors, materials, and mood that define this brand
2. Create styled product shots that are AUTHENTIC to the brand aesthetic
3. MAXIMUM VARIETY: Each prompt MUST use completely different surfaces, props, and lighting
4. DO NOT describe the product itself - only the surface, props, lighting, and styling. The AI preserves the product.
5. Keep prompts to 2-3 sentences. Be specific and evocative.
6. Use photography terms: soft diffused light, harsh shadows, warm tones, etc.

VARIETY DIMENSIONS FOR PRODUCT SHOTS - vary across ALL of these:
- Surface/backdrop (marble, wood, linen, concrete, terrazzo, sand, stone, fabric)
- Props/styling (botanicals, ceramics, paper, jewelry, food items, natural objects)
- Lighting style (soft window light, dramatic side light, even diffused, dappled sunlight)
- Color temperature (warm golden, cool blue, neutral, sunset tones)
- Composition angle (overhead flat lay, 45-degree angle, low angle, detail macro)
- Mood (minimal clean, rich layered, organic natural, architectural stark)

Return ONLY the prompts, one per line, no numbering or explanations.`;

            userPrompt = `BRAND: ${brandName}

BRAND VISUAL IDENTITY:
${brandAnalysis}

PRODUCT TO STYLE: ${ecomDescription}
${avoidRepetitionContext}

Generate ${numPrompts} styled product photography prompts. Each should feel authentically like ${brandName}'s aesthetic. Make each prompt COMPLETELY DIFFERENT - different surface, different props, different lighting, different mood. Think editorial product photography for a luxury campaign.`;

        } else {
            // MODEL / PERSON prompts (original behavior)
            const peopleContext = numPeople > 1
                ? `IMPORTANT: This scene will feature ${numPeople} people together. Describe how they should be positioned and interacting naturally.`
                : '';

            systemPrompt = `You are an expert at writing prompts for AI image-to-image generation that transforms e-commerce shots into campaign-style imagery.

Your job: Based on the brand's visual identity, create ${numPrompts} prompts that place the subject${numPeople > 1 ? 's' : ''} in environments that FEEL true to the brand.

${peopleContext}

RULES:
1. Study the brand analysis - understand environments, lighting, and moods that define this brand
2. Create environments AUTHENTIC to the brand aesthetic - not generic
3. MAXIMUM VARIETY: Each prompt MUST use completely different environment, time of day, and atmosphere
4. DO NOT describe clothing - only environment, lighting, atmosphere, and pose. The AI preserves the subjects.
5. Keep prompts to 2-3 sentences. Be specific and evocative.
6. Use photography terms naturally.
${numPeople > 1 ? `7. For ${numPeople} people: describe natural positioning (walking together, sitting nearby, conversing, etc.)` : ''}

VARIETY DIMENSIONS FOR MODEL SHOTS - vary across ALL of these:
- Location type (urban/nature/interior/architectural/industrial/coastal)
- Time of day (golden hour/midday/blue hour/overcast/night)
- Weather/atmosphere (misty/sunny/moody/crisp/dramatic/rainy)
- Camera perspective (wide environmental/intimate close/dynamic angle/from below/from above)
- Energy level (calm/active/contemplative/dynamic/playful)
- Setting specificity (be SPECIFIC - not "urban" but "rain-slicked Tokyo side street at night")

Return ONLY the prompts, one per line, no numbering or explanations.`;

            userPrompt = `BRAND: ${brandName}

BRAND VISUAL IDENTITY:
${brandAnalysis}

${numPeople > 1 ? `GROUP SCENE (${numPeople} people):` : 'MODEL/PERSON IMAGE:'} ${ecomDescription}
${avoidRepetitionContext}

Generate ${numPrompts} campaign-style prompts. Each should feel authentically like ${brandName}. Make each prompt COMPLETELY DIFFERENT - different location, different time, different mood, different energy. Be SPECIFIC with locations (not "beach" but "windswept Icelandic black sand beach at dusk").${numPeople > 1 ? ` Include natural positioning for ${numPeople} people.` : ''}`;
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.9,
                max_tokens: 1500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Campaign Prompts] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Prompt generation failed' });
        }

        const content = data.choices[0].message.content.trim();
        let prompts = content.split('\n').filter(line => line.trim()).slice(0, numPrompts);

        console.log(`✅ [Campaign Prompts] Generated ${prompts.length} prompts`);

        res.json({ prompts });
    } catch (error) {
        console.error('❌ [Campaign Prompts] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/analyze
 * Analyze images using GPT-4 Vision (supports multiple images)
 */
app.post('/api/analyze', async (req, res) => {
    try {
        const { image, images, prompt } = req.body;

        // Support both single image and array of images
        const imageUrls = images || (image ? [image] : []);

        if (imageUrls.length === 0) {
            return res.status(400).json({ error: 'No images provided' });
        }

        console.log(`🔍 [Analyze] Processing ${imageUrls.length} image(s)`);

        // Build content array with text prompt and all images
        const content = [
            { type: 'text', text: prompt }
        ];

        // Add all images to the content
        for (const url of imageUrls) {
            content.push({
                type: 'image_url',
                image_url: {
                    url: url,
                    detail: 'low'
                }
            });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'user',
                        content: content
                    }
                ],
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
        }

        res.json({ content: data.choices[0].message.content });
    } catch (error) {
        console.error('Analyze error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/upload
 * Upload image to fal.ai storage using fal client
 */
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        console.log(`📤 [Upload] Uploading ${req.file.size} bytes, type: ${req.file.mimetype}`);

        // Configure fal with the appropriate key for this request
        fal.config({ credentials: getFalKey(req) });

        // Create a Blob from the buffer
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        const file = new File([blob], req.file.originalname || 'image.jpg', { type: req.file.mimetype });

        // Upload using fal client
        const url = await fal.storage.upload(file);

        console.log(`📥 [Upload] URL:`, url);
        res.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/upload-base64
 * Upload base64 image to fal.ai storage using fal client
 */
app.post('/api/upload-base64', async (req, res) => {
    try {
        const { dataUrl } = req.body;

        if (!dataUrl) {
            return res.status(400).json({ error: 'No dataUrl provided' });
        }

        // Extract base64 data and mime type
        const matches = dataUrl.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            return res.status(400).json({ error: 'Invalid data URL format' });
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');

        console.log(`📤 [Upload] Uploading ${buffer.length} bytes, type: ${mimeType}`);

        // Configure fal with the appropriate key for this request
        fal.config({ credentials: getFalKey(req) });

        // Create a Blob from the buffer
        const blob = new Blob([buffer], { type: mimeType });
        const file = new File([blob], 'image.jpg', { type: mimeType });

        // Upload using fal client
        const url = await fal.storage.upload(file);

        console.log(`📥 [Upload] URL:`, url);
        res.json({ url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/clothing
 * Scan clothing folders and return available products
 */
app.get('/api/clothing', (req, res) => {
    try {
        const clothingPath = join(__dirname, '..', 'shared', 'images', 'clothing');
        const products = {};

        // Categories to scan (matching PRODUCT_CATEGORIES)
        const categories = ['top', 'sweater', 'outerwear', 'dress', 'bottom', 'shoes', 'bag', 'accessories'];
        const genders = ['female', 'male'];

        for (const gender of genders) {
            const genderPath = join(clothingPath, gender);
            if (!existsSync(genderPath)) continue;

            for (const category of categories) {
                const categoryPath = join(genderPath, category);
                if (!existsSync(categoryPath)) continue;

                if (!products[category]) {
                    products[category] = { female: [], male: [] };
                }

                // Scan style subfolders
                const styles = readdirSync(categoryPath).filter(f =>
                    statSync(join(categoryPath, f)).isDirectory()
                );

                for (const style of styles) {
                    const stylePath = join(categoryPath, style);
                    const images = readdirSync(stylePath).filter(f =>
                        /\.(jpg|jpeg|png|webp)$/i.test(f)
                    );

                    for (const image of images) {
                        products[category][gender].push({
                            url: `/shared/images/clothing/${gender}/${category}/${style}/${image}`,
                            style: style,
                            filename: image,
                            description: `${style} ${category}`
                        });
                    }
                }
            }
        }

        console.log(`📦 [Clothing] Scanned products:`,
            Object.entries(products).map(([cat, data]) =>
                `${cat}: ${data.female.length}F/${data.male.length}M`
            ).join(', ')
        );

        res.json(products);
    } catch (error) {
        console.error('❌ [Clothing] Scan error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Clean URL routing - redirect tool names to /?tool=name
 */
const TOOL_ROUTES = ['generate', 'remix', 'looks', 'styling', 'angles', 'research', 'lockgroup', 'bg-replace'];

app.get('/:tool', (req, res, next) => {
    const tool = req.params.tool;
    if (TOOL_ROUTES.includes(tool)) {
        return res.redirect(`/?tool=${tool}`);
    }
    next();
});

// Fallback - serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║          Setset Playground Server              ║
╠════════════════════════════════════════════════╣
║  Local:   http://localhost:${PORT}                ║
║                                                ║
║  Tools:  /generate, /remix, /lockgroup          ║
║          /research                             ║
║                                                ║
║  API:    /api/generate, /api/remix             ║
║          /api/prompts, /api/analyze            ║
╚════════════════════════════════════════════════╝
    `);
});
