// Editorial Mood Pools for Casting Mode
// Each mood describes lighting, atmosphere, and expression direction
// Framing is handled separately via the framing selector
//
// GLOBAL RULES:
// - Always color photography (never black & white)
// - Grain is OK where it adds life, but no light leaks, dust, or vintage overlays
// - Models wear clothing (tank top, t-shirt, shirt, sweater) unless mood specifically requires bare
// - No grungy/industrial backgrounds - clean minimal, modern architecture OK, clean concrete OK
// - Raw and authentic feel - not over-polished studio, not gritty

const EDITORIAL_MOODS_FEMALE = [
    {
        id: 'stark-minimalism',
        name: 'Stark Minimalism',
        prompt: 'Pure white seamless background, perfectly flat frontal lighting eliminating all shadows, subject wearing minimal clothing like a simple tank top or t-shirt, staring directly into lens with completely blank neutral expression, hyper-sharp focus on eyes, clean bare skin with no visible makeup, raw and confrontational like a passport photo elevated to high art, clinical yet captivating, color photography'
    },
    {
        id: 'chiaroscuro-drama',
        name: 'Chiaroscuro Drama',
        prompt: 'Renaissance-inspired lighting with rich brown shadows but slightly cooler tones than typical golden hour, single dramatic side light from 45 degrees, subject wearing something on upper body, three-quarter view of face, contemplative distant gaze looking past the camera into memory, skin tones emerging from velvety darkness, theatrical and painterly, color photography with muted warm palette'
    },
    {
        id: 'motion-blur-candid',
        name: 'Motion Blur Candid',
        prompt: 'Long exposure motion blur with subject moving quickly toward camera or spinning, heavy visible motion blur streaking across the frame creating strong kinetic energy, slow shutter speed effect, natural daylight, raw candid feel caught mid-movement, wearing casual clothing that blurs with motion, hair streaking through the air, intentionally blurred photography technique, color photography with natural tones'
    },
    {
        id: 'flash-rawness',
        name: 'Flash Rawness',
        prompt: 'Direct on-camera flash creating harsh shadows on the wall behind, subject caught completely off-guard with surprised wide-eyed expression, hand reaching toward camera creating depth in the frame, messy undone hair, wearing something casual, 90s disposable camera party photography aesthetic, deliberately imperfect and chaotic, beautiful in its rawness, color photography'
    },
    {
        id: 'beauty-closeup',
        name: 'Beauty Close-Up',
        prompt: 'Classic butterfly lighting with two perfect catch lights in each eye, dewy luminous skin with tiny highlights on cupids bow and cheekbones, slightly parted glossy lips, soft sensual heavy-lidded gaze, every pore and peach-fuzz hair visible, hyperreal beauty photography where skin becomes landscape, color photography'
    },
    {
        id: 'graphic-shadows',
        name: 'Graphic Shadows',
        prompt: 'High contrast with geometric shadow patterns from venetian blinds slicing across the face in parallel vertical lines, stern powerful expression with clenched jaw, graphic shapes creating abstract composition, wearing minimal top, strong directional light, color photography with desaturated tones'
    },
    {
        id: 'wet-look',
        name: 'Wet Look Editorial',
        prompt: 'Slicked back wet hair plastered to scalp and neck, water droplets catching light on forehead and shoulders, subject in an environment with context not plain studio, neutral or warm lighting tones not blue, razor-sharp cheekbone highlights, intense smoldering gaze with slightly narrowed eyes, wearing something on body, high-fashion editorial, color photography'
    },
    {
        id: 'soft-diffusion',
        name: 'Soft Diffusion Dream',
        prompt: 'Dreamy pro-mist filter soft focus creating glowing edges, soft pastel background gradient in pink lavender or peach tones, ethereal luminous skin that seems to emit light, serene peaceful expression with soft gaze, wearing something light and flowy, romantic and otherworldly, consistent dreamy aesthetic, color photography'
    },
    {
        id: 'glass-distortion',
        name: 'Glass Distortion',
        prompt: 'Shot through textured glass frosted glass or prism creating beautiful distortion and light refraction, face still recognizable but abstracted through the glass, interesting light patterns and color shifts from refraction, wearing something simple, experimental and artistic, color photography with prismatic effects'
    },
    {
        id: 'window-light-natural',
        name: 'Window Light Natural',
        prompt: 'Soft diffused natural light from a large window to the side, documentary-style intimacy, subject wearing a simple top or sweater, deep in private thought with downcast eyes and slight furrow in brow, completely authentic and unguarded stolen moment, real human vulnerability elevated to art, color photography'
    },
    {
        id: 'architectural-minimalism',
        name: 'Architectural Minimalism',
        prompt: 'Subject in clean modern architectural space with concrete walls geometric shadows or minimal furniture, strong directional light from large windows creating dramatic shadows, wearing simple contemporary clothing, composed confident expression, fashion meets architecture, clean lines and negative space, color photography'
    },
    {
        id: 'texture-contrast',
        name: 'Texture Contrast',
        prompt: 'Subject positioned against clean concrete or minimal modern architectural wall, smooth youthful skin creating striking contrast with textured but clean background, defiant confident expression with slight smirk chin raised, wearing edgy minimal clothing, modern urban aesthetic not grungy, color photography'
    },
    {
        id: 'mirror-reflection',
        name: 'Mirror Reflection',
        prompt: 'Captured through a minimal modern mirror or glass panels with clean lines creating a doubled layered image, contemporary gallery-like setting with neutral tones, subject wearing something simple, making knowing eye contact through the reflection, psychological depth and intimacy, reflections and layers, color photography'
    },
    {
        id: 'deep-shadow-mystery',
        name: 'Deep Shadow Mystery',
        prompt: 'Dramatic split lighting with one side of face beautifully lit while other side falls into shadow, enough light to clearly see facial features and skin texture on lit side, single strong directional light source, subject wearing something dark or minimal, mysterious and alluring with visible detail, cinematic noir aesthetic, color photography with rich shadows but visible face'
    },
    {
        id: 'studio-color-pop',
        name: 'Studio Color Pop',
        prompt: 'Vibrant saturated backdrop in bold color, female subject wearing bold colorful clothing that pops against background, confident playful expression, bold punchy and commercial yet maintaining editorial sophistication, color photography'
    },
    {
        id: 'szilveszter-mako',
        name: 'Szilveszter Makó Painterly',
        prompt: 'Theatrical painterly portrait using only natural daylight no flash, muted desaturated color palette with Renaissance and Dadaist influences, handmade textured backdrop or draped fabric set piece, subject wearing timeless elegant clothing, melancholic atmospheric mood with dreamlike ethereal quality, soft diffused window light, fine art meets fashion photography, color photography with faded muted tones'
    },
    {
        id: 'nadav-kander',
        name: 'Nadav Kander Portrait',
        prompt: 'Spare minimal portrait on plain muted background, meticulous pre-planned lighting emphasizing face structure, emotional depth and quiet vulnerability, subject wearing simple understated clothing, pared-down composition where less is more, intense yet intimate gaze, psychological portrait that reveals character, subtle muted color palette, color photography'
    },
    {
        id: 'natural-daylight-environment',
        name: 'Natural Daylight Environment',
        prompt: 'Soft overcast outdoor daylight with environmental context and depth of field, true accurate colors, wearing casual everyday clothing, relaxed genuine asymmetrical half-smile, approachable elevated to editorial status, beauty in authenticity, can include background elements, color photography'
    },
    {
        id: 'gymnasium-athletic',
        name: 'Gymnasium Athletic',
        prompt: 'Shot in a gymnasium or physical education setting with equipment like bars mats or hoops, subject in athletic or minimal wear interacting with the environment, dynamic pose climbing hanging or balancing on something, institutional lighting mixed with flash, raw athletic energy, creates visual memory, color photography'
    },
    {
        id: 'harley-weir',
        name: 'Harley Weir Intimate',
        prompt: 'Intimate close-up portrait with soft natural lighting, visceral organic composition focusing on texture and skin detail, raw and unguarded moment, warm natural tones, slightly grainy film-like quality, tender sensual atmosphere without being explicit, subject wearing minimal simple clothing, challenging traditional beauty with honest imperfect beauty, female gaze intimacy, color photography'
    },
    {
        id: 'studio-dramatic-shadow',
        name: 'Studio Dramatic Shadow',
        prompt: 'Single overhead spotlight creating dramatic shadows under cheekbones and chin, composed confident expression with relaxed brow looking down at camera creates nice headshot composition, wearing simple dark or neutral top, high fashion elegance that commands attention, beauty as quiet power, color photography'
    },
    {
        id: 'vintage-film',
        name: 'Vintage Film Aesthetic',
        prompt: 'Warm amber tones with subtle film grain texture that adds life, slightly desaturated palette, knowing sophisticated sideways gaze, wearing timeless classic clothing, effortlessly cool timeless glamour, no light leaks or dust overlays just natural film quality, color photography'
    },
    {
        id: 'medium-format-analog',
        name: 'Medium Format Analog',
        prompt: 'Shot on medium format film camera with distinctive shallow depth of field and creamy bokeh, subtle wide-angle distortion giving slight fisheye feel, rich film grain texture, natural available light, subject wearing casual vintage-inspired clothing, authentic analog warmth with slightly lifted blacks, nostalgic yet contemporary, imperfect focus adds character, color photography with film color rendition'
    },
    {
        id: 'rembrandt-classic',
        name: 'Rembrandt Classic',
        prompt: 'Traditional 45-degree Rembrandt lighting creating signature triangle shadow on far cheek, dark moody background, wearing something elegant or simple, serious dignified expression conveying inner depth, timeless portrait lighting technique, museum-worthy gravitas, color photography with rich warm tones'
    },
    {
        id: 'motion-blur',
        name: 'Motion Blur Expression',
        prompt: 'Heavy intentional motion blur from rapid spinning or turning movement, long exposure slow shutter creating dramatic blur streaks across entire frame, subject in dynamic motion with clothes and hair streaking through air, kinetic energy and spontaneous action, experimental fashion photography pushing photographic boundaries, alive and electric with visible motion trails, color photography'
    },
    {
        id: 'editorial-beauty-extreme',
        name: 'Editorial Beauty Extreme',
        prompt: 'Elevated editorial makeup with one striking element like a bold graphic liner or a single unusual color on lips or eyes, minimal but impactful makeup artistry, strong beauty lighting with clean skin, sleek pulled-back hair, focus on one deliberate makeup statement not overwhelming, high fashion restraint, confident striking expression, color photography'
    },
    {
        id: 'hands-in-frame',
        name: 'Hands in Frame',
        prompt: 'Hands interacting with face covering part of face fingers spreading through hair or framing features, creates depth and intimacy with foreground interest, interesting directional lighting creating shadows through fingers, wearing something simple, contemplative or playful expression, color photography'
    },
    {
        id: 'smoke-atmosphere',
        name: 'Smoke and Atmosphere',
        prompt: 'Subtle haze or smoke diffusing the light creating atmospheric depth, mysterious expression with knowing eyes, wearing something dark or elegant, noir femininity with secrets and stories, documentary smoky room feeling, color photography with muted tones'
    },
    {
        id: 'harsh-noon-sun',
        name: 'Harsh Noon Sun',
        prompt: 'Unflinching direct overhead midday sunlight creating extreme contrast and under-eye shadows, no diffusion or fill, wearing simple summer clothing, raw unforgiving natural light, confident expression owning every harsh highlight, beauty that doesnt need flattering light, color photography'
    },
    {
        id: 'analog-warmth',
        name: 'Analog Warmth',
        prompt: 'Warm analog film aesthetic with gentle color shifts and slightly lifted blacks, subtle film grain texture, subject can be slightly out of focus or have gentle motion blur adding life, wearing casual clothing, relaxed unstudied expression with casual glance, nostalgic warmth, authentic and human, color photography'
    },
    {
        id: 'helmut-newton-power',
        name: 'Helmut Newton Power',
        prompt: 'Hard flash with deep black shadows, high contrast glamour, powerful dominant stance, strong architectural composition, wearing bold minimal clothing or tailored pieces, provocative confident gaze with slight condescension, dangerous femininity that owns the frame, color photography with high contrast'
    },
    {
        id: 'richard-avedon-stark',
        name: 'Richard Avedon Stark',
        prompt: 'Pure white seamless background with no shadows anywhere, subject isolated in infinite white space, wearing simple clothing, raw psychological intensity in expression, every detail visible, stripped-down honesty that reveals character through absence of artifice, color photography'
    },
    {
        id: 'peter-lindbergh-soul',
        name: 'Peter Lindbergh Soul',
        prompt: 'Soft natural light, minimal to no makeup visible, wearing simple understated clothing, authentic unretouched beauty, soulful introspective expression with gentle melancholy, capturing the human being behind the model, rich tonal range, color photography'
    },
    {
        id: 'steven-meisel-glam',
        name: 'Steven Meisel Glam',
        prompt: 'Perfectly controlled studio lighting with flawless skin rendering, elevated editorial makeup with artistic precision, minimal high-end designer clothing in neutral tones, confident transformative expression, fashion fantasy grounded in sophisticated simplicity, color photography'
    },
    {
        id: 'guy-bourdin-surreal',
        name: 'Guy Bourdin Surreal',
        prompt: 'Desaturated candy-colored backdrop that is clean not noisy, surrealist composition with unusual crop or angle, glossy lacquered aesthetic, wearing bold fashion pieces, slightly unsettling undertone beneath the beauty, fashion as fever dream but sophisticated not 90s bright, color photography'
    },
    {
        id: 'hard-flash-paparazzi',
        name: 'Hard Flash Paparazzi',
        prompt: 'Direct on-camera flash blasting harsh light like tabloid photography, caught-off-guard celebrity moment, slight motion blur, wearing glamorous or party clothing, compressed telephoto perspective, candid chaos frozen in time, authentic paparazzi aesthetic elevated to art, color photography'
    },
    {
        id: 'harsh-fill-flash-daylight',
        name: 'Harsh Fill Flash Daylight',
        prompt: 'Strong fill flash in bright daylight creating that flat punchy slightly overexposed look, outdoor setting, wearing casual clothing, direct and confident expression, snapshot aesthetic but intentional, harsh midday sun mixed with flash, color photography'
    },
    {
        id: 'bounced-flash-soft',
        name: 'Bounced Flash Soft',
        prompt: 'Flash bounced off ceiling or wall creating soft wraparound fill, natural-looking flash photography, wearing casual comfortable clothing, subtle catchlights, easy relaxed expression, editorial candid that looks effortlessly captured, color photography'
    },
    {
        id: 'juergen-teller-raw',
        name: 'Juergen Teller Raw',
        prompt: 'On-camera flash in daylight creating fill-flash snapshot aesthetic, deliberately casual and unflattering angles, wearing everyday clothing, anti-glamour honesty, subject caught in genuine unposed moment, beauty in authenticity and imperfection, color photography'
    },
    {
        id: 'paolo-roversi-ethereal',
        name: 'Paolo Roversi Ethereal',
        prompt: 'Long exposure creating soft ghostly blur, romantic painterly quality, wearing flowing fabric that blurs with movement, ethereal floating presence, mysterious otherworldly beauty emerging from darkness, time suspended, color photography with muted romantic tones'
    },
    {
        id: 'mario-testino-raw',
        name: 'Mario Testino Raw',
        prompt: 'Natural lighting that feels raw and real not overly golden or polished, genuine energy and confidence, wearing effortless clothing, authentic moment not staged beach glamour, real-world context, celebration of natural beauty without heavy styling, color photography'
    },
    {
        id: 'nick-knight-experimental',
        name: 'Nick Knight Experimental',
        prompt: 'Experimental aesthetic pushing photography into abstract painterly territory, motion blur or intentional distortion, wearing avant-garde or simple contrasting pieces, unusual but not garish color grading avoiding purple and yellow, fashion as avant-garde art installation, color photography'
    },
    {
        id: 'herb-ritts-sculptural',
        name: 'Herb Ritts Sculptural',
        prompt: 'High contrast outdoor natural light, body as classical sculpture, emphasis on perfect form and musculature, sun-drenched California aesthetic, can wear minimal athletic wear or simple pieces, timeless physical beauty celebrated, color photography'
    },
    {
        id: 'david-sims-minimal',
        name: 'David Sims Minimal',
        prompt: 'Ultra clean minimal composition, stark graphic shapes, wearing simple minimal clothing in neutral tones, cool detached attitude, editorial restraint where less is more, sophisticated intelligence in the gaze, fashion stripped to essentials, color photography'
    },
    {
        id: 'terry-richardson-snapshot',
        name: 'Terry Richardson Snapshot',
        prompt: 'Harsh direct flash against white wall, deliberately amateur snapshot aesthetic, wearing casual party clothing, thumbs up energy and irreverent humor, anti-fashion fashion, raw unfiltered party photography vibe, color photography'
    },
    {
        id: 'annie-leibovitz-narrative',
        name: 'Annie Leibovitz Narrative',
        prompt: 'Cinematic environmental portrait with rich production value, subject as character in a story, dramatic theatrical lighting, wearing character-appropriate clothing, elaborate set or location, expression carrying narrative weight, fashion as cinema, color photography'
    },
    {
        id: 'studio-with-props',
        name: 'Studio with Personal Props',
        prompt: 'Minimal studio setting with one interesting prop that feels like a personal belonging - a chair with a vintage TV next to it, a plant, a mirror, fabric draped over furniture, subject sitting or standing near their belonging, wearing casual authentic clothing, simple but adds story and context, feels real and personal, color photography'
    },
    {
        id: 'ellen-von-unwerth-playful',
        name: 'Ellen von Unwerth Playful',
        prompt: 'Playful sexy energy with genuine laughter, retro vintage glamour nods, wearing flirty or playful clothing, caught-in-moment spontaneity, flirtatious knowing glance, subtle film grain, the fun side of fashion, color photography'
    },
    {
        id: 'mixed-lighting-color',
        name: 'Mixed Lighting Color',
        prompt: 'Flash balanced with strong colored ambient light like a red neon or hard blue light creating color cast on one side, mixed color temperatures creating depth and drama, wearing simple clothing, intimate environmental context, editorial candid with bold color accent, color photography'
    },
    {
        id: 'strobe-frozen-motion',
        name: 'Strobe Frozen Motion',
        prompt: 'High-speed strobe freezing dramatic movement captured at peak action spinning jumping leaning back or twisting, wearing high-end designer fashion or couture pieces that move beautifully showing luxurious fabric in motion, hair caught mid-motion, kinetic energy with unique angle and body position, elevated fashion editorial not casual wear, dynamic fashion performance, color photography'
    }
];

