/**
 * Editorial Poses Library
 * 50 high-fashion poses for white studio photography
 * Each pose has male and female versions
 */

// Base studio prompt suffix - ensures color, high-end fashion with varied lighting
const STUDIO_SUFFIX = 'White seamless studio background with professional fashion photography lighting including natural shadows and depth, photorealistic, shot on medium format camera, vivid full color photograph, natural matte skin with no shine or oil, professional color grading, single model only, editorial fashion photography.';

// Clothing descriptions
// Female: Black top (sweater/tank/tee/hoodie) + White bottom (pants/skirt)
// Male: White top (sweater/tank/tee/hoodie) + Black bottom (pants/trousers)
const FEMALE_OUTFIT = 'Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt';
const MALE_OUTFIT = 'Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers';

// ═══════════════════════════════════════════════════════════════
// FEMALE POSES (50)
// ═══════════════════════════════════════════════════════════════

const EDITORIAL_POSES_FEMALE = [
    // ─────────────────────────────────────────────────────────────
    // STANDING (15)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'contrapposto-classic',
        name: 'Contrapposto Classic',
        category: 'standing',
        prompt: `Full-body portrait of a female model in contrapposto stance, weight shifted to right leg, left knee slightly bent, hips tilted naturally, arms relaxed at sides with soft fingers, shoulders dropped, direct confident gaze at camera. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hand-on-hip-fierce',
        name: 'Hand on Hip Fierce',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with left hand placed firmly on hip, weight on back leg creating strong S-curve silhouette, right arm relaxed at side, chin lifted with fierce commanding presence, piercing intense gaze, powerful runway energy. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'arms-crossed-editorial',
        name: 'Arms Crossed Editorial',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with arms loosely crossed at chest level, weight shifted to one leg, shoulders relaxed but posture strong, head tilted slightly, composed intense gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hands-in-pockets-fierce',
        name: 'Hands in Pockets Fierce',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with both hands in pockets, weight shifted to one hip, shoulders back with commanding posture, chin lifted, fierce intense gaze at camera, powerful confident energy. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'one-hand-pocket-asymmetric',
        name: 'One Hand Pocket Asymmetric',
        category: 'standing',
        prompt: `Full-body portrait of a female model with one hand in pocket, other arm relaxed at side with soft hand, asymmetric weight distribution, hip pushed slightly, natural head tilt, subtle knowing expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'both-hands-on-hips-power',
        name: 'Both Hands on Hips Power',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with both hands planted firmly on hips, feet shoulder-width apart in power stance, chest open and proud, shoulders pulled back, fierce commanding presence, piercing intense gaze that demands attention, dominant runway energy. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'arms-behind-back-elegant',
        name: 'Arms Behind Back Elegant',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with arms clasped loosely behind back, elongated posture, weight forward slightly, chin lifted elegantly, serene confident expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'shoulder-drop-relaxed',
        name: 'Shoulder Drop Relaxed',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with one shoulder dropped lower, creating natural asymmetry, weight shifted, arms loose at sides, head tilted toward dropped shoulder, relaxed editorial gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'weight-shift-s-curve',
        name: 'Weight Shift S-Curve',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with exaggerated S-curve silhouette, hip pushed out dramatically to one side, weight fully shifted creating strong angular pose, torso creating elegant line, arms hanging naturally, soft but direct gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hand-touching-arm',
        name: 'Hand Touching Arm',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with one hand gently touching opposite upper arm, self-embrace gesture, weight shifted, thoughtful composed expression, intimate but confident. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'model-stance-editorial',
        name: 'Model Stance Editorial',
        category: 'standing',
        prompt: `Full-body portrait of a female model in classic model stance, one foot slightly forward, weight on back hip, arms relaxed at sides with elegant fingers, spine elongated, chin slightly lifted, fierce confident runway gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'fingers-interlocked-front',
        name: 'Fingers Interlocked Front',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with fingers loosely interlocked in front of body at waist level, relaxed shoulders, weight distributed evenly, calm composed gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'one-arm-bent-elbow',
        name: 'One Arm Bent Elbow',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with one arm bent at elbow creating angular shape, hand relaxed near hip, other arm straight at side, geometric editorial pose, confident gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hands-at-collar',
        name: 'Hands at Collar',
        category: 'standing',
        prompt: `Full-body portrait of a female model standing with both hands near collar as if adjusting clothing, elbows out creating width, weight shifted, focused downward gaze at hands, intimate moment captured. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'back-view-over-shoulder',
        name: 'Back View Over Shoulder',
        category: 'standing',
        prompt: `Full-body portrait of a female model from behind, body facing away, head turned looking over shoulder at camera, back muscles visible through pose, mysterious alluring gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // SEATED (8)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'seated-lounge-chair',
        name: 'Seated Lounge Chair',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated on white minimalist designer lounge chair in white photo studio, one leg tucked underneath, other relaxed, leaning back into chair, casual but editorial, direct confident gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-aluminum-stool',
        name: 'Seated Aluminum Stool',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated casually on minimalist aluminum bar stool in white photo studio, one foot on stool rung, other on floor, hands resting on thigh, spine straight, relaxed confident expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-chair-relaxed',
        name: 'Seated Chair Relaxed',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated on sleek modern white chair in white photo studio, legs crossed elegantly, one arm on armrest, other hand in lap, chest open, confident relaxed editorial expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-stool-forward-lean',
        name: 'Seated Stool Forward Lean',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated on white minimalist designer stool in white photo studio, leaning forward with elbows on knees, hands loosely clasped, intense direct gaze, intimate confrontational energy. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-chair-sideways',
        name: 'Seated Chair Sideways',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated sideways on white sculptural designer chair in white photo studio, torso twisted toward camera, one arm draped over chair back, legs crossed elegantly, sophisticated knowing gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-cube-perched',
        name: 'Seated Cube Perched',
        category: 'seated',
        prompt: `Full-body portrait of a female model perched on edge of white geometric cube in white photo studio, one leg extended forward heel on ground toe up, other leg tucked back, hands on cube edge for balance, spine elongated, confident editorial gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-ottoman-angular',
        name: 'Seated Ottoman Angular',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated on edge of white designer ottoman in white photo studio, one leg extended to side, other bent, torso upright with editorial posture, one hand on ottoman for support, graceful angular pose. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-bench-relaxed',
        name: 'Seated Bench Relaxed',
        category: 'seated',
        prompt: `Full-body portrait of a female model seated on edge of white designer bench in white photo studio, leaning back on one hand, other arm relaxed on lap, legs together and angled elegantly to side, confident relaxed expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // LEANING (5)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'leaning-shoulder-on-wall',
        name: 'Leaning Shoulder on Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a female model leaning with one shoulder against white painted wood panel wall in white photo studio, arms loosely crossed, weight on back leg, ankles crossed, casual cool confidence. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-back-against-wall',
        name: 'Leaning Back Against Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a female model with back flat against white painted wood panel wall in white photo studio, shoulders and hips pressed to wall, one foot flat against wall knee bent, hands relaxed at sides, casual confident stance. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-doorframe',
        name: 'Leaning in Doorframe',
        category: 'leaning',
        prompt: `Full-body portrait of a female model leaning casually in white doorframe in white photo studio, one shoulder against frame, arms loosely crossed or one hand in pocket, weight shifted to one hip, relaxed confident editorial gaze. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-arm-on-wall',
        name: 'Leaning Arm on Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a female model standing next to white wall in white photo studio, one arm extended resting on wall at shoulder height, body angled away, weight on far leg, looking back at camera with confident gaze, elegant editorial stance. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-hip-against-wall',
        name: 'Leaning Hip Against Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a female model leaning with hip pressed against visible white painted wood panel wall in white photo studio, wall clearly supporting body weight, arms crossed loosely, one leg crossed over other, casual editorial stance, subtle knowing expression. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // MOVEMENT (5)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'runway-walk-mid-stride',
        name: 'Runway Walk Mid-Stride',
        category: 'movement',
        prompt: `Full-body portrait of a female model mid-stride on fashion runway, powerful confident walk, one foot crossing in front of other, arms swinging with purpose, shoulders back, chin lifted, fierce intense gaze directly at camera, high-fashion editorial energy. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-turn',
        name: 'Runway Turn',
        category: 'movement',
        prompt: `Full-body portrait of a female model captured mid-spin during runway turn, motion blur on clothing and hair showing dynamic movement, body rotating with arms swinging, fabric flowing with momentum, fierce gaze toward camera, high-fashion editorial movement captured. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-stride-powerful',
        name: 'Runway Stride Powerful',
        category: 'movement',
        prompt: `Full-body portrait of a female model taking powerful runway stride toward camera in motion, hair bouncing with movement, legs crossing with each step creating dynamic shape, one arm forward one back swinging naturally, shoulders squared, commanding presence, fierce determined expression, high-fashion runway energy captured mid-motion. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'walking-away-glance-back',
        name: 'Walking Away Glance Back',
        category: 'movement',
        prompt: `Full-body portrait of a female model walking away from camera, looking back over shoulder, body in motion, mysterious departing energy, alluring backward glance. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-end-pose',
        name: 'Runway End Pose',
        category: 'movement',
        prompt: `Full-body portrait of a female model at end of runway on white seamless background, one foot forward with knee bent, hand on hip, body angled, fierce confident gaze over shoulder at camera, powerful editorial presence, frozen moment before turning, pure white studio environment. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // PORTRAIT/EXPRESSIVE (7)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'portrait-intense-gaze',
        name: 'Portrait Intense Gaze',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model, shoulders angled, chin slightly lifted, piercing direct eye contact, intense serious expression, strong editorial presence. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-soft-smile',
        name: 'Portrait Soft Smile',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model, relaxed shoulders, genuine soft smile reaching eyes, warm approachable energy, natural beauty moment. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-laughing-joy',
        name: 'Portrait Laughing Joy',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model mid-laugh, genuine joy, eyes crinkled with happiness, head tilted back slightly, authentic moment of pure laughter captured. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-looking-away',
        name: 'Portrait Looking Away',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model with head turned away from camera showing three-quarter profile, eyes gazing into distance away from lens, body facing forward but face turned to the side, contemplative distant expression, mysterious thoughtful mood. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-hand-near-face',
        name: 'Portrait Hand Near Face',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model with one hand gently touching jawline, fingers elegant, arm creating graceful frame, head tilted slightly, soft but confident gaze, natural beauty moment. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-hand-in-hair',
        name: 'Portrait Hand in Hair',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model with one hand casually touching hair near temple, fingers relaxed, subtle natural gesture, head tilted slightly, soft confident gaze, elegant moment. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-eyes-closed-serene',
        name: 'Portrait Eyes Closed Serene',
        category: 'portrait',
        prompt: `Chest-up portrait of a female model with eyes gently closed, face tilted up slightly, serene peaceful expression, meditative calm beauty moment. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // CAMERA ANGLES (10)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'angle-low-frog-perspective',
        name: 'Low Angle Frog Perspective',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot from very low angle near floor looking up, model standing tall with weight on one leg, shoulders back, chin lifted, powerful commanding presence towering over camera, dramatic upward perspective. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-high-looking-down',
        name: 'High Angle Looking Down',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot from above looking down at subject, model looking up at camera, foreshortened perspective, vulnerable yet strong presence. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-slight-low',
        name: 'Slight Low Angle',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot from slightly below eye level, subtle upward angle making model appear taller and more powerful, confident direct gaze downward at camera, commanding presence. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-dutch-tilt-dynamic',
        name: 'Dutch Tilt Dynamic',
        category: 'camera',
        prompt: `Full-body portrait of a female model with camera tilted at dutch angle (15-20 degrees), creating dynamic diagonal composition, energetic unsettled feeling, editorial edge. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-worms-eye-view',
        name: 'Worms Eye View',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot from extreme low angle at ground level looking straight up, model towering dramatically over camera, legs and body elongated by extreme perspective, powerful dominant presence from below. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-fisheye-wide',
        name: 'Fisheye Wide Distortion',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot with fisheye lens effect, curved barrel distortion at edges, exaggerated perspective, center of frame stretched, surreal editorial look. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-wide-environmental',
        name: 'Wide Environmental Studio',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot with ultra-wide lens showing expansive white studio space around subject, model standing small in center of frame, vast empty white space surrounding figure, emphasizing scale and isolation, very zoomed out minimalist composition. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-three-quarter-classic',
        name: 'Three Quarter Classic',
        category: 'camera',
        prompt: `Full-body portrait of a female model at classic three-quarter angle (45 degrees from frontal), flattering perspective showing depth, one shoulder closer to camera, timeless composition. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-profile-silhouette',
        name: 'Profile Silhouette',
        category: 'camera',
        prompt: `Full-body portrait of a female model in pure profile view, side silhouette emphasized, strong jawline and nose visible, dramatic side lighting creating contrast, graphic quality. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-from-behind-mystery',
        name: 'From Behind Mystery',
        category: 'camera',
        prompt: `Full-body portrait of a female model shot from directly behind, back of head and body visible, no face shown, mysterious anonymous quality, emphasis on posture and silhouette. Wearing a black top (sweater, tank top, t-shirt, or hoodie) and white pants or skirt. ${STUDIO_SUFFIX}`
    }
];

// ═══════════════════════════════════════════════════════════════
// MALE POSES (50) - Same poses adapted for male
// ═══════════════════════════════════════════════════════════════

const EDITORIAL_POSES_MALE = [
    // ─────────────────────────────────────────────────────────────
    // STANDING (15)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'contrapposto-classic',
        name: 'Contrapposto Classic',
        category: 'standing',
        prompt: `Full-body portrait of a male model in contrapposto stance, weight shifted to right leg, left knee slightly bent, hips tilted naturally, arms relaxed at sides, shoulders squared, direct confident gaze at camera. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hand-on-hip-fierce',
        name: 'Hand on Hip Fierce',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with left hand placed firmly on hip, weight on back leg creating angular silhouette, right arm relaxed at side, chin lifted with fierce commanding presence, piercing intense gaze, powerful runway energy. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'arms-crossed-editorial',
        name: 'Arms Crossed Editorial',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with arms firmly crossed at chest level, feet planted shoulder-width, shoulders broad, head straight, commanding intense gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hands-in-pockets-fierce',
        name: 'Hands in Pockets Fierce',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with both hands in pockets, weight shifted creating angular stance, shoulders back with commanding posture, chin lifted, fierce intense gaze at camera, powerful confident energy. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'one-hand-pocket-asymmetric',
        name: 'One Hand Pocket Asymmetric',
        category: 'standing',
        prompt: `Full-body portrait of a male model with one hand in pocket, other arm relaxed at side, asymmetric weight distribution, casual cool stance, knowing expression. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'both-hands-on-hips-power',
        name: 'Both Hands on Hips Power',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with both hands planted firmly on hips, feet planted wide in power stance, chest broad and proud, shoulders pulled back, fierce commanding presence, piercing intense gaze that demands attention, dominant runway energy. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'arms-behind-back-elegant',
        name: 'Arms Behind Back Elegant',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with arms clasped behind back, elongated military-like posture, chest forward, chin lifted, dignified composed expression. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'shoulder-drop-relaxed',
        name: 'Shoulder Drop Relaxed',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with one shoulder dropped slightly lower, creating natural asymmetry, weight shifted, arms loose at sides, relaxed editorial gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'weight-shift-s-curve',
        name: 'Weight Shift Stance',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with weight dramatically shifted to one hip creating angular silhouette, hip pushed out to side, torso creating strong angular line, arms hanging naturally, grounded masculine confidence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hand-touching-arm',
        name: 'Hand Touching Arm',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with one hand gripping opposite upper arm, self-assured gesture, weight shifted, thoughtful composed expression, quiet strength. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'model-stance-editorial',
        name: 'Model Stance Editorial',
        category: 'standing',
        prompt: `Full-body portrait of a male model in classic model stance, one foot slightly forward, weight on back hip, arms relaxed at sides, spine elongated, chin slightly lifted, fierce confident runway gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'fingers-interlocked-front',
        name: 'Fingers Interlocked Front',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with fingers loosely interlocked in front of body at waist level, feet planted, calm composed gaze, grounded presence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'one-arm-bent-elbow',
        name: 'One Arm Bent Elbow',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with one arm bent at elbow creating angular shape, hand near hip, other arm straight at side, geometric editorial pose, confident gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'hands-at-collar',
        name: 'Hands at Collar',
        category: 'standing',
        prompt: `Full-body portrait of a male model standing with both hands near collar adjusting clothing, elbows out, weight shifted, focused gaze at hands, intimate grooming moment. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'back-view-over-shoulder',
        name: 'Back View Over Shoulder',
        category: 'standing',
        prompt: `Full-body portrait of a male model from behind, broad back visible, head turned looking over shoulder at camera, strong back muscles suggested through pose, intense backward glance. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // SEATED (8)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'seated-lounge-chair',
        name: 'Seated Lounge Chair',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated on white minimalist designer lounge chair in white photo studio, one leg bent with ankle on knee, other relaxed, leaning back into chair, casual masculine confidence, direct gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-aluminum-stool',
        name: 'Seated Aluminum Stool',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated casually on minimalist aluminum bar stool in white photo studio, one foot on stool rung, other on floor, hands resting on thighs, spine straight, relaxed confident expression. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-chair-relaxed',
        name: 'Seated Chair Relaxed',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated on white sculptural designer armchair in white photo studio, legs apart, one arm on armrest, other hand relaxed on thigh, chest open, confident masculine editorial expression. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-stool-forward-lean',
        name: 'Seated Stool Forward Lean',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated on white minimalist designer stool in white photo studio, leaning forward with elbows on knees, hands clasped, intense direct gaze, confrontational masculine energy. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-chair-sideways',
        name: 'Seated Chair Sideways',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated sideways on white sculptural designer chair in white photo studio, torso twisted toward camera, one arm draped over chair back, legs apart, knowing confident gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-cube-perched',
        name: 'Seated Cube Perched',
        category: 'seated',
        prompt: `Full-body portrait of a male model perched on edge of white geometric cube in white photo studio, legs apart with feet planted wide, elbows resting on knees, hands clasped, spine forward, confident direct editorial gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-ottoman-angular',
        name: 'Seated Ottoman Angular',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated on edge of low white ottoman in white photo studio, legs wide apart with knees bent at 90 degrees feet flat on floor, leaning forward slightly with elbows on knees, hands loosely clasped, direct confident masculine gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'seated-bench-relaxed',
        name: 'Seated Bench Relaxed',
        category: 'seated',
        prompt: `Full-body portrait of a male model seated on edge of white designer bench in white photo studio, leaning forward with elbows on knees, hands clasped, direct confident gaze, relaxed masculine presence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // LEANING (5)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'leaning-shoulder-on-wall',
        name: 'Leaning Shoulder on Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a male model leaning with one shoulder against white painted wood panel wall in white photo studio, arms crossed, weight on back leg, ankles crossed, cool masculine confidence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-back-against-wall',
        name: 'Leaning Back Against Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a male model with back flat against white painted wood panel wall in white photo studio, shoulders and back pressed firmly to wall, one foot flat against wall knee bent, hands in pockets or at sides, relaxed masculine confidence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-doorframe',
        name: 'Leaning in Doorframe',
        category: 'leaning',
        prompt: `Full-body portrait of a male model leaning casually in white doorframe in white photo studio, one shoulder against frame, arms crossed or hands in pockets, weight shifted to one hip, relaxed confident editorial gaze. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-arm-on-wall',
        name: 'Leaning Arm on Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a male model leaning against visible white painted wood panel wall in white photo studio, forearm pressed flat against wall above head supporting body weight, other hand in pocket, hips angled toward camera, casual masculine confidence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'leaning-hip-against-wall',
        name: 'Leaning Hip Against Wall',
        category: 'leaning',
        prompt: `Full-body portrait of a male model leaning with hip and side pressed firmly against visible white painted wood panel wall in white photo studio, wall clearly visible and supporting body weight, arms crossed, one ankle crossed over other, casual editorial stance. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // MOVEMENT (5)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'runway-walk-mid-stride',
        name: 'Runway Walk Mid-Stride',
        category: 'movement',
        prompt: `Full-body portrait of a male model mid-stride on fashion runway, powerful confident walk, arms swinging with purpose, shoulders back, chin lifted, fierce intense gaze directly at camera, high-fashion editorial energy. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-turn',
        name: 'Runway Turn',
        category: 'movement',
        prompt: `Full-body portrait of a male model captured mid-spin during runway turn, motion blur on clothing showing dynamic movement, body rotating with arms in motion, fabric flowing with momentum, fierce gaze toward camera, high-fashion editorial movement captured. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-stride-powerful',
        name: 'Runway Stride Powerful',
        category: 'movement',
        prompt: `Full-body portrait of a male model taking powerful runway stride toward camera in motion, body in fluid movement, legs crossing with each step creating dynamic shape, one arm forward one back swinging naturally, shoulders squared, commanding masculine presence, fierce determined expression, high-fashion runway energy captured mid-motion. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'walking-away-glance-back',
        name: 'Walking Away Glance Back',
        category: 'movement',
        prompt: `Full-body portrait of a male model walking away from camera, looking back over shoulder, body in motion, mysterious departing energy, intense backward glance. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'runway-end-pose',
        name: 'Runway End Pose',
        category: 'movement',
        prompt: `Full-body portrait of a male model at end of runway on white seamless background, one foot forward with weight shifted, hand in pocket, body angled, fierce confident gaze at camera, powerful editorial presence, frozen moment, pure white studio environment. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // PORTRAIT/EXPRESSIVE (7)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'portrait-intense-gaze',
        name: 'Portrait Intense Gaze',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model, shoulders squared, chin level, piercing direct eye contact, intense serious expression, strong masculine presence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-soft-smile',
        name: 'Portrait Soft Smile',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model, relaxed shoulders, genuine soft smile, warm approachable energy, natural masculine charm. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-laughing-joy',
        name: 'Portrait Laughing Joy',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model mid-laugh, genuine joy, eyes crinkled with happiness, head tilted back, authentic moment of laughter captured. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-looking-away',
        name: 'Portrait Looking Away',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model with head turned away from camera showing three-quarter profile, eyes gazing into distance away from lens, body facing forward but face turned to the side, contemplative distant expression, mysterious thoughtful mood. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-hand-near-face',
        name: 'Portrait Hand Near Face',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model with one hand casually near jawline, relaxed fingers, head tilted slightly, confident direct gaze, natural masculine moment. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-hand-in-hair',
        name: 'Portrait Hand in Hair',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model with one hand casually touching hair, fingers relaxed, subtle natural gesture, confident direct gaze, natural masculine moment. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'portrait-eyes-closed-serene',
        name: 'Portrait Eyes Closed Serene',
        category: 'portrait',
        prompt: `Chest-up portrait of a male model with eyes gently closed, face calm, serene peaceful expression, meditative masculine stillness. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },

    // ─────────────────────────────────────────────────────────────
    // CAMERA ANGLES (10)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'angle-low-frog-perspective',
        name: 'Low Angle Frog Perspective',
        category: 'camera',
        prompt: `Full-body portrait of a single male model shot from very low angle near floor looking up, model standing tall with weight on one leg, shoulders back, chin lifted, powerful commanding presence towering over camera, dramatic upward perspective. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-high-looking-down',
        name: 'High Angle Looking Down',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot from above looking down at subject, model looking up at camera, foreshortened perspective, strong presence despite angle. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-slight-low',
        name: 'Slight Low Angle',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot from slightly below eye level, camera positioned low looking up at model, subtle upward angle making model appear taller and more powerful, model standing with weight shifted hands relaxed at sides, confident direct gaze downward at camera, commanding masculine presence. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-dutch-tilt-dynamic',
        name: 'Dutch Tilt Dynamic',
        category: 'camera',
        prompt: `Full-body portrait of a male model with camera tilted at dutch angle (15-20 degrees), creating dynamic diagonal composition, model standing in confident stance with weight shifted and hands in pockets, energetic editorial edge. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-worms-eye-view',
        name: 'Worms Eye View',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot from extreme low angle at ground level looking straight up, model towering dramatically over camera, legs and body elongated by extreme perspective, powerful dominant masculine presence from below. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-fisheye-wide',
        name: 'Fisheye Wide Distortion',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot with fisheye lens effect, curved barrel distortion at edges, exaggerated perspective, surreal editorial look. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-wide-environmental',
        name: 'Wide Environmental Studio',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot with ultra-wide lens showing expansive white studio space around subject, model standing small in center of frame, vast empty white space surrounding figure, emphasizing scale and isolation, very zoomed out minimalist composition. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-three-quarter-classic',
        name: 'Three Quarter Classic',
        category: 'camera',
        prompt: `Full-body portrait of a male model at classic three-quarter angle (45 degrees from frontal), one shoulder closer to camera, flattering masculine perspective. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-profile-silhouette',
        name: 'Profile Silhouette',
        category: 'camera',
        prompt: `Full-body portrait of a male model in pure profile view, side silhouette emphasized, strong jawline visible, dramatic side lighting, graphic quality. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    },
    {
        id: 'angle-from-behind-mystery',
        name: 'From Behind Mystery',
        category: 'camera',
        prompt: `Full-body portrait of a male model shot from directly behind, broad back visible, no face shown, mysterious anonymous quality, emphasis on masculine silhouette. Wearing a white top (sweater, tank top, t-shirt, or hoodie) and black pants or trousers. ${STUDIO_SUFFIX}`
    }
];

