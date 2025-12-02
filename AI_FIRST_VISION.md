# Tennis Coordinator - AI First Vision

**Version:** 0.1.0
**Last Updated:** 2025-12-01
**Status:** Exploration

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 0.1.0 | 2025-12-01 | Initial vision document |

---

## Overview

A reimagining of Tennis Coordinator with AI at the center—shifting from form-based interactions to natural conversation while maintaining our core design principles.

---

## Core Philosophy

### From Forms to Conversation

**Current Approach**: Players navigate UI, fill forms, select options
**AI-First Approach**: Players express intent naturally, AI handles the rest

The interface becomes a conversation, not an application.

---

## Design Principles (Preserved)

| Principle | AI-First Implementation |
|-----------|------------------------|
| **Frictionless** | Say what you want vs. fill forms |
| **Adaptable** | AI adjusts to each group's communication style and norms |
| **Socially Aware** | Private preference handling, discreet conflict avoidance |
| **Group-Optimized** | AI suggests swaps/changes to maximize successful matches |
| **Trust-Scaled** | AI confirms more in new/large groups, assumes more in tight-knit |

---

## Key Capabilities

### 1. Natural Language Check-In

Players check in using natural language instead of forms:

**Simple check-in:**
```
Player: "I can play tomorrow after 2"

AI: ✓ Checked you in for Tuesday, Dec 3
    Play style: Either (your usual)
    Time: 2:00 PM onwards

    3 others are checked in. You'll have doubles!
```

**Multiple actions:**
```
Player: "Put me down for Thursday, doubles only, and add my friend Mike"

AI: ✓ Checked in Alex (Doubles) and Mike (guest) for Thursday
    4 players now—doubles is set!
```

**Removing:**
```
Player: "Actually I can't make it tomorrow"

AI: ✓ Removed you from Tuesday
    Now 3 players—they'll do rotation unless someone else joins.
    Want me to notify the group?
```

---

### 2. Smart Match Optimization

AI goes beyond first-come, first-served when beneficial:

```
AI: "5 players checked in for tomorrow. I can form:

    Option A: 1 doubles match + 1 player waiting
    Option B: 1 doubles + 1 singles (if Bob can start at 3pm instead of 2:30)

    Should I ask Bob if 3pm works?"
```

AI considers:
- Time window overlaps
- Player preferences (learned over time)
- Historical patterns
- Fairness (who waited last time)

---

### 3. Proactive Coordination

AI monitors and nudges when helpful:

**Recruitment:**
```
AI → Alex: "Tomorrow's looking short—only 2 players for Tuesday.
           You usually play Tuesdays. Interested?"
```

**Weather alerts:**
```
AI → Group: "Heads up: Rain likely tomorrow 2-4pm.
            Want to move to morning or reschedule?"
```

**Openings:**
```
AI → Waitlist: "Spot opened for Thursday doubles—Bob had to cancel.
               Carol, you're next on the list. Want in?"
```

---

### 4. Preference Learning

AI learns patterns without explicit configuration:

**Temporal patterns:**
- "Alex usually plays Tue/Thu afternoons"
- "Weekend games typically start around 9am"

**Play style patterns:**
- "Bob prefers doubles, rarely does singles"
- "Carol always opts into rotation"

**Social patterns:**
- "When Dave and Eve both check in, they usually want to partner"
- "Frank prefers not to play with certain players" (kept private)

**Communication patterns:**
- "This group confirms via WhatsApp"
- "Alex prefers brief confirmations, Bob likes details"

---

### 5. Discreet Conflict Handling

AI handles sensitive preferences gracefully:

```
Player (private): "I'd rather not play with [X] today"

AI (private): "Got it. I'll arrange matches so you're not paired.
              This stays between us."
```

No public visibility. No awkward explanations. AI just makes it work.

---

### 6. Context-Aware Responses

AI adapts based on situation:

**Tight-knit group (high trust):**
```
Player: "tomorrow 2pm"
AI: "✓ Done. You're the 4th—doubles is set!"
```

**Larger group (more confirmation):**
```
Player: "tomorrow 2pm"
AI: "Checking you in for Thursday Dec 5, 2:00 PM, at Bay Club.
     Play style: Either. Correct?"
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│              Conversation Interfaces                │
│                                                     │
│   WhatsApp    SMS    Web Chat    Voice Assistant    │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                  AI Agent Layer                     │
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐  │
│  │   Intent    │ │   Context   │ │   Response    │  │
│  │   Parser    │ │   Manager   │ │   Generator   │  │
│  └─────────────┘ └─────────────┘ └───────────────┘  │
│                                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌───────────────┐  │
│  │ Preference  │ │    Match    │ │   Proactive   │  │
│  │  Learner    │ │  Optimizer  │ │   Scheduler   │  │
│  └─────────────┘ └─────────────┘ └───────────────┘  │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│               Core Logic Layer                      │
│                                                     │
│  - Match formation rules                            │
│  - Time overlap detection                           │
│  - Group management                                 │
│  - Activity logging                                 │
└───────────────────────┬─────────────────────────────┘
                        │
┌───────────────────────▼─────────────────────────────┐
│                  Data Layer                         │
│                                                     │
│  - Check-ins & matches                              │
│  - Explicit preferences                             │
│  - Learned patterns                                 │
│  - Conversation history                             │
│  - Activity log                                     │
└─────────────────────────────────────────────────────┘
```

