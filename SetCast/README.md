# SetCast

**AI-Powered Editorial Prompt Generator for Fashion & Model Casting Photography**

SetCast is a web-based tool that automatically generates 20 unique, high-quality editorial prompts from model photos using GPT-4 Vision analysis and systematic variation algorithms.

---

## 📂 Project Structure

```
SetCast/
├── app/                    # Main web application
│   ├── public/            # Frontend (HTML/CSS/JS)
│   ├── docs/              # App documentation
│   ├── server.js          # Backend API + prompt generator
│   ├── package.json       # Dependencies
│   └── .env               # API keys (not committed)
│
├── research/              # Guides & methodology docs
│   ├── VARIATION_STRATEGY_GUIDE.md
│   ├── PROMPT_BUILDING_GUIDE.md
│   ├── VARIABLE_PROMPT_SYSTEM.md
│   └── TALENT_ROSTER.md
│
├── prompts/               # Generated prompt collections
│   └── talent_editorial/  # Editorial talent prompts
│       ├── 01_JamesWilson_editorial.txt
│       ├── 02_MayaJohnson_editorial.txt
│       └── ...
│
└── images/                # Reference images & samples
```

---

## 🚀 Quick Start

### 1. Install & Setup

```bash
cd app
npm install
cp .env.example .env
# Edit .env and add your OpenAI API key
```

### 2. Run

```bash
npm start
```

### 3. Use

Open **http://localhost:3001**

1. Upload a model photo (JPG/PNG)
2. Click "Generate 20 Prompts"
3. Copy your unique prompts!

Full setup guide: [`app/docs/SETUP_GUIDE.md`](app/docs/SETUP_GUIDE.md)

---

## 💡 What It Does

### Input
A single model photo

### Process
1. **GPT-4 Vision** analyzes the photo
   - Extracts: ethnicity, age, hair description, skin tone
2. **Prompt Generator** creates 20 unique prompts
   - Varies: poses, camera angles, lighting, backgrounds, clothing

### Output
20 ready-to-use editorial prompts like:

```
Editorial studio portrait, same Black man early 20s with short natural afro texture hair and deep brown dark skin, full body head to toe feet visible in frame centered standing hands on hips powerful presence black leather boots, clean white studio seamless floor to ceiling infinite background, hard directional key light from above creating defined sculptural shadows dramatic, bright white high-key color grading high contrast, direct confident gaze intense forward selling, charcoal cotton blazer black suit pants sharp tailoring clean lines, natural skin texture visible pores, 50mm f/8, high-end fashion casting photography -01
```

---

## 🎯 Key Features

✅ **Automatic Analysis** - No manual input needed
✅ **True Variation** - All 20 prompts are unique
✅ **Editorial Quality** - Professional casting style
✅ **Systematic Diversity** - Varies 8+ dimensions per prompt
✅ **Fast** - Generates in 5-10 seconds
✅ **Cost-Effective** - ~$0.01 per generation (GPT-4 Vision)

---

## 📚 Documentation

### For Users
- **[Setup Guide](app/docs/SETUP_GUIDE.md)** - Step-by-step installation
- **[Quick Start](app/docs/QUICK_START.txt)** - TL;DR getting started
- **[Full Documentation](app/docs/README_GENERATOR.md)** - Complete feature list

### For Developers
- **[Variation Strategy](research/VARIATION_STRATEGY_GUIDE.md)** - How we ensure diversity
- **[Prompt Building Guide](research/PROMPT_BUILDING_GUIDE.md)** - Prompt architecture
- **[Variable System](research/VARIABLE_PROMPT_SYSTEM.md)** - Component libraries

---

## 🔧 How It Works

### Variable Libraries

The generator uses shuffled libraries to ensure variety:

- **26 poses** (sitting, standing, crouching, walking, etc.)
- **18 backgrounds** (studio, concrete, warehouse, field, etc.)
- **22 lighting setups** (hard key, soft diffused, golden hour, etc.)
- **9 camera/lens combos** (24mm f/16, 50mm f/8, 85mm f/2.8, etc.)
- **30+ clothing colors** (rust, sage, powder blue, charcoal, etc.)
- **10 garment types** (blazer, shirt, turtleneck, cardigan, etc.)

### Generation Algorithm

```
For each of 20 prompts:
  1. Shuffle all variable libraries
  2. Select unique combination (no repeats)
  3. Assemble prompt following editorial structure
  4. Ensure studio/environmental balance (4:16 ratio)
```

---

## 🎨 Example Workflow

```
Upload photo
    ↓
GPT-4 Vision analyzes:
"East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones"
    ↓
Generate 20 prompts:
  • 4 studio (varied lighting)
  • 16 environmental (varied everything)
    ↓
Copy & paste into image generation tool
```

---

## 📊 Prompt Breakdown

Each prompt contains **9 components**:

1. Shot type (studio/environmental/architectural)
2. Subject description (from GPT-4 Vision)
3. Framing + pose + footwear
4. Background/location
5. Lighting setup
6. Color grading
7. Gaze/expression
8. Clothing/styling
9. Camera specs + aesthetic label

Example structure:
```
[SHOT TYPE], [SUBJECT], [FRAMING+POSE], [BACKGROUND], [LIGHTING],
[COLOR GRADING], [GAZE], [CLOTHING], [TEXTURE], [CAMERA], [AESTHETIC] -[NUM]
```

---

## 🛠 Technology Stack

- **Frontend**: Vanilla HTML/CSS/JS (no frameworks)
- **Backend**: Node.js + Express
- **AI**: OpenAI GPT-4 Vision (gpt-4o model)
- **File Upload**: Multer
- **Deployment**: Local (port 3001)

---

## 📝 Customization

Edit variable libraries in `app/server.js`:

```javascript
const VARIABLE_LIBRARIES = {
  poses: [...],
  backgrounds: [...],
  lighting: [...],
  // Add your own!
}
```

---

## 💰 Cost

- **GPT-4 Vision**: ~$0.01 per image analysis
- **So**: ~$1.00 for 100 generations
- Very affordable for professional use!

---

## 🎯 Use Cases

- **Casting Directors**: Generate diverse prompt sets for model testing
- **Photographers**: Explore shot variations before shoot
- **Creative Directors**: Rapid ideation for editorial concepts
- **AI Artists**: Create consistent character prompts with variation

---

## 📦 Sample Prompts

Check `/prompts/talent_editorial/` for examples of generated prompt sets.

---

## 🤝 Contributing

This is a personal tool, but if you want to extend it:

1. Fork the project
2. Add features in `/app/`
3. Document your changes
4. Share back!

---

## 📄 License

MIT - Use freely for personal or commercial projects

---

## 🙏 Credits

Built with:
- OpenAI GPT-4 Vision for image analysis
- Express.js for backend
- Love for editorial photography

---

**Ready to generate?** → `cd app && npm start`

Questions? Check the `/app/docs/` folder or dive into `/research/` for deep methodology docs.