// ═══════════════════════════════════════════════════════════════
// SETSET POSES - For Setset App (42 poses: 6 PDP + 18 Studio + 18 Movement)
// These use Setset-specific framing language for precise crops
// ═══════════════════════════════════════════════════════════════

// Framing constants from Setset - proven to work well
// All start with "Full color photograph" to ensure color output (not black and white)
const FULL_BODY_FRAMING = 'Full color photograph. A photorealistic full-length head-to-toe portrait shot with 50mm lens, front view at eye level, complete figure visible from head to feet including shoes, single model only';
const HALF_BODY_FRAMING = 'Full color photograph. A photorealistic WAIST-UP PORTRAIT ONLY (showing ONLY from natural waist to top of head, NO hips, NO thighs, NO legs visible), medium shot with 85mm lens, cropped at waist as bottom edge, single model only';
const THREE_QUARTER_FRAMING = 'Full color photograph. A photorealistic three-quarter length portrait with 50mm lens showing from mid-thigh to head, legs partially visible but cropped above knees, single model only';
const PORTRAIT_FRAMING = 'Full color photograph. A photorealistic close-up portrait shot with 85mm lens, tight framing from upper chest to top of head, face and upper body emphasis ONLY, STANDING position, single model only';
const PRODUCT_ONLY_FRAMING = 'Full color photograph. A photorealistic detail shot focused on the product';

