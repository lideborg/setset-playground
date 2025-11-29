# Setset Prompt Architecture

**Complete technical documentation of the modular prompt generation system**

---

## Overview

Setset uses a **modular, category-specific prompt architecture** that generates professional fashion photography prompts through GPT-4o-mini enhancement.

## 9-Component Prompt Structure

Every generated prompt contains these components:

```
1. Shot type (close-up, medium, full-body, environmental)
2. Subject description (model with exact reference image)
3. Framing (portrait, tight, medium, full-body)
4. Background (white studio, seamless, environmental)
5. Lighting (dramatic studio, soft diffused, high-key, etc.)
6. Color grading (aesthetic-specific)
7. Expression/gaze (fierce, confident, smirk)
8. Clothing/styling (category-aware outfit rules)
9. Technical specs (lens, camera settings)
```

---

## Pose Categories & System Prompts

### PDP Poses (Product + Model)

| Pose | System Prompt Builder | Key Rules |
|------|----------------------|-----------|
| Front | `buildPDPFrontSystemPrompt()` | Body facing camera, arms at sides, direct gaze |
| 45 Degree | `buildPDP45DegreeSystemPrompt()` | Three-quarter turn, one foot forward, hips angled |
| Back | `buildPDPBackSystemPrompt()` | Body facing away, head can turn toward camera |
| Half Body | `buildPDPHalfBodySystemPrompt()` | Waist-up framing |
| Portrait | `buildPDPPortraitSystemPrompt()` | Close-up, face focus |
| Detail | `buildPDPDetailSystemPrompt()` | Product only, no model |

### Lifestyle/Editorial Poses
Uses `buildLifestyleSystemPrompt()` with gender-specific pose pools.

---

## Three-Variation Structure

Every pose generates **3 distinct prompts**:

### Variation 1: RIGID E-COMMERCE
```
- Very static, minimal movement
- Arms straight down at sides
- Neutral or intense expression (NO smile)
- High-fashion catalog energy
```

### Variation 2: CASUAL CONFIDENCE
```
- More relaxed but still professional
- Slight weight shift allowed
- Confident expression (NO smile)
- Editorial energy
```

### Variation 3: SMIRK (Closed-Mouth Only)
```
- Same pose structure as V1 or V2
- CRITICAL: "subtle smirk", "slight smirk" ONLY
- NO teeth showing ever
- Warm direct gaze
```

---

## Example Generated Prompt

**Front Pose, Variation 1 (Rigid):**

```
A photorealistic full-length head-to-toe portrait shot with 50mm
lens, front view straight-on at eye level, of this exact same person
wearing the EXACT [PRODUCT] from the reference product image styled
with a crisp white fitted button-down shirt and black leather loafers,
maintaining identical facial features and bone structure. Arms straight
down at sides, shoulders squared with precision, fierce direct gaze
into camera with unwavering intensity, standing on white floor in
seamless white photo studio. Dramatic studio lighting with controlled
shadows creating depth. Complete figure visible from head to feet.
IMPORTANT: Use the exact product shown in the reference image. Keep
exact same face and identity as reference image.
```

---

## Modular Component System

### Core Modules (`/modules/core/`)

**role.ts**
```typescript
// Base role definition for GPT
"You are an expert AI prompt engineer specializing in
high-end e-commerce fashion photography..."
```

**output-format.ts**
```typescript
// Output formatting rules
// - Exactly 3 prompts
// - Each starts with "A photorealistic..."
// - No numbering or prefixes
```

**lighting.ts**
```typescript
// Lighting description templates
"Dramatic studio lighting with controlled shadows"
"Soft diffused beauty lighting"
"High-contrast fashion lighting with directional key light"
```

**safety.ts**
```typescript
// Content filter rules
CONTENT_FILTER_REPLACEMENTS = {
  underwear: 'athletic shorts',
  lingerie: 'athletic top',
  swimwear: 'athletic beachwear',
}
```

### Configuration Modules (`/modules/configuration/`)

