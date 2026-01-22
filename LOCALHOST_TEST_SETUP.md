# 🧪 Localhost Test Setup Guide

## Quick Start - Browser Tests (No Installation Required!)

### Option 1: Browser-Based Tests (Immediate)

1. **Open the test runner in your browser:**
   ```bash
   # Navigate to the project directory
   cd gematria-calculator-original
   
   # Open in browser (choose one):
   firefox tmp_rovodev_test_runner.html
   # OR
   google-chrome tmp_rovodev_test_runner.html
   # OR simply double-click the file
   ```

2. **Click "Run All Tests"** to execute the test suite

3. **Features:**
   - ✅ Tests gematria calculation functions
   - ✅ Tests life path calculator
   - ✅ Tests number reduction logic
   - ✅ Real-time results with pass/fail status
   - ✅ Beautiful UI with progress tracking
   - ✅ No dependencies required!

---

## Full Setup - Node.js Tests (Requires Installation)

### Prerequisites

1. **Install Node.js and npm:**
   ```bash
   # Fedora/RHEL/CentOS
   sudo dnf install nodejs npm
   
   # Ubuntu/Debian
   sudo apt install nodejs npm
   
   # macOS
   brew install node
   ```

2. **Verify installation:**
   ```bash
   node --version    # Should show v14+ or higher
   npm --version     # Should show v6+ or higher
   ```

---

## Running Tests

### 1. Frontend Tests (React/React Native)

```bash
cd gematria-calculator-original

# Install dependencies
npm install

# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- SearchBar.test.tsx
```

### 2. Backend Tests (API/Server)

```bash
cd gematria-calculator-original/backend

# Install backend dependencies
npm install

# Run backend tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- auth.test.js
```

### 3. Run Development Server + Tests

**Terminal 1 - Backend Server:**
```bash
cd gematria-calculator-original/backend
npm install
npm start
# Server runs on http://localhost:3002
```

**Terminal 2 - Frontend Dev Server:**
```bash
cd gematria-calculator-original
npm install
npm run dev
# App runs on http://localhost:5173
```

**Terminal 3 - Run Tests:**
```bash
cd gematria-calculator-original
npm test
```

---

## Test Structure

### Current Test Files

```
gematria-calculator-original/
├── tmp_rovodev_test_runner.html    # 🆕 Browser-based test runner
├── components/__tests__/
│   └── SearchBar.test.tsx           # Component tests
├── store/__tests__/
│   ├── authStore.test.ts            # Auth store tests
│   ├── courseStore.test.ts          # Course store tests
│   └── shopStore.test.ts            # Shop store tests
├── services/__tests__/
│   └── api.test.ts                  # API service tests
└── backend/__tests__/
    ├── auth.test.js                 # Auth API tests
    └── courses.test.js              # Courses API tests
```

---

## Test Coverage Goals

### Current Coverage
- Backend: 60% target
- Frontend: 50% target

### Priority Areas for Testing
1. ✅ Core gematria calculations (NOW TESTED in browser!)
2. ✅ Life path calculator (NOW TESTED in browser!)
3. ⚠️ Backend API routes (needs integration tests)
4. ⚠️ React components (needs more coverage)
5. ⚠️ Database models (needs tests)

---

## Browser Test Details

### What's Being Tested in `tmp_rovodev_test_runner.html`

#### ✅ Gematria Calculator Tests
- English simple cipher
- Hebrew gematria
- Letter value calculations
- Case handling
- Special character handling

#### ✅ Life Path Calculator Tests
- Single digit reduction
- Master numbers (11, 22, 33)
- Full life path calculation
- Calculation steps tracking

#### ✅ Edge Cases
- Empty strings
- Mixed languages
- Numbers in text
- Special characters

### Test Results Display
- **Total tests count**
- **Passed/Failed breakdown**
- **Progress bar**
- **Detailed error messages**
- **Color-coded results**

---

## Troubleshooting

### Issue: "npm: command not found"
**Solution:** Install Node.js (see Prerequisites above)

### Issue: "Cannot find module"
**Solution:** Run `npm install` in the project directory

### Issue: Tests timeout
**Solution:** Increase Jest timeout in jest.config.js:
```javascript
testTimeout: 10000
```

### Issue: Browser test not loading
**Solution:** Check browser console for errors. Make sure you're opening the HTML file directly.

---

## Running Specific Test Suites

### Browser Tests
```javascript
// Edit tmp_rovodev_test_runner.html
// Comment out test suites you don't want to run
// runner.describe('Name', () => { ... });
```

### Node Tests
```bash
# Run only auth tests
npm test -- --testNamePattern="auth"

# Run only store tests
npm test -- store

# Run with verbose output
npm test -- --verbose
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Run Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test -- --coverage
      - run: cd backend && npm install && npm test
```

---

## Next Steps

1. **Run the browser tests now:**
   - Open `tmp_rovodev_test_runner.html`
   - Click "Run All Tests"
   - Review results

2. **Install Node.js for full testing:**
   - Follow prerequisites above
   - Run `npm install`
   - Execute `npm test`

3. **Add more tests:**
   - Create tests for untested components
   - Add integration tests for API routes
   - Increase coverage to 80%+

---

## Quick Reference Commands

```bash
# Browser tests (no setup needed)
open tmp_rovodev_test_runner.html

# Install everything
npm install && cd backend && npm install && cd ..

# Run all frontend tests
npm test

# Run all backend tests
cd backend && npm test

# Start dev server
npm run dev

# Build for production
npm run build

# Start backend server
cd backend && npm start
```

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://testingjavascript.com/)

---

**Created:** January 20, 2026
**Last Updated:** January 20, 2026
**Status:** ✅ Browser tests ready to use!