// Outfit constants - always clothed with shoes
const FEMALE_SETSET_OUTFIT = 'Wearing a black fitted top (sweater, tank top, t-shirt, or hoodie) and white tailored pants or skirt, with minimal black shoes (sneakers or loafers)';
const MALE_SETSET_OUTFIT = 'Wearing a white fitted top (sweater, tank top, t-shirt, or hoodie) and black tailored trousers, with minimal white shoes (sneakers or loafers)';

// Studio background constant - always soft studio lighting and color
const WHITE_STUDIO = 'seamless white photo studio background with soft even studio lighting (no harsh shadows, no dramatic contrast), full color photograph, professional fashion photography';

// ─────────────────────────────────────────────────────────────
// SETSET POSES - FEMALE (42)
// ─────────────────────────────────────────────────────────────

const SETSET_POSES_FEMALE = [
    // ─────────────────────────────────────────────────────────────
    // PDP - Product Display Page (6)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-pdp-front',
        name: 'PDP Front',
        category: 'setset-pdp',
        prompt: `Full color photograph. A photorealistic full-length head-to-toe portrait shot with 50mm lens, front view at eye level, of a female model facing directly toward camera, STANDING upright with arms straight down at sides with precision (space between arms and torso), weight evenly distributed, shoulders back with commanding posture, fierce direct editorial gaze at camera, rigid e-commerce stance, high-fashion model energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. Single model only.`
    },
    {
        id: 'setset-pdp-45-angle',
        name: 'PDP 45° Angle',
        category: 'setset-pdp',
        prompt: `Full color photograph. A photorealistic full-length head-to-toe portrait shot with 50mm lens at eye level of a female model in a STATIC 45-DEGREE ANGLE POSE (three-quarter turn). Body turned precisely 45 degrees from camera showing front, side, and partial back simultaneously. One foot in front of the other with weight on BACK foot. Hips angled AWAY from camera while shoulders rotated BACK toward camera. Space between arms and torso (NEVER press arms against body). Arms relaxed at sides with natural hand positioning (NOT in pockets, NOT crossed). Static rigid catalog stance (NOT walking, NOT moving). Relaxed confident expression looking at camera. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. Single model only. CRITICAL: This is a STATIC STANDING POSE at 45-degree angle - NOT walking, NOT in motion.`
    },
    {
        id: 'setset-pdp-back',
        name: 'PDP Back',
        category: 'setset-pdp',
        prompt: `Full color photograph. A photorealistic full-length head-to-toe portrait shot with 50mm lens, back view with model facing away from camera, at eye level, of a female model facing completely away from camera (180 degree turn), back of clothing fully visible and emphasized, arms relaxed at sides, natural relaxed posture with shoulders back, head facing forward (NOT looking back at camera). ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet showing full back of garment and shoes. Single model only.`
    },
    {
        id: 'setset-pdp-half-body',
        name: 'PDP Half Body',
        category: 'setset-pdp',
        prompt: `Full color photograph. WAIST-UP ONLY - camera framing crops at natural waist. A photorealistic medium close-up portrait with 85mm lens of a female model from WAIST TO HEAD ONLY. Frame starts at waist and ends at top of head. NO LEGS VISIBLE AT ALL - frame is cropped at waist as bottom edge. Front-facing view at eye level, shoulders relaxed but posture strong, arms relaxed (hands may rest at sides or be partially out of frame), confident direct gaze at camera. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Single model only. CRITICAL: Image MUST be cropped at waist - DO NOT show legs, hips, or anything below the natural waistline. This is a HALF BODY shot from waist up only.`
    },
    {
        id: 'setset-pdp-portrait',
        name: 'PDP Portrait',
        category: 'setset-pdp',
        prompt: `Full color photograph. CHEST-UP PORTRAIT ONLY - camera framing shows upper chest to head. A photorealistic close-up portrait with 85mm lens of a female model from UPPER CHEST TO HEAD ONLY at EYE LEVEL (camera at same height as model's eyes). Shoulders squared facing camera, chin level, fierce editorial gaze looking straight into camera. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Single model only. CRITICAL: Tight portrait framing from upper chest to top of head only. Camera MUST be at EYE LEVEL - NOT from above, NOT from below, NOT fisheye, NOT wide angle. Standard eye-level portrait.`
    },
    {
        id: 'setset-pdp-detail',
        name: 'PDP Detail',
        category: 'setset-pdp',
        prompt: `${PRODUCT_ONLY_FRAMING}, extreme close-up of product details on white studio background, fabric texture clearly visible, stitching and construction details, emphasis on material quality and craftsmanship, vivid full color photograph. NO model, product only.`
    },

    // ─────────────────────────────────────────────────────────────
    // STUDIO - Standing/Attitude Poses (18) - ALL STANDING, ALL WITH SHOES
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-studio-arms-crossed',
        name: 'Arms Crossed Editorial',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with arms loosely crossed at chest level, weight shifted to one leg creating natural asymmetry, shoulders relaxed but posture commanding, head tilted slightly, composed intense editorial gaze. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hands-pockets',
        name: 'Hands in Pockets Fierce',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING UPRIGHT facing camera at EYE LEVEL (camera at same height as model), both hands in pockets (implied below frame), shoulders back with commanding posture, chin lifted with fierce intensity, powerful confident runway energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Eye level camera angle - NOT from above, NOT from below. Crop at natural waist, model must be standing.`
    },
    {
        id: 'setset-studio-arms-behind-back',
        name: 'Arms Behind Back Elegant',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING UPRIGHT, FRONT VIEW FACING CAMERA DIRECTLY (camera sees her face and chest, NOT her back). Arms positioned behind her back so hands are NOT visible from the front. Chest pushed forward proudly, shoulders pulled back. Chin lifted with dignified composed expression, looking directly at camera. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must FACE THE CAMERA (we see her face, NOT her back). Her arms are behind her so we cannot see her hands from the front. NOT a prayer pose - hands are BEHIND body, not in front.`
    },
    {
        id: 'setset-studio-shoulder-drop',
        name: 'Shoulder Drop Relaxed',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with natural relaxed posture, one shoulder slightly lower than the other in an effortless asymmetric stance, weight casually shifted to one leg, arms hanging naturally at sides with soft hands, head tilted subtly toward the lower shoulder, calm relaxed confident expression (NOT stiff, NOT intense), easy-going editorial vibe. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Natural relaxed posture - NOT exaggerated, NOT zombie-like, just effortlessly cool.`
    },
    {
        id: 'setset-studio-fingers-interlocked',
        name: 'Fingers Interlocked Front',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with fingers loosely interlocked in front of body at waist level, relaxed shoulders, weight distributed with subtle shift, calm composed editorial gaze, understated elegant presence. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hands-collar',
        name: 'Hands at Collar',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with BOTH hands gently holding/adjusting the collar of her top, fingers lightly gripping the fabric near the neckline, elbows relaxed and down (NOT dramatically raised outward), natural styling gesture, calm neutral expression looking at camera or slightly down at hands, simple elegant moment. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing. Both hands at collar, gesture should be subtle and natural.`
    },
    {
        id: 'setset-studio-back-over-shoulder',
        name: 'Back View Over Shoulder',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING from behind, body facing away from camera, head turned looking over shoulder with mysterious alluring gaze, back visible through elegant posture, powerful departing energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hand-on-hip',
        name: 'Hand on Hip Fierce',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with left hand placed firmly on hip, weight on back leg creating strong s-curve silhouette, right arm relaxed at side, chin lifted with fierce commanding presence, piercing intense runway gaze. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-both-hands-hips',
        name: 'Both Hands on Hips Power',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING UPRIGHT with both hands planted firmly on hips with ATTITUDE, elbows out creating strong angular frame, feet shoulder-width apart in power stance, weight shifted to one hip creating S-curve, chest open and proud, shoulders pulled back, spine straight and tall, chin lifted with FIERCE commanding presence, piercing intense runway model gaze directly at camera, powerful confident energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must have ATTITUDE - confident, powerful, runway model energy.`
    },
    {
        id: 'setset-studio-one-hand-pocket',
        name: 'One Hand Pocket',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with one hand casually in pocket (implied below frame), other arm relaxed at side with soft hand, asymmetric weight distribution, hip pushed slightly creating natural curve, subtle knowing expression. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing.`
    },
    {
        id: 'setset-studio-hair-brush',
        name: 'Brush/Hand in Hair',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING (NOT sitting) with one hand casually running through hair near temple, arm creating graceful elevated frame, weight shifted creating natural s-curve, effortless beauty moment, relaxed confident gaze. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Model must be standing upright.`
    },
    {
        id: 'setset-studio-adjust',
        name: 'Adjust Clothing',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with one hand clearly adjusting the sleeve cuff of her top (pulling it up or straightening it), other hand relaxed or also touching clothing, caught mid-motion in a natural styling gesture, focused gaze looking down at hands or at camera, intimate editorial moment. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be clearly adjusting clothing - hand visibly engaged with sleeve, collar, or fabric.`
    },
    {
        id: 'setset-studio-hand-touching-arm',
        name: 'Hand Touching Arm',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with one hand gently touching opposite upper arm in self-embrace gesture, weight shifted creating soft curve, thoughtful composed expression, intimate yet confident. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-leaning-casual',
        name: 'Casual Lean Weight Shift',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with EXAGGERATED weight shift to one hip, hip pushed dramatically to one side creating strong angular S-curve silhouette, one leg straight bearing all weight with other leg crossed or bent, torso leaning into the hip pop, arms relaxed at sides or one hand casually on hip, head tilted with confident relaxed expression, effortless editorial cool. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must have a HARD LEAN - dramatic hip pop, not subtle.`
    },
    {
        id: 'setset-studio-looking-away',
        name: 'Looking Away',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with head and face TURNED 90 DEGREES TO THE SIDE showing profile or three-quarter profile, EYES LOOKING COMPLETELY AWAY from camera toward the side of frame, pupils and iris pointing LEFT or RIGHT out of frame (NEVER toward camera lens), body facing forward but entire head rotated to look at something off-screen, contemplative distant expression gazing into the distance. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL REQUIREMENT: Model's eyes MUST be looking AWAY from camera - if eyes are looking toward camera lens, this prompt has FAILED. Eyes must look to the LEFT or RIGHT side, completely off-frame.`
    },
    {
        id: 'setset-studio-model-stance',
        name: 'Model Stance Classic',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING in classic runway model T-stance (one foot pointed forward, other foot at 90 degree angle forming a T shape), weight shifted to back foot, hips angled creating natural S-curve, arms relaxed at sides with space between arms and torso, shoulders back, spine elongated, chin slightly lifted with confident runway gaze at camera, professional model posture. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Classic model T-stance with one foot forward.`
    },
    {
        id: 'setset-studio-leaning-back',
        name: 'Leaning Back Casual',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a female model STANDING with weight shifted back, torso leaning slightly backward in relaxed casual stance. Hips forward, shoulders back, creating a subtle curved body line. Arms relaxed at sides or one hand loosely in pocket. Head tilted with fierce confident expression, intense runway attitude. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Relaxed backward lean, NOT stiff or rigid. Fierce expression.`
    },
    {
        id: 'setset-studio-chin-up',
        name: 'Chin Up Confident',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with chin lifted confidently, looking slightly down nose at camera with subtle power dynamic, shoulders back and posture proud, commanding editorial presence, regal attitude. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing.`
    },

    // ─────────────────────────────────────────────────────────────
    // MOVEMENT - Action/Environment/Expressions (18) - ALL WITH SHOES, WHITE STUDIO
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-movement-walking',
        name: 'Walking Mid-Stride',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model walking confidently TOWARD camera (not running) in white photo studio, mid-stride with one foot in front of other, arms swinging naturally at sides, shoulders back, chin lifted, confident direct gaze at camera, walking at normal pace NOT running. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-glance-back',
        name: 'Walking Away Glance Back',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model walking AWAY from camera in white photo studio, camera at eye level (person height NOT from below), looking back over shoulder with mysterious alluring gaze, body walking away creating departing silhouette. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Camera at normal person height, not from below.`
    },
    {
        id: 'setset-movement-runway-turn',
        name: 'Runway Turn',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model captured mid-spin during runway turn in white photo studio, subtle motion blur on clothing and hair showing dynamic movement, body rotating with arms swinging, fabric flowing with momentum, fierce gaze toward camera. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-runway-stride',
        name: 'Runway Stride',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model walking confidently toward camera, mid-stride with one foot forward, arms swinging naturally, shoulders back, confident expression. BACKGROUND: Pure seamless WHITE cyclorama studio backdrop, bright white floor, soft even lighting, no shadows. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Background must be PURE WHITE studio only. NO runway. NO catwalk. NO purple. NO grey. NO colored lighting. NO dramatic lighting. Just clean white studio like a product photo.`
    },
    {
        id: 'setset-movement-spinning',
        name: 'Spinning/Twirling',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model mid-twirl spinning joyfully in white photo studio, arms extended outward, clothing and hair flowing with circular motion, genuine moment of movement and freedom captured, dynamic editorial energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-seated-stool',
        name: 'Seated Aluminum Stool',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model seated casually on minimalist aluminum bar stool in white photo studio, one foot on stool rung other on floor showing shoes, hands resting on thigh, spine straight, relaxed confident expression. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes on feet.`
    },
    {
        id: 'setset-movement-seated-forward',
        name: 'Seated Stool Forward Lean',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model seated on white minimalist stool in white photo studio, leaning forward with elbows on knees, hands loosely clasped, intense direct gaze at camera, intimate confrontational energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must show full body including legs and feet with shoes.`
    },
    {
        id: 'setset-movement-leaning',
        name: 'Leaning',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model leaning casually with back and shoulders against white painted wall in white photo studio, BODY AND FACE FACING DIRECTLY TOWARD CAMERA (not turned away), BOTH FEET flat on the floor (NOT with foot up on wall), hands relaxed at sides or in pockets, weight shifted to one hip, looking straight at camera with casual relaxed confident expression. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Model must FACE CAMERA directly while leaning. Both feet on floor.`
    },
    {
        id: 'setset-movement-leaning-doorframe',
        name: 'Leaning in Doorframe',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model leaning casually in a white painted wooden doorframe inside a white painted house/room setting, one shoulder resting against the door frame, arms loosely crossed or one hand in pocket, weight shifted to one hip, relaxed confident editorial gaze. ${FEMALE_SETSET_OUTFIT}. White painted interior with visible white doorframe. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-floor-seated',
        name: 'Floor Seated/Leaning',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} shot at EYE LEVEL (camera at floor level, NOT from above) of a female model sitting or leaning back casually on white seamless studio floor, legs extended forward or to the side in relaxed natural position, leaning back on one or both hands for support OR sitting upright with hands on knees, looking directly at camera at eye level, relaxed confident editorial expression. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Camera must be at FLOOR LEVEL looking straight at model (NOT from above, NOT overhead bird's eye view).`
    },
    {
        id: 'setset-movement-portrait-intense',
        name: 'Portrait Intense Gaze',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with arms relaxed at sides in neutral position (NOT touching face, NOT dramatic gestures), shoulders facing camera with slight angle, chin level, piercing direct eye contact with confident intensity, serious editorial expression, strong commanding presence. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing with NEUTRAL ARM POSITION - arms at sides or hands in pockets, NO hands near face or dramatic gestures.`
    },
    {
        id: 'setset-movement-portrait-smile',
        name: 'Portrait Soft Smile',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with relaxed shoulders, genuine soft smile reaching the eyes, warm approachable energy, natural beauty moment captured, inviting editorial presence. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed.`
    },
    {
        id: 'setset-movement-portrait-laughing',
        name: 'Portrait Laughing Joy',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING mid-laugh with genuine joy, eyes crinkled with happiness, head tilted back slightly, authentic moment of pure laughter captured, vibrant editorial energy. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed.`
    },
    {
        id: 'setset-movement-portrait-hand-face',
        name: 'Portrait Hand Near Face',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING with one hand gently touching jawline, fingers elegant, arm creating graceful frame around face, head tilted slightly, soft but confident gaze, natural beauty moment. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed.`
    },
    {
        id: 'setset-movement-portrait-looking-down',
        name: 'Portrait Looking Down',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING, photographed from DIRECTLY IN FRONT at chest/shoulder height (horizontal camera angle, lens pointing straight at model's torso). Model's head is tilted downward with eyes looking down, chin dropped, contemplative mood. Camera is positioned in front of model facing her horizontally. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Camera is at CHEST HEIGHT looking HORIZONTALLY at model (like talking to someone). Camera is NOT above model. Camera is NOT looking down. This is NOT an overhead shot. NOT a bird's eye view. Standard portrait photography setup.`
    },
    {
        id: 'setset-movement-portrait-eyes-closed',
        name: 'Portrait Eyes Closed Serene',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a female model STANDING at EYE LEVEL camera angle, eyes gently closed, face tilted up slightly, serene peaceful expression, meditative calm beauty moment, tranquil editorial presence. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Waist-up framing only. Model must be standing and fully clothed.`
    },
    {
        id: 'setset-movement-low-angle',
        name: 'Low Angle Frog Perspective',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} shot from very low angle near floor looking up at female model standing tall in white photo studio, weight on one leg, shoulders back, chin lifted, powerful commanding presence towering over camera, dramatic upward perspective creating heroic effect. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-three-quarter',
        name: 'Three Quarter Turn',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a female model in a CONFIDENT THREE-QUARTER TURN pose. Body positioned at 45 degrees to camera (three-quarter angle), one shoulder closer to camera creating depth. Weight shifted to back foot with confident posture. Head turned toward camera with direct confident gaze. Arms relaxed at sides or one hand on hip. This is a POISED standing pose showing confident body language, NOT a dance move, NOT spinning. ${FEMALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Confident editorial pose at three-quarter angle - NOT dancing, NOT spinning, just confident poised standing.`
    }
];