const EDITORIAL_MOODS_MALE = [
    {
        id: 'stark-minimalism',
        name: 'Stark Minimalism',
        prompt: 'Pure white seamless background, perfectly flat frontal lighting eliminating all shadows, subject wearing minimal clothing like a simple t-shirt, piercing direct stare into the lens with completely neutral unreadable expression, hyper-sharp focus on eyes, clean bare skin showing natural texture, raw and confrontational elevated to high art, color photography'
    },
    {
        id: 'chiaroscuro-drama',
        name: 'Chiaroscuro Drama',
        prompt: 'Renaissance-inspired lighting with rich brown shadows but slightly cooler tones than typical golden hour, single dramatic side light from 45 degrees, subject wearing something on upper body, three-quarter view revealing strong bone structure, contemplative gaze looking past the camera into distance, masculine features emerging from velvety darkness like an old master portrait, color photography'
    },
    {
        id: 'motion-blur-candid',
        name: 'Motion Blur Candid',
        prompt: 'Long exposure motion blur with subject moving quickly toward camera or turning, heavy visible motion blur streaking across the frame creating strong kinetic energy, slow shutter speed effect, natural daylight, raw candid feel caught mid-movement, wearing casual clothing that blurs with motion, intentionally blurred photography technique, color photography with natural tones'
    },
    {
        id: 'flash-rawness',
        name: 'Flash Rawness',
        prompt: 'Direct on-camera flash creating harsh shadows on wall behind, caught off-guard with surprised expression, hand reaching toward camera or element in foreground creating depth, wearing casual shirt or jacket collar askew, 90s backstage photography aesthetic, deliberately imperfect and spontaneous, authentic chaos, color photography'
    },
    {
        id: 'skin-texture-study',
        name: 'Skin Texture Study',
        prompt: 'Focused dramatic lighting from the side emphasizing every texture pores stubble grain small scars fine lines, hyperreal detail where skin becomes topographic landscape, wearing simple dark top, intense steady gaze, masculine beauty in imperfection and character, color photography'
    },
    {
        id: 'graphic-shadows',
        name: 'Graphic Shadows',
        prompt: 'High contrast with geometric shadow patterns from venetian blinds slicing across face in vertical lines, stern powerful expression with clenched jaw and narrowed eyes, wearing simple shirt, graphic shapes creating abstract composition, cinematic intensity, color photography with desaturated tones'
    },
    {
        id: 'wet-look',
        name: 'Wet Look Editorial',
        prompt: 'Slicked back wet hair, water droplets on face and neck catching light, subject in an environment with context not plain studio, neutral or warm lighting tones not blue, sharp cheekbone and jawline highlights, wearing something on body, intense smoldering gaze with hooded eyes, high-fashion editorial, color photography'
    },
    {
        id: 'soft-diffusion',
        name: 'Soft Diffusion Dream',
        prompt: 'Dreamy soft focus creating glowing edges, soft pastel or neutral background gradient, ethereal quality with luminous skin, wearing something light colored, serene peaceful expression with soft distant gaze, romantic and contemplative, consistent with female version aesthetic, color photography'
    },
    {
        id: 'glass-distortion',
        name: 'Glass Distortion',
        prompt: 'Shot through textured glass frosted glass or prism creating beautiful distortion and light refraction, face still recognizable but abstracted through the glass, interesting light patterns and color shifts from refraction, wearing something simple, experimental and artistic, color photography with prismatic effects'
    },
    {
        id: 'window-light-natural',
        name: 'Window Light Natural',
        prompt: 'Soft diffused natural light from large window, documentary-style authenticity, subject wearing a simple shirt or sweater, deep in thought with downcast eyes and relaxed mouth, completely unguarded private moment, real human vulnerability strength in softness, color photography'
    },
    {
        id: 'architectural-minimalism',
        name: 'Architectural Minimalism',
        prompt: 'Subject in clean modern architectural space with concrete walls geometric shadows or minimal furniture, strong directional light from large windows creating dramatic shadows, wearing simple contemporary clothing, composed confident expression, fashion meets architecture, clean lines and negative space, color photography'
    },
    {
        id: 'texture-contrast',
        name: 'Texture Contrast',
        prompt: 'Subject against clean concrete or minimal modern architectural wall, refined masculine features creating striking contrast with textured but clean background, defiant confident expression with direct stare, wearing edgy minimal clothing, modern urban not grungy, color photography'
    },
    {
        id: 'mirror-reflection',
        name: 'Mirror Reflection',
        prompt: 'Captured through a minimal modern mirror with clean lines creating a doubled layered image, contemporary gallery-like setting with neutral tones, subject wearing something simple, making knowing eye contact through the reflection, psychological depth and intimacy, color photography'
    },
    {
        id: 'deep-shadow-mystery',
        name: 'Deep Shadow Mystery',
        prompt: 'Dramatic split lighting with one side of face beautifully lit while other side falls into shadow, enough light to clearly see facial features and skin texture on lit side, single strong directional light source, subject wearing something dark, mysterious and compelling with visible detail, cinematic noir aesthetic, color photography with rich shadows but visible face'
    },
    {
        id: 'studio-color-pop',
        name: 'Studio Color Pop',
        prompt: 'Vibrant saturated backdrop in bold color, male subject wearing neutral toned clothing like navy charcoal or cream that complements but doesnt compete with background, confident composed expression, bold punchy commercial yet editorial sophistication, color photography'
    },
    {
        id: 'szilveszter-mako',
        name: 'Szilveszter Makó Painterly',
        prompt: 'Theatrical painterly portrait using only natural daylight no flash, muted desaturated color palette with Renaissance and Dadaist influences, handmade textured backdrop or draped fabric set piece, subject wearing timeless elegant clothing, melancholic atmospheric mood with dreamlike ethereal quality, soft diffused window light, fine art meets fashion photography, masculine gravitas with artistic sensitivity, color photography with faded muted tones'
    },
    {
        id: 'nadav-kander',
        name: 'Nadav Kander Portrait',
        prompt: 'Spare minimal portrait on plain muted background, meticulous pre-planned lighting emphasizing masculine face structure and bone definition, emotional depth and quiet strength, subject wearing simple understated clothing, pared-down composition where less is more, intense yet intimate gaze revealing character, psychological portrait, subtle muted color palette, color photography'
    },
    {
        id: 'natural-daylight-environment',
        name: 'Natural Daylight Environment',
        prompt: 'Soft overcast daylight with environmental context and depth of field, even and truthful illumination, wearing casual everyday clothing, relaxed genuine expression with natural subtle smile, approachable everyman elevated to editorial, authentic masculinity without performance, color photography'
    },
    {
        id: 'gymnasium-athletic',
        name: 'Gymnasium Athletic',
        prompt: 'Shot in a gymnasium or physical education setting with equipment like bars mats or climbing ropes, subject in athletic wear interacting with the environment, dynamic pose climbing hanging or balancing on something, institutional lighting mixed with flash, raw athletic energy, creates visual memory, color photography'
    },
    {
        id: 'harley-weir',
        name: 'Harley Weir Intimate',
        prompt: 'Intimate close-up portrait with soft natural lighting, visceral organic composition focusing on texture and skin detail, raw and unguarded moment, warm natural tones, slightly grainy film-like quality, tender atmosphere, subject wearing minimal simple clothing, honest imperfect masculine beauty, intimate without being posed, color photography'
    },
    {
        id: 'studio-dramatic-shadow',
        name: 'Studio Dramatic Shadow',
        prompt: 'Overhead spotlight creating dramatic shadows under cheekbones and brow, composed confident expression with relaxed intensity looking down at camera creates nice headshot, wearing simple dark top, high fashion sophistication, powerful yet approachable quiet masculine elegance, color photography'
    },
    {
        id: 'vintage-film',
        name: 'Vintage Film Aesthetic',
        prompt: 'Warm desaturated tones with subtle film grain that adds life, knowing sideways glance, wearing timeless classic clothing, rugged sophistication effortless cool, no light leaks or dust overlays just natural film quality, color photography'
    },
    {
        id: 'medium-format-analog',
        name: 'Medium Format Analog',
        prompt: 'Shot on medium format film camera with distinctive shallow depth of field and creamy bokeh, subtle wide-angle distortion giving slight fisheye feel, rich film grain texture, natural available light, subject wearing casual vintage-inspired clothing, authentic analog warmth with slightly lifted blacks, nostalgic yet contemporary masculine portrait, imperfect focus adds character, color photography with film color rendition'
    },
    {
        id: 'rembrandt-classic',
        name: 'Rembrandt Classic',
        prompt: 'Traditional 45-degree Rembrandt lighting with signature cheek triangle shadow, dark atmospheric background, wearing something elegant or simple, dignified serious expression, timeless portrait technique museum-worthy gravitas, color photography with rich warm tones'
    },
    {
        id: 'motion-blur-energy',
        name: 'Motion Blur Energy',
        prompt: 'Heavy intentional motion blur from rapid spinning or turning movement, long exposure slow shutter creating dramatic blur streaks across entire frame, subject in dynamic motion with clothes streaking through air, kinetic energy and masculine vitality, experimental fashion photography pushing photographic boundaries, alive and electric with visible motion trails, color photography'
    },
    {
        id: 'editorial-beauty-extreme',
        name: 'Editorial Beauty Extreme',
        prompt: 'Elevated editorial grooming with one striking element like a subtle graphic element near eye or unusual color accent, minimal but impactful artistry, strong beauty lighting with clean skin, sleek styled hair, focus on one deliberate statement not overwhelming, high fashion male beauty editorial with restraint, confident striking expression, color photography'
    },
    {
        id: 'hands-in-frame',
        name: 'Hands in Frame',
        prompt: 'Hands interacting with face covering part of face fingers running through hair or framing features, creates depth and intimacy with foreground interest, interesting directional lighting creating shadows through fingers, wearing something simple, contemplative or intense expression, color photography'
    },
    {
        id: 'smoke-atmosphere',
        name: 'Smoke and Atmosphere',
        prompt: 'Subtle haze or smoke diffusing the light, atmospheric depth, mysterious expression with hooded eyes, wearing something dark, noir masculinity secrets and stories, the interesting man in a smoky room documentary feeling, color photography with muted tones'
    },
    {
        id: 'harsh-daylight-raw',
        name: 'Harsh Daylight Raw',
        prompt: 'Unforgiving direct overhead sun, extreme contrast with hard shadows, no flattering diffusion, wearing simple summer clothing, raw unflinching honesty, confidence that doesnt need soft lighting, masculinity that owns its flaws, color photography'
    },
    {
        id: 'analog-warmth',
        name: 'Analog Warmth',
        prompt: 'Warm analog film aesthetic with gentle color shifts and slightly lifted blacks, subtle film grain texture, subject can be slightly out of focus or have gentle motion blur adding life, wearing casual clothing, relaxed unstudied expression with casual glance, nostalgic warmth authentic and human, color photography'
    },
    {
        id: 'helmut-newton-power',
        name: 'Helmut Newton Power',
        prompt: 'Hard flash with deep black shadows, high contrast glamour, powerful dominant stance, strong architectural composition, wearing bold tailored pieces or minimal clothing, intense commanding gaze, dangerous masculinity that demands respect, color photography with high contrast'
    },
    {
        id: 'richard-avedon-stark',
        name: 'Richard Avedon Stark',
        prompt: 'Pure white seamless background no shadows anywhere, subject isolated in infinite white space, wearing simple clothing, raw psychological intensity in expression, every line and texture visible, stripped-down honesty revealing character through absence of artifice, color photography'
    },
    {
        id: 'peter-lindbergh-soul',
        name: 'Peter Lindbergh Soul',
        prompt: 'Soft natural light, minimal styling, wearing simple understated clothing, authentic unretouched features, soulful introspective expression with gentle intensity, capturing the real man behind the image, rich tonal range, color photography'
    },
    {
        id: 'steven-meisel-glam',
        name: 'Steven Meisel Glam',
        prompt: 'Perfectly controlled studio lighting with immaculate grooming, polished editorial styling, minimal high-end designer clothing in neutral tones, confident transformative expression, modern masculine elegance with sophisticated simplicity, color photography'
    },
    {
        id: 'guy-bourdin-surreal',
        name: 'Guy Bourdin Surreal',
        prompt: 'Desaturated candy-colored backdrop that is clean not noisy, surrealist composition with unusual crop, glossy lacquered aesthetic, wearing bold fashion pieces, slightly unsettling undertone, fashion as fever dream but sophisticated not 90s bright, color photography'
    },
    {
        id: 'hard-flash-paparazzi',
        name: 'Hard Flash Paparazzi',
        prompt: 'Direct on-camera flash blasting harsh light like tabloid photography, caught-off-guard moment, slight motion blur, wearing suited or party clothing, compressed telephoto look, candid chaos frozen in time, celebrity arrival aesthetic elevated to art, color photography'
    },
    {
        id: 'harsh-fill-flash-daylight',
        name: 'Harsh Fill Flash Daylight',
        prompt: 'Strong fill flash in bright daylight creating flat punchy slightly overexposed look with powerful presence, outdoor setting shot from slightly below eye level making subject look commanding and dominant, wearing casual clothing, direct confident powerful expression owning the frame, snapshot aesthetic but intentional, harsh midday sun mixed with flash, color photography'
    },
    {
        id: 'bounced-flash-soft',
        name: 'Bounced Flash Soft',
        prompt: 'Flash bounced off ceiling creating soft wraparound fill, natural-looking flash photography, wearing casual comfortable clothing, subtle catchlights, easy relaxed expression, editorial candid that looks effortlessly captured moment, color photography'
    },
    {
        id: 'juergen-teller-raw',
        name: 'Juergen Teller Raw',
        prompt: 'On-camera flash in daylight creating fill-flash snapshot aesthetic, deliberately casual angles, wearing everyday clothing, anti-glamour honesty, caught in genuine unposed moment, beauty in authenticity and imperfection, color photography'
    },
    {
        id: 'paolo-roversi-ethereal',
        name: 'Paolo Roversi Ethereal',
        prompt: 'Long exposure creating soft ghostly blur, romantic painterly quality, wearing flowing or simple clothing that can blur with movement, mysterious presence emerging from darkness, time suspended in eternal moment, color photography with muted romantic tones'
    },
    {
        id: 'mario-testino-raw',
        name: 'Mario Testino Raw',
        prompt: 'Natural lighting that feels raw and real not overly golden or polished, genuine energy and confidence, wearing effortless clothing, authentic moment not staged beach glamour, real-world context, masculine beauty as natural celebration, color photography'
    },
    {
        id: 'nick-knight-experimental',
        name: 'Nick Knight Experimental',
        prompt: 'Experimental aesthetic pushing photography into abstract painterly territory, motion blur or intentional distortion, wearing avant-garde or simple contrasting pieces, unusual but not garish color grading avoiding purple and yellow, fashion as avant-garde installation, color photography'
    },
    {
        id: 'herb-ritts-sculptural',
        name: 'Herb Ritts Sculptural',
        prompt: 'High contrast outdoor natural light, body as classical sculpture, emphasis on perfect masculine form, sun-drenched California aesthetic, can wear minimal athletic wear or simple pieces, timeless physical beauty, color photography'
    },
    {
        id: 'david-sims-minimal',
        name: 'David Sims Minimal',
        prompt: 'Ultra clean minimal composition, stark graphic shapes, wearing simple minimal clothing in neutral tones, cool detached attitude, editorial restraint where less is more, sophisticated intelligence in the gaze, fashion stripped to essentials, color photography'
    },
    {
        id: 'terry-richardson-snapshot',
        name: 'Terry Richardson Snapshot',
        prompt: 'Harsh direct flash against white wall, deliberately amateur snapshot aesthetic, wearing casual clothing, irreverent energy, anti-fashion fashion, raw unfiltered documentation vibe, color photography'
    },
    {
        id: 'annie-leibovitz-narrative',
        name: 'Annie Leibovitz Narrative',
        prompt: 'Cinematic environmental portrait with rich production value, subject as character in a story, dramatic theatrical lighting, wearing character-appropriate clothing, elaborate location, expression carrying narrative weight, color photography'
    },
    {
        id: 'studio-with-props',
        name: 'Studio with Personal Props',
        prompt: 'Minimal studio setting with one interesting prop that feels like a personal belonging - sitting in a chair with a vintage TV next to it, a plant, sports equipment, or furniture that feels authentic, wearing casual real clothing, simple but adds story and context, feels real and personal, color photography'
    },
    {
        id: 'ellen-von-unwerth-playful',
        name: 'Playful Energy',
        prompt: 'Playful energy with genuine laughter matching female version, retro vintage glamour nods, wearing casual or playful clothing, caught-in-moment spontaneity, knowing glance, subtle film grain, the fun side of fashion male and female should both laugh, color photography'
    },
    {
        id: 'mixed-lighting-color',
        name: 'Mixed Lighting Color',
        prompt: 'Flash balanced with strong colored ambient light like a red neon or hard blue light creating color cast on one side, mixed color temperatures creating depth and drama, wearing simple clothing, intimate environmental context, editorial candid with bold color accent, color photography'
    },
    {
        id: 'strobe-frozen-motion',
        name: 'Strobe Frozen Motion',
        prompt: 'High-speed strobe freezing dramatic movement captured at peak action spinning jumping leaning back or twisting torso, wearing high-end designer fashion or tailored pieces that move beautifully showing luxurious fabric in motion, clothes caught mid-motion, kinetic energy with unique angle and body position every shot, elevated fashion editorial not casual wear, dynamic masculine performance, color photography'
    }
];

