// Video Movement Types for Seedance Image-to-Video
// Each movement has a description used for AI prompt enhancement

const VIDEO_MOVEMENTS = [
    // SUBTLE / EDITORIAL
    {
        id: 'minimal',
        name: 'Minimal',
        category: 'subtle',
        description: 'Almost completely frozen with one slow blink',
        fallbackPrompt: 'The model holds perfectly still like a living photograph. One single slow blink. Slight natural breathing visible in the chest. No other movement whatsoever. The stillness is elegant and intentional.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Minimal.mp4'
    },
    {
        id: 'spin',
        name: 'Spin',
        category: 'subtle',
        description: 'One slow, controlled 360-degree rotation',
        fallbackPrompt: 'The model performs one slow, elegant 360-degree turn on the spot. The rotation is smooth and controlled, taking the full duration. Arms stay relaxed at sides. Face remains neutral throughout. No extra movements.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_360.mp4'
    },
    {
        id: 'half-turn',
        name: 'Half Turn',
        category: 'subtle',
        description: 'One slow 180-degree turn, then freezes',
        fallbackPrompt: 'The model slowly rotates 180 degrees, turning from front-facing to showing their back. The turn is gradual and elegant. Once complete, they freeze in place. Single continuous movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HalfTurn.mp4'
    },
    {
        id: 'soft-smile',
        name: 'Soft Smile',
        category: 'subtle',
        description: 'A gentle smile slowly spreads across the face',
        fallbackPrompt: 'The model starts with a neutral expression. Slowly, a warm genuine smile spreads across their face - corners of mouth lifting, slight crinkle at the eyes. The smile builds gradually over several seconds. Body stays still.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Smile.mp4'
    },
    {
        id: 'adjust',
        name: 'Adjust',
        category: 'subtle',
        description: 'One small, slow touch to collar or sleeve',
        fallbackPrompt: 'The model makes one deliberate gesture - slowly reaching up to adjust their collar, or gently touching their sleeve. The hand moves smoothly, makes the adjustment, then returns to rest. Everything else stays still.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Adjust.mp4'
    },
    {
        id: 'over-shoulder',
        name: 'Over Shoulder',
        category: 'subtle',
        description: 'Head turns slowly to glance over one shoulder',
        fallbackPrompt: 'The model slowly turns their head to look over one shoulder. The movement is gradual and deliberate - just the head rotating while the body remains facing forward. A mysterious, editorial glance.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_OverShoulder.mp4'
    },
    {
        id: 'chin-tilt',
        name: 'Chin Tilt',
        category: 'subtle',
        description: 'Chin lifts slowly upward a few degrees',
        fallbackPrompt: 'The model slowly lifts their chin upward by a few degrees. A subtle, confident gesture. The movement is very gradual. Eyes may follow slightly upward. Rest of the body stays completely frozen.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ChinTilt.mp4'
    },
    {
        id: 'gaze-shift',
        name: 'Gaze Shift',
        category: 'subtle',
        description: 'Eyes slowly shift to look directly at camera',
        fallbackPrompt: 'The model\'s eyes slowly shift to make direct eye contact with the camera. Only the eyes move - the head stays completely still. The gaze movement is deliberate and slow, creating an intimate connection.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_GazeShift.mp4'
    },
    {
        id: 'shoulder-drop',
        name: 'Shoulder Drop',
        category: 'subtle',
        description: 'One shoulder relaxes and drops slightly',
        fallbackPrompt: 'One shoulder slowly relaxes and drops by a small amount. A subtle shift in posture that looks natural and effortless. The rest of the body stays still. Very minimal, elegant movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ShoulderDrop.mp4'
    },
    {
        id: 'posture-settle',
        name: 'Posture Settle',
        category: 'subtle',
        description: 'Body settles into a more relaxed stance',
        fallbackPrompt: 'The model\'s posture subtly shifts as they settle into their stance. A small release of tension - shoulders may lower slightly, weight redistributes. Very natural and minimal. Then they hold completely still.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PostureSettle.mp4'
    },
    {
        id: 'hand-drift',
        name: 'Hand Drift',
        category: 'subtle',
        description: 'Fingers slowly curl or uncurl',
        fallbackPrompt: 'Only the fingers move - slowly curling inward or uncurling open. A subtle, barely perceptible movement in the hands. The rest of the body is frozen still. Almost like a reflex.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HandDrift.mp4'
    },
    {
        id: 'sway',
        name: 'Sway',
        category: 'subtle',
        description: 'Very gentle side-to-side sway of the whole body',
        fallbackPrompt: 'The model sways very gently from side to side. An almost imperceptible rocking motion, like being moved by a gentle breeze. The movement is continuous but extremely subtle throughout.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Sway.mp4'
    },
    {
        id: 'wind-kiss',
        name: 'Wind Kiss',
        category: 'subtle',
        description: 'Fabric flows in breeze while body stays frozen',
        fallbackPrompt: 'A gentle breeze causes the clothing fabric to flow and move naturally. Hair may lift slightly. The model remains completely frozen like a statue - only the fabric and hair respond to the wind. Body and face motionless.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_WindKiss.mp4'
    },
    {
        id: 'pocket-touch',
        name: 'Pocket Touch',
        category: 'subtle',
        description: 'Hands slide slowly into pockets',
        fallbackPrompt: 'The model slowly slides their hands into their pockets. A casual, relaxed gesture performed deliberately. Once hands are in pockets, they hold the pose frozen. Single smooth movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PocketTouch.mp4'
    },

    // DYNAMIC
    {
        id: 'slow-walk',
        name: 'Slow Walk',
        category: 'dynamic',
        description: 'One or two slow, deliberate steps forward',
        fallbackPrompt: 'The model takes one or two slow, deliberate steps forward. Each step is controlled and elegant, like a fashion runway in slow motion. Posture remains perfect throughout.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Walking.mp4'
    },
    {
        id: 'hair-touch',
        name: 'Hair Touch',
        category: 'dynamic',
        description: 'One slow touch to hair',
        fallbackPrompt: 'The model slowly raises one hand to touch or adjust their hair. A single elegant gesture - fingers running through hair or tucking it behind an ear. Then the hand returns to rest.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HairTouch.mp4'
    },

    // COMMERCIAL
    {
        id: 'looking-down',
        name: 'Looking Down',
        category: 'commercial',
        description: 'Gaze lowers slowly, head tilts down',
        fallbackPrompt: 'The model slowly lowers their gaze, head tilting down slightly. A contemplative, thoughtful movement. The eyes lead, then the head follows gently. Then they hold the downward gaze.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookingDown.mp4'
    },
    {
        id: 'confident',
        name: 'Confident',
        category: 'commercial',
        description: 'Hands move to hips in confident pose',
        fallbackPrompt: 'The model places their hands on their hips in one smooth movement. A confident, powerful stance. Once in position, they hold the pose frozen. The gesture is deliberate and assured.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Confident.mp4'
    },
    {
        id: 'look-around',
        name: 'Look Around',
        category: 'commercial',
        description: 'Head turns slowly to look right, then left',
        fallbackPrompt: 'The model slowly turns their head to look to the right, pauses briefly, then turns to look to the left. Finally returns to center. Each turn is slow and deliberate. Body stays still.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookAround.mp4'
    },
    {
        id: 'weight-shift',
        name: 'Weight Shift',
        category: 'commercial',
        description: 'Weight shifts to one hip',
        fallbackPrompt: 'The model shifts their weight to one hip, creating a subtle S-curve in the body. A relaxed, natural stance change. The shift is gradual and smooth. Then they hold the new position.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_WeightShift.mp4'
    },

    // ═══════════════════════════════════════════════════════════════
    // MOVEMENT GROUPS - Each image gets a random movement from the pool
    // ═══════════════════════════════════════════════════════════════

    {
        id: 'group-editorial-subtle',
        name: 'Editorial Subtle',
        category: 'group',
        isGroup: true,
        description: 'Random subtle movements - blinks, tiny smiles, small head turns',
        // Pool of micro-movements for this group
        // validFor: 'face' = needs visible face, 'body' = needs visible body, 'product' = works for products, 'any' = universal
        movements: [
            {
                name: 'Slow Blink',
                validFor: ['face'],
                description: 'One slow, deliberate blink',
                prompt: 'The subject holds still, then performs one slow, deliberate blink. Eyes close gently and reopen. A single elegant blink taking about 2 seconds. Everything else frozen.'
            },
            {
                name: 'Subtle Smile',
                validFor: ['face'],
                description: 'Hint of a smile at the corners of mouth',
                prompt: 'A subtle smile slowly forms - just the corners of the mouth lifting slightly. Not a full smile, just the beginning of one. Eyes stay relaxed. Body frozen.'
            },
            {
                name: 'Head Tilt',
                validFor: ['face', 'body'],
                description: 'Head tilts slightly to one side',
                prompt: 'The subject tilts their head slightly to one side - a small, curious gesture. Just a few degrees. The movement is slow and gentle. Body stays still.'
            },
            {
                name: 'Eyes Down Then Up',
                validFor: ['face'],
                description: 'Gaze drops then rises to camera',
                prompt: 'The subject\'s eyes slowly look down, pause briefly, then rise back up to meet the camera. Head stays still. A thoughtful, engaging movement.'
            },
            {
                name: 'Micro Nod',
                validFor: ['face', 'body'],
                description: 'Barely perceptible small nod',
                prompt: 'The subject gives one tiny, almost imperceptible nod. Head dips just slightly then returns. So subtle it\'s almost subliminal. Everything else frozen.'
            },
            {
                name: 'Eyebrow Raise',
                validFor: ['face'],
                description: 'One eyebrow lifts slightly',
                prompt: 'One eyebrow slowly raises just slightly - a subtle, intrigued expression. The movement is minimal but noticeable. Face otherwise still.'
            },
            {
                name: 'Soft Exhale',
                validFor: ['face', 'body'],
                description: 'Visible relaxed breath out',
                prompt: 'The subject takes a soft, visible exhale - shoulders drop slightly, chest falls gently. A moment of relaxation. Then holds still.'
            },
            {
                name: 'Look Away Look Back',
                validFor: ['face'],
                description: 'Eyes glance away briefly then return',
                prompt: 'Eyes slowly glance to the side, pause for a moment, then return to look at camera. Head stays still. A brief, contemplative look away.'
            },
            {
                name: 'Gentle Sway',
                validFor: ['body', 'product'],
                description: 'Very subtle swaying motion',
                prompt: 'The subject sways almost imperceptibly from side to side. A gentle, hypnotic motion like being moved by a soft breeze. Extremely subtle throughout.'
            },
            {
                name: 'Fabric Drift',
                validFor: ['body', 'product'],
                description: 'Fabric moves slightly as if in gentle breeze',
                prompt: 'A gentle breeze causes the fabric to shift and flow slightly. The material lifts and settles naturally. Any figure remains still - only the fabric responds to the air.'
            },
            {
                name: 'Light Shift',
                validFor: ['product', 'body', 'face'],
                description: 'Lighting subtly shifts across the subject',
                prompt: 'The lighting slowly shifts, creating subtle changes in highlights and shadows across the subject. The subject remains completely still. A cinematic lighting transition.'
            },
            {
                name: 'Slow Rotate',
                validFor: ['product'],
                description: 'Product slowly rotates to show angles',
                prompt: 'The product slowly rotates, revealing different angles and details. A smooth, controlled rotation showcasing the craftsmanship. Elegant product presentation.'
            }
        ]
    },
    {
        id: 'group-gentle-motion',
        name: 'Gentle Motion',
        category: 'group',
        isGroup: true,
        description: 'Subtle active movements - hair touches, shoulder shifts, small gestures between minimal and active',
        movements: [
            {
                name: 'Hair Touch Light',
                validFor: ['face', 'body'],
                description: 'Hand reaches up to lightly touch or adjust hair',
                prompt: 'The subject slowly raises one hand to lightly touch their hair - a gentle, natural gesture. Fingers briefly graze through strands then hand returns to rest. Subtle and elegant.'
            },
            {
                name: 'Shoulder Roll',
                validFor: ['body'],
                description: 'Shoulders roll back gently',
                prompt: 'The subject rolls their shoulders back gently - a small, relaxed movement like releasing tension. Natural and easy. The whole upper body moves together softly.'
            },
            {
                name: 'Neck Roll Soft',
                validFor: ['face', 'body'],
                description: 'Head tilts and rolls very slightly',
                prompt: 'The subject\'s head tilts slightly to one side, then gently rolls back to center. A soft, relaxed neck movement. Very controlled and minimal. Eyes stay forward.'
            },
            {
                name: 'Arm Cross Adjust',
                validFor: ['body'],
                description: 'Adjusts crossed arms or arm position naturally',
                prompt: 'The subject adjusts their arms naturally - perhaps crossing them differently, or one hand finding a pocket. A relaxed, casual repositioning like settling into a comfortable stance.'
            },
            {
                name: 'Chin Hand Graze',
                validFor: ['face'],
                description: 'Hand moves up to briefly touch chin or jaw',
                prompt: 'The subject slowly raises a hand toward their face, fingers briefly grazing along the chin or jawline. A thoughtful, contemplative gesture. Hand then lowers gently.'
            },
            {
                name: 'Gentle Sway',
                validFor: ['body'],
                description: 'Very slight side-to-side sway',
                prompt: 'The subject sways very gently from side to side, like standing in a light breeze. A barely perceptible movement - natural and relaxed. The whole body moves together as one.'
            },
            {
                name: 'Hand to Hip',
                validFor: ['body'],
                description: 'Hand moves naturally to rest on hip',
                prompt: 'The subject casually moves one hand to rest on their hip. A relaxed, confident gesture. The movement is smooth and natural, like finding a comfortable pose.'
            },
            {
                name: 'Look and Return',
                validFor: ['face'],
                description: 'Head turns slightly away then returns',
                prompt: 'The subject\'s head turns slightly to one side - just a few degrees - pauses briefly, then returns to face the camera. A small, curious movement. Subtle and engaging.'
            },
            {
                name: 'Chest Rise',
                validFor: ['body', 'face'],
                description: 'Visible deep breath, chest rises and falls',
                prompt: 'The subject takes a slow, visible breath - chest rises gently, holds for a moment, then falls with a soft exhale. Shoulders may lift slightly. A living, breathing moment.'
            },
            {
                name: 'Stand Taller',
                validFor: ['body'],
                description: 'Straightens up confidently',
                prompt: 'The subject stands a little taller - shoulders drawing back, chin lifting slightly. A confident, natural adjustment. Like taking a moment to compose themselves.'
            },
            {
                name: 'Weight Shift Feet',
                validFor: ['legs', 'body'],
                description: 'Weight shifts from one foot to the other',
                prompt: 'The subject shifts their weight from one foot to the other. A subtle redistribution - one leg relaxes as the other takes more weight. A natural, casual stance adjustment. Smooth and minimal.'
            },
            {
                name: 'Foot Reposition',
                validFor: ['legs'],
                description: 'One foot adjusts position slightly',
                prompt: 'One foot slowly repositions - sliding slightly to the side or adjusting its angle. A small, natural adjustment to stance. The other foot stays planted. Subtle movement.'
            },
            {
                name: 'Slow Turn Start',
                validFor: ['legs', 'body'],
                description: 'Begins a slow rotation, legs turning',
                prompt: 'The subject begins a slow turn - feet pivot slightly, legs rotate. The start of a graceful rotation. Movement is gradual and controlled. Shows the beginning of turning around.'
            },
            {
                name: 'Step Shift',
                validFor: ['legs'],
                description: 'Takes a tiny half-step to adjust position',
                prompt: 'The subject takes a tiny half-step - one foot lifts barely off the ground and repositions. A minimal stance adjustment. Very subtle, almost like settling into position.'
            },
            {
                name: 'Relaxed Stance Shift',
                validFor: ['legs', 'body'],
                description: 'Shifts into a more relaxed standing pose',
                prompt: 'The subject shifts into a slightly more relaxed stance - weight settling to one side, posture easing naturally. Like exhaling and getting comfortable. Smooth and casual.'
            },
            {
                name: 'Heel Lift',
                validFor: ['legs'],
                description: 'One heel lifts slightly off the ground',
                prompt: 'One heel lifts slightly off the ground while toes stay planted. A subtle shift like about to take a step, but then settles back down. Minimal anticipatory movement.'
            },
            {
                name: 'Stance Widen',
                validFor: ['legs', 'body'],
                description: 'Feet shift slightly wider apart',
                prompt: 'The feet slowly shift to a slightly wider stance. A subtle opening of the position - more grounded and confident. The movement is gradual and controlled.'
            },
            {
                name: 'Walk Exit Hint',
                validFor: ['legs'],
                description: 'Subtle movement suggesting about to walk away',
                prompt: 'The subject begins the very start of walking motion - weight shifts forward, one foot prepares to lift. The hint of walking away. Movement is just beginning, not completing.'
            }
        ]
    },
    {
        id: 'group-editorial-active',
        name: 'Editorial Active',
        category: 'group',
        isGroup: true,
        description: 'Controlled movements - adjust clothing, shift weight, turn head',
        movements: [
            {
                name: 'Collar Touch',
                validFor: ['body'],
                description: 'Hand reaches up to touch collar',
                prompt: 'The subject slowly reaches up with one hand to touch or adjust their collar. A single deliberate gesture. Hand then returns to rest. Minimal and controlled.'
            },
            {
                name: 'Sleeve Adjust',
                validFor: ['body'],
                description: 'Hand adjusts sleeve cuff',
                prompt: 'The subject uses one hand to slowly adjust the cuff of their sleeve. A casual, natural gesture. Single adjustment then hands return to position.'
            },
            {
                name: 'Weight Shift Hip',
                validFor: ['body'],
                description: 'Weight shifts to opposite hip',
                prompt: 'The subject shifts their weight from one hip to the other. A subtle change in stance that looks natural and relaxed. Movement is gradual.'
            },
            {
                name: 'Turn Head Right',
                validFor: ['face', 'body'],
                description: 'Head slowly turns to the right',
                prompt: 'The subject slowly turns their head to look to the right. The turn is gradual and elegant. They hold the profile view briefly.'
            },
            {
                name: 'Turn Head Left',
                validFor: ['face', 'body'],
                description: 'Head slowly turns to the left',
                prompt: 'The subject slowly turns their head to look to the left. Gradual, controlled movement. Body stays facing forward.'
            },
            {
                name: 'Chin Down Then Up',
                validFor: ['face', 'body'],
                description: 'Chin drops then lifts confidently',
                prompt: 'The subject\'s chin slowly drops, then rises up past neutral into a confident tilt. A thoughtful to assured transition.'
            },
            {
                name: 'Shoulder Roll',
                validFor: ['body'],
                description: 'One shoulder rolls back slowly',
                prompt: 'One shoulder slowly rolls backward in a relaxed motion. A subtle adjustment that looks natural. Everything else stays relatively still.'
            },
            {
                name: 'Stance Adjust',
                validFor: ['body'],
                description: 'Feet shift to new position',
                prompt: 'The subject subtly adjusts their stance, one foot shifting position slightly. A natural settling into a new pose. Upper body stays relatively still.'
            },
            {
                name: 'Product Tilt',
                validFor: ['product'],
                description: 'Product tilts to catch light',
                prompt: 'The product tilts slowly to one side, catching the light at different angles. A subtle movement that highlights texture and finish. Elegant and controlled.'
            },
            {
                name: 'Fabric Flow',
                validFor: ['body', 'product'],
                description: 'Fabric billows gently',
                prompt: 'A gentle wind causes the fabric to billow and flow dramatically. The material lifts and moves with clear visible motion. Any figure stays still.'
            }
        ]
    },
    {
        id: 'group-portrait-focus',
        name: 'Portrait Focus',
        category: 'group',
        isGroup: true,
        description: 'Head and face movements only - perfect for close-up shots',
        movements: [
            {
                name: 'Slow Turn Left',
                validFor: ['face'],
                description: 'Head slowly turns left showing profile',
                prompt: 'Head slowly turns to the left, revealing the profile. The movement is elegant and gradual. Eyes may shift with the head or lead the movement.'
            },
            {
                name: 'Slow Turn Right',
                validFor: ['face'],
                description: 'Head slowly turns right showing profile',
                prompt: 'Head slowly turns to the right, revealing the profile. Smooth, controlled movement. A classic portrait transition.'
            },
            {
                name: 'Chin Lift',
                validFor: ['face'],
                description: 'Chin rises slowly upward',
                prompt: 'The chin slowly lifts upward in a confident gesture. Eyes may look up or stay level. The neck elongates elegantly.'
            },
            {
                name: 'Eyes Close Open',
                validFor: ['face'],
                description: 'Eyes close slowly then reopen',
                prompt: 'Eyes slowly close, hold for a moment in peaceful stillness, then slowly reopen. A meditative, serene movement.'
            },
            {
                name: 'Knowing Smile',
                validFor: ['face'],
                description: 'A slight knowing smile develops',
                prompt: 'A slight knowing smile slowly spreads across the face - just a hint of amusement in the eyes and mouth. Mysterious and engaging.'
            },
            {
                name: 'Gaze Shift Side',
                validFor: ['face'],
                description: 'Eyes shift to look to the side',
                prompt: 'Eyes slowly shift to look to one side while head remains facing forward. A sidelong glance. Subtle and intriguing.'
            },
            {
                name: 'Head Drop Forward',
                validFor: ['face'],
                description: 'Head tilts slowly forward and down',
                prompt: 'Head slowly tilts forward and slightly down. A contemplative, introspective movement. Eyes may close or look down.'
            },
            {
                name: 'Look Up Through Lashes',
                validFor: ['face'],
                description: 'Chin drops while eyes look up',
                prompt: 'Chin tilts slightly down while eyes look upward, creating a look through the lashes. A classic, alluring portrait expression.'
            },
            {
                name: 'Lip Part',
                validFor: ['face'],
                description: 'Lips slowly part slightly',
                prompt: 'Lips slowly part just slightly, creating a softer, more open expression. A subtle change that adds vulnerability. Very minimal movement.'
            },
            {
                name: 'Brow Furrow Release',
                validFor: ['face'],
                description: 'Slight furrow then release into calm',
                prompt: 'A slight furrow forms between the brows - a moment of thought - then slowly releases into calm neutral. A contemplative micro-expression.'
            }
        ]
    },
    {
        id: 'group-intimate-gaze',
        name: 'Intimate Gaze',
        category: 'group',
        isGroup: true,
        description: 'Deep eye contact and connection - personal, magnetic moments',
        movements: [
            {
                name: 'Lock Eyes',
                validFor: ['face'],
                description: 'Eyes find and hold the camera with intensity',
                prompt: 'The subject\'s gaze slowly focuses and locks onto the camera with quiet intensity. A magnetic, personal connection forms. Everything else stays still.'
            },
            {
                name: 'Searching Look',
                validFor: ['face'],
                description: 'Eyes search the camera as if looking for something',
                prompt: 'The subject\'s eyes move subtly, searching - as if trying to read something in the viewer. A curious, questioning gaze. Head stays still.'
            },
            {
                name: 'Soft Focus Drift',
                validFor: ['face'],
                description: 'Gaze goes soft and unfocused briefly',
                prompt: 'The subject\'s gaze softens, going slightly unfocused as if lost in thought. A dreamy, distant moment. Then gently refocuses.'
            },
            {
                name: 'Invitation',
                validFor: ['face'],
                description: 'Subtle welcoming expression forms',
                prompt: 'A subtle warmth enters the eyes - an unspoken invitation. The faintest hint of welcome in the expression. Minimal but magnetic.'
            },
            {
                name: 'Private Moment',
                validFor: ['face'],
                description: 'Eyes close briefly as if savoring something',
                prompt: 'Eyes close slowly as if savoring a private thought or memory. A brief moment of internal pleasure. Then eyes reopen with soft warmth.'
            },
            {
                name: 'Recognition',
                validFor: ['face'],
                description: 'A flicker of recognition in the eyes',
                prompt: 'A subtle flicker of recognition crosses the eyes - as if seeing someone familiar. A tiny brightening of the gaze. Nearly imperceptible.'
            },
            {
                name: 'Vulnerability',
                validFor: ['face'],
                description: 'Guard drops, softer expression emerges',
                prompt: 'The subject\'s expression subtly softens as if letting their guard down. A moment of vulnerability and openness. Authentic and gentle.'
            },
            {
                name: 'Mischief',
                validFor: ['face'],
                description: 'Hint of playfulness enters the eyes',
                prompt: 'A hint of mischief enters the eyes - a playful glint. The faintest suggestion of a secret. Expression stays controlled but eyes tell a story.'
            },
            {
                name: 'Longing Look Away',
                validFor: ['face'],
                description: 'Eyes drift away with gentle longing',
                prompt: 'Eyes slowly drift to the side with a quality of gentle longing or memory. A wistful, poetic movement. Head stays still.'
            },
            {
                name: 'Return to Camera',
                validFor: ['face'],
                description: 'Gaze returns to camera from elsewhere',
                prompt: 'The subject\'s gaze slowly returns to the camera from looking away. A deliberate re-engagement. Like remembering the viewer is there.'
            }
        ]
    },
    {
        id: 'group-body-language',
        name: 'Body Language',
        category: 'group',
        isGroup: true,
        description: 'Subtle expressive gestures and poses - confidence, ease, attitude',
        movements: [
            {
                name: 'Settle Into Stance',
                validFor: ['body'],
                description: 'Body settles into a more grounded position',
                prompt: 'The subject settles into their stance - weight shifts slightly, shoulders relax, posture adjusts. Finding comfort in the position. Natural and subtle.'
            },
            {
                name: 'Lean Forward',
                validFor: ['body'],
                description: 'Slight lean toward camera',
                prompt: 'The subject leans forward almost imperceptibly - a subtle movement toward the camera. Engaged, present. Just a few degrees of shift.'
            },
            {
                name: 'Open Posture',
                validFor: ['body'],
                description: 'Shoulders open slightly wider',
                prompt: 'Shoulders open slightly wider, chest lifts subtly. A more open, confident posture emerges. The shift is gradual and controlled.'
            },
            {
                name: 'Hand to Heart',
                validFor: ['body'],
                description: 'Hand moves slowly to chest',
                prompt: 'One hand moves slowly to rest on the chest near the heart. A sincere, grounding gesture. Hand settles gently then stays.'
            },
            {
                name: 'Arms Cross',
                validFor: ['body'],
                description: 'Arms slowly fold across chest',
                prompt: 'Arms slowly fold across the chest in a relaxed, confident pose. Not defensive - assured and comfortable. One smooth movement.'
            },
            {
                name: 'Hip Pop',
                validFor: ['body'],
                description: 'Weight shifts to accentuate one hip',
                prompt: 'Weight shifts to one side, hip pops out slightly creating an S-curve silhouette. A classic fashion pose achieved through subtle movement.'
            },
            {
                name: 'Shoulder Back',
                validFor: ['body'],
                description: 'One shoulder draws back slightly',
                prompt: 'One shoulder draws back slightly, angling the body. A subtle rotation that adds dimension to the pose. Controlled and elegant.'
            },
            {
                name: 'Neck Elongate',
                validFor: ['body', 'face'],
                description: 'Neck lengthens, posture lifts',
                prompt: 'The neck slowly elongates as posture lifts - growing taller without obvious movement. An elegant, regal adjustment. Subtle but impactful.'
            },
            {
                name: 'Relax Drop',
                validFor: ['body'],
                description: 'Tension releases, body softens',
                prompt: 'Visible tension slowly releases - shoulders drop, muscles soften, stance becomes more natural. A transition from posed to relaxed.'
            },
            {
                name: 'Power Stance',
                validFor: ['body'],
                description: 'Feet shift wider, stance becomes grounded',
                prompt: 'Feet shift slightly wider, stance becomes more grounded and powerful. A subtle widening that projects confidence. Then holds still.'
            }
        ]
    },
    {
        id: 'group-atmospheric',
        name: 'Atmospheric',
        category: 'group',
        isGroup: true,
        description: 'Environmental and cinematic movements - wind, light, breath, mood',
        movements: [
            {
                name: 'Wind Through Hair',
                validFor: ['face', 'body'],
                description: 'Gentle breeze lifts and moves hair',
                prompt: 'A gentle breeze begins to lift and move through the hair. Strands float and shift naturally. The subject remains still - only the hair responds to the wind.'
            },
            {
                name: 'Fabric Billow',
                validFor: ['body', 'product'],
                description: 'Clothing fabric lifts in wind',
                prompt: 'Fabric begins to lift and billow in a gentle breeze. The material flows and moves naturally while the subject stays frozen. Elegant fabric movement.'
            },
            {
                name: 'Light Sweep',
                validFor: ['face', 'body', 'product'],
                description: 'Light slowly moves across the subject',
                prompt: 'A beam of light slowly sweeps across the subject, highlighting different features as it moves. The subject stays completely still. Cinematic lighting shift.'
            },
            {
                name: 'Shadow Play',
                validFor: ['face', 'body', 'product'],
                description: 'Shadows shift and dance subtly',
                prompt: 'Shadows slowly shift and move across the scene, creating subtle plays of light and dark. The subject remains motionless. Atmospheric and moody.'
            },
            {
                name: 'Deep Breath',
                validFor: ['body', 'face'],
                description: 'Visible deep breath in and out',
                prompt: 'The subject takes one slow, visible deep breath - chest rises, holds briefly, then falls with the exhale. A meditative, grounding moment.'
            },
            {
                name: 'Mist Drift',
                validFor: ['body', 'face', 'product'],
                description: 'Atmospheric mist moves through frame',
                prompt: 'Soft atmospheric mist or haze slowly drifts through the frame. The subject remains completely still as the atmosphere moves around them. Ethereal mood.'
            },
            {
                name: 'Warmth Spread',
                validFor: ['face'],
                description: 'Warm light gradually illuminates face',
                prompt: 'Warm golden light gradually spreads across the face, as if the sun is slowly emerging. The subject stays still, bathed in increasing warmth.'
            },
            {
                name: 'Cool Fade',
                validFor: ['face', 'body'],
                description: 'Light gradually cools and softens',
                prompt: 'The light slowly shifts cooler and softer, creating a more serene, twilight mood. Subject remains motionless as the atmosphere transforms.'
            },
            {
                name: 'Dust Motes',
                validFor: ['body', 'product'],
                description: 'Particles float slowly in light beam',
                prompt: 'Fine dust motes or particles slowly drift through a beam of light. The subject stays perfectly still. A dreamy, suspended-in-time quality.'
            },
            {
                name: 'Stillness Vibration',
                validFor: ['face', 'body', 'product'],
                description: 'Almost imperceptible micro-movement of everything',
                prompt: 'The entire image seems to vibrate almost imperceptibly - a living photograph quality. Not actual movement, but a sense of contained energy. Hypnotic stillness.'
            }
        ]
    }
];