// ─────────────────────────────────────────────────────────────
// SETSET POSES - MALE (42)
// ─────────────────────────────────────────────────────────────

const SETSET_POSES_MALE = [
    // ─────────────────────────────────────────────────────────────
    // PDP - Product Display Page (6)
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-pdp-front',
        name: 'PDP Front',
        category: 'setset-pdp',
        prompt: `${FULL_BODY_FRAMING} of a male model facing directly toward camera, arms straight down at sides with precision, weight evenly distributed, shoulders squared and back with commanding posture, fierce direct gaze at camera with powerful intensity, rigid e-commerce stance. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-pdp-45-angle',
        name: 'PDP 45° Angle',
        category: 'setset-pdp',
        prompt: `Full color photograph. A photorealistic full-length head-to-toe portrait shot with 50mm lens at eye level of a male model in a STATIC 45-DEGREE ANGLE POSE (three-quarter turn). Body turned precisely 45 degrees from camera showing front, side, and partial back simultaneously. One foot in front of the other with weight on BACK foot. Hips angled AWAY from camera while shoulders rotated BACK toward camera. Space between arms and torso (NEVER press arms against body). Arms relaxed at sides with natural hand positioning (NOT in pockets, NOT crossed). Static rigid catalog stance (NOT walking, NOT moving). Relaxed confident expression looking at camera. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. Single model only. CRITICAL: This is a STATIC STANDING POSE at 45-degree angle - NOT walking, NOT in motion.`
    },
    {
        id: 'setset-pdp-back',
        name: 'PDP Back',
        category: 'setset-pdp',
        prompt: `${FULL_BODY_FRAMING} of a male model from behind showing FULL BACK VIEW (model facing completely away from camera), back of clothing fully visible and emphasized, natural relaxed posture with shoulders back, arms relaxed at sides, head facing FORWARD in same direction as body (NOT looking back at camera, NOT turning head), showing back of head and back of outfit only. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Model must face AWAY - no looking back, no head turn, just pure back view.`
    },
    {
        id: 'setset-pdp-half-body',
        name: 'PDP Half Body',
        category: 'setset-pdp',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING upright, front-facing view, shoulders squared and strong, arms at sides or hands in pockets, confident direct gaze at camera, eyes positioned in top third of frame. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Crop at natural waist, NO legs visible.`
    },
    {
        id: 'setset-pdp-portrait',
        name: 'PDP Portrait',
        category: 'setset-pdp',
        prompt: `${PORTRAIT_FRAMING} of a male model STANDING upright (NOT sitting), tight close-up on face and upper body, shoulders squared, chin level, fierce editorial gaze directly into camera, powerful confident masculine expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Tight crop from upper chest to top of head only, model must be standing.`
    },
    {
        id: 'setset-pdp-detail',
        name: 'PDP Detail',
        category: 'setset-pdp',
        prompt: `${PRODUCT_ONLY_FRAMING}, extreme close-up of product details on white studio background, fabric texture clearly visible, stitching and construction details, emphasis on material quality and craftsmanship, vivid full color photograph. NO model, product only.`
    },

    // ─────────────────────────────────────────────────────────────
    // STUDIO - Standing/Attitude Poses (18) - ALL STANDING, ALL WITH SHOES
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-studio-arms-crossed',
        name: 'Arms Crossed Editorial',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with arms firmly crossed at chest level, feet planted shoulder-width apart, shoulders broad and squared, head straight, commanding intense editorial gaze. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hands-pockets',
        name: 'Hands in Pockets Fierce',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with both hands in pockets (implied below frame), shoulders squared with commanding posture, chin lifted with fierce intensity, powerful confident runway energy. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Crop at natural waist, model must be standing.`
    },
    {
        id: 'setset-studio-arms-behind-back',
        name: 'Arms Behind Back Elegant',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING UPRIGHT, FRONT VIEW FACING CAMERA DIRECTLY (camera sees his face and chest, NOT his back). Arms positioned behind his back so hands are NOT visible from the front. Chest pushed forward proudly, shoulders pulled back. Chin lifted with dignified composed expression, looking directly at camera. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must FACE THE CAMERA (we see his face, NOT his back). His arms are behind him so we cannot see his hands from the front.`
    },
    {
        id: 'setset-studio-shoulder-drop',
        name: 'Shoulder Drop Relaxed',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with natural relaxed posture, one shoulder slightly lower than the other in an effortless asymmetric stance, weight casually shifted to one leg, arms hanging naturally at sides, head tilted subtly toward the lower shoulder, calm relaxed confident expression (NOT stiff, NOT intense), easy-going editorial vibe. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Natural relaxed posture - NOT exaggerated, NOT zombie-like, just effortlessly cool.`
    },
    {
        id: 'setset-studio-fingers-interlocked',
        name: 'Fingers Interlocked Front',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with fingers loosely interlocked in front of body at waist level, feet planted, calm composed editorial gaze, grounded masculine presence. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hands-collar',
        name: 'Hands at Collar',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with ONE hand casually near collar as if making a small adjustment to neckline, other arm relaxed at side, elbows down in natural position (NOT dramatically raised), subtle understated gesture, calm neutral expression looking at camera OR slightly down, simple elegant moment. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing. Gesture should be subtle and natural, NOT dramatic or exaggerated.`
    },
    {
        id: 'setset-studio-back-over-shoulder',
        name: 'Back View Over Shoulder',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING from behind, broad back visible, head turned looking over shoulder at camera with intense backward glance, powerful departing energy. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-hand-on-hip',
        name: 'Hand on Hip Fierce',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with left hand placed firmly on hip, weight on back leg creating angular silhouette, right arm relaxed at side, chin lifted with fierce commanding presence, piercing intense runway gaze. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-both-hands-hips',
        name: 'Both Hands on Hips Power',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING UPRIGHT with ATTITUDE, both hands planted firmly on hips with elbows out creating strong angular frame, feet planted wide in dominant power stance, chest broad and proud, shoulders pulled back, spine straight and tall, chin lifted with FIERCE commanding masculine presence, piercing intense runway model gaze directly at camera with dominant energy, powerful confident body language. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must have ATTITUDE - dominant, powerful, commanding runway model energy.`
    },
    {
        id: 'setset-studio-one-hand-pocket',
        name: 'One Hand Pocket',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with one hand casually in pocket (implied below frame), other arm relaxed at side, asymmetric weight distribution, casual cool masculine stance, knowing expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing.`
    },
    {
        id: 'setset-studio-hair-brush',
        name: 'Brush/Hand in Hair',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING (NOT sitting) with one hand casually running through hair, arm creating angular frame, weight shifted creating masculine stance, effortless grooming moment, relaxed confident gaze. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Model must be standing upright.`
    },
    {
        id: 'setset-studio-adjust',
        name: 'Adjust Clothing',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING in mid-gesture adjusting clothing at sleeve cuff or collar, hands engaged with garment, natural movement captured, intimate styling moment, focused downward or sideways gaze. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing.`
    },
    {
        id: 'setset-studio-hand-touching-arm',
        name: 'Hand Touching Arm',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with one hand gripping opposite upper arm in self-assured gesture, weight shifted, thoughtful composed expression, quiet masculine strength. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-studio-leaning-casual',
        name: 'Casual Lean Weight Shift',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with EXAGGERATED weight shift to one hip, hip pushed DRAMATICALLY to one side creating strong angular silhouette, one leg straight bearing all weight with other leg crossed or bent, torso leaning hard into the hip pop, arms relaxed at sides or one hand casually in pocket, head tilted with confident relaxed expression, effortless editorial cool with visible HARD LEAN. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must have a HARD LEAN - dramatic hip pop, NOT subtle.`
    },
    {
        id: 'setset-studio-looking-away',
        name: 'Looking Away',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with head and face TURNED 90 DEGREES TO THE SIDE showing profile or three-quarter profile, EYES LOOKING COMPLETELY AWAY from camera toward the side of frame, pupils and iris pointing LEFT or RIGHT out of frame (NEVER toward camera lens), body facing forward but entire head rotated to look at something off-screen, contemplative distant expression gazing into the distance. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL REQUIREMENT: Model's eyes MUST be looking AWAY from camera - if eyes are looking toward camera lens, this prompt has FAILED. Eyes must look to the LEFT or RIGHT side, completely off-frame.`
    },
    {
        id: 'setset-studio-model-stance',
        name: 'Model Stance Classic',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING in classic runway model T-stance (one foot pointed forward, other foot at 90 degree angle forming a T shape), weight shifted to back foot, hips slightly angled, arms relaxed at sides with space between arms and torso, spine elongated and tall, shoulders back, chin level with confident runway gaze directly at camera, professional polished model posture. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Classic model T-stance with one foot forward.`
    },
    {
        id: 'setset-studio-leaning-back',
        name: 'Leaning Back Casual',
        category: 'setset-studio',
        prompt: `${FULL_BODY_FRAMING} of a male model STANDING with weight shifted back, upper body leaning backward with head tilted back looking upward or to the side. Hips pushed slightly forward, creating a relaxed curved body line. Arms relaxed at sides. Effortless cool laid-back editorial energy, like casually looking up at the sky. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Head tilted BACK, relaxed backward lean like the model is gazing upward casually.`
    },
    {
        id: 'setset-studio-chin-up',
        name: 'Chin Up Confident',
        category: 'setset-studio',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with chin lifted confidently, looking slightly down nose at camera with subtle power dynamic, shoulders back and posture proud, commanding masculine editorial presence, regal attitude. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing.`
    },

    // ─────────────────────────────────────────────────────────────
    // MOVEMENT - Action/Environment/Expressions (18) - ALL WITH SHOES, WHITE STUDIO
    // ─────────────────────────────────────────────────────────────
    {
        id: 'setset-movement-walking',
        name: 'Walking Mid-Stride',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model walking confidently TOWARD camera (not running) in white photo studio, mid-stride with one foot in front of other, arms swinging naturally at sides, shoulders back, chin lifted, confident direct gaze at camera, walking at normal pace NOT running. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-glance-back',
        name: 'Walking Away Glance Back',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model walking AWAY from camera in white photo studio, camera at eye level (person height NOT from below), looking back over shoulder with intense backward glance, body walking away creating departing silhouette, arms swinging naturally at sides (NOT in pockets). ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Camera at normal person height, hands NOT in pockets.`
    },
    {
        id: 'setset-movement-runway-turn',
        name: 'Runway Turn',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model captured mid-spin during runway turn in white photo studio, subtle motion blur on clothing showing dynamic movement, body rotating with arms in motion, fabric flowing with momentum, fierce gaze toward camera. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-runway-stride',
        name: 'Runway Stride',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model taking elegant runway stride toward camera in WHITE PHOTO STUDIO, mid-step with natural confident walking motion, legs crossing slightly with each step, arms swinging naturally at sides (NOT dramatically), shoulders back with good posture, calm confident expression with subtle attitude (NOT fierce, NOT harsh), effortless editorial walk. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Expression should be confident but NOT aggressive - subtle editorial attitude, not harsh.`
    },
    {
        id: 'setset-movement-spinning',
        name: 'Spinning/Twirling',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model mid-twirl spinning dynamically in white photo studio, arms extended outward, clothing flowing with circular motion, genuine moment of movement and energy captured, dynamic editorial expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-seated-stool',
        name: 'Seated Aluminum Stool',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model seated casually on minimalist aluminum bar stool in white photo studio, one foot on stool rung other on floor showing shoes, hands resting on thighs, spine straight, relaxed confident masculine expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes on feet.`
    },
    {
        id: 'setset-movement-seated-forward',
        name: 'Seated Stool Forward Lean',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model seated on white minimalist stool in white photo studio, leaning forward with elbows on knees, hands clasped, intense direct gaze at camera, confrontational masculine energy. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Must show full body including legs and feet with shoes.`
    },
    {
        id: 'setset-movement-leaning',
        name: 'Leaning',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model leaning casually with back and shoulders against white painted wall in white photo studio, BODY AND FACE FACING DIRECTLY TOWARD CAMERA (not turned away), BOTH FEET flat on the floor (NOT with foot up on wall), hands in pockets or relaxed at sides, weight shifted to one hip, looking STRAIGHT AT CAMERA with casual relaxed confident expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Model must FACE CAMERA directly while leaning. Both feet on floor.`
    },
    {
        id: 'setset-movement-leaning-doorframe',
        name: 'Leaning in Doorframe',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model leaning casually in a white painted wooden doorframe inside a white painted house/room setting, one shoulder resting against the door frame, arms crossed or hands in pockets, weight shifted to one hip, relaxed confident editorial gaze. ${MALE_SETSET_OUTFIT}. White painted interior with visible white doorframe. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-floor-seated',
        name: 'Floor Seated/Leaning',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} shot at EYE LEVEL (camera at floor level, NOT from above) of a male model sitting or leaning back casually on white seamless studio floor, legs extended forward or to the side in relaxed natural position, leaning back on one or both hands for support OR sitting upright with hands on knees, looking directly at camera at eye level, relaxed confident editorial expression. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Camera must be at FLOOR LEVEL looking straight at model (NOT from above, NOT overhead bird's eye view).`
    },
    {
        id: 'setset-movement-portrait-intense',
        name: 'Portrait Intense Gaze',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with arms relaxed at sides in neutral position (NOT touching face, NOT dramatic gestures), shoulders squared creating strong frame, chin level, piercing direct eye contact with confident intensity, serious editorial expression, strong masculine commanding presence. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing with NEUTRAL ARM POSITION - arms at sides or hands in pockets, NO hands near face or dramatic gestures.`
    },
    {
        id: 'setset-movement-portrait-smile',
        name: 'Portrait Soft Smile',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with relaxed shoulders, genuine soft smile, warm approachable energy, natural masculine charm captured, inviting editorial presence. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed with shirt.`
    },
    {
        id: 'setset-movement-portrait-laughing',
        name: 'Portrait Laughing Joy',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING mid-laugh with genuine joy, eyes crinkled with happiness, head tilted back, authentic moment of laughter captured, vibrant editorial energy. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed with shirt.`
    },
    {
        id: 'setset-movement-portrait-hand-face',
        name: 'Portrait Hand Near Face',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with one hand casually near jawline, relaxed fingers, head tilted slightly, confident direct gaze, natural masculine moment. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed with shirt.`
    },
    {
        id: 'setset-movement-portrait-looking-down',
        name: 'Portrait Looking Down',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with head tilted downward, eyes cast down in contemplative moment, strong jawline highlighted by angle, intimate introspective editorial mood. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and fully clothed with shirt.`
    },
    {
        id: 'setset-movement-portrait-eyes-closed',
        name: 'Portrait Eyes Closed Serene',
        category: 'setset-movement',
        prompt: `${HALF_BODY_FRAMING} of a male model STANDING with eyes gently closed, face calm, serene peaceful expression, meditative masculine stillness, tranquil editorial presence. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. CRITICAL: Model must be standing and FULLY CLOTHED with shirt - NO bare chest.`
    },
    {
        id: 'setset-movement-low-angle',
        name: 'Low Angle Frog Perspective',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} shot from very low angle near floor looking up at male model standing tall in white photo studio, weight on one leg, shoulders back, chin lifted, powerful commanding masculine presence towering over camera, dramatic upward perspective creating heroic effect. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes.`
    },
    {
        id: 'setset-movement-three-quarter',
        name: 'Three Quarter Turn',
        category: 'setset-movement',
        prompt: `${FULL_BODY_FRAMING} of a male model in a CONFIDENT THREE-QUARTER TURN pose. Body positioned at 45 degrees to camera (three-quarter angle), one shoulder closer to camera creating depth. Weight shifted to back foot with confident masculine posture. Head turned toward camera with direct confident gaze. Arms relaxed at sides or one hand in pocket. This is a POISED standing pose showing confident body language, NOT a dance move, NOT spinning. ${MALE_SETSET_OUTFIT}. ${WHITE_STUDIO}. Complete figure visible from head to feet including shoes. CRITICAL: Confident editorial pose at three-quarter angle - NOT dancing, NOT spinning, just confident poised standing.`
    }
];

