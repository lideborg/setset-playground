# Setset Styling System

**Product-category-aware outfit rules and styling logic**

---

## Overview

The styling system ensures that prompts include appropriate complementary clothing based on what product the user is showcasing. It prevents contradictions (e.g., describing pants when the product IS pants) and maintains visual consistency.

---

## Product Category Matrix

| Category | Needs Top? | Needs Bottom? | Needs Shoes? |
|----------|------------|---------------|--------------|
| TOP | FALSE | TRUE | TRUE |
| BOTTOM | TRUE | FALSE | TRUE |
| OUTERWEAR | FALSE* | TRUE | TRUE |
| SHOES | TRUE | TRUE | FALSE |
| DRESS | FALSE | FALSE | TRUE |
| OUTFIT/SET | FALSE | FALSE | TRUE |
| ACCESSORY | TRUE | TRUE | TRUE |
| SWIMWEAR | FALSE | FALSE | FALSE |

*Outerwear requires simple underlayer (t-shirt, button-down) - NEVER another jacket

---

## Styling Rules by Category

### TOP (Shirts, Blouses, T-Shirts, Sweaters)

```typescript
{
  needsTopStyling: false,    // Product IS the top
  needsBottomStyling: true,
  needsShoesStyling: true,
  styledWith: "[SPECIFIC TROUSERS] and [SPECIFIC FOOTWEAR]"
}
```

**Example prompt segment:**
```
...wearing the EXACT [PRODUCT] from the reference image styled
with tailored black trousers and white minimalist sneakers...
```

### BOTTOM (Pants, Skirts, Shorts)

```typescript
{
  needsTopStyling: true,
  needsBottomStyling: false,  // Product IS the bottom
  needsShoesStyling: true,
  styledWith: "[SPECIFIC TOP] and [SPECIFIC FOOTWEAR]"
}
```

**Example prompt segment:**
```
...wearing a crisp white fitted button-down shirt with the EXACT
[PRODUCT] from the reference image and black leather loafers...
```

### OUTERWEAR (Jackets, Coats, Blazers)

```typescript
{
  needsTopStyling: false,     // Simple underlayer only
  needsBottomStyling: true,
  needsShoesStyling: true,
  underlayerRule: "simple basic top underneath (fitted t-shirt or
                  button-down shirt) - NEVER another jacket"
}
```

**CRITICAL**: Never describe another jacket/coat underneath outerwear.

**Example prompt segment:**
```
...wearing the EXACT [PRODUCT] from the reference image over a
simple fitted white t-shirt, styled with slim-fit navy trousers
and brown leather boots...
```

### SHOES (Sneakers, Heels, Boots, Loafers)

```typescript
{
  needsTopStyling: true,
  needsBottomStyling: true,
  needsShoesStyling: false,   // Product IS the shoes
  styledWith: "[SPECIFIC TOP] and [SPECIFIC TROUSERS]"
}
```

**Example prompt segment:**
```
...wearing a relaxed navy crew-neck tee and tailored grey trousers
with the EXACT [PRODUCT] from the reference image...
```

### DRESS (Dresses, Jumpsuits, Rompers)

```typescript
{
  needsTopStyling: false,     // Dress covers top
  needsBottomStyling: false,  // Dress covers bottom
  needsShoesStyling: true,
  styledWith: "[SPECIFIC FOOTWEAR ONLY]"
}
```

**Example prompt segment:**
```
...wearing the EXACT [PRODUCT] from the reference image styled
with nude pointed-toe heels...
```

### ACCESSORY (Bags, Jewelry, Belts, Hats)

```typescript
{
  needsTopStyling: true,
  needsBottomStyling: true,
  needsShoesStyling: true,
  accessoryHandling: "Model wears complete neutral outfit while
                     holding/wearing the [PRODUCT]"
}
```

---

## Outfit Libraries

### Top Selection Library (8 options)

Cycled per variation to ensure variety:

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

### Trouser Selection Library (8 options)

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

### Footwear Libraries

**Female Options:**
```
1. Nude pointed-toe heels
2. Black leather ankle boots
3. White minimalist sneakers
4. Strappy black sandals
5. Classic black pumps
6. Brown leather loafers
7. Platform sandals
8. Ballet flats (black, nude)
```

**Male Options:**
```
1. White minimalist sneakers
2. Black leather boots
3. Brown leather loafers
4. Classic oxford shoes (black, brown)
5. Suede desert boots
6. Clean white trainers
7. Black leather derby shoes
8. Brown brogues
```

**Male FORBIDDEN:**
- heels
- high heels
- nude heels
- stilettos
- pumps
- strappy sandals

---

## Cycling Logic

