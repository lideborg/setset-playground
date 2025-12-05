# Styling Studio Documentation

## Overview

Styling Studio is a photorealistic "paper doll" generator that allows users to virtually style models with different clothing items and accessories. It uses AI image analysis (GPT-4 Vision) to understand uploaded garments and Nano Banana's multi-image editing capabilities to generate styled looks.

**Version:** 1.0
**Created:** November 2025
**Location:** `/styling/index.html`
**API Endpoints:** `http://localhost:3001`

---

## Core Concept

Create photorealistic styled images by:
1. Selecting a model from the talent roster
2. Uploading reference images of clothing/accessories OR selecting style keywords
3. AI analyzes each uploaded item (color, material, type, style)
4. System builds a detailed prompt referencing "this exact person" + "these exact items"
5. Prompt is enhanced by LLM for professional quality
6. Nano Banana generates the final styled image using model photo + all garment photos

---

## Features

### 1. Model Selection
- Grid display of 12 talent models
- Click to select model
- Uses same roster as Looks tool
- Model image becomes primary reference for generation

### 2. Clothing Categories

**7 Card-Based Categories:**

| Category | Icon | Description | Required | Options |
|----------|------|-------------|----------|---------|
| **Head** | 🧢 | Hats, caps, beanies | No | Not wearing, Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |
| **Face & Neck** | 👓 | Sunglasses, jewelry, accessories | No | Not wearing, Minimal, Statement, Luxury, Vintage |
| **Outerwear** | 🧥 | Jackets, coats, blazers | No | Not wearing, Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |
| **Long Sleeve** | 👔 | Sweaters, long-sleeve shirts | Yes | Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |
| **Short Sleeve** | 👕 | T-shirts, tank tops | No | Not wearing, Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |
| **Bottom** | 👖 | Pants, shorts, skirts | Yes | Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |
| **Shoes** | 👟 | Sneakers, boots, heels | Yes | Minimal, Street, Luxury, Avant-Garde, Sporty, Vintage |

**Note:** Bottom and one top layer (Long Sleeve or Short Sleeve) are required - models cannot be naked.

### 3. Upload & Analysis

**Each category card contains:**
- Upload area (drag/drop or click)
- Style dropdown selector
- Clear button to reset
- Analysis details display (after upload)

**When image is uploaded:**
1. Preview thumbnail shown
2. Sent to GPT-4 Vision for analysis
3. Returns JSON with:
   - `garment_type`: Specific item type
   - `color`: Primary color(s)
   - `material`: Fabric/material type
   - `style`: Style descriptor
   - `details`: Notable features

**Example Analysis:**
```json
{
  "garment_type": "oversized knit sweater",
  "color": "navy blue",
  "material": "chunky knit wool",
  "style": "casual oversized",
  "details": "ribbed crew neck, drop shoulder"
}
```

### 4. Prompt Building Logic

**Base Prompt Structure:**
```
This exact person wearing [analyzed items + style selections]
```

**Example with Mixed Upload/Style:**
- Head: Empty
- Face: Uploaded sunglasses (analyzed: "black aviator sunglasses")
- Long Sleeve: Uploaded sweater (analyzed: "navy blue knit sweater")
- Bottom: Style "minimal" selected
- Shoes: Style "minimal" selected

**Generated Base Prompt:**
```
This exact person wearing these exact black aviator sunglasses,
these exact navy blue knit sweater (chunky knit wool, casual oversized style),
minimal pants, and minimal shoes. Editorial fashion photography,
clean background, professional lighting, high quality.
```

### 5. Prompt Enhancement

Base prompt is sent to GPT-4-mini with enhancement instructions:
- Maintain all "exact" references
- Add professional photography terminology
- Include lighting and composition details
- Keep under 150 words
- Ensure editorial/high-fashion quality

**Enhanced Prompt Example:**
```
Editorial full-body portrait of this exact person wearing these exact
black aviator sunglasses and this exact navy blue chunky knit wool
oversized sweater with ribbed crew neck and drop shoulder, paired with
minimal tailored pants and minimal shoes. Shot with natural diffused
lighting creating soft shadows, clean white seamless background,
centered composition, 85mm lens at f/2.8 for shallow depth of field,
professional fashion photography aesthetic, sharp focus on subject,
high-resolution commercial quality.
```

