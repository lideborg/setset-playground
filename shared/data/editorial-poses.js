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

// Category definitions for UI
const POSE_CATEGORIES = [
    { id: 'standing', name: 'Standing', count: 15 },
    { id: 'seated', name: 'Seated', count: 8 },
    { id: 'leaning', name: 'Leaning', count: 5 },
    { id: 'movement', name: 'Movement', count: 5 },
    { id: 'portrait', name: 'Portrait', count: 7 },
    { id: 'camera', name: 'Camera Angles', count: 10 }
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

// Export for use
if (typeof window !== 'undefined') {
    window.EDITORIAL_POSES_FEMALE = EDITORIAL_POSES_FEMALE;
    window.EDITORIAL_POSES_MALE = EDITORIAL_POSES_MALE;
    window.POSE_CATEGORIES = POSE_CATEGORIES;
    window.getPoseById = getPoseById;
    window.getPosesByCategory = getPosesByCategory;
}
