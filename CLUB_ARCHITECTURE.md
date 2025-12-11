# Club Community Architecture

**Version:** 0.1.0
**Last Updated:** 2025-12-09
**Status:** Draft / Discussion

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-12-09 | Initial draft - club community model, multi-sport scalability |

---

## Overview

This document outlines the architecture for evolving Tennis Coordinator from isolated standalone groups to a platform supporting:

- **Users** with persistent identity across groups and clubs
- **Clubs** with Tennis Directors who can organize and oversee groups
- **Self-organizing groups** within clubs or standalone
- **Discovery** of players and groups (future)
- **Multi-sport scalability** (tennis now, pickleball and others later)

---

## Platform Vision

```
                        SPORTS CONNECTOR PLATFORM
    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    │   tennis.sportsconnector.com    pickleball.sportsconnector.com
    │            │                              │               │
    │            ▼                              ▼               │
    │   ┌─────────────────┐           ┌─────────────────┐      │
    │   │  Tennis Module  │           │Pickleball Module│      │
    │   │                 │           │    (Future)     │      │
    │   └────────┬────────┘           └────────┬────────┘      │
    │            │                              │               │
    │            └──────────┬──────────────────┘               │
    │                       ▼                                  │
    │            ┌─────────────────────┐                       │
    │            │    Shared Core      │                       │
    │            │  - User accounts    │                       │
    │            │  - Clubs            │                       │
    │            │  - Groups           │                       │
    │            │  - Check-ins        │                       │
    │            │  - Match formation  │                       │
    │            └─────────────────────┘                       │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

### Multi-Sport Considerations

| Aspect | Shared Across Sports | Sport-Specific |
|--------|---------------------|----------------|
| User identity & profile | ✓ | |
| Club structure | ✓ | |
| Group management | ✓ | |
| Check-in system | ✓ | |
| Match formation rules | | ✓ (tennis: singles/doubles, pickleball: different rules) |
| Skill ratings | | ✓ (NTRP vs DUPR) |
| Terminology | | ✓ (court vs court, but game-specific terms) |

---

## URL Routing Strategy

### Current State (Confusing)

| Environment | URL | Issues |
|-------------|-----|--------|
| Legacy | `tennis.sportsconnector.com/ttmd` | Path-based group ID |
| New Dev | `localhost:3000/app.html#ttmd` | Hash routing, `.html` in URL |

### Proposed Structure

**Production URLs:**
```
tennis.sportsconnector.com/                     # Landing / login
tennis.sportsconnector.com/g/ttmd               # Group "ttmd" (standalone)
tennis.sportsconnector.com/g/ttmd/2025-12-09    # Group + specific date (optional)
tennis.sportsconnector.com/c/bayclub            # Club "bayclub" dashboard
tennis.sportsconnector.com/c/bayclub/groups     # Club's groups list
tennis.sportsconnector.com/c/bayclub/g/tuesday  # Group within club
tennis.sportsconnector.com/u/settings           # User settings
tennis.sportsconnector.com/u/my-groups          # User's groups dashboard
```

**Future multi-sport:**
```
pickleball.sportsconnector.com/g/friday-crew
pickleball.sportsconnector.com/c/lifetime-fitness
```

### URL Hierarchy

```
/{sport}.sportsconnector.com
    /                           # Home / Landing
    /g/{groupSlug}              # Standalone group
    /c/{clubSlug}               # Club home
    /c/{clubSlug}/g/{groupSlug} # Group within club
    /c/{clubSlug}/members       # Club member directory
    /c/{clubSlug}/admin         # Club admin (director)
    /u/                         # User area
    /u/settings                 # User profile settings
    /u/my-groups                # User's groups across clubs
    /discover                   # Find groups/players (future)
```

### Routing Implementation

**Recommended:** Use proper client-side routing (no hash, no `.html`)

```typescript
// Route patterns
const routes = {
  home: '/',
  group: '/g/:groupSlug',
  groupDate: '/g/:groupSlug/:date',
  club: '/c/:clubSlug',
  clubGroup: '/c/:clubSlug/g/:groupSlug',
  clubAdmin: '/c/:clubSlug/admin',
  userSettings: '/u/settings',
  userGroups: '/u/my-groups',
};
```

**Backwards Compatibility:**
- Redirect `/#ttmd` → `/g/ttmd`
- Redirect `/app.html#ttmd` → `/g/ttmd`
- Redirect legacy `/ttmd` → `/g/ttmd`

---

## Entity Model

### Hierarchy

```
PLATFORM
├── Users (global identity)
│   └── Can exist independently, join groups, join clubs
│
├── Standalone Groups (no club affiliation)
│   └── Current model - works as-is
│
└── Clubs
    ├── Director(s)
    ├── Club Members (users who joined club)
    └── Groups
        ├── Director-organized (less autonomy)
        └── Self-organized approved (full autonomy)
```

### User States

