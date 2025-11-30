// Pose configurations for Casting tool
// Adapted from SetSet PDP constants

const POSES = [
    // PDP Category (E-Commerce poses)
    {
        id: 'pose-pdp-front',
        name: 'Front',
        category: 'pdp',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-1-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-1-hover.jpg',
    },
    {
        id: 'pose-pdp-angle',
        name: '45° Angle',
        category: 'pdp',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-45degree-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-45degree-hover.jpg',
    },
    {
        id: 'pose-pdp-back',
        name: 'Back',
        category: 'pdp',
        productView: 'back',
        defaultImage: '/tools/casting/images/poses/pose-back-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-back-hover.jpg',
    },
    {
        id: 'pose-pdp-halfbody',
        name: 'Half Body',
        category: 'pdp',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-6-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-6-hover.jpg',
    },
    {
        id: 'pose-pdp-closer',
        name: 'Portrait',
        category: 'pdp',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-closer-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-closer-hover.jpg',
    },
    {
        id: 'pose-pdp-detail',
        name: 'Detail',
        category: 'detail',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-detail-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-detail-hover.jpg',
    },
    // Lifestyle Category (Editorial/Fashion poses)
    {
        id: 'pose-lifestyle-editorial',
        name: 'Editorial',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-editorial-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-editorial-hover.jpg',
    },
    {
        id: 'pose-lifestyle-sitting',
        name: 'Sitting',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-3-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-3-hover.jpg',
    },
    {
        id: 'pose-lifestyle-walking',
        name: 'Walking',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-4-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-4-hover.jpg',
    },
    {
        id: 'pose-lifestyle-leaning',
        name: 'Leaning',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-5-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-5-hover.jpg',
    },
    {
        id: 'pose-lifestyle-armscrossed',
        name: 'Arms Crossed',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-crossed-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-crossed-hover.jpg',
    },
    {
        id: 'pose-lifestyle-pocket',
        name: 'Pocket',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-pocket-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-pocket-hover.jpg',
    },
    {
        id: 'pose-lifestyle-brush',
        name: 'Brush',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-brush-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-brush-hover.jpg',
    },
    {
        id: 'pose-lifestyle-adjust',
        name: 'Adjust',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-adjust-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-adjust-hover.jpg',
    },
    {
        id: 'pose-lifestyle-laying',
        name: 'Laying',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: '/tools/casting/images/poses/pose-laying-default.jpg',
        hoverImage: '/tools/casting/images/poses/pose-laying-hover.jpg',
    },
];

