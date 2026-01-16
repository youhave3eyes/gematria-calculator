// Gematria Calculator - 2026 Edition
// Complete implementation with multiple cipher systems

// ============================================================================
// CIPHER SYSTEMS
// ============================================================================

const ciphers = {
    english: {
        name: 'English',
        description: 'Standard English Gematria (A=1, B=2, etc.)',
        calculate: (text) => {
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    value += char.charCodeAt(0) - 64;
                }
            }
            return value;
        }
    },
    
    reverse: {
        name: 'Reverse',
        description: 'Reverse English (Z=1, Y=2, etc.)',
        calculate: (text) => {
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    value += 91 - char.charCodeAt(0);
                }
            }
            return value;
        }
    },
    
    hebrew: {
        name: 'Hebrew',
        description: 'Hebrew Gematria equivalents',
        calculate: (text) => {
            const jewishValues = {
                'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
                'I': 9, 'J': 600, 'K': 10, 'L': 20, 'M': 30, 'N': 40, 'O': 50,
                'P': 60, 'Q': 70, 'R': 80, 'S': 90, 'T': 100, 'U': 200, 'V': 700,
                'W': 900, 'X': 300, 'Y': 400, 'Z': 500
            };
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (jewishValues[char]) {
                    value += jewishValues[char];
                }
            }
            return value;
        }
    },
    
    sumerian: {
        name: 'Sumerian',
        description: 'Ancient Sumerian system (×6)',
        calculate: (text) => {
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    value += (char.charCodeAt(0) - 64) * 6;
                }
            }
            return value;
        }
    },
    
    chaldean: {
        name: 'Chaldean',
        description: 'Ancient Chaldean numerology',
        calculate: (text) => {
            const chaldeanValues = {
                'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 8, 'G': 3, 'H': 5,
                'I': 1, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 7, 'P': 8,
                'Q': 1, 'R': 2, 'S': 3, 'T': 4, 'U': 6, 'V': 6, 'W': 6, 'X': 5,
                'Y': 1, 'Z': 7
            };
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (chaldeanValues[char]) {
                    value += chaldeanValues[char];
                }
            }
            return value;
        }
    },
    
    pythagorean: {
        name: 'Pythagorean',
        description: 'Pythagorean numerology system',
        calculate: (text) => {
            const pythagoreanValues = {
                'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
                'I': 9, 'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7,
                'Q': 8, 'R': 9, 'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6,
                'Y': 7, 'Z': 8
            };
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (pythagoreanValues[char]) {
                    value += pythagoreanValues[char];
                }
            }
            return value;
        }
    },
    
    primes: {
        name: 'Primes',
        description: 'Prime number sequence',
        calculate: (text) => {
            const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    value += primes[char.charCodeAt(0) - 65];
                }
            }
            return value;
        }
    },
    
    trigonal: {
        name: 'Trigonal',
        description: 'Triangular number sequence',
        calculate: (text) => {
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    const n = char.charCodeAt(0) - 64;
                    value += (n * (n + 1)) / 2;
                }
            }
            return value;
        }
    },
    
    squares: {
        name: 'Squares',
        description: 'Perfect squares sequence',
        calculate: (text) => {
            let value = 0;
            for (let char of text.toUpperCase()) {
                if (char >= 'A' && char <= 'Z') {
                    const n = char.charCodeAt(0) - 64;
                    value += n * n;
                }
            }
            return value;
        }
    }
};

// ============================================================================
// DATABASE OF POPULAR SEARCHES & PHRASES
// ============================================================================

const database = [
    // Spiritual & Religious
    { phrase: "Jesus Christ", searches: 15234, category: "spiritual" },
    { phrase: "God", searches: 12456, category: "spiritual" },
    { phrase: "Holy Spirit", searches: 8932, category: "spiritual" },
    { phrase: "Angel", searches: 7821, category: "spiritual" },
    { phrase: "Light", searches: 6543, category: "spiritual" },
    { phrase: "Truth", searches: 5432, category: "spiritual" },
    { phrase: "Love", searches: 11234, category: "spiritual" },
    { phrase: "Faith", searches: 4321, category: "spiritual" },
    { phrase: "Heaven", searches: 5678, category: "spiritual" },
    { phrase: "Divine", searches: 3456, category: "spiritual" },
    
    // Numbers & Dates
    { phrase: "Eleven", searches: 4567, category: "numbers" },
    { phrase: "Twelve", searches: 3987, category: "numbers" },
    { phrase: "Thirteen", searches: 6234, category: "numbers" },
    { phrase: "Twenty Twenty Six", searches: 9876, category: "numbers" },
    { phrase: "One Hundred", searches: 2345, category: "numbers" }
];

// ============================================================================
// STATE MANAGEMENT (MULTI-SEARCH)
// ============================================================================