// Get movement by ID
function getMovementById(id) {
    return VIDEO_MOVEMENTS.find(m => m.id === id);
}

// Get movements by category
function getMovementsByCategory(category) {
    return VIDEO_MOVEMENTS.filter(m => m.category === category);
}

// Get all movement groups
function getMovementGroups() {
    return VIDEO_MOVEMENTS.filter(m => m.isGroup === true);
}

// Get a random movement from a group
// Returns an object with { name, description, prompt } that matches the single movement format
function getRandomFromGroup(groupId) {
    const group = VIDEO_MOVEMENTS.find(m => m.id === groupId && m.isGroup);
    if (!group || !group.movements || group.movements.length === 0) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * group.movements.length);
    const movement = group.movements[randomIndex];
    return {
        id: `${groupId}-${randomIndex}`,
        name: movement.name,
        category: 'group-item',
        description: movement.description,
        fallbackPrompt: movement.prompt,
        fromGroup: groupId,
        groupName: group.name
    };
}

// Get multiple unique random movements from a group (for batch generation)
// imageTypes is an array of types for each image, e.g., ['face', 'body', 'product', 'face', 'body']
function getRandomsFromGroup(groupId, count, imageTypes = null) {
    const group = VIDEO_MOVEMENTS.find(m => m.id === groupId && m.isGroup);
    if (!group || !group.movements || group.movements.length === 0) {
        return [];
    }

    const results = [];

    for (let i = 0; i < count; i++) {
        // Filter movements valid for this image's type
        let validMovements = group.movements;
        if (imageTypes && imageTypes[i]) {
            const imgType = imageTypes[i];
            validMovements = group.movements.filter(m =>
                !m.validFor || m.validFor.includes(imgType)
            );
            // Fallback to all if no valid ones found
            if (validMovements.length === 0) {
                validMovements = group.movements;
            }
        }

        // Shuffle and pick one we haven't used recently (if possible)
        const shuffled = [...validMovements].sort(() => Math.random() - 0.5);
        const usedNames = results.map(r => r.name);

        // Try to find one not yet used
        let movement = shuffled.find(m => !usedNames.includes(m.name));
        if (!movement) {
            // All used, just pick random
            movement = shuffled[0];
        }

        results.push({
            id: `${groupId}-${i}`,
            name: movement.name,
            category: 'group-item',
            description: movement.description,
            fallbackPrompt: movement.prompt,
            fromGroup: groupId,
            groupName: group.name
        });
    }
    return results;
}

// Export for use
if (typeof window !== 'undefined') {
    window.VIDEO_MOVEMENTS = VIDEO_MOVEMENTS;
    window.getMovementById = getMovementById;
    window.getMovementsByCategory = getMovementsByCategory;
    window.getMovementGroups = getMovementGroups;
    window.getRandomFromGroup = getRandomFromGroup;
    window.getRandomsFromGroup = getRandomsFromGroup;
}