// Simplified pose prompt templates - uses [PRODUCT_DESCRIPTION] placeholder
const POSE_PROMPTS = {
    'pose-pdp-front': [
        'Full-body portrait of this exact person in a white studio. Standing with shoulders back, direct gaze into camera, arms at sides. [PRODUCT_DESCRIPTION]. Sharp editorial lighting. Keep identical facial features.',
        'Full-body portrait of this exact person in a white studio. Standing confidently with one hand in pocket, direct gaze. [PRODUCT_DESCRIPTION]. Clean professional lighting. Maintain exact face.',
        'Full-body portrait of this exact person in a white studio. Standing straight with confident posture, looking at camera. [PRODUCT_DESCRIPTION]. High-contrast studio lighting. Preserve facial identity.',
    ],
    'pose-pdp-angle': [
        'Full-body portrait of this exact person at 45-degree angle in white studio. Body turned right, gaze forward (not at camera). [PRODUCT_DESCRIPTION]. Editorial lighting. Keep identical face.',
        'Full-body portrait of this exact person at 45-degree angle in white studio. Body turned right, one hand in pocket. [PRODUCT_DESCRIPTION]. Clean lighting on garment silhouette. Maintain facial identity.',
        'Full-body portrait of this exact person at 45-degree angle in white studio. Body turned left, weight forward, gaze ahead. [PRODUCT_DESCRIPTION]. Professional lighting. Preserve same face.',
    ],
    'pose-pdp-back': [
        'Full-body portrait of this exact person from behind in white studio. Standing with shoulders back, facing away, head forward. [PRODUCT_DESCRIPTION]. Editorial lighting on garment back. Clear back view.',
        'Full-body portrait of this exact person from behind in white studio. Facing away, arms at sides, showing garment back. [PRODUCT_DESCRIPTION]. Clean studio lighting. Complete back view.',
        'Full-body portrait of this exact person from behind with subtle twist in white studio. Facing away with slight body angle. [PRODUCT_DESCRIPTION]. Professional lighting. Back of garment as focus.',
    ],
    'pose-pdp-halfbody': [
        'Waist-up portrait of this exact person in white studio. Shoulders squared, hands at sides, direct gaze. [PRODUCT_DESCRIPTION]. Clean editorial lighting. Keep identical facial features.',
        'Half-body portrait of this exact person in white studio. From waist up, shoulders back, looking at camera. [PRODUCT_DESCRIPTION]. Professional lighting on torso. Maintain exact face.',
        'Waist-up portrait of this exact person in white studio. Squared shoulders, confident gaze into camera. [PRODUCT_DESCRIPTION]. Sharp lighting on upper body. Preserve facial identity.',
    ],
    'pose-pdp-closer': [
        'Chest-up portrait of this exact person in white studio. Shoulders squared, direct gaze, confident expression. [PRODUCT_DESCRIPTION]. Editorial lighting on face and shoulders. Keep identical face.',
        'Portrait from chest up of this exact person in white studio. Looking at camera with subtle smile. [PRODUCT_DESCRIPTION]. Clean lighting. Maintain exact facial features.',
        'Chest-up portrait of this exact person in white studio. Shoulders angled, composed expression. [PRODUCT_DESCRIPTION]. Professional lighting. Preserve same face.',
    ],
    'pose-pdp-detail': [
        'Product photo of the exact garment on white wooden hanger against white background. Full shape visible, natural drape. Professional product photography, soft even lighting. No person, just product on hanger.',
        'Product photo of the exact garment on white pedestal in white studio. Arranged to show form and structure. Professional lighting with subtle shadows. No person, just product on display.',
        'Flat lay product photo of the exact garment on white surface, shot from above. Shows shape and details clearly. Even bright lighting. No person, just product laid flat.',
    ],
    'pose-lifestyle-editorial': [
        'Editorial portrait of this exact person in white studio. Dynamic pose with one arm extended overhead, chin lifted, intense gaze. [PRODUCT_DESCRIPTION]. Dramatic Vogue-style lighting. Keep identical face.',
        'Editorial portrait of this exact person in white studio. Leaning forward, one hand on thigh, other arm stretched out. [PRODUCT_DESCRIPTION]. High-fashion lighting. Maintain exact face.',
        'Editorial portrait of this exact person in white studio. Torso twisted, one hand at neck, commanding stance. [PRODUCT_DESCRIPTION]. Campaign-style lighting. Preserve facial identity.',
    ],
    'pose-lifestyle-sitting': [
        'Editorial portrait of this exact person seated on white block in white studio. Leaning forward with elbows on knees, direct gaze. [PRODUCT_DESCRIPTION]. Sculptural lighting.',
        'Editorial portrait of this exact person seated sideways on stool in white studio. Torso turned toward camera, arm draped over back. [PRODUCT_DESCRIPTION]. Clean lighting.',
        'Editorial portrait of this exact person seated on block edge in white studio. Leaning back, one leg stretched, relaxed confidence. [PRODUCT_DESCRIPTION]. Editorial lighting.',
    ],
    'pose-lifestyle-walking': [
        'Editorial portrait of this exact person walking in white studio. Mid-step, arms swinging naturally, confident gaze forward. [PRODUCT_DESCRIPTION]. Dynamic campaign lighting.',
        'Editorial portrait of this exact person striding forward in white studio. Mid-stride with purpose, torso angled. [PRODUCT_DESCRIPTION]. Professional lighting.',
        'Editorial portrait of this exact person walking in white studio. Mid-stride, head turned with confident expression. [PRODUCT_DESCRIPTION]. Clean studio lighting.',
    ],
    'pose-lifestyle-leaning': [
        'Editorial portrait of this exact person leaning against white wall in studio. Arms crossed, gaze away from camera. [PRODUCT_DESCRIPTION]. Dramatic lighting.',
        'Editorial portrait of this exact person leaning on white block in studio. One hand in pocket, looking at camera. [PRODUCT_DESCRIPTION]. Contemporary lighting.',
        'Editorial portrait of this exact person leaning against wall in white studio. Legs crossed at ankles, relaxed pose. [PRODUCT_DESCRIPTION]. Clean lighting.',
    ],
    'pose-lifestyle-armscrossed': [
        'Full-body portrait of this exact person in white studio. Standing straight with arms crossed at chest, direct gaze. [PRODUCT_DESCRIPTION]. Sharp editorial lighting. Keep identical face.',
        'Full-body portrait of this exact person in white studio. Arms crossed, shoulders squared, confident expression. [PRODUCT_DESCRIPTION]. Contemporary lighting. Maintain exact face.',
        'Full-body portrait of this exact person in white studio. Arms crossed casually, relaxed confident stance. [PRODUCT_DESCRIPTION]. Clean lighting. Preserve facial identity.',
    ],
    'pose-lifestyle-pocket': [
        'Editorial portrait of this exact person in white studio. Both hands in pockets, shoulders angled, direct gaze. [PRODUCT_DESCRIPTION]. Sharp editorial lighting. Keep identical face.',
        'Editorial portrait of this exact person in white studio. Hands in pockets, shoulders back, confident expression. [PRODUCT_DESCRIPTION]. High-contrast lighting. Maintain exact face.',
        'Editorial portrait of this exact person in white studio. Hands in pockets, slight forward lean, relaxed pose. [PRODUCT_DESCRIPTION]. Natural lighting. Preserve facial identity.',
    ],
    'pose-lifestyle-brush': [
        'Editorial portrait of this exact person in white studio. One hand brushing through hair, gaze at camera. [PRODUCT_DESCRIPTION]. Dramatic editorial lighting. Keep identical face.',
        'Editorial portrait of this exact person in white studio. Hand running through hair, shoulders back, sideways gaze. [PRODUCT_DESCRIPTION]. Contemporary lighting. Maintain exact face.',
        'Editorial portrait of this exact person in white studio. Brushing hair back, other hand at hip, relaxed expression. [PRODUCT_DESCRIPTION]. Clean natural lighting. Preserve facial identity.',
    ],
    'pose-lifestyle-adjust': [
        'Editorial portrait of this exact person in white studio. Hands adjusting collar, gaze down at hands. [PRODUCT_DESCRIPTION]. Sharp editorial lighting. Keep identical face.',
        'Editorial portrait of this exact person in white studio. Adjusting sleeve, looking at camera, composed expression. [PRODUCT_DESCRIPTION]. Contemporary lighting. Maintain exact face.',
        'Editorial portrait of this exact person in white studio. Adjusting waist of garment, focused attention. [PRODUCT_DESCRIPTION]. Clean lighting on garment details. Preserve facial identity.',
    ],
    'pose-lifestyle-laying': [
        'Editorial portrait of this exact person laying on white surface in studio. Body stretched, one arm above head, gaze at camera. [PRODUCT_DESCRIPTION]. Dramatic overhead lighting. Keep identical face.',
        'Editorial portrait of this exact person reclining on white surface in studio. Propped on one elbow, confident gaze. [PRODUCT_DESCRIPTION]. Contemporary lighting. Maintain exact face.',
        'Editorial portrait of this exact person laying on white surface in studio. Relaxed pose, hands positioned naturally. [PRODUCT_DESCRIPTION]. Soft lighting. Preserve facial identity.',
    ],
};

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.POSES = POSES;
    window.POSE_PROMPTS = POSE_PROMPTS;
}
