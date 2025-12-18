// Editorial Mood Pools for Casting Mode
// Each mood describes lighting, atmosphere, and expression direction
// Framing is handled separately via the framing selector

const EDITORIAL_MOODS_FEMALE = [
    {
        id: 'stark-minimalism',
        name: 'Stark Minimalism',
        prompt: 'Pure white seamless background, perfectly flat frontal lighting eliminating all shadows, subject staring directly into lens with completely blank neutral expression, hyper-sharp focus on eyes, clean bare skin with no visible makeup, raw and confrontational like a passport photo elevated to high art, clinical yet captivating'
    },
    {
        id: 'chiaroscuro-drama',
        name: 'Chiaroscuro Drama',
        prompt: 'Deep Renaissance-inspired lighting with rich golden-brown shadows, single dramatic side light from 45 degrees, three-quarter view of face, contemplative distant gaze looking past the camera into memory, warm skin tones emerging from velvety darkness, theatrical and painterly like a Caravaggio come to life'
    },
    {
        id: 'golden-hour-intimacy',
        name: 'Golden Hour Intimacy',
        prompt: 'Warm honey-colored sunset backlighting creating an angelic halo around loose flowing hair, soft hexagonal lens flare kissing the frame edge, subject caught mid-laugh with genuine uninhibited joy, extremely shallow depth of field blurring the golden background, visible film grain, intimate candid moment that feels stolen'
    },
    {
        id: 'flash-rawness',
        name: 'Flash Rawness',
        prompt: 'Direct on-camera flash creating harsh unflattering shadows on the wall behind, slight red-eye reflection, subject caught completely off-guard with surprised wide-eyed expression, messy undone hair, 90s disposable camera party photography aesthetic, deliberately imperfect and chaotic, beautiful in its rawness'
    },
    {
        id: 'beauty-closeup',
        name: 'Beauty Close-Up',
        prompt: 'Classic butterfly lighting with two perfect catch lights in each eye, dewy luminous skin with tiny highlights on cupids bow and cheekbones, slightly parted glossy lips, soft sensual heavy-lidded gaze, every pore and peach-fuzz hair visible, hyperreal beauty photography where skin becomes landscape'
    },
    {
        id: 'monochrome-graphic',
        name: 'Monochrome Graphic',
        prompt: 'Extremely high contrast black and white with no middle grays, geometric shadow patterns from venetian blinds slicing across the face in parallel lines, stern powerful expression with clenched jaw, graphic shapes creating abstract composition, film noir femme fatale channeling 1940s Hollywood glamour'
    },
    {
        id: 'wet-look',
        name: 'Wet Look Editorial',
        prompt: 'Slicked back wet hair plastered to scalp and neck, water droplets catching light on forehead and shoulders, cool blue-steel undertones in the lighting, razor-sharp cheekbone highlights, intense smoldering gaze with slightly narrowed eyes, high-fashion amphibian queen emerging from the depths'
    },
    {
        id: 'soft-diffusion',
        name: 'Soft Diffusion Dream',
        prompt: 'Dreamy pro-mist filter soft focus creating glowing edges, powder pink and lavender pastel background gradient, ethereal luminous skin that seems to emit light, innocent wide-eyed upward gaze like spotting something magical, fairy-tale princess in a waking dream, romantic and otherworldly'
    },
    {
        id: 'colored-gel-drama',
        name: 'Colored Gel Drama',
        prompt: 'Split lighting with contrasting complementary color gels - electric blue on one side, hot magenta on the other - creating a face divided between two worlds, futuristic sci-fi aesthetic, fierce confrontational expression with raised eyebrow, high fashion avant-garde editorial'
    },
    {
        id: 'window-light-natural',
        name: 'Window Light Natural',
        prompt: 'Soft diffused natural light from a large window to the side, documentary-style intimacy, subject deep in private thought with downcast eyes and slight furrow in brow, completely authentic and unguarded stolen moment, no makeup or styling visible, real human vulnerability elevated to art'
    },
    {
        id: 'overexposed-ethereal',
        name: 'Overexposed Ethereal',
        prompt: 'Deliberately blown-out highlights creating angelic white glow around the edges, almost losing detail in the brightest areas, peaceful serene expression with eyes gently closed, transcendent and spiritual like ascending to another plane, fashion photography meets religious iconography'
    },
    {
        id: 'texture-contrast',
        name: 'Texture Contrast',
        prompt: 'Subject positioned against rough decaying wall - crumbling brick, peeling paint, rusted metal - smooth youthful skin creating striking contrast with urban decay, defiant confident expression with slight smirk, chin raised, street grit meets high fashion beauty, phoenix from the ashes'
    },
    {
        id: 'mirror-reflection',
        name: 'Mirror Reflection',
        prompt: 'Captured through an ornate vintage mirror creating a doubled layered image, subject making knowing eye contact through the reflection rather than directly, psychological depth suggesting hidden inner worlds, voyeuristic and intimate like catching someone in a private moment with themselves'
    },
    {
        id: 'deep-shadow-mystery',
        name: 'Deep Shadow Mystery',
        prompt: 'Face dramatically half-hidden in impenetrable shadow, only one eye and partial features visible emerging from darkness, mysterious and alluring, full of secrets and intrigue, classic film noir femme fatale who knows more than shes telling, danger wrapped in beauty'
    },
    {
        id: 'studio-color-pop',
        name: 'Studio Color Pop',
        prompt: 'Vibrant fully saturated backdrop in electric hot pink or sunshine yellow or Klein blue, complementary contrasting styled elements, exuberant joyful expression with open laughing mouth showing teeth, bold punchy and commercial yet maintaining editorial sophistication, pure pop energy'
    },
    {
        id: 'backlit-silhouette',
        name: 'Backlit Silhouette',
        prompt: 'Strong rim lighting from behind creating glowing outline silhouette, facial features barely visible as shadowed shapes, emphasis on the elegant outline and form - curve of neck, line of jaw, shape of lips in profile, artistic and mysterious, identity suggested rather than revealed'
    },
    {
        id: 'beauty-dish-punch',
        name: 'Beauty Dish Punch',
        prompt: 'Crisp focused beauty dish lighting creating defined but not harsh shadows, powerful emphasis on bone structure - cheekbones, orbital ridge, jawline, confident knowing smize with eyes slightly narrowed, channeling supermodel test shoot energy, born for the camera'
    },
    {
        id: 'natural-daylight-flat',
        name: 'Natural Daylight Flat',
        prompt: 'Soft overcast outdoor daylight creating completely even shadowless illumination, true accurate colors, relaxed genuine asymmetrical half-smile, approachable girl-next-door elevated to editorial status, the extraordinary ordinary, beauty in authenticity'
    },
    {
        id: 'lens-flare-dreamy',
        name: 'Lens Flare Dreamy',
        prompt: 'Intentional golden lens flare streaking diagonally across the frame, backlit late afternoon golden hour, carefree expression gazing away from camera into the distance, nostalgic endless summer feeling, shot on vintage film with visible grain and lifted blacks'
    },
    {
        id: 'environmental-outdoor',
        name: 'Environmental Outdoor',
        prompt: 'Natural outdoor urban setting - graffitied alley, concrete rooftop, overgrown park corner - genuine spontaneous interaction with the environment, caught-in-moment candidness like street photography, wind-blown hair, authentic street style elevated to editorial, real life as fashion'
    },
    {
        id: 'studio-dramatic-shadow',
        name: 'Studio Dramatic Shadow',
        prompt: 'Harsh single overhead spotlight creating dramatic deep shadows under eyes, nose, and chin, intense brooding expression with furrowed brow, high fashion severity that demands attention and respect, powerful and unapproachable, beauty as weapon'
    },
    {
        id: 'vintage-film',
        name: 'Vintage Film Aesthetic',
        prompt: 'Heavy visible film grain texture, slightly desaturated palette with warm amber shift, subtle light leaks on edges, 1970s fashion magazine aesthetic, knowing sophisticated sideways gaze, effortlessly cool like she just stepped out of a Slim Aarons photograph, timeless glamour'
    },
    {
        id: 'ring-light-perfection',
        name: 'Ring Light Perfection',
        prompt: 'Perfectly circular catch light reflections in both eyes creating doll-like appearance, completely even shadowless lighting wrapping around every curve, flawless airbrushed-looking skin, slight knowing head tilt with subtle smirk, Instagram beauty aesthetic elevated to high fashion editorial'
    },
    {
        id: 'rembrandt-classic',
        name: 'Rembrandt Classic',
        prompt: 'Traditional 45-degree Rembrandt lighting creating signature triangle shadow on far cheek, dark moody umber background, serious dignified expression conveying inner depth, timeless portrait lighting technique, museum-worthy gravitas like a painting that should hang in the Louvre'
    },
    {
        id: 'motion-blur',
        name: 'Motion Blur Expression',
        prompt: 'Intentional motion blur from movement with only the eyes tack-sharp and frozen, sense of kinetic energy and spontaneous action, wild joyful expression captured mid-movement, experimental fashion photography pushing technical boundaries, alive and electric'
    },
    {
        id: 'profile-sculpture',
        name: 'Profile Sculpture',
        prompt: 'Perfect 90-degree profile view against clean contrasting background, subject rendered as classical sculpture, emphasis on elegant line of neck and noble bearing, dignified serene expression, timeless and statuesque like a Greek goddess carved in marble'
    },
    {
        id: 'catch-light-sparkle',
        name: 'Catch Light Sparkle',
        prompt: 'Multiple complex catch light reflections creating jewel-like sparkle in eyes, bright alert optimistic expression with raised eyebrows, hopeful positive energy radiating from within, commercial beauty polish with genuine editorial sophistication'
    },
    {
        id: 'powder-explosion',
        name: 'Powder Explosion',
        prompt: 'Subtle colored powder or dust particles floating in dramatic side-lit air around the subject, otherworldly magical atmosphere, expression of wonder and discovery, high fashion meets fine art installation, frozen moment of cosmic beauty'
    },
    {
        id: 'harsh-noon-sun',
        name: 'Harsh Noon Sun',
        prompt: 'Unflinching direct overhead midday sunlight creating extreme contrast and under-eye shadows, no diffusion or fill, raw unforgiving natural light, confident expression owning every harsh highlight, beauty that doesnt need flattering light'
    },
    {
        id: 'analog-imperfection',
        name: 'Analog Imperfection',
        prompt: 'Warm analog film aesthetic with gentle color shifts and slightly lifted blacks, subtle film grain texture, relaxed unstudied expression with casual glance, nostalgic warmth reminiscent of vintage photography, soft natural imperfections that feel human and authentic'
    },
    // Additional 20 moods with photographer styles and flash techniques
    {
        id: 'helmut-newton-power',
        name: 'Helmut Newton Power',
        prompt: 'Hard flash with deep black shadows, high contrast glamour, powerful dominant stance, strong architectural composition, provocative confident gaze with slight condescension, black and white with silver-gelatin richness, dangerous femininity that owns the frame'
    },
    {
        id: 'richard-avedon-stark',
        name: 'Richard Avedon Stark',
        prompt: 'Pure white seamless background, no shadows anywhere, subject isolated in infinite white space, raw psychological intensity in expression, every imperfection visible and celebrated, stripped-down honesty that reveals character through absence of artifice'
    },
    {
        id: 'peter-lindbergh-soul',
        name: 'Peter Lindbergh Soul',
        prompt: 'Soft natural light, minimal to no makeup visible, authentic unretouched beauty, soulful introspective expression with gentle melancholy, black and white with rich gray midtones, capturing the human being behind the model'
    },
    {
        id: 'steven-meisel-glam',
        name: 'Steven Meisel Glam',
        prompt: 'Perfectly controlled studio lighting with flawless skin rendering, high fashion transformation, chameleon-like embodiment of a character, dramatic makeup and styling as art, expression that sells a fantasy world'
    },
    {
        id: 'guy-bourdin-surreal',
        name: 'Guy Bourdin Surreal',
        prompt: 'Saturated candy-colored backdrop, surrealist composition with unusual crop or angle, glossy lacquered aesthetic, slightly unsettling undertone beneath the beauty, fashion as fever dream, seductive danger'
    },
    {
        id: 'hard-flash-paparazzi',
        name: 'Hard Flash Paparazzi',
        prompt: 'Direct on-camera flash blasting harsh light, caught-off-guard celebrity moment, slight motion blur, compressed telephoto perspective, candid chaos frozen in time, authentic tabloid aesthetic elevated to art'
    },
    {
        id: 'ring-flash-fashion',
        name: 'Ring Flash Fashion',
        prompt: 'Characteristic ring flash circular shadow halo behind subject, flat even lighting across face, fashion magazine 2000s aesthetic, glossy polished skin, direct confrontational stare, commercial beauty with edge'
    },
    {
        id: 'bounced-flash-soft',
        name: 'Bounced Flash Soft',
        prompt: 'Flash bounced off ceiling or wall creating soft wraparound fill, natural-looking flash photography, subtle catchlights, easy relaxed expression, editorial candid that looks effortlessly captured'
    },
    {
        id: 'juergen-teller-raw',
        name: 'Juergen Teller Raw',
        prompt: 'On-camera flash in daylight creating fill-flash snapshot aesthetic, deliberately casual and unflattering angles, anti-glamour honesty, subject caught in genuine unposed moment, beauty in authenticity and imperfection'
    },
    {
        id: 'paolo-roversi-ethereal',
        name: 'Paolo Roversi Ethereal',
        prompt: 'Extremely long exposure creating soft ghostly blur, polaroid or wet plate aesthetic, romantic painterly quality, ethereal floating presence, mysterious otherworldly beauty emerging from darkness, time suspended'
    },
    {
        id: 'mario-testino-golden',
        name: 'Mario Testino Golden',
        prompt: 'Warm golden glamour lighting, bronzed glowing skin, sun-kissed sexy energy, joyful confident expression mid-laugh, aspirational jet-set lifestyle feeling, beauty as celebration of life'
    },
    {
        id: 'nick-knight-experimental',
        name: 'Nick Knight Experimental',
        prompt: 'Digitally enhanced or manipulated aesthetic, pushing photography into painterly territory, unusual color grading, experimental blur or distortion, fashion as avant-garde art installation, future-forward beauty'
    },
    {
        id: 'herb-ritts-sculptural',
        name: 'Herb Ritts Sculptural',
        prompt: 'High contrast black and white outdoor natural light, body as classical sculpture, emphasis on perfect form and musculature, sun-drenched California aesthetic, timeless physical beauty celebrated'
    },
    {
        id: 'david-sims-minimal',
        name: 'David Sims Minimal',
        prompt: 'Ultra clean minimal composition, stark graphic shapes, cool detached attitude, editorial restraint where less is more, sophisticated intelligence in the gaze, fashion stripped to essentials'
    },
    {
        id: 'terry-richardson-snapshot',
        name: 'Terry Richardson Snapshot',
        prompt: 'Harsh direct flash against white wall, deliberately amateur snapshot aesthetic, thumbs up energy and irreverent humor, anti-fashion fashion, raw unfiltered party photography vibe'
    },
    {
        id: 'annie-leibovitz-narrative',
        name: 'Annie Leibovitz Narrative',
        prompt: 'Cinematic environmental portrait with rich production value, subject as character in a story, dramatic theatrical lighting, elaborate set or location, expression carrying narrative weight, fashion as cinema'
    },
    {
        id: 'tim-walker-fantasy',
        name: 'Tim Walker Fantasy',
        prompt: 'Whimsical fantastical set with surreal props, storybook fairytale quality, wonder and amazement in expression, oversaturated dreamy colors, childlike imagination meets haute couture, fashion as escapist fantasy'
    },
    {
        id: 'ellen-von-unwerth-playful',
        name: 'Ellen von Unwerth Playful',
        prompt: 'Playful sexy energy with genuine laughter, retro vintage glamour nods, caught-in-moment spontaneity, flirtatious knowing glance, black and white with film grain, the fun side of fashion'
    },
    {
        id: 'mixed-lighting-ambient',
        name: 'Mixed Lighting Ambient',
        prompt: 'Flash balanced with warm ambient room light, mixed color temperatures creating depth, intimate environmental context, natural lived-in feeling, editorial candid in real-world setting'
    },
    {
        id: 'strobe-frozen-motion',
        name: 'Strobe Frozen Motion',
        prompt: 'High-speed strobe freezing dramatic movement - hair flying, fabric swirling, expression in flux - kinetic energy captured at 1/10000th second, peak action moment, fashion as dynamic performance'
    }
];

