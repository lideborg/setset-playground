# SetCast - Project Structure

Clean, organized structure for the editorial prompt generator.

---

## 📂 Directory Tree

```
SetCast/
│
├── README.md                          # Main project overview
├── PROJECT_STRUCTURE.md               # This file
│
├── app/                               # 🚀 Main application
│   ├── public/
│   │   └── index.html                 # Web interface (drag & drop upload)
│   ├── docs/
│   │   ├── SETUP_GUIDE.md            # Step-by-step installation
│   │   ├── README_GENERATOR.md       # Full feature documentation
│   │   └── QUICK_START.txt           # Quick reference
│   ├── server.js                      # Backend API + prompt generator
│   ├── package.json                   # Node dependencies
│   ├── package-lock.json              # Locked versions
│   ├── node_modules/                  # Installed packages
│   ├── .env                           # API keys (NOT committed)
│   ├── .env.example                   # Template for .env
│   ├── .gitignore                     # Git ignore rules
│   └── README.md                      # App-specific readme
│
├── research/                          # 📚 Methodology & guides
│   ├── VARIATION_STRATEGY_GUIDE.md   # How to ensure prompt diversity
│   ├── PROMPT_BUILDING_GUIDE.md      # Editorial prompt architecture
│   ├── VARIABLE_PROMPT_SYSTEM.md     # Component-based prompt system
│   ├── TALENT_ROSTER.md              # Model/talent documentation
│   ├── EDITORIAL_MINIMAL_SYSTEM.md   # Minimal editorial style guide
│   ├── LOCATION_MAPPING_SYSTEM.md    # Background/location reference
│   ├── CURRENT_LOCATION_COMPARISON.md
│   ├── FINAL_UPDATES_SUMMARY.md
│   └── NEW_MODELS_SUMMARY.md
│
├── prompts/                           # 💾 Generated prompt collections
│   └── talent_editorial/
│       ├── 01_JamesWilson_editorial.txt
│       ├── 02_MayaJohnson_editorial.txt
│       ├── 03_RiverBlake_editorial.txt
│       ├── 04_EmmaSullivan_editorial.txt
│       ├── 05_MarcusBrown_editorial.txt
│       ├── 06_ZaraMitchell_editorial.txt
│       ├── 07_SophiaAnderson_editorial.txt
│       ├── 08_LiamGarcia_editorial.txt
│       ├── 09_NinaDavis_editorial.txt
│       ├── 10_AvaMartinez_editorial.txt
│       ├── 11_LunaPark_editorial.txt
│       ├── 12_NoahChen_editorial.txt
│       ├── 13_KaiThompson_editorial.txt    # ✅ Updated with variation
│       ├── 14_RileyMorgan_editorial.txt    # ✅ Updated with variation
│       └── 15_JordanLee_editorial.txt      # ✅ Updated with variation
│
└── images/                            # 🖼️ Reference images
    └── (model photos, references, etc.)
```

---

## 🎯 What Each Folder Does

### `/app/` - The Application
The actual SetCast web tool. This is where the magic happens.

**Key files:**
- `server.js` - Contains the prompt generator + variable libraries
- `public/index.html` - The web interface
- `.env` - Your OpenAI API key (keep private!)

**To run:**
```bash
cd SetCast/app
npm start
```

### `/research/` - Methodology Documentation
All the guides, strategies, and documentation for HOW we build prompts.

**What's here:**
- Variation strategies
- Prompt building methodology
- Component libraries
- Style guides

**Use this when:**
- You want to understand the system
- You're tweaking the prompt formula
- You need to reference best practices

### `/prompts/` - Generated Outputs
Collections of generated prompts for different models.

**Organization:**
- `/talent_editorial/` - Editorial casting style prompts
- Each file = 20 prompts for one model
- Numbered by model (01-15)

**These are your outputs** - copy/paste ready for image generation!

### `/images/` - Reference Materials
Model photos, reference images, inspiration, etc.

---

## 🚀 Common Tasks

### Run the app
```bash
cd SetCast/app
npm start
# Open http://localhost:3001
```

### Read documentation
```bash
# Main overview
cat SetCast/README.md

# App setup
cat SetCast/app/docs/SETUP_GUIDE.md

# Methodology
cat SetCast/research/VARIATION_STRATEGY_GUIDE.md
```

### View generated prompts
```bash
cat SetCast/prompts/talent_editorial/13_KaiThompson_editorial.txt
```

### Edit variable libraries
```bash
# Open in your editor
SetCast/app/server.js

# Look for:
const VARIABLE_LIBRARIES = {
  poses: [...],
  backgrounds: [...],
  // etc.
}
```

---

## 📝 File Naming Conventions

**Prompts:** `[NUMBER]_[ModelName]_editorial.txt`
- Example: `13_KaiThompson_editorial.txt`

**Research docs:** `SCREAMING_SNAKE_CASE.md`
- Example: `VARIATION_STRATEGY_GUIDE.md`

**App docs:** `README_[Purpose].md` or `[Purpose]_GUIDE.md`
- Example: `SETUP_GUIDE.md`

---

## 🔄 Workflow

```
1. Research Phase
   └── /research/ - Study guides, understand methodology

2. Development Phase
   └── /app/ - Build/run the tool

3. Generation Phase
   └── /app/ - Upload photos, generate prompts

4. Output Phase
   └── /prompts/ - Save generated prompts here
```

---

## 🎨 Quick Reference

| Task | Location |
|------|----------|
| Run app | `SetCast/app/` |
| Edit variables | `SetCast/app/server.js` |
| Read guides | `SetCast/research/` |
| View prompts | `SetCast/prompts/` |
| Setup instructions | `SetCast/app/docs/SETUP_GUIDE.md` |
| Add images | `SetCast/images/` |

---

## 🧹 What Was Cleaned Up

**Removed from root:**
- Old `/public/` folder
- Old `/prompts/` folder
- Old `/research/` folder
- Scattered markdown files

**Now organized:**
- Everything has a clear home
- Easy to navigate
- Separation of concerns (app vs. docs vs. outputs)

---

## 🎯 Benefits of This Structure

✅ **Clear separation** - App, research, and outputs don't mix
✅ **Easy to find** - Everything in logical folders
✅ **Scalable** - Easy to add more models, prompts, docs
✅ **Professional** - Follows standard project conventions
✅ **Git-friendly** - .gitignore in right place, secrets protected

---

**Navigation:** Start with `/SetCast/README.md` for full overview!