| State | Description | Example |
|-------|-------------|---------|
| **Platform User** | Has account, no affiliations | Just signed up, exploring |
| **Group Member** | In standalone group(s) | Current tight-knit group model |
| **Club Member** | Joined a club, may or may not be in groups | New to club, browsing |
| **Multi-affiliated** | Multiple clubs + standalone groups | Active player in area |

### User Entity

```typescript
interface User {
  id: string;

  // Profile
  profile: {
    name: string;
    email: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  };

  // Skill (sport-specific)
  skillLevels: {
    tennis?: SkillLevel;
    pickleball?: SkillLevel;  // Future
  };

  // Privacy & Discovery
  visibility: 'public' | 'club-only' | 'private';
  location?: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  };

  // Affiliations
  clubs: string[];      // Club IDs
  groups: string[];     // Group IDs (standalone + club groups)

  // Settings
  notificationPrefs: NotificationPrefs;

  // Metadata
  createdAt: number;
  lastActiveAt: number;
}

interface SkillLevel {
  type: 'self-assessed' | 'self-reported' | 'director-assessed' | 'verified';
  value: string;        // "3.5", "4.0", "6.2"
  system: 'NTRP' | 'UTR' | 'DUPR' | 'general';  // DUPR for pickleball
  assessedBy?: string;  // Director user ID if director-assessed
  verifiedAt?: number;  // Timestamp if verified via API
}
```

### Club Entity

```typescript
interface Club {
  id: string;
  slug: string;         // URL-friendly: "bayclub"
  sport: 'tennis' | 'pickleball';

  // Info
  name: string;         // "Bay Club Tennis"
  location: {
    name: string;       // "Bay Club Redwood Shores"
    address?: string;
    lat?: number;
    lng?: number;
  };

  // Governance
  directors: string[];  // User IDs with director privileges

  // Members
  members: ClubMembership[];

  // Settings
  settings: {
    requireSkillLevel: boolean;
    skillVerification: 'none' | 'self-report' | 'director-required';
    memberApproval: 'open' | 'director-approval' | 'invite-only';
    groupCreation: 'director-only' | 'member-can-propose' | 'member-can-create';
  };

  // Director notifications
  notificationPrefs: {
    realtime: boolean;    // Immediate alerts
    dailyDigest: boolean; // Daily summary
    onDemand: boolean;    // Dashboard only
  };

  // Metadata
  createdAt: number;
}

interface ClubMembership {
  userId: string;
  role: 'member' | 'organizer' | 'director';
  joinedAt: number;
  visibility: 'visible' | 'hidden';  // In club directory
}
```

### Group Entity

```typescript
interface Group {
  id: string;
  slug: string;         // URL-friendly: "tuesday-doubles"
  sport: 'tennis' | 'pickleball';

  // Affiliation
  type: 'standalone' | 'club-organized' | 'club-approved';
  clubId: string | null;

  // Info
  name: string;
  description?: string;

  // Governance
  organizers: string[]; // User IDs who can manage group

  // Members
  members: GroupMembership[];

  // Settings (existing + new)
  settings: {
    // Existing
    adminPin?: string;
    weatherLocation?: string;

    // New
    membershipType: 'open' | 'approval' | 'invite-only';
    skillRange?: { min: string; max: string };  // "3.0" to "4.0"
    genderRestriction?: 'any' | 'male' | 'female' | 'mixed-doubles';
  };

  // Activity data (existing structure)
  checkins: { [date: string]: Checkin[] };
  matches: { [date: string]: Match[] };
  activityLog: ActivityEntry[];

  // Metadata
  createdAt: number;
}

interface GroupMembership {
  userId: string;
  role: 'member' | 'organizer';
  joinedAt: number;
  addedBy?: string;     // For transparency
}
```

---

## Club Governance Model

### Group Types Within Club

| Type | Creation | Autonomy | Director Visibility |
|------|----------|----------|---------------------|
| **Director-Organized** | Director creates | Director can intervene | Full |
| **Self-Organized (Approved)** | Member creates, Director approves | Full autonomy | Full (if group permits) |
| **Self-Organized (Pending)** | Member creates, awaiting approval | Full autonomy | None until approved |

### Director Capabilities

**Club Management:**
- Approve/reject groups requesting to join club
- Set club-wide policies (skill requirements, etc.)
- Manage club member directory
- Assign/revoke director privileges

**Group Oversight:**
- View all club groups' activity (check-ins, matches)
- Create director-organized groups
- Get alerts when groups need players
- Suggest cross-group player moves

**Member Assistance:**
- See members looking for groups
- Match unplaced members to appropriate groups
- Assess and set member skill levels
- Reach out to fill games

### Member Privacy Within Club

**Visibility Options:**
| Setting | In Club Directory | To Other Members | To Director |
|---------|-------------------|------------------|-------------|
| **Visible** | Name, skill, groups | Name, skill | Everything |
| **Hidden** | Not listed | Only in shared groups | Everything |

Members can always be found by Director, but can hide from club directory.

---

## Discovery Features (Future)

