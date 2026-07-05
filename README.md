# 🌿 Skincare Guide

**Skincare Guide** — your step-by-step companion for safe active skincare.

🔗 **Live demo:** [vyshnevska2503-code.github.io/SkinGuide](https://vyshnevska2503-code.github.io/SkinGuide/)  
📂 **Source code:** [github.com/vyshnevska2503-code/SkinGuide](https://github.com/vyshnevska2503-code/SkinGuide)

---

## 📋 About

**Skincare Guide** was born from a simple yet critical need: helping people use active skincare ingredients **safely and confidently**. Whether you're starting retinal, exploring acids, or building a complex routine, the project guides you through every step — from product selection to daily tracking.

It was built as a portfolio case study to demonstrate:

- content strategy and data structuring,
- design system and responsive layout,
- interactivity and thoughtful UX,
- modular code architecture and DevOps.

The project features a **snake‑style calendar**, **automated scheduling** for active ingredients, **safety-first guidance**, and **detailed product cards** with skin type, ingredients, usage instructions, conflict warnings, and shop links.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🛡️ **Safety-first guidance** | Conflict detection, warnings, and safe usage tips for retinal, acids, masks, and more. |
| 🌍 **Bilingual interface** | Full support for Russian and English — switch with one click. |
| 🐍 **Snake‑style calendar** | Days flow in a winding path (boustrophedon) instead of a boring grid. |
| ⚡ **Automated schedule** | Retinal and azelaic acid are generated based on rules: <br> • retinal: 2x/week → every other night → daily <br> • azelaic: starts from week 3. |
| 📋 **Detailed routine view** | Click a day to see exact products for each morning/evening step. |
| ✅ **"Done" marks** | Checkboxes are saved in your browser's localStorage and synced with Firebase. |
| 🧴 **"My Products"** | Mark products you own — only those appear in your calendar routine. |
| 🔍 **Search & filter** | Find products quickly and filter by "recommended only". |
| 🔐 **Cloud sync** | Google Sign‑In and Firebase Firestore for seamless cross-device access. |
| 📱 **Fully responsive** | Works on all devices, from mobile to desktop. |

---

## 🛠️ Tech Stack

### Front-end
- **HTML5 / CSS3** — custom properties, responsive layout (mobile-first)
- **JavaScript (ES6+)** — modular architecture, DOM manipulation, localStorage
- **Fonts:** Playfair Display (headings) + Inter (body)
- **SVG icons** — inline for performance

### Backend & Services
- **Firebase Authentication** — Google Sign‑In
- **Firestore** — cloud storage for user data (routines, products, progress)
- **GitHub Pages** — CI/CD deployment

### Development & Workflow
- **Git** — version control
- **GitHub Desktop** — local–remote synchronisation
- **VS Code** — code editor with Live Server for local testing

---

## 📁 Project Structure
SkinGuide/
├── index.html # Main application (bilingual planner)
├── demo.html # Portfolio demo (with presentation blocks)
├── css/
│ └── style.css # All styles (shared between pages)
├── js/
│ ├── data.js # Product data (morning, evening, kit, rules, shops)
│ ├── lang.js # Bilingual strings (EN/RU)
│ ├── icons.js # SVG icons
│ ├── products.js # Product logic (cards, owned, rendering)
│ ├── calendar.js # Calendar logic (snake, scheduling, navigation)
│ ├── modals.js # Modal windows (product, day, settings)
│ ├── filters.js # Search and filter
│ ├── firebase.js # Firebase config, auth, Firestore sync
│ └── app.js # Initialisation, rendering, user state
├── assets/
│ ├── images/ # Social preview images
│ └── icons/ # Favicon and other icons
├── README.md # Project documentation
├── og-image-ru.png # Social preview (Russian)
└── og-image-en.png # Social preview (English)

text

---

## 🎨 Colour Palette

| Colour | HEX | Usage |
|--------|-----|-------|
| Coral accent | `#EF6C57` | Buttons, icons, highlights, warnings |
| Mint accent | `#7ED3B2` | Secondary elements, badges |
| Soft mint | `#B9E6D3` | Cards, blocks, backgrounds |
| Light background | `#F2F2F2` | Main page background |

---

## 🚀 Future Development

**Short-term:**
- [ ] **PWA** — install as a mobile app
- [ ] **Export to PDF** — save your routine as a checklist
- [ ] **Advanced statistics** — progress charts and insights

**Medium-term:**
- [ ] **Freemium model** — free core + premium features (multiple routines, advanced analytics, AI recommendations)
- [ ] **AI-powered routine builder** — personalised recommendations based on skin type and goals
- [ ] **Apple Sign‑In** — additional authentication option

**Long-term:**
- [ ] **Community features** — share routines (opt-in), rate products
- [ ] **B2B integration** — white-label for dermatologists and cosmetic clinics
- [ ] **Mobile app** — full native experience

---

## 👩‍💻 Author

**Anastasiia Vyshnevska**  
Creative Generalist & Digital Product Developer  
This portfolio project was built with the help of AI tools (ChatGPT, Claude); design and coding were done by hand.

🔗 [GitHub](https://github.com/vyshnevska2503-code) · [LinkedIn](https://www.linkedin.com/in/anastasiia-v-22a17b21b/)

---

## 📄 License

This project is created for **educational and portfolio purposes only**. Not intended for commercial use.

---

## ⚠️ Disclaimer

This project is for **educational and portfolio purposes only**. It does not provide medical advice. All skincare recommendations are based on publicly available information and personal experience. Always consult a qualified dermatologist or healthcare professional before starting any new skincare routine. Use at your own risk.
