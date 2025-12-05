# Setset Pose Library

**Complete documentation of all pose pools used in prompt generation**

---

## Overview

Setset uses a **pool-based variation strategy**:
1. Define pools of 8 similar pose descriptions per variation type
2. Randomly select ONE from each pool per generation
3. GPT interprets and creates unique variations
4. Results in natural variety without explicit customization

---

## PDP Front Pose Pools

### Rigid Pool (8 variations)
High-fashion e-commerce energy, static poses

```
1. Arms straight down at sides, shoulders squared with precision,
   fierce direct gaze into camera with unwavering intensity

2. Standing tall with military-inspired posture, arms naturally
   hanging at sides with authority, powerful commanding presence
   and direct eye contact

3. Classic e-commerce stance with perfect alignment, arms at
   sides in neutral position, professional intense stare with
   sharp focus

4. Shoulders back with elegant posture, arms relaxed at sides,
   piercing editorial gaze with magnetic confidence

5. Athletic stance with grounded presence, arms loose at sides,
   strong direct eye contact with fierce determination

6. Refined posture with subtle tension, arms positioned precisely
   at sides, unwavering stare with professional intensity

7. Model stance with perfect verticality, arms naturally at
   sides, commanding gaze with editorial sharpness

8. Statuesque presence with squared shoulders, arms down with
   purpose, fierce focused eye contact
```

### Casual Pool (8 variations)
Relaxed but professional, slight movement allowed

```
1. Weight shifted subtly to one hip with natural ease, arms
   loosely at sides, confident relaxed gaze with calm intensity

2. Relaxed shoulders with comfortable stance, slight body lean,
   arms naturally positioned at sides, magnetic warm stare
   with confidence

3. Easy posture with grounded weight shift, arms hanging
   naturally, approachable yet professional gaze

4. Natural stance with subtle hip angle, arms relaxed at
   sides, confident direct look with warmth

5. Comfortable positioning with gentle weight distribution,
   arms loose and natural, engaging eye contact

6. Effortless stance with slight asymmetry, arms at rest,
   confident warm expression with direct gaze

7. Relaxed but poised posture, arms naturally positioned,
   inviting yet professional eye contact

8. Easy confidence with subtle body angle, arms relaxed,
   approachable intensity in gaze
```

### Smirk Pool (8 variations)
Closed-mouth expression variations - NO TEETH EVER

```
1. Subtle smirk playing at lips, arms at sides, warm
   direct gaze with hint of knowing confidence

2. Slight closed-mouth smile, relaxed posture, engaging
   eye contact with subtle playfulness

3. Gentle smirk with soft eyes, professional stance,
   approachable warmth in expression

4. Knowing half-smile, confident posture, direct gaze
   with subtle charm

5. Quiet smirk with relaxed demeanor, arms at sides,
   magnetic eye contact with warmth

6. Soft closed-lip smile, poised stance, friendly
   intensity in gaze

7. Subtle upturn at lips, comfortable posture, warm
   engaging eye contact

8. Gentle smirk with confidence, professional presence,
   inviting direct gaze
```

---

## PDP 45-Degree Pose Pools

### Classic Pool
Traditional three-quarter turn poses

```
1. Three-quarter turn with one foot forward, weight on back
   foot, hips angled away, shoulders rotated toward camera,
   space between arms and torso

2. Elegant 45-degree angle stance, leading foot placed
   forward, body creating diagonal line, arms away from
   body with grace

3. Classic model turn with precise angle, weight distributed
   back, torso twisted toward camera, arms positioned
   with deliberate space

4. Refined three-quarter pose, one foot advanced, hips
   turned, shoulders open to camera, arms creating
   negative space
```

### Hip-Pop Pool
Dynamic hip emphasis variations

```
1. Angled stance with pronounced hip pop, weight shifted
   dramatically, shoulders countering hip line, arms
   creating angular shapes

2. Three-quarter turn with exaggerated hip angle, front
   leg bent slightly, torso twisted with energy, arms
   away from body

3. Dynamic 45-degree pose with strong hip emphasis,
   weight back, body creating S-curve, arms positioned
   with intention

4. Editorial hip pop at angle, one hip thrust, shoulders
   rotated opposite, arms creating visual interest
```

### Crossed-Leg Pool
Sophisticated leg positioning

```
1. Three-quarter stance with legs crossed at ankle, weight
   distributed gracefully, arms away from torso, elegant
   body line

2. Angled pose with one leg crossing in front, creating
   elongated silhouette, arms positioned with space,
   refined posture

3. 45-degree turn with sophisticated leg cross, body
   creating flowing line, arms away from sides,
   editorial elegance

4. Classic crossed-leg stance at angle, weight balanced,
   torso twisted toward camera, arms creating shape
```

---

## Lifestyle/Editorial Pose Pools

### Female Editorial Pool (20 poses)

**Fluid & Confident Curves (1-5)**
```
1. Dramatic S-curve body position with one hand behind head,
   hips thrust to side, creating flowing lines with fierce
   confidence

2. Standing tall with one arm extended gracefully overhead,
   other hand on hip, weight shifted creating natural curve,
   exuding powerful feminine energy

3. Contrapposto stance with exaggerated hip angle, one arm
   akimbo, other arm relaxed, strong confident gaze

4. Elongated pose with body creating soft S-shape, arms
   positioned asymmetrically, editorial elegance

5. Dynamic weight shift with pronounced curves, hands creating
   interesting shapes, powerful feminine presence
```

