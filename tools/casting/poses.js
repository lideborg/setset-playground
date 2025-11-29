// Pose configurations for Casting tool
// Adapted from SetSet PDP constants

const POSES = [
    // PDP Category (E-Commerce poses)
    {
        id: 'pose-pdp-front',
        name: 'Front',
        category: 'pdp',
        productView: 'front',
        defaultImage: 'images/poses/pose-1-default.jpg',
        hoverImage: 'images/poses/pose-1-hover.jpg',
    },
    {
        id: 'pose-pdp-angle',
        name: '45° Angle',
        category: 'pdp',
        productView: 'front',
        defaultImage: 'images/poses/pose-45degree-default.jpg',
        hoverImage: 'images/poses/pose-45degree-hover.jpg',
    },
    {
        id: 'pose-pdp-back',
        name: 'Back',
        category: 'pdp',
        productView: 'back',
        defaultImage: 'images/poses/pose-back-default.jpg',
        hoverImage: 'images/poses/pose-back-hover.jpg',
    },
    {
        id: 'pose-pdp-halfbody',
        name: 'Half Body',
        category: 'pdp',
        productView: 'front',
        defaultImage: 'images/poses/pose-6-default.jpg',
        hoverImage: 'images/poses/pose-6-hover.jpg',
    },
    {
        id: 'pose-pdp-closer',
        name: 'Portrait',
        category: 'pdp',
        productView: 'front',
        defaultImage: 'images/poses/pose-closer-default.jpg',
        hoverImage: 'images/poses/pose-closer-hover.jpg',
    },
    {
        id: 'pose-pdp-detail',
        name: 'Detail',
        category: 'detail',
        productView: 'front',
        defaultImage: 'images/poses/pose-detail-default.jpg',
        hoverImage: 'images/poses/pose-detail-hover.jpg',
    },
    // Lifestyle Category (Editorial/Fashion poses)
    {
        id: 'pose-lifestyle-editorial',
        name: 'Editorial',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-editorial-default.jpg',
        hoverImage: 'images/poses/pose-editorial-hover.jpg',
    },
    {
        id: 'pose-lifestyle-sitting',
        name: 'Sitting',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-3-default.jpg',
        hoverImage: 'images/poses/pose-3-hover.jpg',
    },
    {
        id: 'pose-lifestyle-walking',
        name: 'Walking',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-4-default.jpg',
        hoverImage: 'images/poses/pose-4-hover.jpg',
    },
    {
        id: 'pose-lifestyle-leaning',
        name: 'Leaning',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-5-default.jpg',
        hoverImage: 'images/poses/pose-5-hover.jpg',
    },
    {
        id: 'pose-lifestyle-armscrossed',
        name: 'Arms Crossed',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-crossed-default.jpg',
        hoverImage: 'images/poses/pose-crossed-hover.jpg',
    },
    {
        id: 'pose-lifestyle-pocket',
        name: 'Pocket',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-pocket-default.jpg',
        hoverImage: 'images/poses/pose-pocket-hover.jpg',
    },
    {
        id: 'pose-lifestyle-brush',
        name: 'Brush',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-brush-default.jpg',
        hoverImage: 'images/poses/pose-brush-hover.jpg',
    },
    {
        id: 'pose-lifestyle-adjust',
        name: 'Adjust',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-adjust-default.jpg',
        hoverImage: 'images/poses/pose-adjust-hover.jpg',
    },
    {
        id: 'pose-lifestyle-laying',
        name: 'Laying',
        category: 'lifestyle',
        productView: 'front',
        defaultImage: 'images/poses/pose-laying-default.jpg',
        hoverImage: 'images/poses/pose-laying-hover.jpg',
    },
];

