# Variable Prompt System - Maximum Composition Variety

## The Problem
Current prompts feel too similar because we're only varying the subject description. To make every image feel NEW, we need to vary **6 DIMENSIONS** simultaneously:

1. **Shot Type & Framing**
2. **Camera Specs (focal length + aperture)**
3. **Lighting Setup**
4. **Background/Location**
5. **Pose/Gesture**
6. **Color Grading/Mood**

---

## The Template System

### Master Template Structure:

```
[SHOT_TYPE], [SUBJECT_DESCRIPTION], [FRAMING_AND_POSE], [BACKGROUND], [LIGHTING], [COLOR_GRADING], [GAZE], [CLOTHING], [CAMERA_SPECS], [AESTHETIC] -[NUMBER]
```

---

## Component 1: SHOT_TYPE (Rotate These)

```
[SHOT_TYPE_OPTIONS]
- Editorial studio portrait
- Editorial studio headshot
- Editorial environmental minimal
- Editorial architectural portrait
- Editorial atmospheric portrait
- Editorial motion capture
- Editorial seated portrait
- Editorial ground-level portrait
- Editorial elevated portrait
- Editorial silhouette study
```

**Rule:** Never repeat the same shot type twice in a row

---

## Component 2: CAMERA_SPECS (Vary Dramatically)

### Studios (#01-04):
```
[CAMERA_STUDIO_OPTIONS]
- 50mm f/8 (standard sharp casting)
- 85mm f/5.6 (headshot compression)
- 35mm f/11 (wider environmental feel)
- 70mm f/8 (flattering mid-range)
```

### Environmental Bright/Epic (#05-08):
```
[CAMERA_EPIC_OPTIONS]
- 35mm f/16 (maximum depth, everything sharp)
- 28mm f/16 (wider epic scale)
- 24mm f/22 (ultra-wide dramatic)
- 35mm f/11 (slightly softer epic feel)
```

### Environmental Soft/Atmospheric (#09-20):
```
[CAMERA_SOFT_OPTIONS]
- 35mm f/11 (balanced sharpness)
- 50mm f/11 (natural perspective)
- 85mm f/8 (slight compression)
- 24mm f/11 (environmental context)
- 70mm f/11 (flattering compression)
```

**Rule:** Vary focal length AND aperture for each shot

---

## Component 3: LIGHTING (Maximum Variety)

```
[LIGHTING_OPTIONS]

HARSH/DRAMATIC:
- hard directional key light from above creating defined sculptural shadows dramatic
- harsh side lighting creating deep shadows high contrast
- overhead spotlight single source creating dramatic fall-off
- hard backlight creating rim separation bold
- harsh golden hour sun creating long shadows
- bright overhead industrial lighting creating defined shadows

SOFT/DIFFUSED:
- soft natural light diffused golden glow
- overcast even light soft shadows
- soft twilight natural light even
- diffused window light gentle
- soft frontal beauty light minimal shadows
- ambient daylight soft even

DRAMATIC/SPECIAL:
- rim backlight creating edge separation glow plus soft frontal fill
- Rembrandt lighting creating defined triangle shadows sculptural
- dramatic side lighting creating cheekbone shadows sculptural
- split lighting half face shadow half light
- loop lighting subtle nose shadow flattering
- butterfly lighting centered overhead

ENVIRONMENTAL:
- bright harsh overhead sunlight creating defined shadows
- golden hour natural light warm glow
- twilight blue hour even light
- bright natural light overhead
- soft overcast light even diffused
```

**Rule:** Never use the same lighting twice in 20 shots

---

## Component 4: BACKGROUND (Super Minimal But Varied)

