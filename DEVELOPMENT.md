# Development Environment Guide

This document describes all development and production environments for Tennis Coordinator.

---

## Architecture Overview

Tennis Coordinator has two parallel codebases:

| Codebase | Description | Status |
|----------|-------------|--------|
| **Legacy JS** | Original single-file JavaScript app (`index.html`) | Production (Live) |
| **TypeScript** | Modern Preact/TypeScript rewrite (`src/`, `app.html`) | Development (v0.9.0) |

Both codebases share the **same Firebase Realtime Database**, ensuring data continuity during the transition.

---

## Environments

### Production Environments

| Environment | URL | Codebase | Status |
|-------------|-----|----------|--------|
| **Custom Domain (Primary)** | https://tennis.sportsconnector.com | Legacy JS | **LIVE** - Used by real users |
| **Firebase Hosting** | https://tennis-coordinator-43f53.web.app | TypeScript | Staging - For testing before migration |
| **GitHub Pages** | https://sashana.github.io/tennis-coordinator/ | Legacy JS | Backup |

**Important Notes**:
- `tennis.sportsconnector.com` is the primary production URL shared with real users (Legacy JS)
- `tennis-coordinator-43f53.web.app` is where the new TypeScript app is deployed for testing
- When TypeScript is ready for production, it will replace Legacy JS on the custom domain

### Development Environment (Local)

| Environment | URL | How to Start |
|-------------|-----|--------------|
| **TypeScript Dev** | http://localhost:3000/app.html?group=ttmd | `npm run dev` |

To compare with Legacy JS behavior, use the live production site at https://tennis.sportsconnector.com.

---

## Firebase Configuration

### Project Details
- **Project ID**: `tennis-coordinator-43f53`
- **Database URL**: `https://tennis-coordinator-43f53-default-rtdb.firebaseio.com`
- **Hosting URL**: https://tennis-coordinator-43f53.web.app

### Database Structure
Both codebases read/write to the same paths:
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

## Codebase Details

### Legacy JS (`index.html`)
- **Entry Point**: `/index.html`
- **Technology**: Vanilla JavaScript, single HTML file
- **Firebase SDK**: Loaded via CDN
- **Current Version**: Frozen (no active development)
- **File Size**: ~3,500 lines

### TypeScript (`src/`)
- **Entry Point**: `/app.html` → `src/main.tsx`
- **Technology**: Preact + TypeScript + Vite
- **Firebase SDK**: npm package (`@anthropic-ai/sdk`)
- **Current Version**: v0.9.0
- **Test Suite**: 718 tests (Vitest)

#### Key Files
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

# Start TypeScript dev server with hot reload
npm run dev
# → http://localhost:3000/app.html?group=ttmd

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Building for Production
```bash
# Build TypeScript to dist/
npm run build

# Preview production build locally
npm run preview -- --port 4000
```

### Deploying to Production
```bash
# Deploy to Firebase Hosting
npm run build
firebase deploy --only hosting
```

---

## Version History

| Version | Date | Milestone |
|---------|------|-----------|
| v0.9.0 | Dec 2024 | TypeScript rewrite feature-complete, multi-tenant types |
| v0.8.x | Nov 2024 | TypeScript migration, core features ported |
| v0.7.x | Nov 2024 | Legacy JS production features |

---

## Multi-Tenant Migration Status

The codebase includes preparation for a future multi-club architecture:

| Phase | Status | Description |
|-------|--------|-------------|
| Phase 1: Foundation | Complete | Types, migration script, compatibility layer |
| Phase 2: User Identity | Paused | Device tokens, user profiles |
| Phase 3+: Club Management | Pending | Full multi-tenant features |

**Why paused**: Phase 2 writes to new Firebase paths (`platform/...`). Must deploy TypeScript to production first to avoid data divergence with Legacy JS.

See `~/.claude/plans/peaceful-noodling-liskov.md` for full migration plan.

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

# Legacy JS (for comparison)
npx serve -s . -l 4000           # Serve legacy app locally
```

---

## Troubleshooting

### TypeScript dev server not starting
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
