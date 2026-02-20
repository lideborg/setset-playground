# Ron Dorff SS26 Campaign Notes

## Project Overview
- **Campaign**: Fearless Summer SS26
- **Theme**: "Ibiza in the 90s" (originally planned for Lanzarote)
- **Client Contact**: Claus Lindorff (Founder & CEO)
- **Timeline**: Collection launches June/July 2026

---

## Project Status

### Round 1 (Feb 11, 2026)
- Initial batch delivered
- **Feedback received Feb 12**: Too dark/volcanic, too much sunset mood, need sexier poses

### Round 2 (Feb 14, 2026) - IN PROGRESS
- Updated v2 tool with client feedback
- Changes: Lighter rocks, midday lighting, Ron Dorff poses, front-facing for briefs
- **Delivery target**: Feb 18 (Tuesday)

---

## Client Feedback History

### Feb 12-13, 2026 (Round 1 Feedback)

### Environments
- **Problem**: Dark rocks and desert parts feel too harsh
- **Solution**: Lighter rock formations like Ibiza (see Google search: "ibiza stone beaches")
- **Key quote**: "Always with a beach element"
- **Composition**: "Visuals as composed and graphic as possible - horizon, architectural details"
- **Avoid**: Messy beaches that look "invaded by tourists"

### Lighting (Updated Feb 14)
- **Primary**: High summer / midday - blue skies, sun high, warm but bright
- Avoid: Late afternoon/sunset mood (too much golden hour in v0.1)
- Keep warmth in tones but with **higher, more midday-like light**
- **Less** golden hour effect, fewer low/grazing shadows
- **More** daylight feel, sun positioned higher in sky
- **Sky**: Should NOT feel overcast/grey - needs to be sunny!
- Models should look **suntanned and healthy**

### Models
- **Never** have both models in same shot
- Split: ~2/3 dark-haired model, ~1/3 blonde model
- Blonde model: More blonde but **natural** like "California surfer" (NOT yellow/80s)
- Overall: More **sexy** poses

### Products
- Briefs (thongs): Always shot from **front** (flagged for nudity from behind)
- Follow specific silhouettes provided by client (outfit pairings)

### Pose References
- Client sent Morocco and Skopelos campaign poses as reference
- Push more sexy poses than initial round
- Reference images saved in: `/assets/brand/rondorff/reference/graphic/`

---

## Ron Dorff Poses (from graphic reference)

1. Leaning against wall with one hand in hair, confident gaze, weight shifted to one leg
2. Seated on edge/stool, legs extended, relaxed confident posture, looking off to side
3. Walking casually on wet sand, mid-stride, barefoot, natural movement
4. Standing with hands adjusting waistband or hem, looking down, playful
5. Seated on rocks with one knee up, arm resting on knee, gazing at horizon
6. Leaning on railing or ledge, profile view, looking out at ocean
7. Standing with arms crossed or hands in pockets, strong stance, direct gaze
8. Crouching or squatting casually, athletic pose, confident expression

---

## Technical Decisions

### v0.1 → v0.2 Changes
- Add "Generate" tab for creating custom backgrounds
- Three environment types: Ibiza Beach, Architecture, Dark Rocks (volcanic)
- Three lighting options: Midday Summer (primary), Sunrise, Sunset
- Option to generate environment only OR environment + male model
- Ron Dorff poses integrated into generate tool
- Briefs = always front-facing

### Environment Generation Prompts

**Ibiza Beach**: Light-colored limestone rocks, sandy beach, clear turquoise Mediterranean water, clean graphic composition with clear horizon line

**Architecture**: Minimalist Mediterranean architecture, terracotta or concrete walls, clean geometric shapes, graphic composition, seaside backdrop

**Dark Rocks (Volcanic)**: Dramatic volcanic beach, dark lava rocks contrasting with sandy areas, rugged coastal scenery

**All environments should be**: Clean, uncluttered, graphic, composed, not busy, professional

---

## Reference Images
- Approved shots: `/assets/brand/rondorff/reference/approved/`
- Graphic/pose reference: `/assets/brand/rondorff/reference/graphic/`
- Ibiza beaches: https://www.google.com/search?q=ibiza+stone+beaches

---

## Tool Versions
- **v1** (`rondorff-v1.html`): Original version, archived
- **v2** (`rondorff-v2.html`): Current working version with Generate tab

---

## Key Client Quotes

> "It is important to calm down the very dark rocks and desert parts"

> "We try to make our visuals as composed and graphic as possible"

> "The beach looks like it has been invaded by a million tourists during the day and thus looks messy"

> "We're leaning a bit too much toward a late afternoon/sunset mood. We'd like to keep — or even slightly enhance — the warmth in the tones, but with a higher, more midday-like light."

> "Pay attention to the sky — it sometimes feels a bit overcast and grey"

> "Make the two guys look suntanned and healthy!"

---

## Aspect Ratio
- Deliver in **16:9 landscape**
- Client will crop as needed (1:1, 9:16 for different uses)

---

## Prompt Learnings (Feb 14, 2026)

### What to AVOID in prompts
- **No boats/props**: Sailboats, fishing boats, or any vessels create unwanted clutter
- **No flash/artificial lighting**: Creates harsh, paparazzi-like look - always specify "natural light only"
- **No vast archipelago views**: Too expansive/distant - want intimate, closer compositions
- **No architecture for beach shots**: "Leaning against wall" poses don't fit beach environments
- **No interior elements**: Weird apartment/indoor vibes creeping in

