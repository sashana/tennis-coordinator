# Sports Connector: Bay Club Integration Plan

## Overview

This document outlines the plan to extend Sports Connector to support Bay Club's multi-location, multi-sport organization structure while maintaining backward compatibility with existing independent groups.

---

## Current State

Sports Connector currently supports:
- Independent, flat groups
- Check-in for availability (day-level)
- Match arrangement and sharing
- Multi-sport (tennis, pickleball)
- Multi-group membership via device token
- Site admin panel

---

## Bay Club Requirements

### Organization Structure
- **Bay Club** = organization with 25+ locations
- **Locations** = Courtside, Redwood Shores, Gateway, etc.
- **Groups** = can span one or more locations
- **Directors** = can manage one or more locations

### Key Constraints
1. Groups can span multiple locations (e.g., "Bay Area USTA League" at Courtside + Redwood Shores)
2. Directors can manage multiple locations (not strictly one)
3. Existing independent groups must continue to work unchanged

---

## Data Model: Flat with Tags

### Approach
- Organization owns groups
- Groups have tags/attributes (locations, sport, level)
- Groups can be associated with multiple locations
- No deep nesting hierarchy

```
Organization
     │
     └── Groups (with tags)
              │
              └── Tags: [locations[], sport, level, type]
```

---

## Firebase Schema

### Organizations Collection

```javascript
organizations/{orgId}: {
  name: "Bay Club",

  // Locations (reference data)
  locations: {
    courtside: { name: "Courtside", address: "..." },
    redwoodshores: { name: "Redwood Shores", address: "..." },
    gateway: { name: "SF Gateway", address: "..." }
  },

  // All admins with their scope
  admins: [
    {
      id: "director-a-token",
      name: "Mike Smith",
      email: "mike@bayclub.com",
      scope: "org"                      // Full org access
    },
    {
      id: "director-b-token",
      name: "Sarah Jones",
      email: "sarah@bayclub.com",
      scope: "locations",
      locations: ["courtside", "redwoodshores"]   // Multiple locations
    },
    {
      id: "director-c-token",
      name: "Tom Wilson",
      email: "tom@bayclub.com",
      scope: "locations",
      locations: ["gateway"]            // Single location
    }
  ],

  // Supported sports
  sports: ["tennis", "pickleball", "squash"],

  // Branding
  branding: {
    logo: "https://...",
    primaryColor: "#1a365d",
    appName: "Bay Club Sports"
  },

  // Settings
  settings: {
    allowSelfServeGroups: false,        // Only admins can create groups
    requireApproval: true               // New members need approval
  }
}
```

### Groups Collection (Updated)

```javascript
groups/{groupId}: {
  settings: {
    groupName: "Courtside 4.0 Doubles",
    sportType: "tennis",

    // Organization link (null = independent group)
    organizationId: "bayclub",

    // Location tags (array for multi-location)
    locations: ["courtside"],           // or ["courtside", "redwoodshores"]

    // Attributes
    level: "4.0",                       // NTRP / DUPR
    format: "doubles",                  // singles, doubles, mixed
    type: "social",                     // social, competitive, league, open

    // Existing fields unchanged
    groupPin: "1234",
    adminPin: "5678",
    members: ["Alex", "John", "Mike"],
  },

  metadata: {
    createdAt: 1703123456789,
    createdBy: "device-token",
    shortCode: "CT40"
  },

  checkins: { /* unchanged */ },
  matches: { /* unchanged */ }
}
```

### Admin Index (for fast permission lookups)

```javascript
adminIndex/{deviceToken}: {
  // Org-level admin access
  orgAdmin: ["bayclub"],

  // Location-level admin access (array of locations per org)
  locationAdmin: {
    bayclub: ["courtside", "redwoodshores"]
  },

  // Group-level admin access
  groupAdmin: ["groupId1", "groupId2"]
}
```

---

## Permission Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                    ORG ADMIN                                │
│              (Regional Director)                            │
│         Sees: All locations, all groups                     │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  LOCATION ADMIN                             │
│              (Tennis Director)                              │
│         Sees: Assigned locations (1 or more)                │
│                                                             │
│   Examples:                                                 │
│   • Director A → [Courtside, Redwood Shores]               │
│   • Director B → [Gateway]                                  │
│   • Director C → [Courtside, Gateway, Redwood Shores]      │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   GROUP ADMIN                               │
│                   (Captain)                                 │
│              Sees: Their group only                         │
└─────────────────────────────────────────────────────────────┘
```

### Permission Summary

| Admin Type | `scope` | `locations` | What They See |
|------------|---------|-------------|---------------|
| Org Admin | `"org"` | — | All locations, all groups |
| Multi-Location Admin | `"locations"` | `["courtside", "redwoodshores"]` | Groups at any of their locations |
| Single-Location Admin | `"locations"` | `["gateway"]` | Groups at Gateway only |
| Group Admin | — | — | Their group only |

---

## Permission Logic

```javascript
function getAdminScope(user, orgId) {
  const perms = adminIndex[user.deviceToken];

  if (perms?.orgAdmin?.includes(orgId)) {
    return { level: "org", locations: "all" };
  }

  if (perms?.locationAdmin?.[orgId]?.length > 0) {
    return { level: "location", locations: perms.locationAdmin[orgId] };
  }

  return { level: "none", locations: [] };
}