### User Discovery Settings

```typescript
interface DiscoverySettings {
  // Am I discoverable?
  publicProfile: boolean;

  // What's visible publicly?
  showSkillLevel: boolean;
  showLocation: boolean;     // City-level, not exact
  showAvailability: boolean; // "Usually plays weekends"

  // What am I looking for?
  lookingFor: {
    groups: boolean;         // "I want to find groups"
    players: boolean;        // "I want to find hitting partners"
  };

  // Search radius
  searchRadius: number;      // miles
}
```

### Discovery Use Cases

1. **Player finds groups:** "Show me 4.0 doubles groups within 10 miles"
2. **Group finds players:** "Show me 4.0 players looking for groups nearby"
3. **Player finds players:** "Show me 4.0 players looking for hitting partners"

---

## Data Model (Firebase)

### Structure

```
/users/{userId}
  /profile
  /skillLevels
  /settings
  /notifications

/clubs/{clubId}
  /info
  /directors
  /members/{userId}
  /settings
  /groups        # References to group IDs

/groups/{groupId}
  /info
  /members/{userId}
  /settings
  /checkins/{date}/{checkinId}
  /matches/{date}
  /matchNotes/{date}
  /activityLog/{entryId}
  /userPreferences/{normalizedName}
  /userNotifications/{normalizedName}

# Indexes for discovery (future)
/indexes
  /groupsByLocation/{geohash}/{groupId}
  /usersByLocation/{geohash}/{userId}
  /groupsBySport/{sport}/{groupId}
```

### Migration from Current Model

**Phase 1: Backwards Compatible**
- Existing groups continue to work as-is
- New `users/` collection for optional accounts
- Groups can optionally link to user accounts

**Phase 2: Club Support**
- Add `clubs/` collection
- Groups can affiliate with clubs
- Directors get club dashboard

**Phase 3: Full User Accounts**
- Encourage user account creation
- Cross-group identity
- Unified "My Groups" view

**Phase 4: Discovery**
- Location indexing
- Public profiles
- Search features

---

## Migration Path

### URL Migration

| Phase | Action |
|-------|--------|
| 1 | Support new routes (`/g/ttmd`) alongside old (`#ttmd`, `/app.html#ttmd`) |
| 2 | Add redirects from old URLs to new |
| 3 | Update all shared links to use new format |
| 4 | Deprecate old URL formats (keep redirects) |

### Data Migration

| Phase | Action |
|-------|--------|
| 1 | Current groups work unchanged |
| 2 | Add optional user account linking |
| 3 | Add club entity, groups can opt-in |
| 4 | Migrate willing groups to club structure |

---

## Open Questions

1. **Anonymous vs Accounts**
   - Can users still check in without an account (current behavior)?
   - Or require accounts for new groups?

2. **Group Ownership Transfer**
   - What happens when a group organizer leaves?
   - Can Director take over abandoned groups?

3. **Cross-Club Groups**
   - Can a group be affiliated with multiple clubs?
   - Or only one club per group?

4. **Notification Channels**
   - Push notifications require native app or PWA
   - SMS for urgent alerts?
   - Email for digests?

5. **Sport-Specific Customization**
   - How much UI/UX differs between tennis and pickleball?
   - Shared components vs sport-specific views?

---

## Fun Features (Future)

### Tournament Color Themes

Seasonal/tournament-themed color schemes to add personality and celebrate major tennis events. Themes could auto-switch based on tournament schedule or be selected by group/user.

| Tournament | Period | Primary | Secondary | Accent |
|------------|--------|---------|-----------|--------|
| **Australian Open** | Jan | `#0099D8` (blue) | `#FFFFFF` | `#00A550` (green) |
| **Indian Wells** | Mar | `#1E3A8A` (navy) | `#F59E0B` (gold) | `#FFFFFF` |
| **Miami Open** | Mar | `#F97316` (orange) | `#06B6D4` (cyan) | `#FFFFFF` |
| **Roland Garros** | May-Jun | `#D35400` (clay) | `#2C5F2D` (green) | `#FFFFFF` |
| **Wimbledon** | Jun-Jul | `#006633` (green) | `#4B286D` (purple) | `#FFFFFF` |
| **US Open** | Aug-Sep | `#0033A0` (blue) | `#FF6600` (orange) | `#FFFFFF` |
| **Default** | Other | `#4CAF50` (green) | `#333333` | `#FFFFFF` |

**Implementation Options:**
1. **Auto-switch by date** - App automatically changes theme during tournament weeks
2. **Group setting** - Director/admin picks theme for their group
3. **User preference** - Individual users pick their preferred theme

**For pickleball:** Could add themes for major pickleball events (PPA Tour, MLP, US Open Pickleball, etc.)

---

## Next Steps

1. Review and refine this architecture
2. Decide on Phase 1 scope
3. Design URL routing implementation
4. Plan user account system
5. Prototype club dashboard for Director

---

*This is a living document. Update version and changelog with each revision.*
