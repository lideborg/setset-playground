/**
 * Pose Pools for SocialSet
 *
 * Curated minimal, realistic poses organized by category.
 * These are passed to GPT as inspiration - it creates unique variations each time.
 *
 * Philosophy: Subtle, natural poses with small realistic details
 * (weight shifts, natural hand placement, slight tilts) - not overly dramatic.
 */

const POSE_POOLS = {
    // ═══════════════════════════════════════════════════════════════
    // E-COMMERCE: Editorial studio poses with subtle body language
    // ═══════════════════════════════════════════════════════════════

    // Editorial e-commerce: subtle body language, alive poses
    'ecom-editorial': [
        'standing with weight shifted to one leg, one hand grazing thigh lightly, confident gaze with subtle chin lift',
        'standing with one knee slightly bent, arms relaxed at sides with natural hand placement, direct but relaxed gaze',
        'standing at slight 3/4 angle, weight on back leg, hands hanging naturally, head tilted slightly',
        'standing with contrapposto stance, shoulders relaxed, one arm slightly bent, looking at camera with ease',
        'standing with weight shifted, one knee bent, hands by hips with fingers softly splayed, chin slightly raised',
        'standing with relaxed S-curve posture, arms at sides with soft hands, subtle head tilt to one side',
        'standing with hip shifted slightly, one hand resting on outer thigh, composed editorial expression',
        'standing with natural weight distribution, shoulders dropped and relaxed, one hand with fingers loosely together',
        'standing with slight forward lean from hips, arms loose, direct gaze with quiet intensity',
        'standing with one shoulder slightly forward, weight on back foot, hands relaxed, approachable confidence'
    ],

    // ═══════════════════════════════════════════════════════════════
    // LIFESTYLE: Natural, editorial poses (still minimal)
    // ═══════════════════════════════════════════════════════════════

    // Sitting poses - grounded, relaxed
    'sitting': [
        'seated on edge of surface, leaning slightly forward, elbows resting on knees, relaxed direct gaze',
        'seated with legs crossed casually, hands resting in lap, shoulders dropped, composed expression',
        'seated sideways, torso turned toward camera, one arm draped over knee, easy confidence',
        'seated with one leg extended, leaning back slightly on hands, relaxed but present gaze',
        'seated with feet flat on floor, hands on knees, upright posture, calm attentive expression',
        'seated casually with one knee up, arm resting on it, head tilted slightly, natural ease',
        'seated leaning back with arms behind for support, legs relaxed, looking at camera with quiet confidence'
    ],

    // Walking poses - mid-stride, natural movement
    'walking': [
        'mid-stride walking naturally, arms swinging gently, looking ahead with purpose',
        'walking with relaxed pace, one foot forward, arms loose at sides, casual confident gaze',
        'captured mid-step, natural arm movement, body in slight motion, easy expression',
        'walking forward with gentle momentum, hands relaxed, looking at camera with soft focus',
        'striding casually, weight shifting, arms moving naturally, composed forward gaze',
        'walking at moderate pace, one arm slightly forward, head held naturally, quiet determination'
    ],

    // Leaning poses - casual, grounded
    'leaning': [
        'leaning against surface with one shoulder, arms loosely crossed, weight on one leg, relaxed gaze',
        'leaning back slightly, hands in pockets, hips shifted, casual confident expression',
        'leaning with back against wall, one foot flat on surface behind, arms at sides, easy stance',
        'leaning sideways, one elbow resting on surface, other hand relaxed, composed look',
        'leaning forward slightly from hips, hands resting on surface, direct engaged gaze',
        'leaning with hip against surface, arms crossed loosely, weight shifted, approachable confidence'
    ],

    // Arms crossed - grounded, confident
    'arms-crossed': [
        'standing with arms loosely crossed at chest, weight on one leg, relaxed but present gaze',
        'arms crossed casually, shoulders dropped, slight hip shift, composed expression',
        'standing with arms folded naturally, feet hip-width apart, direct confident gaze',
        'arms crossed low on body, relaxed stance, head tilted slightly, easy confidence',
        'standing with arms loosely interlocked, weight shifted, calm direct eye contact'
    ],

    // Hands in pockets - effortless, casual
    'pocket': [
        'standing with hands in pockets, shoulders relaxed, weight shifted to one leg, easy gaze',
        'hands tucked in pockets, slight forward lean, head tilted, casual confident expression',
        'one hand in pocket, other arm relaxed at side, weight on back leg, composed look',
        'both hands in pockets, feet apart, shoulders back, direct but approachable gaze',
        'hands loosely in pockets, hips shifted slightly, relaxed posture, quiet confidence'
    ],

    // Touch/adjust poses - minimal, natural
    'adjust': [
        'one hand adjusting collar lightly, other arm relaxed, weight shifted, composed gaze downward',
        'hand brushing sleeve casually, shoulders relaxed, natural stance, soft expression',
        'fingers touching edge of garment, subtle adjustment, direct gaze with quiet attention',
        'hand at hem, slight adjustment, weight on one leg, focused but relaxed expression',
        'one hand near neckline, gentle touch, other hand at side, composed presence'
    ],

    // Hair touch - subtle, not dramatic
    'brush': [
        'one hand lightly touching hair near face, other arm relaxed, soft direct gaze',
        'hand running through hair casually from side, weight shifted, easy expression',
        'fingers brushing hair behind ear, head tilted slightly, relaxed composed look',
        'hand at back of head touching hair lightly, arm creating subtle angle, direct gaze',
        'one hand near hair, gentle touch not dramatic, natural stance, quiet confidence'
    ],

    // Editorial - dynamic but still grounded
    'editorial': [
        'standing with one arm bent, hand near hip, weight shifted, editorial gaze with intensity',
        'slight torso twist, shoulders angled, arms creating subtle geometry, composed expression',
        'standing with elongated posture, one arm slightly extended, direct powerful gaze',
        'body at slight angle, one hand touching thigh, head turned toward camera, editorial presence',
        'standing with confident asymmetry, weight on one leg, arms positioned naturally, striking but minimal',
        'slight lean with one shoulder forward, arms loose, chin lifted subtly, quiet editorial power',
        'standing with natural S-curve, hands relaxed, shoulders dropped, compelling direct gaze'
    ],

    // ═══════════════════════════════════════════════════════════════
    // GENDER-SPECIFIC POOLS
    // ═══════════════════════════════════════════════════════════════

    'female-subtle': [
        'standing with gentle S-curve, weight on one hip, arms soft at sides, feminine but grounded presence',
        'one hand resting lightly on thigh, hip shifted, shoulders relaxed, confident soft gaze',
        'standing with natural curve, one knee slightly bent, hands with fingers loosely together, composed elegance',
        'slight hip tilt, arms hanging naturally with soft hands, head tilted subtly, quiet confidence',
        'standing with graceful weight shift, one arm slightly bent, relaxed but present expression'
    ],

    'male-grounded': [
        'standing with feet planted, shoulders squared, arms at sides with purpose, direct steady gaze',
        'grounded stance, slight weight shift, hands relaxed, composed masculine presence',
        'standing with natural width, one hand loosely at side, shoulders back, quiet strength in expression',
        'feet shoulder-width apart, arms hanging naturally, chin level, grounded confident look',
        'standing solid, weight balanced, hands relaxed with natural curl, direct unforced gaze'
    ]
};

