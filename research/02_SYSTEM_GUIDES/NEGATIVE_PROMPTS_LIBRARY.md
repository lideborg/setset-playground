# Negative Prompts Library

**Comprehensive collection of negative prompts for AI image and video generation**

---

## Overview

Negative prompts tell AI models what to avoid in generated images. This library provides tested, effective negative prompts organized by category for fashion, editorial, and commercial photography applications.

**Important Note**: Different AI models handle negative prompts differently:
- **Midjourney**: Uses `--no` parameter (e.g., `--no blur, noise`)
- **Stable Diffusion/SDXL**: Uses negative prompt field
- **Flux**: Limited negative prompt support, focus on positive prompting
- **Seedance**: Does NOT support negative prompts - use positive descriptions only

---

## Universal Quality Negatives

### Core Quality Issues
```
blurry, blur, out of focus, soft focus, unfocused,
low quality, low resolution, low res, pixelated,
grainy, noisy, noise, film grain, jpeg artifacts,
compression artifacts, watermark, text, logo, signature
```

### Image Degradation
```
overexposed, underexposed, blown highlights, crushed blacks,
color banding, posterization, moire pattern, chromatic aberration,
lens flare, dust spots, scratches, damage
```

---

## Anatomy & Figure Negatives

### Face/Head Issues
```
deformed face, distorted face, disfigured face, ugly face,
mutated face, bad face, weird face, asymmetrical face,
extra eyes, missing eyes, crossed eyes, wall-eyed,
extra ears, missing ears, deformed ears,
extra nose, missing nose, deformed nose,
bad teeth, missing teeth, extra teeth, ugly teeth,
long neck, short neck, twisted neck
```

### Hand Issues (Critical for Fashion)
```
deformed hands, bad hands, mutated hands, extra fingers,
missing fingers, fused fingers, too many fingers,
extra hands, long fingers, short fingers, ugly hands,
malformed hands, floating hands, disconnected hands,
twisted fingers, bent fingers, extra thumbs
```

### Body Issues
```
deformed body, distorted body, disfigured body,
extra limbs, missing limbs, extra arms, missing arms,
extra legs, missing legs, floating limbs,
bad proportions, wrong proportions, unnatural proportions,
too thin, too thick, elongated body, compressed body,
twisted torso, bent spine, bad posture
```

### Feet Issues
```
deformed feet, bad feet, missing feet, extra feet,
extra toes, missing toes, fused toes, floating feet,
ugly feet, malformed feet
```

---

## Fashion & Clothing Negatives

### Garment Issues
```
wrinkled clothes, messy clothes, stained clothes,
torn clothes, damaged clothes, dirty clothes,
ill-fitting clothes, tight clothes, baggy clothes,
clipping clothes, floating clothes, disconnected clothes,
merged clothes, fused garments
```

### Styling Issues
```
mismatched outfit, clashing colors, bad color combinations,
outdated fashion, costume-like, cheap looking,
over-styled, under-styled, messy styling,
visible tags, visible labels, price tags
```

### Fabric Issues
```
shiny polyester, cheap fabric, plastic-looking fabric,
unrealistic fabric, floating fabric, stiff fabric,
transparent where shouldn't be, wrong texture
```

---

## Skin & Beauty Negatives

### Skin Quality
```
bad skin, ugly skin, blemishes, acne, pimples,
skin lesions, skin disease, rashes, scars,
overly smooth skin, plastic skin, waxy skin,
shiny skin, greasy skin, sweaty (unless intended),
uneven skin tone, blotchy skin
```

### Makeup Issues
```
bad makeup, smeared makeup, clown makeup,
too much makeup, cakey makeup, heavy makeup,
uneven makeup, messy lipstick, raccoon eyes
```

### Hair Issues
```
bad hair, messy hair (unless intended), tangled hair,
greasy hair, wet hair (unless intended), bald spots,
weird hairline, floating hair, disconnected hair,
unnatural hair color, patchy hair color
```

---

## Lighting & Exposure Negatives

### Lighting Problems
```
harsh shadows, unflattering shadows, under-eye shadows,
flat lighting, boring lighting, amateur lighting,
mixed color temperature, green cast, magenta cast,
fluorescent lighting look, flash photography look,
multiple light sources conflicting
```

### Exposure Issues
```
overexposed, underexposed, blown out, too dark,
high contrast (unless intended), low contrast,
washed out colors, muddy colors, dull colors
```

---

## Composition & Framing Negatives

### Cropping Issues
```
bad cropping, awkward cropping, cut off limbs,
cut off head, cut off hands, cut off feet,
cropped at joints, centered composition (if unwanted),
too much headroom, no headroom
```

### Framing Problems
```
cluttered background, distracting background,
busy background, messy background,
tilted horizon, dutch angle (unless intended),
poor composition, amateur composition
```

---

## Environment & Background Negatives

### Studio Issues
```
visible studio equipment, visible lights, visible reflectors,
wrinkled backdrop, dirty backdrop, seams visible,
uneven backdrop, backdrop shadows
```

### Outdoor Issues
```
distracting elements, people in background,
cars in background, modern elements in period shoot,
anachronistic elements, power lines, trash,
construction, crowds
```