### 6. Image Generation

**Nano Banana Multi-Image Input:**
```javascript
{
  prompt: enhancedPrompt,
  image_urls: [
    modelImage,           // Primary reference
    sunglassesImage,      // Exact item 1
    sweaterImage,         // Exact item 2
    // ... any other uploaded items
  ],
  num_images: 1,
  aspect_ratio: '3:4',
  output_format: 'jpeg'
}
```

**Key Technical Details:**
- Uses `image_urls` array for multiple reference images
- Model image is always first in array
- Uploaded garment images follow in order
- Nano Banana blends all references with prompt instructions

---

## Technical Architecture

### Frontend (`/styling/index.html` + `styling.js`)

**State Management:**
```javascript
{
  selectedModel: { name, image, id },
  items: {
    head: { file, analysis, style },
    face: { file, analysis, style },
    outerwear: { file, analysis, style },
    longsleeve: { file, analysis, style },
    shortsleeve: { file, analysis, style },
    bottom: { file, analysis, style },
    shoes: { file, analysis, style }
  }
}
```

**Key Functions:**
- `selectModel(id)` - Choose model from grid
- `handleUpload(event, category)` - Process file upload
- `analyzeGarment(file)` - Call GPT-4V analysis API
- `buildPrompt()` - Construct base prompt from state
- `generateStyled()` - Trigger full generation pipeline

### Backend API Endpoints (`SetCast/app/server.js`)

#### 1. `/api/analyze-garment` (POST)

**Purpose:** Analyze uploaded clothing/accessory images

**Input:**
```json
{
  "image": "data:image/jpeg;base64,..."
}
```

**Process:**
1. Receives base64 image
2. Sends to GPT-4 Vision with JSON-formatted analysis prompt
3. Parses JSON response

**Output:**
```json
{
  "garment_type": "sweater",
  "color": "navy blue",
  "material": "knit wool",
  "style": "oversized casual",
  "details": "crew neck, ribbed"
}
```

**Model Used:** `gpt-4o`
**Token Limit:** 200

#### 2. `/api/generate-styled` (POST)

**Purpose:** Enhance prompt and generate styled image

**Input:**
```json
{
  "prompt": "Base prompt string",
  "imageUrls": ["model.png", "item1.png", "item2.png"],
  "items": { /* state object */ }
}
```

**Process:**
1. Enhance prompt with GPT-4-mini
2. Call Nano Banana with enhanced prompt + all image URLs
3. Return enhanced prompt + generated image URL

**Output:**
```json
{
  "enhancedPrompt": "Enhanced prompt text",
  "imageUrl": "https://storage.googleapis.com/...",
  "description": "Optional description"
}
```

**Models Used:**
- Prompt enhancement: `gpt-4o-mini` (300 tokens)
- Image generation: `fal-ai/nano-banana/edit`

---

## User Flow

```
1. User opens Styling Studio
2. Selects model from grid
3. For each category:
   a. Uploads garment image (optional)
      → Image analyzed by GPT-4V
      → Analysis shown in UI
   b. OR selects style from dropdown
   c. Can clear to reset
4. Clicks "Generate Styled Look"
5. Base prompt constructed from state
6. Prompt enhanced by LLM
7. All images + prompt sent to Nano Banana
8. Styled image displayed
```

---

## Style Keywords

### Primary Styles
- **Minimal** - Clean, simple, understated
- **Street** - Urban, casual, contemporary
- **Luxury** - High-end, designer, premium
- **Avant-Garde** - Experimental, artistic, bold
- **Sporty** - Athletic, activewear, performance
- **Vintage** - Retro, classic, heritage

### Accessory-Specific
- **Statement** - Bold, eye-catching (face/neck only)

---

## File Structure

```
/styling/
├── index.html          # Main UI
└── styling.js          # Frontend logic

/SetCast/app/
└── server.js           # API endpoints (lines 1129-1231)

/SetCast/research/06_TOOL_DOCUMENTATION/
└── STYLING_STUDIO_DOCUMENTATION.md  # This file
```

