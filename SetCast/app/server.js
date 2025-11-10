// Load environment variables first
require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const OpenAI = require('openai');
const { fal } = require('@fal-ai/client');

const app = express();
const PORT = 3001;

// Initialize OpenAI with API key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Configure fal.ai
if (process.env.FAL_KEY) {
  fal.config({
    credentials: process.env.FAL_KEY
  });
}

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to get current prompt
app.get('/api/prompt', (req, res) => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'current_prompt.json'), 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.json({ prompt: 'Waiting for prompt...', timestamp: Date.now() });
  }
});

// API endpoint to update prompt (for when I write new prompts)
app.post('/api/prompt', (req, res) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, 'current_prompt.json'),
      JSON.stringify({ prompt: req.body.prompt, timestamp: Date.now() })
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ===== BRAND AESTHETIC PROFILES =====
// Each brand has complete control over all visual variables
// Gender-specific clothing for men vs women

const STYLE_PROFILES = {
  quietLuxury: {
    name: 'Quiet Luxury',

    clothingMale: [
      { top: 'cashmere crewneck', bottom: 'tailored wool trousers' },
      { top: 'fine-gauge merino sweater', bottom: 'pleated suit pants' },
      { top: 'unstructured linen blazer', bottom: 'cream wide-leg trousers' },
      { top: 'cashmere turtleneck', bottom: 'straight-leg wool pants' },
      { top: 'ribbed cashmere cardigan', bottom: 'tapered suit trousers' },
      { top: 'relaxed linen shirt', bottom: 'wide-leg linen pants' },
      { top: 'fine cotton knit', bottom: 'tailored charcoal pants' }
    ],

    clothingFemale: [
      { top: 'cashmere crewneck', bottom: 'tailored wool trousers' },
      { top: 'fine-gauge knit sweater', bottom: 'wide-leg suit pants' },
      { top: 'cashmere cardigan', bottom: 'pleated trousers' },
      { top: 'ribbed cashmere turtleneck', bottom: 'straight-leg pants' },
      { top: 'relaxed linen blouse', bottom: 'high-waist wide-leg pants' },
      { top: 'merino wool sweater', bottom: 'tailored trousers' },
      { top: 'silk-cashmere blend top', bottom: 'flowing wide-leg pants' }
    ],

    colors: ['charcoal', 'ivory', 'slate', 'camel', 'sand', 'stone', 'cream', 'ash', 'dove', 'taupe'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background',
      'white studio concrete floor minimal clean',
      'soft warm beige studio backdrop gradient subtle',
      'soft charcoal studio backdrop gradient subtle',
      'white studio backdrop seamless minimal'
    ],

    environmentalBackgrounds: [
      'white warehouse space empty minimal nothing',
      'white minimal corridor empty nothing',
      'white geometric space empty minimal',
      'white surface empty minimal nothing',
      'white minimal space empty nothing',
      'concrete expanse empty gray minimal nothing'
    ],

    studioLighting: [
      'soft frontal beauty light minimal shadows even',
      'soft loop lighting subtle nose shadow flattering natural',
      'butterfly lighting overhead creating shadow under nose glamorous',
      'soft diffused light even minimal shadows'
    ],

    environmentalLighting: [
      'soft natural diffused light even all sharp focus f/11 entire scene',
      'soft golden hour light warm glow all sharp focus f/11 entire platform',
      'soft twilight natural light even all sharp focus f/11 entire corridor',
      'soft natural light diffused golden glow all sharp focus f/11 entire space',
      'soft overcast light even diffused all sharp focus f/11 entire surface'
    ],

    colorGrading: [
      'bright white high-key color grading high contrast',
      'high contrast color grading clean whites',
      'saturated white color grading high contrast clean',
      'high contrast minimal color grading crisp',
      'clean white color grading refined high contrast'
    ],

    aesthetic: 'quiet luxury refined minimalist understated elegant neutral monochromatic architectural precise'
  },

  frenchElegance: {
    name: 'French Elegance',

    clothingMale: [
      { top: 'double-breasted silk blazer', bottom: 'high-waist wide-leg trousers' },
      { top: 'structured shoulder coat', bottom: 'pleated dress pants' },
      { top: 'baroque-detailed jacket', bottom: 'slim cigarette pants' },
      { top: 'ornate brocade vest', bottom: 'tailored straight pants' },
      { top: 'velvet smoking jacket', bottom: 'satin-stripe trousers' },
      { top: 'embellished evening blazer', bottom: 'refined wool pants' },
      { top: 'dramatic collar shirt', bottom: 'elegant pleated trousers' }
    ],

    clothingFemale: [
      { top: 'dramatic shoulder blazer', bottom: 'high-waist wide-leg pants' },
      { top: 'structured tweed jacket', bottom: 'pleated midi skirt' },
      { top: 'bow-neck silk blouse', bottom: 'tailored cigarette pants' },
      { top: 'peplum silk top', bottom: 'flowing wide-leg trousers' },
      { top: 'ornate-button cardigan', bottom: 'pencil skirt' },
      { top: 'pussy-bow blouse', bottom: 'high-waist trousers' },
      { top: 'ruffled silk top', bottom: 'elegant pleated pants' }
    ],

    colors: ['black', 'white', 'deep red', 'navy', 'burgundy', 'gold', 'charcoal', 'ivory', 'emerald', 'sapphire'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background',
      'soft gray studio backdrop gradient subtle',
      'soft charcoal studio backdrop gradient dramatic',
      'white studio backdrop seamless elegant',
      'soft warm gray studio backdrop gradient'
    ],

    environmentalBackgrounds: [
      'white warehouse space empty elegant nothing',
      'white minimal corridor empty dramatic nothing',
      'white geometric space empty refined',
      'concrete expanse empty elegant minimal nothing',
      'white architectural space empty luxury nothing',
      'white minimal surface empty refined nothing'
    ],

    studioLighting: [
      'hard directional key light from above creating defined sculptural shadows dramatic',
      'dramatic Rembrandt lighting creating triangle shadows sculptural',
      'dramatic side lighting creating cheekbone shadows sculptural',
      'butterfly lighting overhead creating shadow under nose glamorous',
      'rim backlight creating edge separation glow plus soft frontal fill light'
    ],

    environmentalLighting: [
      'bright harsh overhead lighting creating defined shadows all sharp focus f/16 entire scene',
      'soft golden hour light warm dramatic glow all sharp focus f/11',
      'dramatic hard side light creating defined shadows high contrast',
      'bright natural light overhead all sharp focus f/11 entire scene dramatic',
      'soft natural light diffused all sharp focus f/8 elegant'
    ],

    colorGrading: [
      'high contrast color grading punchy blacks crisp',
      'vibrant saturated color grading bold',
      'high contrast color grading saturated dramatic',
      'vibrant saturated color grading dramatic intense',
      'saturated elegant color grading high contrast'
    ],

    aesthetic: 'haute couture elegant refined dramatic luxury editorial'
  },

  darkAvantGarde: {
    name: 'Dark Avant-Garde',

    clothingMale: [
      { top: 'draped elongated tunic', bottom: 'drop crotch pants' },
      { top: 'asymmetric draped jacket', bottom: 'elongated pants' },
      { top: 'oversized draped tee', bottom: 'tapered dark pants' },
      { top: 'layered draped top', bottom: 'architectural pants' },
      { top: 'elongated draped coat', bottom: 'slim dark pants' },
      { top: 'draped asymmetric shirt', bottom: 'dark wide pants' },
      { top: 'oversized layered jacket', bottom: 'drop crotch trousers' }
    ],

    clothingFemale: [
      { top: 'draped elongated tunic', bottom: 'drop crotch pants' },
      { top: 'asymmetric draped jacket', bottom: 'elongated skirt' },
      { top: 'oversized draped tee', bottom: 'tapered dark pants' },
      { top: 'layered draped top', bottom: 'architectural pants' },
      { top: 'elongated draped coat', bottom: 'slim dark pants' },
      { top: 'draped asymmetric dress', bottom: 'dark leggings' },
      { top: 'oversized layered jacket', bottom: 'drop crotch pants' }
    ],

    colors: ['black', 'charcoal', 'ash', 'dark gray', 'slate', 'stone', 'bone', 'dust', 'onyx'],

    studioBackgrounds: [
      'soft charcoal studio backdrop gradient moody',
      'dark gray studio backdrop gradient dramatic',
      'soft black studio backdrop gradient dark',
      'charcoal studio backdrop seamless moody',
      'dark studio backdrop gradient atmospheric'
    ],

    environmentalBackgrounds: [
      'brutalist concrete structure empty dark minimal nothing',
      'raw concrete wall surface minimal dark architectural',
      'concrete platform brutalist empty dark nothing',
      'exposed concrete space minimal dark architectural',
      'brutalist concrete expanse empty dark nothing',
      'raw concrete corridor minimal dark brutalist',
      'concrete brutalist structure empty dark architectural'
    ],

    studioLighting: [
      'hard directional key light from above creating defined sculptural shadows dramatic dark',
      'dramatic Rembrandt lighting creating triangle shadows sculptural moody',
      'dramatic side lighting creating deep cheekbone shadows sculptural dark',
      'split lighting half face shadow half light dramatic moody',
      'hard side light creating architectural shadows dramatic dark'
    ],

    environmentalLighting: [
      'dramatic hard side light creating defined shadows high contrast moody',
      'soft twilight natural light even dark all sharp focus f/11 moody',
      'hard overhead lighting creating dramatic shadows dark contrast',
      'soft natural light diffused dark moody all sharp focus f/11',
      'dramatic side natural light creating deep shadows moody architectural'
    ],

    colorGrading: [
      'desaturated dark color grading moody low contrast',
      'dark moody color grading low saturation atmospheric',
      'high contrast dark color grading dramatic blacks',
      'moody desaturated color grading dark atmospheric',
      'dark cinematic color grading moody dramatic',
      'low saturation dark color grading architectural moody'
    ],

    aesthetic: 'dark avant-garde architectural brutalist dystopian moody goth monochromatic'
  },

  athletic: {
    name: 'Athletic',

    clothingMale: [
      { top: 'tech fabric tee', bottom: 'athletic joggers' },
      { top: 'performance hoodie', bottom: 'training pants' },
      { top: 'athletic tank', bottom: 'jogger pants' },
      { top: 'tech shirt', bottom: 'athletic shorts' },
      { top: 'crew neck tee', bottom: 'training joggers' },
      { top: 'zip hoodie', bottom: 'track pants' },
      { top: 'performance tee', bottom: 'athletic pants' }
    ],

    clothingFemale: [
      { top: 'tech fabric tank', bottom: 'athletic leggings' },
      { top: 'performance hoodie', bottom: 'training tights' },
      { top: 'fitted athletic jacket', bottom: 'high-waist leggings' },
      { top: 'seamless tech top', bottom: 'performance tights' },
      { top: 'cropped athletic hoodie', bottom: 'jogger pants' },
      { top: 'ribbed seamless top', bottom: 'flare yoga pants' },
      { top: 'cropped zip hoodie', bottom: 'athletic leggings' }
    ],

    colorsMale: ['black', 'navy', 'dark gray', 'charcoal', 'white', 'light gray', 'olive', 'burgundy'],
    colorsFemale: ['white', 'light gray', 'soft pink', 'mint', 'sky blue', 'lavender', 'cream', 'sand', 'pearl', 'powder blue'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background bright',
      'white studio concrete floor minimal clean bright',
      'soft warm beige studio backdrop gradient light',
      'white studio backdrop seamless bright airy',
      'light studio backdrop gradient soft bright'
    ],

    environmentalBackgrounds: [
      'white warehouse space empty bright minimal nothing',
      'white minimal corridor empty bright airy nothing',
      'white geometric space empty bright minimal',
      'white surface empty bright minimal nothing',
      'white minimal space empty bright airy nothing',
      'empty field nothing minimal huge sky background 80 percent sky bright',
      'empty plain minimal huge sky expansive background 80 percent sky airy'
    ],

    studioLighting: [
      'soft frontal beauty light minimal shadows even bright',
      'soft loop lighting subtle nose shadow flattering bright natural',
      'butterfly lighting overhead creating soft shadow bright glamorous',
      'soft diffused light even bright minimal shadows airy',
      'soft overhead light creating gentle shadows bright clean'
    ],

    environmentalLighting: [
      'bright natural light even all sharp focus f/11 entire scene airy',
      'soft natural diffused light bright even all sharp focus f/11 entire space',
      'bright golden hour light warm glow all sharp focus f/8 wellness',
      'soft overcast light even diffused bright all sharp focus f/11 entire surface',
      'bright natural light overhead all sharp focus f/11 clean airy',
      'soft natural light diffused bright all sharp focus f/8 wellness'
    ],

    colorGrading: [
      'bright white high-key color grading vibrant high contrast',
      'vibrant saturated color grading bright clean',
      'high contrast color grading bright whites airy',
      'saturated bright color grading high contrast wellness',
      'bright airy color grading vibrant high contrast',
      'clean bright color grading saturated vibrant'
    ],

    aesthetic: 'athletic clean bright wellness vibrant minimal activewear'
  },

  scandinavian: {
    name: 'Scandinavian',

    clothingMale: [
      { top: 'oversized denim jacket', bottom: 'slim black jeans' },
      { top: 'structured wool coat', bottom: 'tailored pants' },
      { top: 'minimal crew neck', bottom: 'black pants' },
      { top: 'oversized shirt', bottom: 'slim pants' },
      { top: 'tailored blazer', bottom: 'black jeans' },
      { top: 'structured jacket', bottom: 'minimal pants' },
      { top: 'oversized tee', bottom: 'tailored trousers' }
    ],

    clothingFemale: [
      { top: 'oversized denim jacket', bottom: 'slim black jeans' },
      { top: 'structured wool coat', bottom: 'tailored pants' },
      { top: 'minimal crew neck', bottom: 'black pants' },
      { top: 'oversized shirt', bottom: 'slim pants' },
      { top: 'tailored blazer', bottom: 'minimal skirt' },
      { top: 'structured jacket', bottom: 'black pants' },
      { top: 'oversized tee', bottom: 'tailored trousers' }
    ],

    colors: ['black', 'navy', 'charcoal', 'camel', 'white', 'stone', 'slate', 'ash', 'midnight'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background',
      'white studio concrete floor minimal clean',
      'soft gray studio backdrop gradient subtle',
      'white studio backdrop seamless minimal',
      'soft charcoal studio backdrop gradient edgy'
    ],

    environmentalBackgrounds: [
      'white warehouse space empty minimal nothing',
      'concrete expanse empty gray minimal nothing',
      'white minimal corridor empty nothing',
      'white architectural space empty minimal',
      'concrete platform empty minimal nothing',
      'white geometric space empty minimal'
    ],

    studioLighting: [
      'soft frontal light minimal shadows even',
      'soft loop lighting subtle nose shadow natural',
      'hard directional key light from above creating defined shadows',
      'soft diffused light even minimal shadows',
      'dramatic side lighting creating shadows edgy'
    ],

    environmentalLighting: [
      'soft natural diffused light even all sharp focus f/11 entire scene',
      'bright harsh overhead lighting creating defined shadows all sharp focus f/16',
      'soft overcast light even diffused all sharp focus f/11 entire scene',
      'dramatic hard side light creating defined shadows high contrast',
      'soft twilight natural light even all sharp focus f/11'
    ],

    colorGrading: [
      'high contrast color grading crisp clean',
      'saturated color grading edgy bold',
      'high contrast minimal color grading',
      'desaturated cool color grading Scandinavian',
      'clean crisp color grading high contrast'
    ],

    aesthetic: 'Scandinavian minimal edgy cool Nordic refined cerebral'
  },

  streetwear: {
    name: 'Streetwear',

    clothingMale: [
      { top: 'minimal graphic tee', bottom: 'black jeans' },
      { top: 'oversized hoodie', bottom: 'cargo pants' },
      { top: 'crew neck sweatshirt', bottom: 'denim jeans' },
      { top: 'casual button shirt', bottom: 'chino pants' },
      { top: 'coach jacket', bottom: 'black jeans' },
      { top: 'flannel shirt', bottom: 'cargo pants' },
      { top: 'printed tee', bottom: 'casual pants' }
    ],

    clothingFemale: [
      { top: 'minimal graphic tee', bottom: 'black jeans' },
      { top: 'oversized hoodie', bottom: 'jogger pants' },
      { top: 'crew neck sweatshirt', bottom: 'denim jeans' },
      { top: 'casual button shirt', bottom: 'cargo pants' },
      { top: 'coach jacket', bottom: 'black pants' },
      { top: 'cropped tee', bottom: 'high waist jeans' },
      { top: 'printed hoodie', bottom: 'casual pants' }
    ],

    colors: ['black', 'white', 'olive', 'navy', 'burgundy', 'rust', 'sand', 'charcoal', 'forest green'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background',
      'white studio concrete floor minimal clean',
      'soft warm beige studio backdrop gradient subtle',
      'white studio backdrop seamless casual',
      'light studio backdrop gradient soft'
    ],

    environmentalBackgrounds: [
      'white warehouse space empty minimal nothing',
      'concrete expanse empty gray minimal nothing',
      'white minimal corridor empty casual nothing',
      'white surface empty minimal nothing',
      'concrete wall surface minimal empty nothing',
      'white geometric space empty minimal'
    ],

    studioLighting: [
      'soft frontal light minimal shadows even',
      'soft loop lighting subtle nose shadow natural',
      'soft diffused light even bright',
      'butterfly lighting overhead creating soft shadow',
      'soft overhead light creating gentle shadows'
    ],

    environmentalLighting: [
      'bright natural light even all sharp focus f/11 entire scene',
      'soft natural diffused light bright all sharp focus f/11',
      'bright golden hour light warm glow all sharp focus f/11',
      'soft overcast light even diffused all sharp focus f/11 entire surface',
      'bright natural light overhead all sharp focus f/11 clean'
    ],

    colorGrading: [
      'saturated color grading vibrant casual',
      'high contrast color grading punchy',
      'vibrant saturated color grading streetwear',
      'saturated warm color grading casual',
      'clean vibrant color grading high contrast'
    ],

    aesthetic: 'streetwear casual authentic relaxed surf California urban'
  },

  freshBeauty: {
    name: 'Fresh Beauty',

    clothingMale: [
      { top: 'white tank top', bottom: 'minimal' },
      { top: 'soft cotton tee', bottom: 'minimal' },
      { top: 'ribbed tank', bottom: 'minimal' },
      { top: 'simple white tee', bottom: 'minimal' },
      { top: 'bare shoulders', bottom: 'minimal' },
      { top: 'clean cotton tee', bottom: 'minimal' },
      { top: 'soft ribbed tank', bottom: 'minimal' }
    ],

    clothingFemale: [
      { top: 'white tank top', bottom: 'minimal' },
      { top: 'soft cotton tee', bottom: 'minimal' },
      { top: 'ribbed tank', bottom: 'minimal' },
      { top: 'simple white tee', bottom: 'minimal' },
      { top: 'bare shoulders', bottom: 'minimal' },
      { top: 'clean cotton tee', bottom: 'minimal' },
      { top: 'soft ribbed tank', bottom: 'minimal' }
    ],

    colors: ['white', 'soft pink', 'cream', 'pearl', 'nude', 'blush', 'ivory', 'powder', 'shell', 'oat'],

    studioBackgrounds: [
      'clean white studio seamless floor to ceiling infinite background',
      'white studio backdrop seamless bright',
      'soft white beige studio backdrop gradient subtle',
      'white studio backdrop seamless fresh',
      'light studio backdrop bright soft'
    ],

    environmentalBackgrounds: [
      'white wall minimal clean bright nothing',
      'white bathroom tiles minimal clean fresh nothing',
      'white marble surface minimal bright nothing',
      'white space minimal clean fresh nothing',
      'white room minimal bright clean nothing',
      'white surface minimal fresh nothing'
    ],

    studioLighting: [
      // Regular bright/soft (1/3)
      'soft frontal light minimal shadows dewy glow',
      'soft ring light flattering radiant glow',
      'soft diffused light even bright glowing',
      'butterfly lighting overhead creating soft glow radiant',

      // Warm lighting (1/3)
      'warm golden light soft glow radiant skin',
      'warm honey light glowing radiant dewy',
      'soft warm light golden hour glow radiant',
      'warm diffused light honey glow radiant skin',

      // Dewy skin texture (1/3)
      'soft light wet dewy skin texture glistening radiant',
      'bright light moist skin dewy texture glow',
      'soft diffused light wet skin dewy glistening radiant',
      'ring light wet dewy skin texture radiant glow'
    ],

    environmentalLighting: [
      // Regular bright/soft (1/3)
      'bright natural window light dewy glow skin radiant close f/2.8',
      'soft natural diffused light fresh glowing skin close f/2.8',
      'soft window light even diffused glowing radiant skin close f/2.8',
      'bright natural light soft dewy glowing skin radiant close f/2.8',

      // Warm lighting (1/3)
      'warm golden hour window light radiant glow skin close f/2.8',
      'warm morning light honey glow radiant skin close f/2.8',
      'soft warm window light golden radiant skin close f/2.8',
      'warm afternoon light honey glow radiant skin close f/2.8',

      // Dewy skin texture (1/3)
      'natural light wet dewy skin texture glistening radiant close f/2.8',
      'bright window light moist skin dewy texture radiant glow close f/2.8',
      'soft natural light wet skin dewy glistening radiant close f/2.8',
      'window light wet dewy skin texture radiant glow close f/2.8'
    ],

    colorGrading: [
      // Regular bright/fresh (1/3)
      'fresh dewy color grading bright glowing',
      'soft radiant color grading natural glow',
      'bright fresh color grading dewy radiant',
      'clean fresh color grading bright radiant',

      // Warm tones (1/3)
      'warm golden color grading honey glow radiant',
      'warm honey color grading golden radiant glow',
      'soft warm color grading golden hour radiant',
      'warm radiant color grading honey glow',

      // Dewy skin emphasis (1/3)
      'fresh dewy wet skin color grading glistening radiant',
      'bright dewy moist skin color grading radiant glow',
      'natural wet skin color grading dewy glistening',
      'soft dewy wet skin color grading radiant fresh'
    ],

    aesthetic: 'skincare beauty fresh dewy glowing radiant natural minimal clean closeup intimate'
  }
};

