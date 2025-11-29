# Editorial Prompt Generator

Automated tool to generate 20 varied editorial prompts from model photos using image analysis and systematic variation.

## Features

- **Image Analysis**: Upload 1-5 model photos, GPT-4 Vision analyzes ethnicity, age, hair, and skin tone
- **Systematic Variation**: Automatically generates 20 unique prompts with varied:
  - Camera angles & lenses (24mm, 50mm, 85mm, 135mm, etc.)
  - Lighting setups (hard key, Rembrandt, soft diffused, golden hour, etc.)
  - Poses (sitting, standing, crouching, kneeling, walking, profile, etc.)
  - Environments (studio, concrete, warehouse, field, corridor, etc.)
  - Clothing colors (30+ color combinations)
  - Compositions (centered, off-center, low angle, wide shot, etc.)
- **No Repetition**: Smart shuffling ensures each of 20 prompts is unique
- **Copy/Paste Ready**: Simple line-by-line output, easy to copy into your image generation tool

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up OpenAI API Key

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-actual-key-here
```

Get your API key from: https://platform.openai.com/api-keys

### 3. Run the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 4. Open in Browser

```
http://localhost:3001
```

## Usage

1. **Upload Photos**: Click or drag & drop 1-5 model photos (JPG, PNG, max 10MB each)
2. **Generate**: Click "Generate 20 Prompts"
3. **Wait**: GPT-4 Vision analyzes the image (~5-10 seconds)
4. **Copy Prompts**: Copy individual prompts or all 20 at once

## How It Works

### Image Analysis
GPT-4 Vision analyzes your uploaded photo and extracts:
- Ethnicity (East Asian, Black, Pacific Islander, etc.)
- Gender
- Age range (early 20s, mid 20s, late 30s, etc.)
- Hair description (color, texture, style)
- Skin description (tone, undertones)

Example output:
```
East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones
```

### Prompt Generation

The tool then generates 20 prompts by:

1. **Using the subject description** from image analysis
2. **Randomly selecting** from variable libraries:
   - 11 framing options (full body, waist-up, tight crop, etc.)
   - 26 pose variations (standing, sitting, crouching, etc.)
   - 8 studio lighting setups
   - 14 environmental lighting setups
   - 18 backgrounds (6 studio, 12 environmental)
   - 9 camera/lens combinations
   - 14 color grading styles
   - 30+ clothing colors
   - 10 garment types
3. **Ensuring variety**: Shuffles all libraries so each prompt is unique
4. **Following the formula**:
   - 4 studio shots (prompts 1-4)
   - 16 environmental shots (prompts 5-20)

### Prompt Structure

Each generated prompt follows this format:

```
[SHOT TYPE], [SUBJECT], [FRAMING + POSE + FOOTWEAR], [BACKGROUND], [LIGHTING], [COLOR GRADING], [GAZE], [CLOTHING], [TEXTURE NOTE], [CAMERA SPECS], [AESTHETIC] -[NUMBER]
```

Example:
```
Editorial studio portrait, same East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones, full body head to toe feet visible in frame centered standing hands on hips powerful presence black leather boots, clean white studio seamless floor to ceiling infinite background, hard directional key light from above creating defined sculptural shadows dramatic, bright white high-key color grading high contrast, direct confident gaze intense forward selling, charcoal cotton blazer black suit pants minimal The Row aesthetic clean, natural skin texture visible pores, 50mm f/8, high-end fashion casting photography -01
```

## Variable Libraries

All variables are stored in `server.js` in the `VARIABLE_LIBRARIES` object. You can customize:

- **Shot Types**: Studio vs. environmental
- **Framings**: Full body, waist-up, headshot, tight crop, etc.
- **Poses**: Standing, sitting, crouching, kneeling, walking, profile
- **Studio Backgrounds**: White seamless, concrete floor, gray backdrop
- **Environmental Backgrounds**: Warehouse, concrete, field, corridor, etc.
- **Studio Lighting**: Hard key, Rembrandt, side light, rim light, etc.
- **Environmental Lighting**: Harsh overhead, golden hour, soft diffused, twilight
- **Camera Specs**: 24mm f/16, 50mm f/8, 85mm f/2.8, 135mm f/4, etc.
- **Color Grading**: High contrast, vibrant saturated, cool tones, warm tones
- **Gazes**: Direct confident, intense powerful, calm contemplative
- **Clothing Colors**: 30+ options (charcoal, rust, sage, powder blue, etc.)
- **Clothing Garments**: Blazer, shirt, turtleneck, cardigan, blouse, etc.
- **Footwear**: Black boots, white sneakers, dress shoes
- **Aesthetics**: High-end fashion, luxury editorial, industrial, architectural

## Tips

- **Better Photos = Better Results**: Use clear, well-lit model photos
- **Multiple Angles**: Upload different angles for more context (though only first image is analyzed)
- **Review Before Use**: Always review generated prompts and adjust if needed
- **Save Your Favorites**: Copy good prompts to a text file for reuse

## Future Enhancements

- [ ] Banana API integration for direct image generation
- [ ] Custom variable libraries (upload your own)
- [ ] Style presets (commercial, haute couture, streetwear, etc.)
- [ ] Batch processing (multiple models at once)
- [ ] Prompt editing interface
- [ ] Download prompts as .txt or .json

## Troubleshooting

**"No images uploaded" error**
- Make sure files are images (JPG, PNG)
- Check file size (max 10MB each)
- Try uploading one file at a time

**"Failed to generate prompts" error**
- Check your OpenAI API key in `.env`
- Make sure you have API credits
- Check console for detailed error messages

**Prompts look weird**
- Image analysis might be inaccurate
- Try a clearer photo
- Manually edit the subject description if needed (future feature)

## License

MIT

## Support

For issues or questions, create an issue at your repository or contact the developer.
