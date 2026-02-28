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
import { readdirSync, statSync, existsSync, unlinkSync, mkdtempSync, writeFileSync, readFileSync } from 'fs';
import { tmpdir } from 'os';
import { execSync, spawn } from 'child_process';
import dotenv from 'dotenv';
import { fal } from '@fal-ai/client';
import sharp from 'sharp';
import heicConvert from 'heic-convert';

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

// Serve Ron Dorff finals from Dropbox folder
const RONDORFF_FINALS_DIR = '/Users/lidelaptop/Library/CloudStorage/Dropbox-Setset/Setset/01_Production/2026/260116_RonDorff/04_dailies/260221/14_Finals_PNG';
app.use('/rondorff-finals', express.static(RONDORFF_FINALS_DIR));

// API Keys from environment
const FAL_API_KEYS = {
    personal: process.env.FAL_API_KEY_PERSONAL,
    setset: process.env.FAL_API_KEY_SETSET
};
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const FREEPIK_API_KEY = process.env.FREEPIK_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const PIXELCUT_API_KEY = process.env.PIXELCUT_API_KEY;

// Helper to get image dimensions from buffer (PNG/JPEG)
function getImageDimensions(buffer) {
    try {
        // PNG: bytes 16-23 contain width (4 bytes) and height (4 bytes)
        if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
            const width = buffer.readUInt32BE(16);
            const height = buffer.readUInt32BE(20);
            return { width, height };
        }

        // JPEG: need to parse markers to find SOF
        if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
            let offset = 2;
            while (offset < buffer.length) {
                if (buffer[offset] !== 0xFF) break;

                const marker = buffer[offset + 1];
                const length = buffer.readUInt16BE(offset + 2);

                // SOF markers (0xC0-0xCF except 0xC4, 0xC8, 0xCC)
                if (marker >= 0xC0 && marker <= 0xCF && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC) {
                    const height = buffer.readUInt16BE(offset + 5);
                    const width = buffer.readUInt16BE(offset + 7);
                    return { width, height };
                }

                offset += 2 + length;
            }
        }

        return null;
    } catch (e) {
        return null;
    }
}

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

        console.log(`📤 [Generate] Model: ${model}`);

        if (!endpoint) {
            return res.status(400).json({ error: `Unknown model: ${model}` });
        }

        // Disable safety checker to avoid false positives on fashion/editorial content
        const requestParams = {
            ...params,
            enable_safety_checker: false
        };

        // Z Image uses image_size instead of aspect_ratio
        // Convert aspect_ratio to image_size format for Z Image
        if (model === 'zimage' && requestParams.aspect_ratio) {
            const aspectToSize = {
                '16:9': 'landscape_16_9',
                '9:16': 'portrait_16_9',
                '4:3': 'landscape_4_3',
                '3:4': 'portrait_4_3',
                '1:1': 'square_hd',
                '3:2': 'landscape_4_3', // closest match
                '2:3': 'portrait_4_3'   // closest match
            };
            requestParams.image_size = aspectToSize[requestParams.aspect_ratio] || 'landscape_16_9';
            delete requestParams.aspect_ratio;
        }

        console.log(`📤 [Generate] Params:`, JSON.stringify(requestParams, null, 2));

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${getFalKey(req)}`
            },
            body: JSON.stringify(requestParams)
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
 * POST /api/generate-gemini
 * Generate images using Gemini 3.1 Flash Image Preview (Nano Banana 2)
 * Optimized for speed and high-volume use cases
 */
app.post('/api/generate-gemini', async (req, res) => {
    try {
        const { prompt, aspect_ratio = '3:4', image_size = '1024' } = req.body;

        console.log(`🎨 [Gemini Image] Generating image...`);
        console.log(`🎨 [Gemini Image] Prompt: "${prompt.substring(0, 80)}..."`);
        console.log(`🎨 [Gemini Image] Aspect: ${aspect_ratio}, Size: ${image_size}`);

        // Use Gemini 3.1 Flash Image Preview (Nano Banana 2) - optimized for speed
        const model = 'gemini-3.1-flash-image-preview';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

        const requestBody = {
            contents: [{
                parts: [{ text: prompt }]
            }],
            generationConfig: {
                responseModalities: ['TEXT', 'IMAGE'],
                imageConfig: {
                    aspectRatio: aspect_ratio,
                    imageSize: image_size
                }
            }
        };

        const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Gemini Image] API Error:', data);
            return res.status(response.status).json({
                error: data.error?.message || 'Gemini image generation failed',
                details: data
            });
        }

        // Extract image from response
        const candidate = data.candidates?.[0];
        const parts = candidate?.content?.parts || [];

        // Find the image part
        const imagePart = parts.find(p => p.inlineData?.mimeType?.startsWith('image/'));
        const textPart = parts.find(p => p.text);

        if (!imagePart) {
            console.error('❌ [Gemini Image] No image in response:', data);
            return res.status(500).json({
                error: 'No image generated',
                text: textPart?.text || 'Unknown error'
            });
        }

        // Convert base64 to data URL
        const mimeType = imagePart.inlineData.mimeType;
        const base64Data = imagePart.inlineData.data;
        const dataUrl = `data:${mimeType};base64,${base64Data}`;

        console.log(`✅ [Gemini Image] Success! Generated ${mimeType} image`);

        // Return in same format as FAL for compatibility
        res.json({
            images: [{
                url: dataUrl,
                content_type: mimeType
            }]
        });

    } catch (error) {
        console.error('❌ [Gemini Image] Server error:', error);
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

        if (!endpoint) {
            return res.status(400).json({ error: `Unknown model: ${model}` });
        }

        // Disable safety checker to avoid false positives on fashion/editorial content
        const requestParams = {
            ...params,
            enable_safety_checker: false
        };

        console.log('📤 [Remix] Params:', JSON.stringify(requestParams, null, 2));

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Key ${getFalKey(req)}`
            },
            body: JSON.stringify(requestParams)
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
 * POST /api/remix-gemini
 * Remix/transform images using Google Gemini API directly
 * Supports gemini-2.5-flash-image, gemini-3-pro-image-preview, and gemini-3.1-flash-image-preview models
 */