const state = {
    searches: [
        { id: 1, text: '', results: {}, active: true }
    ],
    nextSearchId: 2,
    searchHistory: [],
    enabledCiphers: Object.keys(ciphers),
    currentSortFilter: 'relevance',
    currentTab: 'calculator'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function calculateAllCiphers(text) {
    const results = {};
    for (let [key, cipher] of Object.entries(ciphers)) {
        results[key] = {
            name: cipher.name,
            value: cipher.calculate(text),
            description: cipher.description
        };
    }
    return results;
}

function findMatches(allSearchResults) {
    const matches = [];
    
    // Get all values from all searches
    const allValues = {};
    for (let search of allSearchResults) {
        for (let [cipherKey, cipherData] of Object.entries(search.results)) {
            if (!state.enabledCiphers.includes(cipherKey)) continue;
            
            if (!allValues[cipherKey]) {
                allValues[cipherKey] = [];
            }
            allValues[cipherKey].push(cipherData.value);
        }
    }
    
    // Find database entries matching any of the values
    for (let entry of database) {
        const entryResults = calculateAllCiphers(entry.phrase);
        
        for (let [cipherKey, cipherData] of Object.entries(entryResults)) {
            if (!state.enabledCiphers.includes(cipherKey)) continue;
            
            if (allValues[cipherKey] && allValues[cipherKey].includes(cipherData.value)) {
                matches.push({
                    phrase: entry.phrase,
                    cipher: cipherData.name,
                    cipherKey: cipherKey,
                    value: cipherData.value,
                    searches: entry.searches,
                    category: entry.category
                });
            }
        }
    }
    
    // Remove duplicates
    const uniqueMatches = [];
    const seen = new Set();
    for (let match of matches) {
        const key = `${match.phrase}-${match.cipherKey}`;
        if (!seen.has(key)) {
            seen.add(key);
            uniqueMatches.push(match);
        }
    }
    
    return uniqueMatches;
}

function sortMatches(matches, sortType) {
    const sorted = [...matches];
    
    switch (sortType) {
        case 'popularity':
            sorted.sort((a, b) => b.searches - a.searches);
            break;
        case 'alphabetical':
            sorted.sort((a, b) => a.phrase.localeCompare(b.phrase));
            break;
        case 'relevance':
        default:
            sorted.sort((a, b) => b.searches - a.searches);
            break;
    }
    
    return sorted;
}

function saveToHistory(text, results) {
    const historyItem = {
        text: text,
        timestamp: Date.now(),
        results: results
    };
    
    state.searchHistory = state.searchHistory.filter(item => item.text !== text);
    state.searchHistory.unshift(historyItem);
    
    if (state.searchHistory.length > 50) {
        state.searchHistory = state.searchHistory.slice(0, 50);
    }
    
    localStorage.setItem('gematria_history', JSON.stringify(state.searchHistory));
}

function loadHistory() {
    const saved = localStorage.getItem('gematria_history');
    if (saved) {
        try {
            state.searchHistory = JSON.parse(saved);
        } catch (e) {
            state.searchHistory = [];
        }
    }
}

function formatTime(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
}

function formatNumber(num) {
    return num.toLocaleString();
}

// ============================================================================
// UI RENDERING - COMPARISON
// ============================================================================

function renderComparison() {
    const comparisonGrid = document.getElementById('comparison-grid');
    const resultsSection = document.getElementById('results-section');
    const cipherFilterSection = document.getElementById('cipher-filter-section');
    
    const activeSearches = state.searches.filter(s => s.text.trim() !== '');
    
    if (activeSearches.length === 0) {
        resultsSection.style.display = 'none';
        cipherFilterSection.style.display = 'none';
        return;
    }
    
    resultsSection.style.display = 'block';
    cipherFilterSection.style.display = 'block';
    
    if (activeSearches.length > 1) {
        comparisonGrid.classList.add('multi-search');
    } else {
        comparisonGrid.classList.remove('multi-search');
    }
    
    comparisonGrid.innerHTML = '';
    
    const matchingValues = findMatchingValuesAcrossSearches(activeSearches);
    
    for (let search of activeSearches) {
        const column = document.createElement('div');
        column.className = 'comparison-column';
        if (search.active) column.classList.add('active');
        
        column.innerHTML = `
            <div class="comparison-header">
                <div>
                    <div class="comparison-title">Search ${search.id}</div>
                    <div class="comparison-phrase">${search.text}</div>
                </div>
            </div>
        `;
        
        const cipherGrid = document.createElement('div');
        cipherGrid.className = 'cipher-grid';
        
        for (let [key, data] of Object.entries(search.results)) {
            if (!state.enabledCiphers.includes(key)) continue;
            
            const card = document.createElement('div');
            card.className = 'cipher-card';
            
            if (matchingValues[key] && matchingValues[key].includes(data.value) && activeSearches.length > 1) {
                card.classList.add('matching');
            }
            
            card.innerHTML = `
                <div class="cipher-name">${data.name}</div>
                <div class="cipher-value">${formatNumber(data.value)}</div>
            `;
            card.title = data.description;
            cipherGrid.appendChild(card);
        }
        
        column.appendChild(cipherGrid);
        comparisonGrid.appendChild(column);
    }
}

function findMatchingValuesAcrossSearches(searches) {
    const matchingValues = {};
    
    if (searches.length < 2) return matchingValues;
    
    for (let cipherKey of state.enabledCiphers) {
        const values = [];
        for (let search of searches) {
            if (search.results[cipherKey]) {
                values.push(search.results[cipherKey].value);
            }
        }
        
        const valueCounts = {};
        for (let value of values) {
            valueCounts[value] = (valueCounts[value] || 0) + 1;
        }
        
        const matching = [];
        for (let [value, count] of Object.entries(valueCounts)) {
            if (count > 1) {
                matching.push(parseInt(value));
            }
        }
        
        if (matching.length > 0) {
            matchingValues[cipherKey] = matching;
        }
    }
    
    return matchingValues;
}

function renderMatches(matches) {
    const grid = document.getElementById('matches-grid');
    const matchesSection = document.getElementById('matches-section');
    grid.innerHTML = '';
    
    if (matches.length === 0) {
        matchesSection.style.display = 'none';
        return;
    }
    
    matchesSection.style.display = 'block';
    
    for (let match of matches) {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-info">
                <div class="match-phrase">${match.phrase}</div>
                <div class="match-meta">
                    <span class="match-cipher">${match.cipher}</span>
                    <span class="match-popularity">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 1L10 5.5L15 6.5L11.5 10L12.5 15L8 12.5L3.5 15L4.5 10L1 6.5L6 5.5L8 1Z"/>
                        </svg>
                        ${formatNumber(match.searches)} searches
                    </span>
                </div>
            </div>
            <div class="match-value">${formatNumber(match.value)}</div>
        `;
        
        card.addEventListener('click', () => {
            const firstInput = document.querySelector('.gematria-input[data-search-id="1"]');
            if (firstInput) {
                firstInput.value = match.phrase;
                handleSearchInput(1, match.phrase);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        grid.appendChild(card);
    }
}

function renderCipherCheckboxes() {
    const container = document.getElementById('cipher-checkboxes');
    container.innerHTML = '';
    
    for (let [key, cipher] of Object.entries(ciphers)) {
        const isChecked = state.enabledCiphers.includes(key);
        
        const item = document.createElement('div');
        item.className = 'cipher-checkbox-item';
        if (isChecked) item.classList.add('checked');
        
        item.innerHTML = `
            <input type="checkbox" 
                   id="cipher-${key}" 
                   class="cipher-checkbox" 
                   value="${key}" 
                   ${isChecked ? 'checked' : ''}>
            <label for="cipher-${key}" class="cipher-checkbox-label">${cipher.name}</label>
        `;
        
        const checkbox = item.querySelector('input');
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                if (!state.enabledCiphers.includes(key)) {
                    state.enabledCiphers.push(key);
                }
                item.classList.add('checked');
            } else {
                state.enabledCiphers = state.enabledCiphers.filter(k => k !== key);
                item.classList.remove('checked');
            }
            
            renderComparison();
            updateMatches();
        });
        
        container.appendChild(item);
    }
}

function renderPopularDatabase(searchTerm = '') {
    const grid = document.getElementById('popular-grid');
    grid.innerHTML = '';
    
    let filtered = [...database];
    
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.phrase.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    filtered.sort((a, b) => b.searches - a.searches);
    filtered = filtered.slice(0, 50);
    
    for (let item of filtered) {
        const div = document.createElement('div');
        div.className = 'popular-item';
        div.innerHTML = `
            <div class="popular-text">${item.phrase}</div>
            <div class="popular-count">${formatNumber(item.searches)} searches</div>
        `;
        
        div.addEventListener('click', () => {
            switchTab('calculator');
            const firstInput = document.querySelector('.gematria-input[data-search-id="1"]');
            if (firstInput) {
                firstInput.value = item.phrase;
                handleSearchInput(1, item.phrase);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        grid.appendChild(div);
    }
}

function renderHistory() {
    const list = document.getElementById('history-list');
    list.innerHTML = '';
    
    if (state.searchHistory.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                <p>No search history yet</p>
            </div>
        `;
        return;
    }
    
    for (let item of state.searchHistory) {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-text">${item.text}</div>
            <div class="history-time">${formatTime(item.timestamp)}</div>
        `;
        
        div.addEventListener('click', () => {
            switchTab('calculator');
            const firstInput = document.querySelector('.gematria-input[data-search-id="1"]');
            if (firstInput) {
                firstInput.value = item.text;
                handleSearchInput(1, item.text);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
        
        list.appendChild(div);
    }
}

// ============================================================================
// MULTI-SEARCH FUNCTIONS
// ============================================================================

function addNewSearch() {
    console.log('🚀 addNewSearch() function called!');
    const searchId = state.nextSearchId++;
    console.log('   Creating search ID:', searchId);
    
    const newSearch = {
        id: searchId,
        text: '',
        results: {},
        active: false
    };
    
    state.searches.push(newSearch);
    console.log('   Total searches:', state.searches.length);
    
    const searchItems = document.getElementById('search-items');
    const searchItem = document.createElement('div');
    searchItem.className = 'search-item';
    searchItem.dataset.searchId = searchId;
    
    searchItem.innerHTML = `
        <div class="search-header">
            <span class="search-label">Search ${searchId}</span>
            <button class="remove-search-btn" data-search-id="${searchId}">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
        <div class="input-wrapper">
            <input type="text" class="gematria-input" data-search-id="${searchId}" placeholder="Enter a word or phrase..." autocomplete="off">
            <button class="clear-btn" data-search-id="${searchId}" aria-label="Clear input">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    searchItems.appendChild(searchItem);
    
    const input = searchItem.querySelector('.gematria-input');
    input.addEventListener('input', (e) => {
        handleSearchInput(searchId, e.target.value);
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log('🔑 Enter key pressed in search input');
            // Click the add search button
            const addBtn = document.getElementById('add-search-btn');
            console.log('🔘 Add button element:', addBtn);
            if (addBtn) {
                console.log('✅ Clicking add search button');
                addBtn.click();
            } else {
                console.error('❌ Add search button not found!');
            }
            // Visual feedback
            input.style.borderColor = '#8b5cf6';
            setTimeout(() => {
                input.style.borderColor = '';
            }, 300);
        }
    });
    
    input.addEventListener('focus', () => {
        setActiveSearch(searchId);
    });
    
    const clearBtn = searchItem.querySelector('.clear-btn');
    clearBtn.addEventListener('click', () => {
        input.value = '';
        handleSearchInput(searchId, '');
        input.focus();
    });
    
    const removeBtn = searchItem.querySelector('.remove-search-btn');
    removeBtn.addEventListener('click', () => {
        removeSearch(searchId);
    });
    
    updateRemoveButtons();
    input.focus();
}

function removeSearch(searchId) {
    if (state.searches.length <= 1) return;
    
    state.searches = state.searches.filter(s => s.id !== searchId);
    
    const searchItem = document.querySelector(`.search-item[data-search-id="${searchId}"]`);
    if (searchItem) {
        searchItem.remove();
    }
    
    updateRemoveButtons();
    renderComparison();
    updateMatches();
}

function setActiveSearch(searchId) {
    state.searches.forEach(s => s.active = (s.id === searchId));
    
    document.querySelectorAll('.search-item').forEach(item => {
        if (parseInt(item.dataset.searchId) === searchId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function updateRemoveButtons() {
    const removeButtons = document.querySelectorAll('.remove-search-btn');
    if (state.searches.length > 1) {
        removeButtons.forEach(btn => btn.style.display = 'flex');
    } else {
        removeButtons.forEach(btn => btn.style.display = 'none');
    }
}

function handleSearchInput(searchId, text) {
    const search = state.searches.find(s => s.id === searchId);
    if (!search) return;
    
    search.text = text;
    
    const clearBtn = document.querySelector(`.clear-btn[data-search-id="${searchId}"]`);
    
    if (text.trim() === '') {
        search.results = {};
        if (clearBtn) clearBtn.classList.remove('visible');
    } else {
        search.results = calculateAllCiphers(text);
        if (clearBtn) clearBtn.classList.add('visible');
        saveToHistory(text, search.results);
    }
    
    renderComparison();
    updateMatches();
}

function updateMatches() {
    const activeSearches = state.searches.filter(s => s.text.trim() !== '');
    
    if (activeSearches.length === 0) {
        document.getElementById('matches-section').style.display = 'none';
        return;
    }
    
    const matches = findMatches(activeSearches);
    const sortedMatches = sortMatches(matches, state.currentSortFilter);
    renderMatches(sortedMatches);
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
    
    state.currentTab = tabName;
    
    if (tabName === 'database') {
        renderPopularDatabase();
    } else if (tabName === 'history') {
        renderHistory();
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

function init() {
    console.log('🔮 Gematria Calculator 2026 - Multi-Search Edition');
    
    loadHistory();
    renderCipherCheckboxes();
    
    // Setup first search input
    const firstInput = document.querySelector('.gematria-input[data-search-id="1"]');
    if (firstInput) {
        firstInput.addEventListener('input', (e) => {
            handleSearchInput(1, e.target.value);
        });
        
        firstInput.addEventListener('focus', () => {
            setActiveSearch(1);
        });
        
        setActiveSearch(1);
    }
    
    const firstClearBtn = document.querySelector('.clear-btn[data-search-id="1"]');
    if (firstClearBtn) {
        firstClearBtn.addEventListener('click', () => {
            if (firstInput) {
                firstInput.value = '';
                handleSearchInput(1, '');
                firstInput.focus();
            }
        });
    }
    
    updateRemoveButtons();
    
    // Add search button
    const addSearchBtn = document.getElementById('add-search-btn');
    console.log('🔍 Looking for add-search-btn:', addSearchBtn);
    if (addSearchBtn) {
        console.log('✅ Add search button found!');
        addSearchBtn.addEventListener('click', () => {
            console.log('🔵 Button clicked!');
            addNewSearch();
        });
    } else {
        console.error('❌ Add search button NOT found!');
    }
    
    // Tab navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    // Cipher filter actions
    const selectAllBtn = document.getElementById('select-all-ciphers');
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            state.enabledCiphers = Object.keys(ciphers);
            renderCipherCheckboxes();
            renderComparison();
            updateMatches();
        });
    }
    
    const deselectAllBtn = document.getElementById('deselect-all-ciphers');
    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', () => {
            state.enabledCiphers = [];
            renderCipherCheckboxes();
            renderComparison();
            updateMatches();
        });
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            state.currentSortFilter = e.target.value;
            updateMatches();
        });
    }
    
    // Database search
    const databaseSearch = document.getElementById('database-search');
    if (databaseSearch) {
        databaseSearch.addEventListener('input', (e) => {
            renderPopularDatabase(e.target.value);
        });
    }
    
    // Clear history button
    const clearHistoryBtn = document.getElementById('clear-history-btn');
    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear your search history?')) {
                state.searchHistory = [];
                localStorage.removeItem('gematria_history');
                renderHistory();
            }
        });
    }
    
    renderPopularDatabase();
    renderHistory();
    
    console.log('✨ Multi-search ready!');
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================================================
// USER AUTHENTICATION & SAVED SEARCHES
// ============================================================================

