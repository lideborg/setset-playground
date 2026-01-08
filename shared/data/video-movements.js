// Video Movement Types for Seedance Image-to-Video
// Each movement has a description used for AI prompt enhancement

const VIDEO_MOVEMENTS = [
    // SUBTLE / EDITORIAL
    {
        id: 'minimal',
        name: 'Minimal',
        category: 'subtle',
        description: 'Standing almost completely still, nearly frozen in place',
        fallbackPrompt: 'The model stands almost completely still, frozen in place with barely any movement. Nearly motionless, like a photograph coming to life. Professional fashion video, steady camera.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Minimal.mp4'
    },
    {
        id: 'spin',
        name: 'Spin',
        category: 'subtle',
        description: 'A smooth 360-degree rotation to showcase the outfit from all angles',
        fallbackPrompt: 'The model does a smooth 360 degree turn to show the outfit from all angles. Professional fashion video, smooth camera work.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_360.mp4'
    },
    {
        id: 'half-turn',
        name: 'Half Turn',
        category: 'subtle',
        description: '180-degree turn from front to back view, then standing still',
        fallbackPrompt: 'The model does a smooth 180 degree turn from front to back view, then stands still. Professional fashion video, elegant movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HalfTurn.mp4'
    },
    {
        id: 'soft-smile',
        name: 'Soft Smile',
        category: 'subtle',
        description: 'Looking at camera with a gentle natural smile, blinking occasionally',
        fallbackPrompt: 'The model looks at camera with a gentle natural smile, blinking occasionally. Professional fashion video, warm and inviting.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Smile.mp4'
    },
    {
        id: 'adjust',
        name: 'Adjust',
        category: 'subtle',
        description: 'Gently touching or adjusting the garment (collar, sleeve, hem)',
        fallbackPrompt: 'The model gently touches and adjusts the garment, fixing the collar or sleeve. Professional fashion video, natural gesture.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Adjust.mp4'
    },
    {
        id: 'over-shoulder',
        name: 'Over Shoulder',
        category: 'subtle',
        description: 'Turns body away from camera, then looks back over shoulder',
        fallbackPrompt: 'The model turns body away from camera, then looks back over shoulder with a confident glance. Professional fashion video, editorial pose.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_OverShoulder.mp4'
    },
    {
        id: 'chin-tilt',
        name: 'Chin Tilt',
        category: 'subtle',
        description: 'Slow chin lift from slightly down to camera level',
        fallbackPrompt: 'The model slowly lifts their chin from a downward angle to camera level, a subtle editorial movement. Professional fashion video, elegant and controlled.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ChinTilt.mp4'
    },
    {
        id: 'gaze-shift',
        name: 'Gaze Shift',
        category: 'subtle',
        description: 'Eyes move from off-camera to direct camera contact, head stays still',
        fallbackPrompt: 'The model shifts their gaze from off-camera to make direct eye contact with the camera, head remaining still. Professional fashion video, captivating and intense.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_GazeShift.mp4'
    },
    {
        id: 'shoulder-drop',
        name: 'Shoulder Drop',
        category: 'subtle',
        description: 'One shoulder relaxes and drops slightly for natural asymmetry',
        fallbackPrompt: 'The model relaxes one shoulder, letting it drop slightly to create natural asymmetry in the pose. Professional fashion video, effortless and relaxed.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_ShoulderDrop.mp4'
    },
    {
        id: 'posture-settle',
        name: 'Posture Settle',
        category: 'subtle',
        description: 'Subtle spine straightening, settling into stance',
        fallbackPrompt: 'The model subtly straightens their spine, settling naturally into their stance with good posture. Professional fashion video, poised and confident.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PostureSettle.mp4'
    },
    {
        id: 'hand-drift',
        name: 'Hand Drift',
        category: 'subtle',
        description: 'Fingers slowly moving or relaxing at sides',
        fallbackPrompt: 'The model\'s fingers slowly move and relax at their sides, a barely perceptible natural gesture. Professional fashion video, calm and composed.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HandDrift.mp4'
    },
    {
        id: 'sway',
        name: 'Sway',
        category: 'subtle',
        description: 'Very gentle side-to-side sway, barely perceptible',
        fallbackPrompt: 'The model sways very gently from side to side, an almost imperceptible movement like breathing. Professional fashion video, serene and natural.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Sway.mp4'
    },
    {
        id: 'wind-kiss',
        name: 'Wind Kiss',
        category: 'subtle',
        description: 'Hair or fabric moves slightly as if touched by soft breeze',
        fallbackPrompt: 'A soft breeze gently moves the model\'s hair or fabric while they hold their pose. Professional fashion video, dreamy and ethereal.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_WindKiss.mp4'
    },
    {
        id: 'pocket-touch',
        name: 'Pocket Touch',
        category: 'subtle',
        description: 'Hands slowly sliding into or out of pockets',
        fallbackPrompt: 'The model slowly slides their hands into their pockets in a casual, natural gesture. Professional fashion video, relaxed and effortless.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_PocketTouch.mp4'
    },

    // DYNAMIC
    {
        id: 'slow-walk',
        name: 'Slow Walk',
        category: 'dynamic',
        description: 'Taking 2-3 elegant steps toward the camera with controlled pace',
        fallbackPrompt: 'The model takes 2-3 elegant steps toward the camera with controlled pace and good posture. Professional fashion video, runway style.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Walking.mp4'
    },
    {
        id: 'hair-touch',
        name: 'Hair Touch',
        category: 'dynamic',
        description: 'Natural gesture with hand near face or through hair',
        fallbackPrompt: 'The model runs hand through hair or touches face in a natural gesture. Professional fashion video, candid movement.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_HairTouch.mp4'
    },

    // COMMERCIAL
    {
        id: 'looking-down',
        name: 'Looking Down',
        category: 'commercial',
        description: 'Looks downward with slight head tilt, contemplative editorial mood',
        fallbackPrompt: 'The model looks downward with a slight head tilt, contemplative and editorial mood. Professional fashion video, introspective.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookingDown.mp4'
    },
    {
        id: 'confident',
        name: 'Confident',
        category: 'commercial',
        description: 'Classic fashion pose with hands on hips, subtle confident movement',
        fallbackPrompt: 'The model strikes a classic fashion pose with hands on hips, subtle confident movement with good posture. Professional fashion video, strong presence.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_Confident.mp4'
    },
    {
        id: 'look-around',
        name: 'Look Around',
        category: 'commercial',
        description: 'Looks around naturally from left to right and back to camera',
        fallbackPrompt: 'The model looks around naturally, glancing from left to right, then back to camera. Professional fashion video, natural curiosity.',
        thumbnail: '/assets/video-movements/Setset_Video_Thumb_LookAround.mp4'
    },
    {
        id: 'weight-shift',
        name: 'Weight Shift',
        category: 'commercial',
        description: 'Shifts body weight from one hip to the other (contrapposto stance)',
        fallbackPrompt: 'The model shifts body weight from one hip to the other in a contrapposto stance. Professional fashion video, natural sway.',
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
