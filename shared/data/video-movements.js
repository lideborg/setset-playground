// Video Movement Types for Seedance Image-to-Video
// Each movement has a description used for AI prompt enhancement

const VIDEO_MOVEMENTS = [
    // SUBTLE / EDITORIAL
    {
        id: 'minimal',
        name: 'Minimal',
        category: 'subtle',
        description: 'Almost completely frozen, only breathing visible',
        fallbackPrompt: 'The model stands completely still, frozen like a statue. Only the faintest breathing is visible. No movement at all except slight chest rise. Like a living photograph. Extremely minimal, almost imperceptible motion.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Minimal.mp4'
    },
    {
        id: 'spin',
        name: 'Spin',
        category: 'subtle',
        description: 'One slow, controlled 360-degree rotation',
        fallbackPrompt: 'The model does one single slow 360-degree turn. Very controlled, deliberate pace. No extra movements, just the rotation. Elegant and minimal.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_360.mp4'
    },
    {
        id: 'half-turn',
        name: 'Half Turn',
        category: 'subtle',
        description: 'One slow 180-degree turn, then freezes',
        fallbackPrompt: 'The model does one slow 180-degree turn from front to back, then freezes completely. Single deliberate movement, nothing more.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HalfTurn.mp4'
    },
    {
        id: 'soft-smile',
        name: 'Soft Smile',
        category: 'subtle',
        description: 'Corners of mouth lift slightly into a subtle smile, otherwise still',
        fallbackPrompt: 'The model is almost completely still. Only the corners of the mouth lift very slightly into a subtle smile. One slow blink. No other movement. Extremely minimal.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Smile.mp4'
    },
    {
        id: 'adjust',
        name: 'Adjust',
        category: 'subtle',
        description: 'One small, slow touch to collar or sleeve, then still',
        fallbackPrompt: 'The model makes one small, slow gesture to touch the collar or adjust a sleeve. Just one touch, very gentle and deliberate. Then freezes. Minimal movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Adjust.mp4'
    },
    {
        id: 'over-shoulder',
        name: 'Over Shoulder',
        category: 'subtle',
        description: 'One slow glance over shoulder, head turns slightly',
        fallbackPrompt: 'The model slowly turns head to glance over one shoulder. Just the head moves, body stays still. One slow deliberate look. Very subtle, controlled movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_OverShoulder.mp4'
    },
    {
        id: 'chin-tilt',
        name: 'Chin Tilt',
        category: 'subtle',
        description: 'Chin lifts slightly, just a few degrees, very slow',
        fallbackPrompt: 'The model slowly lifts chin just a few degrees. Extremely subtle movement, barely noticeable. Only the chin moves slightly upward. Everything else frozen.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ChinTilt.mp4'
    },
    {
        id: 'gaze-shift',
        name: 'Gaze Shift',
        category: 'subtle',
        description: 'Eyes move once to look at camera, head completely still',
        fallbackPrompt: 'The model shifts eyes once to make eye contact with camera. Head stays completely frozen. Only the eyes move, very slowly and deliberately. Extremely minimal.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_GazeShift.mp4'
    },
    {
        id: 'shoulder-drop',
        name: 'Shoulder Drop',
        category: 'subtle',
        description: 'One shoulder drops slightly, barely visible movement',
        fallbackPrompt: 'One shoulder relaxes and drops just slightly. Barely visible movement, almost imperceptible. Everything else frozen. Extremely subtle.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ShoulderDrop.mp4'
    },
    {
        id: 'posture-settle',
        name: 'Posture Settle',
        category: 'subtle',
        description: 'Spine straightens very slightly, minimal adjustment',
        fallbackPrompt: 'The model makes one tiny posture adjustment, spine straightening almost imperceptibly. Barely visible settling into stance. Extremely minimal movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PostureSettle.mp4'
    },
    {
        id: 'hand-drift',
        name: 'Hand Drift',
        category: 'subtle',
        description: 'Fingers move slightly, barely perceptible',
        fallbackPrompt: 'Only the fingers move very slightly, barely perceptible. A tiny drift or curl of the fingers. Rest of body completely frozen. Almost imperceptible motion.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HandDrift.mp4'
    },
    {
        id: 'sway',
        name: 'Sway',
        category: 'subtle',
        description: 'Tiny side-to-side sway, almost imperceptible like breathing',
        fallbackPrompt: 'The model sways just barely, almost imperceptible side-to-side motion like natural breathing. Extremely subtle, barely visible. No other movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Sway.mp4'
    },
    {
        id: 'wind-kiss',
        name: 'Wind Kiss',
        category: 'subtle',
        description: 'Hair or fabric lifts slightly from gentle breeze, body frozen',
        fallbackPrompt: 'A very gentle breeze moves hair or fabric just slightly. The model stays completely frozen and still. Only the hair or fabric moves subtly.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_WindKiss.mp4'
    },
    {
        id: 'pocket-touch',
        name: 'Pocket Touch',
        category: 'subtle',
        description: 'Hands slide slowly into pockets once, then still',
        fallbackPrompt: 'The model slowly slides hands into pockets in one deliberate motion. Then freezes. Single slow gesture, nothing more.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PocketTouch.mp4'
    },

    // DYNAMIC
    {
        id: 'slow-walk',
        name: 'Slow Walk',
        category: 'dynamic',
        description: 'One or two slow, deliberate steps forward',
        fallbackPrompt: 'The model takes one or two very slow, deliberate steps forward. Controlled pace, elegant posture. Just a couple steps, nothing more.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Walking.mp4'
    },
    {
        id: 'hair-touch',
        name: 'Hair Touch',
        category: 'dynamic',
        description: 'One slow touch to hair, then hand returns',
        fallbackPrompt: 'The model makes one slow, gentle touch to the hair. Single deliberate gesture, then hand returns to position. Minimal and controlled.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HairTouch.mp4'
    },

    // COMMERCIAL
    {
        id: 'looking-down',
        name: 'Looking Down',
        category: 'commercial',
        description: 'Gaze lowers slowly, head tilts down slightly',
        fallbackPrompt: 'The model slowly lowers gaze, head tilting down just slightly. One slow deliberate movement. Then holds the pose frozen. Very controlled.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookingDown.mp4'
    },
    {
        id: 'confident',
        name: 'Confident',
        category: 'commercial',
        description: 'Hands move to hips once, then pose held frozen',
        fallbackPrompt: 'The model places hands on hips in one slow movement, then holds the pose completely frozen. Single gesture, then still. Confident but minimal.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Confident.mp4'
    },
    {
        id: 'look-around',
        name: 'Look Around',
        category: 'commercial',
        description: 'One slow glance right, one slow glance left, then forward',
        fallbackPrompt: 'The model glances slowly to the right once, then slowly to the left once, then back to camera. Just two slow head turns. Very deliberate and controlled, minimal movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookAround.mp4'
    },
    {
        id: 'weight-shift',
        name: 'Weight Shift',
        category: 'commercial',
        description: 'Weight shifts to one hip once, subtle change',
        fallbackPrompt: 'The model shifts weight to one hip in a single subtle movement. Just one small weight shift. Then holds frozen. Barely perceptible change in stance.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_WeightShift.mp4'
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

// Export for use
if (typeof window !== 'undefined') {
    window.VIDEO_MOVEMENTS = VIDEO_MOVEMENTS;
    window.getMovementById = getMovementById;
    window.getMovementsByCategory = getMovementsByCategory;
}