---

## Channel Strategy

| Channel | Role | Why |
|---------|------|-----|
| **WhatsApp** | Primary interface | Where groups already coordinate |
| **SMS** | Fallback | For non-WhatsApp users |
| **Web** | Dashboard | Visual overview, admin, history |
| **Voice** | Convenience | "Hey Siri, check me in for tennis" |

### WhatsApp Integration Options

1. **Group Bot**: AI joins the group, responds to mentions
   - Pro: Everyone sees coordination
   - Con: Can be noisy

2. **Private Bot**: Each player DMs the bot
   - Pro: Private, less noise
   - Con: Less group visibility

3. **Hybrid**: Private for check-ins, group for summaries
   - Pro: Best of both
   - Con: More complex

---

## User Journeys

### Journey 1: Quick Check-In

```
Alex → AI: "in for tomorrow"
AI → Alex: "✓ Checked in for Tue Dec 3, 2pm onwards, Either.
           3 others in—doubles ready!"
```

### Journey 2: Coordinating for a Friend

```
Alex → AI: "add bob for thursday, he wants singles only"
AI → Alex: "✓ Bob checked in for Thu Dec 5, Singles only.
           Added as guest of Alex."
```

### Journey 3: Changing Plans

```
Alex → AI: "move me to morning instead"
AI → Alex: "✓ Changed your time to morning (before 12pm).
           Note: Only 1 other morning player—may need more for doubles."
```

### Journey 4: AI-Initiated Optimization

```
AI → Alex: "Quick question: Could you start at 2:30 instead of 2:00?
           This would let me form 2 doubles matches instead of
           1 doubles + 2 waiting."

Alex → AI: "sure"
AI → Alex: "✓ Updated. Now we have 2 full doubles matches!"
AI → Group: "Tuesday update: 2 doubles matches confirmed for 2:30pm"
```

### Journey 5: Handling Sensitive Preferences

```
Alex → AI: "don't put me with frank today"
AI → Alex: "Understood. I'll arrange matches accordingly.
           (This preference is private and temporary—just for today)"
```

---

## Trust & Permissions

### AI Action Levels

| Level | AI Behavior | Example |
|-------|-------------|---------|
| **Inform** | AI tells you what happened | "Bob just checked in" |
| **Suggest** | AI recommends, you decide | "Should I ask Bob to shift times?" |
| **Act + Confirm** | AI acts, tells you after | "✓ Checked you in (your usual settings)" |
| **Act Silently** | AI acts, no notification | Routine match organization |

### Trust Scaling

**New group / New player:**
- More confirmations
- Explicit about assumptions
- Asks before acting

**Established group / Regular player:**
- Assumes based on patterns
- Brief confirmations
- Acts proactively

---

## Privacy Framework

### What AI Learns

| Data | Visibility | Use |
|------|------------|-----|
| Check-in patterns | Private to player | Suggest times, predict availability |
| Play style preferences | Private to player | Default settings |
| Partner preferences | Strictly private | Match arrangement only |
| Communication style | Private to player | Response formatting |

### Privacy Principles

1. **Learned preferences are private** — Only AI sees patterns
2. **Exclusions are invisible** — No one knows who excluded whom
3. **Patterns can be reset** — Player can clear learned data
4. **Transparency on request** — "What do you know about me?"

---

## Open Questions

### Product Questions

1. **Proactive Boundaries**: When should AI nudge vs. stay silent?
2. **Group Personality**: Should AI's tone adapt per group?
3. **Conflict Priority**: When preferences conflict, how to resolve?
4. **Learning Speed**: How quickly should AI assume patterns?

### Technical Questions

1. **Channel Sync**: How to keep WhatsApp, SMS, and Web in sync?
2. **Conversation Context**: How much history to retain?
3. **Failure Handling**: What if AI misunderstands?
4. **Multi-Group**: One AI identity or separate per group?

### Social Questions

1. **Trust Building**: How does AI earn trust with new users?
2. **Override Control**: Can players override AI decisions?
3. **Transparency**: How much should AI explain its reasoning?
4. **Group Dynamics**: How to handle group politics gracefully?

---

## Migration Path

### Phase 1: Bot Alongside UI
- WhatsApp bot for check-ins
- Current web UI remains primary
- Activity syncs between both

### Phase 2: Learning Mode
- AI observes patterns
- Suggests optimizations
- Players can accept/reject

### Phase 3: Proactive AI
- AI initiates coordination
- Sends reminders and suggestions
- Handles routine requests autonomously

### Phase 4: Conversation Primary
- Web becomes dashboard/admin only
- All player interaction via conversation
- AI manages full coordination lifecycle

---

## Success Metrics

| Metric | Current | AI-First Target |
|--------|---------|-----------------|
| Steps to check in | 5-7 taps | 1 message |
| Time to coordinate | Minutes | Seconds |
| Successful matches formed | Manual | Optimized by AI |
| Player satisfaction | — | Higher (less friction) |
| Coordination messages in group chat | Many | Fewer (AI handles) |

---

## Next Steps

1. **Validate with users**: Would they use a WhatsApp bot?
2. **Prototype intent parsing**: Test natural language understanding
3. **Design conversation flows**: Map out key journeys
4. **Evaluate platforms**: WhatsApp Business API, Twilio, etc.

---

*This is a vision document for exploration. Implementation details TBD.*
