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
  
  // Life Path Calculator state
  const [birthDate, setBirthDate] = useState({ month: '', day: '', year: '' });
  const [lifePathResult, setLifePathResult] = useState(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gematria_search_history');
    if (saved) {
      setSearchHistory(JSON.parse(saved));
    }
  }, []);

  // Matrix rain animation - Enhanced with more Hebrew characters
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Heavy Hebrew emphasis with some English and numbers
    const hebrewChars = 'אבגדהוזחטיכלמנסעפצקרשתךםןףץ';
    const englishChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '∞∑∏∆Ω∫√π∴∵≈≠±';
    
    // Weighted character selection (80% Hebrew, 15% English, 5% numbers/symbols)
    const getRandomChar = () => {
      const rand = Math.random();
      if (rand < 0.8) {
        return hebrewChars.charAt(Math.floor(Math.random() * hebrewChars.length));
      } else if (rand < 0.95) {
        return englishChars.charAt(Math.floor(Math.random() * englishChars.length));
      } else {
        const combined = numbers + symbols;
        return combined.charAt(Math.floor(Math.random() * combined.length));
      }
    };

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    // Random speeds for each column
    const speeds = Array(Math.floor(columns)).fill(0).map(() => Math.random() * 0.5 + 0.5);

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        // Gradient effect - brighter at the front
        const brightness = Math.min(255, drops[i] * 5);
        ctx.fillStyle = `rgba(196, 181, 253, ${0.8})`;
        ctx.shadowColor = 'rgba(167, 139, 250, 0.8)';
        ctx.shadowBlur = 8;
        
        const text = getRandomChar();
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }
    };

    const interval = setInterval(draw, 40);

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

  // Calculate Life Path Number
  const calculateLifePath = () => {
    const { month, day, year } = birthDate;
    
    if (!month || !day || !year) {
      alert('Please enter a complete birth date');
      return;
    }
    
    const m = parseInt(month);
    const d = parseInt(day);
    const y = parseInt(year);
    
    if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) {
      alert('Please enter a valid date');
      return;
    }
    
    // Reduce each component to single digit or master number
    const reduceNumber = (num) => {
      while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
        num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
      }
      return num;
    };
    
    const reducedMonth = reduceNumber(m);
    const reducedDay = reduceNumber(d);
    const reducedYear = reduceNumber(y);
    
    let lifePathNumber = reducedMonth + reducedDay + reducedYear;
    lifePathNumber = reduceNumber(lifePathNumber);
    
    // Get interpretation
    const interpretations = {
      1: { title: 'The Leader', description: 'Independent, ambitious, and pioneering. You are a natural born leader with strong determination and the ability to inspire others.', traits: ['Independent', 'Ambitious', 'Innovative', 'Confident', 'Courageous'], vibration: 'Leadership and individuality', color: '#FF6B6B' },
      2: { title: 'The Peacemaker', description: 'Diplomatic, sensitive, and cooperative. You excel at bringing harmony and balance to relationships and situations.', traits: ['Diplomatic', 'Intuitive', 'Gentle', 'Cooperative', 'Understanding'], vibration: 'Harmony and partnership', color: '#4ECDC4' },
      3: { title: 'The Creative', description: 'Expressive, optimistic, and artistic. You have a natural gift for communication and bringing joy to others.', traits: ['Creative', 'Expressive', 'Optimistic', 'Social', 'Artistic'], vibration: 'Self-expression and creativity', color: '#FFE66D' },
      4: { title: 'The Builder', description: 'Practical, disciplined, and reliable. You excel at creating solid foundations and bringing order to chaos.', traits: ['Practical', 'Organized', 'Loyal', 'Hardworking', 'Dependable'], vibration: 'Stability and order', color: '#95E1D3' },
      5: { title: 'The Freedom Seeker', description: 'Adventurous, versatile, and dynamic. You thrive on change, freedom, and new experiences.', traits: ['Adventurous', 'Versatile', 'Progressive', 'Curious', 'Energetic'], vibration: 'Freedom and change', color: '#F38181' },
      6: { title: 'The Nurturer', description: 'Responsible, caring, and family-oriented. You are a natural healer and caretaker with a strong sense of duty.', traits: ['Caring', 'Responsible', 'Protective', 'Compassionate', 'Balanced'], vibration: 'Love and responsibility', color: '#AA96DA' },
      7: { title: 'The Seeker', description: 'Analytical, spiritual, and introspective. You seek deeper truths and understanding of life\'s mysteries.', traits: ['Analytical', 'Spiritual', 'Wise', 'Introspective', 'Perfectionist'], vibration: 'Wisdom and spirituality', color: '#A8E6CF' },
      8: { title: 'The Powerhouse', description: 'Ambitious, authoritative, and material-focused. You have exceptional ability to manifest abundance and success.', traits: ['Ambitious', 'Authoritative', 'Confident', 'Material', 'Efficient'], vibration: 'Power and abundance', color: '#FFD3B6' },
      9: { title: 'The Humanitarian', description: 'Compassionate, idealistic, and selfless. You are driven to make the world a better place for all.', traits: ['Compassionate', 'Idealistic', 'Generous', 'Romantic', 'Artistic'], vibration: 'Universal love and completion', color: '#FFAAA5' },
      11: { title: 'The Illuminator (Master)', description: 'Intuitive, inspirational, and spiritually aware. You are a spiritual messenger with heightened intuition.', traits: ['Intuitive', 'Inspirational', 'Idealistic', 'Visionary', 'Spiritual'], vibration: 'Spiritual illumination', color: '#C7CEEA' },
      22: { title: 'The Master Builder', description: 'Visionary, practical, and powerful. You can turn dreams into reality on a grand scale.', traits: ['Visionary', 'Practical', 'Disciplined', 'Ambitious', 'Spiritual'], vibration: 'Master manifestation', color: '#B5EAD7' },
      33: { title: 'The Master Teacher', description: 'Nurturing, responsible, and spiritually evolved. You are here to uplift humanity through love and service.', traits: ['Nurturing', 'Selfless', 'Compassionate', 'Healing', 'Inspiring'], vibration: 'Master healing and teaching', color: '#FF9AA2' }
    };
    
    setLifePathResult({
      number: lifePathNumber,
      calculation: `${month}/${day}/${year} → ${reducedMonth} + ${reducedDay} + ${reducedYear} = ${lifePathNumber}`,
      ...interpretations[lifePathNumber]
    });
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
              <p style={{ marginBottom: '16px', fontSize: '18px', color: 'var(--text-bright)' }}>
                Gematria is an ancient alphanumeric code that assigns numerical values to letters, words, and phrases, 
                revealing hidden patterns and connections within language, the universe, and consciousness itself.
              </p>

              {/* Origins Section */}
              <div style={{ marginTop: '40px', padding: '28px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid #8B5CF6' }}>
                <h3 style={{ color: 'var(--primary-light)', marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                  🕰️ Ancient Origins
                </h3>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  Gematria originated in ancient Hebrew mystical traditions, particularly within Kabbalah, dating back over 2,000 years. 
                  The practice was used by Jewish scholars and mystics to uncover deeper meanings in sacred texts, especially the Torah.
                </p>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  The word "Gematria" itself comes from the Greek word "geometria" (geometry), reflecting the mathematical nature of the practice. 
                  Ancient civilizations recognized that numbers held sacred properties and could unlock divine secrets.
                </p>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  Hebrew letters serve dual purposes as both letters and numbers (א = 1, ב = 2, etc.), making gematria a natural extension 
                  of the language itself. This alphanumeric system was seen as proof that language and mathematics were divinely interconnected.
                </p>
                <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                  <strong style={{ color: '#A78BFA', fontSize: '15px' }}>Historical Timeline:</strong>
                  <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '8px' }}><strong>8th Century BCE:</strong> Early Hebrew letter-number systems emerge</li>
                    <li style={{ marginBottom: '8px' }}><strong>2nd Century BCE:</strong> Greek isopsephy (similar system) used widely</li>
                    <li style={{ marginBottom: '8px' }}><strong>2nd-5th Century CE:</strong> Rabbinic Judaism adopts gematria for Torah study</li>
                    <li style={{ marginBottom: '8px' }}><strong>13th Century:</strong> Kabbalistic texts like the Zohar popularize gematria</li>
                    <li style={{ marginBottom: '8px' }}><strong>Renaissance:</strong> Christian mystics adopt gematria for Biblical interpretation</li>
                    <li style={{ marginBottom: '8px' }}><strong>Modern Era:</strong> Gematria expands to English and other languages</li>
                  </ul>
                </div>
              </div>

              {/* World Events & Connections */}
              <div style={{ marginTop: '32px', padding: '28px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', borderLeft: '4px solid #EF4444' }}>
                <h3 style={{ color: '#F87171', marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                  🌍 Gematria & World Events
                </h3>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  Throughout history, researchers have discovered numerical patterns connecting significant dates, events, and names using gematria. 
                  These synchronicities suggest an underlying mathematical structure to reality itself.
                </p>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  <strong style={{ color: '#F87171' }}>Notable Observations:</strong>
                </p>
                <ul style={{ paddingLeft: '24px', marginBottom: '16px' }}>
                  <li style={{ marginBottom: '12px' }}>Biblical prophecies often contain gematria codes that align with historical events</li>
                  <li style={{ marginBottom: '12px' }}>Major world events frequently occur on dates with significant numerical patterns</li>
                  <li style={{ marginBottom: '12px' }}>Names of historical figures and locations often share gematria values with their destined purposes</li>
                  <li style={{ marginBottom: '12px' }}>Ancient monuments and sacred sites encode mathematical ratios found in gematria systems</li>
                </ul>
                <p style={{ fontSize: '16px' }}>
                  These patterns suggest that gematria may reveal a "cosmic code" - a divine language written into the fabric of space, 
                  time, and human consciousness, connecting seemingly unrelated events across history.
                </p>
              </div>

              {/* Frequencies & Vibrations */}
              <div style={{ marginTop: '32px', padding: '28px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', borderLeft: '4px solid #10B981' }}>
                <h3 style={{ color: '#34D399', marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                  🎵 Frequencies, Vibrations & Sound
                </h3>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  Everything in the universe vibrates at specific frequencies - from atoms to planets. Gematria connects to this fundamental 
                  truth by revealing that words, thoughts, and numbers carry their own unique vibrational signatures.
                </p>
                
                <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '16px' }}>
                  <h4 style={{ color: '#34D399', marginBottom: '12px', fontSize: '18px', fontWeight: 700 }}>
                    The Power of Sound & Number
                  </h4>
                  <p style={{ marginBottom: '12px', fontSize: '15px' }}>
                    <strong style={{ color: '#10B981' }}>Cymatics:</strong> The study of visible sound vibration reveals that specific frequencies 
                    create geometric patterns in matter - sacred geometry emerges from sound itself.
                  </p>
                  <p style={{ marginBottom: '12px', fontSize: '15px' }}>
                    <strong style={{ color: '#10B981' }}>432 Hz:</strong> Known as the "universal frequency," this resonates with the heart chakra 
                    and natural world, creating harmony and healing.
                  </p>
                  <p style={{ marginBottom: '12px', fontSize: '15px' }}>
                    <strong style={{ color: '#10B981' }}>528 Hz:</strong> Called the "love frequency," associated with DNA repair and 
                    transformation - the frequency of miracles.
                  </p>
                  <p style={{ fontSize: '15px' }}>
                    <strong style={{ color: '#10B981' }}>Solfeggio Frequencies:</strong> Ancient tones used in sacred music, each corresponding 
                    to specific healing and spiritual properties.
                  </p>
                </div>

                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  When you speak a word, you create a sound wave with a specific frequency. That word's gematria value represents its 
                  numerical essence - its vibrational blueprint in the cosmic order. Words with matching gematria values share similar 
                  energetic signatures and vibrational properties.
                </p>

                <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
                  <p style={{ fontSize: '15px', fontStyle: 'italic', color: '#34D399' }}>
                    "In the beginning was the Word, and the Word was with God, and the Word was God." - John 1:1
                  </p>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>
                    This ancient wisdom suggests that sound, word, and number are inseparable aspects of creation itself - 
                    the universe spoke itself into existence through divine mathematics.
                  </p>
                </div>

                <p style={{ marginTop: '16px', fontSize: '16px' }}>
                  <strong style={{ color: '#34D399' }}>Vibrational Levels & Consciousness:</strong> Every thought, emotion, and word 
                  carries a frequency. Higher gematria values often correlate with concepts of higher consciousness, divinity, and 
                  spiritual enlightenment. Lower values may represent more material or earthly concepts. The universe communicates 
                  through numbers, and gematria is one language to decode this cosmic conversation.
                </p>
              </div>

              {/* Logos & Symbology */}
              <div style={{ marginTop: '32px', padding: '28px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', borderLeft: '4px solid #F59E0B' }}>
                <h3 style={{ color: '#FBBF24', marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                  ✨ Logos, Symbols & Sacred Geometry
                </h3>
                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  The Greek concept of <em>Logos</em> (Λόγος) means "word," "reason," and "divine logic" - the principle of order and 
                  knowledge. Logos represents the idea that the universe operates through rational, mathematical principles that can be 
                  understood through symbols and numbers.
                </p>

                <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', marginBottom: '16px' }}>
                  <h4 style={{ color: '#FBBF24', marginBottom: '12px', fontSize: '18px', fontWeight: 700 }}>
                    Sacred Symbols & Their Numerical Essence
                  </h4>
                  <ul style={{ paddingLeft: '20px' }}>
                    <li style={{ marginBottom: '12px', fontSize: '15px' }}>
                      <strong style={{ color: '#F59E0B' }}>The Flower of Life:</strong> Contains the fundamental patterns of creation, 
                      with circles intersecting in perfect ratios that correspond to gematria sequences.
                    </li>
                    <li style={{ marginBottom: '12px', fontSize: '15px' }}>
                      <strong style={{ color: '#F59E0B' }}>The Tree of Life (Kabbalah):</strong> Ten spheres (Sephirot) connected by 
                      22 paths - each associated with Hebrew letters and numerical values.
                    </li>
                    <li style={{ marginBottom: '12px', fontSize: '15px' }}>
                      <strong style={{ color: '#F59E0B' }}>The Golden Ratio (φ = 1.618...):</strong> Found throughout nature and 
                      sacred architecture, this divine proportion appears in gematria patterns.
                    </li>
                    <li style={{ marginBottom: '12px', fontSize: '15px' }}>
                      <strong style={{ color: '#F59E0B' }}>The Star of David:</strong> Six-pointed star with deep numerical significance, 
                      representing the union of opposites and divine harmony.
                    </li>
                    <li style={{ marginBottom: '12px', fontSize: '15px' }}>
                      <strong style={{ color: '#F59E0B' }}>The Vesica Piscis:</strong> Two overlapping circles creating sacred proportions 
                      used in cathedral design and spiritual art.
                    </li>
                  </ul>
                </div>

                <p style={{ marginBottom: '16px', fontSize: '16px' }}>
                  Ancient architects encoded gematria into sacred buildings - pyramids, temples, and cathedrals contain measurements 
                  that correspond to significant numerical values. The Great Pyramid of Giza, for example, encodes π (pi), φ (phi), 
                  and other mathematical constants in its dimensions.
                </p>

                <p style={{ fontSize: '16px' }}>
                  <strong style={{ color: '#FBBF24' }}>Modern Application:</strong> Today's corporate logos and brand names often 
                  (intentionally or unconsciously) carry gematria values that resonate with their purpose. Words chosen for products, 
                  movements, and organizations may influence their success through vibrational alignment with universal patterns.
                </p>
              </div>

              {/* Cipher Systems */}
              <div style={{ marginTop: '32px' }}>
                <h3 style={{ color: 'var(--primary-light)', marginBottom: '16px', fontSize: '24px', fontWeight: 700 }}>
                  🔢 The Cipher Systems
                </h3>
                <p style={{ marginBottom: '20px', fontSize: '16px' }}>
                  Different gematria cipher systems reveal different aspects of meaning. Each system is like a unique lens 
                  for viewing the numerical essence of words:
                </p>
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

              {/* Closing Wisdom */}
              <div style={{ marginTop: '40px', padding: '32px', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(167, 139, 250, 0.1) 100%)', borderRadius: '16px', border: '2px solid rgba(139, 92, 246, 0.3)' }}>
                <h3 style={{ color: 'var(--primary-light)', marginBottom: '16px', fontSize: '22px', fontWeight: 700, textAlign: 'center' }}>
                  ∞ The Universal Language ∞
                </h3>
                <p style={{ fontSize: '17px', textAlign: 'center', lineHeight: '1.8', color: 'var(--text-bright)' }}>
                  Gematria reveals that numbers, words, sound, and symbols are not separate - they are different expressions 
                  of the same universal language. By understanding gematria, you begin to see the mathematical poetry woven 
                  throughout existence, connecting ancient wisdom to modern reality, the spiritual to the material, 
                  and the individual to the infinite.
                </p>
                <p style={{ fontSize: '16px', textAlign: 'center', marginTop: '16px', fontStyle: 'italic', color: '#A78BFA' }}>
                  "Number is the ruler of forms and ideas, and the cause of gods and daemons." - Pythagoras
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'life-path' && (
          <div className="card">
            <h2 className="card-title">🌟 Life Path Calculator</h2>
            <p className="card-subtitle">
              Discover your Life Path Number - the most significant number in numerology that reveals your life's purpose and journey
            </p>
            
            <div style={{ marginTop: '32px' }}>
              <h3 style={{ color: 'var(--primary-light)', marginBottom: '20px', fontSize: '20px' }}>
                Enter Your Birth Date
              </h3>
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '14px' }}>
                    Month
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    placeholder="MM"
                    value={birthDate.month}
                    onChange={(e) => setBirthDate({...birthDate, month: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      background: 'rgba(139, 92, 246, 0.05)',
                      color: 'var(--text-bright)',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: '1', minWidth: '120px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '14px' }}>
                    Day
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="DD"
                    value={birthDate.day}
                    onChange={(e) => setBirthDate({...birthDate, day: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      background: 'rgba(139, 92, 246, 0.05)',
                      color: 'var(--text-bright)',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ flex: '1', minWidth: '140px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-dim)', fontSize: '14px' }}>
                    Year
                  </label>
                  <input
                    type="number"
                    min="1900"
                    max="2100"
                    placeholder="YYYY"
                    value={birthDate.year}
                    onChange={(e) => setBirthDate({...birthDate, year: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '16px',
                      borderRadius: '8px',
                      border: '2px solid rgba(139, 92, 246, 0.3)',
                      background: 'rgba(139, 92, 246, 0.05)',
                      color: 'var(--text-bright)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              
              <button
                onClick={calculateLifePath}
                style={{
                  padding: '14px 32px',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Calculate My Life Path
              </button>
            </div>

            {lifePathResult && (
              <div style={{
                marginTop: '40px',
                padding: '32px',
                borderRadius: '16px',
                background: `linear-gradient(135deg, ${lifePathResult.color}20 0%, ${lifePathResult.color}10 100%)`,
                border: `3px solid ${lifePathResult.color}`,
                boxShadow: `0 8px 32px ${lifePathResult.color}40`
              }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '72px',
                    fontWeight: '900',
                    color: lifePathResult.color,
                    textShadow: `0 4px 20px ${lifePathResult.color}60`,
                    marginBottom: '8px'
                  }}>
                    {lifePathResult.number}
                  </div>
                  <div style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: 'var(--text-bright)',
                    marginBottom: '8px'
                  }}>
                    {lifePathResult.title}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: 'var(--text-dim)',
                    fontFamily: 'monospace'
                  }}>
                    {lifePathResult.calculation}
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{ color: lifePathResult.color, marginBottom: '12px', fontSize: '18px', fontWeight: '700' }}>
                    Your Life Path Description
                  </h4>
                  <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', fontSize: '16px' }}>
                    {lifePathResult.description}
                  </p>
                </div>

                <div style={{
                  padding: '24px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{ color: lifePathResult.color, marginBottom: '16px', fontSize: '18px', fontWeight: '700' }}>
                    Key Traits & Characteristics
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {lifePathResult.traits.map((trait, idx) => (
                      <span key={idx} style={{
                        padding: '8px 16px',
                        background: `${lifePathResult.color}30`,
                        border: `2px solid ${lifePathResult.color}`,
                        borderRadius: '20px',
                        color: lifePathResult.color,
                        fontSize: '14px',
                        fontWeight: '600'
                      }}>
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{
                  padding: '24px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '12px'
                }}>
                  <h4 style={{ color: lifePathResult.color, marginBottom: '12px', fontSize: '18px', fontWeight: '700' }}>
                    Energetic Vibration
                  </h4>
                  <p style={{ color: 'var(--text-dim)', fontSize: '16px' }}>
                    <strong style={{ color: lifePathResult.color }}>{lifePathResult.vibration}</strong>
                  </p>
                  <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '12px', lineHeight: '1.6' }}>
                    Your life path number {lifePathResult.number} carries the vibration of {lifePathResult.vibration.toLowerCase()}, 
                    influencing your energy field and the frequencies you naturally resonate with throughout your life journey.
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginTop: '48px', padding: '24px', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '12px', borderLeft: '4px solid #8B5CF6' }}>
              <h3 style={{ color: 'var(--primary-light)', marginBottom: '16px', fontSize: '20px' }}>
                About Life Path Numbers
              </h3>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '12px' }}>
                Your Life Path Number is calculated from your birth date and represents the core of who you are. 
                It reveals your natural talents, challenges, and the lessons you're here to learn in this lifetime.
              </p>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.8' }}>
                Master Numbers (11, 22, 33) carry higher spiritual vibrations and are not reduced further. 
                They indicate individuals with special spiritual missions and heightened potential.
              </p>
            </div>
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
