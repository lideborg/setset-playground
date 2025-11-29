/**
 * Utilities - Setset Playground
 * Common helper functions
 */

/**
 * Download a file from URL
 */
async function downloadFile(url, filename) {
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Download failed:', error);
        window.open(url, '_blank');
    }
}

/**
 * Convert file to base64
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Convert file to data URL (same as base64 but with mime type)
 */
function fileToDataUrl(file) {
    return fileToBase64(file);
}

/**
 * Debounce function
 */
function debounce(fn, delay = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Throttle function
 */
function throttle(fn, limit = 100) {
    let inThrottle;
    return (...args) => {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Format currency
 */
function formatCost(amount) {
    return `$${amount.toFixed(2)}`;
}

/**
 * Parse prompts from textarea (split by newlines, filter empty)
 */
function parsePrompts(text) {
    return text.trim().split('\n').filter(line => line.trim());
}

/**
 * Show/hide loading overlay
 */
function showLoading(message = 'Loading...') {
    const overlay = document.getElementById('loading');
    const text = document.getElementById('loading-text');
    if (overlay) {
        overlay.classList.add('visible');
        if (text) text.textContent = message;
    }
}

function hideLoading() {
    const overlay = document.getElementById('loading');
    if (overlay) {
        overlay.classList.remove('visible');
    }
}

/**
 * Create UUID
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Local storage helpers with JSON support
 */
const storage = {
    get(key, defaultValue = null) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    }
};

// Export
window.downloadFile = downloadFile;
window.fileToBase64 = fileToBase64;
window.fileToDataUrl = fileToDataUrl;
window.debounce = debounce;
window.throttle = throttle;
window.formatCost = formatCost;
window.parsePrompts = parsePrompts;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
window.uuid = uuid;
window.storage = storage;
