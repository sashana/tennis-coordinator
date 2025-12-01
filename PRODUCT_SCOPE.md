# Tennis Coordinator - Product Scope

**Version:** 0.2.0
**Last Updated:** 2025-11-30
**Status:** Active Development

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.2.0 | 2025-11-30 | Updated with implemented features, clarified privacy/transparency principles |
| 0.1.0 | 2024-11-30 | Initial draft - product vision, group archetypes, use cases |

---

## Product Vision

A platform that enables **any tennis group** to self-organize matches with minimal friction, adapting to each group's unique social dynamics and coordination needs.

---

## Group Archetypes

The product serves different types of tennis groups, each with unique characteristics:

| Archetype | Example | Size | Familiarity | Key Needs |
|-----------|---------|------|-------------|-----------|
| **Tight-knit Group** | Tue/Thu Midday Doubles | ~20 | Everyone knows each other | Honor system, minimal friction, primarily doubles |
| **Club Community** | Bay Club 18+ Tennis | 50+ | Mixed familiarity | Partner preferences, skill filtering, privacy |
| **Casual Drop-in** | Weekend Warriors | Variable | Loose connections | Simple coordination, flexible |
| **Competitive League** | USTA Practice Partners | Varies | Skill-focused | Ratings, level matching |

---

## Design Principles

| Principle | Description |
|-----------|-------------|
| **Adaptable** | One platform, configurable per group's needs |
| **Frictionless** | Minimum steps to achieve coordination |
| **Socially Aware** | Transparent where it serves coordination (e.g., who added whom); private where it could cause awkwardness (e.g., partner preferences) |
| **Group-Optimized** | Maximize successful matches for the group |
| **Trust-Scaled** | Security/guardrails scale with group size and familiarity |

---

## Use Cases

### Universal Use Cases (All Groups)

#### UC1: Signal Availability ✅
**As a** player
**I want to** indicate I want to play on a specific date
**So that** others know I'm available and I can be included in match formation

**Status:** Implemented via check-in system with play style, time availability, and rotation preferences

#### UC2: Find Compatible Matches ✅
**As a** player
**I want** the system to help form matches based on availability and compatibility
**So that** we spend less time coordinating and more time playing

**Status:** Implemented via match organization algorithm (doubles, singles, 3-player rotation, standby)

#### UC3: See Who's Playing ✅
**As a** player
**I want to** quickly see who's checked in and how matches are organized
**So that** I can plan my day without scrolling through chat history

**Status:** Implemented with real-time Firebase sync, organized match display

#### UC4: Self-Manage Participation ✅
**As a** player
**I want to** add or remove my check-in easily
**So that** I stay in control of my participation with appropriate guardrails against mistakes

**Status:** Implemented with permission-based removal (own check-ins or ones you added) and confirmation dialogs

#### UC5: Handle Variable Numbers ✅
**As a** group
**We need** the system to gracefully handle odd numbers (3, 5, 7 players)
**So that** everyone gets to play even when we don't have perfect multiples

**Status:** Implemented via 3-player rotation system with opt-in checkbox

#### UC6: Multi-User Check-In ✅
**As a** coordinator
**I want to** check in multiple people (myself and others who asked me)
**So that** I can help coordinate without everyone needing app access

**Status:** Implemented via session user tracking; displays "added by X" for transparency and permission management

---

### Tight-Knit Group Use Cases

#### UC-T1: Minimal Friction Check-In ✅
**As a** member of a trusted group
**I want to** check in with minimal steps
**So that** coordination doesn't feel like a chore

**Status:** Implemented with streamlined UX: collapsible forms, time presets, auto-scroll, remembered preferences

#### UC-T2: Light Guardrails ✅
**As a** member of a trusted group
**I want** gentle confirmations for destructive actions
**So that** accidents are prevented without implying distrust

**Status:** Implemented with confirmation dialogs for removal and reset; admin PIN for destructive group actions

#### UC-T3: Quick Guest Inclusion ✅
**As a** member
**I want to** easily add a guest
**So that** friends can join without admin overhead

**Status:** Implemented via "Add Guest" option in name dropdown

#### UC-T4: Group Notifications ✅
**As a** member
**I want to** easily notify the group when I check in or remove myself
**So that** everyone stays coordinated via existing WhatsApp group

**Status:** Implemented with automatic WhatsApp sharing prompts after check-in/removal; messages auto-formatted

---

### Larger/Mixed-Familiarity Group Use Cases

#### UC-L1: Partner Preferences ⚠️
**As a** player in a larger group
**I want to** specify who I prefer or don't prefer to play with
**So that** I have enjoyable matches without awkward conversations

**Status:** Partial - Singles exclude list implemented; include/prefer and doubles preferences not yet implemented

#### UC-L2: Skill Level Filtering ❌
**As a** player
**I want to** indicate my skill level and find similar-level players
**So that** matches are competitive and fun for everyone

**Status:** Not implemented

#### UC-L3: Player Discovery ❌
**As a** player in a larger group
**I want to** find compatible players I haven't met yet
**So that** I can expand my tennis network

**Status:** Not implemented

#### UC-L4: Privacy Controls ✅
**As a** player
**I want** my preferences to remain private
**So that** I avoid social awkwardness

**Status:** Implemented - Preferences stored per-user and not visible to others; excluded players don't see they're excluded

#### UC-L5: Identity Verification ⚠️
**As a** group admin
**I want** some level of member verification
**So that** the group maintains quality and trust

**Status:** Partial - Group-level PIN authentication; individual member verification not implemented

---

### Administrative Use Cases

#### UC-A1: Member Management ✅
**As a** group admin
**I want to** add/remove members as people join or leave
**So that** the roster stays current

**Status:** Implemented via admin settings - can manage member list and guest management

#### UC-A2: Group Configuration ⚠️
**As a** group admin
**I want to** configure group settings (name, access, defaults)
**So that** the app fits our group's needs

**Status:** Partial - Admin can configure member list and PIN; group name and other settings not yet configurable

#### UC-A3: Create New Group ❌
**As a** site admin
**I want to** create new groups with unique URLs
**So that** different tennis communities can use the platform

**Status:** Not implemented - Currently requires manual setup per group

---

## Open Questions

> Items requiring discussion or decision

1. **Skill Levels**
   - Should this be a core feature for larger groups?
   - Self-reported vs. admin-assigned vs. derived from history?

2. **Multi-Group Membership**
   - Can players belong to multiple groups?
   - Shared profile or separate per group?

3. **Group Discovery**
   - Can players discover and request to join groups?
   - Or invitation-only?

4. **Notifications**
   - Should players get notified when matches form?
   - When spots open up?
   - What channels (push, SMS, email)?

5. **Reliability/Reputation**
   - Track no-shows or last-minute cancellations?
   - Visible to others or admin-only?

6. **Match History**
   - Value in tracking who played with whom?
   - Stats, frequency, variety?

---

## Out of Scope (Current Version)

- Court booking/reservation integration
- Payment handling
- Chat/messaging within the app
- Tournament/ladder organization
- Lesson scheduling

---

## Future Considerations

- Mobile app (native iOS/Android)
- Calendar integration (Google, Apple)
- WhatsApp/iMessage bot integration (sharing is implemented, but not automated bot)
- Court availability integration

---

*This is a living document. Update version number and changelog with each revision.*