/**
 * Select random poses from a pool, ensuring no duplicates
 * @param {string} poolName - Name of the pose pool
 * @param {number} count - Number of poses to select
 * @returns {string[]} Array of pose descriptions
 */
function selectPosesFromPool(poolName, count = 1) {
    const pool = POSE_POOLS[poolName];
    if (!pool || pool.length === 0) {
        console.warn(`Pose pool "${poolName}" not found, using ecom-editorial`);
        return selectPosesFromPool('ecom-editorial', count);
    }

    // Shuffle and pick
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, pool.length));
}

/**
 * Get a single random pose from a pool
 * @param {string} poolName - Name of the pose pool
 * @returns {string} A single pose description
 */
function getRandomPose(poolName) {
    return selectPosesFromPool(poolName, 1)[0];
}

/**
 * Get pose based on mode
 * @param {string} mode - 'ecommerce', 'campaign', or 'casting'
 * @param {string} poseType - specific pose type like 'sitting', 'walking' etc (optional)
 * @returns {string} A pose description
 */
function getPoseForMode(mode, poseType = null) {
    // If specific pose type requested
    if (poseType && POSE_POOLS[poseType]) {
        return getRandomPose(poseType);
    }

    // Mode-based selection - always editorial for e-commerce
    if (mode === 'ecommerce') {
        return getRandomPose('ecom-editorial');
    }

    if (mode === 'campaign' || mode === 'casting') {
        // For campaign, mix between different lifestyle poses
        const lifestylePools = ['editorial', 'walking', 'leaning', 'pocket'];
        const randomPool = lifestylePools[Math.floor(Math.random() * lifestylePools.length)];
        return getRandomPose(randomPool);
    }

    // Default - always editorial
    return getRandomPose('ecom-editorial');
}

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.POSE_POOLS = POSE_POOLS;
    window.selectPosesFromPool = selectPosesFromPool;
    window.getRandomPose = getRandomPose;
    window.getPoseForMode = getPoseForMode;
}