```
[BACKGROUND_STUDIO]
- clean white studio seamless floor to ceiling infinite background
- white studio concrete floor minimal clean
- soft [COLOR] studio backdrop gradient subtle (charcoal/gray/beige/warm beige)
- white studio backdrop seamless minimal

[BACKGROUND_INDUSTRIAL]
- concrete basin empty industrial minimal nothing
- asphalt expanse empty gray minimal nothing
- concrete channel empty minimal nothing
- white concrete slab empty minimal nothing
- concrete platform single level empty minimal nothing
- concrete wall single surface minimal empty nothing
- concrete terrace empty minimal nothing
- white warehouse space empty minimal nothing

[BACKGROUND_ARCHITECTURAL]
- white minimal roof empty nothing
- white minimal deck empty nothing
- white platform elevated empty minimal nothing
- white minimal surface empty nothing
- white landing minimal empty nothing
- white chamber minimal empty nothing
- white enclosure minimal empty nothing
- white room single window minimal empty
- white minimal structure empty geometric
- white corridor empty minimal nothing
- white passage empty minimal nothing

[BACKGROUND_NATURAL]
- empty moorland nothing minimal huge sky background 80 percent sky
- empty field nothing minimal huge sky expansive background 80 percent sky
- gravel expanse empty gray minimal nothing
- salt flats pure white nothing minimal horizon empty
- empty grassland nothing minimal huge sky background 80 percent sky
- empty clearing minimal huge sky expansive background 80 percent sky

[BACKGROUND_ATMOSPHERIC]
- white fog space empty nothing minimal
- white mist space empty nothing minimal
- white haze space empty nothing minimal
- white cloud space empty nothing minimal
- white void minimal empty nothing
- white infinite space minimal empty nothing
```

**Rule:** Vary between industrial/architectural/natural/atmospheric - don't cluster similar types

---

## Component 5: FRAMING_AND_POSE (20 Unique Variations)

```
[FRAMING_FULL_BODY_STANDING]
- full body head to toe feet visible in frame centered standing hands on hips powerful presence [FOOTWEAR]
- full body head to toe feet visible in frame centered standing one hand in pocket casual confident stance [FOOTWEAR]
- full body head to toe feet visible in frame centered standing arms at sides strong upright [FOOTWEAR]
- full body head to toe feet visible in frame centered standing arms crossed editorial attitude confident [FOOTWEAR]
- full body head to toe feet visible in frame centered standing one hand adjusting collar gesture elegant [FOOTWEAR]
- full body head to toe feet visible in frame centered standing hand on hip weight shifted asymmetrical stance [FOOTWEAR]
- full body head to toe feet visible in frame centered standing arms behind back open powerful stance [FOOTWEAR]
- full body head to toe feet visible in frame centered standing hand on hip confident final [FOOTWEAR]
- full body head to toe feet visible in frame centered standing head tilted contemplative angle [FOOTWEAR]
- full body head to toe feet visible in frame centered standing one hand touching face contemplative gesture [FOOTWEAR]

[FRAMING_FULL_BODY_ACTIVE]
- full body head to toe feet visible in frame centered walking forward purposeful stride powerful motion [FOOTWEAR]
- full body head to toe feet visible in frame centered walking away back view motion [FOOTWEAR]
- full body head to toe feet visible in frame centered three-quarter turn angled away [FOOTWEAR]
- full body head to toe feet visible in frame centered looking over shoulder turned back confident glance [FOOTWEAR]
- full body head to toe feet visible in frame centered profile turned away side view contemplative [FOOTWEAR]

[FRAMING_FULL_BODY_SEATED/LOW]
- full body head to toe feet visible in frame centered crouched down low powerful stance [FOOTWEAR]
- full body head to toe feet visible in frame centered sitting cross-legged on ground casual editorial [FOOTWEAR]
- full body head to toe feet visible in frame centered squatting low balanced stance [FOOTWEAR]
- full body head to toe feet visible in frame centered kneeling one knee down hand on knee powerful [FOOTWEAR]
- full body head to toe feet visible in frame centered lying on side propped on elbow relaxed editorial [FOOTWEAR]
- full body head to toe feet visible in frame sitting on edge legs dangling casual powerful [FOOTWEAR]
- full body head to toe feet visible in frame centered sitting on ground knees up arms wrapped around legs [FOOTWEAR]
- full body head to toe feet visible in frame centered kneeling both knees hands on thighs editorial powerful [FOOTWEAR]

[FRAMING_HEADSHOT]
- tight crop chest-up centered composition direct framing

[FOOTWEAR_OPTIONS]
- black leather boots
- white minimal sneakers
- black dress shoes
- white dress shoes
- black boots
- white sneakers
```

