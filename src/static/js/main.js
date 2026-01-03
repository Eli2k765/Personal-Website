// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const doc = document.documentElement;

// --- Theme Toggler ---
function toggleTheme() {
    const currentTheme = doc.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    doc.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon();
}

function updateThemeIcon() {
    const currentTheme = doc.getAttribute('data-theme');
    const iconSpan = themeToggle.querySelector('.icon');
    if (iconSpan) {
        iconSpan.textContent = currentTheme === 'dark' ? '☀' : '☾';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    // Init icon
    updateThemeIcon();
    updateThemeIcon();
}

// --- Sidebar Toggle (Mobile) ---
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarRight = document.querySelector('.sidebar-right');

if (sidebarToggle && sidebarRight) {
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate close
        sidebarRight.classList.toggle('active');
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (sidebarRight.classList.contains('active') &&
            !sidebarRight.contains(e.target) &&
            e.target !== sidebarToggle) {
            sidebarRight.classList.remove('active');
        }
    });
}


// --- Search Functionality ---
let searchIndex = [];
let searchResultsContainer = null;

// Search is now loaded via search_data.js into window.SEARCH_INDEX
// No need to fetch asynchronously.

function displaySearchResults(results) {
    if (!searchResultsContainer) {
        searchResultsContainer = document.getElementById('search-results');
    }

    if (!searchResultsContainer) {
        // Fallback if not in HTML
        searchResultsContainer = document.createElement('div');
        searchResultsContainer.id = 'search-results';
        searchResultsContainer.className = 'search-dropdown';
        const widget = document.querySelector('.search-widget');
        if (widget) widget.appendChild(searchResultsContainer);
    }

    if (!searchResultsContainer) return; // Should not happen

    if (results.length === 0) {
        searchResultsContainer.innerHTML = '<div class="search-item">No results found</div>';
        searchResultsContainer.style.display = 'block';
        return;
    }

    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    searchResultsContainer.innerHTML = results.slice(0, 5).map(result => {
        // Handle external or special links (hash/javascript)
        let href = result.url;
        if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript')) {
            // Strip leading slash if present to avoid double slashes with SITE_ROOT
            const relativeUrl = href.startsWith('/') ? href.substring(1) : href;
            href = (window.SITE_ROOT || '.') + '/' + relativeUrl;
        }

        return `
        <a href="${href}" class="search-item">
            <div class="search-title">${escapeHtml(result.title)}</div>
            <div class="search-preview">${escapeHtml(result.content.substring(0, 50))}...</div>
        </a>
    `}).join('');

    searchResultsContainer.style.display = 'block';
}

if (searchInput) {
    // Load index on focus
    // Load index on focus (No-op now, simpler check)
    searchInput.addEventListener('focus', () => {
        // Data is preloaded.
    });

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();

        // CTF Flag 5: Search Query
        if (query === 'flag') {
            displaySearchResults([{
                title: '🏁 HIDDEN FLAG FOUND',
                url: '#',
                content: 'Congratulations! You found the search engine flag: flag{s34rch_3ng1n3_d1sc0v3ry}'
            }]);
            return;
        }

        if (query.length < 2) {
            if (searchResultsContainer) searchResultsContainer.style.display = 'none';
            return;
        }

        // Use global index from search_data.js
        const index = window.SEARCH_INDEX || [];
        const results = index.filter(item =>
            item.title.toLowerCase().includes(query) ||
            (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) ||
            item.content.toLowerCase().includes(query)
        );

        displaySearchResults(results);
    });

    // Close search on click outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-controls') && searchResultsContainer) {
            searchResultsContainer.style.display = 'none';
        }
    });
}

// --- Console Flag (CTF 1) ---
console.log(
    "%cSTOP! %cUnauthorized access detected.\nIf you are looking for the flag, you are close.\n%cflag{c0ns0l3_h4ck3r_3l1t3}",
    "color: red; font-size: 40px; font-weight: bold;",
    "color: white; font-size: 16px;",
    "color: #00ff00; font-family: monospace; font-size: 20px; background: black; padding: 5px;"
);

// --- Storage Flags (CTF 3 & 4) ---
document.cookie = "ctf_flag=flag{c00k1e_m0nst3r}; path=/; SameSite=Strict";
localStorage.setItem('ctf_token', 'flag{l0c4l_st0r4g3_rul3z}');

// --- Easter Eggs ---
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let keyHistory = [];

document.addEventListener('keydown', (e) => {
    keyHistory.push(e.key);
    keyHistory = keyHistory.slice(-20); // Keep longer history for phrases

    const keyString = keyHistory.join('').toLowerCase();

    // Konami Code (CTF 7)
    const konamiPattern = "arrowuparrowuparrowdownarrowdownarrowleftarrowrightarrowleftarrowrightarrowba";
    if (keyString.includes(konamiPattern)) {
        alert('ACCESS GRANTED: MATRIX MODE ACTIVATED\nHere is your reward: flag{k0n4m1_c0mm4nd0}');
        document.body.classList.toggle('hackermode');
        keyHistory = []; // Reset
    }

    // Do a Barrel Roll
    if (keyString.includes('doabarrelroll')) {
        document.body.classList.add('barrel-roll');
        setTimeout(() => {
            document.body.classList.remove('barrel-roll');
        }, 1000); // 1s animation
        keyHistory = [];
    }

    // BSOD
    if (keyString.includes('bsod')) {
        const bsod = document.getElementById('bsod');
        if (bsod) {
            bsod.classList.add('visible');
            // Enter fullscreen for max effect
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => { });
            }
        }
        keyHistory = [];
    }
});

// Click to dismiss BSOD
const bsodElement = document.getElementById('bsod');
if (bsodElement) {
    bsodElement.addEventListener('click', () => {
        bsodElement.classList.remove('visible');
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(err => { });
        }
    });
}

// --- Globe Clicker (CTF 9) ---
const globe = document.querySelector('.cyber-globe');
let globeClicks = 0;
if (globe) {
    globe.addEventListener('click', () => {
        globeClicks++;
        console.log(`Globe connection attempt: ${globeClicks}/5`);

        // Add visual feedback (temporary glow)
        globe.style.filter = `drop-shadow(0 0 ${globeClicks * 5}px cyan)`;
        setTimeout(() => globe.style.filter = '', 200);

        if (globeClicks === 5) {
            console.log("%cSYSTEM OVERLOAD: GLOBE HACKED", "color: red; font-size: 20px;");
            console.log("%cflag{gl0b4l_cl1ck3r}", "color: lime; font-size: 16px;");
            // Use CTF manager if available, otherwise just log it
            if (typeof CTF !== 'undefined') {
                CTF.submit('flag{gl0b4l_cl1ck3r}');
            } else {
                alert('SYSTEM OVERLOAD: GLOBE HACKED\nflag{gl0b4l_cl1ck3r}');
            }
            globeClicks = 0;
        }
    });
}
