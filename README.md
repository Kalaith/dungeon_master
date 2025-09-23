# Dungeon Master

A digital dungeon master toolkit for tabletop RPG campaigns, featuring NPC management, story tracking, and campaign utilities built with React and TypeScript.

## Game Features

- **NPC Management**: Create and manage non-player characters with detailed profiles
- **Story Tracking**: Keep track of campaign events and story progression
- **Interactive Game Board**: Visual representation of game state and locations
- **Status Meters**: Monitor various campaign metrics and player stats
- **Event System**: Dynamic event generation and management

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand 5
- **Charts**: Chart.js for campaign analytics
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Type checking
npm run type-check

# Run full CI pipeline
npm run ci
```

## Deployment

```powershell
# Deploy to preview environment
.\publish.ps1

# Deploy to production
.\publish.ps1 -Production
```

## Features Overview

- **Campaign Dashboard**: Central hub for campaign management
- **NPC Database**: Searchable database of campaign characters
- **Story Cards**: Visual story progression system
- **Location Tracking**: Manage campaign locations and settings
- **API Integration**: RESTful API for data persistence

## Project Structure

```
dungeon_master/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # Main layout components
│   │   │   └── game/      # Game-specific components
│   │   ├── api/           # API service layer
│   │   ├── stores/        # Zustand state management
│   │   └── types/         # TypeScript definitions
│   └── dist/              # Build output
└── README.md              # This file
```

Perfect for dungeon masters who want to digitize their campaign management and enhance their tabletop RPG sessions.

Part of the WebHatchery game collection.