// Category definitions for UI
const POSE_CATEGORIES = [
    { id: 'standing', name: 'Standing', count: 15 },
    { id: 'seated', name: 'Seated', count: 8 },
    { id: 'leaning', name: 'Leaning', count: 5 },
    { id: 'movement', name: 'Movement', count: 5 },
    { id: 'portrait', name: 'Portrait', count: 7 },
    { id: 'camera', name: 'Camera Angles', count: 10 }
];

// Setset-specific categories
const SETSET_POSE_CATEGORIES = [
    { id: 'setset-pdp', name: 'PDP', count: 6 },
    { id: 'setset-studio', name: 'Studio', count: 18 },
    { id: 'setset-movement', name: 'Movement', count: 18 }
];

// Helper functions
function getPoseById(id, gender = 'female') {
    const poses = gender === 'female' ? EDITORIAL_POSES_FEMALE : EDITORIAL_POSES_MALE;
    return poses.find(p => p.id === id);
}

function getPosesByCategory(category, gender = 'female') {
    const poses = gender === 'female' ? EDITORIAL_POSES_FEMALE : EDITORIAL_POSES_MALE;
    return poses.filter(p => p.category === category);
}

// Setset-specific helper functions
function getSetsetPoseById(id, gender = 'female') {
    const poses = gender === 'female' ? SETSET_POSES_FEMALE : SETSET_POSES_MALE;
    return poses.find(p => p.id === id);
}

