# Deployment Guide

This document describes how to deploy Tennis Coordinator to various environments.

---

## Table of Contents

- [Environments](#environments)
- [Local Development](#local-development)
- [Preview Deployment](#preview-deployment)
- [Production Deployment](#production-deployment)
- [Automated CI/CD](#automated-cicd)
- [Rollback Procedure](#rollback-procedure)
- [Post-Deployment Checklist](#post-deployment-checklist)

---

## Environments

| Environment | URL | Purpose | Auto-Deploy |
|------------|-----|---------|-------------|
| **Local** | localhost:3000 | Development | No |
| **Preview** | preview-[id].web.app | Testing before production | No |
| **Production** | tennis.sportsconnector.com | Live site | Optional (via CI/CD) |

**Note:** `tennis.sportsconnector.com` DNS points to `tennis-coordinator-43f53.web.app`

---

## Local Development

### Start Dev Server

```bash
# Install dependencies (first time only)
npm install

# Start Vite dev server
npm run dev

# Server runs at http://localhost:3000
```

### Build Locally

```bash
# Build for production
npm run build

# Output: dist/ directory

# Preview production build
npm run preview
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

---

## Preview Deployment

Preview deployments allow testing changes before production.

### Create Preview Channel

```bash
# Create a new preview channel (expires in 7 days)
firebase hosting:channel:create preview-feature-name

# Deploy to preview
firebase hosting:channel:deploy preview-feature-name
```

**Example:**
```bash
# Testing new weather widget
firebase hosting:channel:create preview-weather
firebase hosting:channel:deploy preview-weather

# Output:
# ✔ Channel URL: https://tennis-coordinator-43f53--preview-weather-[id].web.app
```

### List Active Preview Channels

```bash
firebase hosting:channel:list
```

### Delete Preview Channel

```bash
firebase hosting:channel:delete preview-feature-name
```

---

## Production Deployment

### Prerequisites

Before deploying to production:

1. ✅ All tests pass (`npm test`)
2. ✅ Build succeeds (`npm run build`)
3. ✅ Code reviewed and approved
4. ✅ Changes tested in preview environment
5. ✅ Version number updated (if applicable)

### Manual Deployment

```bash
# 1. Ensure you're on main branch
git checkout main
git pull origin main

# 2. Install dependencies
npm ci

# 3. Run tests
npm test

# 4. Build for production
npm run build

# 5. Deploy to Firebase
firebase deploy --only hosting

# 6. Verify deployment
# Visit https://tennis.sportsconnector.com
```

### Deploy Specific Files

```bash
# Deploy only hosting
firebase deploy --only hosting

# Deploy only database rules
firebase deploy --only database

# Deploy everything
firebase deploy
```

---

## Automated CI/CD

### Setup GitHub Actions (Optional)

The repository includes ready-to-use GitHub Actions workflows in `.github/workflows/`:

**1. Enable CI Workflow** (`.github/workflows/ci.yml`)
- Already active on push/PR
- Runs tests and builds
- No deployment

**2. Enable Deploy Workflow** (`.github/workflows/deploy.yml`)

Currently **disabled**. To enable:

1. Uncomment the `on:` section in `deploy.yml`
2. Add Firebase service account to GitHub Secrets:

```bash
# Generate service account key
firebase init hosting:github

# Or manually:
# 1. Go to Firebase Console > Project Settings > Service Accounts
# 2. Generate new private key
# 3. Add to GitHub: Settings > Secrets > FIREBASE_SERVICE_ACCOUNT
```

3. Push to main branch triggers automatic deployment

### Environment Variables in CI

Add these secrets to GitHub:
- `FIREBASE_SERVICE_ACCOUNT` - Firebase service account JSON
- Other secrets as needed (see `.env.example`)

---

## Rollback Procedure

### Quick Rollback

Firebase Hosting keeps deployment history:

```bash
# List recent deployments
firebase hosting:releases:list

# Rollback to previous version
firebase hosting:rollback
```

### Manual Rollback

```bash
# 1. Check out previous version
git checkout v1.0.0  # or specific commit

# 2. Build
npm run build

# 3. Deploy
firebase deploy --only hosting
```

### Emergency Rollback

If the site is completely broken:

```bash
# Deploy last known good commit immediately
git checkout <last-good-commit>
npm ci
npm run build
firebase deploy --only hosting --force
```

---

## Post-Deployment Checklist

After deploying to production, verify:

### Functional Tests

- [ ] Landing page loads
- [ ] Can access a group (e.g., /ttmd)
- [ ] PIN authentication works
- [ ] Check-in flow works
- [ ] Match organization displays correctly
- [ ] Real-time updates work
- [ ] Notifications work
- [ ] Weather widget loads
- [ ] My Matches tab shows games
- [ ] Profile tab loads

### Cross-Browser Testing

- [ ] Chrome (desktop & mobile)
- [ ] Safari (desktop & mobile)
- [ ] Firefox
- [ ] Edge

### Mobile Testing

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] PWA install works
- [ ] Standalone mode works

### Performance

- [ ] Lighthouse score > 90
- [ ] Page load < 3s
- [ ] No console errors
- [ ] Firebase connection established

### Monitoring

- [ ] Check Firebase Console for errors
- [ ] Monitor real-time database connections
- [ ] Check hosting traffic

---

## Deployment Checklist

Use this checklist for each deployment:

### Pre-Deployment

- [ ] Branch up to date with main
- [ ] All tests passing
- [ ] Build succeeds locally
- [ ] Code reviewed
- [ ] Version bumped (if applicable)
- [ ] Changelog updated
- [ ] Preview deployment tested

### Deployment

- [ ] Run `npm test`
- [ ] Run `npm run build`
- [ ] Run `firebase deploy --only hosting`
- [ ] Verify deployment success message
- [ ] Note deployment ID

### Post-Deployment

- [ ] Visit production URL
- [ ] Run through functional tests
- [ ] Check browser console for errors
- [ ] Test on mobile device
- [ ] Monitor Firebase Console
- [ ] Notify team of deployment
- [ ] Tag release in git (if major version)

---

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules dist
npm install
npm run build
```

### Deploy Fails

```bash
# Check Firebase login
firebase login

# Check project
firebase projects:list
firebase use tennis-coordinator-43f53

# Try again
firebase deploy --only hosting
```

### Site Not Updating

```bash
# Force cache clear
firebase deploy --only hosting --force

# Clear browser cache
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### DNS Issues

If `tennis.sportsconnector.com` doesn't resolve:

```bash
# Check DNS settings
nslookup tennis.sportsconnector.com

# Should point to: tennis-coordinator-43f53.web.app
```

**Firebase DNS settings:**
- CNAME: `tennis.sportsconnector.com` → `tennis-coordinator-43f53.web.app`

---

## Version Management

### Semantic Versioning

We use [Semantic Versioning](https://semver.org/):
- **Major (1.0.0)**: Breaking changes
- **Minor (1.1.0)**: New features, backwards compatible
- **Patch (1.0.1)**: Bug fixes

### Creating a Release

```bash
# 1. Update version in package.json
npm version patch  # or minor, major

# 2. Create git tag
git tag -a v1.0.1 -m "Release v1.0.1"

# 3. Push tag
git push origin v1.0.1

# 4. Deploy
npm run build
firebase deploy --only hosting

# 5. Create GitHub release (optional)
gh release create v1.0.1 --notes "Release notes here"
```

---

## Firebase Hosting Configuration

### Current Configuration (`firebase.json`)

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "/ttmd",
        "destination": "/ttmd.html"
      },
      {
        "source": "/ttmd/**",
        "destination": "/ttmd.html"
      }
    ]
  }
}
```

### Custom Domain Setup

Already configured for `tennis.sportsconnector.com`:

1. Domain DNS has CNAME pointing to Firebase
2. Firebase Hosting has domain verified
3. SSL certificate auto-provisioned

---

## Security

### Environment Variables

Never commit sensitive data:
- Firebase service account keys
- API keys (use `.env.local`)
- PINs

Use `.env.example` as template.

### Firebase Security Rules

Located in `firebase-rules-phase1-fixed.json`

Deploy separately:
```bash
firebase deploy --only database
```

**⚠️ Warning:** Current rules are permissive. See `AUDIT_REPORT_2025-12-14.md` for recommendations.

---

## Monitoring & Logs

### Firebase Console

Monitor deployment health:
- [Firebase Console](https://console.firebase.google.com/project/tennis-coordinator-43f53)
- Hosting tab: Traffic, deployment history
- Database tab: Real-time connections, data usage

### Application Logs

Add to future roadmap:
- Error tracking (Sentry)
- Analytics (Firebase Analytics)
- Performance monitoring

---

## Contacts

- **Repository**: https://github.com/sashana/tennis-coordinator
- **Issues**: https://github.com/sashana/tennis-coordinator/issues
- **Firebase Project**: tennis-coordinator-43f53

---

**Last Updated:** December 14, 2025