function getVisibleGroups(user, orgId) {
  const scope = getAdminScope(user, orgId);
  const allGroups = await getGroupsByOrg(orgId);

  if (scope.level === "org") {
    return allGroups;  // See everything
  }

  if (scope.level === "location") {
    // Filter to groups that have ANY overlap with admin's locations
    return allGroups.filter(g =>
      g.settings.locations?.some(loc => scope.locations.includes(loc))
    );
  }

  return [];
}
```

---

## Director Dashboard UI

### Org Admin View

```
┌─────────────────────────────────────────────────────────────┐
│  🏢 Bay Club Sports                              [Logout]   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │ 👥 247      │ │ 🎾 18       │ │ 📅 42       │           │
│  │ Active      │ │ Groups      │ │ Matches     │           │
│  │ Members     │ │             │ │ This Week   │           │
│  └─────────────┘ └─────────────┘ └─────────────┘           │
│                                                             │
│  Location: [All ▼]    Sport: [All ▼]    Level: [All ▼]     │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  GROUPS                                          [+ New]    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎾 Courtside 4.0+ Doubles                           │   │
│  │    📍 Courtside  •  👥 24 members  •  📅 8 matches  │   │
│  │    Level: 4.0+  •  Type: Social                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🟡 Beginner Pickleball                              │   │
│  │    📍 Courtside  •  👥 18 members  •  📅 12 matches │   │
│  │    Level: Beginner  •  Type: Open Play              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 🎾 Bay Area USTA League                             │   │
│  │    📍 Courtside, Redwood Shores  •  👥 32 members   │   │
│  │    Level: 4.0+  •  Type: League                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Location Admin View (Multi-Location)

```
┌─────────────────────────────────────────────────────────────┐
│  🏢 Bay Club Sports                              [Logout]   │
│                                                             │
│  Your locations: Courtside, Redwood Shores                  │
│                                                             │
│  Viewing: [All My Locations ▼]                              │
│           ├─ All My Locations                               │
│           ├─ Courtside only                                 │
│           └─ Redwood Shores only                            │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  (Shows groups at Courtside OR Redwood Shores)              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Group Detail (Director View)

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back                                                     │
│                                                             │
│  🎾 Courtside 4.0+ Doubles                                  │
│  📍 Courtside  •  Level: 4.0+  •  Doubles  •  Social       │
│                                                             │
├──────────────────────┬──────────────────────────────────────┤
│  MEMBERS (24)        │  THIS WEEK                           │
├──────────────────────┼──────────────────────────────────────┤
│                      │                                      │
│  ● Alex (4.0)        │  Tue 12/28  │ 6 checked in          │
│  ● John (4.0)        │  ├ Alex, John, Mike, Steve          │
│  ● Mike (4.0)        │  └ Match: Court 3, 5pm              │
│  ● Steve (4.5)       │                                      │
│  ● Sarah (4.0)       │  Thu 12/30  │ 4 checked in          │
│  ○ Tom (inactive)    │  ├ Alex, Sarah, Lisa, Bob           │
│  ○ Jane (inactive)   │  └ Match: Court 1, 6pm              │
│  ...                 │                                      │
│                      │  Sat 1/1    │ 8 checked in          │
│  ● = active (7 days) │  └ Arranging...                     │
│  ○ = inactive        │                                      │
│                      │                                      │
├──────────────────────┴──────────────────────────────────────┤
│  ENGAGEMENT                                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Matches this month: 32      ▲ 15% vs last month           │
│  Active members: 18/24       (75%)                          │
│  Avg matches/member: 5.2                                    │
│                                                             │
│  ⚠️  6 members haven't played in 30+ days                  │
│     [View] [Send reminder]                                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### New Member Alert Panel

```
┌─────────────────────────────────────────────────────────────┐
│  🆕 NEW MEMBERS NEEDING GROUPS                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ David Chen                         Joined: 2 days ago│   │
│  │ 📍 Courtside  •  🎾 Tennis  •  Level: 4.0           │   │
│  │ Preference: Doubles                                  │   │
│  │                                                      │   │
│  │ Suggested groups:                                    │   │
│  │   • Courtside 4.0+ Doubles (24 members)             │   │
│  │   • Bay Area USTA League (32 members)               │   │
│  │                                                      │   │
│  │ [Invite to Group ▼]  [Send Welcome Message]         │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Current State (What Already Exists)

