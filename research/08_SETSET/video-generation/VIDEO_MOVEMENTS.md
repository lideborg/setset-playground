# Setset Video Movement Library

**Complete documentation of the 11 video movements and prompt system**

---

## Overview

Setset uses **Seedance** (ByteDance's video model via FAL.ai) for all video generation. The system supports 11 distinct movement types organized into three categories.

## Video Model Configuration

```typescript
VIDEO_MODELS = {
  seedance: {
    name: 'Seedance',
    description: 'Best overall',
    supportsDuration: true,      // 3-10 seconds
    supportsResolution: true,    // 1080p, 720p, 480p
    supportsAspectRatio: true,   // auto, 16:9, 9:16, 1:1, 3:4
    supportsFixedCamera: true,   // Static vs. dynamic camera
    minDuration: 3,
    maxDuration: 10,
    defaultDuration: 5,
  }
}
```

**Note**: No other video models (Runway, Kling, Pika) are used.

---

## Movement Categories

### Subtle/Editorial (6 movements)

#### 1. Minimal
```
Standing very still with minimal natural movement, slight breathing.
Professional fashion video, steady camera.
```
- Best for: Product showcase, catalog-style
- Camera: Static recommended

#### 2. Spin
```
Smooth 360-degree rotation to show outfit from all angles.
Professional fashion video, smooth camera work.
```
- Best for: Full outfit display, e-commerce
- Duration: 5+ seconds recommended

#### 3. Half Turn
```
Controlled 180-degree turn front to back, then stand still.
Professional fashion video.
```
- Best for: Before/after views, formal wear
- Shows: Front and back of garment

#### 4. Soft Smile
```
Looking at camera with gentle natural smile, blinking occasionally.
Professional fashion video.
```
- Best for: Warm editorial, approachable content
- Expression: Subtle, not exaggerated

#### 5. Adjust
```
Gently touching or adjusting garment (collar, sleeve, hem).
Professional fashion video.
```
- Best for: Highlighting garment details
- Shows: Fabric movement, fit

#### 6. Over Shoulder
```
Stands in place, turns body away, looks back over shoulder.
Professional fashion video.
```
- Best for: Dramatic editorial, mysterious mood
- Shows: Back details with face visible

---

### Dynamic (2 movements)

#### 7. Slow Walk
```
Takes 2-3 elegant steps toward camera with controlled pace.
Professional fashion video, shows garment movement naturally.
```
- Best for: Showing fabric drape, movement
- Camera: Can be static or slight track

#### 8. Hair Touch
```
Natural gesture with hand near face or through hair,
elegant and refined. Professional fashion video, graceful movement.
```
- Best for: Beauty/editorial crossover
- Adds: Personal, intimate feel

---

### Commercial (4 movements)

#### 9. Looking Down
```
Looks downward with slight head tilt, contemplative mood.
Professional fashion video.
```
- Best for: Artistic, thoughtful content
- Mood: Introspective, high-fashion

#### 10. Confident
```
Classic fashion pose with hands on hips, subtle movement.
Professional fashion video.
```
- Best for: Power poses, bold statements
- Energy: Strong, assertive

#### 11. Look Around
```
Looks around naturally left to right and back to camera.
Professional fashion video.
```
- Best for: Environmental awareness, lifestyle
- Shows: Natural behavior

#### 12. Weight Shift
```
Shifts body weight from one hip to other in contrapposto stance.
Professional fashion video.
```
- Best for: Editorial elegance, classical poses
- Shows: Body movement, posture

---

## Video Prompt Enhancement

### GPT-4o-mini System Prompt

```
"You are a professional fashion video prompt writer. Generate
professional video prompts for AI video generation models.

Requirements:
- Keep prompts somewhat vague to allow AI interpretation
- Always refer to 'the model' (never describe actual clothing)
- Focus on movement quality and professionalism
- Each prompt should be 1-2 sentences
- Prompts should work well for fashion/product showcase videos"
```

### Enhanced Prompt Example Output

```json
{
  "minimal": "Static pose with the model standing confidently,
             arms relaxed at sides, minimal subtle breathing motion.
             Professional studio fashion footage.",

  "spin": "Model performs smooth 360-degree rotation with graceful
          pacing, fully showcasing the outfit from all angles.
          High-end editorial fashion video.",

  "slow-walk": "Model walks slowly and elegantly toward camera
               with controlled pacing, showcasing how the garment
               drapes and moves. Premium fashion footage."
}
```

---

## Video Generation API

### Seedance Endpoint
```
fal-ai/bytedance/seedance/v1/pro/image-to-video
```

### Request Structure
```typescript
{
  videoPairs: [
    {
      image_url: string,      // Base64 or URL
      prompt: string,         // Movement prompt
      fixedCamera: boolean    // Static vs dynamic camera
    }
  ],
  resolution: '720p',         // 1080p, 720p, 480p
  duration: '5',              // 3-10 seconds
  seedCount: 1,               // 1-4 seeds per prompt
  aspectRatio: 'auto'         // auto, 16:9, 9:16, 1:1, 3:4
}
```

### Response Structure
```typescript
{
  videos: [string],           // Array of video URLs
  prompts: [string],          // Final prompts used
  seeds: [number]             // Seeds used
}
```

---

## Video Cost Calculation

### Formula
```
tokens = (width × height × fps × duration) / 1024
cost = tokens × rate × margin
credits = cost / $0.02
```

### Cost Table

| Resolution | 5 seconds | 10 seconds |
|------------|-----------|------------|
| 1080p | 20-25 credits | 40-50 credits |
| 720p | 15-20 credits | 30-40 credits |
| 480p | 8-12 credits | 16-24 credits |

**fps**: 24 (constant)
**Rate**: $2.50 per 1M tokens
**Margin**: 80% (cost is 20% of revenue)

---

## Image Compression

Before upload to Seedance:

```typescript
VIDEO_IMAGE_COMPRESSION = {
  MAX_DIMENSION: 2000,     // Longest side max
  QUALITY: 0.85            // JPEG quality
}
```

---

## Usage Recommendations

### For E-commerce
- **Spin** - Show full outfit
- **Minimal** - Clean product focus
- **Half Turn** - Front and back views

### For Editorial
- **Over Shoulder** - Dramatic mood
- **Looking Down** - Artistic feel
- **Weight Shift** - Classical elegance

### For Social Media
- **Hair Touch** - Engaging, personal
- **Slow Walk** - Dynamic content
- **Look Around** - Lifestyle feel

### For Catalog/Lookbook
- **Minimal** - Professional, clean
- **Confident** - Bold statements
- **Adjust** - Detail highlights

---

## Best Practices

### DO
- Use **fixedCamera: true** for clean e-commerce
- Match movement to product type (flowing fabrics → Slow Walk)
- Keep duration 5-6 seconds for most use cases
- Use 720p for balance of quality and cost

### DON'T
- Overuse dynamic movements for formal wear
- Use Spin for delicate/structured garments
- Exceed 8 seconds unless necessary
- Mix too many movements in one batch

---

## Related Documentation

- [PROMPT_ARCHITECTURE.md](../prompt-architecture/PROMPT_ARCHITECTURE.md) - Image prompt system
- [POSE_POOLS.md](../pose-libraries/POSE_POOLS.md) - Static pose references