// ===== VARIABLE LIBRARIES =====

const VARIABLE_LIBRARIES = {
  shotTypes: [
    { type: 'Editorial studio portrait', isStudio: true },
    { type: 'Editorial studio headshot', isStudio: true },
    { type: 'Editorial environmental minimal', isStudio: false },
    { type: 'Editorial architectural portrait', isStudio: false },
    { type: 'Editorial atmospheric portrait', isStudio: false }
  ],

  framings: [
    'full body head to toe feet visible in frame centered',
    'full body head to toe feet visible in frame off-center right third',
    'full body head to toe feet visible in frame low angle looking up',
    'full body head to toe feet visible in frame wide shot environmental emphasis',
    'waist-up medium shot centered',
    'waist-up medium shot off-center composition',
    'bust shot waist-up centered composition',
    'tight crop chest-up centered composition',
    'tight crop shoulders-up off-center left composition',
    'tight portrait chest-up centered composition',
    'extreme tight crop face only eyes centered'
  ],

  poses: [
    // TIER 1 - Classic Editorial (use most) - powerful, confident
    'standing hands on hips powerful presence confident',
    'standing arms crossed editorial attitude confident',
    'standing one hand in pocket casual confident stance',
    'standing hand on hip weight shifted asymmetrical stance',
    'leaning against wall relaxed editorial stance',
    'standing arms at sides powerful presence',
    'standing hands on hips confident powerful',
    'standing arms crossed strong editorial',

    // TIER 2 - Angled Editorial - turned, profile views
    'profile turned away side view contemplative',
    'three-quarter turn looking back angled away',
    'walking forward looking over shoulder glance back',
    'walking away back view motion',
    'sitting on edge casual powerful',
    'profile side view standing strong',

    // TIER 3 - Advanced Editorial (use sparingly) - gesture, intimate
    'standing hand touching face contemplative gesture',
    'standing hand on chin contemplative editorial',
    'standing arms behind back open powerful stance',
    'standing looking down introspective',
    'standing head tilted contemplative angle',

    // Additional powerful/active poses for variety
    'walking forward mid-stride purposeful powerful motion',
    'leaning against wall arms crossed attitude',
    'sitting on ground knees up arms on knees strong presence',
    'crouching low balanced powerful grounded',
    'kneeling one knee down hands on knee powerful editorial'
  ],

  studioBackgrounds: [
    'clean white studio seamless floor to ceiling infinite background',
    'white studio concrete floor minimal clean',
    'soft gray studio backdrop gradient subtle',
    'soft warm beige studio backdrop gradient subtle',
    'soft charcoal studio backdrop gradient subtle',
    'white studio backdrop seamless minimal'
  ],

  environmentalBackgrounds: [
    'white warehouse space empty minimal nothing',
    'white industrial space empty minimal nothing',
    'concrete expanse empty gray minimal nothing',
    'asphalt expanse empty gray minimal nothing',
    'white wall surface empty minimal nothing',
    'concrete wall single surface minimal empty nothing',
    'concrete platform empty minimal nothing',
    'white minimal corridor empty nothing',
    'white corridor minimal empty nothing',
    'white minimal space empty nothing',
    'white geometric space empty minimal',
    'white surface empty minimal nothing',
    'white minimal surface empty nothing',
    'white infinite space minimal empty nothing',
    'white haze space empty nothing minimal',
    'empty field nothing minimal huge sky background 80 percent sky',
    'empty plain minimal huge sky expansive background 80 percent sky',
    'empty expanse gray minimal nothing huge sky background 75 percent sky'
  ],

  studioLighting: [
    'hard directional key light from above creating defined sculptural shadows dramatic',
    'soft frontal beauty light minimal shadows even',
    'soft loop lighting subtle nose shadow flattering natural',
    'butterfly lighting overhead creating shadow under nose glamorous',
    'dramatic Rembrandt lighting creating triangle shadows sculptural',
    'dramatic side lighting creating cheekbone shadows sculptural',
    'rim backlight creating edge separation glow plus soft frontal fill light',
    'split lighting half face shadow half light dramatic'
  ],

  hardFlashLighting: [
    'hard flash direct frontal creating sharp defined shadows high contrast dramatic',
    'hard flash from above creating strong overhead shadows editorial harsh',
    'hard flash side angle creating deep sculptural shadows bold contrast',
    'hard flash slightly off-center creating asymmetric hard shadows dramatic',
    'hard flash ring light creating even harsh illumination sharp shadows all around',
    'hard flash bounce creating crisp shadows defined edges high contrast',
    'hard flash bare bulb creating stark shadows editorial raw powerful',
    'hard flash frontal plus side creating layered hard shadows complex dramatic'
  ],

  environmentalLighting: [
    'bright harsh overhead lighting creating defined shadows all sharp focus f/16 entire interior',
    'bright harsh overhead sunlight creating defined shadows all sharp focus f/16 entire landscape',
    'soft natural diffused light even all sharp focus f/11 entire wall',
    'soft golden hour light warm glow all sharp focus f/11 entire platform',
    'soft twilight natural light even all sharp focus f/11 entire corridor',
    'soft natural light diffused golden glow all sharp focus f/11 entire space',
    'soft natural light diffused all sharp focus f/5.6 subject sharp background soft',
    'soft natural light diffused all sharp focus f/4 subject sharp',
    'soft overcast light even diffused all sharp focus f/11 entire surface',
    'bright natural light even all sharp focus f/11 entire space',
    'bright natural light overhead all sharp focus f/11 entire scene no depth of field',
    'dramatic hard side light creating defined shadows high contrast',
    'soft diffused light all sharp focus f/11 entire surface',
    'golden hour natural light warm glow all sharp focus f/11 entire scene'
  ],

  cameraSpecs: [
    { lens: '24mm', aperture: 'f/16', use: 'epic wide' },
    { lens: '35mm', aperture: 'f/16', use: 'environmental wide' },
    { lens: '35mm', aperture: 'f/11', use: 'environmental balanced' },
    { lens: '50mm', aperture: 'f/11', use: 'standard environmental' },
    { lens: '50mm', aperture: 'f/8', use: 'standard studio' },
    { lens: '70mm', aperture: 'f/5.6', use: 'portrait flattering' },
    { lens: '85mm', aperture: 'f/4', use: 'portrait compression' },
    { lens: '85mm', aperture: 'f/2.8', use: 'tight portrait' },
    { lens: '135mm', aperture: 'f/4', use: 'compressed portrait' }
  ],

  colorGrading: [
    'bright white high-key color grading high contrast',
    'high contrast color grading punchy blacks crisp',
    'vibrant saturated color grading bold',
    'high contrast color grading saturated',
    'saturated white color grading high contrast',
    'saturated white color grading high contrast clean',
    'high contrast architectural color grading saturated',
    'saturated gray-blue color grading vibrant high contrast',
    'saturated warm golden color grading high contrast',
    'high contrast color grading saturated warm tones',
    'saturated white haze color grading high contrast clean',
    'saturated cool gray tones high contrast',
    'saturated cool color grading high contrast clean',
    'vibrant saturated color grading dramatic intense'
  ],

  gazes: [
    'direct confident gaze forward selling',
    'intense confident gaze forward selling',
    'confident gaze forward selling presence',
    'intense powerful gaze direct selling',
    'powerful confident gaze direct selling',
    'direct powerful gaze forward selling',
    'confident direct gaze forward selling presence',
    'engaging confident gaze forward selling',
    'intense powerful gaze forward selling presence',
    'direct confident gaze intense forward selling presence',
    'powerful direct gaze forward confident selling',
    'confident powerful gaze forward intense selling'
  ],

  clothingColors: [
    'charcoal', 'slate', 'navy', 'black', 'white', 'cream', 'ivory', 'sand', 'stone',
    'rust', 'terracotta', 'camel', 'ochre', 'amber', 'mustard', 'butter yellow',
    'burgundy', 'wine red', 'ruby', 'forest green', 'moss green', 'sage', 'olive', 'jade',
    'powder blue', 'steel blue', 'cobalt', 'steel gray', 'ash', 'dove',
    'blush', 'coral', 'garnet', 'pistachio'
  ],

  clothingGarments: [
    { top: 'cotton blazer', bottom: 'black suit pants' },
    { top: 'linen shirt', bottom: 'charcoal suit pants' },
    { top: 'silk shirt', bottom: 'navy suit pants' },
    { top: 'fine cotton shirt', bottom: 'charcoal suit pants' },
    { top: 'cotton turtleneck', bottom: 'black suit pants' },
    { top: 'fine cotton turtleneck', bottom: 'white suit pants' },
    { top: 'silk blouse', bottom: 'navy suit pants' },
    { top: 'linen blazer', bottom: 'black suit pants' },
    { top: 'cotton cardigan', bottom: 'charcoal suit pants' },
    { top: 'cotton crew neck', bottom: 'black suit pants' }
  ],

  footwear: [
    'black leather boots',
    'white minimal sneakers',
    'black dress shoes',
    'white sneakers',
    'black boots',
    'white dress shoes'
  ],

  aesthetics: [
    'high-end fashion casting photography',
    'boutique editorial casting',
    'high-fashion editorial',
    'luxury editorial photography',
    'industrial editorial epic',
    'natural editorial epic',
    'architectural editorial serene',
    'architectural editorial dramatic',
    'atmospheric editorial serene',
    'outdoor editorial dramatic',
    'outdoor editorial serene',
    'architectural editorial luxury',
    'luxury editorial serene',
    'industrial editorial casting',
    'architectural editorial bold',
    'architectural editorial unique'
  ]
};