// Framing options - separate from mood
const FRAMING_OPTIONS = [
    { id: 'headshot', name: 'Headshot', prompt: 'classic headshot portrait from chest up' },
    { id: 'half-body', name: 'Half Body', prompt: 'half-body portrait from waist up showing torso and arms' },
    { id: 'three-quarter', name: 'Three Quarter', prompt: 'three-quarter body shot from thighs up' },
    { id: 'full-body', name: 'Full Body', prompt: 'full body portrait showing complete figure head to toe' }
];

// Expression options by category
const EXPRESSION_CATEGORIES = {
    fierce: [
        { id: 'fierce-parted', name: 'Fierce Parted', prompt: 'fierce intense gaze with slightly parted lips' },
        { id: 'intense-clenched', name: 'Intense Clenched', prompt: 'intense powerful stare with clenched jaw' },
        { id: 'smoldering', name: 'Smoldering', prompt: 'smoldering look with lips barely open' },
        { id: 'defiant', name: 'Defiant', prompt: 'defiant expression with chin raised, challenging the camera' },
        { id: 'commanding', name: 'Commanding', prompt: 'commanding presence with brow slightly furrowed' },
        { id: 'sharp-closed', name: 'Sharp Closed', prompt: 'sharp piercing eyes with mouth firmly closed' },
        { id: 'flared', name: 'Nostrils Flared', prompt: 'powerful stare with nostrils slightly flared, raw intensity' }
    ],
    editorial: [
        { id: 'blank-stare', name: 'Editorial Blank', prompt: 'editorial blank stare with lips relaxed, fashion neutral' },
        { id: 'fashion-pout', name: 'Fashion Pout', prompt: 'fashion pout with eyes half-lidded' },
        { id: 'nonchalant', name: 'Nonchalant', prompt: 'model-off-duty nonchalant expression, effortlessly cool' },
        { id: 'high-fashion', name: 'High Fashion', prompt: 'high fashion disdain, looking slightly past camera' },
        { id: 'cool-tilt', name: 'Cool Tilt', prompt: 'effortless cool with slight head tilt, unbothered' }
    ],
    sensual: [
        { id: 'parted-closed', name: 'Parted Eyes Closed', prompt: 'lips parted with eyes gently closed' },
        { id: 'tilted-back', name: 'Head Back', prompt: 'head tilted back with eyes closed, serene and sensual' },
        { id: 'lip-bite', name: 'Lip Bite', prompt: 'biting lower lip with direct gaze' },
        { id: 'tongue-playful', name: 'Tongue Playful', prompt: 'tongue slightly visible, playful and confident' },
        { id: 'exhale', name: 'Open Exhale', prompt: 'open mouth mid-exhale with eyes closed, surrendering' },
        { id: 'wet-dreamy', name: 'Wet Dreamy', prompt: 'wet lips slightly parted with dreamy distant gaze' }
    ],
    soft: [
        { id: 'soft-smile', name: 'Soft Smile', prompt: 'soft genuine smile with eyes slightly crinkled' },
        { id: 'contemplative', name: 'Contemplative', prompt: 'contemplative expression looking away, lost in thought' },
        { id: 'gentle-closed', name: 'Gentle Closed', prompt: 'gentle peaceful moment with eyes softly closed' },
        { id: 'natural-laugh', name: 'Natural Laugh', prompt: 'natural mid-laugh with genuine joy' },
        { id: 'soft-gaze', name: 'Soft Gaze', prompt: 'peaceful expression with soft unfocused gaze' }
    ],
    dynamic: [
        { id: 'mid-breath', name: 'Mid Breath', prompt: 'mouth open mid-breath, caught in motion' },
        { id: 'wind-squint', name: 'Wind Squint', prompt: 'wind-blown with eyes squinting slightly' },
        { id: 'over-shoulder', name: 'Over Shoulder', prompt: 'looking over shoulder with surprised expression' },
        { id: 'laugh-motion', name: 'Laugh Motion', prompt: 'eyes closed in genuine laughter, head thrown back' },
        { id: 'dramatic-open', name: 'Dramatic Open', prompt: 'dramatic wide open mouth, shouting or singing' }
    ]
};