**Rule:** Use each pose type only ONCE across 20 shots

---

## Component 6: COLOR_GRADING (Vary Mood)

```
[COLOR_GRADING_OPTIONS]

HIGH_CONTRAST:
- bright white high-key color grading high contrast
- high contrast color grading punchy blacks crisp
- saturated white color grading high contrast clean
- high contrast architectural color grading saturated
- vibrant saturated color grading dramatic intense

SATURATED/VIBRANT:
- vibrant saturated color grading bold
- saturated [COLOR] color grading vibrant high contrast
- saturated [COLOR] tones high contrast
- high contrast color grading saturated warm tones
- high contrast color grading saturated clean whites

SOFT/ATMOSPHERIC:
- saturated cool gray tones high contrast
- saturated cool green tones high contrast
- saturated golden color grading vibrant high contrast
- saturated white mist color grading high contrast clean
- saturated cool color grading high contrast clean

[COLOR_OPTIONS for saturated tones]
- gray, gray-blue, concrete, golden, cool gray, cool green, white, cool white, white-blue, white-sand
```

**Rule:** Match color grading to lighting mood

---

## Component 7: CLOTHING (20 Unique Combinations)

### Color Wheel System:
```
[TOP_COLORS]
Neutrals: charcoal, slate, navy, black, white, cream, ivory, sand, stone
Earths: rust, terracotta, camel, ochre, amber, mustard, butter yellow
Jewel: burgundy, wine red, ruby, forest green, moss green, sage, mint green, olive, jade
Cool: powder blue, slate blue, cobalt, steel blue, ash, dove, lilac, lavender
Bold: blush, peach, coral, aubergine, pistachio, garnet, azure

[BOTTOM_COLORS]
Neutrals: black suit pants, charcoal suit pants, navy suit pants, cream suit pants, white suit pants

[FABRICS]
- cotton blazer, linen shirt, silk shirt, cotton shirt, fine cotton shirt, cotton turtleneck, fine cotton turtleneck, silk blouse, linen blazer, cotton cardigan, cotton crew neck
```

**Strategy:** Never repeat a color combination. Use complementary or analogous color pairings.

Examples:
1. burgundy cotton blazer + black suit pants
2. sage linen shirt + charcoal suit pants
3. slate silk shirt + cream suit pants
4. ochre cotton cardigan + navy suit pants

**Rule:** Create 20 unique top+bottom combinations before starting

---

## The 20-Shot Variation Strategy

### Shots 01-04: Studio (Controlled)
- 4 different shot types (portrait, headshot variations)
- 4 different lighting setups (hard key, Rembrandt, side, rim+fill)
- 4 different camera specs
- 4 different poses
- 4 different clothing colors

### Shots 05-08: Environmental Bright/Epic (f/16 sharpness)
- 4 different industrial/natural backgrounds
- 4 different harsh lighting scenarios
- All f/16 BUT vary focal length (35mm, 28mm, 24mm, 35mm again)
- 4 different active poses
- 4 different clothing colors

### Shots 09-12: Environmental Soft/Warm (f/11)
- 4 different architectural/atmospheric backgrounds
- 4 different soft/golden lighting
- Vary focal lengths at f/11
- 4 different contemplative poses
- 4 different clothing colors

### Shots 13-16: Environmental Soft/Diffused (f/11)
- 4 different natural/atmospheric backgrounds
- 4 different diffused lighting
- Vary focal lengths at f/11
- 4 different casual poses
- 4 different clothing colors

### Shots 17-20: Environmental Dramatic/Luxury (mixed)
- 4 different architectural/special backgrounds
- 4 different dramatic lighting
- Vary between f/11 and f/16
- 4 different powerful/final poses
- 4 different luxury clothing colors

---

## Pre-Production Checklist

Before writing 20 prompts, create these lists:

