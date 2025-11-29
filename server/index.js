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

// Load environment variables
dotenv.config();

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
    'nanobanana-edit': 'https://fal.run/fal-ai/nano-banana-pro/edit',
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
            return res.status(response.status).json({ error: data.error || 'Remix failed' });
        }

        res.json(data);
    } catch (error) {
        console.error('Remix error:', error);
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
 * POST /api/upload
 * Upload image to fal.ai storage
 */
app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        // Upload to fal.ai storage
        const response = await fetch('https://fal.ai/api/storage/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Key ${FAL_API_KEY}`,
                'Content-Type': req.file.mimetype
            },
            body: req.file.buffer
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error || 'Upload failed' });
        }

        res.json({ url: data.url });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * Clean URL routing - redirect tool names to /?tool=name
 */
const TOOL_ROUTES = ['generate', 'remix', 'looks', 'styling', 'angles', 'research'];

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
║  Tools:  /generate, /remix, /looks, /styling   ║
║          /angles, /research                    ║
║                                                ║
║  API:    /api/generate, /api/remix             ║
║          /api/prompts, /api/upload             ║
╚════════════════════════════════════════════════╝
    `);
});