function getSetsetPosesByCategory(category, gender = 'female') {
    const poses = gender === 'female' ? SETSET_POSES_FEMALE : SETSET_POSES_MALE;
    return poses.filter(p => p.category === category);
}

// Get all poses combined (original + setset) for pose generator
function getAllPoses(gender = 'female') {
    const original = gender === 'female' ? EDITORIAL_POSES_FEMALE : EDITORIAL_POSES_MALE;
    const setset = gender === 'female' ? SETSET_POSES_FEMALE : SETSET_POSES_MALE;
    return [...original, ...setset];
}

// Export for use
if (typeof window !== 'undefined') {
    window.EDITORIAL_POSES_FEMALE = EDITORIAL_POSES_FEMALE;
    window.EDITORIAL_POSES_MALE = EDITORIAL_POSES_MALE;
    window.SETSET_POSES_FEMALE = SETSET_POSES_FEMALE;
    window.SETSET_POSES_MALE = SETSET_POSES_MALE;
    window.POSE_CATEGORIES = POSE_CATEGORIES;
    window.SETSET_POSE_CATEGORIES = SETSET_POSE_CATEGORIES;
    window.getPoseById = getPoseById;
    window.getPosesByCategory = getPosesByCategory;
    window.getSetsetPoseById = getSetsetPoseById;
    window.getSetsetPosesByCategory = getSetsetPosesByCategory;
    window.getAllPoses = getAllPoses;
}