const userState = {
    currentUser: null,
    savedSearches: []
};

// Load user from localStorage
function loadUser() {
    const saved = localStorage.getItem('gematria_user');
    if (saved) {
        try {
            userState.currentUser = JSON.parse(saved);
            updateAuthUI();
            loadSavedSearches();
        } catch (e) {
            console.error('Error loading user:', e);
        }
    }
}

// Save user to localStorage
function saveUser(user) {
    userState.currentUser = user;
    localStorage.setItem('gematria_user', JSON.stringify(user));
    updateAuthUI();
}

// Logout
function logout() {
    userState.currentUser = null;
    userState.savedSearches = [];
    localStorage.removeItem('gematria_user');
    localStorage.removeItem('gematria_saved_searches');
    updateAuthUI();
    renderSavedSearches();
}

// Update auth UI
function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const authText = document.getElementById('auth-text');
    
    if (!authBtn || !authText) {
        console.error('Auth button or text not found');
        return;
    }
    
    if (userState.currentUser) {
        authBtn.classList.add('logged-in');
        authText.textContent = userState.currentUser.username;
        
        // Remove old event listener by cloning
        const newBtn = authBtn.cloneNode(true);
        authBtn.parentNode.replaceChild(newBtn, authBtn);
        
        newBtn.addEventListener('click', () => {
            if (confirm('Do you want to logout?')) {
                logout();
            }
        });
    } else {
        authBtn.classList.remove('logged-in');
        authText.textContent = 'Login';
        
        // Remove old event listener by cloning
        const newBtn = authBtn.cloneNode(true);
        authBtn.parentNode.replaceChild(newBtn, authBtn);
        
        newBtn.addEventListener('click', () => {
            showAuthModal();
        });
    }
}