// ===== HELPER FUNCTIONS =====

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function selectVaried(library, count) {
  const shuffled = shuffleArray(library);
  return shuffled.slice(0, Math.min(count, library.length));
}

function generatePrompts(subjectDescription, count = 20, selectedStyles = ['theRow'], gender = 'male') {
  const prompts = [];

  // ===== STYLE DISTRIBUTION =====
  // Calculate how many prompts each brand gets
  const promptsPerStyle = Math.floor(count / selectedStyles.length);
  const remainder = count % selectedStyles.length;

  // Build distribution array (e.g., ['quietLuxury', 'quietLuxury', 'darkAvantGarde', 'darkAvantGarde', ...])
  const styleDistribution = [];
  selectedStyles.forEach((style, idx) => {
    const extra = idx < remainder ? 1 : 0;
    for (let j = 0; j < promptsPerStyle + extra; j++) {
      styleDistribution.push(style);
    }
  });

  // Shuffle style distribution for variety
  const shuffledStyleDistribution = shuffleArray(styleDistribution);

  // ===== SHUFFLE UNIVERSAL VARIABLES =====
  const framings = shuffleArray(VARIABLE_LIBRARIES.framings);
  const poses = shuffleArray(VARIABLE_LIBRARIES.poses);
  const hardFlashLighting = shuffleArray(VARIABLE_LIBRARIES.hardFlashLighting);
  const cameraSpecs = shuffleArray(VARIABLE_LIBRARIES.cameraSpecs);
  const gazes = shuffleArray(VARIABLE_LIBRARIES.gazes);
  const footwear = shuffleArray(VARIABLE_LIBRARIES.footwear);

  // Shuffle each brand's specific variables
  const shuffledBrandProfiles = {};
  selectedStyles.forEach(styleName => {
    const profile = STYLE_PROFILES[styleName];
    if (!profile) {
      throw new Error(`Unknown style: ${styleName}`);
    }

    // Select gender-specific clothing
    const clothingArray = gender === 'female' ? profile.clothingFemale : profile.clothingMale;

    // Select gender-specific colors (if brand has them, otherwise use default)
    const colorsArray = gender === 'female' && profile.colorsFemale ?
      profile.colorsFemale :
      (gender === 'male' && profile.colorsMale ? profile.colorsMale : profile.colors);

    shuffledBrandProfiles[styleName] = {
      clothingTypes: shuffleArray(clothingArray),
      colors: shuffleArray(colorsArray),
      studioBackgrounds: shuffleArray(profile.studioBackgrounds),
      environmentalBackgrounds: shuffleArray(profile.environmentalBackgrounds),
      studioLighting: shuffleArray(profile.studioLighting),
      environmentalLighting: shuffleArray(profile.environmentalLighting),
      colorGrading: shuffleArray(profile.colorGrading),
      aesthetic: profile.aesthetic
    };
  });

  // Generate 3 studio shots, rest environmental
  const studioCount = 3;

  // Define which prompts should use hard flash (5 total, spread across the set)
  const hardFlashIndices = [3, 7, 11, 15, 19]; // Prompts 4, 8, 12, 16, 20

  // ===== GENERATE PROMPTS =====
  for (let i = 0; i < count; i++) {
    const isStudio = i < studioCount;
    const promptNum = String(i + 1).padStart(2, '0');

    // Get the brand for this prompt
    const currentStyle = shuffledStyleDistribution[i];
    const brandProfile = shuffledBrandProfiles[currentStyle];

    // Use 'same' for first prompt, 'this' for others
    const subjectPrefix = i === 0 ? 'same' : 'this';
    const subject = subjectDescription.replace(/^(same|this|an?)\s+/i, `${subjectPrefix} `);

    // Select variables
    const shotType = isStudio ?
      VARIABLE_LIBRARIES.shotTypes.find(s => s.isStudio).type :
      VARIABLE_LIBRARIES.shotTypes.find(s => !s.isStudio).type;

    const framing = framings[i % framings.length];
    const pose = poses[i % poses.length];

    // Use brand-specific backgrounds
    const background = isStudio ?
      brandProfile.studioBackgrounds[i % brandProfile.studioBackgrounds.length] :
      brandProfile.environmentalBackgrounds[i % brandProfile.environmentalBackgrounds.length];

    // Check if this prompt should use hard flash
    const useHardFlash = hardFlashIndices.includes(i);
    const lighting = useHardFlash ?
      hardFlashLighting[Math.floor(i / 4) % hardFlashLighting.length] :
      (isStudio ?
        brandProfile.studioLighting[i % brandProfile.studioLighting.length] :
        brandProfile.environmentalLighting[i % brandProfile.environmentalLighting.length]);

    const camera = cameraSpecs[i % cameraSpecs.length];

    // Use brand-specific color grading
    const grading = brandProfile.colorGrading[i % brandProfile.colorGrading.length];
    const gaze = gazes[i % gazes.length];

    // ===== BRAND-SPECIFIC CLOTHING =====
    const garment = brandProfile.clothingTypes[i % brandProfile.clothingTypes.length];
    const topColor = brandProfile.colors[i % brandProfile.colors.length];
    const bottomColor = brandProfile.colors[(i + 5) % brandProfile.colors.length];
    const shoes = footwear[i % footwear.length];

    // Build clothing description
    const clothing = `${topColor} ${garment.top} ${bottomColor} ${garment.bottom} clean`;

    // Determine if full body or partial
    const isFullBody = framing.includes('full body');
    const framingWithShoes = isFullBody ? `${framing} ${pose} ${shoes}` : `${framing} ${pose.replace('standing', '').replace('sitting', '').trim()}`;

    // Build texture note
    const textureNote = framing.includes('tight') || framing.includes('bust') || framing.includes('portrait') ?
      'natural skin texture visible pores' :
      (framing.includes('full body') && !isStudio ?
        `crisp sharp detail entire ${isStudio ? 'frame' : 'scene'} complete no depth of field` :
        'visible natural skin texture');

    // Use brand-specific aesthetic
    const aesthetic = brandProfile.aesthetic;

    // Assemble prompt
    const prompt = `${shotType}, ${subject}, ${framingWithShoes}, ${background}, ${lighting}, ${grading}, ${gaze}, ${clothing}, ${textureNote}, ${camera.lens} ${camera.aperture}, ${aesthetic} -${promptNum}`;

    prompts.push(prompt);
  }

  return prompts;
}

