# SetCast App

**The prompt generation engine**

---

## 🚀 Quick Start

```bash
# Install
npm install

# Setup
cp .env.example .env
# Add your OpenAI API key to .env

# Run
npm start

# Open
http://localhost:3001
```

---

## 📂 Structure

```
app/
├── public/
│   └── index.html          # Web interface
├── docs/
│   ├── SETUP_GUIDE.md      # Installation guide
│   ├── README_GENERATOR.md # Full documentation
│   └── QUICK_START.txt     # Quick reference
├── server.js               # Backend + API + variable libraries
├── package.json            # Dependencies
├── .env.example            # Environment template
└── .env                    # Your API key (create this!)
```

---

## 🔧 How to Use

1. **Upload** a model photo (JPG/PNG, max 10MB)
2. **Wait** ~5-10 seconds for GPT-4 Vision analysis
3. **Copy** your 20 unique prompts!

---

## 🎨 Customizing Variables

All variable libraries are in `server.js`:

```javascript
const VARIABLE_LIBRARIES = {
  poses: [
    'standing hands on hips powerful presence',
    'crouching low hands on ground balanced',
    // Add more!
  ],
  backgrounds: [
    'white warehouse space empty minimal nothing',
    // Add more!
  ],
  // ... etc
}
```

Edit these to customize your prompt generation!

---

## 📚 Documentation

- **[Setup Guide](docs/SETUP_GUIDE.md)** - Detailed installation
- **[Full Docs](docs/README_GENERATOR.md)** - Complete feature list
- **[Quick Reference](docs/QUICK_START.txt)** - TL;DR guide

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
lsof -ti:3001 | xargs kill -9
npm start
```

**API key not working?**
- Check `.env` file exists
- Key should start with `sk-`
- No quotes needed

**"Failed to analyze image"?**
- Photo must be clear and well-lit
- Must show person's face
- JPG or PNG only, max 10MB

---

## 💡 Tips

- Use clear, professional photos for best results
- Each generation costs ~$0.01 (GPT-4 Vision)
- Edit `VARIABLE_LIBRARIES` in server.js to customize
- Check `/research/` for methodology docs

---

**Ready to go?** → `npm start`
