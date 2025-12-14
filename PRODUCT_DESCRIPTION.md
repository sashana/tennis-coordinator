# Tennis Coordinator - Product Description

**Version:** 0.9.0
**Live App:** [tennis.sportsconnector.com](https://tennis.sportsconnector.com)

---

## What It Is

Tennis Coordinator is a **mobile-first Progressive Web App** that eliminates the coordination chaos for tennis groups. Players check in with their availability and preferences, and the system automatically organizes them into optimal match groups—no more endless group chat messages or manual coordination.

---

## Primary Personas

### 🎾 **Tight-Knit Group Members** (Primary Focus)
**Example:** Tuesday/Thursday Midday Doubles (15-20 regulars)

**Characteristics:**
- Everyone knows each other well
- High trust, minimal need for strict rules
- Primarily play doubles
- Value simplicity over structure

**Key Needs:**
- ✅ Check in with minimal friction (3 taps)
- ✅ See who's playing at a glance
- ✅ Handle odd numbers gracefully (3-player rotation)
- ✅ Quick coordination via WhatsApp/SMS integration
- ✅ Light admin controls with transparency

---

### 🏢 **Club Community Members**
**Example:** Bay Club 18+ Tennis (50+ members)

**Characteristics:**
- Mix of regulars and occasional players
- Varied skill levels and familiarity
- Need for partner preferences
- Privacy-conscious

**Key Needs:**
- ⚠️ Partner exclusion lists (singles only - partial)
- ✅ Skill level visibility (via member notes)
- ✅ Notification preferences
- ✅ Clear group rules and story
- ⚠️ Advanced filtering (planned)

---

### 📍 **Location-Flexible Groups**
**Example:** Coworkers or friends across different cities

**Characteristics:**
- Geographically dispersed
- Need location consensus before committing
- Willing to travel for the right group

**Key Needs:**
- ❌ Location proposals (not yet implemented)
- ❌ Location-based matching (planned)
- ✅ Multi-group support via unique URLs
- ✅ Guest check-in for one-time players

---

### 🎯 **Group Administrators**
**Role:** Group owners and coordinators

**Key Needs:**
- ✅ Member management (add, edit, rename, track who invited whom)
- ✅ Manual match arrangement override
- ✅ Activity history with delete capability
- ✅ Configurable group story and rules
- ✅ PIN-based admin access
- ✅ Weather location customization

---

### 🔧 **Site Administrators**
**Role:** Platform managers running multiple groups

**Key Needs:**
- ✅ Create/edit/delete groups
- ✅ Clone group configurations
- ✅ Manage short codes and URLs
- ✅ Set up PINs per group
- ✅ View all groups in sortable table

---

## Core Use Cases (Implemented ✅)

### Universal (All Groups)

1. **Signal Availability**
   - Players check in for specific dates with 3 taps
   - Choose play style: Singles Only, Doubles Only, or Either
   - Select time windows (multiple slots supported)
   - Opt into 3-player rotation if desired

2. **Automatic Match Formation**
   - System organizes players into optimal groups
   - Respects partner exclusions (singles)
   - Matches time availability windows
   - Handles odd numbers with rotation groups
   - Real-time updates as players check in/out

3. **See Who's Playing**
   - Live view of all check-ins for a date
   - Organized match groups displayed clearly
   - Match notes for court/time coordination
   - Weather forecast for planning

4. **Self-Manage Participation**
   - Remove own check-ins anytime
   - Permission-based: remove check-ins you added
   - Confirmation dialogs prevent accidents
   - Activity log shows all changes

5. **Multi-User Check-In**
   - Coordinators can check in others
   - Tracks "added by" for transparency
   - Session user remembers your identity
   - Guest check-in for non-members

6. **My Matches View**
   - See all upcoming matches across dates
   - Quick navigation to specific dates
   - Share multiple matches via WhatsApp/SMS
   - Status indicators (ready/forming)

### Tight-Knit Groups

7. **Minimal Friction Check-In**
   - Streamlined UX with collapsible forms
   - "Remember me" auto-selects your name
   - Time presets for common patterns
   - Auto-scroll to latest check-ins

8. **Light Guardrails**
   - Gentle confirmations for deletions
   - PIN protection for admin functions
   - Transparent tracking (who added whom)

9. **Quick Guest Inclusion**
   - "Add Guest" option in name dropdown
   - No admin approval needed
   - Guest names tracked separately

10. **Group Notifications**
    - WhatsApp/SMS share prompts after check-in
    - Auto-formatted messages with date/players
    - One-tap sharing of match status

11. **Activity History**
    - Timestamped log of all check-ins/removals
    - View activity for specific dates or all dates (admin)
    - Delete activity entries (admin)
    - Shows match arrangements and changes

12. **Community Member Management**
    - Any member can add new members
    - Tracks who added whom, when, and contact info
    - Transparency via visible member details (admin)
    - Social accountability

### Admin Features

13. **Member Management**
    - Add members with phone, email, notes
    - Edit member details
    - Rename members (auto-updates session)
    - Track member additions with metadata
    - Invite members via share link

14. **Manual Match Arrangement**
    - Override automatic grouping
    - Drag-and-drop player assignment
    - Custom match notes
    - Arrangement activity logging

15. **Group Configuration**
    - Set group name, story, and rules
    - Configure weather location
    - Manage PINs (group and admin)
    - Activity history management

---

## Key Features Built

### ✅ Mobile-First Design
- **Bottom tab navigation** (iOS-style)
- 5 tabs: Check In, My Matches, Notifications, Help, Profile
- Progressive Web App (installable)
- Offline caching with service worker
- Native app feel

### ✅ Intelligent Matching Algorithm
- Partner preference enforcement
- Time window overlap detection
- Play style matching (singles/doubles)
- 3-player rotation handling
- Real-time match updates

### ✅ Notification System
- In-app notification center
- Badge counts on tab bar
- Watch specific members
- Activity alerts (check-ins, removals)
- Click to navigate to date

### ✅ Weather Integration
- Location-based forecast
- Visual weather display
- Configurable per group
- Helps with planning

### ✅ Multi-Group Support
- Unlimited groups via unique URLs
- Short code system (e.g., `/ttmd`)
- URL-based routing
- Isolated data per group
- Group selector modal

### ✅ Profile Management
- Edit display name, phone, email
- Self-service name changes
- Session persistence
- Admin login access

### ✅ Site Admin Dashboard
- Create/edit/delete groups
- Clone configurations
- Manage all groups from `/admin`
- Master PIN protection

### ✅ Share & Communication
- WhatsApp integration
- SMS sharing
- Copy to clipboard
- Multi-game sharing
- Invite prompts

### ✅ UX Polish
- Toast notifications
- Confirmation dialogs
- Loading states
- Responsive design
- Real-time Firebase sync
- 718 unit tests

---

## Technology Stack

- **Frontend:** Preact with TypeScript
- **State:** @preact/signals
- **Build:** Vite
- **Backend:** Firebase Realtime Database
- **Hosting:** Firebase Hosting
- **Testing:** Vitest (718 tests)
- **PWA:** Service Worker + Manifest
- **Architecture:** Component-based SPA

---

## What Makes It Different

### 🚀 **Frictionless**
3 taps to check in. No app download required. Works on any device.

### 🤝 **Socially Aware**
Transparent where it helps (who invited whom). Private where it matters (partner exclusions).

### 📱 **Mobile-First, Always**
Built for phones from day one. Tab navigation. One-handed operation.

### 🎯 **Group-Optimized**
Maximizes matches for the whole group, not just individuals. Handles odd numbers gracefully.

### 🔐 **Trust-Scaled**
Light guardrails for tight-knit groups. More controls for larger communities. Adapts to social dynamics.

### ⚡ **Real-Time**
Changes appear instantly. No refresh needed. Firebase-powered sync.

---

## Success Metrics (Current Usage)

- **3 active groups** running in production
- **60+ total members** across groups
- **Daily check-ins** during active seasons
- **iOS PWA installation** by regular users
- **WhatsApp integration** used by majority of groups

---

## What's Next

### Planned (Not Yet Built)

- **Partner preferences for doubles** (currently singles-only exclusions)
- **Skill level filtering** for larger groups
- **Location consensus** for dispersed groups
- **Enhanced authentication** (Phase 2 Firebase security)
- **Performance indexes** for user notifications
- **Multi-club/multi-tenant** architecture (foundation built)

---

## Get Started

1. **As a Player:** Visit your group's URL → Enter PIN → Check in
2. **As a Group Admin:** Contact site admin for group setup
3. **As Site Admin:** Visit `/admin` → Create group → Configure settings

---

**Built with Claude Code** | **Version 0.9.0** | **2025**
