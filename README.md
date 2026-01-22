# Gematria Calculator

A modern, interactive Gematria calculator built with React and Vite. Discover hidden numerical patterns in words using multiple ancient cipher systems.

![Gematria Calculator](https://img.shields.io/badge/React-18.2-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-purple?logo=vite)

## ✨ Features

- **Multiple Cipher Systems**: English Ordinal, Full Reduction, Reverse Ordinal, English Gematria, Jewish/Hebrew, Simple, Sumerian, and Primes
- **Multi-Search Comparison**: Add multiple searches and instantly see matching values across different cipher systems
- **Interactive Matrix Animation**: Beautiful Hebrew/English character rain background effect
- **Search History**: Automatically saves your searches with localStorage
- **Database Matching**: Find matching words and phrases from a curated database
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Color-Coded Results**: Each cipher system has its own distinct color for easy identification

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173/gematria-calculator/` to see the app in action.

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📖 What is Gematria?

Gematria is an ancient alphanumeric code that assigns numerical values to letters, words, and phrases. Originating from Hebrew and Greek traditions, it has been used for centuries to find hidden meanings and connections in sacred texts and language.

## 🎯 Cipher Systems Explained

- **English Ordinal**: A=1, B=2, C=3... Z=26
- **Full Reduction**: Reduces all numbers to single digits (1-9)
- **Reverse Ordinal**: Z=1, Y=2, X=3... A=26
- **English Gematria**: Each letter multiplied by 6
- **Jewish/Hebrew**: Traditional Hebrew gematria values
- **Simple**: Pythagorean reduction system
- **Sumerian**: Ancient Sumerian number system
- **Primes**: Values based on prime number sequence

## 🛠️ Technology Stack

- **React 18** - Modern UI library
- **Vite** - Next-generation frontend tooling
- **CSS3** - Custom styling with CSS variables
- **LocalStorage** - Client-side data persistence

## 📁 Project Structure

```
gematria-calculator/
├── src/
│   ├── GematriaApp.jsx    # Main React component
│   ├── GematriaApp.css    # Styling
│   └── main.jsx           # React entry point
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies
```

## 🌐 Deployment

This project is configured for GitHub Pages deployment. The base path is set to `/gematria-calculator/` in `vite.config.js`.

To deploy to GitHub Pages:

1. Build the project: `npm run build`
2. The `dist/` folder contains your production-ready files
3. Deploy the `dist/` folder to GitHub Pages

## 📝 License

MIT License - Feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

**youhave3eyes**

- GitHub: [@youhave3eyes](https://github.com/youhave3eyes)

---

**Discover the hidden numbers in your words!** ✨

