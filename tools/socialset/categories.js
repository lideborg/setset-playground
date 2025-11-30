// Product Categories Configuration for SocialSet
// 8 categories in 4x2 grid layout

const PRODUCT_CATEGORIES = [
    // Row 1 - Upper Body
    {
        id: 'top',
        name: 'Top',
        description: 'T-shirts, blouses, tanks, button-ups',
        required: true,  // Required for non-dress outfits
        conflictsWith: ['dress'],  // If dress is selected, top is not needed
        folder: 'top',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 4l-4 4v2h4v10h12V10h4V8l-4-4h-4l-2 3-2-3H6z"/>
        </svg>`
    },
    {
        id: 'sweater',
        name: 'Sweater',
        description: 'Knits, cardigans, pullovers',
        required: false,
        conflictsWith: [],
        folder: 'sweater',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 4l-4 4v2h4v10h12V10h4V8l-4-4h-4l-2 3-2-3H6z"/>
            <path d="M8 10h8M8 14h8"/>
        </svg>`
    },
    {
        id: 'outerwear',
        name: 'Outerwear',
        description: 'Jackets, coats, blazers',
        required: false,
        conflictsWith: [],
        folder: 'outerwear',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M4 6l2-2h4l2 2 2-2h4l2 2v14H4V6z"/>
            <path d="M12 4v16"/>
        </svg>`
    },
    {
        id: 'dress',
        name: 'Dress',
        description: 'Dresses (standalone piece)',
        required: false,
        standalone: true,  // When selected, replaces top + bottom
        conflictsWith: ['top', 'bottom'],
        folder: 'dress',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M8 2h8l-1 6h2l-3 14H10L7 8h2L8 2z"/>
        </svg>`
    },
    // Row 2 - Lower Body + Accessories
    {
        id: 'bottom',
        name: 'Bottom',
        description: 'Pants, jeans, shorts, skirts',
        required: true,  // Required for non-dress outfits
        conflictsWith: ['dress'],
        folder: 'bottom',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2h12v6l-2 14h-3l-1-12-1 12H8L6 8V2z"/>
        </svg>`
    },
    {
        id: 'shoes',
        name: 'Shoes',
        description: 'All footwear',
        required: true,  // Usually needed for full-body shots
        conflictsWith: [],
        folder: 'shoes',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 18h18v2H3v-2z"/>
            <path d="M5 18v-4l4-2 6 1 4 1v4"/>
        </svg>`
    },
    {
        id: 'bag',
        name: 'Bag',
        description: 'Handbags, clutches, backpacks',
        required: false,
        conflictsWith: [],
        folder: 'bag',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="4" y="8" width="16" height="12" rx="2"/>
            <path d="M8 8V6a4 4 0 018 0v2"/>
        </svg>`
    },
    {
        id: 'accessories',
        name: 'Accessories',
        description: 'Eyewear, jewelry, hats, scarves',
        required: false,
        conflictsWith: [],
        folder: 'accessories',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="12" r="3"/>
            <path d="M9 12h6"/>
        </svg>`
    }
];

