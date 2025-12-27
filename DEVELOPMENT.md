# Development Environment Guide

This document describes the development and production environments for Tennis Coordinator.

---

## Architecture Overview

Tennis Coordinator is built with **Preact + TypeScript + Vite**.

| Component | Technology |
|-----------|------------|
| **Framework** | Preact |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Database** | Firebase Realtime Database |
| **Hosting** | Firebase Hosting |

---

## Environments

| Environment | URL | How to Start |
|-------------|-----|--------------|
| **Local Development** | http://localhost:3000/?group=ttmd | `npm run dev` |
| **Production** | https://tennis.sportsconnector.com | `npm run build && firebase deploy` |

**Notes**:
- `tennis.sportsconnector.com` points to `tennis-coordinator-43f53.web.app` (Firebase Hosting)
- Both environments run the same TypeScript codebase
- Both connect to the same Firebase Realtime Database

---

## Firebase Configuration

### Project Details
- **Project ID**: `tennis-coordinator-43f53`
- **Database URL**: `https://tennis-coordinator-43f53-default-rtdb.firebaseio.com`
- **Hosting URL**: https://tennis-coordinator-43f53.web.app

### Database Structure
```
groups/
└── {groupId}/
    ├── settings/
    ├── checkins/{date}/
    ├── activity/{date}/
    ├── matchNotes/{date}/
    ├── matchArrangements/{date}/
    └── userNotifications/{userName}/
```

### Hosting Configuration (`firebase.json`)
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"]
  }
}
```

---

## Codebase Structure

- **Entry Point**: `index.html` → `src/main.tsx`
- **Technology**: Preact + TypeScript + Vite
- **Firebase SDK**: Loaded via CDN (compat mode)
- **Test Suite**: Vitest

### Key Files
```
src/
├── main.tsx              # App entry point
├── components/
│   ├── App.tsx           # Main app with routing
│   ├── layout/           # Header, BottomTabBar
│   ├── tabs/             # CheckInTab, MatchesTab, etc.
│   └── modals/           # AdminSettingsModal, etc.
├── hooks/
│   ├── useFirebase.ts    # Firebase data operations
│   └── useCompatibility.ts # Multi-tenant migration prep
├── types/
│   ├── index.ts          # Core type definitions
│   └── multiTenant.ts    # Future multi-club types
└── config/
    └── firebase.ts       # Firebase initialization
```

---

## Development Workflow

### Starting Development
```bash
# Install dependencies (first time only)
npm install

# Start dev server with hot reload
npm run dev
# → http://localhost:3000/?group=ttmd

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for Production
```bash
# Build to dist/
npm run build

# Preview production build locally
npm run preview -- --port 4000
```

### Deploying to Production
```bash
# Build and deploy to Firebase Hosting
npm run build && firebase deploy --only hosting
```

---

## Version History

| Version | Date | Milestone |
|---------|------|-----------|
| v1.0.0 | Dec 2024 | TypeScript in production |
| v0.9.0 | Dec 2024 | TypeScript rewrite feature-complete, multi-tenant types |
| v0.8.x | Nov 2024 | TypeScript migration, core features ported |

---

## Multi-Tenant Migration Status

The codebase includes preparation for a future multi-club architecture:

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1: Foundation | Complete | Types, migration script, compatibility layer |
| Phase 2: User Identity | Ready | Device tokens, user profiles |
| Phase 3+: Club Management | Pending | Full multi-tenant features |

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 3000)
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run build        # Build for production

# Deployment
firebase deploy --only hosting    # Deploy to Firebase
firebase hosting:channel:list     # List hosting channels
```

---

## Troubleshooting

### Dev server not starting
```bash
# Kill any existing processes
pkill -f "vite"
npm run dev
```

### Firebase permission errors
- Check Firebase Console → Rules tab
- Ensure rules allow read/write to `groups/` path

### Tests failing
```bash
# Run specific test file
npx vitest run src/__tests__/specific-test.test.ts

# Run with verbose output
npx vitest run --reporter=verbose
```

---

## Related Documentation

- `README.md` - Feature overview and user guide
- `FIREBASE_SETUP.md` - Firebase project setup instructions
- `FIREBASE_SECURITY.md` - Security rules documentation
- `MATCHING_RULES.md` - Match organization algorithm
- `PRODUCT_SCOPE.md` - Product requirements and scope