const EDITORIAL_MOODS_MALE = [
    {
        id: 'stark-minimalism',
        name: 'Stark Minimalism',
        prompt: 'Pure white seamless background, perfectly flat frontal lighting eliminating all shadows, piercing direct stare into the lens with completely neutral unreadable expression, hyper-sharp focus on eyes, clean bare skin showing natural texture, raw and confrontational like a police lineup elevated to high art'
    },
    {
        id: 'chiaroscuro-drama',
        name: 'Chiaroscuro Drama',
        prompt: 'Deep Renaissance-inspired lighting with rich amber and brown shadows, single dramatic side light from 45 degrees, three-quarter view revealing strong bone structure, contemplative gaze looking past the camera into distance, masculine features emerging from velvety darkness like an old master portrait'
    },
    {
        id: 'golden-hour-warmth',
        name: 'Golden Hour Warmth',
        prompt: 'Warm sunset backlighting creating rim light around hair and shoulders, soft lens flare at frame edge, relaxed genuine expression with easy closed-mouth smile, golden light catching stubble texture, film grain visible, intimate moment of quiet masculine confidence'
    },
    {
        id: 'flash-rawness',
        name: 'Flash Rawness',
        prompt: 'Direct on-camera flash creating harsh shadows on wall behind, slight red-eye, caught off-guard with surprised expression, shirt collar askew, 90s music magazine backstage photography aesthetic, deliberately imperfect and spontaneous, authentic chaos'
    },
    {
        id: 'skin-texture-study',
        name: 'Skin Texture Study',
        prompt: 'Focused dramatic lighting from the side emphasizing every texture - pores, stubble grain, small scars, fine lines - hyperreal detail where skin becomes topographic landscape, intense steady gaze, masculine beauty in imperfection and character'
    },
    {
        id: 'monochrome-graphic',
        name: 'Monochrome Graphic',
        prompt: 'Extremely high contrast black and white with crushed blacks and blown whites, geometric shadow patterns slicing across face, stern powerful expression with clenched jaw and narrowed eyes, graphic shapes creating abstract composition, cinematic action hero intensity'
    },
    {
        id: 'wet-look',
        name: 'Wet Look Editorial',
        prompt: 'Slicked back wet hair, water droplets on face and neck catching light, cool blue-steel undertones, sharp cheekbone and jawline highlights, intense smoldering gaze with hooded eyes, high-fashion aquatic masculinity, just emerged from the storm'
    },
    {
        id: 'moody-desaturated',
        name: 'Moody Desaturated',
        prompt: 'Muted desaturated color palette with lifted shadows, moody atmospheric feel, brooding introspective expression with distant unfocused gaze, melancholic poetic masculinity, the romantic tortured artist archetype'
    },
    {
        id: 'colored-gel-drama',
        name: 'Colored Gel Drama',
        prompt: 'Split lighting with contrasting color gels - deep blue on one side, hot red or orange on the other - futuristic sci-fi blade runner aesthetic, fierce confrontational expression with slight snarl, avant-garde editorial for cyberpunk fashion'
    },
    {
        id: 'window-light-natural',
        name: 'Window Light Natural',
        prompt: 'Soft diffused natural light from large window, documentary-style authenticity, subject deep in thought with downcast eyes and relaxed mouth, completely unguarded private moment, real human vulnerability, strength in softness'
    },
    {
        id: 'high-contrast-shadow',
        name: 'High Contrast Shadow',
        prompt: 'Face dramatically carved by hard directional light, deep black shadows defining cheekbones and jaw, one eye possibly hidden in darkness, mysterious and powerful, fashion noir masculinity, danger in the details'
    },
    {
        id: 'texture-contrast',
        name: 'Texture Contrast',
        prompt: 'Subject against rough industrial backdrop - rusted steel, weathered wood, crumbling concrete - refined masculine features contrasting with urban decay, defiant confident expression with direct stare, grit meets sophistication'
    },
    {
        id: 'mirror-reflection',
        name: 'Mirror Reflection',
        prompt: 'Captured through mirror creating layered composition, subject making eye contact through reflection, psychological depth and self-examination, intimate voyeuristic quality, man confronting his own image'
    },
    {
        id: 'deep-shadow-mystery',
        name: 'Deep Shadow Mystery',
        prompt: 'Face mostly hidden in shadow, only partial features visible - one eye, edge of jaw, corner of mouth - emerging from darkness, mysterious and compelling, the strong silent archetype, presence felt more than seen'
    },
    {
        id: 'studio-color-bold',
        name: 'Studio Color Bold',
        prompt: 'Saturated monochromatic backdrop in deep navy or forest green or burnt orange, confident relaxed expression, clean contemporary styling, bold graphic composition, commercial appeal with editorial credibility, modern masculine ideal'
    },
    {
        id: 'backlit-silhouette',
        name: 'Backlit Silhouette',
        prompt: 'Strong rim lighting from behind creating glowing outline, features as shadowed shapes, emphasis on strong masculine silhouette - broad shoulders, jawline, profile - identity suggested through form alone, cinematic and powerful'
    },
    {
        id: 'beauty-dish-definition',
        name: 'Beauty Dish Definition',
        prompt: 'Crisp beauty dish lighting defining every angle of bone structure, strong cheekbones, prominent brow, defined jaw, confident knowing look with slight asymmetric smirk, classic male model test shoot energy'
    },
    {
        id: 'natural-daylight-honest',
        name: 'Natural Daylight Honest',
        prompt: 'Soft overcast daylight, even and truthful illumination, relaxed genuine expression with natural subtle smile, approachable handsome everyman elevated to editorial, authentic masculinity without performance'
    },
    {
        id: 'lens-flare-nostalgic',
        name: 'Lens Flare Nostalgic',
        prompt: 'Golden lens flare streaking across frame, backlit late afternoon warmth, carefree expression looking into distance, nostalgic summer road trip feeling, shot on film with visible grain, timeless cool'
    },
    {
        id: 'environmental-urban',
        name: 'Environmental Urban',
        prompt: 'Gritty urban backdrop - fire escape, loading dock, underpass - genuine interaction with environment, candid documentary quality, wind-ruffled hair, street style meets editorial, real world masculine presence'
    },
    {
        id: 'overhead-dramatic',
        name: 'Overhead Dramatic',
        prompt: 'Hard overhead spotlight creating deep shadows under brow, nose, and in eye sockets, intense brooding expression, high fashion severity, powerful and commanding, fashion as dominance'
    },
    {
        id: 'vintage-film-grain',
        name: 'Vintage Film Grain',
        prompt: 'Heavy visible grain, warm desaturated tones, 1970s Marlboro man aesthetic without the cigarette, knowing sideways glance, rugged sophistication, Steve McQueen effortless cool'
    },
    {
        id: 'ring-light-clean',
        name: 'Ring Light Clean',
        prompt: 'Circular catch lights in eyes, even clean lighting, groomed and polished appearance, confident direct gaze, contemporary commercial masculinity with editorial edge, approachable yet aspirational'
    },
    {
        id: 'rembrandt-classic',
        name: 'Rembrandt Classic',
        prompt: 'Traditional 45-degree Rembrandt lighting with signature cheek triangle shadow, dark atmospheric background, dignified serious expression, timeless portrait technique, should hang in a museum of modern masculinity'
    },
    {
        id: 'motion-blur-energy',
        name: 'Motion Blur Energy',
        prompt: 'Intentional motion blur from movement with tack-sharp eyes, kinetic energy and action, expression caught mid-movement, experimental pushing of photographic boundaries, alive with masculine vitality'
    },
    {
        id: 'profile-sculpture',
        name: 'Profile Sculpture',
        prompt: 'Perfect 90-degree profile against clean background, emphasis on strong profile - nose, jaw, adams apple, neck - classical sculpture in flesh, noble bearing, Roman emperor energy'
    },
    {
        id: 'catch-light-intensity',
        name: 'Catch Light Intensity',
        prompt: 'Multiple catch lights creating bright alive eyes, alert engaged expression with slight brow raise, positive direct energy, commercial appeal, guy-next-door who happens to be incredibly photogenic'
    },
    {
        id: 'smoke-atmosphere',
        name: 'Smoke and Atmosphere',
        prompt: 'Subtle haze or smoke diffusing the light, atmospheric depth, mysterious expression with hooded eyes, noir masculinity, secrets and stories, the interesting man in a smoky room'
    },
    {
        id: 'harsh-daylight-raw',
        name: 'Harsh Daylight Raw',
        prompt: 'Unforgiving direct overhead sun, extreme contrast with hard shadows, no flattering diffusion, raw unflinching honesty, confidence that doesnt need soft lighting, masculinity that owns its flaws'
    },
    {
        id: 'analog-warmth',
        name: 'Analog Warmth',
        prompt: 'Warm analog film aesthetic with gentle color shifts and slightly lifted blacks, subtle film grain texture, relaxed unstudied expression with casual glance, nostalgic warmth reminiscent of vintage photography, authentic and human quality'
    },
    // Additional 20 moods with photographer styles and flash techniques
    {
        id: 'helmut-newton-power',
        name: 'Helmut Newton Power',
        prompt: 'Hard flash with deep black shadows, high contrast glamour, powerful dominant stance, strong architectural composition, intense commanding gaze, black and white with silver-gelatin richness, dangerous masculinity that demands respect'
    },
    {
        id: 'richard-avedon-stark',
        name: 'Richard Avedon Stark',
        prompt: 'Pure white seamless background, no shadows anywhere, subject isolated in infinite white space, raw psychological intensity in expression, every line and texture visible, stripped-down honesty revealing character through absence of artifice'
    },
    {
        id: 'peter-lindbergh-soul',
        name: 'Peter Lindbergh Soul',
        prompt: 'Soft natural light, minimal styling, authentic unretouched features, soulful introspective expression with gentle intensity, black and white with rich gray midtones, capturing the real man behind the image'
    },
    {
        id: 'steven-meisel-glam',
        name: 'Steven Meisel Glam',
        prompt: 'Perfectly controlled studio lighting with immaculate grooming, high fashion transformation, chameleon-like embodiment of an archetype, styled to perfection, expression that sells a fantasy of modern masculinity'
    },
    {
        id: 'guy-bourdin-surreal',
        name: 'Guy Bourdin Surreal',
        prompt: 'Saturated bold colored backdrop, surrealist composition with unusual crop, glossy lacquered aesthetic, slightly unsettling undertone, fashion as fever dream, masculine beauty with danger underneath'
    },
    {
        id: 'hard-flash-paparazzi',
        name: 'Hard Flash Paparazzi',
        prompt: 'Direct on-camera flash blasting harsh light, caught-off-guard moment, slight motion blur, compressed telephoto look, candid chaos frozen in time, celebrity arrival aesthetic elevated to art'
    },
    {
        id: 'ring-flash-fashion',
        name: 'Ring Flash Fashion',
        prompt: 'Characteristic ring flash circular shadow halo behind subject, flat even lighting across face, fashion magazine 2000s aesthetic, polished groomed appearance, direct confrontational stare, commercial edge'
    },
    {
        id: 'bounced-flash-soft',
        name: 'Bounced Flash Soft',
        prompt: 'Flash bounced off ceiling creating soft wraparound fill, natural-looking flash photography, subtle catchlights, easy relaxed expression, editorial candid that looks effortlessly captured moment'
    },
    {
        id: 'juergen-teller-raw',
        name: 'Juergen Teller Raw',
        prompt: 'On-camera flash in daylight creating fill-flash snapshot aesthetic, deliberately casual angles, anti-glamour honesty, caught in genuine unposed moment, beauty in authenticity and imperfection'
    },
    {
        id: 'paolo-roversi-ethereal',
        name: 'Paolo Roversi Ethereal',
        prompt: 'Long exposure creating soft ghostly blur, polaroid or wet plate aesthetic, romantic painterly quality, mysterious presence emerging from darkness, time suspended in eternal moment'
    },
    {
        id: 'mario-testino-golden',
        name: 'Mario Testino Golden',
        prompt: 'Warm golden glamour lighting, bronzed healthy skin, confident sexy energy, natural smile with genuine warmth, aspirational lifestyle feeling, masculine beauty as celebration'
    },
    {
        id: 'nick-knight-experimental',
        name: 'Nick Knight Experimental',
        prompt: 'Digitally enhanced or manipulated aesthetic, pushing photography into painterly territory, unusual color grading, experimental blur or distortion, fashion as avant-garde installation'
    },
    {
        id: 'herb-ritts-sculptural',
        name: 'Herb Ritts Sculptural',
        prompt: 'High contrast black and white outdoor natural light, body as classical sculpture, emphasis on perfect masculine form, sun-drenched California aesthetic, timeless physical beauty'
    },
    {
        id: 'david-sims-minimal',
        name: 'David Sims Minimal',
        prompt: 'Ultra clean minimal composition, stark graphic shapes, cool detached attitude, editorial restraint where less is more, sophisticated intelligence in the gaze, fashion stripped to essentials'
    },
    {
        id: 'terry-richardson-snapshot',
        name: 'Terry Richardson Snapshot',
        prompt: 'Harsh direct flash against white wall, deliberately amateur snapshot aesthetic, irreverent energy, anti-fashion fashion, raw unfiltered documentation vibe'
    },
    {
        id: 'annie-leibovitz-narrative',
        name: 'Annie Leibovitz Narrative',
        prompt: 'Cinematic environmental portrait with rich production value, subject as character in a story, dramatic theatrical lighting, elaborate location, expression carrying narrative weight'
    },
    {
        id: 'tim-walker-fantasy',
        name: 'Tim Walker Fantasy',
        prompt: 'Whimsical fantastical set with surreal props, storybook quality, wonder and imagination, oversaturated dreamy colors, childlike creativity meets haute couture, fashion as escapist world'
    },
    {
        id: 'bruce-weber-americana',
        name: 'Bruce Weber Americana',
        prompt: 'Natural outdoor light, all-American wholesome masculinity, athletic casual energy, golden retriever warmth, black and white with grain, nostalgic idealized American boyhood grown up'
    },
    {
        id: 'mixed-lighting-ambient',
        name: 'Mixed Lighting Ambient',
        prompt: 'Flash balanced with warm ambient room light, mixed color temperatures creating depth, intimate environmental context, natural lived-in feeling, editorial candid in real-world setting'
    },
    {
        id: 'strobe-frozen-motion',
        name: 'Strobe Frozen Motion',
        prompt: 'High-speed strobe freezing dramatic movement - hair moving, clothes flowing - kinetic energy captured at peak moment, fashion as dynamic performance, alive with masculine vitality'
    }
];