| Feature | Status | Details |
|---------|--------|---------|
| Time-slot check-ins | ✅ DONE | Optional time ranges with presets (morning/midday/afternoon/evening) + custom times |
| Skill level storage | ✅ DONE | NTRP/DUPR rating stored in member profiles via EditMemberDrawer |
| Multi-sport support | ✅ DONE | Tennis, pickleball with sport-specific terminology and configs |
| Multi-group membership | ✅ DONE | Device token tracks membership across groups |
| Play style preferences | ✅ DONE | Singles/doubles/either with rotation opt-out |
| Match arrangement | ✅ DONE | Admin can organize matches, add booking notes |

---

## Feature Gaps to Fill

### Priority 1: Director Visibility (Quick Wins)

| Feature | Current State | Needed For Bay Club | Effort |
|---------|---------------|---------------------|--------|
| Skill level on check-ins | Stored but not visible | Show "4.0" badge on check-in tiles | Small |
| Member list with ratings | Names only | Show NTRP next to names in directory | Small |

### Priority 2: Organization Model

| Feature | Current State | Needed For Bay Club | Effort |
|---------|---------------|---------------------|--------|
| Organization structure | Flat groups | Orgs → Groups with location tags | Medium |
| Location-based permissions | Admin PIN per group | Org/location admin scope | Medium |
| Director dashboard | Site admin only | Org/location scoped view | Medium |

### Priority 3: Director Tools

| Feature | Current State | Needed For Bay Club | Effort |
|---------|---------------|---------------------|--------|
| Multi-group visibility | Per-group view | Cross-group at location | Medium |
| Engagement metrics | None | Who's active, who's not | Medium |
| New member alerts | None | Notify when someone joins | Small |

### Priority 4: Enterprise Features

| Feature | Current State | Needed For Bay Club | Effort |
|---------|---------------|---------------------|--------|
| White-label branding | Sports Connector brand | Bay Club brand | Small |
| Analytics/reporting | None | Usage stats, trends | Medium |
| Player discovery | Own group only | Cross-group at org level | Large |

---

## Implementation Phases

### Phase 1: Quick Wins (Days)
- Show skill level badges on check-in tiles
- Show ratings in member directory
- Add rating field to check-in drawer (optional)

### Phase 2: Organization Model (1-2 weeks)
- Add `organizations` collection to Firebase
- Add `organizationId`, `locations[]` fields to groups
- Add `adminIndex` for permission lookups
- Basic director dashboard (list groups, filter by location)

### Phase 3: Director Tools (1-2 weeks)
- Location-based filtering in dashboard
- Engagement metrics (active/inactive members)
- Cross-group visibility for directors
- New member alerts

### Phase 4: Enterprise (As Needed)
- White-label branding config
- Analytics dashboard
- Usage tracking / billing

### Phase 5: Integration (Partner with Bay Club)
- Bay Club Connect booking integration
- SSO / member authentication
- API access for Bay Club systems

---

## Migration Path

1. **Add org support** — Create `organizations` collection
2. **Existing groups unchanged** — Groups without `organizationId` work exactly as today
3. **Bay Club groups linked** — Assign Bay Club groups to org, tag with locations
4. **Director accounts created** — Add directors to org admins
5. **Independent groups still work** — No impact to non-org users

---

## What Stays the Same

| Feature | Impact |
|---------|--------|
| Group creation | Add optional org/location fields |
| Check-in flow | Unchanged |
| Match arrangement | Unchanged |
| Sharing (WhatsApp/SMS) | Unchanged |
| Independent groups | Still work (no org = standalone) |
| My Groups navigation | Unchanged |

---

## Group Examples

| Group Name | Locations | Sport | Level | Type |
|------------|-----------|-------|-------|------|
| Courtside 4.0 Doubles | `[courtside]` | tennis | 4.0 | social |
| Bay Area USTA League | `[courtside, redwoodshores]` | tennis | 4.0+ | league |
| Beginner Pickleball | `[courtside]` | pickleball | beginner | social |
| All-Campus Open Play | `[all]` | pickleball | any | open |

---

## Querying Examples

```javascript
// Director dashboard: all Bay Club groups
db.ref('groups')
  .orderByChild('settings/organizationId')
  .equalTo('bayclub')

// Filter by location
groups.filter(g => g.settings.locations.includes('courtside'))

// Filter by sport + level
groups.filter(g =>
  g.settings.sportType === 'tennis' &&
  g.settings.level === '4.0+'
)

// Groups a location admin can see
groups.filter(g =>
  g.settings.locations?.some(loc => adminLocations.includes(loc))
)
```

---

## Key Principles

1. **Groups remain the atomic unit** — All existing functionality stays in groups
2. **Organization is just a layer above** — Links groups for visibility and admin
3. **Flat with tags, not hierarchical** — Groups can span multiple locations
4. **Backward compatible** — Independent groups work unchanged
5. **Permissions flow down** — Org admin > Location admin > Group admin