**styling-rules.ts**
```typescript
// Determines what to style based on product category
function calculateOutfitRules(productCategory) {
  // Returns: needsTopStyling, needsBottomStyling, needsShoesStyling
}
```

**product-warnings.ts**
```typescript
// Product-specific constraints
// e.g., "NEVER another jacket underneath outerwear"
```

### Styling Modules (`/modules/styling/`)

**tops.ts** - 8 top options cycled per variation
```
1. Fitted t-shirt (black, white, grey, navy)
2. Classic button-down shirt (white, light blue, cream)
3. Relaxed crew-neck tee (black, charcoal, olive)
4. Slim-fit polo (navy, black, white)
5. Tank top or sleeveless top (black, white, nude)
6. Oversized shirt (white, beige, light grey)
7. Mock-neck top (black, navy, cream)
8. Lightweight knit top (cream, grey, camel)
```

**bottoms.ts** - 8 trouser options
```
1. Tailored black trousers
2. Wide-leg grey trousers
3. Slim-fit navy trousers
4. High-waisted cream trousers
5. Relaxed charcoal trousers
6. Straight-leg olive trousers
7. Cropped black trousers
8. Pleated tan trousers
```

**footwear.ts** - Gender-specific options
```typescript
// Female options include heels, pumps, etc.
// Male FORBIDDEN: heels, high heels, stilettos, pumps
// Male REQUIRED: sneakers, boots, loafers, oxfords
```

---

## Prompt Generation Flow

```
User Upload Product Image
         ↓
Product Analyzer (/api/analyze-product)
         ↓ Detects category (top/bottom/dress/shoes/etc)
         ↓
User Selects: Pose Type, Model Gender, Quantity
         ↓
Click "Enhance Prompts"
         ↓
/api/enhance-prompt → generator.ts
         ↓
getSystemPrompt() → Selects pose-specific builder
         ↓
System prompt builder assembles:
  1. Role definition
  2. Critical rules (HIGH-FASHION MODEL ENERGY)
  3. Outfit styling rules (per category)
  4. 3 variation templates
  5. Examples from pose pools
         ↓
Sends to GPT-4o-mini (8,000-10,000 tokens)
         ↓
GPT returns 3 distinct prompts
         ↓
parsePromptsFromResponse() extracts prompts
         ↓
Return to frontend
```

---

## Prompt Parsing Logic

```typescript
function parsePromptsFromResponse(response: string): string[] {
  // 1. Filter for lines starting with "A photorealistic..."
  // 2. Remove prefixes like "Prompt 1:", "1.", "- "
  // 3. Return exactly 3 prompts
  // 4. Fallback: split by periods, find complete sentences
  // 5. Last resort: return raw response
}
```

---

## Lens Randomization

Each prompt randomly selects from:
- 35mm lens
- 50mm lens
- 70mm lens

**Purpose**: Creates visual variety without changing pose structure.

---

## Token Optimization

| Approach | Tokens | Savings |
|----------|--------|---------|
| Monolithic (all poses in one prompt) | ~15,000 | - |
| Modular (pose-specific prompts) | ~8,000-10,000 | ~33% |

The modular approach is both faster and more cost-effective.

---

## Critical Constraints

### Forbidden Terms
```
NEVER USE:
- topless, bare-chested, shirtless, bare torso
- dresses/skirts (when bottoms required)
- heels/high heels for MALE models
- another jacket underneath outerwear
- hands in pockets (Front Pose)
- smiled/grin/teeth showing (V3 - closed mouth only)
```

### Required Elements
```
ALWAYS INCLUDE:
- White studio background (seamless white photo studio)
- Complete outfit (per category rules)
- High-fashion model energy
- "Keep exact same face and identity as reference image"
- Exact [PRODUCT] with brackets
- Model fully clothed
```

---

## Related Documentation

- [POSE_POOLS.md](../pose-libraries/POSE_POOLS.md) - All pose variations
- [STYLING_RULES.md](../styling-system/STYLING_RULES.md) - Category outfit logic
- [VIDEO_MOVEMENTS.md](../video-generation/VIDEO_MOVEMENTS.md) - Video prompts