// ===== API ENDPOINTS =====

app.post('/api/generate-prompts', upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No images uploaded' });
    }

    // Parse selected styles from request (default to theRow if none provided)
    const selectedStyles = req.body.styles ? JSON.parse(req.body.styles) : ['theRow'];

    // Use first image for analysis
    const firstImage = req.files[0];
    const base64Image = firstImage.buffer.toString('base64');
    const imageUrl = `data:${firstImage.mimetype};base64,${base64Image}`;

    // Analyze image with GPT-4 Vision
    const analysisPrompt = `Analyze this model photo carefully and provide ONLY the following information in this exact format:

[ETHNICITY] [GENDER] [AGE] with [HAIR: color + texture + style] and [SKIN: tone + undertones]

IMPORTANT - GENDER IDENTIFICATION:
- Look at facial structure, body shape, styling, and presentation
- If the person has feminine features (curves, makeup, feminine styling) → use "woman"
- If the person has masculine features (angular face, masculine styling) → use "man"
- Be very careful and accurate with gender - this is critical for clothing selection

Examples:
- East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones
- Black man early 20s with short natural afro texture hair and deep brown dark skin
- Pacific Islander man late 30s with dark brown slicked back hair and medium skin warm undertones
- White woman early 30s with platinum blonde straight long hair and fair skin cool undertones
- Middle Eastern man mid 20s with dark brown short curly hair and olive skin warm undertones

Be specific about ethnicity (East Asian, Black, Pacific Islander, South Asian, Middle Eastern, White, Hispanic, etc.)
Age should be: early 20s, mid 20s, late 20s, early 30s, mid 30s, late 30s, early 40s
Hair: include color, texture, and style
Skin: include tone and undertones

Respond with ONLY the description, no extra text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: analysisPrompt },
            { type: 'image_url', image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 150
    });

    const subjectDescription = response.choices[0].message.content.trim();

    // Extract gender from description for gender-specific clothing
    const genderMatch = subjectDescription.match(/\b(woman|man|male|female|non-binary|androgynous)\b/i);
    const gender = genderMatch ? (genderMatch[1].toLowerCase().includes('woman') || genderMatch[1].toLowerCase().includes('female') ? 'female' : 'male') : 'male';

    // Generate 20 prompts with selected styles
    const prompts = generatePrompts(subjectDescription, 20, selectedStyles, gender);

    res.json({
      subjectDescription,
      prompts
    });

  } catch (error) {
    console.error('Error generating prompts:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to generate images using fal.ai
app.post('/api/generate-images', upload.single('image'), async (req, res) => {
  try {
    if (!process.env.FAL_KEY) {
      return res.status(500).json({ error: 'FAL_KEY not configured. Please add your fal.ai API key to the .env file.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { prompts, aspectRatio = '3:4' } = req.body;

    if (!prompts || !Array.isArray(JSON.parse(prompts))) {
      return res.status(400).json({ error: 'Prompts array is required' });
    }

    const promptsArray = JSON.parse(prompts);
    const base64Image = req.file.buffer.toString('base64');
    const imageUrl = `data:${req.file.mimetype};base64,${base64Image}`;

    console.log(`Generating ${promptsArray.length} images with aspect ratio ${aspectRatio}...`);

    // Generate images in parallel using nano-banana
    const imagePromises = promptsArray.map(async (prompt, index) => {
      try {
        const result = await fal.subscribe('fal-ai/nano-banana/edit', {
          input: {
            prompt: prompt,
            image_urls: [imageUrl], // nano-banana uses image_urls array
            aspect_ratio: aspectRatio, // e.g., "3:4", "4:5", "9:16", "2:3"
            num_images: 1,
            output_format: 'jpeg',
            sync_mode: true
          },
          logs: false
        });

        return {
          index,
          url: result.data.images[0].url,
          prompt,
          success: true
        };
      } catch (error) {
        console.error(`Error generating image ${index}:`, error.message);
        return {
          index,
          error: error.message,
          prompt,
          success: false
        };
      }
    });

    const results = await Promise.all(imagePromises);

    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`✅ Generated ${successful.length}/${promptsArray.length} images`);
    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length}`);
    }

    res.json({
      results,
      summary: {
        total: promptsArray.length,
        successful: successful.length,
        failed: failed.length
      }
    });

  } catch (error) {
    console.error('Error generating images:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Editorial Prompt Generator running at http://localhost:${PORT}`);
  console.log(`📸 Upload model photos to generate varied editorial prompts\n`);
});