// Pose prompt templates - uses [PRODUCT_DESCRIPTION] placeholder
const POSE_PROMPTS = {
    'pose-pdp-front': [
        'A photorealistic full-body portrait of this exact same person, maintaining identical facial features, bone structure, and skin tone. Standing with commanding presence in a seamless white photo studio. Pose: powerful stance with shoulders back, direct intense gaze into camera, chin slightly raised with supreme confidence, arms at sides with authority. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting with dramatic shadows. Model exudes fierce professionalism and elevated presence. IMPORTANT: Keep the same face, eyes, nose, and exact facial characteristics as the reference image.',
        'A photorealistic full-body portrait of this exact same person, preserving identical facial features and characteristics. Standing with magnetic confidence in a white studio. Pose: one hand casually in pocket, piercing gaze with subtle smirk, weight shifted with cool authority, other arm relaxed at side. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting with high contrast. Model radiates fierce professional energy. IMPORTANT: Maintain exact facial identity from reference image.',
        'A photorealistic full-body portrait of this exact same person, keeping identical facial structure and features. Standing with quiet intensity in a seamless white studio. Pose: arms confidently at sides, unwavering direct stare into camera with unshakeable composure, weight evenly distributed. Outfit: [PRODUCT_DESCRIPTION]. Clean but dramatic lighting. Model looks elevated, fierce, professional. IMPORTANT: Preserve the exact same face and identity.',
    ],
    'pose-pdp-angle': [
        'A photorealistic full-body portrait of this exact same person, maintaining identical facial features. Standing at precise 45-degree angle to camera, body turned to the right in a seamless white studio. Pose: shoulders back with confidence, arms at sides with poise, gazing straight ahead to the right (NOT at camera) with fierce determination. Outfit: [PRODUCT_DESCRIPTION]. Sharp key light from front creating dimension on garment. Model exudes elevated professional presence. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body portrait of this exact same person, preserving identical features. Standing at precise 45-degree angle to camera, body turned to the right in a white studio. Pose: one hand in pocket with authority, shoulders angled, other arm at side, gazing straight ahead to the right (NOT at camera) with magnetic intensity. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting emphasizing garment silhouette. Model radiates fierce professionalism. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body portrait of this exact same person, keeping identical facial characteristics. Standing at precise 45-degree angle to camera, body turned to the left in a seamless white studio. Pose: arms at sides with poise, weight shifted forward, gazing straight ahead to the left (NOT at camera) with unwavering focus. Outfit: [PRODUCT_DESCRIPTION]. Clean dramatic lighting on garment. Model looks professional and elevated. IMPORTANT: Preserve same face.',
    ],
    'pose-pdp-back': [
        'A photorealistic full-body portrait of this exact same person from behind, maintaining identical physical build and posture. Standing with commanding presence facing away from camera in seamless white studio. Pose: shoulders back with confidence, arms at sides with authority, head facing straight forward showing clean back view of garment. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting emphasizing garment back details. Professional, clean composition. IMPORTANT: Show complete back view of garment clearly.',
        'A photorealistic full-body portrait of this exact same person from behind, preserving identical physique. Standing with magnetic confidence facing away from camera in white studio. Pose: shoulders back with poise, arms at sides with composure, head straight forward displaying garment back perfectly. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting highlighting back of garment. Clean, professional styling. IMPORTANT: Clear view of garment back.',
        'A photorealistic full-body portrait of this exact same person from behind with subtle dynamic movement, keeping identical build. Standing facing away with slight body twist in seamless white studio. Pose: shoulders angled, one arm slightly forward, head turning subtly showing movement while maintaining back view of garment. Outfit: [PRODUCT_DESCRIPTION]. Dramatic lighting on garment back. Professional with slight editorial energy. IMPORTANT: Back of garment remains primary focus.',
    ],
    'pose-pdp-halfbody': [
        'A photorealistic waist-up e-commerce portrait of this exact same person, maintaining identical facial features and characteristics. Framed from the waist up in a seamless white studio. Pose: shoulders squared with confidence, hands naturally at sides, direct commanding gaze into camera with fierce professional intensity, chin slightly raised. Outfit: [PRODUCT_DESCRIPTION]. Clean editorial lighting emphasizing upper body and garment details. Model exudes elevated presence. IMPORTANT: Keep exact same face and identity as reference image.',
        'A photorealistic half-body e-commerce portrait of this exact same person, preserving identical facial structure. Shot from waist up in a white studio. Pose: shoulders back with authority, hands naturally positioned, piercing gaze into camera with magnetic confidence, chin level with composure. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting focused on torso and face. Model radiates fierce professionalism. IMPORTANT: Maintain exact facial identity.',
        'A photorealistic waist-up e-commerce portrait of this exact same person, keeping identical facial features. Captured from the waist up in a seamless white studio. Pose: shoulders squared with poise, hands at sides, intense unwavering gaze into camera with supreme confidence, chin slightly raised. Outfit: [PRODUCT_DESCRIPTION]. Sharp lighting emphasizing upper body composition and garment. Model looks elevated and professional. IMPORTANT: Preserve same face and identity.',
    ],
    'pose-pdp-closer': [
        'A photorealistic portrait of this exact same person from chest up, maintaining identical facial features. In a seamless white studio. Pose: shoulders squared, direct commanding gaze into camera, expression confident and intense, chin slightly raised. Outfit: [PRODUCT_DESCRIPTION]. Clean editorial lighting emphasizing face and upper garment details. Model exudes elevated presence. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic portrait of this exact same person from chest up, preserving identical features. In a white studio. Pose: shoulders back, piercing gaze into camera with magnetic confidence, subtle smile, chin level. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting focused on face and shoulders. Model radiates professional energy. IMPORTANT: Maintain exact facial identity.',
        'A photorealistic portrait of this exact same person from chest up, keeping identical facial structure. In a seamless white studio. Pose: shoulders angled slightly, intense gaze into camera, composed expression, chin level. Outfit: [PRODUCT_DESCRIPTION]. Sharp lighting emphasizing facial features and garment collar. Model looks professional. IMPORTANT: Preserve same face.',
    ],
    'pose-pdp-detail': [
        'A photorealistic e-commerce product photograph of the EXACT product from the reference image displayed on a clean white wooden hanger against a seamless white studio background. The product hangs naturally showing its full shape and drape. Shot from straight-on at eye level. Professional product photography with soft, even studio lighting casting minimal shadows. Pure white background. Clean, minimal aesthetic. No person visible, no hands, only the product on hanger.',
        'A photorealistic e-commerce product photograph of the EXACT product from the reference image displayed on a white minimalist pedestal or display stand in a seamless white studio. The product is arranged to show its form and structure. Shot from a slightly elevated angle. Professional product photography with bright, even lighting. Pure white background. Clean commercial aesthetic with subtle shadows. No person visible, no hands, only the product on display.',
        'A photorealistic e-commerce product photograph of the EXACT product from the reference image artfully laid flat on a pure white studio surface. The product is arranged to show its shape, details, and construction. Shot from directly above (flat lay). Professional product photography with even, bright studio lighting. Seamless white background. Clean, minimal aesthetic. No person visible, no hands, no model - only the product laid flat.',
    ],
    'pose-lifestyle-editorial': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features and bone structure. In a white photo studio. Pose: body elongated with one arm powerfully extended overhead at a sharp angle, chin lifted with fierce determination, eyes blazing with intensity, legs positioned with dynamic energy. Outfit: [PRODUCT_DESCRIPTION]. Sculptural Vogue photoshoot energy with dramatic shadows. Model exudes elevated fashion presence. IMPORTANT: Keep exact same face and identity as reference image.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical facial characteristics. In a seamless white studio. Pose: leaning forward with one hand dominantly on thigh, the other arm stretched outward with commanding force, gaze burning into lens with unbreakable focus, body twisted with authority. Outfit: [PRODUCT_DESCRIPTION]. High-fashion movement with contemporary lighting. Model radiates fierce professional energy. IMPORTANT: Maintain exact facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. In a clean white studio. Pose: torso twisted with confident authority, one hand boldly at neck, the other extended with powerful tension, expression fierce and unyielding, stance commanding. Outfit: [PRODUCT_DESCRIPTION]. Strong, sculptural, campaign-style with sharp lighting. Model looks elevated and professional. IMPORTANT: Preserve same face and identity.',
    ],
    'pose-lifestyle-sitting': [
        'A photorealistic full-body editorial portrait of this exact model seated with commanding authority on a white block in a seamless white studio. Pose: leaning forward with elbows powerfully on knees, intense unwavering gaze directly into camera with fierce confidence, shoulders engaged. Outfit: [PRODUCT_DESCRIPTION]. Strong sculptural energy with dramatic lighting. Model exudes elevated presence.',
        'A photorealistic full-body editorial portrait of this exact model seated with magnetic presence sideways on a minimal stool in a white studio. Pose: torso boldly turned toward camera, one arm dominantly draped over stool back, expression radiating cool confidence, body angled dynamically. Outfit: [PRODUCT_DESCRIPTION]. Calm yet fierce with contemporary lighting. Professional styling.',
        'A photorealistic full-body editorial portrait of this exact model seated with effortless swagger on white block edge in a white studio. Pose: leaning back with one hand confidently braced behind, one leg stretched with authority, other bent, gaze piercing with intensity. Outfit: [PRODUCT_DESCRIPTION]. Editorial energy with clean lighting. Elevated model presence.',
    ],
    'pose-lifestyle-walking': [
        'A photorealistic full-body editorial portrait of this exact model walking with commanding presence in a seamless white studio. Pose: captured mid-step with arms swinging with purpose and power, gaze blazing with unstoppable confidence and fierce determination, body moving with authority. Outfit: [PRODUCT_DESCRIPTION]. Minimal, high-fashion campaign energy with dynamic lighting. Model exudes professional presence.',
        'A photorealistic full-body editorial portrait of this exact model striding forward in a white studio. Pose: captured mid-stride with fierce determination, torso angled with authority, arms positioned powerfully, expression intense and focused with magnetic energy. Outfit: [PRODUCT_DESCRIPTION]. Purposeful, dynamic styling with contemporary lighting. Elevated model aesthetic.',
        'A photorealistic full-body editorial portrait of this exact model walking with magnetic swagger in a seamless white studio. Pose: captured mid-stride with arms confidently positioned, head turned with piercing intensity, expression radiating cool authority, body moving with purpose. Outfit: [PRODUCT_DESCRIPTION]. Sculptural motion with clean lighting. Professional campaign energy.',
    ],
    'pose-lifestyle-leaning': [
        'A photorealistic full-body editorial portrait of this exact model leaning with effortless swagger against a white wall in a seamless studio. Pose: arms boldly crossed with authority, shoulders back, piercing gaze away from camera with confident intensity, body angled with poise. Outfit: [PRODUCT_DESCRIPTION]. Confident yet stylish with dramatic lighting. Model exudes elevated presence.',
        'A photorealistic full-body editorial portrait of this exact model leaning with commanding presence against a white block in a seamless studio. Pose: one hand confidently in pocket, the other powerfully on block, burning gaze toward camera with unshakeable confidence, body positioned with authority. Outfit: [PRODUCT_DESCRIPTION]. Minimal lifestyle elegance with contemporary lighting. Professional styling.',
        'A photorealistic full-body editorial portrait of this exact model leaning with magnetic cool against a wall in a seamless white studio. Pose: legs crossed at ankles with casual confidence, hands positioned with purpose, intense gaze off-camera radiating quiet power, body relaxed yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Strong, modern styling with clean lighting. Elevated aesthetic.',
    ],
    'pose-lifestyle-armscrossed': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features. Standing straight with commanding presence in a seamless white studio. Pose: arms powerfully crossed at chest with confident authority, shoulders back, intense gaze into camera with fierce determination, chin raised with supreme confidence. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting with dramatic contrast. Model exudes elevated professional energy. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical facial characteristics. Standing straight with magnetic confidence in a white studio. Pose: arms boldly crossed at chest with assertive poise, shoulders squared, piercing gaze into camera with unshakeable authority, chin level with composure. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting emphasizing posture. Model radiates fierce professionalism. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. Leaning casually with relaxed confidence in a seamless white studio. Pose: arms crossed at chest with easy swagger, shoulders angled, warm gaze with approachable intensity, body language calm yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Clean lighting with soft shadows. Model looks professional yet relaxed. IMPORTANT: Preserve same face.',
    ],
    'pose-lifestyle-pocket': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features. Standing with edgy fashion confidence in a seamless white studio. Pose: both hands inserted in pockets with cool authority, shoulders angled, intense gaze into camera with fierce magnetism, chin raised with supreme confidence, body still with commanding presence. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting creating drama. Model exudes elevated fashion energy. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical facial characteristics. Standing with fashion-forward poise in a white studio. Pose: both hands confidently in pockets, shoulders back, piercing gaze with unshakeable authority, chin level with composure, body positioned with editorial stillness. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting with high contrast. Model radiates fierce professional presence. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. Captured mid-movement with relaxed confidence in a seamless white studio. Pose: both hands casually in pockets, shoulders naturally positioned, warm gaze with approachable intensity, slight forward lean suggesting movement, body language easy yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Clean lighting with natural feel. Model looks professional and accessible. IMPORTANT: Preserve same face.',
    ],
    'pose-lifestyle-brush': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features. Standing with confident swagger in a seamless white studio. Pose: one hand brushing through hair with natural ease, the other at side, gaze into camera with magnetic intensity, expression relaxed yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting with dramatic shadows. Model exudes elevated fashion presence. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical features. Standing with effortless cool in a white studio. Pose: hand running through hair with casual confidence, shoulders back, piercing sideways gaze with fierce determination, body angled dynamically. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting emphasizing movement. Model radiates professional energy. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. In motion with relaxed confidence in a seamless white studio. Pose: one hand brushing hair back naturally, other hand at hip, warm gaze with approachable intensity, body language easy yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Clean lighting with natural feel. Model looks elevated and accessible. IMPORTANT: Preserve same face.',
    ],
    'pose-lifestyle-adjust': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features. Standing with confident presence in a seamless white studio. Pose: hands adjusting collar or garment with purposeful attention, gaze down at hands with focused intensity, shoulders squared with authority. Outfit: [PRODUCT_DESCRIPTION]. Sharp editorial lighting with dramatic shadows. Model exudes elevated professional presence. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical features. Standing with magnetic confidence in a white studio. Pose: one hand adjusting sleeve or cuff, the other at side, gaze into camera with fierce determination, expression composed. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting emphasizing garment details. Model radiates professional energy. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. In a seamless white studio. Pose: hands adjusting waist or belt of garment, gaze down with focused attention, body angled naturally. Outfit: [PRODUCT_DESCRIPTION]. Clean lighting emphasizing garment and hands. Model looks professional and attentive. IMPORTANT: Preserve same face.',
    ],
    'pose-lifestyle-laying': [
        'A photorealistic full-body editorial portrait of this exact same person, maintaining identical facial features. Laying on a white surface in a seamless white studio. Pose: body stretched elegantly, one arm above head, gaze into camera with magnetic intensity, expression relaxed yet commanding. Outfit: [PRODUCT_DESCRIPTION]. Dramatic overhead lighting creating sculptural shadows. Model exudes elevated fashion presence. IMPORTANT: Keep exact same face and identity.',
        'A photorealistic full-body editorial portrait of this exact same person, preserving identical features. Reclining on a white surface in a white studio. Pose: body positioned dynamically, propped on one elbow, gaze into camera with fierce confidence, legs positioned with poise. Outfit: [PRODUCT_DESCRIPTION]. Contemporary lighting emphasizing body lines. Model radiates professional energy. IMPORTANT: Maintain facial identity.',
        'A photorealistic full-body editorial portrait of this exact same person, keeping identical facial structure. Laying on a white surface in a seamless white studio. Pose: body relaxed yet commanding, hands positioned naturally, gaze upward or into camera with composed intensity. Outfit: [PRODUCT_DESCRIPTION]. Clean lighting with soft shadows. Model looks elevated and relaxed. IMPORTANT: Preserve same face.',
    ],
};

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.POSES = POSES;
    window.POSE_PROMPTS = POSE_PROMPTS;
}