---

## Dependencies

### Frontend
- Vanilla JavaScript (no frameworks)
- Fetch API for HTTP requests
- FileReader API for image previews

### Backend
- Express.js server (port 3001)
- OpenAI API (`gpt-4o`, `gpt-4o-mini`)
- fal.ai Nano Banana (`fal-ai/nano-banana/edit`)
- Multer for file handling

### Environment Variables Required
```
OPENAI_API_KEY=your_openai_key
FAL_KEY=your_fal_key
```

---

## Limitations & Considerations

### Current Limitations
1. **Model roster:** Limited to 12 pre-defined models
2. **Single generation:** One image at a time
3. **No batch processing:** Must generate each look individually
4. **Fixed aspect ratio:** Currently 3:4 only
5. **No history:** Previous generations not saved

### Quality Factors
- **Upload quality:** Higher quality garment photos = better results
- **Lighting consistency:** Better if garment photos have similar lighting
- **Clear backgrounds:** Garment photos with clean backgrounds work best
- **Reference accuracy:** More uploaded items = more accurate styling
- **Style mixing:** Mixing too many style keywords may dilute results

### Performance
- **Analysis time:** ~2-3 seconds per garment
- **Generation time:** ~15-30 seconds depending on complexity
- **Total time:** ~30-60 seconds for full styled look

---

## Future Enhancements

### Potential Features
1. **Batch generation** - Multiple style variations at once
2. **Style presets** - Save favorite combinations
3. **History/gallery** - View past generations
4. **More models** - Expand beyond 12 models
5. **Custom models** - Upload user's own model photos
6. **Color variations** - "Show this in different colors"
7. **Pose control** - Specify desired pose/angle
8. **Background options** - Studio, outdoor, editorial settings
9. **Export options** - Download, share, save to collection
10. **Comparison view** - Side-by-side style comparisons

### Technical Improvements
1. **Caching** - Store analyzed items to avoid re-analysis
2. **Progressive loading** - Show analysis results as they complete
3. **Error recovery** - Better handling of API failures
4. **Validation** - Check image quality before upload
5. **Optimization** - Compress images before sending
6. **Real-time preview** - Rough preview before full generation

---

## API Cost Estimates

### Per Generation:
- **GPT-4 Vision** (analysis): ~$0.01-0.02 per item
- **GPT-4 Mini** (enhancement): ~$0.001
- **Nano Banana** (generation): ~$0.05-0.10

**Average cost per styled look:** ~$0.10-0.20 (with 3-4 uploaded items)

---

## Troubleshooting

### Common Issues

**1. "Analysis failed" error**
- Check OPENAI_API_KEY is set
- Verify image is valid format (JPG, PNG)
- Ensure image size < 10MB

**2. "Generation failed" error**
- Check FAL_KEY is configured
- Verify all images loaded successfully
- Check server logs for detailed error

**3. Poor results**
- Use higher quality reference images
- Upload more garment references (fewer style keywords)
- Try enhancing base prompt manually

**4. Model not loading**
- Check image path is correct
- Verify server serving static files
- Check browser console for 404 errors

---

## Maintenance Notes

### Regular Updates Needed
1. **Model roster** - Add new talent as available
2. **Style keywords** - Expand based on user needs
3. **Prompt templates** - Refine for better results
4. **API versions** - Keep fal.ai SDK updated

### Monitoring
- Track generation success rate
- Monitor API costs
- Collect user feedback on results
- Analyze most-used style combinations

---

## Related Documentation

- [Nano Banana API Docs](https://fal.ai/models/fal-ai/nano-banana/edit)
- [OpenAI Vision API](https://platform.openai.com/docs/guides/vision)
- [SetCast v1 Documentation](./SETCAST_V1_DOCUMENTATION.md) _(to be created)_
- [Looks Tool Documentation](./LOOKS_DOCUMENTATION.md) _(to be created)_

---

**Last Updated:** November 10, 2025
**Maintainer:** Setset Playground Team
**Version:** 1.0.0
