import React, { useState, useEffect, useRef } from 'react';
import './GematriaApp.css';

// Cipher Systems
const ciphers = {
  ordinal: {
    name: 'English Ordinal',
    color: '#3B82F6',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += char.charCodeAt(0) - 64;
        }
      }
      return sum;
    }
  },
  reduction: {
    name: 'Full Reduction',
    color: '#EF4444',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          let val = (char.charCodeAt(0) - 65) % 9;
          sum += val === 0 ? 9 : val;
        }
      }
      return sum;
    }
  },
  reverse: {
    name: 'Reverse Ordinal',
    color: '#F59E0B',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += 91 - char.charCodeAt(0);
        }
      }
      return sum;
    }
  },
  english: {
    name: 'English Gematria',
    color: '#10B981',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += (char.charCodeAt(0) - 64) * 6;
        }
      }
      return sum;
    }
  },
  jewish: {
    name: 'Jewish/Hebrew',
    color: '#8B5CF6',
    calc: (text) => {
      const vals = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
        'I': 9, 'J': 600, 'K': 10, 'L': 20, 'M': 30, 'N': 40, 'O': 50,
        'P': 60, 'Q': 70, 'R': 80, 'S': 90, 'T': 100, 'U': 200, 'V': 700,
        'W': 900, 'X': 300, 'Y': 400, 'Z': 500
      };
      let sum = 0;
      for (let char of text.toUpperCase()) {
        sum += vals[char] || 0;
      }
      return sum;
    }
  },
  simple: {
    name: 'Simple',
    color: '#EC4899',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += ((char.charCodeAt(0) - 65) % 9) + 1;
        }
      }
      return sum;
    }
  },
  sumerian: {
    name: 'Sumerian',
    color: '#06B6D4',
    calc: (text) => {
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += (char.charCodeAt(0) - 64) * 6;
        }
      }
      return sum;
    }
  },
  primes: {
    name: 'Primes',
    color: '#A855F7',
    calc: (text) => {
      const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101];
      let sum = 0;
      for (let char of text.toUpperCase()) {
        if (char >= 'A' && char <= 'Z') {
          sum += primes[char.charCodeAt(0) - 65];
        }
      }
      return sum;
    }
  }
};

// Gematria Database
const gematriaDatabase = [
  'GOD', 'LOVE', 'LIGHT', 'TRUTH', 'PEACE', 'JESUS', 'CHRIST', 'HOLY', 'SPIRIT', 'ANGEL',
  'HEAVEN', 'EARTH', 'WISDOM', 'POWER', 'FAITH', 'GRACE', 'DIVINE', 'SACRED', 'SOUL', 'HEART',
  'LIFE', 'DEATH', 'TIME', 'SPACE', 'ENERGY', 'FORCE', 'BALANCE', 'HARMONY', 'UNITY', 'INFINITY',
  'ALPHA', 'OMEGA', 'GENESIS', 'REVELATION', 'PROPHECY', 'VISION', 'DREAM', 'DESTINY', 'KARMA', 'DHARMA',
  'TEMPLE', 'CHURCH', 'PRAYER', 'BLESSING', 'MIRACLE', 'MYSTERY', 'MAGIC', 'ALCHEMY', 'COSMOS', 'UNIVERSE',
  'STAR', 'SUN', 'MOON', 'FIRE', 'WATER', 'AIR', 'EARTH', 'SPIRIT', 'ETHER', 'VOID',
  'ONE', 'TWO', 'THREE', 'SEVEN', 'TWELVE', 'FORTY', 'SEVENTY', 'HUNDRED', 'THOUSAND', 'MILLION',
  'KING', 'QUEEN', 'PRINCE', 'PRINCESS', 'LORD', 'LADY', 'MASTER', 'TEACHER', 'GUIDE', 'PROPHET',
  'ANGEL', 'ARCHANGEL', 'SERAPH', 'CHERUB', 'DEMON', 'DEVIL', 'SATAN', 'LUCIFER', 'BEAST', 'DRAGON',
  'CROSS', 'CROWN', 'SWORD', 'SHIELD', 'ARMOR', 'WARRIOR', 'KNIGHT', 'HERO', 'CHAMPION', 'VICTOR',
  'BIRTH', 'REBIRTH', 'RESURRECTION', 'ASCENSION', 'TRANSCENDENCE', 'ENLIGHTENMENT', 'AWAKENING', 'CONSCIOUSNESS', 'AWARENESS', 'MIND',
  'BODY', 'SPIRIT', 'TRINITY', 'UNITY', 'DUALITY', 'POLARITY', 'YIN', 'YANG', 'MASCULINE', 'FEMININE',
  'FATHER', 'MOTHER', 'SON', 'DAUGHTER', 'BROTHER', 'SISTER', 'FAMILY', 'TRIBE', 'NATION', 'WORLD',
  'PEACE', 'WAR', 'CHAOS', 'ORDER', 'CREATION', 'DESTRUCTION', 'BEGINNING', 'END', 'ETERNITY', 'IMMORTALITY'
];