**Hands in Hair & Playful (6-10)**
```
6. Both hands in hair with elbows raised, slight back arch,
   chin tilted up confidently, exuding carefree energy

7. One hand running through hair, other on hip, relaxed
   body angle, playful confident expression

8. Fingers combing through hair from underneath, head tilted,
   body in easy stance, natural glamour

9. Hair toss captured mid-motion, arms raised, body creating
   dynamic line, joyful energy

10. Hands framing face through hair, elbows out, slight hip
    pop, engaging playful gaze
```

**Dynamic & Editorial (11-15)**
```
11. Wide stride captured mid-step, arms swinging naturally
    with exaggerated movement, confident powerful walk

12. Lunging pose with dramatic leg extension, arms creating
    counterbalance, fierce editorial energy

13. Twisting motion with shoulders opposing hips, arms in
    dynamic position, captured movement

14. Jumping or floating pose with legs extended, arms
    reaching, suspended editorial moment

15. Powerful stance with wide leg position, hands on hips,
    commanding presence
```

**Elegant & Graceful (16-20)**
```
16. Ballet-inspired pose with pointed leg, arms in graceful
    position, elongated elegant line

17. One leg extended behind, arms reaching forward, body
    creating horizontal line, artistic pose

18. Soft bend at waist, one arm reaching up, other trailing
    down, creating flowing shape

19. Gentle twist with arms wrapped around body, intimate
    yet confident pose

20. Standing arabesque variation, one leg lifted behind,
    arms in classical position, refined grace
```

---

### Male Editorial Pool (20 poses)

**Grounded & Powerful (1-5)**
```
1. Wide power stance with feet planted firmly, arms crossed
   at chest showing authority, squared shoulders, commanding
   direct gaze

2. Grounded athletic stance with weight evenly distributed,
   arms at sides with purpose, minimal movement but magnetic
   presence

3. Strong stance with one foot slightly forward, arms loose
   but purposeful, confident controlled energy

4. Wide-legged position with hands clasped behind back,
   military-inspired posture, authoritative presence

5. Solid grounded pose with subtle weight shift, arms
   creating strong lines, powerful masculine energy
```

**Hands in Pockets & Effortless (6-10)**
```
6. Hands in pockets with slouchy confidence, weight on one
   leg, direct intense gaze, effortless cool

7. One hand in pocket, other at side or touching collar,
   relaxed lean, casual editorial energy

8. Both hands deep in pockets, shoulders slightly rounded,
   approachable confident stance

9. Thumb hooked in pocket, other hand relaxed, easy weight
   shift, laid-back sophistication

10. Hands casually in pockets, body angled, head tilted
    slightly, cool relaxed vibe
```

**Contemplative & Editorial (11-15)**
```
11. Hand touching chin in thoughtful pose, weight on one
    leg, introspective gaze, intellectual energy

12. Arms crossed loosely, body angled, looking slightly
    away, contemplative mood

13. One hand at collar, other in pocket, subtle body
    twist, refined thoughtfulness

14. Leaning slightly, arms relaxed, gaze directed past
    camera, artistic contemplation

15. Standing with quiet tension, arms at sides, intense
    focused expression, editorial stillness
```

**Dynamic & Confident (16-20)**
```
16. Mid-stride captured, arms in natural swing, confident
    walk energy, dynamic movement

17. Turning motion with shoulders leading, creating
    diagonal body line, captured movement

18. Athletic crouch or ready position, potential energy,
    dynamic masculine pose

19. Reaching or stretching motion, body elongated,
    captured action moment

20. Power pose with expansive arm position, taking up
    space, commanding confident energy
```

---

## Shared Pose Pools

### Sitting Poses
```
- Seated on edge of surface, legs apart, arms resting on
  thighs, relaxed confident posture

- Cross-legged sitting position, hands on knees, upright
  elegant posture

- One leg extended, other bent, casual seated pose with
  confident body angle

- Perched on surface edge, one foot on ground, dynamic
  seated position
```

### Walking Poses
```
- Mid-stride with natural arm swing, confident pace,
  captured movement

- Slow deliberate step, arms controlled, editorial walk

- Dynamic stride with exaggerated movement, fashion
  walk energy

- Casual stroll captured, relaxed natural gait
```

### Arms/Gesture Pools
```
- One hand on hip, other relaxed at side

- Both hands behind head, elbows out

- Arms crossed at chest, confident stance

- One hand touching face/chin, thoughtful gesture

- Arms stretched overhead, elongating body

- Hands clasped in front, refined posture
```

---

## Pose Selection Logic

```typescript
function selectLifestylePoses(gender: string, count: number = 3) {
  const pool = gender === 'male' ? maleEditorialPool : femaleEditorialPool;

  // Ensure variety by selecting from different categories
  const categories = ['curves', 'hair', 'dynamic', 'elegant'];
  const selected = [];

  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const categoryPoses = pool.filter(p => p.category === category);
    selected.push(randomFromArray(categoryPoses));
  }

  return selected;
}
```

---

## Best Practices

### For E-commerce
- Use Front Rigid pool for clean catalog shots
- 45-Degree Classic for dimensional views
- Avoid overly dynamic poses

### For Editorial
- Mix pools for variety
- Use Female Curves / Male Power for impact
- Include Hair Touch for personality

### For Lifestyle
- Emphasize natural movement
- Mix sitting/standing/walking
- Gender-specific pools for authenticity

---

## Related Documentation

- [PROMPT_ARCHITECTURE.md](../prompt-architecture/PROMPT_ARCHITECTURE.md) - How poses integrate into prompts
- [STYLING_RULES.md](../styling-system/STYLING_RULES.md) - Outfit pairing with poses