// Show auth modal
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'flex';
}

// Hide auth modal
function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.style.display = 'none';
}

// Toggle between login and signup
function showLogin() {
    document.getElementById('login-form').style.display = 'flex';
    document.getElementById('signup-form').style.display = 'none';
}

function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'flex';
}

// Handle login
function handleLogin(email, password) {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('gematria_users') || '[]');
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        saveUser({ username: user.username, email: user.email, id: user.id });
        hideAuthModal();
        loadSavedSearches();
        alert('Welcome back, ' + user.username + '!');
        switchTab('saved');
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Handle signup
function handleSignup(username, email, password) {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('gematria_users') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        alert('Email already registered. Please login instead.');
        return;
    }
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        alert('Username already taken. Please choose another.');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        username: username,
        email: email,
        password: password, // In production, this should be hashed!
        createdAt: Date.now()
    };
    
    users.push(newUser);
    localStorage.setItem('gematria_users', JSON.stringify(users));
    
    saveUser({ username: newUser.username, email: newUser.email, id: newUser.id });
    hideAuthModal();
    alert('Account created successfully! Welcome, ' + username + '!');
    switchTab('saved');
}

// ============================================================================
// SAVED SEARCHES FUNCTIONALITY
// ============================================================================

function saveCurrentSearch() {
    if (!userState.currentUser) {
        alert('Please login to save searches');
        showAuthModal();
        return;
    }
    
    const activeSearches = state.searches.filter(s => s.text.trim() !== '');
    
    if (activeSearches.length === 0) {
        alert('Please enter at least one search to save');
        return;
    }
    
    const name = prompt('Give this search a name:');
    if (!name) return;
    
    const savedSearch = {
        id: Date.now().toString(),
        userId: userState.currentUser.id,
        name: name,
        searches: activeSearches.map(s => ({
            text: s.text,
            results: s.results
        })),
        enabledCiphers: [...state.enabledCiphers],
        createdAt: Date.now()
    };
    
    // Get all saved searches
    const allSaved = JSON.parse(localStorage.getItem('gematria_saved_searches') || '[]');
    allSaved.push(savedSearch);
    localStorage.setItem('gematria_saved_searches', JSON.stringify(allSaved));
    
    userState.savedSearches.push(savedSearch);
    renderSavedSearches();
    
    alert('Search saved successfully!');
    switchTab('saved');
}