function GematriaApp() {
  const [searches, setSearches] = useState([{ id: 0, text: '', results: {} }]);
  const [searchIdCounter, setSearchIdCounter] = useState(1);
  const [searchHistory, setSearchHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ text: '', matches: [] });
  const [activeCipherFilters, setActiveCipherFilters] = useState(new Set(Object.keys(ciphers)));
  const canvasRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gematria_search_history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Matrix rain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'אבגדהוזחטיכלמנסעפצקרשת0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.035)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#c4b5fd';
      ctx.shadowColor = 'rgba(167, 139, 250, 0.75)';
      ctx.shadowBlur = 6;
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add search
  const addSearch = () => {
    setSearches([...searches, { id: searchIdCounter, text: '', results: {} }]);
    setSearchIdCounter(searchIdCounter + 1);
  };

  // Remove search
  const removeSearch = (id) => {
    if (searches.length > 1) {
      setSearches(searches.filter(s => s.id !== id));
    }
  };

  // Handle input
  const handleInput = (id, text) => {
    const newSearches = searches.map(s => {
      if (s.id === id) {
        const results = {};
        if (text.trim()) {
          for (let [key, cipher] of Object.entries(ciphers)) {
            results[key] = cipher.calc(text);
          }
        }
        return { ...s, text, results };
      }
      return s;
    });
    setSearches(newSearches);
  };

  // Commit to history
  const commitToHistory = (text) => {
    if (!text || text.trim() === '') return;
    
    text = text.trim().toUpperCase();
    const existingIndex = searchHistory.findIndex(h => h.text === text);
    let newHistory;
    
    if (existingIndex >= 0) {
      newHistory = [...searchHistory];
      newHistory[existingIndex].count++;
      newHistory[existingIndex].lastSearched = Date.now();
    } else {
      newHistory = [{ text, count: 1, lastSearched: Date.now() }, ...searchHistory];
    }
    
    if (newHistory.length > 50) {
      newHistory = newHistory.slice(0, 50);
    }
    
    setSearchHistory(newHistory);
    localStorage.setItem('gematria_search_history', JSON.stringify(newHistory));
  };

  // Handle key down
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const search = searches.find(s => s.id === id);
      if (search && search.text.trim()) {
        commitToHistory(search.text);
      }
      
      const currentIndex = searches.findIndex(s => s.id === id);
      if (currentIndex === searches.length - 1) {
        addSearch();
      }
    }
  };

  // Handle blur
  const handleBlur = (id) => {
    const search = searches.find(s => s.id === id);
    if (search && search.text.trim()) {
      commitToHistory(search.text);
    }
  };

  // Find matches
  const findMatches = () => {
    const activeSearches = searches.filter(s => s.text.trim());
    if (activeSearches.length < 2) return [];
    
    const matches = [];
    for (let cipherKey of Object.keys(ciphers)) {
      const values = {};
      activeSearches.forEach(search => {
        const val = search.results[cipherKey];
        if (!values[val]) values[val] = [];
        values[val].push(search.id);
      });

      for (let [value, searchIds] of Object.entries(values)) {
        if (searchIds.length > 1) {
          matches.push({ cipher: cipherKey, value: parseInt(value), searchIds });
        }
      }
    }
    return matches;
  };

  // Find database matches
  const findDatabaseMatches = (searchText) => {
    const results = [];
    const searchValues = {};
    
    for (let [key, cipher] of Object.entries(ciphers)) {
      searchValues[key] = cipher.calc(searchText);
    }
    
    gematriaDatabase.forEach(dbText => {
      for (let [cipherKey, cipher] of Object.entries(ciphers)) {
        const dbValue = cipher.calc(dbText);
        if (dbValue === searchValues[cipherKey]) {
          results.push({ text: dbText, cipher: cipherKey, value: dbValue });
        }
      }
    });
    
    return results;
  };

  // Show modal
  const showMatchesModal = (text) => {
    const matches = findDatabaseMatches(text);
    setModalData({ text, matches });
    setShowModal(true);
  };

  // Toggle cipher filter
  const toggleCipherFilter = (cipherKey) => {
    const newFilters = new Set(activeCipherFilters);
    if (newFilters.has(cipherKey)) {
      newFilters.delete(cipherKey);
    } else {
      newFilters.add(cipherKey);
    }
    setActiveCipherFilters(newFilters);
  };

  const activeSearches = searches.filter(s => s.text.trim());
  const matches = findMatches();
  const filteredModalMatches = modalData.matches.filter(m => activeCipherFilters.has(m.cipher));

  return (
    <div className="gematria-app">
      <canvas ref={canvasRef} className="matrix-rain" />
      
      {/* Navigation */}
      <nav className="top-nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7L12 12L22 7L12 2Z"/>
                <path d="M2 17L12 22L22 17"/>
                <path d="M2 12L12 17L22 12"/>
              </svg>
            </div>
            <span>Gematria Calculator</span>
          </div>
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              Calculator
            </button>
            <button 
              className={`nav-tab ${activeTab === 'what-gematria' ? 'active' : ''}`}
              onClick={() => setActiveTab('what-gematria')}
            >
              What is Gematria?
            </button>
            <button 
              className={`nav-tab ${activeTab === 'life-path' ? 'active' : ''}`}
              onClick={() => setActiveTab('life-path')}
            >
              Life Path
            </button>
          </div>
          <button className="decode-btn">DECODE GEMATRIA</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h1 className="hero-title">Discover Hidden Numbers</h1>
        <p className="hero-subtitle">
          Unlock the mystical patterns and connections hidden within words through ancient gematria wisdom
        </p>
      </section>

      {/* Main Content */}
      <div className="container">
        {activeTab === 'calculator' && (
          <div className="card">
            <h2 className="card-title">🔢 Multi-Search Calculator</h2>
            <p className="card-subtitle">
              Add multiple searches to compare values. Matching values across searches will be highlighted with stunning color coordination!
            </p>
            
            <div className="search-controls">
              <button className="add-search-btn" onClick={addSearch}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10 5v10M5 10h10"/>
                </svg>
                Add Search
              </button>
            </div>

            <div className="search-boxes">
              {searches.map((search, index) => (
                <div key={search.id} className="search-box-wrapper">
                  <div className="search-box-header">
                    <span className="search-label">Search {index + 1}</span>
                    {searches.length > 1 && (
                      <button className="remove-search" onClick={() => removeSearch(search.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 4L4 12M4 4L12 12"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Enter text to decode..."
                    value={search.text}
                    onChange={(e) => handleInput(search.id, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, search.id)}
                    onBlur={() => handleBlur(search.id)}
                  />
                </div>
              ))}
            </div>

            {activeSearches.length > 0 && (
              <div className="results-section">
                <h3 className="card-title" style={{ fontSize: '24px' }}>📊 Results</h3>
                <div className="results-grid">
                  {activeSearches.map((search, index) => (
                    <div key={search.id} className="result-column">
                      <div className="result-header">Search {searches.findIndex(s => s.id === search.id) + 1}</div>
                      <div className="result-text">"{search.text}"</div>
                      <div className="cipher-results">
                        {Object.entries(ciphers).map(([key, cipher]) => {
                          const value = search.results[key];
                          const isMatch = matches.some(m => m.cipher === key && m.value === value);
                          return (
                            <div
                              key={key}
                              className={`cipher-result ${isMatch ? 'match' : ''}`}
                              style={{
                                borderLeftColor: cipher.color,
                                color: cipher.color,
                                background: isMatch ? `${cipher.color}20` : ''
                              }}
                            >
                              <span className="cipher-name">{cipher.name}</span>
                              <span className="cipher-value">{value}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matches.length > 0 && (
              <div className="matches-section">
                <h3 className="card-title" style={{ fontSize: '24px' }}>🎯 Matching Values</h3>
                <div className="matches-list">
                  {matches.map((match, index) => {
                    const cipher = ciphers[match.cipher];
                    const searchNames = match.searchIds.map(id => `Search ${searches.findIndex(s => s.id === id) + 1}`).join(' & ');
                    return (
                      <div
                        key={index}
                        className="match-card"
                        style={{ borderLeftColor: cipher.color, background: `${cipher.color}15` }}
                      >
                        <div className="match-info">
                          <div className="match-value-display">
                            <span className="match-value-number" style={{ color: cipher.color }}>{match.value}</span>
                            <span className="match-cipher" style={{ background: `${cipher.color}30`, color: cipher.color }}>
                              {cipher.name}
                            </span>
                          </div>
                          <div className="match-searches">{searchNames}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Search History */}
            <div className="history-section">
              <h3 className="card-title" style={{ fontSize: '24px' }}>📜 Your Search History</h3>
              <p className="card-subtitle">Click any search to find matching words and phrases from our database</p>
              <div className="history-grid">
                {searchHistory.length === 0 ? (
                  <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '20px' }}>
                    No searches yet. Start calculating to build your history!
                  </p>
                ) : (
                  searchHistory.map((item, index) => (
                    <div key={index} className="history-item" onClick={() => showMatchesModal(item.text)}>
                      <div className="history-item-text">{item.text}</div>
                      <div className="history-item-count">Searched {item.count} time{item.count > 1 ? 's' : ''}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'what-gematria' && (
          <div className="card">
            <h2 className="card-title">📖 What is Gematria?</h2>
            <div style={{ lineHeight: '1.8', color: 'var(--text-dim)' }}>
              <p style={{ marginBottom: '16px', fontSize: '17px' }}>
                Gematria is an ancient alphanumeric code that assigns numerical values to letters, words, and phrases.
              </p>
              <h3 style={{ color: 'var(--primary-light)', marginTop: '32px', marginBottom: '16px', fontSize: '22px', fontWeight: 700 }}>
                The Cipher Systems
              </h3>
              {Object.entries(ciphers).map(([key, cipher]) => (
                <div key={key} style={{
                  padding: '20px',
                  background: `${cipher.color}10`,
                  borderRadius: '12px',
                  borderLeft: `4px solid ${cipher.color}`,
                  marginBottom: '12px'
                }}>
                  <strong style={{ color: cipher.color, fontSize: '16px' }}>{cipher.name}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'life-path' && (
          <div className="card">
            <h2 className="card-title">🌟 Life Path Calculator</h2>
            <p className="card-subtitle">Coming soon...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="matches-modal show" onClick={() => setShowModal(false)}>
          <div className="matches-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 5L5 15M5 5L15 15"/>
              </svg>
            </button>
            <h2 className="modal-title">"{modalData.text}"</h2>
            <p className="modal-subtitle">
              Showing {filteredModalMatches.length} of {modalData.matches.length} match{modalData.matches.length !== 1 ? 'es' : ''} in the database
            </p>
            
            <div className="cipher-filter">
              <div className="cipher-filter-title">Filter by Cipher System</div>
              <div className="cipher-filter-buttons">
                {Object.entries(ciphers).map(([key, cipher]) => (
                  <button
                    key={key}
                    className={`cipher-filter-btn ${activeCipherFilters.has(key) ? 'active' : 'inactive'}`}
                    style={{ borderColor: cipher.color, color: cipher.color }}
                    onClick={() => toggleCipherFilter(key)}
                  >
                    {cipher.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="modal-matches-list">
              {filteredModalMatches.length === 0 ? (
                <p style={{ color: 'var(--text-dim)', textAlign: 'center', padding: '40px' }}>
                  No matches for selected cipher systems. Try enabling more ciphers above.
                </p>
              ) : (
                filteredModalMatches.map((match, index) => {
                  const cipher = ciphers[match.cipher];
                  return (
                    <div key={index} className="modal-match-item" style={{ borderLeftColor: cipher.color }}>
                      <div className="modal-match-text">{match.text}</div>
                      <div style={{ textAlign: 'right' }}>
                        <div className="modal-match-value" style={{ color: cipher.color }}>{match.value}</div>
                        <div style={{ fontSize: '12px', color: cipher.color, marginTop: '4px' }}>{cipher.name}</div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GematriaApp;
