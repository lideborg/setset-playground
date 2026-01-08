// Editorial Location/Environment Pools for Campaign Mode
// Each location describes a backdrop/environment for placing models
//
// GLOBAL RULES:
// - Focus on creating cohesive, fashion-appropriate environments
// - Model should be close enough to see clearly (not too wide/distant)
// - Clean modern aesthetics - no grungy or overly busy backgrounds
// - Environments should complement fashion photography, not distract

const INDOOR_LOCATIONS = [
    // Studio environments with backdrops
    {
        id: 'minimal-studio-white',
        name: 'Minimal White Studio',
        prompt: 'clean minimal white photography studio, seamless white backdrop, soft diffused lighting, professional fashion studio environment, simple and elegant, no props, pure white infinity cove'
    },
    {
        id: 'minimal-studio-gray',
        name: 'Minimal Gray Studio',
        prompt: 'clean minimal gray photography studio, seamless medium gray backdrop, soft professional lighting, fashion studio environment, elegant simplicity, no distracting elements'
    },
    {
        id: 'studio-black-backdrop',
        name: 'Black Backdrop Studio',
        prompt: 'professional photo studio with seamless black backdrop, dramatic rim lighting, subject emerging from darkness, moody editorial atmosphere, high contrast studio setup'
    },
    {
        id: 'studio-colored-backdrop',
        name: 'Colored Backdrop Studio',
        prompt: 'photo studio with bold colored seamless paper backdrop, saturated hue like deep blue or terracotta or sage green, professional studio lighting, fashion editorial color pop'
    },
    {
        id: 'studio-canvas-backdrop',
        name: 'Canvas Backdrop Studio',
        prompt: 'photo studio with hand-painted canvas backdrop, mottled texture in muted earth tones, old master portrait feeling, soft professional lighting, fine art photography aesthetic'
    },
    {
        id: 'bts-studio-wide',
        name: 'BTS Studio Wide',
        prompt: 'behind the scenes photo studio, wide shot showing studio lights and softboxes in background, c-stands and equipment visible, seamless paper backdrop, professional photography set, creative workspace atmosphere'
    },
    {
        id: 'bts-studio-moody',
        name: 'BTS Studio Moody',
        prompt: 'atmospheric photo studio behind the scenes, dramatic lighting equipment visible, dark moody studio space, professional strobes and modifiers in background, editorial shoot environment'
    },
    {
        id: 'bts-studio-fashion',
        name: 'BTS Fashion Studio',
        prompt: 'high-end fashion photo studio behind the scenes, multiple lights and flags visible, clothing rack in background, makeup station glimpse, professional fashion shoot environment, crew workspace'
    },
    {
        id: 'big-studio-daylight',
        name: 'Big Daylight Studio',
        prompt: 'large open photography studio with massive north-facing windows, natural daylight flooding in, high industrial ceilings, polished concrete floor, minimal professional equipment visible'
    },
    // Apartments & residential
    {
        id: 'milanese-apartment',
        name: 'Milanese Apartment',
        prompt: 'elegant Milanese apartment interior, terrazzo floors, high ceilings with ornate moldings, large windows with soft natural light, refined Italian design, marble accents, minimal furniture'
    },
    {
        id: 'parisian-apartment',
        name: 'Parisian Apartment',
        prompt: 'classic Parisian apartment with herringbone parquet floors, tall French windows, white walls with subtle moldings, natural daylight streaming in, romantic elegant atmosphere'
    },
    {
        id: 'soho-loft',
        name: 'SoHo Loft',
        prompt: 'New York SoHo loft interior, exposed brick walls, large industrial windows with natural light, polished concrete floors, high ceilings, minimalist contemporary furniture, warm industrial chic'
    },
    {
        id: 'scandinavian-interior',
        name: 'Scandinavian Interior',
        prompt: 'Scandinavian minimal interior, light wood floors, white walls, large windows, clean Nordic design, hygge warmth, natural materials, soft diffused daylight'
    },
    {
        id: 'modernist-villa',
        name: 'Modernist Villa',
        prompt: 'mid-century modernist villa interior, clean lines, floor-to-ceiling windows, terrazzo floors, iconic furniture silhouettes, Palm Springs aesthetic, warm natural light'
    },
    {
        id: 'penthouse-suite',
        name: 'Penthouse Suite',
        prompt: 'luxury penthouse suite interior, floor-to-ceiling windows with city views blurred in background, contemporary minimalist design, evening ambient lighting'
    },
    // Cultural & architectural
    {
        id: 'gallery-space',
        name: 'Gallery Space',
        prompt: 'contemporary art gallery interior, pristine white walls, polished concrete floor, track lighting, minimal clean space, museum-quality finish, architectural refinement'
    },
    {
        id: 'architectural-concrete',
        name: 'Architectural Concrete',
        prompt: 'modern architectural interior with clean concrete walls and floors, geometric shadows from large windows, brutalist elegance, minimal contemporary design, natural light'
    },
    {
        id: 'museum-hall',
        name: 'Museum Hall',
        prompt: 'grand museum hall with high vaulted ceilings, marble floors, classical columns, natural light from skylights, architectural grandeur, cultural institution'
    },
    // Fashion & creative
    {
        id: 'atelier-studio',
        name: 'Fashion Atelier',
        prompt: 'fashion designer atelier studio, rolls of fabric in background, large work table, natural light from tall windows, creative workspace with elegant disorder'
    },
    {
        id: 'fashion-showroom',
        name: 'Fashion Showroom',
        prompt: 'fashion showroom with minimal racks in background, clean white space, professional lighting, backstage fashion week atmosphere, elevated retail environment'
    },
    // Specialty interiors
    {
        id: 'greenhouse-interior',
        name: 'Greenhouse Interior',
        prompt: 'elegant greenhouse or conservatory interior, glass walls and ceiling, filtered natural light, tropical plants in background, iron framework, botanical garden atmosphere'
    },
    {
        id: 'hotel-lobby',
        name: 'Luxury Hotel Lobby',
        prompt: 'elegant luxury hotel lobby, marble floors, high ceilings, contemporary design with classical elements, soft ambient lighting, refined sophisticated atmosphere'
    },
    {
        id: 'japanese-ryokan',
        name: 'Japanese Ryokan',
        prompt: 'traditional Japanese ryokan interior, tatami mats, shoji screens, minimal low furniture, natural materials, zen tranquility, warm wood tones, soft filtered light'
    },
    {
        id: 'art-deco-interior',
        name: 'Art Deco Interior',
        prompt: 'elegant Art Deco interior, geometric patterns, gold and cream tones, sleek curved furniture, vintage glamour, sophisticated 1920s-inspired design, warm lighting'
    },
    {
        id: 'industrial-loft',
        name: 'Industrial Loft',
        prompt: 'refined industrial loft space, exposed steel beams and columns, large factory windows, polished concrete floor, converted warehouse elegance, warm ambient lighting'
    },
    {
        id: 'tokyo-studio',
        name: 'Tokyo Minimal Studio',
        prompt: 'Japanese-inspired minimal photography studio, clean tatami or light wood floors, shoji screen diffused light, serene zen atmosphere, natural materials, warm minimal aesthetic'
    },
    {
        id: 'sculpture-gallery',
        name: 'Sculpture Gallery',
        prompt: 'elegant sculpture gallery with white pedestals, arched doorways, natural light from skylights, classical proportions with modern sensibility, sophisticated art space'
    },
    {
        id: 'boutique-interior',
        name: 'Fashion Boutique',
        prompt: 'high-end fashion boutique interior, minimal fixtures, soft lighting, clean display areas, luxury retail environment, sophisticated and understated'
    },
    {
        id: 'marble-bathroom',
        name: 'Marble Bathroom',
        prompt: 'luxurious marble bathroom interior, Carrara marble surfaces, large mirror, soft lighting, elegant brass fixtures, spa-like atmosphere, high-end residential'
    },
    {
        id: 'library-study',
        name: 'Library Study',
        prompt: 'sophisticated library study with built-in bookshelves, leather furniture hints, warm wood paneling, soft lamp lighting, intellectual refined atmosphere'
    },
    {
        id: 'ballet-studio',
        name: 'Ballet Studio',
        prompt: 'professional ballet studio, wooden floors, large mirrors, ballet barre along wall, high ceilings with natural light, graceful elegant space'
    }
];

