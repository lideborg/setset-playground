# Quick Setup Guide

## Step 1: Install Node Packages

```bash
npm install
```

This installs:
- `express` - Web server
- `multer` - File upload handling
- `openai` - GPT-4 Vision API client

## Step 2: Set Up Your OpenAI API Key

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Get your OpenAI API key:
   - Go to https://platform.openai.com/api-keys
   - Create a new secret key
   - Copy it

3. Edit `.env` and paste your key:
```
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

## Step 3: Run the Server

```bash
npm start
```

You should see:
```
🚀 Editorial Prompt Generator running at http://localhost:3001
📸 Upload model photos to generate varied editorial prompts
```

## Step 4: Open in Browser

Go to: **http://localhost:3001**

## Step 5: Generate Prompts!

1. Upload a model photo (JPG or PNG)
2. Click "Generate 20 Prompts"
3. Wait ~5-10 seconds for image analysis
4. Copy your prompts!

---

## Troubleshooting

### "Cannot find module 'multer'" or "Cannot find module 'openai'"

Run: `npm install`

### "Invalid API key"

1. Check your `.env` file exists
2. Make sure the API key starts with `sk-`
3. No quotes needed around the key
4. Make sure you have OpenAI credits

### Port 3001 already in use

Edit `server.js` line 8:
```javascript
const PORT = 3002; // or any other port
```

### "Failed to analyze image"

- Make sure photo is clear and well-lit
- File must be JPG or PNG
- Max 10MB file size
- Must show a person's face clearly

---

## What Happens When You Upload?

1. **Frontend** sends image to `/api/generate-prompts`
2. **Backend** converts image to base64
3. **GPT-4 Vision** analyzes and extracts:
   - Ethnicity
   - Age
   - Hair (color, texture, style)
   - Skin (tone, undertones)
4. **Prompt Generator** creates 20 unique prompts by:
   - Using the subject description from step 3
   - Randomly selecting from variable libraries:
     - 26 poses
     - 18 backgrounds
     - 22 lighting setups
     - 9 camera specs
     - 30+ clothing colors
     - etc.
5. **Frontend** displays prompts line-by-line

---

## Example Workflow

```
Upload photo of East Asian woman
       ↓
GPT-4 analyzes: "East Asian woman mid 20s with honey blonde wavy bob..."
       ↓
Generator creates 20 prompts:
  - 4 studio shots (different lighting each)
  - 16 environmental shots (varied poses, backgrounds, cameras)
       ↓
Copy & paste into your image generation tool!
```

---

## Cost Estimate

**Per generation (1 photo → 20 prompts):**
- GPT-4 Vision: ~$0.01 per image
- So ~$1.00 for 100 generations
- Very affordable!

---

## Next Steps

1. Generate prompts for your models
2. Test with your image generation tool
3. Tweak variable libraries in `server.js` if needed
4. Save favorites!

Need help? Check `README_GENERATOR.md` for full documentation.