```typescript
function getOutfitForVariation(
  variationIndex: number,  // 0, 1, or 2
  productCategory: string,
  modelGender: string
) {
  const rules = calculateOutfitRules(productCategory);

  let outfit = {};

  if (rules.needsTopStyling) {
    // Cycle through tops: V1 gets top[0], V2 gets top[1], V3 gets top[2]
    outfit.top = TOP_LIBRARY[variationIndex % TOP_LIBRARY.length];
  }

  if (rules.needsBottomStyling) {
    outfit.bottom = TROUSER_LIBRARY[variationIndex % TROUSER_LIBRARY.length];
  }

  if (rules.needsShoesStyling) {
    const shoeLibrary = modelGender === 'male' ? MALE_SHOES : FEMALE_SHOES;
    outfit.shoes = shoeLibrary[variationIndex % shoeLibrary.length];
  }

  return outfit;
}
```

This ensures each of the 3 variations has different complementary clothing.

---

## Color Coordination Rules

### Neutral Palette Priority
Complementary items should be neutral to not distract from [PRODUCT]:

```
Primary neutrals: black, white, grey, navy, cream
Secondary neutrals: charcoal, olive, tan, camel, beige
Accent allowed: Only if [PRODUCT] is very neutral
```

### Color Conflict Avoidance

```typescript
// If product is analyzed as bright/colorful:
complementaryColors = ['black', 'white', 'grey', 'navy'];

// If product is neutral:
complementaryColors = ['black', 'white', 'cream', 'charcoal'];

// Never:
- Patterned complementary items
- Logos on complementary items
- Bright colors that compete with product
```

---

## Detail/Product-Only Rules

When pose is "Detail" (no model), different display rules apply:

### TOPS/SHIRTS
```
- Hung on white wall hook
- Suspended on minimal hanger
- Back view on hanger
- Flat lay showing construction
```

### PANTS
```
- Neatly folded overhead showing waistband
- Artfully arranged at angle displaying length
- Flat lay with texture visible
```

### DRESSES
```
- Full-length on wall hook showing silhouette
- On hanger at 3/4 angle highlighting neckline
- Back view showing details
```

### SHOES
```
- Single shoe on pedestal (3/4 view)
- Pair arranged showing multiple angles
- Overhead flat lay
- Side profile hero shot
```

### ACCESSORIES/BAGS
```
- Upright on surface (3/4 view)
- Positioned showing interior
- Overhead flat lay
- Hero shot with negative space
```

### SWIMWEAR/UNDERWEAR
```
- Flat lay ONLY (no hanging/mannequin)
- Overhead showing shape
- Angled flat lay with intentional styling
- Artful arrangement on surface
```

---

## Content Safety Rules

### Automatic Replacements

```typescript
CONTENT_FILTER_REPLACEMENTS = {
  underwear: 'athletic shorts',
  lingerie: 'athletic top',
  swimwear: 'athletic beachwear',
  bikini: 'athletic beachwear',
  panties: 'athletic bottoms',
  bra: 'athletic top',
  thong: 'athletic bottoms',
}
```

### Forbidden Descriptions

```
NEVER describe:
- Topless, bare-chested, shirtless
- Bare torso, exposed skin (beyond normal)
- Suggestive poses or expressions
- Underwear visible under clothing
```

### Required Coverage

```
ALWAYS ensure:
- Complete outfit (per category rules)
- Model fully clothed
- Professional fashion context
- Editorial-appropriate styling
```

---

## Implementation Reference

### calculateOutfitRules Function

```typescript
function calculateOutfitRules(productCategory: string) {
  const category = productCategory.toLowerCase();

  switch (category) {
    case 'top':
    case 'shirt':
    case 'blouse':
    case 'sweater':
      return {
        needsTopStyling: false,
        needsBottomStyling: true,
        needsShoesStyling: true
      };

    case 'bottom':
    case 'pants':
    case 'trousers':
    case 'skirt':
    case 'shorts':
      return {
        needsTopStyling: true,
        needsBottomStyling: false,
        needsShoesStyling: true
      };

    case 'outerwear':
    case 'jacket':
    case 'coat':
    case 'blazer':
      return {
        needsTopStyling: false,  // Simple underlayer
        needsBottomStyling: true,
        needsShoesStyling: true,
        underlayerRequired: true
      };

    case 'shoes':
    case 'footwear':
    case 'sneakers':
    case 'boots':
    case 'heels':
      return {
        needsTopStyling: true,
        needsBottomStyling: true,
        needsShoesStyling: false
      };

    case 'dress':
    case 'jumpsuit':
    case 'romper':
      return {
        needsTopStyling: false,
        needsBottomStyling: false,
        needsShoesStyling: true
      };

    default:
      // Accessory or unknown - style everything
      return {
        needsTopStyling: true,
        needsBottomStyling: true,
        needsShoesStyling: true
      };
  }
}
```

---

## Related Documentation

- [PROMPT_ARCHITECTURE.md](../prompt-architecture/PROMPT_ARCHITECTURE.md) - How styling integrates into prompts
- [POSE_POOLS.md](../pose-libraries/POSE_POOLS.md) - Pose variations