const OUTDOOR_LOCATIONS = [
    {
        id: 'rooftop-nyc',
        name: 'NYC Rooftop',
        prompt: 'New York City rooftop terrace, water towers and skyline softly blurred in background, golden hour light, urban elegance, contemporary outdoor space'
    },
    {
        id: 'lisbon-streets',
        name: 'Lisbon Streets',
        prompt: 'sun-drenched Lisbon street with pastel-colored buildings, traditional azulejo tiles, warm Mediterranean light, cobblestone texture, Portuguese architectural charm'
    },
    {
        id: 'scandinavian-streets',
        name: 'Scandinavian Streets',
        prompt: 'clean Scandinavian city street, Copenhagen or Stockholm aesthetic, modern minimalist architecture, overcast soft light, Nordic urban design, muted color palette'
    },
    {
        id: 'paris-courtyard',
        name: 'Parisian Courtyard',
        prompt: 'elegant Parisian courtyard with limestone buildings, iron balconies, soft natural light, romantic French architecture, cobblestone ground, sophisticated urban oasis'
    },
    {
        id: 'tokyo-alley',
        name: 'Tokyo Side Street',
        prompt: 'quiet Tokyo side street, clean minimal Japanese architecture, soft diffused light, urban tranquility, modern meets traditional, subtle neon accents in background'
    },
    {
        id: 'milan-piazza',
        name: 'Milan Piazza',
        prompt: 'elegant Milan piazza with classical Italian architecture, marble facades, golden afternoon light, sophisticated European urban space, fashion capital atmosphere'
    },
    {
        id: 'greek-island',
        name: 'Greek Island',
        prompt: 'whitewashed Greek island architecture, Santorini or Mykonos style, blue doors and shutters, Mediterranean sunlight, clean geometric forms, azure sky background'
    },
    {
        id: 'marrakech-riad',
        name: 'Marrakech Riad',
        prompt: 'Moroccan riad courtyard, intricate tile work, arched doorways, warm terracotta tones, dappled sunlight through palms, exotic elegance, North African design'
    },
    {
        id: 'modern-terrace',
        name: 'Modern Terrace',
        prompt: 'contemporary rooftop terrace, minimal outdoor furniture, clean lines, city skyline blurred in distance, sunset golden hour, architectural outdoor living'
    },
    {
        id: 'sculpture-park',
        name: 'Sculpture Park',
        prompt: 'outdoor sculpture garden, modern art pieces in background, manicured lawn, natural daylight, cultural outdoor space, art meets nature, close framing on subject'
    },
    {
        id: 'botanical-garden',
        name: 'Botanical Garden',
        prompt: 'lush botanical garden setting, tropical foliage, dappled sunlight through leaves, natural green backdrop, organic textures, garden pathway'
    },
    {
        id: 'modernist-exterior',
        name: 'Modernist Architecture',
        prompt: 'mid-century modern architecture exterior, clean geometric lines, warm concrete and wood, landscaped grounds, architectural photography aesthetic, golden light'
    },
    {
        id: 'vineyard-estate',
        name: 'Vineyard Estate',
        prompt: 'elegant vineyard estate, rolling vine rows softly blurred, stone villa in background, Tuscan or Provence atmosphere, warm afternoon light, wine country sophistication'
    },
    {
        id: 'beach-minimalist',
        name: 'Minimalist Beach',
        prompt: 'minimalist beach setting, clean sand, calm ocean horizon, soft overcast light, not crowded or wide shot, intimate beach portrait backdrop, subtle coastal elegance'
    },
    {
        id: 'urban-concrete',
        name: 'Urban Concrete',
        prompt: 'modern urban environment with clean concrete architecture, geometric shadows, brutalist design elements, city backdrop, contemporary urban fashion setting'
    },
    {
        id: 'london-mews',
        name: 'London Mews',
        prompt: 'charming London mews street, pastel painted townhouses, cobblestone ground, soft English light, intimate urban setting, British architectural charm'
    },
    {
        id: 'palm-springs',
        name: 'Palm Springs',
        prompt: 'Palm Springs mid-century exterior, palm trees, bright blue sky, desert modernism architecture, pool area glimpse, warm California light, retro glamour'
    },
    {
        id: 'paris-bridge',
        name: 'Paris Bridge',
        prompt: 'elegant Parisian bridge over the Seine, ornate iron details, soft morning light, romantic Paris backdrop, Pont Alexandre III aesthetic, timeless French elegance'
    },
    {
        id: 'warehouse-exterior',
        name: 'Warehouse District',
        prompt: 'converted warehouse district exterior, industrial windows, exposed brick, creative neighborhood aesthetic, soft natural light, urban regeneration charm'
    },
    {
        id: 'mountain-modern',
        name: 'Mountain Modern',
        prompt: 'modern mountain retreat exterior, floor-to-ceiling glass, mountain backdrop softly blurred, alpine contemporary architecture, crisp natural light'
    },
    {
        id: 'courtyard-garden',
        name: 'Courtyard Garden',
        prompt: 'intimate courtyard garden, climbing vines on stone walls, flagstone floor, soft dappled light, secret garden atmosphere, European townhouse charm'
    },
    {
        id: 'los-angeles-hills',
        name: 'LA Hills',
        prompt: 'Los Angeles hillside setting, modern architecture with canyon views blurred in background, warm California golden hour, sophisticated West Coast aesthetic'
    },
    {
        id: 'amsterdam-canal',
        name: 'Amsterdam Canal',
        prompt: 'Amsterdam canal side, traditional Dutch architecture, bicycles and bridges in background, soft overcast light, charming European urban setting'
    },
    {
        id: 'minimalist-courtyard',
        name: 'Minimalist Courtyard',
        prompt: 'minimalist architectural courtyard, clean white or concrete walls, geometric design, single tree or plant accent, soft natural light, zen outdoor space'
    },
    {
        id: 'barcelona-gothic',
        name: 'Barcelona Gothic Quarter',
        prompt: 'Barcelona Gothic Quarter street, warm stone buildings, narrow atmospheric alley, Mediterranean light filtering through, Spanish architectural details, romantic urban setting'
    }
];

// All locations combined
const ALL_LOCATIONS = [...INDOOR_LOCATIONS, ...OUTDOOR_LOCATIONS];

// Helper function to get random location
function getRandomLocation(type = 'all') {
    let pool;
    if (type === 'indoor') {
        pool = INDOOR_LOCATIONS;
    } else if (type === 'outdoor') {
        pool = OUTDOOR_LOCATIONS;
    } else {
        pool = ALL_LOCATIONS;
    }
    return pool[Math.floor(Math.random() * pool.length)];
}

// Get location by id
function getLocationById(id) {
    return ALL_LOCATIONS.find(loc => loc.id === id);
}

// Export for use
if (typeof window !== 'undefined') {
    window.INDOOR_LOCATIONS = INDOOR_LOCATIONS;
    window.OUTDOOR_LOCATIONS = OUTDOOR_LOCATIONS;
    window.ALL_LOCATIONS = ALL_LOCATIONS;
    window.getRandomLocation = getRandomLocation;
    window.getLocationById = getLocationById;
}
