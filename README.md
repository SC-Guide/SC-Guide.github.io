# Skincare Guide — Full-Stack Web Application

[![Status](https://img.shields.io/badge/status-active%20development-yellow)](https://github.com/SC-Guide/SkinGuide)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-brightgreen)](https://sc-guide.github.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**Skincare Guide** is a responsive web application that helps users plan and track their daily skincare routines.  
It features an interactive calendar with retinal/azelaic scheduling, a searchable product library, bilingual support (EN/RU), and a dark/light theme.

> 🚧 **This project is under active development.** New features, performance improvements, and database integration are being added regularly.

---

## 🌐 Live Demo

Explore the live version of the project:

- **Homepage:** [https://sc-guide.github.io/](https://sc-guide.github.io/)
- **Planner (demo):** [https://sc-guide.github.io/planner.html](https://sc-guide.github.io/planner.html)
- **Product Shop:** [https://sc-guide.github.io/shop.html](https://sc-guide.github.io/shop.html)
- **Skin Profile:** [https://sc-guide.github.io/skin-profile.html](https://sc-guide.github.io/skin-profile.html)
- **Interactive Showcase:** [https://sc-guide.github.io/demo.html](https://sc-guide.github.io/demo.html)

---

## ✨ Key Features

- **Smart Routine Planner** – automatically alternates retinal and azelaic acid based on your start date.
- **Product Library** – curated list of skincare products with details, prices, and shop links.
- **Search & Filter** – real‑time search by name, description, and filter by “recommended” or “my products”.
- **Interactive Calendar** – snake‑style monthly view with day‑by‑day routine preview and “done” marks.
- **Bilingual Interface** – full support for English and Russian (i18n via key‑value mapping).
- **Dark / Light Theme** – seamless toggle with system preference detection.
- **Custom SVG Icons** – all icons are self‑contained, no external libraries.

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (custom properties), JavaScript (ES6+)
- **State Management:** LocalStorage (migrating to Firestore)
- **Authentication:** Firebase Auth (Google Sign‑in)
- **Database:** Firestore (in progress)
- **Hosting:** GitHub Pages
- **Version Control:** Git & GitHub
- **Icons:** Custom SVG (no external dependencies)

---

## 🚀 Future Roadmap

- Full Firestore integration for cloud sync
- User‑generated product reviews and ratings
- AI‑based personalised recommendations
- Progress analytics and statistics
- Progressive Web App (PWA) support
- Integration with external skincare APIs
- Admin panel for product management

---

## 📂 Project Structure
SkinGuide/
├── index.html # Homepage
├── planner.html # Main planner page
├── my-planner.html # Personal planner (demo)
├── shop.html # Product shop
├── skin-profile.html # User profile form
├── blog.html # Blog (static)
├── about.html # About page
├── privacy.html # Privacy policy
├── demo.html # Portfolio/showcase page
├── css/
│ └── style.css # Global styles
├── js/
│ ├── firebase.js # Firebase config & auth
│ ├── icons.js # Custom SVG icons
│ ├── lang.js # Translation strings (EN/RU)
│ ├── data.js # Product data (local fallback)
│ ├── app.js # Core application logic
│ ├── calendar.js # Calendar module
│ ├── products.js # Product management
│ ├── modals.js # Modal windows
│ └── filters.js # Search and filter logic
└── README.md # This file

text

---

## 🧪 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SC-Guide/SkinGuide.git
   cd SkinGuide
Open index.html in your browser – no build step required.

(Optional) Set up a local server (e.g., VS Code Live Server) for better development experience.

🤝 Contributing
This is a personal portfolio project, but I welcome feedback and suggestions.
Feel free to open an issue or reach out via email.

📧 Contact
Author: Anastasiia Vyshnevska

Email: vyshnevska2503@gmail.com

GitHub: SC-Guide

📄 License
This project is licensed under the MIT License – see the LICENSE file for details.

Last updated: August 2026 — active development continues.