function loadSavedSearches() {
    if (!userState.currentUser) {
        userState.savedSearches = [];
        return;
    }
    
    const allSaved = JSON.parse(localStorage.getItem('gematria_saved_searches') || '[]');
    userState.savedSearches = allSaved.filter(s => s.userId === userState.currentUser.id);
    renderSavedSearches();
}

function deleteSavedSearch(searchId) {
    if (!confirm('Are you sure you want to delete this saved search?')) {
        return;
    }
    
    const allSaved = JSON.parse(localStorage.getItem('gematria_saved_searches') || '[]');
    const filtered = allSaved.filter(s => s.id !== searchId);
    localStorage.setItem('gematria_saved_searches', JSON.stringify(filtered));
    
    userState.savedSearches = userState.savedSearches.filter(s => s.id !== searchId);
    renderSavedSearches();
}

function loadSavedSearch(searchId) {
    const saved = userState.savedSearches.find(s => s.id === searchId);
    if (!saved) return;
    
    // Clear existing searches
    state.searches = [];
    document.getElementById('search-items').innerHTML = '';
    
    // Recreate saved searches
    state.nextSearchId = 1;
    saved.searches.forEach((search, index) => {
        const searchId = state.nextSearchId++;
        
        const newSearch = {
            id: searchId,
            text: search.text,
            results: search.results,
            active: index === 0
        };
        
        state.searches.push(newSearch);
        
        const searchItems = document.getElementById('search-items');
        const searchItem = document.createElement('div');
        searchItem.className = 'search-item' + (index === 0 ? ' active' : '');
        searchItem.dataset.searchId = searchId;
        
        searchItem.innerHTML = `
            <div class="search-header">
                <span class="search-label">Search ${searchId}</span>
                <button class="remove-search-btn" data-search-id="${searchId}" style="${state.searches.length > 1 ? 'display: flex' : 'display: none'}">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div class="input-wrapper">
                <input type="text" class="gematria-input" data-search-id="${searchId}" placeholder="Enter a word or phrase..." autocomplete="off" value="${search.text}">
                <button class="clear-btn visible" data-search-id="${searchId}" aria-label="Clear input">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        `;
        
        searchItems.appendChild(searchItem);
        
        const input = searchItem.querySelector('.gematria-input');
        input.addEventListener('input', (e) => {
            handleSearchInput(searchId, e.target.value);
        });
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                console.log('🔑 Enter key pressed in loaded search input');
                // Click the add search button
                const addBtn = document.getElementById('add-search-btn');
                console.log('🔘 Add button element:', addBtn);
                if (addBtn) {
                    console.log('✅ Clicking add search button');
                    addBtn.click();
                } else {
                    console.error('❌ Add search button not found!');
                }
                // Visual feedback
                input.style.borderColor = '#8b5cf6';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 300);
            }
        });
        
        input.addEventListener('focus', () => {
            setActiveSearch(searchId);
        });
        
        const clearBtn = searchItem.querySelector('.clear-btn');
        clearBtn.addEventListener('click', () => {
            input.value = '';
            handleSearchInput(searchId, '');
            input.focus();
        });
        
        const removeBtn = searchItem.querySelector('.remove-search-btn');
        removeBtn.addEventListener('click', () => {
            removeSearch(searchId);
        });
    });
    
    // Restore enabled ciphers
    state.enabledCiphers = saved.enabledCiphers || Object.keys(ciphers);
    renderCipherCheckboxes();
    
    // Render results
    renderComparison();
    updateMatches();
    
    switchTab('calculator');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderSavedSearches() {
    const list = document.getElementById('saved-list');
    
    if (!userState.currentUser) {
        list.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="7" r="3"/>
                    <path d="M4 17C4 13.6863 6.68629 11 10 11C13.3137 11 16 13.6863 16 17" stroke-linecap="round"/>
                </svg>
                <p>Please login to save and view searches</p>
                <button class="btn-primary" onclick="showAuthModal()">Login / Sign Up</button>
            </div>
        `;
        return;
    }
    
    if (userState.savedSearches.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21L12 16L5 21V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V21Z" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p>No saved searches yet</p>
                <p style="color: var(--text-muted); font-size: 14px; margin-top: 8px;">
                    Create a search and click "Save Current Search" to save it
                </p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = '';
    
    for (let saved of userState.savedSearches.sort((a, b) => b.createdAt - a.createdAt)) {
        const div = document.createElement('div');
        div.className = 'saved-item';
        
        const searchTerms = saved.searches.map(s => s.text).join(', ');
        
        div.innerHTML = `
            <div class="saved-header">
                <div class="saved-title">${saved.name}</div>
                <div class="saved-date">${formatTime(saved.createdAt)}</div>
            </div>
            <div class="saved-searches">
                ${saved.searches.map(s => `<span class="saved-search-badge">${s.text}</span>`).join('')}
            </div>
            <div class="saved-actions">
                <button class="saved-action-btn load" data-id="${saved.id}">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2V7L10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Load
                </button>
                <button class="saved-action-btn delete" data-id="${saved.id}">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 3H12M5 3V2H9V3M5 11V6M9 11V6M3 3L4 12H10L11 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    Delete
                </button>
            </div>
        `;
        
        list.appendChild(div);
    }
    
    // Attach event listeners
    document.querySelectorAll('.saved-action-btn.load').forEach(btn => {
        btn.addEventListener('click', () => {
            loadSavedSearch(btn.dataset.id);
        });
    });
    
    document.querySelectorAll('.saved-action-btn.delete').forEach(btn => {
        btn.addEventListener('click', () => {
            deleteSavedSearch(btn.dataset.id);
        });
    });
}


// ============================================================================
// UPDATE INIT TO INCLUDE AUTH
// ============================================================================

// Add to existing init function - update it
const originalInit = init;
init = function() {
    originalInit();
    
    // Load user and saved searches
    loadUser();
    
    // Auth modal handlers - updateAuthUI will handle this
    updateAuthUI();
    
    const modalClose = document.getElementById('modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', hideAuthModal);
    }
    
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideAuthModal);
    }
    
    const showSignupBtn = document.getElementById('show-signup');
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showSignup();
        });
    }
    
    const showLoginBtn = document.getElementById('show-login');
    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLogin();
        });
    }
    
    // Login form
    const loginSubmit = document.getElementById('login-submit');
    if (loginSubmit) {
        loginSubmit.addEventListener('click', () => {
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            handleLogin(email, password);
        });
    }
    
    // Signup form
    const signupSubmit = document.getElementById('signup-submit');
    if (signupSubmit) {
        signupSubmit.addEventListener('click', () => {
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            
            if (!username || !email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }
            
            handleSignup(username, email, password);
        });
    }
    
    // Save current search button
    const saveCurrentBtn = document.getElementById('save-current-btn');
    if (saveCurrentBtn) {
        saveCurrentBtn.addEventListener('click', saveCurrentSearch);
    }
    
    console.log('🔐 Auth system initialized!');
};


// ============================================================================
// MATRIX FALLING NUMBERS EFFECT
// ============================================================================

class MatrixEffect {
    constructor() {
        this.canvas = document.getElementById('matrix-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.characters = '0123456789אבגדהוזחטיךכלםמןנסעףפץצקרשת';
        this.fontSize = 16;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = Array(this.columns).fill(0);
        
        this.animate();
        this.createFloatingNumbers();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
    }
    
    animate = () => {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#8b5cf6';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.columns; i++) {
            const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(char, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        requestAnimationFrame(this.animate);
    }
    
    createFloatingNumbers() {
        const floatingCharacters = '0123456789אבגדהוזחטיךכלםמןנסעףפץצקרשת';
        const sizes = [32, 48, 64, 80];
        
        // Create 8-12 floating numbers
        const count = Math.random() * 4 + 8;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const char = floatingCharacters.charAt(Math.floor(Math.random() * floatingCharacters.length));
                const size = sizes[Math.floor(Math.random() * sizes.length)];
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * window.innerHeight;
                const endX = (Math.random() - 0.5) * 400;
                const endY = (Math.random() - 0.5) * 400;
                
                const floatingEl = document.createElement('div');
                floatingEl.className = 'floating-matrix-number';
                floatingEl.textContent = char;
                floatingEl.style.fontSize = size + 'px';
                floatingEl.style.left = startX + 'px';
                floatingEl.style.top = startY + 'px';
                floatingEl.style.setProperty('--tx', endX + 'px');
                floatingEl.style.setProperty('--ty', endY + 'px');
                floatingEl.style.animationDuration = (Math.random() * 8 + 12) + 's';
                floatingEl.style.animationDelay = (Math.random() * 2) + 's';
                
                document.body.appendChild(floatingEl);
                
                // Remove after animation
                setTimeout(() => floatingEl.remove(), 20000);
            }, i * 800);
        }
        
        // Create new floating numbers periodically
        setInterval(() => {
            const char = floatingCharacters.charAt(Math.floor(Math.random() * floatingCharacters.length));
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const endX = (Math.random() - 0.5) * 400;
            const endY = (Math.random() - 0.5) * 400;
            
            const floatingEl = document.createElement('div');
            floatingEl.className = 'floating-matrix-number';
            floatingEl.textContent = char;
            floatingEl.style.fontSize = size + 'px';
            floatingEl.style.left = startX + 'px';
            floatingEl.style.top = startY + 'px';
            floatingEl.style.setProperty('--tx', endX + 'px');
            floatingEl.style.setProperty('--ty', endY + 'px');
            floatingEl.style.animationDuration = (Math.random() * 8 + 12) + 's';
            floatingEl.style.animationDelay = '0s';
            
            document.body.appendChild(floatingEl);
            
            // Remove after animation
            setTimeout(() => floatingEl.remove(), 20000);
        }, 3000);
    }
}

// Initialize matrix effect
let matrixEffect;
document.addEventListener('DOMContentLoaded', () => {
    matrixEffect = new MatrixEffect();
});

// ============================================================================
// LIFE PATH NUMBER CALCULATOR
// ============================================================================

const lifePathMeanings = {
    1: {
        name: 'The Leader',
        description: 'You are a natural leader with strong independence and innovation. Number 1 represents new beginnings, ambition, and the drive to pioneer new paths. Your life purpose involves taking initiative and blazing trails for others to follow.'
    },
    2: {
        name: 'The Diplomat',
        description: 'You are a peacemaker and natural mediator with diplomatic skills. Number 2 represents balance, partnership, and cooperation. Your life path involves creating harmony and fostering meaningful relationships.'
    },
    3: {
        name: 'The Creator',
        description: 'You are an expressive and creative soul with natural communication gifts. Number 3 represents creativity, joy, and self-expression. Your life purpose involves bringing beauty and inspiration to the world.'
    },
    4: {
        name: 'The Builder',
        description: 'You are a practical and hardworking individual with strong foundations. Number 4 represents stability, order, and building something lasting. Your path involves creating strong structures and systems.'
    },
    5: {
        name: 'The Explorer',
        description: 'You are adventurous and freedom-loving with a dynamic spirit. Number 5 represents change, freedom, and exploration. Your life path involves embracing transformation and seeking new experiences.'
    },
    6: {
        name: 'The Nurturer',
        description: 'You are compassionate and responsible with a natural caring nature. Number 6 represents love, family, and service. Your life purpose involves nurturing others and creating safe, loving environments.'
    },
    7: {
        name: 'The Seeker',
        description: 'You are spiritual and analytical with deep introspective abilities. Number 7 represents wisdom, introspection, and spiritual awareness. Your path involves seeking truth and deeper understanding.'
    },
    8: {
        name: 'The Manifestor',
        description: 'You are ambitious and powerful with strong material drive. Number 8 represents abundance, power, and material success. Your life path involves manifesting abundance and achieving significant accomplishments.'
    },
    9: {
        name: 'The Humanitarian',
        description: 'You are compassionate and universally aware with global consciousness. Number 9 represents completion, wisdom, and humanity. Your life purpose involves serving humanity and completing cycles.'
    }
};

function reduceToSingleDigit(num) {
    while (num >= 10) {
        num = num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return num;
}

function calculateLifePath(month, day, year) {
    const m = reduceToSingleDigit(parseInt(month));
    const d = reduceToSingleDigit(parseInt(day));
    const y = reduceToSingleDigit(parseInt(year));
    
    let lifePath = m + d + y;
    lifePath = reduceToSingleDigit(lifePath);
    
    return lifePath;
}

// Life Path Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-life-path');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', () => {
            const month = document.getElementById('birth-month').value;
            const day = document.getElementById('birth-day').value;
            const year = document.getElementById('birth-year').value;
            
            // Validation
            if (!month || !day || !year) {
                alert('Please enter a complete birth date');
                return;
            }
            
            const monthNum = parseInt(month);
            const dayNum = parseInt(day);
            const yearNum = parseInt(year);
            
            if (monthNum < 1 || monthNum > 12) {
                alert('Month must be between 1 and 12');
                return;
            }
            
            if (dayNum < 1 || dayNum > 31) {
                alert('Day must be between 1 and 31');
                return;
            }
            
            if (yearNum < 1900 || yearNum > 2024) {
                alert('Year must be between 1900 and 2024');
                return;
            }
            
            const lifePathNum = calculateLifePath(monthNum, dayNum, yearNum);
            const meaning = lifePathMeanings[lifePathNum];
            
            // Display result
            const resultDiv = document.getElementById('life-path-result');
            const displayDiv = document.getElementById('life-path-display');
            const meaningDiv = document.getElementById('life-path-meaning');
            const descriptionDiv = document.getElementById('life-path-description');
            
            displayDiv.textContent = lifePathNum;
            meaningDiv.textContent = meaning.name;
            descriptionDiv.textContent = meaning.description;
            
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }
    
    // Allow Enter key to calculate
    const dateInputs = document.querySelectorAll('#birth-month, #birth-day, #birth-year');
    dateInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('calculate-life-path').click();
            }
        });
    });
});

// ============================================================================
// ENSURE MATRIX EFFECT PERSISTS ACROSS TAB CHANGES
// ============================================================================

// Override the tab switching to ensure matrix canvas stays visible
const originalTabSwitch = window.switchTab;
if (originalTabSwitch) {
    window.switchTab = function(tabName) {
        originalTabSwitch(tabName);
        // Ensure matrix canvas stays on top of everything but below modal
        const canvas = document.getElementById('matrix-canvas');
        if (canvas) {
            canvas.style.zIndex = '1';
        }
    };
}