app.post('/api/remix-gemini', async (req, res) => {
    try {
        const { model, prompt, image_urls, image_base64s, aspect_ratio, resolution, num_images = 1, web_search = false } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Map model parameter to actual Gemini model IDs
        let modelId;
        if (model === 'gemini-3-pro') {
            modelId = 'gemini-3-pro-image-preview';
        } else if (model === 'gemini-3.1-flash') {
            modelId = 'gemini-3.1-flash-image-preview';
        } else {
            modelId = 'gemini-2.5-flash-image';
        }
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

        console.log(`🎨 [Gemini Remix] Model: ${modelId}`);
        console.log(`🎨 [Gemini Remix] Prompt: ${prompt.substring(0, 100)}...`);
        console.log(`🎨 [Gemini Remix] Images: ${image_base64s?.length || image_urls?.length || 0} (${image_base64s ? 'base64' : 'urls'})`);
        console.log(`🎨 [Gemini Remix] Aspect: ${aspect_ratio || 'default'}, Resolution: ${resolution || 'default'}`);
        console.log(`🎨 [Gemini Remix] Web Search: ${web_search ? 'ON' : 'OFF'}`);

        // Build the content parts array
        const parts = [{ text: prompt }];

        // Add images - prefer base64 if provided (skips fal.ai upload)
        if (image_base64s && image_base64s.length > 0) {
            for (const b64 of image_base64s) {
                // Handle data URLs or raw base64
                let mimeType = 'image/jpeg';
                let base64Data = b64;

                if (b64.startsWith('data:')) {
                    const match = b64.match(/^data:([^;]+);base64,(.+)$/);
                    if (match) {
                        mimeType = match[1];
                        base64Data = match[2];
                    }
                }

                parts.push({
                    inline_data: {
                        mime_type: mimeType,
                        data: base64Data
                    }
                });
            }
        }
        // Fallback to URLs if no base64 provided
        else if (image_urls && image_urls.length > 0) {
            // Fetch ALL images in parallel for speed
            const imagePromises = image_urls.map(async (imageUrl) => {
                const imageResponse = await fetch(imageUrl);
                const imageBuffer = await imageResponse.buffer();
                const base64Data = imageBuffer.toString('base64');

                // Determine mime type from URL or default to jpeg
                let mimeType = 'image/jpeg';
                if (imageUrl.includes('.png')) mimeType = 'image/png';
                else if (imageUrl.includes('.webp')) mimeType = 'image/webp';

                return {
                    inline_data: {
                        mime_type: mimeType,
                        data: base64Data
                    }
                };
            });

            const imageParts = await Promise.all(imagePromises);
            parts.push(...imageParts);
        }

        // Build request body for Gemini
        const requestBody = {
            contents: [{
                parts: parts
            }],
            generationConfig: {
                responseModalities: ['Text', 'Image']
            }
        };

        // Add imageConfig for aspect ratio and resolution (nested inside generationConfig)
        if (aspect_ratio || resolution) {
            requestBody.generationConfig.imageConfig = {};
            if (aspect_ratio) {
                requestBody.generationConfig.imageConfig.aspectRatio = aspect_ratio;
            }
            if (resolution) {
                // Pass resolution directly as-is (1K, 2K, 4K)
                requestBody.generationConfig.imageConfig.imageSize = resolution;
            }
        }

        // Add web search / grounding tool if enabled
        if (web_search) {
            requestBody.tools = [{
                google_search: {}
            }];
        }

        // Debug: log imageConfig being sent
        if (requestBody.generationConfig.imageConfig) {
            console.log(`🎨 [Gemini Remix] imageConfig:`, JSON.stringify(requestBody.generationConfig.imageConfig));
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': GEMINI_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Gemini Remix] API Error:', data);
            return res.status(response.status).json({
                error: data.error?.message || 'Gemini remix failed',
                details: data
            });
        }

        // Check for content filter / safety block
        const candidate = data.candidates?.[0];
        const finishReason = candidate?.finishReason;
        const safetyRatings = candidate?.safetyRatings;

        // Detect blocked content
        if (finishReason === 'SAFETY' || finishReason === 'BLOCKED' || finishReason === 'OTHER') {
            console.warn(`⚠️ [Gemini Remix] Content blocked! Reason: ${finishReason}`);
            if (safetyRatings) {
                const blockedCategories = safetyRatings
                    .filter(r => r.probability !== 'NEGLIGIBLE' && r.probability !== 'LOW')
                    .map(r => `${r.category}: ${r.probability}`);
                console.warn(`⚠️ [Gemini Remix] Safety flags: ${blockedCategories.join(', ') || 'none flagged'}`);
            }
            // Return empty images array but with reason
            return res.json({
                images: [],
                blocked: true,
                reason: finishReason,
                safetyRatings
            });
        }

        // Debug: Log full response structure
        console.log(`📦 [Gemini Remix] Response structure:`, JSON.stringify(data, null, 2).substring(0, 1000));

        // Extract images and text from response
        const images = [];
        let text = '';
        if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
                // Gemini returns inlineData (camelCase), not inline_data
                const inlineData = part.inlineData || part.inline_data;
                console.log(`📄 [Gemini Remix] Part type:`, part.text ? 'text' : inlineData ? 'inlineData' : 'unknown');
                if (inlineData) {
                    const mimeType = inlineData.mimeType || inlineData.mime_type || 'image/jpeg';
                    const dataUrl = `data:${mimeType};base64,${inlineData.data}`;
                    images.push({ url: dataUrl });
                }
                if (part.text) {
                    text += part.text;
                }
            }
        }

        // Log if no images but not explicitly blocked (could still be safety related)
        if (images.length === 0 && !finishReason && !text) {
            console.warn(`⚠️ [Gemini Remix] No images or text returned, no explicit block. Response:`, JSON.stringify(data).substring(0, 500));
        }

        console.log(`✅ [Gemini Remix] Generated ${images.length} image(s)${text ? ', has text' : ''}${finishReason ? ` (finish: ${finishReason})` : ''}`);

        // Return in same format as FAL API for compatibility, plus text if present
        res.json({ images, text: text || undefined });

    } catch (error) {
        console.error('❌ [Gemini Remix] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/analyze-gemini
 * Analyze images using Google Gemini (text-only output)
 * More permissive than GPT-4 Vision for product photography tasks
 * Accepts either image_url OR image (base64 data URL)
 */
app.post('/api/analyze-gemini', async (req, res) => {
    try {
        const { image_url, image_urls, image, prompt } = req.body;

        // Support single image_url, array of image_urls, or base64 image
        const hasImage = image_url || (image_urls && image_urls.length > 0) || image;
        if (!hasImage || !prompt) {
            return res.status(400).json({ error: 'Image (URL, URLs array, or base64) and prompt are required' });
        }

        // Use gemini-2.0-flash for fast text analysis
        const modelId = 'gemini-2.0-flash';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

        // Build parts array - start with prompt
        const parts = [{ text: prompt }];

        // Helper function to add image to parts
        const addImageToParts = async (url) => {
            const imageResponse = await fetch(url);
            const imageBuffer = await imageResponse.buffer();
            const base64Data = imageBuffer.toString('base64');

            let mimeType = 'image/jpeg';
            if (url.includes('.png')) mimeType = 'image/png';
            else if (url.includes('.webp')) mimeType = 'image/webp';

            parts.push({
                inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                }
            });
        };

        // Handle different image input formats
        if (image) {
            // Handle base64 data URL (e.g., "data:image/png;base64,...")
            const matches = image.match(/^data:([^;]+);base64,(.+)$/);
            let mimeType, base64Data;
            if (matches) {
                mimeType = matches[1];
                base64Data = matches[2];
            } else {
                mimeType = 'image/jpeg';
                base64Data = image;
            }
            parts.push({
                inline_data: {
                    mime_type: mimeType,
                    data: base64Data
                }
            });
            console.log(`🔍 [Gemini Analyze] Analyzing 1 image (base64)...`);
        } else if (image_urls && image_urls.length > 0) {
            // Multiple image URLs
            console.log(`🔍 [Gemini Analyze] Analyzing ${image_urls.length} images...`);
            for (const url of image_urls) {
                await addImageToParts(url);
            }
        } else if (image_url) {
            // Single image URL
            console.log(`🔍 [Gemini Analyze] Analyzing 1 image...`);
            await addImageToParts(image_url);
        }

        const requestBody = {
            contents: [{
                parts: parts
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000
            }
        };

        const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Gemini Analyze] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Gemini analysis failed' });
        }

        // Extract text content from response
        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log(`✅ [Gemini Analyze] Success: "${textContent.substring(0, 60)}..."`);

        res.json({ content: textContent });

    } catch (error) {
        console.error('❌ [Gemini Analyze] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/gemini-text
 * Text-only Gemini generation (no images)
 * Used for prompt enhancement, text generation, etc.
 */
app.post('/api/gemini-text', async (req, res) => {
    try {
        const { prompt, system } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const modelId = 'gemini-2.0-flash';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent`;

        const parts = [];
        if (system) {
            parts.push({ text: `System: ${system}\n\n` });
        }
        parts.push({ text: prompt });

        const requestBody = {
            contents: [{
                parts: parts
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2000
            }
        };

        console.log(`🔍 [Gemini Text] Processing...`);

        const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Gemini Text] Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Gemini text generation failed' });
        }

        const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log(`✅ [Gemini Text] Success: "${textContent.substring(0, 60)}..."`);

        res.json({ content: textContent });

    } catch (error) {
        console.error('❌ [Gemini Text] Server error:', error);
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
 * POST /api/video
 * Generate video from images using Kling video models
 * Supports v1.6 Pro (first/last frame), v2.6 Pro (better quality + audio), and v3.0/O3 (reference-to-video)
 */
app.post('/api/video', async (req, res) => {
    try {
        const { model, image_url, tail_image_url, prompt, duration, aspect_ratio, generate_audio, negative_prompt, cfg_scale } = req.body;

        if (!image_url || !prompt) {
            return res.status(400).json({ error: 'image_url and prompt are required' });
        }

        // Configure fal with the appropriate key
        fal.config({ credentials: getFalKey(req) });

        // Determine endpoint based on model
        let endpoint;
        if (model === 'v3-pro') {
            // Kling V3 Pro image-to-video (cinematic, $0.224/s no audio)
            endpoint = 'fal-ai/kling-video/v3/pro/image-to-video';
        } else if (model === 'v3-standard') {
            // Kling V3 Standard image-to-video (faster, cheaper)
            endpoint = 'fal-ai/kling-video/v3/standard/image-to-video';
        } else if (model === 'v3.0-pro') {
            // O3 Pro image-to-video
            endpoint = 'fal-ai/kling-video/o3/pro/image-to-video';
        } else if (model === 'v3.0-standard') {
            endpoint = 'fal-ai/kling-video/o3/standard/image-to-video';
        } else if (model === 'v2.6') {
            endpoint = 'fal-ai/kling-video/v2.6/pro/image-to-video';
        } else if (model === 'v2.1-pro') {
            endpoint = 'fal-ai/kling-video/v2.1/pro/image-to-video';
        } else if (model === 'v2.1-standard') {
            endpoint = 'fal-ai/kling-video/v2.1/standard/image-to-video';
        } else {
            endpoint = 'fal-ai/kling-video/v1.6/pro/image-to-video';
        }

        // Build params based on model
        let params;

        if (model === 'v3-pro' || model === 'v3-standard') {
            // Kling V3 image-to-video uses image_url
            params = {
                prompt,
                image_url,
                duration: duration || '5',
                generate_audio: generate_audio !== undefined ? generate_audio : false
            };
            if (tail_image_url) params.end_image_url = tail_image_url;
            if (aspect_ratio) params.aspect_ratio = aspect_ratio;
            if (negative_prompt) params.negative_prompt = negative_prompt;
            if (cfg_scale !== undefined) params.cfg_scale = cfg_scale;
        } else if (model === 'v3.0-pro' || model === 'v3.0-standard') {
            // O3 reference-to-video uses start_image_url and end_image_url
            params = {
                prompt,
                start_image_url: image_url,
                duration: duration || '5',
                generate_audio: generate_audio !== undefined ? generate_audio : false
            };
            if (tail_image_url) params.end_image_url = tail_image_url;
            if (aspect_ratio) params.aspect_ratio = aspect_ratio;
            if (negative_prompt) params.negative_prompt = negative_prompt;
            if (cfg_scale !== undefined) params.cfg_scale = cfg_scale;
        } else if (model === 'v2.1-pro' || model === 'v2.1-standard') {
            // Kling v2.1 image-to-video
            params = {
                prompt,
                image_url,
                duration: duration || '5'
            };
            if (aspect_ratio) params.aspect_ratio = aspect_ratio;
            if (negative_prompt) params.negative_prompt = negative_prompt;
        } else {
            params = {
                prompt,
                image_url,
                duration: duration || '5'
            };

            if (model === 'v2.6') {
                // v2.6 specific params
                if (generate_audio !== undefined) params.generate_audio = generate_audio;
                if (negative_prompt) params.negative_prompt = negative_prompt;
            } else {
                // v1.6 specific params
                if (tail_image_url) params.tail_image_url = tail_image_url;
                if (aspect_ratio) params.aspect_ratio = aspect_ratio;
                if (cfg_scale !== undefined) params.cfg_scale = cfg_scale;
                if (negative_prompt) params.negative_prompt = negative_prompt;
            }
        }

        console.log(`🎬 [Video] Model: ${model}, Endpoint: ${endpoint}`);
        console.log(`🎬 [Video] Params:`, JSON.stringify(params, null, 2));

        // Use fal.subscribe for long-running video generation
        const result = await fal.subscribe(endpoint, {
            input: params,
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === 'IN_PROGRESS') {
                    console.log(`🎬 [Video] Progress: ${update.logs?.map(l => l.message).join(', ') || 'processing...'}`);
                }
            }
        });

        console.log(`✅ [Video] Complete:`, JSON.stringify(result.data, null, 2));

        res.json(result.data);
    } catch (error) {
        console.error('❌ [Video] Error:', error);
        // Log detailed validation errors
        if (error.body?.detail) {
            console.error('❌ [Video] Detail:', JSON.stringify(error.body.detail, null, 2));
        }
        const errorMessage = error.body?.detail?.[0]?.msg || error.message;
        res.status(500).json({ error: errorMessage });
    }
});

/**
 * POST /api/video-360
 * Generate 360° rotation videos using Kling reference-to-video
 * Uses the same image as start + end frame for seamless looping
 * Supports optional elements (frontal + reference images) for character consistency
 */
app.post('/api/video-360', async (req, res) => {
    try {
        const { prompt, start_image_url, end_image_url, duration, aspect_ratio, quality, elements: elementsArr } = req.body;

        if (!start_image_url || !prompt) {
            return res.status(400).json({ error: 'start_image_url and prompt are required' });
        }

        // Configure fal with the appropriate key
        fal.config({ credentials: getFalKey(req) });

        // Determine endpoint based on quality
        const qualityLevel = quality === 'standard' ? 'standard' : 'pro';
        const endpoint = `fal-ai/kling-video/o3/${qualityLevel}/reference-to-video`;

        // Build params
        const params = {
            prompt,
            start_image_url,
            end_image_url: end_image_url || start_image_url,
            duration: duration || '8',
            shot_type: 'customize'
        };

        if (aspect_ratio) params.aspect_ratio = aspect_ratio;

        // Add elements if provided
        if (elementsArr && Array.isArray(elementsArr) && elementsArr.length > 0) {
            params.elements = elementsArr.map(el => ({
                frontal_image_url: el.frontal_image_url,
                reference_image_urls: el.reference_image_urls || []
            }));
        }

        console.log(`🔄 [Video 360] Quality: ${qualityLevel}, Endpoint: ${endpoint}`);
        console.log(`🔄 [Video 360] Params:`, JSON.stringify(params, null, 2));

        // Use fal.subscribe for long-running video generation
        const result = await fal.subscribe(endpoint, {
            input: params,
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === 'IN_PROGRESS') {
                    console.log(`🔄 [Video 360] Progress: ${update.logs?.map(l => l.message).join(', ') || 'processing...'}`);
                }
            }
        });

        console.log(`✅ [Video 360] Complete:`, JSON.stringify(result.data, null, 2));

        res.json(result.data);
    } catch (error) {
        console.error('❌ [Video 360] Error:', error);
        if (error.body?.detail) {
            console.error('❌ [Video 360] Detail:', JSON.stringify(error.body.detail, null, 2));
        }
        const errorMessage = error.body?.detail?.[0]?.msg || error.message;
        res.status(500).json({ error: errorMessage });
    }
});

/**
 * POST /api/video/seedance
 * Generate video from images using Seedance (ByteDance) model
 * Supports image-to-video with movement prompts
 * model_version: '1.0' or '1.5' (default: '1.5')
 */
app.post('/api/video/seedance', async (req, res) => {
    try {
        const { image_url, prompt, aspect_ratio, resolution, duration, camera_fixed, seed, end_image_url, model_version } = req.body;

        if (!image_url || !prompt) {
            return res.status(400).json({ error: 'image_url and prompt are required' });
        }

        // Configure fal with the appropriate key
        fal.config({ credentials: getFalKey(req) });

        // Select endpoint based on model version
        const version = model_version || '1.5';
        const endpoint = version === '1.0'
            ? 'fal-ai/bytedance/seedance/v1/pro/image-to-video'
            : 'fal-ai/bytedance/seedance/v1.5/pro/image-to-video';

        // Build params - duration must be string enum "2"-"12"
        const durationNum = Math.min(12, Math.max(2, parseInt(duration) || 5));

        // Valid aspect ratios for v1.5 with their decimal values
        const validAspectRatios = [
            { ratio: '21:9', value: 21/9 },   // 2.33 ultra-wide
            { ratio: '16:9', value: 16/9 },   // 1.78 landscape
            { ratio: '4:3', value: 4/3 },     // 1.33 landscape
            { ratio: '1:1', value: 1 },       // 1.0 square
            { ratio: '3:4', value: 3/4 },     // 0.75 portrait
            { ratio: '9:16', value: 9/16 }    // 0.56 tall portrait
        ];

        // Detect aspect ratio from image if 'auto' or not specified
        let finalAspectRatio = aspect_ratio;
        if (!aspect_ratio || aspect_ratio === 'auto') {
            try {
                // Fetch image to get dimensions
                const imageResponse = await fetch(image_url);
                const buffer = await imageResponse.buffer();

                // Parse image dimensions from buffer (works for PNG/JPEG)
                const dimensions = getImageDimensions(buffer);
                if (dimensions) {
                    const imageRatio = dimensions.width / dimensions.height;

                    // Find closest matching aspect ratio
                    let closest = validAspectRatios[0];
                    let minDiff = Math.abs(imageRatio - closest.value);

                    for (const ar of validAspectRatios) {
                        const diff = Math.abs(imageRatio - ar.value);
                        if (diff < minDiff) {
                            minDiff = diff;
                            closest = ar;
                        }
                    }

                    finalAspectRatio = closest.ratio;
                    console.log(`🎬 [Seedance] Image ${dimensions.width}x${dimensions.height} (${imageRatio.toFixed(2)}) → ${finalAspectRatio}`);
                }
            } catch (e) {
                console.log(`⚠️ [Seedance] Could not detect aspect ratio, defaulting to 3:4`);
                finalAspectRatio = '3:4';  // Default for fashion
            }
        }

        // Validate resolution for each version
        // v1.0: supports 480p, 720p, 1080p
        // v1.5: supports 480p, 720p only
        let finalResolution = resolution || '720p';
        if (version === '1.5' && finalResolution === '1080p') {
            finalResolution = '720p';  // Downgrade for v1.5
        }

        const params = {
            prompt,
            image_url,
            duration: String(durationNum),  // String enum: "2", "3", ... "12"
            aspect_ratio: finalAspectRatio,
            resolution: finalResolution,
            enable_safety_checker: false
        };

        // v1.5 has generate_audio option, v1.0 does not
        if (version === '1.5') {
            params.generate_audio = false;
        }

        if (seed !== undefined && seed !== -1) params.seed = seed;
        if (camera_fixed) params.camera_fixed = true;
        if (end_image_url) params.end_image_url = end_image_url;

        console.log(`🎬 [Seedance v${version}] Generating video...`);
        console.log(`🎬 [Seedance v${version}] Params:`, JSON.stringify(params, null, 2));

        // Use fal.subscribe for long-running video generation
        const result = await fal.subscribe(endpoint, {
            input: params,
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === 'IN_PROGRESS') {
                    console.log(`🎬 [Seedance v${version}] Progress: ${update.logs?.map(l => l.message).join(', ') || 'processing...'}`);
                }
            }
        });

        console.log(`✅ [Seedance v${version}] Complete:`, JSON.stringify(result.data, null, 2));

        res.json(result.data);
    } catch (error) {
        console.error('❌ [Seedance] Error:', error);
        console.error('❌ [Seedance] Error body:', JSON.stringify(error.body, null, 2));
        res.status(500).json({ error: error.message, details: error.body });
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
 * POST /api/prompts/vary
 * Create a single variation of a base editorial mood prompt
 * Uses GPT-4o-mini for speed and cost efficiency
 */
app.post('/api/prompts/vary', async (req, res) => {
    try {
        const { basePrompt, moodName, expression, framing, gender } = req.body;

        if (!basePrompt) {
            return res.status(400).json({ error: 'basePrompt is required' });
        }

        const systemPrompt = `You are an expert editorial fashion photography prompt writer. Given a base mood/lighting concept, create ONE unique variation that keeps the core aesthetic but varies the specific details.

KEEP EXACTLY THE SAME:
- The core lighting style and mood
- The overall atmosphere and color treatment
- The photography technique/approach

VARY THESE ELEMENTS (pick 2-3 to change):
- Specific pose details (but keep it natural and editorial)
- Clothing specifics (type, color, texture - always clothed unless prompt says otherwise)
- Minor background/setting nuances
- Small compositional adjustments
- Specific textures or material details

RULES:
- Output ONLY the new prompt, nothing else
- Keep it roughly the same length as the original
- Maintain the same quality level and photorealistic editorial style
- The subject is a ${gender} model
- Do NOT include framing or expression - those are handled separately
- Always include "color photography" at the end`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Create a unique variation of this "${moodName}" editorial mood prompt:\n\n${basePrompt}` }
                ],
                temperature: 0.8,
                max_tokens: 500
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('❌ [Prompt Vary] OpenAI error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        const variedPrompt = data.choices[0].message.content.trim();
        console.log(`✅ [Prompt Vary] Created variation for "${moodName}"`);

        res.json({
            original: basePrompt,
            varied: variedPrompt,
            moodName
        });

    } catch (error) {
        console.error('❌ [Prompt Vary] Error:', error);
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
 * POST /api/prompts/campaign
 * Generate swimwear campaign prompts using Gemini
 * Specifically designed for Ron Dorff style shoots
 */
app.post('/api/prompts/campaign', async (req, res) => {
    try {
        const {
            numPrompts = 10,
            environments = ['ibiza'],
            lighting = ['midday'],
            includeModel = true,
            customInstructions = null
        } = req.body;

        console.log(`📝 [Campaign Prompts] Generating ${numPrompts} prompts`);
        console.log(`   Environments: ${environments.join(', ')}`);
        console.log(`   Lighting: ${lighting.join(', ')}`);
        console.log(`   Include model: ${includeModel}`);
        if (customInstructions) {
            console.log(`   Custom instructions: ${customInstructions}`);
        }

        const systemPrompt = `You are an expert at writing photorealistic image generation prompts for premium male swimwear brand campaigns. Your prompts should create campaign-ready imagery.

BRAND CONTEXT:
- Premium European male swimwear/beachwear brand
- Aesthetic: Clean, graphic, composed, editorial
- Models: Athletic, suntanned, healthy looking men
- Vibe: Sophisticated summer, not overly commercial

ENVIRONMENT GUIDELINES:
${environments.includes('rocky-beach') ? `
ROCKY BEACH (Ibiza-style bright limestone):
- Light limestone, sandstone, beige/cream/honey-toned rocks
- Rocks should be PROMINENT - in foreground creating depth and framing
- Intimate scale, NOT vast landscapes
- Rocky textures are key visual elements
- Small sandy areas between rocks, turquoise water visible
- Clean, pristine beach - no clutter or tourists
- NO trees, NO vast panoramas, NO generic "Mediterranean" feel
` : ''}
${environments.includes('black-sand') ? `
BLACK SAND BEACH (volcanic/dark):
- Black lava rock, basalt formations, dark volcanic sand
- Dramatic dark textures contrasting with lighter sand areas
- Rugged coastal scenery with texture
- Moody, dramatic feel
` : ''}
${environments.includes('architecture-v1') ? `
ARCHITECTURE V1 (MINIMAL, INTEGRATED, REALISTIC):
- Architecture must be REAL PLACES - rooftop terraces, seaside promenades, piers, balconies
- NO random structures dropped on beach - must feel like a real location
- Warm tones: terracotta, ochre, cream, sandy concrete
- Ocean visible on horizon
- GRAPHIC compositions with strong geometric lines

APPROVED ARCHITECTURE LOCATIONS:
- Flat rooftop terrace with low terracotta/ochre walls, model seated on wall edge, ocean and sky beyond
- Seaside concrete promenade with simple railing, model leaning on railing looking at ocean
- Empty rooftop with geometric flat surfaces creating angular shadows, model standing/seated
- Concrete pier extending over water, model walking or standing at edge

ARCHITECTURE AVOID LIST:
- NO random concrete blocks or structures on beach
- NO bridges, NO fake-looking standalone objects
- NO messy beaches, NO overly pink/unrealistic skies
- NO Greek-style columns or arches
` : ''}
${environments.includes('architecture-v2') ? `
ARCHITECTURE V2 (REFINED MINIMAL):
- Even more minimal than v1 - single architectural elements only
- Focus on: flat rooftop edges, low walls, simple railings, clean terraces
- Model interacting with architecture: seated on ledge, leaning on wall, standing by railing
- Warm Mediterranean tones: terracotta, ochre, cream concrete
- Ocean ALWAYS visible as backdrop
- Strong graphic compositions with geometric shadows
- Empty, serene, no clutter
- Think: 1990s editorial campaign on a luxury villa rooftop
` : ''}

LIGHTING OPTIONS TO USE:
${lighting.includes('midday') ? '- MIDDAY: Bright summer sun, vivid blue sky, high sun, warm but not orange, crisp daylight' : ''}
${lighting.includes('sunrise') ? '- SUNRISE: Soft warm light, golden pink sky, gentle shadows, peaceful atmosphere' : ''}
${lighting.includes('sunset') ? '- SUNSET: Golden hour, warm orange tones, long dramatic shadows, romantic mood' : ''}

${includeModel ? `
MODEL GUIDELINES:
- Athletic male model in swimwear ONLY (briefs, swim shorts) - no shirts unless tank top
- Suntanned, healthy skin
- FACE MUST ALWAYS BE VISIBLE - NEVER crop out the face
- Confident, relaxed poses - NOT awkward, stiff, or jumping
- NO PROPS: no bags, no hats, no accessories, no towels

CRITICAL FRAMING RULES:
- ALWAYS full body shots: head to feet visible (90% of shots)
- Occasional 3/4 body: head to knees (10% of shots)
- NEVER just lower body/torso - face MUST be in frame
- NEVER close-up on just swimwear without face

POSE VARIETY (use ALL of these across prompts - MAXIMUM variety):
- Standing confidently with direct gaze at camera
- Seated casually on rocks/ledge/wall edge, legs extended
- Walking naturally toward or away from camera
- Leaning against wall/railing with weight shifted
- Looking off to the side pensively at horizon
- Crouching or squatting casually
- Mid-stride walking shot
- Seated with one knee up, arm resting on knee
- Standing with hands adjusting waistband

CAMERA ANGLE VARIETY (mix these up):
- Eye level straight on
- Slightly low angle (model appears taller/more powerful)
- Side profile view
- 3/4 angle view
- Model positioned left/center/right of frame (vary placement)
` : 'Generate ENVIRONMENT ONLY - no people, empty scenes.'}

COMPOSITION RULES:
- Intimate, close framing - NOT vast landscapes
- Rocks/architecture creating foreground interest and depth
- Clean, graphic compositions
- Professional fashion photography aesthetic

PROMPT FORMAT:
${includeModel
    ? `Each prompt should be 2-3 sentences, starting with "Photorealistic campaign image for premium male swimwear brand."
Include: male model, specific environment details, lighting quality, composition notes.`
    : `Each prompt should be 2-3 sentences, starting with "Empty scenic landscape photograph, no people, no humans."
Include: specific environment details, lighting quality, composition notes.
CRITICAL: NO people, NO humans, NO figures whatsoever - purely landscape/environment shots.`}
End with: "professional ${includeModel ? 'fashion' : 'landscape'} photography, natural light only"

Generate ${numPrompts} unique, varied prompts. Return ONLY the prompts, one per line, no numbering.`;

        const userMessage = `Generate ${numPrompts} photorealistic swimwear campaign prompts using these settings:
- Environments: ${environments.join(', ')}
- Lighting: ${lighting.join(', ')}
- ${includeModel ? 'Include male model in swimwear' : 'Environment only, no people'}
${customInstructions ? `
CUSTOM INSTRUCTIONS - HIGHEST PRIORITY (ALL prompts MUST follow this):
${customInstructions}

IMPORTANT: The action/pose described above must be used in EVERY prompt. Do NOT vary the pose. Vary ONLY:
- Camera angles (eye level, low angle, side profile, 3/4 view)
- Model placement (left, center, right of frame)
- Swimwear colors and styles
- Specific locations within the environment type
- Lighting nuances
` : `
CRITICAL: Each prompt MUST be completely different from the others:
- Use DIFFERENT poses for each prompt (standing, seated, walking, leaning, crouching, etc.)
- Use DIFFERENT camera angles (eye level, low angle, side profile, 3/4 view)
- Use DIFFERENT model placements (left, center, right of frame)
- Use DIFFERENT swimwear colors and styles
- Use DIFFERENT specific locations within the environment type
- NO two prompts should feel similar - maximum variety is essential`}`;

        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

        const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: systemPrompt },
                        { text: userMessage }
                    ]
                }],
                generationConfig: {
                    temperature: 0.9,
                    maxOutputTokens: 4000
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Campaign Prompts] Gemini error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Prompt generation failed' });
        }

        const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        let prompts = content.split('\n').filter(line => line.trim() && (line.includes('Photorealistic') || line.includes('Empty scenic')));

        // Clean up prompts
        prompts = prompts.map(p => p.trim().replace(/^\d+[\.\)]\s*/, ''));

        console.log(`✅ [Campaign Prompts] Generated ${prompts.length} prompts`);

        res.json({ prompts });
    } catch (error) {
        console.error('❌ [Campaign Prompts] Error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/analyze-brand
 * Component Library System - extracts structured categories from moodboard
 * Supports SSE streaming for progress updates
 */
app.post('/api/analyze-brand', async (req, res) => {
    try {
        const { images, brandName, previousAnalysis, feedback, stream } = req.body;

        if (!brandName) {
            return res.status(400).json({ error: 'Brand name is required' });
        }

        const hasImages = images && images.length > 0;
        console.log(`🎨 [Brand Analysis] ${hasImages ? `Analyzing ${images.length} images for` : 'Using GPT knowledge for'} brand: ${brandName}`);

        // Helper to send SSE progress updates
        const sendProgress = (phase, current, total, message) => {
            if (stream) {
                res.write(`data: ${JSON.stringify({ type: 'progress', phase, current, total, message })}\n\n`);
            }
            console.log(`   ${message}`);
        };

        // Setup SSE if streaming requested
        if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.flushHeaders();
        }

        let fullResponse;
        let componentLibrary = null;

        if (previousAnalysis && feedback) {
            // Refinement mode - single call
            if (stream) sendProgress('refine', 0, 1, 'Refining analysis...');

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{
                        role: 'user',
                        content: `You previously analyzed the visual identity of ${brandName} and produced this analysis:

${previousAnalysis}

The user has provided this feedback for refinement:
"${feedback}"

Please update and refine your analysis based on this feedback. Keep the same structure but adjust the content based on the user's notes.`
                    }],
                    max_tokens: 2500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (!response.ok) {
                console.error('❌ [Brand Analysis] API Error:', data);
                if (stream) {
                    res.write(`data: ${JSON.stringify({ type: 'error', error: data.error?.message || 'Analysis failed' })}\n\n`);
                    return res.end();
                }
                return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
            }
            fullResponse = data.choices[0].message.content;

        } else if (hasImages && images.length > 1) {
            // ═══════════════════════════════════════════════════════════════
            // COMPONENT LIBRARY SYSTEM - Extract structured categories
            // ═══════════════════════════════════════════════════════════════

            // PHASE 1: Extract structured components from each image
            console.log(`📸 [Brand Analysis] Phase 1: Extracting components from ${images.length} images...`);
            sendProgress('analyze', 0, images.length, `Extracting components from ${images.length} images...`);

            const componentExtractionPrompt = `Analyze this image and extract STRUCTURED COMPONENTS for a prompt library.
Return ONLY valid JSON (no markdown, no backticks) with these exact fields:

{
  "lighting": {
    "quality": "soft/hard/mixed",
    "direction": "front/side/back/overhead/natural-window",
    "source": "natural-daylight/flash/studio-softbox/ambient/golden-hour/overcast",
    "mood": "warm/cool/neutral/dramatic/moody",
    "specific": "detailed description like 'soft golden hour side light with long shadows'"
  },
  "composition": {
    "angle": "eye-level/low-angle/high-angle/overhead-flat/dutch-angle",
    "framing": "tight-crop/medium-shot/wide-environmental/extreme-close-up/full-body",
    "style": "editorial-posed/candid-documentary/action-frozen/lifestyle-natural/studio-controlled",
    "specific": "detailed description of the composition approach"
  },
  "environment": {
    "type": "indoor-residential/indoor-commercial/outdoor-urban/outdoor-nature/studio",
    "location": "very specific like 'basketball court with brutalist apartment buildings' or 'mid-century living room with designer furniture'",
    "variations": ["3 similar but different locations that would have the same vibe"]
  },
  "atmosphere": {
    "energy": "calm-serene/contemplative/playful-fun/dynamic-energetic/relaxed-casual/bold-confident",
    "mood": "serious-editorial/playful-youthful/luxurious-elevated/street-raw/cozy-intimate/sporty-athletic",
    "vibe_phrase": "a short phrase capturing the feeling like 'effortless urban cool' or 'sunday morning calm'"
  },
  "color": {
    "temperature": "warm/cool/neutral/mixed",
    "saturation": "bold-vibrant/muted-desaturated/natural/high-contrast",
    "dominant_colors": ["4-5 SPECIFIC colors like 'dusty terracotta', 'slate blue', 'cream white'"],
    "palette_name": "a name for this palette like 'autumn earth tones' or 'urban neutrals with pops'"
  },
  "texture_surface": {
    "primary_surface": "main surface/backdrop like 'raw concrete floor' or 'worn leather couch'",
    "textures_present": ["list all textures: 'brushed metal', 'soft knit', 'weathered brick'"],
    "material_feel": "raw-industrial/polished-refined/organic-natural/soft-cozy/urban-gritty"
  },
  "movement_pose": {
    "type": "static-posed/walking-motion/running-action/seated-relaxed/leaning-casual/holding-object/athletic-movement",
    "energy": "still/subtle-movement/moderate-motion/high-energy-action",
    "specific": "description like 'mid-stride walking confidently' or 'seated casually on floor'"
  },
  "props_context": {
    "objects_present": ["list any props: 'basketball', 'vintage lamp', 'coffee cup', 'skateboard'"],
    "context_category": "sports/lifestyle/fashion-editorial/urban-street/nature-outdoor/home-interior"
  },
  "time_weather": {
    "time_of_day": "golden-hour-sunset/midday-harsh/blue-hour-dusk/overcast-soft/night-artificial/morning-soft",
    "conditions": "clear-sunny/overcast-diffused/moody-dramatic/bright-airy/dim-atmospheric"
  }
}

Be VERY specific and detailed. This will be used to generate variety. Return ONLY the JSON.`;

            let completedCount = 0;
            const extractedComponents = await Promise.all(images.map(async (url, i) => {
                try {
                    const response = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${OPENAI_API_KEY}`
                        },
                        body: JSON.stringify({
                            model: 'gpt-4o',
                            messages: [{
                                role: 'user',
                                content: [
                                    { type: 'image_url', image_url: { url: url, detail: 'high' } },
                                    { type: 'text', text: componentExtractionPrompt }
                                ]
                            }],
                            max_tokens: 1000,
                            temperature: 0.3
                        })
                    });

                    const data = await response.json();
                    completedCount++;

                    if (!response.ok) {
                        console.error(`❌ [Brand Analysis] Image ${i + 1} failed:`, data);
                        sendProgress('analyze', completedCount, images.length, `Image ${i + 1} failed`);
                        return null;
                    }

                    sendProgress('analyze', completedCount, images.length, `✓ Image ${completedCount}/${images.length} extracted`);

                    // Parse JSON response
                    try {
                        let content = data.choices[0].message.content;
                        // Remove markdown code blocks if present
                        content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '');
                        const jsonMatch = content.match(/\{[\s\S]*\}/);
                        if (jsonMatch) {
                            return JSON.parse(jsonMatch[0]);
                        }
                    } catch (parseErr) {
                        console.error(`   ⚠ Image ${i + 1} JSON parse failed:`, parseErr.message);
                    }
                    return null;
                } catch (err) {
                    completedCount++;
                    console.error(`❌ [Brand Analysis] Image ${i + 1} error:`, err);
                    sendProgress('analyze', completedCount, images.length, `Image ${i + 1} error`);
                    return null;
                }
            }));

            // Filter out failed extractions
            const validComponents = extractedComponents.filter(c => c !== null);
            console.log(`📊 [Brand Analysis] Phase 2: Building library from ${validComponents.length} extractions...`);
            sendProgress('synthesize', 0, 1, 'Building component library...');

            // PHASE 2: Build the component library by aggregating all extractions
            componentLibrary = {
                lighting: {
                    qualities: [...new Set(validComponents.map(c => c.lighting?.quality).filter(Boolean))],
                    directions: [...new Set(validComponents.map(c => c.lighting?.direction).filter(Boolean))],
                    sources: [...new Set(validComponents.map(c => c.lighting?.source).filter(Boolean))],
                    moods: [...new Set(validComponents.map(c => c.lighting?.mood).filter(Boolean))],
                    specific_styles: [...new Set(validComponents.map(c => c.lighting?.specific).filter(Boolean))]
                },
                composition: {
                    angles: [...new Set(validComponents.map(c => c.composition?.angle).filter(Boolean))],
                    framings: [...new Set(validComponents.map(c => c.composition?.framing).filter(Boolean))],
                    styles: [...new Set(validComponents.map(c => c.composition?.style).filter(Boolean))],
                    specific_approaches: [...new Set(validComponents.map(c => c.composition?.specific).filter(Boolean))]
                },
                environment: {
                    types: [...new Set(validComponents.map(c => c.environment?.type).filter(Boolean))],
                    specific_locations: [...new Set(validComponents.map(c => c.environment?.location).filter(Boolean))],
                    location_variations: [...new Set(validComponents.flatMap(c => c.environment?.variations || []).filter(Boolean))]
                },
                atmosphere: {
                    energies: [...new Set(validComponents.map(c => c.atmosphere?.energy).filter(Boolean))],
                    moods: [...new Set(validComponents.map(c => c.atmosphere?.mood).filter(Boolean))],
                    vibe_phrases: [...new Set(validComponents.map(c => c.atmosphere?.vibe_phrase).filter(Boolean))]
                },
                color: {
                    temperatures: [...new Set(validComponents.map(c => c.color?.temperature).filter(Boolean))],
                    saturations: [...new Set(validComponents.map(c => c.color?.saturation).filter(Boolean))],
                    specific_colors: [...new Set(validComponents.flatMap(c => c.color?.dominant_colors || []).filter(Boolean))],
                    palette_names: [...new Set(validComponents.map(c => c.color?.palette_name).filter(Boolean))]
                },
                texture_surface: {
                    primary_surfaces: [...new Set(validComponents.map(c => c.texture_surface?.primary_surface).filter(Boolean))],
                    all_textures: [...new Set(validComponents.flatMap(c => c.texture_surface?.textures_present || []).filter(Boolean))],
                    material_feels: [...new Set(validComponents.map(c => c.texture_surface?.material_feel).filter(Boolean))]
                },
                movement_pose: {
                    types: [...new Set(validComponents.map(c => c.movement_pose?.type).filter(Boolean))],
                    energy_levels: [...new Set(validComponents.map(c => c.movement_pose?.energy).filter(Boolean))],
                    specific_poses: [...new Set(validComponents.map(c => c.movement_pose?.specific).filter(Boolean))]
                },
                props_context: {
                    all_objects: [...new Set(validComponents.flatMap(c => c.props_context?.objects_present || []).filter(Boolean))],
                    categories: [...new Set(validComponents.map(c => c.props_context?.context_category).filter(Boolean))]
                },
                time_weather: {
                    times_of_day: [...new Set(validComponents.map(c => c.time_weather?.time_of_day).filter(Boolean))],
                    conditions: [...new Set(validComponents.map(c => c.time_weather?.conditions).filter(Boolean))]
                }
            };

            console.log(`📚 [Brand Analysis] Component Library built:`);
            console.log(`   - ${componentLibrary.lighting.specific_styles.length} lighting styles`);
            console.log(`   - ${componentLibrary.environment.specific_locations.length} specific locations`);
            console.log(`   - ${componentLibrary.environment.location_variations.length} location variations`);
            console.log(`   - ${componentLibrary.atmosphere.vibe_phrases.length} vibe phrases`);
            console.log(`   - ${componentLibrary.color.specific_colors.length} specific colors`);

            // PHASE 3: Generate human-readable summary
            sendProgress('synthesize', 1, 2, 'Generating brand summary...');

            const summaryPrompt = `Based on this component library extracted from ${brandName}'s moodboard, write a brief summary (6-8 sentences) of the brand's visual identity.

EXTRACTED COMPONENTS:
- Environments: ${componentLibrary.environment.specific_locations.join(', ')}
- Lighting styles: ${componentLibrary.lighting.specific_styles.join(', ')}
- Atmosphere vibes: ${componentLibrary.atmosphere.vibe_phrases.join(', ')}
- Colors: ${componentLibrary.color.specific_colors.slice(0, 10).join(', ')}
- Textures: ${componentLibrary.texture_surface.all_textures.slice(0, 8).join(', ')}

Write a flowing, readable summary that captures the VARIETY in this brand's visual world. Mention the range of environments, lighting, and moods. What ties it together? Keep it concise and insightful. No bullet points, just prose.`;

            const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: summaryPrompt }],
                    max_tokens: 400,
                    temperature: 0.7
                })
            });

            const summaryData = await summaryResponse.json();
            const summary = summaryData.choices?.[0]?.message?.content || 'Component library built successfully.';

            // Store library in fullResponse for backward compatibility, but also return structured data
            fullResponse = `===SUMMARY===\n${summary}\n\n===COMPONENT LIBRARY===\n${JSON.stringify(componentLibrary, null, 2)}`;

        } else {
            // Single image or no images - original behavior
            const content = [];

            if (hasImages) {
                content.push({
                    type: 'image_url',
                    image_url: { url: images[0], detail: 'high' }
                });
            }

            const imageContext = hasImages
                ? `Examine this campaign/Instagram image to understand the brand's visual language.`
                : `Based on your knowledge of ${brandName}'s visual identity, campaign imagery, and brand aesthetic, provide a comprehensive visual analysis. Think about their Instagram, campaigns, brand guidelines, and overall visual language.`;

            content.push({
                type: 'text',
                text: `You are an expert creative director ${hasImages ? 'extracting' : 'with deep knowledge of fashion and lifestyle brands, analyzing'} the VISUAL PRINCIPLES and AESTHETIC QUALITIES of ${brandName}.

${imageContext}

Your response must have TWO parts, clearly separated:

===SUMMARY===
Write a clear summary (6-10 lines) that captures the essence of the brand's visual identity. Include:
- The overall brand feeling and emotional quality
- Lighting style and how light is used
- Types of environments and settings that feel on-brand
- Color tendencies and tonal qualities
- Mood and atmosphere
Keep it readable and flowing - no bullet points or headers, just descriptive prose.

===FULL ANALYSIS===
Now provide the detailed analysis for generating prompts:

**AESTHETIC MODES** (identify 3-4 different directions)
- Mode 1: [Name] - [description]
- Mode 2: [Name] - [description]
- Mode 3: [Name] - [description]

**LIGHTING PRINCIPLES**
List 4-6 lighting approaches the brand uses

**ENVIRONMENT CATEGORIES**
List 6-8 categories of environments that fit the brand

**MOOD SPECTRUM**
- Primary emotional tone
- 2-3 secondary moods
- Energy level range

**COLOR PALETTE**
List 5-8 specific colors

**TEXTURE & SURFACE QUALITIES**
What textures feel on-brand?

**PROMPT BUILDING BLOCKS**
15-20 short phrases organized by mode

The goal is to create NEW campaign images that FEEL like ${brandName}, not recreate reference photos.`
            });

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4o',
                    messages: [{ role: 'user', content: content }],
                    max_tokens: 2500,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (!response.ok) {
                console.error('❌ [Brand Analysis] API Error:', data);
                return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
            }
            fullResponse = data.choices[0].message.content;
        }

        console.log(`✅ [Brand Analysis] Complete for ${brandName}`);
        sendProgress('complete', 1, 1, 'Analysis complete!');

        // Parse out summary and component library
        let summary = '';
        let fullAnalysis = fullResponse;

        if (fullResponse.includes('===SUMMARY===')) {
            if (fullResponse.includes('===COMPONENT LIBRARY===')) {
                // New component library format
                const summaryMatch = fullResponse.match(/===SUMMARY===\s*([\s\S]*?)===COMPONENT LIBRARY===/);
                const libraryMatch = fullResponse.match(/===COMPONENT LIBRARY===\s*([\s\S]*)/);

                if (summaryMatch) summary = summaryMatch[1].trim();
                if (libraryMatch) {
                    try {
                        // If we have the componentLibrary object, use it directly
                        fullAnalysis = libraryMatch[1].trim();
                    } catch (e) {
                        fullAnalysis = libraryMatch[1].trim();
                    }
                }
            } else if (fullResponse.includes('===FULL ANALYSIS===')) {
                // Old format for backward compatibility
                const summaryMatch = fullResponse.match(/===SUMMARY===\s*([\s\S]*?)===FULL ANALYSIS===/);
                const fullMatch = fullResponse.match(/===FULL ANALYSIS===\s*([\s\S]*)/);

                if (summaryMatch) summary = summaryMatch[1].trim();
                if (fullMatch) fullAnalysis = fullMatch[1].trim();
            }
        }

        const result = {
            summary: summary || fullAnalysis.substring(0, 500),
            fullAnalysis: fullAnalysis,
            analysis: fullAnalysis,
            componentLibrary: componentLibrary // Include structured library if available
        };

        if (stream) {
            res.write(`data: ${JSON.stringify({ type: 'result', ...result })}\n\n`);
            res.end();
        } else {
            res.json(result);
        }
    } catch (error) {
        console.error('❌ [Brand Analysis] Server error:', error);
        if (req.body?.stream) {
            res.write(`data: ${JSON.stringify({ type: 'error', error: error.message })}\n\n`);
            res.end();
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});

/**
 * POST /api/analyze-images-inspiration
 * Simple visual-only analysis - extracts inspiration from images without brand context
 */
app.post('/api/analyze-images-inspiration', async (req, res) => {
    try {
        const { imageUrls } = req.body;

        if (!imageUrls || imageUrls.length === 0) {
            return res.status(400).json({ error: 'Images are required' });
        }

        console.log(`🎨 [Image Inspiration] Analyzing ${imageUrls.length} images for visual inspiration`);

        // Build content array with images
        const content = [
            {
                type: 'text',
                text: `Describe these images in detail so they can be recreated.

Write a 2-3 sentence description covering:
- The exact background (what type of wall? texture? color? any visible floor/rug?)
- The lighting (direction, quality, shadows, warmth)
- The overall mood and atmosphere

Be specific. For example: "Model stands in front of a warm beige stucco wall with rough, sandy texture. A woven jute rug is visible on the wooden floor. Soft golden hour sunlight streams from the left, casting long gentle shadows and creating a relaxed, earthy Mediterranean mood."

Just write the description, nothing else.`
            },
            ...imageUrls.map(url => ({
                type: 'image_url',
                image_url: { url }
            }))
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o',
                messages: [{ role: 'user', content }],
                max_tokens: 2000,
                temperature: 0.7
            })
        });

        const data = await response.json();
        if (!response.ok) {
            console.error('❌ [Image Inspiration] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
        }

        const analysis = data.choices[0].message.content;
        console.log(`✅ [Image Inspiration] Analysis complete`);

        res.json({ analysis });

    } catch (error) {
        console.error('❌ [Image Inspiration] Error:', error);
        res.status(500).json({ error: 'Failed to analyze images' });
    }
});

