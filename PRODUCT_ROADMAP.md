# Tennis Coordinator - Product Roadmap

**Version:** 0.1.0
**Last Updated:** 2025-12-09
**Status:** Active Planning

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-12-09 | Initial roadmap created |

---

## Vision

A platform that enables **any tennis community** to self-organize matches with minimal friction, from tight-knit groups to club-wide coordination—and eventually expanding to other racquet sports.

---

## Current State (v2.8)

### What's Working

- **Standalone Groups**: Fully functional check-in, match organization, activity history
- **Tight-knit Group Features**: Guest check-ins, WhatsApp sharing, weather display, match notes
- **Admin Controls**: Member management, PIN protection, activity logs
- **Mobile-First UI**: Responsive design, PWA support, scrollable date selector
- **Notifications**: In-app notification system with muting preferences

### Technical Foundation

- Preact + TypeScript frontend
- Firebase Realtime Database
- Deployed to `tennis.sportsconnector.com`

---

## Roadmap Phases

### Phase 1: Foundation Cleanup (Current)
**Focus:** Technical debt, URL routing, developer experience

| Item | Status | Notes |
|------|--------|-------|
| Clean URL routing (`/g/{slug}`) | Planned | Replace hash-based routing |
| Backwards-compatible redirects | Planned | Support old URLs |
| Remove legacy `index.html` | Planned | Consolidate to Preact app |
| CSS variables for theming | Planned | Infrastructure for future themes |
| Landing page at `/` | Planned | Entry point for new users |

---

### Phase 2: User Accounts
**Focus:** Persistent identity across groups

| Item | Status | Notes |
|------|--------|-------|
| Optional user accounts | Planned | Email/phone based |
| "My Groups" dashboard | Planned | See all groups in one place |
| Cross-group notifications | Planned | Unified notification center |
| Profile settings | Planned | Name, contact, preferences |
| Skill level (self-assessed) | Planned | Tennis: NTRP scale |
| Backwards compatibility | Required | Groups still work without accounts |

---

### Phase 3: Club Community
**Focus:** Tennis Director oversight, multi-group coordination

| Item | Status | Notes |
|------|--------|-------|
| Club entity | Planned | Container for groups + members |
| Tennis Director role | Planned | Club-wide visibility and controls |
| Director dashboard | Planned | Cross-group activity view |
| Club member directory | Planned | With privacy controls |
| Self-organized groups in club | Planned | Member creates, Director approves |
| Director-organized groups | Planned | Less autonomy, more oversight |
| Skill level (Director-assessed) | Planned | Verified by observation |
| Cross-group suggestions | Planned | "Group X needs 1 player, Y is available" |

---

### Phase 4: Discovery
**Focus:** Finding players and groups

| Item | Status | Notes |
|------|--------|-------|
| Public profiles | Planned | Opt-in visibility |
| Location-based search | Planned | "Groups near me" |
| Player discovery | Planned | "Find hitting partners" |
| Group discovery | Planned | "Join a group" |
| Skill-level filtering | Planned | Match by level |

---

### Phase 5: AI-First Experience
**Focus:** Natural language coordination (see `AI_FIRST_VISION.md`)

| Item | Status | Notes |
|------|--------|-------|
| WhatsApp bot integration | Exploration | Check-in via chat |
| Natural language parsing | Exploration | "I can play tomorrow at 2" |
| Proactive suggestions | Exploration | AI suggests optimal matches |
| Smart notifications | Exploration | AI decides when to nudge |

---

### Phase 6: Multi-Sport Expansion
**Focus:** Pickleball and beyond

| Item | Status | Notes |
|------|--------|-------|
| Sport-agnostic core | Planned | Shared user/club/group logic |
| `pickleball.sportsconnector.com` | Future | Separate subdomain |
| Sport-specific match rules | Future | Pickleball scoring, DUPR ratings |
| Sport-specific themes | Future | PPA Tour, MLP events |

---

## Fun Features (Lower Priority)

| Feature | Phase | Notes |
|---------|-------|-------|
| Tournament color themes | Any | Auto-switch for major events (AO, RG, Wimbledon, USO) |
| Dark mode | Any | User preference |
| Match history stats | Post-Phase 2 | Who played with whom |
| Reliability scores | Post-Phase 3 | Track no-shows |
| Calendar integration | Post-Phase 2 | Google/Apple calendar sync |

---

## Out of Scope (For Now)

- Court booking/reservation integration
- Payment handling
- In-app messaging/chat
- Tournament/ladder organization
- Lesson scheduling
- Native mobile apps (PWA sufficient for now)

---

## Success Metrics

| Metric | Current | Phase 2 Target | Phase 3 Target |
|--------|---------|----------------|----------------|
| Active groups | ~5 | 20 | 50+ |
| Weekly check-ins | ~50 | 200 | 500+ |
| User accounts | 0 | 100 | 300+ |
| Clubs | 0 | 0 | 5+ |

---

## Dependencies & Risks

### Technical Dependencies
- Firebase scaling (current plan sufficient for Phase 1-3)
- WhatsApp Business API access (for Phase 5)
- USTA/UTR API access (for verified ratings, optional)

### Risks
| Risk | Mitigation |
|------|------------|
| User adoption of accounts | Make accounts optional, show clear value |
| Club Director engagement | Start with 1-2 pilot clubs |
| Multi-sport complexity | Keep core simple, sport-specific only where needed |

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-12-09 | Start with self-assessed skill levels | Verified ratings require API integration, defer complexity |
| 2025-12-09 | Groups can exist without clubs | Preserve current model, don't force structure |
| 2025-12-09 | User accounts optional | Minimize friction for existing groups |

---

## Related Documents

- `PRODUCT_SCOPE.md` - Use cases and requirements
- `CLUB_ARCHITECTURE.md` - Technical architecture for club model
- `AI_FIRST_VISION.md` - Future AI-driven experience
- `UI_UX_IMPROVEMENTS.md` - Ongoing UI enhancements

---

*This is a living document. Update version and changelog with each revision.*