// Framing options - separate from mood
const FRAMING_OPTIONS = [
    { id: 'extreme-closeup', name: 'Extreme Close-Up', prompt: 'extreme close-up filling frame with face, eyes and partial features only' },
    { id: 'closeup', name: 'Close-Up', prompt: 'close-up portrait head and shoulders tightly framed' },
    { id: 'headshot', name: 'Headshot', prompt: 'classic headshot portrait from chest up' },
    { id: 'half-body', name: 'Half Body', prompt: 'half-body portrait from waist up showing torso and arms' },
    { id: 'three-quarter', name: 'Three Quarter', prompt: 'three-quarter body shot from thighs up' },
    { id: 'full-body', name: 'Full Body', prompt: 'full body portrait showing complete figure head to toe' }
];

// Helper function to get random mood for gender
function getRandomEditorialMood(gender) {
    const pool = gender === 'male' ? EDITORIAL_MOODS_MALE : EDITORIAL_MOODS_FEMALE;
    return pool[Math.floor(Math.random() * pool.length)];
}

// Helper to get framing by id
function getFramingById(id) {
    return FRAMING_OPTIONS.find(f => f.id === id) || FRAMING_OPTIONS[2]; // default to headshot
}

// Export for use
if (typeof window !== 'undefined') {
    window.EDITORIAL_MOODS_FEMALE = EDITORIAL_MOODS_FEMALE;
    window.EDITORIAL_MOODS_MALE = EDITORIAL_MOODS_MALE;
    window.FRAMING_OPTIONS = FRAMING_OPTIONS;
    window.getRandomEditorialMood = getRandomEditorialMood;
    window.getFramingById = getFramingById;
}