/**
 * POST /api/campaign-prompts
 * COMPONENT LIBRARY MIXER - generates variety by mixing components
 * Handles both MODEL shots (people) and PRODUCT shots (flat lays)
 */
app.post('/api/campaign-prompts', async (req, res) => {
    try {
        const { brandAnalysis, brandName, ecomDescription, numPrompts = 3, imageIndex = 0, numPeople = 1, imageType = 'model', previousPrompts = [], numProducts = 1, componentLibrary, imagesOnlyMode = false } = req.body;

        console.log(`📝 [Campaign Prompts] Generating ${numPrompts} prompts for ${brandName} (unit ${imageIndex + 1}, type: ${imageType})`);

        // Helper to pick random item from array, avoiding already used
        const pickRandom = (arr, usedSet = new Set()) => {
            if (!arr || arr.length === 0) return null;
            const available = arr.filter(item => !usedSet.has(item));
            if (available.length === 0) return arr[Math.floor(Math.random() * arr.length)];
            return available[Math.floor(Math.random() * available.length)];
        };

        // Context for grouped products
        const isGroupedProducts = imageType === 'product' && numProducts > 1;
        const groupedContext = isGroupedProducts
            ? `Style all ${numProducts} products TOGETHER as a cohesive set.`
            : '';

        let systemPrompt, userPrompt;

        // Check if we have a component library for mixing
        const hasLibrary = componentLibrary && componentLibrary.environment;

        if (hasLibrary) {
            // ═══════════════════════════════════════════════════════════════
            // COMPONENT MIXER APPROACH - Maximum variety
            // ═══════════════════════════════════════════════════════════════

            console.log(`   📚 Using Component Library mixing approach`);

            // Track what we've used for each prompt to avoid repetition
            const usedEnvironments = new Set();
            const usedLighting = new Set();
            const usedAtmosphere = new Set();

            // Build component selections for each prompt
            const componentSelections = [];
            for (let i = 0; i < numPrompts; i++) {
                // Pick different components for each prompt
                const selection = {
                    environment: pickRandom([
                        ...componentLibrary.environment.specific_locations || [],
                        ...componentLibrary.environment.location_variations || []
                    ], usedEnvironments),
                    lighting: pickRandom(componentLibrary.lighting?.specific_styles || [], usedLighting),
                    atmosphere: pickRandom(componentLibrary.atmosphere?.vibe_phrases || [], usedAtmosphere),
                    composition: pickRandom(componentLibrary.composition?.styles || []),
                    color_palette: pickRandom(componentLibrary.color?.palette_names || []),
                    time: pickRandom(componentLibrary.time_weather?.times_of_day || []),
                    texture: pickRandom(componentLibrary.texture_surface?.primary_surfaces || []),
                    props: pickRandom(componentLibrary.props_context?.all_objects || []),
                    pose: pickRandom(componentLibrary.movement_pose?.specific_poses || [])
                };

                // Mark as used
                if (selection.environment) usedEnvironments.add(selection.environment);
                if (selection.lighting) usedLighting.add(selection.lighting);
                if (selection.atmosphere) usedAtmosphere.add(selection.atmosphere);

                componentSelections.push(selection);
            }

            // Build the prompt for GPT to compose these into natural prompts
            const componentsDescription = componentSelections.map((sel, i) => `
PROMPT ${i + 1} must combine:
- ENVIRONMENT: ${sel.environment || 'any from the brand'}
- LIGHTING: ${sel.lighting || 'natural lighting'}
- ATMOSPHERE: ${sel.atmosphere || 'brand-appropriate mood'}
- TIME: ${sel.time || 'any'}
- TEXTURE/SURFACE: ${sel.texture || 'any'}
${sel.props ? `- PROPS: ${sel.props}` : ''}
${imageType === 'model' && sel.pose ? `- POSE/ACTION: ${sel.pose}` : ''}`).join('\n');

            if (imageType === 'product') {
                systemPrompt = `You are an expert product photographer creating styled product shot descriptions.

Your task: Combine the SPECIFIC COMPONENTS provided into ${numPrompts} distinct product photography prompts.
${isGroupedProducts ? `IMPORTANT: Style ${numProducts} products TOGETHER as a cohesive set.` : ''}

RULES:
1. Use the EXACT environment/surface, lighting, and atmosphere provided for each prompt
2. Do NOT describe the product itself - only styling, surface, lighting, props
3. Keep each prompt to 2-3 sentences, specific and evocative
4. Each prompt MUST feel completely different because they use different components`;

                userPrompt = `Create ${numPrompts} product photography prompts.

PRODUCT: ${ecomDescription}
${groupedContext}

USE THESE SPECIFIC COMPONENTS FOR EACH PROMPT:
${componentsDescription}

IMPORTANT: The components above were carefully selected to ensure MAXIMUM VARIETY.
Each prompt must use its assigned components - do not swap them.

Return ONLY the prompts, one per line, no numbering.`;

            } else {
                // MODEL prompts
                const peopleNote = numPeople > 1 ? `Feature ${numPeople} people together naturally.` : '';

                systemPrompt = `You are an expert fashion photographer creating campaign shot descriptions.

Your task: Combine the SPECIFIC COMPONENTS provided into ${numPrompts} distinct campaign prompts.
${peopleNote}

RULES:
1. Use the EXACT environment, lighting, and atmosphere provided for each prompt
2. Do NOT describe clothing - only environment, lighting, pose, atmosphere
3. Keep each prompt to 2-3 sentences, specific and evocative
4. Each prompt MUST feel completely different because they use different components`;

                userPrompt = `Create ${numPrompts} campaign photography prompts.

SUBJECT: ${ecomDescription}
${peopleNote}

USE THESE SPECIFIC COMPONENTS FOR EACH PROMPT:
${componentsDescription}

IMPORTANT: The components above were carefully selected to ensure MAXIMUM VARIETY.
Each prompt must use its assigned components - this guarantees no two prompts feel similar.

Return ONLY the prompts, one per line, no numbering.`;
            }

        } else {
            // ═══════════════════════════════════════════════════════════════
            // FALLBACK - Different approaches for brand vs images-only mode
            // ═══════════════════════════════════════════════════════════════

            console.log(`   ⚠ No component library, using fallback approach (imagesOnlyMode: ${imagesOnlyMode})`);

            const avoidRepetitionContext = previousPrompts.length > 0
                ? `\n\nDO NOT REPEAT: ${previousPrompts.map(p => p.substring(0, 80)).join('; ')}`
                : '';

            if (imagesOnlyMode) {
                // ═══════════════════════════════════════════════════════════════
                // IMAGES ONLY MODE - Scene replication with mood
                // ═══════════════════════════════════════════════════════════════
                const peopleText = numPeople > 1 ? `${numPeople} models together` : 'Model';

                if (imageType === 'product') {
                    systemPrompt = `Create product photo prompts that match a specific scene.`;
                    userPrompt = `Scene to replicate: ${brandAnalysis}

Product: ${ecomDescription}

Write ${numPrompts} prompts placing this product in that exact scene with the same mood and lighting.
One prompt per line, no numbering.`;
                } else {
                    systemPrompt = `Create fashion photo prompts. Combine the subject with the scene description naturally.`;
                    userPrompt = `Scene to replicate:
${brandAnalysis}

Subject: ${ecomDescription}
Number of people in shot: ${numPeople}

Write ${numPrompts} prompts that place ${peopleText} in this exact scene.
Include: the outfit description, the background/wall details, the lighting, and the mood.
${numPeople > 1 ? `IMPORTANT: The image must show ${numPeople} people together in the same shot.` : ''}
${avoidRepetitionContext}

One prompt per line, no numbering. Each prompt should be 2-3 sentences.`;
                }
            } else {
                // ═══════════════════════════════════════════════════════════════
                // BRAND MODE - Creative variety within brand aesthetic
                // ═══════════════════════════════════════════════════════════════
                if (imageType === 'product') {
                    systemPrompt = `Create ${numPrompts} COMPLETELY DIFFERENT product photography prompts. Each must use different: surface, lighting, props, mood. ${groupedContext}`;
                    userPrompt = `PRODUCT: ${ecomDescription}\nBRAND STYLE: ${brandAnalysis}\n${avoidRepetitionContext}\n\nGenerate ${numPrompts} varied prompts, one per line.`;
                } else {
                    systemPrompt = `Create ${numPrompts} COMPLETELY DIFFERENT campaign photography prompts. Each must use different: location, lighting, time of day, mood.`;
                    userPrompt = `SUBJECT: ${ecomDescription}\nBRAND STYLE: ${brandAnalysis}\n${avoidRepetitionContext}\n\nGenerate ${numPrompts} varied prompts, one per line.`;
                }
            }
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
                temperature: 0.8,
                max_tokens: 1500
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Campaign Prompts] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Prompt generation failed' });
        }

        const content = data.choices[0].message.content.trim();
        let prompts = content.split('\n').filter(line => line.trim() && !line.match(/^(prompt\s*)?\d+[\.:]/i)).slice(0, numPrompts);

        // Clean up prompts
        prompts = prompts.map(p => p.replace(/^[-•*]\s*/, '').trim());

        console.log(`✅ [Campaign Prompts] Generated ${prompts.length} prompts`);

        res.json({ prompts });
    } catch (error) {
        console.error('❌ [Campaign Prompts] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/generate-outfits
 * Generate outfit pools based on brand analysis
 * Returns separate pools for male and female talent
 */
app.post('/api/generate-outfits', async (req, res) => {
    try {
        const { brandAnalysis, styleText, femaleCount, maleCount } = req.body;

        // Ensure we have at least some outfits
        const numFemale = Math.max(femaleCount || 6, 6);
        const numMale = Math.max(maleCount || 6, 6);

        console.log(`👗 [Outfits] Generating ${numFemale} female + ${numMale} male outfits`);

        const styleContext = brandAnalysis || styleText || 'contemporary minimalist fashion';

        const systemPrompt = `You are a fashion stylist creating outfit combinations for a photoshoot.
Based on the brand aesthetic provided, create distinct but cohesive outfits.

RULES:
- Each outfit must be different but feel like the same brand/collection
- Include: top, bottom (or dress), shoes, and optionally one accessory
- Be specific about colors, materials, and fit (e.g., "oversized oatmeal wool coat" not just "coat")
- Keep descriptions concise (one line per outfit)
- Vary silhouettes: some fitted, some relaxed, some layered
- Stay true to the brand's color palette and aesthetic
- NO brand names - describe the style/look instead`;

        const userPrompt = `BRAND AESTHETIC:
${styleContext}

Generate exactly ${numFemale} FEMALE outfits and ${numMale} MALE outfits.

Format your response as JSON:
{
  "female": [
    "outfit description 1",
    "outfit description 2",
    ...
  ],
  "male": [
    "outfit description 1",
    "outfit description 2",
    ...
  ]
}

Each outfit should be a single string describing the complete look. Be specific about colors, materials, and fit.`;

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
                temperature: 0.8,
                max_tokens: 2000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Outfits] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Outfit generation failed' });
        }

        // Parse the JSON response
        let outfits = { female: [], male: [] };
        try {
            const content = data.choices[0].message.content;
            // Remove markdown code blocks if present
            const jsonStr = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                outfits = JSON.parse(jsonMatch[0]);
            }
        } catch (parseErr) {
            console.error('❌ [Outfits] JSON parse error:', parseErr);
            // Fallback: try to extract outfits from text
            return res.status(500).json({ error: 'Failed to parse outfit response' });
        }

        console.log(`✅ [Outfits] Generated ${outfits.female?.length || 0} female, ${outfits.male?.length || 0} male outfits`);

        res.json(outfits);
    } catch (error) {
        console.error('❌ [Outfits] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/generate-environments
 * Generate campaign environment options based on brand analysis
 * Returns 5 indoor and 5 outdoor location suggestions
 */
app.post('/api/generate-environments', async (req, res) => {
    try {
        const { brandAnalysis, styleText } = req.body;

        console.log(`🏠 [Environments] Generating campaign locations`);

        const styleContext = brandAnalysis || styleText || 'contemporary fashion brand';

        const systemPrompt = `You are a fashion editorial location scout. Based on a brand aesthetic, suggest campaign shoot locations.

RULES:
- Each location should complement the fashion aesthetic
- Be specific about architectural details, materials, textures, and lighting quality
- Indoor locations can include:
  * Studio settings with colored backdrops (match brand colors from the aesthetic)
  * Real architectural interiors (galleries, lofts, modernist homes)
  * Mix of studio and real environments
- Outdoor locations: landscapes, urban environments, architectural exteriors
- If the brand aesthetic mentions colored backgrounds or studio shots, include STUDIO OPTIONS with specific backdrop colors
- Keep descriptions concise but evocative (one line each)
- Focus on atmosphere and visual quality
- These will be used as prompts for AI image generation, so be descriptive`;

        const userPrompt = `BRAND AESTHETIC:
${styleContext}

Generate exactly 5 INDOOR and 5 OUTDOOR campaign locations that would complement this brand.

IMPORTANT: For indoor, include a MIX of:
- Studio backdrops with specific colors (e.g., "studio with soft lavender seamless backdrop and diffused lighting")
- Real architectural interiors

Format your response as JSON:
{
  "indoor": [
    { "name": "studio with warm coral seamless backdrop and soft diffused lighting" },
    { "name": "minimalist wood-paneled study with warm afternoon light" },
    { "name": "studio with deep navy backdrop and dramatic side lighting" },
    ...
  ],
  "outdoor": [
    { "name": "Mediterranean terrace with pink stucco walls at golden hour" },
    { "name": "brutalist concrete courtyard with geometric shadows" },
    ...
  ]
}

Each location should be a short, evocative description. For studio options, specify the backdrop color and lighting style.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.9,
                max_tokens: 1000
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Environments] API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Environment generation failed' });
        }

        // Parse the JSON response
        let environments = { indoor: [], outdoor: [] };
        try {
            const content = data.choices[0].message.content;
            // Remove markdown code blocks if present
            const jsonStr = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
            const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                environments = JSON.parse(jsonMatch[0]);
            }
        } catch (parseErr) {
            console.error('❌ [Environments] JSON parse error:', parseErr);
            return res.status(500).json({ error: 'Failed to parse environment response' });
        }

        console.log(`✅ [Environments] Generated ${environments.indoor?.length || 0} indoor, ${environments.outdoor?.length || 0} outdoor locations`);

        res.json(environments);
    } catch (error) {
        console.error('❌ [Environments] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/analyze
 * Analyze images using GPT-4 Vision (supports multiple images)
 * Also supports text-only analysis when no images are provided
 */
app.post('/api/analyze', async (req, res) => {
    try {
        const { image, images, prompt } = req.body;

        // Support both single image and array of images
        const imageUrls = images || (image ? [image] : []);

        if (imageUrls.length === 0 && !prompt) {
            return res.status(400).json({ error: 'No images or prompt provided' });
        }

        // Text-only mode (no images)
        if (imageUrls.length === 0) {
            console.log(`🔍 [Analyze] Processing text-only request`);

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
                            content: prompt
                        }
                    ],
                    max_tokens: 1500,
                    temperature: 0.7
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('❌ [Analyze] OpenAI error:', data.error);
                return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
            }

            console.log('✅ [Analyze] Text-only success');
            return res.json({ content: data.choices[0].message.content });
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
            console.error('❌ [Analyze] OpenAI error:', data.error);
            return res.status(response.status).json({ error: data.error?.message || 'Analysis failed' });
        }

        console.log('✅ [Analyze] Success');
        res.json({ content: data.choices[0].message.content });
    } catch (error) {
        console.error('❌ [Analyze] Server error:', error);
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
 * Includes retry logic for timeout errors
 */
app.post('/api/upload-base64', async (req, res) => {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

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

        // Upload with retry logic for timeout errors
        let lastError;
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                const url = await fal.storage.upload(blob);
                console.log(`📥 [Upload] URL:`, url);
                return res.json({ url });
            } catch (uploadError) {
                lastError = uploadError;
                const isTimeout = uploadError.status === 408 ||
                                  uploadError.message?.includes('Timeout') ||
                                  uploadError.body?.error === 'Timeout';

                if (isTimeout && attempt < MAX_RETRIES) {
                    console.log(`⚠️ [Upload] Timeout on attempt ${attempt}, retrying in ${RETRY_DELAY}ms...`);
                    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
                } else {
                    throw uploadError;
                }
            }
        }

        throw lastError;
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/convert-heic
 * Convert HEIC/HEIF image to JPEG using heic-convert
 */
app.post('/api/convert-heic', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No image provided' });
        }

        const startTime = Date.now();
        console.log(`🔄 [HEIC Convert] Converting ${req.file.originalname} (${(req.file.size / 1024 / 1024).toFixed(1)}MB)`);

        // Step 1: Decode HEIC to raw JPEG using heic-convert
        const rawJpeg = await heicConvert({
            buffer: req.file.buffer,
            format: 'JPEG',
            quality: 0.92
        });

        // Step 2: Resize with sharp if the image is large (iPhone photos are often 4032x3024)
        // Cap to 2048px longest side - plenty for AI generation and much smaller base64
        const jpegBuffer = await sharp(Buffer.from(rawJpeg))
            .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
            .jpeg({ quality: 90 })
            .toBuffer();

        // Return as base64 data URL
        const base64 = jpegBuffer.toString('base64');
        const dataUrl = `data:image/jpeg;base64,${base64}`;

        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`✅ [HEIC Convert] ${elapsed}s - ${(rawJpeg.length / 1024 / 1024).toFixed(1)}MB raw → ${(jpegBuffer.length / 1024 / 1024).toFixed(1)}MB resized`);

        res.json({ dataUrl });
    } catch (error) {
        console.error('❌ [HEIC Convert] Error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/remove-bg
 * Remove background using Pixelcut API
 * Preserves original resolution up to 6000x6000
 */
app.post('/api/remove-bg', async (req, res) => {
    try {
        const { image, image_url } = req.body;

        if (!image && !image_url) {
            return res.status(400).json({ error: 'Image (base64) or image_url is required' });
        }

        console.log(`🎨 [RemoveBG] Starting background removal...`);

        let imageUrl = image_url;

        // Prepare the image buffer
        let buffer;
        let response;

        if (image_url) {
            // Use JSON format with image_url
            console.log(`🔗 [RemoveBG] Using URL: ${image_url}`);
            response = await fetch('https://api.developer.pixelcut.ai/v1/remove-background', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-Key': PIXELCUT_API_KEY
                },
                body: JSON.stringify({ image_url, format: 'png' })
            });
        } else if (image) {
            // Handle data URL - extract base64
            let base64Data = image;
            if (image.startsWith('data:')) {
                const matches = image.match(/^data:([^;]+);base64,(.+)$/);
                if (matches) {
                    base64Data = matches[2];
                }
            }

            // Convert base64 to buffer
            buffer = Buffer.from(base64Data, 'base64');

            // Convert to JPEG for better compatibility
            try {
                buffer = await sharp(buffer)
                    .jpeg({ quality: 95 })
                    .toBuffer();
                console.log(`🔄 [RemoveBG] Converted to JPEG (${Math.round(buffer.length / 1024)}KB)`);
            } catch (e) {
                console.log(`⚠️ [RemoveBG] Could not convert: ${e.message}`);
            }

            // Use multipart form-data with 'image' field for direct upload
            const FormData = (await import('form-data')).default;
            const form = new FormData();
            form.append('image', buffer, { filename: 'image.jpg', contentType: 'image/jpeg' });
            form.append('format', 'png');

            console.log(`📤 [RemoveBG] Uploading via multipart form-data...`);

            response = await fetch('https://api.developer.pixelcut.ai/v1/remove-background', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-API-Key': PIXELCUT_API_KEY,
                    ...form.getHeaders()
                },
                body: form
            });
        }

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [RemoveBG] Pixelcut API Error:', data);
            return res.status(response.status).json({ error: data.error || data.message || 'Background removal failed' });
        }

        console.log(`✅ [RemoveBG] Success! Result URL received`);
        res.json({
            success: true,
            result_url: data.result_url,
            width: data.width,
            height: data.height
        });
    } catch (error) {
        console.error('❌ [RemoveBG] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/upscale
 * Start an upscale task using Freepik Magnific API
 */
app.post('/api/upscale', async (req, res) => {
    try {
        const { image, scale_factor, optimized_for, prompt, creativity, hdr, resemblance, fractality, engine } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        console.log(`🔍 [Upscale] Starting upscale task, scale: ${scale_factor || '2x'}, optimized: ${optimized_for || 'standard'}`);

        // Build request body
        const requestBody = {
            image: image // Base64 image (without data:image prefix)
        };

        // Add optional parameters
        if (scale_factor) requestBody.scale_factor = scale_factor;
        if (optimized_for) requestBody.optimized_for = optimized_for;
        if (prompt) requestBody.prompt = prompt;
        if (creativity !== undefined) requestBody.creativity = creativity;
        if (hdr !== undefined) requestBody.hdr = hdr;
        if (resemblance !== undefined) requestBody.resemblance = resemblance;
        if (fractality !== undefined) requestBody.fractality = fractality;
        if (engine) requestBody.engine = engine;

        const response = await fetch('https://api.freepik.com/v1/ai/image-upscaler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-freepik-api-key': FREEPIK_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Upscale] API Error:', data);
            return res.status(response.status).json({ error: data.message || 'Upscale failed' });
        }

        console.log(`✅ [Upscale] Task started:`, data.data?.task_id);
        res.json(data);
    } catch (error) {
        console.error('❌ [Upscale] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * POST /api/skin-enhance
 * Start a skin enhancement task using Freepik Skin Enhancer API
 * Supports three modes: creative, faithful, flexible
 */
app.post('/api/skin-enhance', async (req, res) => {
    try {
        const { image, mode, sharpen, smart_grain, skin_detail, optimized_for } = req.body;

        if (!image) {
            return res.status(400).json({ error: 'Image is required' });
        }

        // Validate mode - default to creative
        const validModes = ['creative', 'faithful', 'flexible'];
        const selectedMode = validModes.includes(mode) ? mode : 'creative';

        console.log(`✨ [Skin Enhance] Starting ${selectedMode} task, sharpen: ${sharpen || 0}, smart_grain: ${smart_grain || 2}`);

        const requestBody = {
            image: image // Base64 or URL
        };

        // Common parameters for all modes
        if (sharpen !== undefined) requestBody.sharpen = sharpen;
        if (smart_grain !== undefined) requestBody.smart_grain = smart_grain;

        // Faithful mode has skin_detail parameter
        if (selectedMode === 'faithful' && skin_detail !== undefined) {
            requestBody.skin_detail = skin_detail;
        }

        // Flexible mode has optimized_for parameter
        if (selectedMode === 'flexible' && optimized_for) {
            requestBody.optimized_for = optimized_for;
        }

        const response = await fetch(`https://api.freepik.com/v1/ai/skin-enhancer/${selectedMode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-freepik-api-key': FREEPIK_API_KEY
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error(`❌ [Skin Enhance ${selectedMode}] API Error:`, data);
            return res.status(response.status).json({ error: data.message || 'Skin enhance failed' });
        }

        console.log(`✅ [Skin Enhance ${selectedMode}] Task started:`, data.data?.task_id);
        // Include mode in response for client reference
        res.json({ ...data, mode: selectedMode });
    } catch (error) {
        console.error('❌ [Skin Enhance] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/skin-enhance/:taskId
 * Check status of a skin enhancement task
 */
app.get('/api/skin-enhance/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        const response = await fetch(`https://api.freepik.com/v1/ai/skin-enhancer/${taskId}`, {
            method: 'GET',
            headers: {
                'x-freepik-api-key': FREEPIK_API_KEY
            }
        });

        // Check content type before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error('❌ [Skin Enhance Status] Non-JSON response:', response.status, text.substring(0, 200));
            return res.status(response.status).json({
                error: `API returned non-JSON response (${response.status})`,
                hint: 'The Freepik API may be down or returning an error page'
            });
        }

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Skin Enhance Status] API Error:', data);
            return res.status(response.status).json({ error: data.message || 'Status check failed' });
        }

        res.json(data);
    } catch (error) {
        console.error('❌ [Skin Enhance Status] Server error:', error);
        res.status(500).json({ error: error.message });
    }
});

