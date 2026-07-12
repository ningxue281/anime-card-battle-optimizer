# Anime Card Battle Optimizer

A professional, production-quality Progressive Web App (PWA) for building and optimizing anime card battle teams with offline support.

## Features

- 🎴 **Character Database** - Manage cards with multiple border rarities (Base, Gold, Magmatic, Abyssal, Mystic, Chronicle)
- 🛠️ **Team Builder** - Build teams with traits and supports
- ⚡ **Team Optimizer** - AI-powered team optimization
- ⚔️ **Battle Simulator** - Simulate battles between teams
- 📊 **Statistics** - Track performance and synergies
- 📱 **Responsive Design** - Mobile-first with desktop support
- 🔄 **Offline Support** - Full PWA with offline capability
- 🎨 **Dark Theme** - Professional gaming interface
- ⚡ **High Performance** - Built with React, TypeScript, and IndexedDB

## Technology Stack

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with dark theme
- **Vite** - Build tool
- **Dexie.js** - IndexedDB wrapper
- **Zustand** - State management
- **PWA** - Offline support and installation

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components for each module
├── db/                 # Database models and hooks
├── stores/             # Zustand stores for state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
├── index.css           # Global styles
└── serviceWorker.ts    # PWA service worker registration

public/
├── manifest.json       # PWA manifest
├── sw.js              # Service worker
└── icons/             # App icons
```

## Modules

### Dashboard
Overview of the application with quick stats and getting started guide.

### Character Database
Upload and manage your card collection with independent border rarity profiles.

### Support Database
Manage support items with artwork, descriptions, and effects.

### Traits Database
Manage trait effects and bonuses displayed as an icon grid.

### Team Builder
Create teams with 5 slots, selecting characters, border rarities, traits, and supports.

### Team Optimizer
Automatically optimize teams based on synergy and battle readiness.

### Battle Simulator
Simulate battles between teams using only data from your databases.

### Statistics
View performance metrics, win rates, and team statistics.

### Settings
Export/import data, clear database, and manage application settings.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

The application will be built to the `dist` directory.

## Database Rules

- Application starts completely empty
- No fake or placeholder data
- All data comes only from uploaded databases
- Empty displays show "No data available" message
- Each border rarity has independent stats
- All calculations use only available data

## PWA Installation

The app can be installed as a standalone application on:
- Android (Chrome)
- iOS (Safari 15.1+)
- Desktop (Chrome, Edge, Opera)

Full offline support is available after installation.

## Performance Considerations

- Automatic saving of all edits
- IndexedDB for client-side persistence
- Supports thousands of cards and simulations
- Optimized for mobile and desktop
- Smooth animations and fast interactions

## License

MIT
