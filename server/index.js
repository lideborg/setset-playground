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
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';

// Load environment variables
dotenv.config();

// Configure fal client
fal.config({
    credentials: process.env.FAL_API_KEY
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ storage: multer.memoryStorage() });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from parent directory
app.use(express.static(join(__dirname, '..')));

// API Keys from environment
const FAL_API_KEY = process.env.FAL_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Model endpoint mapping
const MODEL_ENDPOINTS = {
    // Text to Image
    'reve': 'https://fal.run/fal-ai/reve/text-to-image',
    'zimage': 'https://fal.run/fal-ai/z-image/turbo',
    'flux2': 'https://fal.run/fal-ai/flux-2-flex',
    'krea': 'https://fal.run/fal-ai/flux/krea',
    'nanobanana': 'https://fal.run/fal-ai/nano-banana-pro',

    // Image to Image (Remix)
    'nano': 'https://fal.run/fal-ai/nano-banana/edit',
    'nano-pro': 'https://fal.run/fal-ai/nano-banana-pro/edit',
    'nanobanana-edit': 'https://fal.run/fal-ai/nano-banana-pro/edit', // legacy alias
    'flux2-redux': 'https://fal.run/fal-ai/flux-2-flex/edit'
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
                'Authorization': `Key ${FAL_API_KEY}`
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
                'Authorization': `Key ${FAL_API_KEY}`
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
 * Clean URL routing - redirect tool names to /?tool=name
 */
const TOOL_ROUTES = ['generate', 'remix', 'looks', 'styling', 'angles', 'research', 'casting'];

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
║  Tools:  /generate, /remix, /casting           ║
║          /research                             ║
║                                                ║
║  API:    /api/generate, /api/remix             ║
║          /api/prompts, /api/analyze            ║
╚════════════════════════════════════════════════╝
    `);
});