// Flatten all expressions into one array for random access
const ALL_EXPRESSIONS = Object.values(EXPRESSION_CATEGORIES).flat();

// Expression pools for mood types
const EXPRESSION_POOLS = {
    fierce: [...EXPRESSION_CATEGORIES.fierce, ...EXPRESSION_CATEGORIES.editorial],
    soft: [...EXPRESSION_CATEGORIES.soft, ...EXPRESSION_CATEGORIES.sensual.slice(0, 2)],
    editorial: [...EXPRESSION_CATEGORIES.editorial, ...EXPRESSION_CATEGORIES.fierce.slice(0, 3)],
    sensual: [...EXPRESSION_CATEGORIES.sensual, ...EXPRESSION_CATEGORIES.soft.slice(0, 2)],
    dynamic: [...EXPRESSION_CATEGORIES.dynamic, ...EXPRESSION_CATEGORIES.fierce.slice(0, 2)],
    all: ALL_EXPRESSIONS
};

// Get random expression from a pool
function getRandomExpression(poolName = 'fierce') {
    const pool = EXPRESSION_POOLS[poolName] || EXPRESSION_POOLS.fierce;
    return pool[Math.floor(Math.random() * pool.length)];
}

// Map mood IDs to their appropriate expression pool
// soft = gentle/dreamy moods, dynamic = motion moods, sensual = beauty/intimate, editorial = fashion neutral, fierce = everything else
const MOOD_EXPRESSION_MAP = {
    // Soft moods - gentle expressions
    'soft-diffusion': 'soft',
    'window-light-natural': 'soft',
    'paolo-roversi-ethereal': 'soft',
    'analog-warmth': 'soft',
    'peter-lindbergh-soul': 'soft',
    'bounced-flash-soft': 'soft',
    'natural-daylight-environment': 'soft',
    'szilveszter-mako': 'soft',
    'harley-weir': 'soft',
    'nadav-kander': 'soft',
    'medium-format-analog': 'soft',

    // Dynamic moods - movement expressions
    'motion-blur-candid': 'dynamic',
    'motion-blur': 'dynamic',
    'motion-blur-energy': 'dynamic',
    'strobe-frozen-motion': 'dynamic',
    'flash-rawness': 'dynamic',
    'hard-flash-paparazzi': 'dynamic',
    'gymnasium-athletic': 'dynamic',
    'ellen-von-unwerth-playful': 'dynamic',

    // Sensual moods - intimate expressions
    'beauty-closeup': 'sensual',
    'wet-look': 'sensual',
    'smoke-atmosphere': 'sensual',
    'deep-shadow-mystery': 'sensual',
    'mirror-reflection': 'sensual',

    // Editorial moods - fashion neutral
    'stark-minimalism': 'editorial',
    'richard-avedon-stark': 'editorial',
    'david-sims-minimal': 'editorial',
    'studio-color-pop': 'editorial',
    'steven-meisel-glam': 'editorial',
    'guy-bourdin-surreal': 'editorial',

    // Everything else defaults to fierce
};

// Get expression pool for a mood
function getExpressionPoolForMood(moodId) {
    return MOOD_EXPRESSION_MAP[moodId] || 'fierce';
}

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
    window.EXPRESSION_CATEGORIES = EXPRESSION_CATEGORIES;
    window.EXPRESSION_POOLS = EXPRESSION_POOLS;
    window.ALL_EXPRESSIONS = ALL_EXPRESSIONS;
    window.MOOD_EXPRESSION_MAP = MOOD_EXPRESSION_MAP;
    window.getRandomEditorialMood = getRandomEditorialMood;
    window.getFramingById = getFramingById;
    window.getRandomExpression = getRandomExpression;
    window.getExpressionPoolForMood = getExpressionPoolForMood;
}