---

## Rendering & Style Negatives

### AI Artifacts
```
ai generated look, artificial look, synthetic look,
plastic look, cgi look, 3d render look,
video game graphics, cartoon, anime (unless intended),
illustration, painting (unless intended), drawing
```

### Realism Issues
```
unrealistic, unnatural, fake looking,
photoshopped look, over-edited, over-processed,
HDR look, instagram filter look, oversaturated,
desaturated, black and white (unless intended)
```

---

## Fashion Photography Specific

### Editorial Issues
```
stock photo look, corporate look, generic look,
boring pose, stiff pose, unnatural pose,
awkward pose, amateur model, bad modeling,
catalogue look (unless intended)
```

### Commercial Issues
```
lifestyle stock, generic commercial,
dated photography style, 90s photography look,
cheap production value, low budget look
```

---

## Video Generation Negatives

### Motion Issues
```
jittery motion, shaky camera (unless intended),
stuttering, frame drops, motion blur (unless intended),
unnatural movement, robotic movement, floating,
glitching, artifacts, morphing
```

### Temporal Consistency
```
flickering, inconsistent lighting between frames,
changing face, changing clothes, changing colors,
disappearing elements, appearing elements
```

---

## Pre-Built Negative Prompt Sets

### Fashion Editorial (Full)
```
blurry, low quality, low resolution, grainy, noisy, watermark, text, logo,
deformed face, distorted face, ugly face, bad face,
deformed hands, bad hands, extra fingers, missing fingers, mutated hands,
deformed body, extra limbs, missing limbs, bad proportions,
wrinkled clothes, ill-fitting clothes, cheap fabric,
bad skin, blemishes, plastic skin, bad makeup,
harsh shadows, flat lighting, amateur lighting,
bad cropping, cluttered background,
ai generated look, artificial look, synthetic look, stock photo look
```

### Beauty/Close-up (Full)
```
blurry, soft focus, low quality, noisy, grainy,
deformed face, asymmetrical face, bad face, ugly face,
bad skin, blemishes, acne, uneven skin, plastic skin, waxy skin,
bad makeup, smeared makeup, cakey makeup, too much makeup,
bad teeth, yellow teeth, missing teeth,
deformed nose, deformed ears, deformed eyes,
harsh shadows, unflattering lighting, flat lighting,
bad cropping, awkward angle,
ai look, artificial, over-edited, over-processed
```

### Full Body Fashion (Full)
```
blurry, low quality, pixelated, noisy, watermark,
deformed body, bad proportions, extra limbs, missing limbs,
deformed hands, extra fingers, missing fingers, bad hands,
deformed feet, missing feet, extra toes,
deformed face, ugly face, distorted face,
wrinkled clothes, ill-fitting clothes, cheap looking clothes,
bad skin, blemishes, plastic looking,
harsh lighting, amateur lighting, flat lighting,
bad cropping, cut off limbs, awkward framing,
cluttered background, distracting background,
stock photo, amateur model, stiff pose,
ai generated, synthetic, artificial
```

### Product/Still Life
```
blurry, low quality, noisy, pixelated,
bad lighting, harsh shadows, flat lighting,
cluttered, messy, dirty, dusty,
reflections (unwanted), fingerprints, smudges,
cheap looking, plastic looking, fake looking,
bad cropping, awkward composition,
busy background, distracting elements,
watermark, text, logo
```

### Video/Seedance Alternative (Use Positive)
Instead of negatives, use positive reinforcement:
```
✓ "smooth motion, stable camera"
✓ "consistent lighting throughout"
✓ "natural fluid movement"
✓ "high quality, sharp detail"
✓ "professional cinematography"
```

---

## Weight/Emphasis Syntax

### Stable Diffusion/SDXL
```
(negative term:1.5)  - Stronger emphasis
((negative term))    - Doubled weight
[negative term]      - Reduced weight
```

### Midjourney
```
--no term1, term2, term3  - All equal weight
```

### ComfyUI
```
(negative:1.4)  - Custom weight
```

---

## Tips for Effective Negative Prompts

1. **Be Specific**: "deformed hands" is better than just "bad"

2. **Prioritize**: Put most important negatives first

3. **Don't Overdo It**: Too many negatives can confuse the model

4. **Test and Iterate**: Different models respond differently

5. **Match to Positive**: Your negatives should address potential issues in your positive prompt

6. **Update for Model**: Each model version may need different negatives

7. **Consider Context**: Fashion needs more hand/clothing negatives; portraits need more face negatives

---

## Model-Specific Recommendations

### SDXL
- Works well with detailed negative prompts
- Supports emphasis syntax
- Good with specific anatomical negatives

### Midjourney v6
- Simpler negatives work better
- Use `--no` parameter
- Focus on style/quality rather than anatomy

### Flux
- Minimal negative prompt support
- Focus on strong positive prompting
- Quality more dependent on positive description

### Seedance/Video
- No negative prompt support
- Only use positive descriptions
- State what you want, not what to avoid

---

**Last Updated**: November 29, 2025
**Compatibility**: Stable Diffusion, SDXL, Midjourney, ComfyUI
**Note**: Seedance does not support negative prompts
