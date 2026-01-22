# 🍎 Mac Localhost Test Setup Guide

## ✅ Quick Start - Your Files Are Ready!

Your test files have been copied to your **Desktop**! You can access them from your Mac now.

---

## 🚀 Method 1: Open Directly in Browser (Easiest)

### From Mac Desktop:

1. **Open Finder**
2. **Go to Desktop**
3. **Double-click:** `tmp_rovodev_test_runner.html`
4. **Click:** "▶ Run All Tests" button

That's it! The tests will run in your default browser.

---

## 🌐 Method 2: Run a Local HTTP Server (Recommended)

Running a local server is better for testing web apps and avoiding CORS issues.

### Option A: Using Python (Pre-installed on Mac)

```bash
# Open Terminal on Mac
cd ~/Desktop

# Python 3 (macOS Catalina 10.15+)
python3 -m http.server 8000

# Python 2 (older macOS)
python -m SimpleHTTPServer 8000
```

**Then open in browser:**
```
http://localhost:8000/tmp_rovodev_test_runner.html
```

### Option B: Using Node.js

```bash
# Install Node.js first (if not installed)
# Download from: https://nodejs.org/

# Or use Homebrew:
brew install node

# Install http-server globally
npm install -g http-server

# Run server
cd ~/Desktop
http-server -p 8000

# Open browser to:
http://localhost:8000/tmp_rovodev_test_runner.html
```

### Option C: Using PHP (Pre-installed on Mac)

```bash
cd ~/Desktop
php -S localhost:8000
```

**Then open:**
```
http://localhost:8000/tmp_rovodev_test_runner.html
```

---

## 🎯 Method 3: Full Gematria App on Localhost

To run the complete Gematria Calculator app with backend:

### Step 1: Install Node.js

```bash
# Option A: Download installer
# Visit: https://nodejs.org/
# Download and install the LTS version

# Option B: Use Homebrew
brew install node

# Verify installation
node --version
npm --version
```

### Step 2: Copy Project to Mac

```bash
# From your Parallels Desktop, the files should be in:
# ~/Desktop/gematria-calculator-original
# OR access via Parallels Shared Folders

# If you need to copy the full project:
# In Parallels Terminal:
cp -r /tmp/LNMWK/gematria-calculator-original ~/Desktop/
```

### Step 3: Run Frontend

```bash
# Open Terminal on Mac
cd ~/Desktop/gematria-calculator-original

# Install dependencies
npm install

# Start development server
npm run dev

# App will open at:
# http://localhost:5173
```

### Step 4: Run Backend (Optional)

```bash
# Open a NEW Terminal window
cd ~/Desktop/gematria-calculator-original/backend

# Install backend dependencies
npm install

# Start backend server
npm start

# Backend runs at:
# http://localhost:3002
```

---

## 📋 What's Included in Your Test File

### Browser Test Features:

✅ **20+ Automated Tests**
- Gematria Calculator (English & Hebrew)
- Life Path Calculator
- Number Reduction Logic
- Edge Cases

✅ **Beautiful UI**
- Real-time progress tracking
- Color-coded results
- Detailed error messages
- Pass/fail statistics

✅ **No Dependencies Required**
- Runs in any modern browser
- No installation needed
- Works offline

---

## 🔧 Troubleshooting on Mac

### Issue: "Cannot open file" warning

**Solution:**
1. Right-click the HTML file
2. Select "Open With" > "Safari" (or Chrome/Firefox)
3. Or go to System Preferences > Security & allow the file

### Issue: Tests won't run

**Solution:**
- Make sure you clicked "▶ Run All Tests" button
- Check browser console (Cmd + Option + I)
- Try a different browser

### Issue: Need Node.js

**Solution:**
```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

---

## 🎨 Mac-Specific Tips

### Using Chrome DevTools
```
Cmd + Option + I  - Open DevTools
Cmd + Option + J  - Open Console
Cmd + R           - Refresh page
```

### Using Safari DevTools
```
1. Safari > Preferences > Advanced
2. Check "Show Develop menu in menu bar"
3. Develop > Show Web Inspector
```

### Quick Commands
```bash
# Open Terminal at location
# Right-click folder > Services > New Terminal at Folder

# List all running servers
lsof -i :8000

# Kill a server on port 8000
kill -9 $(lsof -ti:8000)
```

---

## 🚀 Running Tests on Mac

### Browser Tests (Instant)
```bash
# Just double-click on Desktop:
tmp_rovodev_test_runner.html
```

### With Simple Server
```bash
cd ~/Desktop
python3 -m http.server 8000
# Visit: http://localhost:8000/tmp_rovodev_test_runner.html
```

### Full Project Tests
```bash
cd ~/Desktop/gematria-calculator-original
npm install
npm test
```

---

## 📱 Bonus: Testing on iPhone/iPad

If you run a localhost server on your Mac:

1. **Find your Mac's IP address:**
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. **Start server on Mac:**
   ```bash
   python3 -m http.server 8000
   ```

3. **On iPhone/iPad (same WiFi):**
   ```
   http://YOUR-MAC-IP:8000/tmp_rovodev_test_runner.html
   ```

---

## 📂 File Locations

### On Your Mac Desktop:
```
~/Desktop/
├── tmp_rovodev_test_runner.html    # Test runner
└── LOCALHOST_TEST_SETUP.md          # General guide
```

### Full Project (if copied):
```
~/Desktop/gematria-calculator-original/
├── tmp_rovodev_test_runner.html
├── LOCALHOST_TEST_SETUP.md
├── MAC_LOCALHOST_GUIDE.md           # This file
├── index.html                        # Main app
├── script.js                         # Core logic
├── package.json
└── backend/
    └── server.js
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Open test file | Double-click `tmp_rovodev_test_runner.html` |
| Start Python server | `python3 -m http.server 8000` |
| Install Node.js | `brew install node` |
| Run dev server | `npm run dev` |
| Run tests | `npm test` |
| Check Node version | `node --version` |

---

## 🌟 Next Steps

1. **Try the browser test NOW:**
   - Go to Desktop
   - Open `tmp_rovodev_test_runner.html`
   - Click "Run All Tests"

2. **Install Node.js for full features:**
   - `brew install node`
   - Copy full project to Mac
   - Run `npm run dev`

3. **Develop on Mac:**
   - Edit files on Mac
   - Test in browser
   - Deploy when ready

---

## 📞 Getting Help

- **Test not loading?** Try a different browser
- **Server won't start?** Check if port is already in use
- **Need Node.js?** Install via Homebrew: `brew install node`

---

**Created for macOS**
**Last Updated:** January 20, 2026
**Status:** ✅ Files ready on your Desktop!

---

## 🎉 You're All Set!

Your test files are on your **Mac Desktop** right now. Just:
1. Open Finder
2. Go to Desktop  
3. Double-click `tmp_rovodev_test_runner.html`
4. Click "Run All Tests"

Enjoy testing! 🚀
