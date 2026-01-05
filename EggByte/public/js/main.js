// DOMContentLoaded to ensure elements exist
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Re-query inside listener/event to be safe, or just use global if script is at end
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebarRight = document.querySelector('.sidebar-right');
    const doc = document.documentElement;

    // --- Theme Toggler ---
    function toggleTheme() {
        console.log('Toggle Theme Clicked');
        const currentTheme = doc.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        doc.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            console.warn('LocalStorage failed (likely file:// protocol):', e);
        }

        updateThemeIcon();
    }

    function updateThemeIcon() {
        if (!themeToggle) return;
        const currentTheme = doc.getAttribute('data-theme') || 'light';
        // If the icon is text-based or class-based
        const iconSpan = themeToggle.querySelector('.icon');
        if (iconSpan) {
            iconSpan.textContent = currentTheme === 'dark' ? '☾' : '☀';
        }
    }

    // Force initialization
    (function initTheme() {
        let saved = 'light';
        try {
            saved = localStorage.getItem('theme') || 'light';
        } catch (e) { console.warn('LocalStorage read failed:', e); }

        doc.setAttribute('data-theme', saved);
        updateThemeIcon();
    })();

    // Initialize Theme Toggle Listener
    if (themeToggle) {
        console.log('Theme Toggle Listener Attached');
        themeToggle.onclick = toggleTheme;
    } else {
        console.log('Theme toggle not found');
    }
    window.toggleTheme = toggleTheme; // Expose

    // --- Dynamic Links (Cross-Site) ---
    document.querySelectorAll('.dynamic-eli2k-link').forEach(link => {
        if (window.location.protocol === 'file:') {
            const root = window.SITE_ROOT || '.';
            link.href = root + '/../../Eli2k/public/index.html';
        } else {
            link.href = 'https://eli2k.com';
        }
    });

    // --- Sidebar Toggle (Mobile) ---
    if (sidebarToggle && sidebarRight) {
        sidebarToggle.addEventListener('click', (e) => {
            e.stopPropagation();
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
    let searchResultsContainer = document.getElementById('search-results');

    // Lazy creation
    if (!searchResultsContainer) {
        // Only if widget exists
        const widget = document.querySelector('.search-widget');
        if (widget) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.id = 'search-results';
            searchResultsContainer.className = 'search-dropdown';
            widget.appendChild(searchResultsContainer);
        }
    }

    function displaySearchResults(results) {
        if (!searchResultsContainer) return;

        if (results.length === 0) {
            searchResultsContainer.innerHTML = '<div class="search-item">No results found</div>';
            searchResultsContainer.style.display = 'block';
            return;
        }

        function escapeHtml(text) {
            if (!text) return '';
            return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }

        searchResultsContainer.innerHTML = results.slice(0, 5).map(result => {
            let href = result.url;
            if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('javascript')) {
                const relativeUrl = href.startsWith('/') ? href.substring(1) : href;
                href = (window.SITE_ROOT || '.') + '/' + relativeUrl;
            }
            return `
            <a href="${href}" class="search-item">
                <div class="search-title">${escapeHtml(result.title)}</div>
                <div class="search-preview">${escapeHtml(result.content ? result.content.substring(0, 50) : '')}...</div>
            </a>
        `}).join('');

        searchResultsContainer.style.display = 'block';
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            // Flag 5
            if (query === 'flag') {
                displaySearchResults([{
                    title: '🏁 HIDDEN FLAG FOUND',
                    url: '#',
                    content: 'flag{s34rch_3ng1n3_d1sc0v3ry}'
                }]);
                return;
            }

            if (query.length < 2) {
                if (searchResultsContainer) searchResultsContainer.style.display = 'none';
                return;
            }

            const index = window.SEARCH_INDEX || [];
            if (!window.SEARCH_INDEX) console.warn("Search Index not loaded");

            const results = index.filter(item =>
                (item.title && item.title.toLowerCase().includes(query)) ||
                (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) ||
                (item.content && item.content.toLowerCase().includes(query))
            );

            displaySearchResults(results);
        });

        // Close search on click outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-widget') && searchResultsContainer) {
                searchResultsContainer.style.display = 'none';
            }
        });
    }
});
