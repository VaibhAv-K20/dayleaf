# Dayleaf — The Daily Focus Board 📝

**[🌍 Live Demo: dayleaf.vercel.app](https://dayleaf.vercel.app/)**

A minimalist daily planner that resets every 24 hours. Built to feel like a premium notebook, not an app.

## ✨ Features

- **3 Main Tasks** — Your top priorities for the day
- **5 Small Tasks** — Quick wins and errands
- **24-Hour Reset** — Fresh start every midnight
- **Zen Animations** — Calm checkbox fills, smooth slide-downs
- **Zero Backend** — Everything saved in localStorage

## 🎨 Design Philosophy

- Background: `#FDFCF9` (warm off-white, like real paper)
- Text: `#2A2A2A` (soft black, easy on eyes)
- Secondary: `#6B6B6B` (labels, counters)
- Accent: `#D6D3CD` (checkboxes, dividers)
- Fonts: Playfair Display (headings) + Inter (body)

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskRow.jsx         # Single task with checkbox
│   └── CompletedArea.jsx   # Completed tasks section
├── hooks/
│   └── useTasks.js         # State, localStorage, reset logic
├── index.css               # Global styles + animations
├── App.jsx                 # Main layout (imports everything)
└── main.jsx                # React entry point
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🛠 Tech Stack

- **React** (Vite)
- **Tailwind CSS v4**
- **LocalStorage** (zero backend)

## 🎨 Themes (9 Total)

- 📝 Classic Paper (Free)
- 🌲 Dark Forest
- 🌅 Sunset Breeze
- 📜 Vintage Paper
- 🌤️ Blue Sky
- 🌸 Pink Rose
- 🌙 Black Night
- 🍷 Red Wine
- ☀️ Yellow Day