/**
 * GET /api/upscale/:taskId
 * Check status of an upscale task
 */
app.get('/api/upscale/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;

        const response = await fetch(`https://api.freepik.com/v1/ai/image-upscaler/${taskId}`, {
            method: 'GET',
            headers: {
                'x-freepik-api-key': FREEPIK_API_KEY
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('❌ [Upscale Status] API Error:', data);
            return res.status(response.status).json({ error: data.message || 'Status check failed' });
        }

        res.json(data);
    } catch (error) {
        console.error('❌ [Upscale Status] Server error:', error);
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

// ═══════════════════════════════════════════════════════════════
// PROXY DOWNLOAD - For downloading images from external CDNs
// ═══════════════════════════════════════════════════════════════
app.get('/api/proxy-download', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL parameter required' });
    }

    try {
        console.log(`📥 [Proxy Download] Fetching: ${url.substring(0, 80)}...`);

        const response = await fetch(url);

        if (!response.ok) {
            console.error(`❌ [Proxy Download] Failed: ${response.status}`);
            return res.status(response.status).json({ error: `Failed to fetch: ${response.status}` });
        }

        // Get content type and forward it
        const contentType = response.headers.get('content-type') || 'image/png';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', 'attachment');

        // Stream the response (use arrayBuffer for broader compatibility)
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.send(buffer);

        console.log(`✅ [Proxy Download] Success: ${buffer.length} bytes`);
    } catch (error) {
        console.error('❌ [Proxy Download] Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// ═══════════════════════════════════════════════════════════════
// VIDEO SPEED - Adjust video playback speed using FFmpeg
// ═══════════════════════════════════════════════════════════════
app.post('/api/video/speed', async (req, res) => {
    const { url, speed } = req.body;

    if (!url || !speed) {
        return res.status(400).json({ error: 'url and speed are required' });
    }

    // Validate speed range
    const speedNum = parseFloat(speed);
    if (isNaN(speedNum) || speedNum < 0.1 || speedNum > 10) {
        return res.status(400).json({ error: 'Speed must be between 0.1 and 10' });
    }

    let tempDir = null;
    let inputPath = null;
    let outputPath = null;

    try {
        console.log(`🎬 [Video Speed] Processing at ${speed}x: ${url.substring(0, 60)}...`);

        // Create temp directory
        tempDir = mkdtempSync(join(tmpdir(), 'video-speed-'));
        inputPath = join(tempDir, 'input.mp4');
        outputPath = join(tempDir, 'output.mp4');

        // Download the video
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to download video: ${response.status}`);
        }
        const videoBuffer = await response.buffer();
        writeFileSync(inputPath, videoBuffer);

        console.log(`🎬 [Video Speed] Downloaded ${videoBuffer.length} bytes`);

        // Use FFmpeg to adjust speed
        // Speed > 1 = faster (setpts divides), Speed < 1 = slower (setpts multiplies)
        // For video: setpts=PTS/speed (speed 2 = 2x faster = PTS/2)
        // For audio: atempo filter (range 0.5-2, chain for more)
        const pts = 1 / speedNum;

        // Build audio filter - atempo only supports 0.5 to 2.0
        let audioFilter = '';
        let remainingSpeed = speedNum;
        const atempoFilters = [];

        if (speedNum !== 1) {
            while (remainingSpeed > 2.0) {
                atempoFilters.push('atempo=2.0');
                remainingSpeed /= 2.0;
            }
            while (remainingSpeed < 0.5) {
                atempoFilters.push('atempo=0.5');
                remainingSpeed *= 2.0;
            }
            if (remainingSpeed !== 1) {
                atempoFilters.push(`atempo=${remainingSpeed.toFixed(4)}`);
            }
            audioFilter = atempoFilters.length > 0 ? `-af "${atempoFilters.join(',')}"` : '';
        }

        // Detect source video bitrate using ffprobe
        let bitrate = '6M'; // Default fallback
        try {
            const probeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=bit_rate -of json "${inputPath}"`;
            const probeResult = execSync(probeCmd, { encoding: 'utf8' });
            const probeData = JSON.parse(probeResult);
            if (probeData.streams?.[0]?.bit_rate) {
                const sourceBitrate = parseInt(probeData.streams[0].bit_rate);
                bitrate = Math.round(sourceBitrate / 1000) + 'k'; // Convert to kbps
                console.log(`🎬 [Video Speed] Source bitrate: ${bitrate}`);
            }
        } catch (e) {
            console.log(`🎬 [Video Speed] Could not detect bitrate, using default ${bitrate}`);
        }

        // FFmpeg command
        // -y: overwrite output
        // -i: input file
        // -filter:v setpts: adjust video speed
        // -af atempo: adjust audio speed
        // -preset fast: good balance of speed and quality (~12s for 5s video)
        // -b:v: match source bitrate for quality preservation
        const ffmpegCmd = `ffmpeg -y -i "${inputPath}" -filter:v "setpts=${pts.toFixed(4)}*PTS" ${audioFilter} -preset fast -b:v ${bitrate} "${outputPath}"`;

        console.log(`🎬 [Video Speed] Running: ${ffmpegCmd}`);

        // Execute FFmpeg with timing
        const startTime = Date.now();
        execSync(ffmpegCmd, { stdio: 'pipe' });
        const processingTime = ((Date.now() - startTime) / 1000).toFixed(1);

        // Read output and send
        const outputBuffer = readFileSync(outputPath);
        console.log(`✅ [Video Speed] Complete: ${outputBuffer.length} bytes in ${processingTime}s (${speed}x speed, ${bitrate} bitrate)`);

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="video.mp4"');
        res.send(outputBuffer);

    } catch (error) {
        console.error('❌ [Video Speed] Error:', error.message);
        res.status(500).json({ error: error.message });
    } finally {
        // Cleanup temp files
        try {
            if (inputPath && existsSync(inputPath)) unlinkSync(inputPath);
            if (outputPath && existsSync(outputPath)) unlinkSync(outputPath);
            if (tempDir && existsSync(tempDir)) {
                // Remove temp directory using rm command
                execSync(`rm -rf "${tempDir}"`);
            }
        } catch (e) {
            console.warn('Cleanup warning:', e.message);
        }
    }
});

// ═══════════════════════════════════════════════════════════════
// VIDEO STITCH - Combine multiple videos with trim points using FFmpeg
// ═══════════════════════════════════════════════════════════════
app.post('/api/video/stitch', upload.array('videos', 20), async (req, res) => {
    const files = req.files;

    if (!files || files.length < 2) {
        return res.status(400).json({ error: 'At least 2 videos are required' });
    }

    let tempDir = null;

    try {
        console.log(`✂️ [Video Stitch] Processing ${files.length} videos`);

        // Create temp directory
        tempDir = mkdtempSync(join(tmpdir(), 'video-stitch-'));

        // Parse trim points and save input files
        const inputPaths = [];
        const trimmedPaths = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const inPoint = parseFloat(req.body[`inPoint_${i}`] || '0');
            const outPoint = parseFloat(req.body[`outPoint_${i}`] || '999999');
            const duration = outPoint - inPoint;

            const inputPath = join(tempDir, `input_${i}${getExtension(file.originalname)}`);
            writeFileSync(inputPath, file.buffer);
            inputPaths.push(inputPath);

            // Trim the video if needed
            const trimmedPath = join(tempDir, `trimmed_${i}.mp4`);

            // FFmpeg trim: -ss (start), -t (duration)
            const trimCmd = `ffmpeg -y -i "${inputPath}" -ss ${inPoint.toFixed(3)} -t ${duration.toFixed(3)} -c:v libx264 -c:a aac -preset fast "${trimmedPath}"`;

            console.log(`✂️ [Video Stitch] Trimming video ${i + 1}: ${inPoint.toFixed(2)}s - ${outPoint.toFixed(2)}s`);
            execSync(trimCmd, { stdio: 'pipe' });

            trimmedPaths.push(trimmedPath);
        }

        // Create concat file list
        const concatListPath = join(tempDir, 'concat_list.txt');
        const concatContent = trimmedPaths.map(p => `file '${p}'`).join('\n');
        writeFileSync(concatListPath, concatContent);

        // Concatenate all videos
        const concatOutputPath = join(tempDir, 'concat_output.mp4');
        const concatCmd = `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c:v libx264 -c:a aac -preset fast "${concatOutputPath}"`;

        console.log(`✂️ [Video Stitch] Concatenating ${trimmedPaths.length} videos...`);
        execSync(concatCmd, { stdio: 'pipe' });

        // Check if aspect ratio crop is requested
        const aspectRatio = req.body.aspectRatio;
        let finalOutputPath = concatOutputPath;

        if (aspectRatio === '4:5') {
            console.log(`✂️ [Video Stitch] Cropping to 4:5 for Instagram...`);

            // Get video dimensions with ffprobe
            const probeCmd = `ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of json "${concatOutputPath}"`;
            const probeResult = execSync(probeCmd, { encoding: 'utf8' });
            const probeData = JSON.parse(probeResult);
            const srcWidth = probeData.streams[0].width;
            const srcHeight = probeData.streams[0].height;

            // Calculate 4:5 crop (height = width * 5/4)
            let cropWidth, cropHeight;
            const targetRatio = 4 / 5; // width/height
            const srcRatio = srcWidth / srcHeight;

            if (srcRatio > targetRatio) {
                // Source is wider than 4:5, crop sides
                cropHeight = srcHeight;
                cropWidth = Math.floor(srcHeight * targetRatio);
            } else {
                // Source is taller than 4:5, crop top/bottom
                cropWidth = srcWidth;
                cropHeight = Math.floor(srcWidth / targetRatio);
            }

            // Center the crop
            const cropX = Math.floor((srcWidth - cropWidth) / 2);
            const cropY = Math.floor((srcHeight - cropHeight) / 2);

            console.log(`✂️ [Video Stitch] Crop: ${srcWidth}x${srcHeight} -> ${cropWidth}x${cropHeight} (x:${cropX}, y:${cropY})`);

            // Apply crop only - no scaling, preserve original pixels
            finalOutputPath = join(tempDir, 'output_cropped.mp4');
            const cropCmd = `ffmpeg -y -i "${concatOutputPath}" -vf "crop=${cropWidth}:${cropHeight}:${cropX}:${cropY}" -c:v libx264 -c:a aac -preset fast "${finalOutputPath}"`;
            execSync(cropCmd, { stdio: 'pipe' });
        }

        // Read output and send
        const outputBuffer = readFileSync(finalOutputPath);
        console.log(`✅ [Video Stitch] Complete: ${outputBuffer.length} bytes${aspectRatio ? ` (cropped to ${aspectRatio})` : ''}`);

        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', 'attachment; filename="stitched.mp4"');
        res.send(outputBuffer);

    } catch (error) {
        console.error('❌ [Video Stitch] Error:', error.message);
        res.status(500).json({ error: error.message });
    } finally {
        // Cleanup temp directory
        try {
            if (tempDir && existsSync(tempDir)) {
                execSync(`rm -rf "${tempDir}"`);
            }
        } catch (e) {
            console.warn('Cleanup warning:', e.message);
        }
    }
});

// Helper to get file extension
function getExtension(filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext && ['mp4', 'mov', 'avi', 'webm', 'mkv'].includes(ext)) {
        return '.' + ext;
    }
    return '.mp4';
}

// Fallback - serve index.html for client-side routing
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'index.html'));
});

/**
 * Chat API - Conversational AI
 */
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: 'Messages are required' });
        }

        console.log(`💬 [Chat] Processing ${messages.length} messages`);

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
                        role: 'system',
                        content: `You are an AI assistant trained specifically on the user's business. You understand their workflows, operations, and can predict challenges while helping them make informed decisions in real time.

Your capabilities include:
- Understanding business workflows and operations
- Predicting operational challenges before they occur
- Providing data-driven insights and recommendations
- Helping with real-time decision making
- Analyzing patterns in business data

Keep responses concise, professional, and actionable. Focus on practical business value. When discussing capabilities, emphasize how AI can transform physical operations through vision, sensors, and real-time analytics.

IMPORTANT: Always end your response with a relevant follow-up question to keep the conversation going and explore the user's needs deeper.`
                    },
                    ...messages
                ],
                max_tokens: 4000,
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('❌ [Chat] OpenAI error:', data.error);
            return res.status(500).json({ error: data.error.message });
        }

        const content = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
        console.log(`✅ [Chat] Response generated (${content.length} chars)`);

        res.json({ content });

    } catch (error) {
        console.error('❌ [Chat] Error:', error);
        res.status(500).json({ error: error.message });
    }
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
