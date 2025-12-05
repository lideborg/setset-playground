# Seedance Prompting Best Practices

**Complete guide to writing effective prompts for Seedance video generation**

---

## Overview

Seedance 1.0 is ByteDance's AI video generation model that excels at creating cinematic, multi-shot videos with smooth motion. It's 40-50% faster than Runway Gen-4 Turbo while maintaining superior motion stability.

---

## Prompt Structure Formula

### Core Formula
```
Subject + Motion + Scene + Camera, Style
```

- **Subject**: Main focus, character, or object
- **Motion**: What action occurs (with intensity)
- **Scene**: Environment/location/setting
- **Camera**: Camera movement and framing
- **Style**: Visual aesthetic, mood, lighting

### Image-to-Video Structure
```
Subject + Movement, Background + Movement, Camera + Movement
```

### Text-to-Video Structure
```
Subject + Movement + Scene + Shot, Style
```

---

## Critical: Degree Adverbs

Seedance cannot infer motion intensity - you MUST specify it explicitly.

### Essential Intensity Words
- fast / quickly / rapidly
- slow / slowly / gently
- intense / intensely / dramatically
- energetically / frantically
- smoothly / gracefully
- violently / forcefully

### Examples
| Bad | Good |
|-----|------|
| "car passing by" | "car quickly passing by" |
| "man roars" | "man roars frantically" |
| "wings flap" | "wings flap dramatically" |
| "dog running" | "dog running energetically" |

---

## Camera Terminology

### Supported Camera Movements
- **Zoom**: slow zoom, rapid zoom, dolly zoom
- **Pan**: left pan, right pan, horizontal pan, smooth pan
- **Follow**: follow subject, tracking shot
- **Orbit**: 360 orbit, orbiting around, circling
- **Push/Pull**: push in, push forward, pull back, dolly shot
- **Crane**: crane up, crane down, rising shot
- **Handheld**: handheld camera, shaky handheld, smooth handheld
- **Aerial**: aerial shot, drone shot, overhead view, bird's eye view

### Framing Cues
- Wide shot / establishing shot
- Medium shot
- Close-up / tight close-up
- Portrait angle / profile angle
- Over-the-shoulder shot

### Multi-Shot Transitions
- "Cut to [new scene/angle]"
- "Camera cut to [description]"
- "Camera switching to [new view]"

**Important**: Select "Unfixed Camera" in parameters when using camera movements.

---

## Cinematic Style Language

### Cinematography Styles
- "shot on 35mm film"
- "cinematic noir lighting"
- "golden hour cinematography"
- "high-key lighting" / "low-key dramatic lighting"
- "volumetric lighting"
- "neon-lit atmosphere"

### Atmospheric Descriptors
- Moody / atmospheric / ethereal / dreamy
- Tense / dramatic / intense
- Playful / whimsical
- Dark / gloomy / foggy / misty
- Bright / vibrant / hazy

---

## What NOT to Include

### 1. Negative Prompts (DON'T WORK)
```
WRONG: "The boy can't stay still"
CORRECT: "The boy waves his hands excitedly"
```
Always state what you WANT, not what to avoid.

### 2. Contradictions with Source Image
- Don't describe a different person than in the image
- Don't specify contradicting backgrounds
- Don't change fundamental visible elements

### 3. Static Descriptions (Image-to-Video)
- Focus on motion, not unchanging elements
- Remove unnecessary static details

### 4. Vague Language
```
WRONG: "a dog running"
CORRECT: "a golden retriever running energetically through a sunny meadow"
```

### Known Limitations
- Some probability of hand/foot artifacts
- No audio generation
- Limited to 5-12 seconds
- Longer videos (10-12 sec) may show slightly less detail

---

## Example Prompts

### Portrait Video
```
A woman in a red coat walking confidently down a rain-slicked city street
at dusk, her reflection shimmering in puddles as neon signs illuminate
the background. Camera follows smoothly, 50mm lens.
```

### Product Showcase
```
A sleek smartphone rotating slowly on a white surface, catching light
from above, high-key studio lighting with soft shadows, smooth 360-degree
orbit around the device.
```

### Fashion Editorial
```
A dancer in performance attire executing a dramatic spinning move, hair
flowing dynamically, followed by a leap. Camera follows the motion with
a slight push-in as the dancer launches.
```

### Cinematic Scene
```
A lone astronaut walking across an alien desert landscape with two moons
in the sky. The astronaut's suit reflects the golden light, footsteps
kicking up dust. Camera slowly orbits around, pulling back to show the
vast landscape. Shot on 35mm film, cinematic sci-fi aesthetic.
```

---

## Technical Considerations

### Resolution Impact
| Resolution | Use Case |
|------------|----------|
| 480p | Testing/iteration |
| 720p | Social media, web content |
| 1080p | Professional, client work |

### Duration Impact
| Duration | Quality | Best For |
|----------|---------|----------|
| 5 seconds | Maximum detail | Complex animations |
| 7-8 seconds | Good detail | Establishing scenes |
| 10 seconds | Slightly less refined | Simple continuous actions |

### Cost Estimates
- 1080p @ 5 sec: ~20-25 credits
- 720p @ 5 sec: ~15-20 credits
- 480p @ 5 sec: ~8-12 credits

### Aspect Ratios
- **16:9** - Cinematic/YouTube
- **9:16** - Mobile/TikTok/Reels
- **1:1** - Instagram square
- **4:3** - Traditional framing

---

## Comparison with Other Models

### Seedance Strengths
- 40-50% faster than Runway Gen-4
- Superior motion stability
- Better multi-shot narrative coherence
- More reliable fabric/clothing physics
- Consistent lighting throughout

### When to Use Seedance
- Short cinematic clips (5-10 sec)
- Fashion/product showcase videos
- Multi-shot narratives
- Professional quality requirements

### When Others May Be Better
- **Runway**: VFX-heavy sequences, longer timelines
- **Kling**: Extended narratives (2-3 minutes)
- **Pika**: Fast, playful social content

---

## Quick Reference Checklist

Before generating:
- [ ] Clear subject defined
- [ ] Motion intensity specified (degree adverbs)
- [ ] Scene/environment described
- [ ] Camera movement specified
- [ ] No negative language
- [ ] Style descriptors added
- [ ] Prompt aligns with source image (if I2V)
- [ ] Camera parameter set correctly
- [ ] Resolution/duration chosen

---

## Fashion-Specific Movement Prompts

Based on Setset's 11 movement types:

### Subtle/Editorial
```
Minimal: "Standing very still with minimal natural movement, slight breathing"
Spin: "Smooth 360-degree rotation to show outfit from all angles"
Half Turn: "Controlled 180-degree turn front to back, then stand still"
Soft Smile: "Looking at camera with gentle natural smile, blinking occasionally"
Adjust: "Gently touching or adjusting garment collar/sleeve/hem"
Over Shoulder: "Turns body away, looks back over shoulder"
```

### Dynamic
```
Slow Walk: "Takes 2-3 elegant steps toward camera with controlled pace"
Hair Touch: "Natural gesture with hand near face or through hair"
```

### Commercial
```
Looking Down: "Looks downward with slight head tilt, contemplative"
Confident: "Classic fashion pose with hands on hips, subtle movement"
Look Around: "Looks around naturally left to right and back to camera"
Weight Shift: "Shifts body weight from one hip to other, contrapposto"
```

---

**Last Updated**: November 29, 2025
**Sources**: ByteDance Seedance Documentation, fal.ai API, Community Best Practices