// Styling Rules Engine
const STYLING_RULES = {
    // Check if an outfit is valid
    isValidOutfit(selectedCategories) {
        const hasTop = selectedCategories.includes('top');
        const hasBottom = selectedCategories.includes('bottom');
        const hasDress = selectedCategories.includes('dress');

        // Dress is standalone - if selected, don't need top/bottom
        if (hasDress) {
            return true;
        }

        // Otherwise need at least top + bottom
        return hasTop && hasBottom;
    },

    // Get which categories are required based on current selection
    getRequiredCategories(selectedCategories) {
        const hasDress = selectedCategories.includes('dress');

        if (hasDress) {
            return ['dress'];  // Only dress is required
        }

        return ['top', 'bottom'];  // Need top and bottom
    },

    // Check if a category can be enabled based on conflicts
    canEnable(categoryId, selectedCategories) {
        const category = PRODUCT_CATEGORIES.find(c => c.id === categoryId);
        if (!category) return false;

        // Check if any conflicting category is selected
        for (const conflictId of category.conflictsWith) {
            if (selectedCategories.includes(conflictId)) {
                return false;
            }
        }

        return true;
    },

    // Get categories that should be disabled based on selection
    getDisabledCategories(selectedCategories) {
        const disabled = [];

        for (const category of PRODUCT_CATEGORIES) {
            if (!this.canEnable(category.id, selectedCategories) && !selectedCategories.includes(category.id)) {
                disabled.push(category.id);
            }
        }

        return disabled;
    },

    // Random outfit generation with styling rules
    generateRandomOutfit(availableProducts, gender = 'female') {
        const outfit = {};

        // Decide: dress or top+bottom?
        const hasDresses = availableProducts.dress && availableProducts.dress[gender]?.length > 0;
        const hasTops = availableProducts.top && availableProducts.top[gender]?.length > 0;
        const hasBottoms = availableProducts.bottom && availableProducts.bottom[gender]?.length > 0;

        // 30% chance of dress if available, otherwise top+bottom
        const useDress = hasDresses && Math.random() < 0.3;

        if (useDress) {
            // Pick a random dress
            outfit.dress = this.pickRandom(availableProducts.dress[gender]);
        } else if (hasTops && hasBottoms) {
            // Pick top + bottom
            outfit.top = this.pickRandom(availableProducts.top[gender]);
            outfit.bottom = this.pickRandom(availableProducts.bottom[gender]);

            // 40% chance of sweater if available
            if (availableProducts.sweater?.[gender]?.length > 0 && Math.random() < 0.4) {
                outfit.sweater = this.pickRandom(availableProducts.sweater[gender]);
            }

            // 30% chance of outerwear if available
            if (availableProducts.outerwear?.[gender]?.length > 0 && Math.random() < 0.3) {
                outfit.outerwear = this.pickRandom(availableProducts.outerwear[gender]);
            }
        }

        // Always try to add shoes for full-body shots
        if (availableProducts.shoes?.[gender]?.length > 0) {
            outfit.shoes = this.pickRandom(availableProducts.shoes[gender]);
        }

        // 25% chance of bag
        if (availableProducts.bag?.[gender]?.length > 0 && Math.random() < 0.25) {
            outfit.bag = this.pickRandom(availableProducts.bag[gender]);
        }

        // 20% chance of accessories
        if (availableProducts.accessories?.[gender]?.length > 0 && Math.random() < 0.2) {
            outfit.accessories = this.pickRandom(availableProducts.accessories[gender]);
        }

        return outfit;
    },

    // Pick a random item from array
    pickRandom(array) {
        if (!array || array.length === 0) return null;
        return array[Math.floor(Math.random() * array.length)];
    }
};

// Build outfit description for prompt
function buildOutfitDescription(outfit) {
    const parts = [];

    if (outfit.dress) {
        parts.push(`wearing a ${outfit.dress.description || 'dress'}`);
    } else {
        if (outfit.top) {
            parts.push(outfit.top.description || 'a top');
        }
        if (outfit.bottom) {
            parts.push(outfit.bottom.description || 'pants');
        }
    }

    if (outfit.sweater) {
        parts.push(`layered with ${outfit.sweater.description || 'a sweater'}`);
    }

    if (outfit.outerwear) {
        parts.push(`with ${outfit.outerwear.description || 'a jacket'}`);
    }

    if (outfit.shoes) {
        parts.push(`and ${outfit.shoes.description || 'shoes'}`);
    }

    if (outfit.bag) {
        parts.push(`carrying ${outfit.bag.description || 'a bag'}`);
    }

    if (outfit.accessories) {
        parts.push(`accessorized with ${outfit.accessories.description || 'accessories'}`);
    }

    return parts.join(', ') || 'casual outfit';
}

// Export for use in HTML
if (typeof window !== 'undefined') {
    window.PRODUCT_CATEGORIES = PRODUCT_CATEGORIES;
    window.STYLING_RULES = STYLING_RULES;
    window.buildOutfitDescription = buildOutfitDescription;
}