```
SHOT #  | SHOT TYPE              | CAMERA    | LIGHTING        | BACKGROUND           | POSE              | CLOTHING
--------|------------------------|-----------|-----------------|----------------------|-------------------|------------------
01      | Studio portrait        | 50mm f/8  | Hard key above  | White seamless       | Hands on hips     | Burgundy+Black
02      | Studio portrait        | 50mm f/8  | Rembrandt       | Concrete floor       | Hand in pocket    | Sage+Charcoal
03      | Studio headshot        | 85mm f/5.6| Side dramatic   | Gray backdrop        | Headshot          | Slate silk
04      | Studio portrait        | 50mm f/8  | Rim+fill        | White backdrop       | Adjusting collar  | Moss green+Cream
05      | Environmental epic     | 35mm f/16 | Harsh overhead  | Concrete basin       | Arms at sides     | Camel+Navy
06      | Environmental epic     | 28mm f/16 | Harsh sunlight  | Asphalt expanse      | Crouched low      | Graphite+Charcoal
07      | Environmental epic     | 35mm f/16 | Natural bright  | Concrete channel     | Arms crossed      | Cobalt+Black
08      | Environmental epic     | 35mm f/11 | Harsh light     | Concrete slab        | Sitting ground    | Amber+White
09      | Environmental soft     | 35mm f/11 | Twilight even   | Minimal roof         | Profile turned    | Ash+Cream
10      | Environmental soft     | 50mm f/11 | Golden hour     | Empty moorland       | Kneeling          | Ruby+Navy
...
```

This ensures ZERO repetition.

---

## LLM Automation Strategy

### Option 1: Structured JSON Input
```json
{
  "subject": "same East Asian man mid 20s with dark brown textured hair and light to medium skin",
  "shots": [
    {
      "number": "01",
      "shot_type": "Editorial studio portrait",
      "camera": "50mm f/8",
      "lighting": "hard directional key light from above creating defined sculptural shadows dramatic",
      "background": "clean white studio seamless floor to ceiling infinite background",
      "pose": "full body head to toe feet visible in frame centered standing hands on hips powerful presence",
      "footwear": "black leather boots",
      "color_grading": "bright white high-key color grading high contrast",
      "gaze": "direct confident gaze intense forward selling",
      "clothing": "burgundy cotton blazer black suit pants sharp tailoring clean lines",
      "quality": "natural skin texture visible pores",
      "aesthetic": "high-end fashion casting photography"
    }
  ]
}
```

### Option 2: Variable Spreadsheet
Create a CSV with columns for each variable, then use an LLM to assemble.

### Option 3: Randomizer Script
Build lists of each component, then randomly select ensuring no repeats.

---

## Key Principles

1. **No Two Shots Should Share More Than 2 Variables**
   - If same lighting → different camera + background + pose
   - If same background type → different lighting + camera + pose

2. **Cluster Variety Strategically**
   - Group similar camera specs (f/16 epic section) BUT vary everything else
   - Group similar backgrounds (industrial) BUT vary lighting dramatically

3. **Color Tells a Story**
   - Don't repeat burgundy 3 times
   - Use color wheel - move around it progressively

4. **Rhythm Matters**
   - Alternate between standing/active/seated poses
   - Don't do 5 standing shots in a row

---

## Example: Maximum Variety in 3 Shots

**Shot 01:**
- Studio portrait, 50mm f/8, hard key light above, white seamless, hands on hips standing, black boots, burgundy blazer + black pants, bright white high-key grading

**Shot 02:**
- Environmental epic, 28mm f/16, harsh golden hour sunlight, asphalt expanse gray minimal, crouched low powerful, white sneakers, sage cardigan + charcoal pants, saturated gray color grading

**Shot 03:**
- Environmental soft, 85mm f/8, soft twilight diffused, white mist space atmospheric, lying on side propped relaxed, black boots, coral silk shirt + navy pants, saturated cool color grading

**Analysis:**
- 3 different shot types ✓
- 3 different cameras (focal + aperture) ✓
- 3 different lighting setups ✓
- 3 different backgrounds ✓
- 3 different poses ✓
- 3 different clothing colors ✓
- 3 different color gradings ✓

ZERO overlap = every image feels NEW.

---

## Implementation

1. **Pre-generate the 20-shot variation table** (spreadsheet or doc)
2. **Fill in all variables** before writing any prompts
3. **Check for repetition** - no color/lighting/pose used more than once
4. **Assemble prompts** using the template

This ensures maximum variety while maintaining the editorial minimal aesthetic.
