# Editorial Fashion Prompt Building Guide

**Last Updated:** November 8, 2025
**Purpose:** Documentation of our systematic approach to building high-quality editorial fashion prompts
**Use Case:** Reference for creating consistent, structured prompts for editorial talent photography

---

## Table of Contents

1. [Prompt Architecture Overview](#prompt-architecture-overview)
2. [The 9-Component Structure](#the-9-component-structure)
3. [Detailed Component Breakdown](#detailed-component-breakdown)
4. [Variation Strategies](#variation-strategies)
5. [Current Strengths](#current-strengths)
6. [Areas for Improvement](#areas-for-improvement)
7. [Best Practices](#best-practices)
8. [Example Analysis](#example-analysis)

---

## Prompt Architecture Overview

Our prompts follow a **structured, modular architecture** with 9 distinct components arranged in a specific order. This creates consistency across all talent while allowing for controlled variation.

**Core Philosophy:**
- **Structured consistency** - Same format across all prompts
- **Modular components** - Each element serves a specific purpose
- **Controlled variation** - Systematically vary specific elements while keeping others constant
- **Subject continuity** - Use "same" or "this" to maintain character consistency across a set
- **Technical precision** - Include exact camera specs for photorealistic results

**Prompt Length:** 80-120 words per prompt (dense, detailed, technical)

---

## The 9-Component Structure

Every prompt follows this exact order:

```
1. SHOT TYPE + COMPOSITION
2. SUBJECT DESCRIPTION
3. BODY FRAMING + POSE
4. BACKGROUND/LOCATION
5. LIGHTING SETUP
6. COLOR GRADING
7. EXPRESSION/GAZE
8. CLOTHING/STYLING
9. TECHNICAL SPECS + AESTHETIC LABEL
```

**Example Template:**
```
[SHOT TYPE], [SUBJECT], [FRAMING + POSE], [BACKGROUND], [LIGHTING], [COLOR GRADING], [GAZE], [CLOTHING], [CAMERA SPECS], [AESTHETIC] -[NUMBER]
```

---

## Detailed Component Breakdown

### 1. SHOT TYPE + COMPOSITION

**Purpose:** Establish the editorial context and shooting environment

**Format Options:**
- `Editorial studio portrait` - Clean studio environment, controlled lighting
- `Editorial minimal outdoor` - Outdoor location with minimal/natural elements
- `Editorial minimal indoor` - Indoor architectural spaces, geometric/minimal

**Key Elements:**
- Always starts with "Editorial"
- Specifies environment type (studio/outdoor/indoor)
- Implies photographic approach (portrait/minimal/architectural)

**Examples:**
```
Editorial studio portrait
Editorial minimal outdoor
Editorial minimal indoor
```

---

### 2. SUBJECT DESCRIPTION

**Purpose:** Maintain character consistency across multiple prompts

**Format Pattern:**
```
same [ETHNICITY] [GENDER] [AGE] with [HAIR DESCRIPTION] and [SKIN DESCRIPTION]
```
or
```
this [GENDER] with [HAIR DESCRIPTION] and [SKIN DESCRIPTION]
```

**Key Elements:**
- **Consistency marker:** "same" or "this" to reference previous prompts
- **Ethnicity:** Specific (East Asian, not just Asian)
- **Gender:** woman/man/person
- **Age:** "mid 20s" / "early 20s" / "late 20s"
- **Hair:** Color + texture + style (platinum blonde wavy textured bob)
- **Skin:** Tone + undertones (light medium skin warm undertones)

**Examples:**
```
same East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones

this man with blonde wavy bob textured and fair complexion

same East Asian woman early 20s with long black straight hair sleek and light medium skin
```

**Best Practices:**
- First prompt in a set can use "a" or "an"
- Subsequent prompts use "same" or "this" for continuity
- Keep hair and skin descriptions consistent within a set
- Age stays constant across all prompts for one model

---

### 3. BODY FRAMING + POSE

**Purpose:** Define composition framing and subject pose/gesture

**Format Pattern:**
```
full body head to toe feet visible in frame centered [POSE/GESTURE]
```
or
```
tight crop chest-up centered composition direct framing
```

**Framing Options:**
- `full body head to toe feet visible in frame centered` - Complete figure visible
- `chest-up` - Headshot/upper body only
- `tight crop` - Close headshot

**Current Pose Patterns (NEEDS EXPANSION):**
- `standing arms at sides powerful presence`
- `walking mid-stride one foot forward`
- `standing hand in pocket casual gesture`
- `sitting cross-legged relaxed`
- `standing hand adjusting hair gesture`
- `leaning against wall arms crossed`
- `walking forward hand in pocket`
- `standing hands on hips confident`
- `sitting on ground knees up`
- `turning three-quarter view looking back`
- `standing one hand touching face`
- `crouching low both hands on knees`
- `walking looking over shoulder`
- `standing arms crossed confident`
- `sitting side profile legs extended`
- `standing hand running through hair gesture`
- `leaning forward hands on knees`
- `walking forward confident stride`
- `standing one hand adjusting collar`

**Examples:**
```
full body head to toe feet visible in frame centered standing arms at sides powerful presence

full body head to toe feet visible in frame centered walking mid-stride one foot forward

tight crop chest-up centered composition direct framing
```

---

### 4. BACKGROUND/LOCATION

**Purpose:** Set the environmental context and ensure clean editorial aesthetic

**Format Patterns:**

**Studio:**
```
clean white studio seamless floor to ceiling infinite background
white studio concrete floor minimal clean
soft [COLOR] studio backdrop gradient subtle
```

**Outdoor (Minimal + Huge Sky Formula):**
```
[LOCATION] minimal huge sky background expansive 80 percent sky
```

**Indoor (Architectural + Geometric):**
```
[STRUCTURE] minimal geometric clean
white [SPACE TYPE] minimal geometric
```

**Location Examples:**
- Outdoor: `salt lake flats minimal huge sky background expansive 80 percent sky`
- Outdoor: `rice paddies minimal huge sky expansive background 80 percent sky`
- Outdoor: `vineyard rows minimal huge sky expansive background 80 percent sky`
- Indoor: `airplane hangar door minimal white geometric`
- Indoor: `white breezeway minimal geometric corridor`
- Indoor: `minimalist barn white walls minimal huge sky background`
- Studio: `pure white seamless paper background`

**Key Pattern:**
- Outdoor locations ALWAYS include "huge sky" and "80 percent sky" for epic scale
- Indoor locations emphasize "geometric" and "minimal"
- Studio backgrounds are "seamless" or specific colors with "gradient subtle"

---

### 5. LIGHTING SETUP

**Purpose:** Define the lighting quality, direction, and mood

**Format Patterns:**

**Hard Lighting:**
```
hard directional key light from above creating defined sculptural shadows dramatic
dramatic Rembrandt lighting creating defined shadows sculptural
rim backlight creating edge separation plus soft fill
```

**Soft Lighting:**
```
soft natural light diffused all sharp focus f/11 entire scene
bright natural lighting even illumination all sharp focus f/11 entire scene no bokeh
even diffused three-point studio lighting at 5500K color temperature
```

**Dramatic Lighting:**
```
dramatic hard light from side creating deep shadows high contrast
golden hour natural light warm glow all sharp focus f/11 entire scene
bright harsh natural light creating shadows all sharp focus f/16 entire scene
```

**Key Patterns:**
- Natural lighting mentions "diffused" or "even illumination"
- Dramatic lighting specifies shadow quality ("deep shadows," "defined shadows")
- Full-scene sharpness always noted: "all sharp focus f/11 entire scene"
- Studio lighting includes color temperature: "5500K"
- Golden hour specifies "warm glow"

**Examples:**
```
hard directional key light from above creating defined sculptural shadows dramatic

soft natural light diffused all sharp focus f/11 entire scene

dramatic Rembrandt lighting creating defined shadows sculptural
```

---

### 6. COLOR GRADING

**Purpose:** Define the post-processing color treatment and contrast

**Format Patterns:**

**High Contrast:**
```
bright white high-key color grading high contrast
high contrast color grading punchy blacks crisp
high contrast color grading saturated
```

**Saturated/Vibrant:**
```
vibrant saturated color grading bold
saturated [COLOR] tones high contrast
```

**Natural/Specific Tones:**
```
saturated blue-white color grading vibrant natural high contrast
high contrast architectural color grading saturated clean whites
saturated warm earth tones high contrast
saturated cool color grading high contrast natural
```

**Examples:**
```
bright white high-key color grading high contrast

high contrast color grading saturated sunset tones

vibrant saturated color grading dramatic intense
```

**Key Elements:**
- Always mentions contrast level (high contrast)
- Specifies saturation (saturated, vibrant)
- Often includes specific color notes (sunset tones, cool grading, etc.)

---

### 7. EXPRESSION/GAZE

**Purpose:** Direct the model's expression and eye contact

**Format Pattern:**
```
direct confident gaze intense forward [SELLING QUALITY]
```

**Standard Options:**
- `direct confident gaze intense forward selling`
- `intense confident gaze engaging powerful selling`
- `confident gaze forward selling presence`
- `intense powerful gaze direct`
- `powerful confident gaze penetrating direct selling`
- `confident forward gaze selling presence powerful`
- `direct powerful gaze forward confident selling`

**Key Elements:**
- Always includes "gaze" and direction (forward/direct)
- Always includes "confident" or "powerful" or "intense"
- Often ends with "selling" or "selling presence"
- Minimal emotional descriptors (no smiling, laughing, etc.)
- Professional, editorial neutrality

**Examples:**
```
direct confident gaze intense forward selling

powerful confident gaze penetrating direct selling

confident direct gaze forward powerful selling presence
```

---

### 8. CLOTHING/STYLING

**Purpose:** Specify wardrobe that fits editorial minimal aesthetic

**Format Pattern:**
```
[COLOR] [FABRIC] [GARMENT] [COLOR] [GARMENT] [AESTHETIC REFERENCE] clean
```

**Garment Categories:**
- **Tops:** blazer, shirt, blouse, turtleneck, crew neck, cardigan
- **Bottoms:** suit pants (always)
- **Fabrics:** cotton, linen, silk, fine cotton
- **Colors:** Specific descriptive names (burgundy, charcoal, sage green, rust, etc.)

**Aesthetic References:**
- `minimal The Row aesthetic clean`
- `minimal clean lines`
- `sharp tailoring clean lines`
- `minimal`

**Examples:**
```
burgundy cotton blazer black suit pants sharp tailoring clean lines

olive green fine cotton shirt charcoal suit pants minimal The Row aesthetic clean

ivory silk blouse minimal clean lines

rust cotton turtleneck cream suit pants minimal
```

**Pattern Rules:**
- Top always described first (color + fabric + garment type)
- Pants always "suit pants" with color
- Always ends with aesthetic descriptor (minimal, clean, clean lines)
- Only one outfit per prompt (no layering complexity)

---

### 9. TECHNICAL SPECS + AESTHETIC LABEL

**Purpose:** Define camera settings and categorize the shot's editorial style

**Format Pattern:**
```
natural skin texture visible pores, [LENS] [APERTURE], [AESTHETIC LABEL] -[NUMBER]
```

**Technical Specs:**
- **Skin texture:** `natural skin texture visible pores` / `visible natural skin texture` / `sharp skin detail definition crisp`
- **Lens:** 35mm, 50mm, 85mm
- **Aperture:** f/8, f/11, f/16, f/5.6, f/2.8

**Lens Guidelines:**
- `35mm` - Wide, environmental, landscape shots with full scene sharpness
- `50mm` - Standard, studio portraits, versatile
- `85mm` - Tight headshots, chest-up compositions

**Aperture Guidelines:**
- `f/16` - Deep depth of field, everything sharp, epic landscapes
- `f/11` - Standard for full-body with environment sharp
- `f/8` - Studio portraits with background slightly soft
- `f/5.6` - Headshots with background separation
- `f/2.8` - Tight crops, background very soft

**Aesthetic Labels:**
- `high-end fashion casting photography`
- `boutique editorial casting`
- `high-fashion editorial`
- `luxury editorial photography`
- `architectural editorial casting`
- `industrial editorial casting`
- `coastal editorial epic`
- `outdoor editorial serene/dramatic/luxury/contemporary/epic`
- `architectural editorial minimal/clean/bold/luxury`

**Examples:**
```
natural skin texture visible pores, 50mm f/8, high-end fashion casting photography -01

visible natural skin texture, 85mm f/5.6, high-fashion editorial -03

crisp sharp detail entire frame complete no depth of field, 35mm f/16, outdoor editorial epic -05
```

**Full Scene Sharpness Note:**
For outdoor/landscape shots with f/11 or f/16:
```
crisp sharp detail entire frame complete no depth of field, 35mm f/16
complete landscape crisp sharp no depth of field, 35mm f/11
entire scene crisp sharp complete no bokeh, 35mm f/11
all sharp focus f/11 entire scene
```

---

## Variation Strategies

### Current 20-Prompt Variation Method

For each model, we generate **20 variations** by systematically varying specific components while keeping others constant.

**What Stays Constant (Character Consistency):**
- Subject description (same ethnicity, age, hair, skin)
- Expression/gaze style (always confident, powerful, selling)
- Clothing style (editorial minimal, The Row aesthetic)
- Technical quality (skin texture, photorealism)

**What Varies (Creates Diversity):**

#### 1. Location Variation (Studio → Outdoor → Indoor rotation)
Approximately:
- 2-4 studio portraits
- 8-10 outdoor minimal locations
- 6-8 indoor architectural spaces

**Studio Examples:**
- White seamless background
- Concrete floor
- Soft backdrop with gradient

**Outdoor Examples:**
- Salt lake flats, rice paddies, vineyard rows, sandy clearing, concrete dam, dry lakebed, bamboo grove, peach orchard
- All include "huge sky 80 percent sky"

**Indoor Examples:**
- Airplane hangar, white breezeway, minimalist barn, white covered walkway, white utility shed, white changing booth, white covered patio, white boat slip

#### 2. Lighting Variation
- Hard directional key light
- Dramatic Rembrandt lighting
- Soft natural diffused light
- Golden hour warm light
- Bright harsh natural light
- Rim backlight with fill
- Dramatic side light

#### 3. Color Grading Variation
- Bright white high-key
- High contrast punchy blacks
- Vibrant saturated bold
- Saturated sunset/golden tones
- Saturated cool/architectural tones
- Natural color grading

#### 4. Clothing Color Variation
Each prompt uses different color combinations:
- Burgundy blazer + black pants
- Olive green shirt + charcoal pants
- Ivory blouse (solo)
- Rust turtleneck + cream pants
- Sage green shirt + black pants
- Camel cardigan + charcoal pants
- Slate blue shirt + navy pants
- Terracotta turtleneck + cream pants
- Powder blue blazer + black pants
- Mustard shirt + charcoal pants
- Forest green blouse + black pants
- Coral crew neck + white pants
- Taupe shirt + navy pants
- Butter yellow blazer + charcoal pants
- Peach shirt + black pants
- Mint green turtleneck + cream pants
- Lilac blazer + black pants
- Brick red shirt + navy pants
- Lavender blouse + charcoal pants
- Sky blue cardigan + white pants

**Color Strategy:**
- 20 different color combinations
- Mix warm and cool tones
- Vary garment types (blazer, shirt, blouse, turtleneck, cardigan, crew neck)
- Maintain minimal editorial aesthetic

#### 5. Pose Variation (LIMITED - NEEDS EXPANSION)

**Current Pose Library:**
- Standing arms at sides
- Walking mid-stride
- Hand in pocket
- Sitting cross-legged
- Hand adjusting hair
- Leaning against wall arms crossed
- Walking forward hand in pocket
- Hands on hips
- Sitting on ground knees up
- Turning three-quarter looking back
- One hand touching face
- Crouching low hands on knees
- Walking looking over shoulder
- Arms crossed confident
- Sitting side profile legs extended
- Hand running through hair
- Leaning forward hands on knees
- Walking forward confident stride
- Hand adjusting collar

**Current Issues:**
- Most poses are static/standing
- Limited dynamic movement
- Repetitive gestures (hand in pocket, touching face/hair)
- Need more variety in body positions and energy levels

---

## Current Strengths

### What's Working Extremely Well:

1. **Structural Consistency**
   - Every prompt follows exact same order
   - Easy to modify specific elements
   - Predictable, reliable format
   - Scalable across many models

2. **Character Continuity**
   - "same" and "this" create consistent subjects across 20 prompts
   - Hair, skin, age remain constant
   - Builds a coherent portfolio per model

3. **Location Diversity**
   - Strong mix of studio, outdoor, indoor
   - Outdoor "huge sky" formula creates epic scale
   - Indoor architectural spaces provide geometric interest
   - 20 different environments keeps visual variety

4. **Lighting Mastery**
   - Clear technical specifications
   - Good range from hard dramatic to soft natural
   - Proper notation of sharpness across scene (f/11, f/16)
   - Lighting matches environment appropriately

5. **Color Grading Precision**
   - Always specifies contrast and saturation
   - Appropriate to lighting (golden hour = warm tones, etc.)
   - Creates visual cohesion

6. **Clothing System**
   - 20 unique color combinations
   - Maintains editorial minimal aesthetic
   - Consistent The Row reference
   - Always suit pants (editorial standard)

7. **Technical Camera Specs**
   - Appropriate lens for framing (35mm wide, 85mm tight)
   - Aperture matches depth of field intent
   - "Visible pores" ensures photorealism
   - Proper aesthetic labeling

8. **Gaze/Expression Consistency**
   - Always confident, powerful, selling
   - No emotional variation (no smiling, laughing)
   - Professional editorial neutrality
   - Matches high-fashion casting aesthetic

---

## Areas for Improvement

### 1. POSE VARIETY (PRIMARY ISSUE)

**Problem:**
All poses are very similar in energy and body position. Most are:
- Static standing positions
- Minimal movement
- Repetitive hand gestures
- Low dynamic range

**Current Pose Distribution:**
- ~60% standing poses (arms at sides, hands in pocket, hands on hips, arms crossed)
- ~20% walking poses (mid-stride, walking forward)
- ~15% sitting poses (cross-legged, on ground, side profile)
- ~5% other (crouching, leaning, turning)

**Missing Pose Types:**
- **Dynamic Movement:** Jumping, spinning, running, twisting
- **Expressive Gestures:** Arms raised, reaching, stretching
- **Unconventional Positions:** Lying down, kneeling, squatting variations
- **Interactive Poses:** Interacting with environment/props
- **Energy Variation:** High energy vs. relaxed vs. powerful
- **Asymmetrical Poses:** Weight shifts, contrapposto, diagonal lines
- **Directional Variety:** Facing away, profile, 3/4 back views

**Solution Needed:**
Expand pose library to 50+ distinct poses with:
- More movement and dynamism
- Greater energy range
- More body positions (not just standing/walking/sitting)
- More directional variety
- More gestural expressiveness within editorial context

---

## Best Practices

### DO:

1. **Maintain Exact Component Order**
   - Always use the 9-component structure in order
   - Don't skip components
   - Don't rearrange sequence

2. **Use "same" or "this" for Character Continuity**
   - First prompt can use "a" or "an"
   - All subsequent prompts use "same" or "this"
   - Keeps subject consistent across set

3. **Match Lens to Framing**
   - 35mm for full body with environment
   - 50mm for full body studio or standard portraits
   - 85mm for chest-up and tight crops

4. **Match Aperture to Depth of Field Intent**
   - f/16 or f/11 for full scene sharpness (outdoor/landscape)
   - f/8 for studio portraits
   - f/5.6 or f/2.8 for headshots with background separation

5. **Outdoor = Huge Sky Formula**
   - Always include "minimal huge sky background expansive 80 percent sky"
   - Creates epic editorial scale

6. **Indoor = Geometric + Minimal**
   - Always emphasize clean lines, geometry, minimal aesthetic
   - Reference architectural elements

7. **Always Include Skin Texture Note**
   - "natural skin texture visible pores" for photorealism
   - Prevents AI-generated plastic look

8. **Full Scene Sharpness Notation**
   - When using f/11 or f/16: "all sharp focus f/11 entire scene"
   - When no bokeh: "no depth of field" or "complete no bokeh"
   - Ensures entire frame is sharp, not just subject

9. **Color Combinations Should Vary**
   - 20 unique color pairings
   - Mix warm and cool tones
   - Vary garment types

10. **Aesthetic Labels Match Environment**
    - Studio → "high-end fashion casting"
    - Outdoor → "outdoor editorial epic/serene/dramatic"
    - Indoor → "architectural editorial minimal/clean"

### DON'T:

1. **Don't Skip the Subject Continuity Marker**
   - Never just say "East Asian woman" in prompts 2-20
   - Always use "same" or "this"

2. **Don't Mix Component Order**
   - Order matters for consistency
   - Don't put clothing before lighting, etc.

3. **Don't Use Emotional Expressions**
   - No smiling, laughing, sad, happy
   - Keep editorial neutral: confident, powerful, intense

4. **Don't Forget Full Scene Sharpness Notation**
   - Outdoor/landscape shots need explicit "all sharp f/11" notation
   - Otherwise AI may blur background inappropriately

5. **Don't Vary Core Subject Traits**
   - Hair, skin, age, ethnicity stay constant across all 20 prompts
   - Only vary pose, location, lighting, clothing, color grading

6. **Don't Use Generic Locations**
   - "outdoor" is too vague
   - Specify exact location: "salt lake flats," "rice paddies," etc.

7. **Don't Forget "Minimal" Descriptor**
   - Locations should be "minimal" to maintain editorial aesthetic
   - Prevents cluttered backgrounds

8. **Don't Mix Aesthetic References**
   - Stick to The Row, editorial minimal, luxury casting
   - Don't reference commercial, street, lifestyle aesthetics

---

## Example Analysis

Let's break down a complete prompt:

```
Editorial minimal outdoor, same East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones, full body head to toe feet visible in frame centered standing arms at sides powerful presence, salt lake flats minimal huge sky background expansive 80 percent sky, bright natural light creating definition all sharp focus f/16 entire landscape, saturated white-blue color grading vibrant natural high contrast, intense direct gaze forward powerful confident, sage green linen shirt black suit pants minimal clean, crisp sharp detail entire frame complete no depth of field, 35mm f/16, natural editorial epic -05
```

**Component Breakdown:**

1. **Shot Type:** `Editorial minimal outdoor`
   - Outdoor location, minimal aesthetic

2. **Subject:** `same East Asian woman mid 20s with honey blonde wavy bob hair textured and light medium skin warm undertones`
   - "same" for continuity
   - Specific ethnicity, age, hair detail, skin description

3. **Framing + Pose:** `full body head to toe feet visible in frame centered standing arms at sides powerful presence`
   - Full body composition
   - Standing pose with specific arm position
   - "powerful presence" energy note

4. **Background:** `salt lake flats minimal huge sky background expansive 80 percent sky`
   - Specific location (salt lake flats)
   - Minimal aesthetic
   - Huge sky formula (80 percent)

5. **Lighting:** `bright natural light creating definition all sharp focus f/16 entire landscape`
   - Natural light quality (bright)
   - Effect (creating definition)
   - Sharpness notation (all sharp f/16)

6. **Color Grading:** `saturated white-blue color grading vibrant natural high contrast`
   - Saturation level
   - Color tones (white-blue)
   - Contrast (high)
   - Natural quality

7. **Gaze:** `intense direct gaze forward powerful confident`
   - Direction (forward)
   - Intensity (intense, powerful, confident)
   - No emotion, pure editorial neutrality

8. **Clothing:** `sage green linen shirt black suit pants minimal clean`
   - Top: color + fabric + type (sage green linen shirt)
   - Bottom: color + type (black suit pants)
   - Aesthetic: minimal clean

9. **Technical + Aesthetic:** `crisp sharp detail entire frame complete no depth of field, 35mm f/16, natural editorial epic -05`
   - Sharpness confirmation (crisp sharp, complete, no depth of field)
   - Lens: 35mm (wide for landscape)
   - Aperture: f/16 (deep depth of field)
   - Label: natural editorial epic
   - Number: -05

**Why This Works:**
- Every component present and in order
- Subject continuity ("same")
- Location specific and minimal
- Huge sky formula executed
- Lighting matches outdoor natural context
- Full scene sharpness explicitly stated multiple times
- Color grading matches environment (white-blue for salt flats)
- Gaze is editorial neutral
- Clothing fits minimal aesthetic
- Lens and aperture appropriate for full-body landscape
- Aesthetic label matches (outdoor editorial epic)

**What's Missing (General Issue):**
- Pose is static ("standing arms at sides")
- Limited movement/dynamism
- This is the pattern across most prompts

---

## Summary

### Our Prompt Building System:

**Strengths:**
- Highly structured 9-component architecture
- Excellent consistency and character continuity
- Strong location, lighting, and color grading diversity
- Professional technical specifications
- Clear editorial aesthetic throughout

**Primary Area for Development:**
- **Pose diversity and dynamism** - need to expand from ~20 similar poses to 50+ varied poses with different energy levels, movements, and body positions

**Use This Guide To:**
1. Maintain consistency when creating new model prompts
2. Understand which components to vary vs. keep constant
3. Reference proper formatting and patterns
4. Identify where to inject more creativity (poses) while maintaining structure
5. Create prompts for different editorial contexts (commercial, lifestyle, etc.) by adapting specific components while keeping the 9-component structure

---

**Next Steps:**
- Develop expanded pose library (50+ poses)
- Create pose categories: Dynamic, Relaxed, Powerful, Gestural, Directional
- Test new poses while maintaining all other structural elements
- Document successful new pose patterns
