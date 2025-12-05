# Setset Shoots - Comprehensive Documentation

**Complete technical reference for the Setset Shoots AI-powered fashion editorial platform**

---

## Overview

Setset Shoots is a production-grade fashion photography and video generation platform that uses AI to create professional editorial content. This documentation captures the complete architecture, prompt systems, and design philosophy.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js + React + TypeScript |
| Backend | Next.js API Routes + Node.js |
| Database | Supabase (PostgreSQL) |
| Auth | Clerk (JWT integration with Supabase) |
| Image Generation | FAL.ai (Flux) |
| Video Generation | Seedance (ByteDance) |
| Prompt Enhancement | OpenAI GPT-4o-mini |
| Storage | Supabase Storage (signed URLs) |

---

## Documentation Index

### Core Architecture
- [README.md](./README.md) - This overview document
- [prompt-architecture/](./prompt-architecture/) - How prompts are structured and generated
- [video-generation/](./video-generation/) - Video system and movement library
- [pose-libraries/](./pose-libraries/) - Complete pose pool documentation
- [styling-system/](./styling-system/) - Product-category styling rules

### Quick Reference

| Document | Purpose |
|----------|---------|
| [PROMPT_ARCHITECTURE.md](./prompt-architecture/PROMPT_ARCHITECTURE.md) | 9-component prompt structure, modular system |
| [VIDEO_MOVEMENTS.md](./video-generation/VIDEO_MOVEMENTS.md) | 11 video movements with prompts |
| [POSE_POOLS.md](./pose-libraries/POSE_POOLS.md) | All pose variations by category |
| [STYLING_RULES.md](./styling-system/STYLING_RULES.md) | Product-category outfit logic |

---

## Core Tools

### 1. PDP (Product Detail Page)
E-commerce product photography with AI-generated models wearing uploaded products.

**Pose Types:**
- Front Pose (rigid, casual, smirk variations)
- 45 Degree Angle (three-quarter turn)
- Back Pose
- Half Body
- Portrait/Closer
- Detail (product-only, no model)
- Lifestyle/Editorial

### 2. Video Generation
AI-generated fashion videos using Seedance model.

**Supported Movements:**
- Minimal, Spin, Half Turn
- Soft Smile, Adjust, Over Shoulder
- Slow Walk, Hair Touch
- Looking Down, Confident, Look Around, Weight Shift

### 3. Generate
General-purpose image generation using Flux.

### 4. Mood Board
Trend research and visual inspiration tool.

### 5. Edit
Image post-processing and refinement.

---

## Design Philosophy

### High-Fashion Model Energy
Every prompt emphasizes professional model presence:
```
AVOID: "standing normally", "regular pose", "casual standing"
USE: "fierce", "commanding", "magnetic", "editorial confidence"
```

### [PRODUCT] Placeholder Strategy
Uses `[PRODUCT]` as placeholder for reference image:
```
WRONG: "wearing blue jeans"
CORRECT: "wearing the EXACT [PRODUCT] from the reference image"
```

### Three-Variation Structure
Every pose generates 3 distinct outputs:
1. **V1: RIGID** - Static, professional, catalog energy
2. **V2: CASUAL** - Relaxed but professional
3. **V3: SMIRK** - Same pose with expression change

### Gender-Aware Generation
- Female poses: Fluid curves, S-curves, hip emphasis
- Male poses: Angular, grounded, hands-in-pockets energy
- Footwear rules differ by gender

---

## Credit System

| Action | Credits |
|--------|---------|
| Image Generation (Flux) | 3 credits |
| Prompt Enhancement | 1 credit |
| Video 1080p (5 sec) | 20-25 credits |
| Video 720p (5 sec) | 15-20 credits |
| Video 480p (5 sec) | 8-12 credits |

---

## File Structure Reference

```
/src/lib/pdp-prompts/
├── generator.ts              # Main orchestrator
├── constants.ts              # Editorial pose pools (30 poses)
├── system-prompts/           # Pose-specific builders
│   ├── pdp-front.ts
│   ├── pdp-45-degree.ts
│   ├── pdp-back.ts
│   └── ...
├── pose-library/             # Pose pools (8 variations each)
│   ├── pdp-front-pools.ts
│   ├── lifestyle-editorial-pools.ts
│   └── ...
└── modules/                  # Modular components
    ├── core/
    ├── configuration/
    ├── styling/
    └── poses/

/src/lib/video/
├── video-config.ts           # Models, movements, costs
├── video-generation.ts       # Generation hook
└── video-types.ts            # TypeScript interfaces
```

---

## Related Documentation

- [07_REFERENCE_FRAMEWORKS/](../07_REFERENCE_FRAMEWORKS/) - Casting, lighting, beauty guides
- [01_AESTHETICS_RESEARCH/](../01_AESTHETICS_RESEARCH/) - Brand aesthetic analysis
- [02_SYSTEM_GUIDES/](../02_SYSTEM_GUIDES/) - General prompt methodology

---

**Last Updated**: November 29, 2025
**Source**: `/Users/lidelaptop/Desktop/Work/Setset/shoots`
