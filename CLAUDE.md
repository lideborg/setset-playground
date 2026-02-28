# Setset Playground

## Development Server

Always start the server on port 8000:

```bash
node server/index.js
```

Access the app at: http://localhost:8000

## Project Structure

- `/server` - Node.js backend (API proxy)
- `/tools` - Individual tool HTML pages
- `/tools/brand` - Brand-specific campaign tools (e.g., rondorff-v2.html)
- `/shared` - Shared CSS and JS libraries
- `/assets/brand` - Brand assets (products, models, environments)
  - `/assets/brand/rondorff/environments/` - Environment reference images organized by folder:
    - `black-sand-beach/` - Black sand beach environments
    - `rocky-beach/` - Rocky beach / Ibiza style environments (51 images)
    - `architecture-v1/` - Architecture environments v1
    - `architecture-v2/` - Architecture environments v2 (34 images)
  - `/assets/brand/rondorff/models/` - Model portraits and thumbnails

## Ron Dorff Campaign Tool (rondorff-v2.html)

**Environment Tabs:** Upload, Black Sand, Rocky Beach, Arch V1, Arch V2
- Grid size slider (2-6 columns) for environment browsing
- `ENV_FOLDERS` object defines images per folder
- `getEnvFolder(filename)` helper finds which folder an image belongs to

**Products Section:** Styling (default) | Ron Dorff | Upload
- Styling tab shows predefined outfit combinations
- Click to toggle outfits on/off

**Poses:** `RONDORFF_SOLO_POSES` array contains 60 poses interleaved by type for variety:
- Standing, Water/Dynamic, Walking, Seated, Leaning, Dynamic (repeating pattern)
- This ensures consecutive generations have different pose types

**Copy Pose Slider (0-100%):** Controls probability of copying pose from environment image
- 0% = Always use custom poses from `RONDORFF_SOLO_POSES`
- 100% = Always copy pose from environment reference (if available)
- 50% = Random mix of both approaches
- Decision made per-generation using `Math.random() * 100 < state.copyPosePercent`

**Sandals Slider (0-100%):** Controls probability of model wearing sandals vs barefoot
- Similar percentage-based random decision per-generation

**Duo Slider (0-100%):** Controls probability of duo shots vs solo shots

**Image Naming:** `Setset_RonDorff_Campaign_Style01_YYMMDD_HHMM_XX.png`

**Image Size:** 1280 x 1536 pixels (Ron Dorff delivery spec)

**Lightbox Features:**
- Shows input images used for generation (numbered thumbnails)
- Click thumbnail to open full-size in new tab
- Useful for debugging model/clothing mismatches

## Prompt Engineering Learnings

**Keep prompts SHORT.** Long verbose prompts cause more issues than they solve:
- Model identity gets diluted with too many instructions
- Clothing colors become inconsistent
- AI may ignore key instructions buried in long text

**Image reference numbers are critical.** When using multiple reference images:
- Explicitly reference image numbers: "EXACTLY as shown in image 1"
- Order matters: models first, then products, then environment
- The AI needs clear mapping between prompt and image order

**Clothing accuracy tips:**
- Reference exact image number for clothing
- Say "EXACT colors, no substitutions"
- Keep clothing descriptions concise

**Model consistency:**
- Strong opening: "Male model EXACTLY matching reference image 1"
- Include key physical descriptors: hair color, skin tone
- Add "suntanned Mediterranean skin" for Ron Dorff aesthetic

**What to include:**
- Style prefix (film grain, editorial)
- Framing (full body, waist up, etc.)
- Model identity with image reference
- Outfit with image reference and exact color note
- Footwear
- Location
- One line of technical requirements

**What to avoid:**
- Repeated clothing reminders
- Multiple paragraphs of rules
- Redundant quality instructions
- Long composition explanations

## Naming Conventions

**Avoid conflicts with shared JS:** The shared `models.js` exports `MODELS` (AI model configs). When defining local model arrays in tool pages, use prefixed names like `RONDORFF_MODELS`, `SETSET_MODELS` to avoid redeclaration errors.

**Product arrays:** Use `PRODUCTS` for the local product array (no conflict with shared).

**Outfits:** Use `OUTFITS` for predefined product combinations in styling tabs.

## Git Workflow

**Branch strategy:** Feature branches → PR to main → Delete branch after merge

**Use PR for:**
- New features
- Significant changes (multiple files, new functionality)
- Anything that might need reverting

**Commit directly to main for:**
- Typo fixes
- Small bug fixes (1-2 lines)
- Config tweaks
- README/docs updates

**Rule of thumb:** If it touches logic or multiple files, PR it. If it's a tiny safe fix, commit to main.

**When to prompt user:**
- After completing a feature → offer to create PR
- After small fix on main → offer to push
- Before switching to unrelated work → remind to commit/PR
- If uncommitted changes pile up → remind to commit

**PR checklist:**
1. Push current branch
2. Create PR to main with summary
3. Merge and delete branch