### What WORKS
- Empty, pristine beaches with no tourists
- Intimate scale compositions (not too vast)
- Natural light with sun high (midday feel)
- Clean horizon lines
- Texture close-ups of rocks/sand
- Suntanned, healthy skin tones

### Prompt suffixes added
- `pristine untouched beach, clean sand` (for beach envs - softer than "no people")
- `natural light only, no flash, no artificial lighting` (for all prompts)

### File naming convention
- Format: `Setset_RonDorff_[envType]_[YYMMDD]_[HHMM]_[XX].png`
- Example: `Setset_RonDorff_ibiza_260214_1430_01.png`

---

## Visual Vibe Reference (Feb 14, 2026)

### The Goal
Take the **dark rocks/volcanic beach vibe** from existing assets but with **light Ibiza limestone/sandstone** instead.

### Key Visual Elements
- **Rocks in foreground** creating depth and framing (not vast landscapes)
- **Intimate scale** - model at proper campaign proportion, not tiny in distance
- **Textured rock surfaces** as prominent visual elements
- **Rocky beach setting** with sand and water visible
- **Campaign-ready swimwear editorial feel**

### What the Dark Rocks Got Right
- Tight, intimate framing with rocks creating natural frames
- Model properly scaled for swimwear campaign
- Rock textures prominent in composition
- Beach/water context without being "postcard vast"

### Ibiza Translation
- Same intimate rocky beach compositions
- Light limestone, sandstone, beige/cream/honey tones
- Still rocky and textured, just bright instead of volcanic dark
- Avoid: vast landscapes, too much sky, trees, generic "Mediterranean" feel

### Prompt Structure
Start prompts with: "Photorealistic campaign image for premium male swimwear brand"
This anchors the AI to produce campaign-appropriate imagery with proper model scale.

---

## Video Tab (Feb 16, 2026)

### Overview
New Video tab added to rondorff-v2.html for converting campaign stills to video.

### Models Available
- **Kling 2.1** - Pro ($0.224/s) or Standard ($0.084/s)
- **Seedance 2.5** - 720p (~$0.05 per video)

Can select both to generate 2 videos per image (one from each model).

### Movement Modes
Each image can have 1-2 movement modes selected. When 2 are selected, you get 2 API calls with different prompts.

| Mode | Prompt Prefix |
|------|---------------|
| **Static** | Fixed camera, static shot. |
| **Dynamic** | Slow subtle camera movement, gentle zoom in or slight dolly push, smooth cinematic motion. |
| **Handheld** | Handheld camera with natural organic movement, slight breathing shake, documentary intimate feel. |
| **90s** | Shot on vintage 8mm film camera, analog warmth, 90s VHS camcorder aesthetic, sun-drenched nostalgic grain texture. |
| **Random** | Randomly picks one of the above |

### Workflow
1. **Upload images** - Drag & drop into 12-slot grid (3x4)
2. **Select movement mode** - Global toggle at top, or per-image override
3. **Click Analyze** - Gemini analyzes each image and generates motion description
4. **Review prompts** - Full prompt shown in text box (mode prefix + motion description)
5. **Edit if needed** - Manual edits bypass the mode prefix system
6. **Select models** - Kling, Seedance, or both
7. **Generate** - Videos render in parallel

### Prompt Structure
```
[Mode Prefix]. [Motion Description from Gemini]
```

Example for 90s mode:
```
Shot on vintage 8mm film camera, analog warmth, 90s VHS camcorder aesthetic, sun-drenched nostalgic grain texture. Gentle breeze moves his hair, subtle chest movement as he breathes, warm sunlight plays across his skin.
```

### Ron Dorff Video Aesthetic
- **Minimal movement** - Subject largely still but alive
- **Premium editorial feel** - Like a high-end fashion film
- **Subtle natural motion** - Hair in breeze, fabric shifting, water ripples
- **NOT walking/jumping** - Avoid dramatic action
- **Suntanned healthy skin** - Consistent with still image direction

### Controls
- **Duration**: 3-10 seconds
- **Aspect Ratio**: 16:9, 9:16, 1:1
- **Quality** (Kling only): Pro or Standard

---

## Tool Sliders Reference (Campaign Tab)

| Slider | Range | Purpose |
|--------|-------|---------|
| **Duo %** | 0-100 | Chance of 2 models in same shot (0 = always solo) |
| **Interaction** | Low/Med/High/Random | How much model engages with environment |
| **Dynamic** | Low/Med/High/Random | Energy level of poses |
| **Copy Pose** | 0-100% | Chance to copy pose from environment image vs library |
| **Sandals** | 0-100% | Chance model wears sandals |

---

## Pricing Reference

### Image Generation (Gemini 3 Pro)
- $0.134 per 2K image
- ~$0.004 per request (input images)
- **Total: ~$0.138 per image**

### Video Generation
| Model | Quality | Price |
|-------|---------|-------|
| Kling 2.1 | Pro | $0.224/second |
| Kling 2.1 | Standard | $0.084/second |
| Seedance 2.5 | 720p | ~$0.05/video |
