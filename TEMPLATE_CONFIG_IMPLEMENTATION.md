# Multi-Archetype Template System - Implementation Guide

**Version:** 1.0.0
**Created:** 2025-11-30
**Status:** Design/Planning Phase

---

## Overview

This document outlines the implementation plan for enabling Tennis Coordinator to serve multiple group archetypes (tight-knit, club community, casual drop-in, competitive league) through a template-based configuration system.

**Current State:** App is hardcoded for tight-knit groups (~20 players, everyone knows each other)
**Goal:** Support multiple archetypes with configurable features and admin control

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Configuration Schema](#configuration-schema)
3. [Template Definitions](#template-definitions)
4. [Implementation Phases](#implementation-phases)
5. [Code Examples](#code-examples)
6. [Migration Strategy](#migration-strategy)
7. [Testing Strategy](#testing-strategy)
8. [Time Estimates](#time-estimates)

---

## Architecture Overview

### Core Concept

Each group has a `config` object that controls:
- Which features are enabled/disabled
- Privacy settings
- Match formation priorities
- Access control rules

Groups can either:
1. **Use a template** - Pre-configured settings for common archetypes
2. **Customize** - Admin can override any setting

### Key Design Principles

- **Backward Compatible** - Existing groups continue working unchanged
- **Template-Based** - Easy to create new groups with sensible defaults
- **Flexible** - Admins can customize any template
- **Feature-Gated** - All features check config before rendering/executing

---

## Configuration Schema

### Firebase Structure

```javascript
{
  "groups": {
    "ttmd": {
      "name": "Tuesday/Thursday Midday Doubles",
      "config": {
        "template": "tight-knit",  // Template ID (or "custom")
        "version": "1.0",           // Config schema version
        "lastModified": "2025-11-30T12:00:00Z",

        "features": {
          "partnerPreferences": false,
          "skillLevels": false,
          "guestManagement": true,
          "rotation3Player": true,
          "whatsappSharing": true,
          "weatherForecast": true,
          "excludeLists": false      // Singles/doubles exclude lists
        },

        "privacy": {
          "showAddedBy": true,
          "hideExcludedFrom": true,  // Don't show who excluded you
          "showSkillLevels": false,
          "publicCheckIns": true     // Anyone can see check-ins
        },

        "matchFormation": {
          "prioritizeDoubles": true,
          "respectSkillLevels": false,
          "respectPartnerPrefs": false,
          "allowMixedSkills": true
        },

        "access": {
          "allowGuestCheckIns": true,
          "requireVerification": false,
          "adminApprovalForMembers": false,
          "maxGuestsPerDay": 5
        },

        "limits": {
          "maxMembers": 30,
          "maxActiveCheckIns": 20
        }
      },
      "members": [...],
      "checkins": {...}
    }
  }
}
```

---

## Template Definitions

### Template: Tight-Knit Group

**Target:** Small groups where everyone knows each other (~20 players)

```javascript
{
  id: "tight-knit",
  name: "Tight-Knit Group",
  description: "Small group where everyone knows each other (~20 players)",
  icon: "👥",

  features: {
    partnerPreferences: false,
    skillLevels: false,
    guestManagement: true,
    rotation3Player: true,
    whatsappSharing: true,
    weatherForecast: true,
    excludeLists: false
  },

  privacy: {
    showAddedBy: true,
    hideExcludedFrom: true,
    showSkillLevels: false,
    publicCheckIns: true
  },

  matchFormation: {
    prioritizeDoubles: true,
    respectSkillLevels: false,
    respectPartnerPrefs: false,
    allowMixedSkills: true
  },

  access: {
    allowGuestCheckIns: true,
    requireVerification: false,
    adminApprovalForMembers: false,
    maxGuestsPerDay: 5
  },

  limits: {
    maxMembers: 30,
    maxActiveCheckIns: 20
  }
}
```

### Template: Club Community

**Target:** Larger club with mixed familiarity (50+ players)

```javascript
{
  id: "club",
  name: "Club Community",
  description: "Larger club with mixed familiarity (50+ players)",
  icon: "🏢",

  features: {
    partnerPreferences: true,   // Enable partner include/exclude
    skillLevels: true,           // Enable skill level tracking
    guestManagement: true,
    rotation3Player: true,
    whatsappSharing: false,      // Too large for single group chat
    weatherForecast: true,
    excludeLists: true
  },

  privacy: {
    showAddedBy: true,
    hideExcludedFrom: true,      // Privacy: don't show who excluded you
    showSkillLevels: true,       // Show skill levels publicly
    publicCheckIns: true
  },

  matchFormation: {
    prioritizeDoubles: false,
    respectSkillLevels: true,    // Match by skill level
    respectPartnerPrefs: true,   // Honor preferences
    allowMixedSkills: false      // Prefer similar skill levels
  },

  access: {
    allowGuestCheckIns: true,
    requireVerification: true,   // Verify member identity
    adminApprovalForMembers: true,
    maxGuestsPerDay: 3
  },

  limits: {
    maxMembers: 100,
    maxActiveCheckIns: 40
  }
}
```

### Template: Casual Drop-In

**Target:** Flexible group with variable attendance

```javascript
{
  id: "casual",
  name: "Casual Drop-In",
  description: "Flexible group with variable attendance",
  icon: "🎾",

  features: {
    partnerPreferences: false,
    skillLevels: false,
    guestManagement: true,
    rotation3Player: true,
    whatsappSharing: true,
    weatherForecast: true,
    excludeLists: false
  },

  privacy: {
    showAddedBy: true,
    hideExcludedFrom: true,
    showSkillLevels: false,
    publicCheckIns: true
  },

  matchFormation: {
    prioritizeDoubles: false,    // Mix of singles/doubles
    respectSkillLevels: false,
    respectPartnerPrefs: false,
    allowMixedSkills: true
  },

  access: {
    allowGuestCheckIns: true,
    requireVerification: false,  // Open/easy access
    adminApprovalForMembers: false,
    maxGuestsPerDay: 10          // Very flexible
  },

  limits: {
    maxMembers: 50,
    maxActiveCheckIns: 30
  }
}
```

### Template: Competitive League

**Target:** Skill-focused practice partners

```javascript
{
  id: "competitive",
  name: "Competitive League",
  description: "Skill-focused practice partners",
  icon: "🏆",

  features: {
    partnerPreferences: true,
    skillLevels: true,           // Required for competitive
    guestManagement: false,      // Members only
    rotation3Player: false,      // Prefer full matches
    whatsappSharing: false,
    weatherForecast: true,
    excludeLists: true
  },

  privacy: {
    showAddedBy: true,
    hideExcludedFrom: true,
    showSkillLevels: true,
    publicCheckIns: true
  },

  matchFormation: {
    prioritizeDoubles: false,
    respectSkillLevels: true,    // Primary matching factor
    respectPartnerPrefs: true,
    allowMixedSkills: false
  },

  access: {
    allowGuestCheckIns: false,   // No guests
    requireVerification: true,
    adminApprovalForMembers: true,
    maxGuestsPerDay: 0
  },

  limits: {
    maxMembers: 50,
    maxActiveCheckIns: 20
  }
}
```

---

## Implementation Phases

### Phase 1: Configuration Infrastructure

**Goal:** Add configuration support without changing existing behavior

#### Tasks

1. **Firebase Schema Update** (30-60 mins)
   - Add `config` object to existing groups
   - Set TTMD to use "tight-knit" template
   - Test that existing functionality unchanged

2. **Template Definitions** (1-2 hours)
   - Create `templates.js` or embed in HTML
   - Define all 4 templates
   - Add template lookup function

3. **Configuration Loader** (2-3 hours)
   - Load config when group loads
   - Cache in `currentGroupConfig` variable
   - Handle missing config (use defaults)
   - Handle malformed config gracefully

4. **Feature Flag Integration** (6-8 hours)
   - Update check-in form to check `config.features.*`
   - Update match organization algorithm
   - Update permission logic
   - Update UI elements throughout
   - Add helper functions: `isFeatureEnabled()`, `getConfigValue()`

5. **Testing** (2-3 hours)
   - Test with config present/missing
   - Test with each template
   - Test feature on/off combinations
   - Verify backward compatibility

**Phase 1 Total: 12-17 hours**

#### Key Files to Modify

- `index.html` - Add config loading, feature checks throughout
- Firebase structure - Add `config` to groups

#### Success Criteria

- [ ] Config loads from Firebase
- [ ] Existing TTMD group works unchanged
- [ ] Can toggle features via manual config changes
- [ ] No regressions in existing functionality

---

### Phase 2: Admin Configuration UI

**Goal:** Allow admins to view and modify group configuration

#### Tasks

1. **Settings Tab UI Structure** (2 hours)
   - Add "Group Settings" tab to admin modal
   - Create sections: Template, Features, Privacy, Match Formation, Access
   - Basic layout and styling

2. **Template Selector** (1-2 hours)
   - Dropdown showing all templates
   - Display template description and icon
   - Show current template
   - "Custom" option when settings modified

3. **Feature Toggle UI** (2-3 hours)
   - Checkboxes for each feature
   - Organized into logical groups
   - Help text/tooltips explaining each option
   - Disable options if dependent features off

4. **Save/Load Configuration** (3-4 hours)
   - Load current config from Firebase on open
   - Validate configuration before saving
   - Save to Firebase
   - Handle errors with user feedback
   - Confirmation dialog for major changes
   - Reload app state after config change

5. **Template Switching Logic** (1-2 hours)
   - When template selected, load template defaults
   - Show preview of what will change
   - Warn if switching from custom config
   - Mark as "custom" when manual changes made

6. **Testing** (2-3 hours)
   - Test all template switches
   - Test feature toggle combinations
   - Test save/load
   - Test validation and error cases
   - Test config reload without page refresh

**Phase 2 Total: 11-14 hours**

#### Admin UI Mockup

```
┌─────────────────────────────────────────────────────────┐
│ Admin Panel                                    [Close X]│
├─────────────────────────────────────────────────────────┤
│ [Members] [Settings] [Reset]                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔧 Group Settings                                       │
│                                                         │
│ Template                                                │
│ ┌───────────────────────────────────────────┐          │
│ │ Tight-Knit Group ▼                        │          │
│ └───────────────────────────────────────────┘          │
│ 👥 Small group where everyone knows each other         │
│                                                         │
│ ─────────────── OR ───────────────                     │
│                                                         │
│ ☑ Use Custom Configuration                             │
│                                                         │
│ Features                                                │
│ ☑ Guest Management                                     │
│   Allow members to check in guests                     │
│ ☑ 3-Player Rotation                                    │
│   Enable rotation when 3, 5, 7 players                 │
│ ☑ WhatsApp Sharing                                     │
│   Auto-prompt to share check-ins to WhatsApp           │
│ ☐ Partner Preferences                                  │
│   Allow players to set include/exclude lists           │
│ ☐ Skill Level Matching                                 │
│   Track and match players by skill level               │
│ ☐ Exclude Lists                                        │
│   Allow players to exclude specific opponents          │
│                                                         │
│ Privacy                                                 │
│ ☑ Show "Added By"                                      │
│   Display who added each check-in                      │
│ ☑ Hide Exclusions                                      │
│   Don't show players who excluded you                  │
│                                                         │
│ Match Formation                                         │
│ ☑ Prioritize Doubles                                   │
│   Form doubles matches before singles                  │
│ ☐ Respect Skill Levels                                 │
│   Match players with similar skill                     │
│ ☐ Respect Partner Preferences                          │
│   Honor include/exclude lists                          │
│                                                         │
│ Access Control                                          │
│ ☑ Allow Guest Check-ins                                │
│ ☐ Require Member Verification                          │
│ ☐ Admin Approval for New Members                       │
│                                                         │
│ Max Members: [30    ]  Max Guests/Day: [5    ]         │
│                                                         │
│                     [Preview Changes] [Save Settings]  │
└─────────────────────────────────────────────────────────┘
```

#### Success Criteria

- [ ] Admin can view current configuration
- [ ] Admin can switch templates
- [ ] Admin can toggle individual features
- [ ] Changes save to Firebase
- [ ] App reloads config without page refresh
- [ ] Validation prevents invalid configurations

---

### Phase 3: Conditional Features (Future)

**Goal:** Make all features fully respect configuration

#### Tasks

1. **Check-in Form Adaptation** (2-3 hours)
   - Conditionally show skill level selector
   - Conditionally show partner preference button
   - Conditionally show rotation checkbox
   - Adapt form layout based on enabled features

2. **Match Formation Algorithm** (3-4 hours)
   - Respect `respectSkillLevels` setting
   - Respect `respectPartnerPrefs` setting
   - Respect `prioritizeDoubles` setting
   - Add skill matching logic (if enabled)
   - Add partner preference logic (if enabled)

3. **Permission System** (2-3 hours)
   - Check `requireVerification` for check-ins
   - Check `allowGuestCheckIns` before showing guest option
   - Check `adminApprovalForMembers` for new members
   - Enforce guest limits

4. **UI Conditional Rendering** (3-4 hours)
   - Hide/show features throughout UI
   - Update tooltips and help text
   - Adapt layout for different configs
   - Test all combinations

5. **Testing** (3-4 hours)
   - Test each template end-to-end
   - Test feature combinations
   - Test edge cases
   - User acceptance testing

**Phase 3 Total: 13-18 hours**

---

### Phase 4: Group Creation Wizard (Future)

**Goal:** Allow creation of new groups with template selection

#### Tasks

1. **Site Admin Concept** (2-3 hours)
   - Define site admin role
   - Site admin authentication
   - Access control for group creation

2. **Group Creation UI** (3-4 hours)
   - Create group wizard/form
   - Group name, ID generation
   - Template selection
   - Initial admin setup

3. **Firebase Group Creation** (2-3 hours)
   - Create new group document
   - Initialize with template config
   - Create admin credentials
   - Set up initial data structure

4. **Testing** (2-3 hours)
   - Test group creation flow
   - Test with each template
   - Test validation and errors

**Phase 4 Total: 9-13 hours**

---

## Code Examples

### Configuration Loader

```javascript
// Global config cache
let currentGroupConfig = null;

// Template definitions
const GROUP_TEMPLATES = {
  "tight-knit": {
    name: "Tight-Knit Group",
    description: "Small group where everyone knows each other (~20 players)",
    icon: "👥",
    features: {
      partnerPreferences: false,
      skillLevels: false,
      guestManagement: true,
      rotation3Player: true,
      whatsappSharing: true,
      weatherForecast: true,
      excludeLists: false
    },
    // ... rest of config
  },
  "club": { /* ... */ },
  "casual": { /* ... */ },
  "competitive": { /* ... */ }
};

// Load configuration for a group
async function loadGroupConfig(groupId) {
  try {
    const configRef = ref(db, `groups/${groupId}/config`);
    const snapshot = await get(configRef);

    if (snapshot.exists()) {
      const config = snapshot.val();

      // If using a template, merge with template defaults
      if (config.template && GROUP_TEMPLATES[config.template]) {
        currentGroupConfig = mergeWithTemplate(config);
      } else {
        currentGroupConfig = config;
      }
    } else {
      // No config found, use tight-knit as default
      console.log('No config found, using tight-knit defaults');
      currentGroupConfig = GROUP_TEMPLATES["tight-knit"];
    }

    return currentGroupConfig;
  } catch (error) {
    console.error('Error loading group config:', error);
    // Fallback to tight-knit template
    currentGroupConfig = GROUP_TEMPLATES["tight-knit"];
    return currentGroupConfig;
  }
}

// Merge config with template (allows overrides)
function mergeWithTemplate(config) {
  const template = GROUP_TEMPLATES[config.template];
  if (!template) return config;

  return {
    template: config.template,
    version: config.version || "1.0",
    lastModified: config.lastModified,
    features: { ...template.features, ...config.features },
    privacy: { ...template.privacy, ...config.privacy },
    matchFormation: { ...template.matchFormation, ...config.matchFormation },
    access: { ...template.access, ...config.access },
    limits: { ...template.limits, ...config.limits }
  };
}

// Helper: Check if a feature is enabled
function isFeatureEnabled(featureName) {
  return currentGroupConfig?.features?.[featureName] ?? false;
}

// Helper: Get config value with fallback
function getConfigValue(path, defaultValue) {
  const parts = path.split('.');
  let value = currentGroupConfig;

  for (const part of parts) {
    if (value && typeof value === 'object') {
      value = value[part];
    } else {
      return defaultValue;
    }
  }

  return value !== undefined ? value : defaultValue;
}
```

### Feature-Gated UI Rendering

```javascript
// BEFORE: Hardcoded
function renderCheckInForm() {
  return `
    <div class="form-group">
      <label>Play Style:</label>
      <select name="playStyle">
        <option value="either">Either</option>
        <option value="singles">Singles Only</option>
        <option value="doubles">Doubles Only</option>
      </select>
    </div>

    <div class="form-group">
      <label>Time:</label>
      <select name="time">
        <option value="">Flexible</option>
        <option value="9am">9:00 AM</option>
        <!-- ... -->
      </select>
    </div>

    <div class="form-group">
      <input type="checkbox" name="rotation3">
      <label>Open to 3-player rotation</label>
    </div>
  `;
}

// AFTER: Config-driven
function renderCheckInForm() {
  let html = '';

  // Play style (always shown)
  html += `
    <div class="form-group">
      <label>Play Style:</label>
      <select name="playStyle">
        <option value="either">Either</option>
        <option value="singles">Singles Only</option>
        <option value="doubles">Doubles Only</option>
      </select>
    </div>
  `;

  // Skill level (conditional)
  if (isFeatureEnabled('skillLevels')) {
    html += `
      <div class="form-group">
        <label>Skill Level:</label>
        <select name="skillLevel">
          <option value="">Not specified</option>
          <option value="3.0-3.5">3.0-3.5</option>
          <option value="4.0-4.5">4.0-4.5</option>
          <option value="5.0+">5.0+</option>
        </select>
      </div>
    `;
  }

  // Time (always shown)
  html += `
    <div class="form-group">
      <label>Time:</label>
      <select name="time">
        <option value="">Flexible</option>
        <option value="9am">9:00 AM</option>
        <!-- ... -->
      </select>
    </div>
  `;

  // 3-player rotation (conditional)
  if (isFeatureEnabled('rotation3Player')) {
    html += `
      <div class="form-group">
        <input type="checkbox" name="rotation3" id="rotation3">
        <label for="rotation3">Open to 3-player rotation</label>
      </div>
    `;
  }

  // Partner preferences (conditional)
  if (isFeatureEnabled('partnerPreferences')) {
    html += `
      <div class="form-group">
        <button type="button" onclick="showPartnerPreferences()" class="btn-secondary">
          ⚙️ Partner Preferences
        </button>
      </div>
    `;
  }

  return html;
}
```

### Match Formation with Config

```javascript
// BEFORE: Hardcoded
function organizeMatches(checkins) {
  // Always prioritize doubles
  const doublesMatches = formDoublesMatches(checkins);
  const singlesMatches = formSinglesMatches(remainingPlayers);
  // ...
}

// AFTER: Config-driven
function organizeMatches(checkins) {
  const config = currentGroupConfig.matchFormation;

  let matches = [];
  let remaining = [...checkins];

  // Filter by skill level if enabled
  if (config.respectSkillLevels && isFeatureEnabled('skillLevels')) {
    remaining = groupBySkillLevel(remaining);
  }

  // Apply partner preferences if enabled
  if (config.respectPartnerPrefs && isFeatureEnabled('partnerPreferences')) {
    remaining = filterByPreferences(remaining);
  }

  // Form matches based on priority
  if (config.prioritizeDoubles) {
    matches.push(...formDoublesMatches(remaining));
    remaining = getRemainingPlayers(remaining, matches);
    matches.push(...formSinglesMatches(remaining));
  } else {
    // Mix of singles and doubles based on preferences
    matches.push(...formMixedMatches(remaining));
  }

  // Handle 3-player rotation if enabled
  if (isFeatureEnabled('rotation3Player')) {
    matches.push(...form3PlayerRotation(remaining));
  }

  return matches;
}
```

### Admin Settings UI - Save Configuration

```javascript
async function saveGroupConfiguration() {
  try {
    const newConfig = {
      template: document.getElementById('template-select').value,
      version: "1.0",
      lastModified: new Date().toISOString(),
      features: {
        partnerPreferences: document.getElementById('feature-partner-prefs').checked,
        skillLevels: document.getElementById('feature-skill-levels').checked,
        guestManagement: document.getElementById('feature-guests').checked,
        rotation3Player: document.getElementById('feature-rotation').checked,
        whatsappSharing: document.getElementById('feature-whatsapp').checked,
        weatherForecast: document.getElementById('feature-weather').checked,
        excludeLists: document.getElementById('feature-exclude').checked
      },
      privacy: {
        showAddedBy: document.getElementById('privacy-show-added-by').checked,
        hideExcludedFrom: document.getElementById('privacy-hide-excluded').checked,
        showSkillLevels: document.getElementById('privacy-show-skill').checked,
        publicCheckIns: document.getElementById('privacy-public').checked
      },
      matchFormation: {
        prioritizeDoubles: document.getElementById('match-prioritize-doubles').checked,
        respectSkillLevels: document.getElementById('match-skill-levels').checked,
        respectPartnerPrefs: document.getElementById('match-partner-prefs').checked,
        allowMixedSkills: document.getElementById('match-mixed-skills').checked
      },
      access: {
        allowGuestCheckIns: document.getElementById('access-guests').checked,
        requireVerification: document.getElementById('access-verification').checked,
        adminApprovalForMembers: document.getElementById('access-approval').checked,
        maxGuestsPerDay: parseInt(document.getElementById('max-guests').value) || 5
      },
      limits: {
        maxMembers: parseInt(document.getElementById('max-members').value) || 30,
        maxActiveCheckIns: parseInt(document.getElementById('max-checkins').value) || 20
      }
    };

    // Validate configuration
    if (!validateConfig(newConfig)) {
      showToast('Invalid configuration', 'error');
      return;
    }

    // Confirm major changes
    if (hasSignificantChanges(currentGroupConfig, newConfig)) {
      if (!confirm('These changes will affect how matches are organized. Continue?')) {
        return;
      }
    }

    // Save to Firebase
    const configRef = ref(db, `groups/${currentGroupId}/config`);
    await set(configRef, newConfig);

    showToast('Configuration saved successfully', 'success');

    // Reload config and refresh UI
    await loadGroupConfig(currentGroupId);
    refreshAllUI();

  } catch (error) {
    console.error('Error saving configuration:', error);
    showToast('Failed to save configuration', 'error');
  }
}

function validateConfig(config) {
  // Check dependencies
  if (config.matchFormation.respectSkillLevels && !config.features.skillLevels) {
    alert('Cannot respect skill levels without enabling skill level tracking');
    return false;
  }

  if (config.matchFormation.respectPartnerPrefs && !config.features.partnerPreferences) {
    alert('Cannot respect partner preferences without enabling partner preferences');
    return false;
  }

  // Check limits
  if (config.limits.maxMembers < 1 || config.limits.maxMembers > 500) {
    alert('Max members must be between 1 and 500');
    return false;
  }

  return true;
}

function hasSignificantChanges(oldConfig, newConfig) {
  if (!oldConfig) return false;

  // Check if match formation logic changed
  const matchFormationChanged =
    oldConfig.matchFormation?.prioritizeDoubles !== newConfig.matchFormation.prioritizeDoubles ||
    oldConfig.matchFormation?.respectSkillLevels !== newConfig.matchFormation.respectSkillLevels ||
    oldConfig.matchFormation?.respectPartnerPrefs !== newConfig.matchFormation.respectPartnerPrefs;

  return matchFormationChanged;
}
```

---

## Migration Strategy

### Migrating Existing Groups

**Step 1: Add default config to TTMD**
```javascript
// Run once to migrate existing group
async function migrateExistingGroup() {
  const configRef = ref(db, 'groups/ttmd/config');

  const defaultConfig = {
    template: "tight-knit",
    version: "1.0",
    lastModified: new Date().toISOString(),
    ...GROUP_TEMPLATES["tight-knit"]
  };

  await set(configRef, defaultConfig);
  console.log('Migration complete');
}
```

**Step 2: Verify backward compatibility**
- Load TTMD group
- Verify all existing features work
- Verify check-ins load correctly
- Verify match organization unchanged

**Step 3: Test configuration changes**
- Toggle features on/off
- Verify UI updates correctly
- Verify no data loss

### Rollback Plan

If issues arise:
1. Remove `config` object from Firebase
2. Code will fall back to tight-knit defaults
3. All existing functionality preserved

---

## Testing Strategy

### Unit Tests

- `loadGroupConfig()` with valid/invalid/missing data
- `isFeatureEnabled()` with various configs
- `getConfigValue()` with nested paths
- `mergeWithTemplate()` with overrides
- Config validation logic

### Integration Tests

- Load group with config
- Switch between templates
- Toggle features and verify UI
- Save config and reload
- Verify match formation with different configs

### User Acceptance Testing

**Test Cases:**

1. **Tight-Knit Group**
   - [ ] Guest check-in works
   - [ ] 3-player rotation appears
   - [ ] WhatsApp sharing prompts
   - [ ] No skill level fields
   - [ ] No partner preferences

2. **Club Community**
   - [ ] Skill level selector appears
   - [ ] Partner preferences available
   - [ ] Exclude lists work
   - [ ] Match formation respects preferences
   - [ ] Privacy settings honored

3. **Template Switching**
   - [ ] Can switch from tight-knit to club
   - [ ] UI updates to show new features
   - [ ] Existing check-ins preserved
   - [ ] Match organization changes appropriately

4. **Custom Configuration**
   - [ ] Can enable individual features
   - [ ] Can save custom config
   - [ ] Custom config persists
   - [ ] Validation prevents invalid combos

### Edge Cases

- [ ] Missing config (falls back to defaults)
- [ ] Malformed config (handles gracefully)
- [ ] Config with unknown fields (ignores)
- [ ] Template doesn't exist (falls back)
- [ ] Partial config (merges with template)
- [ ] Config version mismatch (handles migration)

---

## Time Estimates

### Summary

| Phase | Optimistic | Realistic | Conservative |
|-------|-----------|-----------|--------------|
| Phase 1: Infrastructure | 12 hours | 17 hours | 24 hours |
| Phase 2: Admin UI | 11 hours | 14 hours | 20 hours |
| Phase 3: Conditional Features | 13 hours | 18 hours | 25 hours |
| Phase 4: Group Creation | 9 hours | 13 hours | 18 hours |
| **Total** | **45 hours** | **62 hours** | **87 hours** |

### Calendar Time (Phases 1 + 2 only)

**Focused full-time work (8 hrs/day):**
- Optimistic: 3-4 days
- Realistic: 5-6 days
- Conservative: 7-10 days

**Part-time (2-4 hrs/day):**
- Realistic: 1.5-2 weeks
- Conservative: 2-3 weeks

**Spare time (5-10 hrs/week):**
- Realistic: 3-4 weeks
- Conservative: 4-6 weeks

### Quick Win Alternative

**Minimal viable version (1-2 days):**
- Add config object with 3-4 key flags
- Simple admin toggle switches
- No full template system initially
- Proves concept, can expand later

---

## Future Enhancements

### Beyond Phase 4

1. **Template Marketplace**
   - Community-contributed templates
   - Share configurations between groups
   - Rate and review templates

2. **A/B Testing**
   - Test different configurations
   - Analytics on match success
   - Optimize settings automatically

3. **Smart Recommendations**
   - AI suggests optimal config based on group behavior
   - "Other groups like yours use..."
   - Auto-adjust based on usage patterns

4. **Import/Export**
   - Export configuration as JSON
   - Import from another group
   - Version control for configs

5. **Feature Usage Analytics**
   - Track which features are used
   - Identify unused features
   - Suggest optimizations

---

## Open Questions

1. **Should templates be stored in Firebase or hardcoded?**
   - Hardcoded: Easier to maintain, version control
   - Firebase: Admins can create custom templates, more flexible

2. **How to handle config schema changes over time?**
   - Version field in config
   - Migration scripts
   - Backward compatibility strategy

3. **Should config changes take effect immediately or require reload?**
   - Immediate: Better UX, more complex
   - Reload: Simpler, might confuse users mid-session

4. **How to preview config changes before applying?**
   - Show diff of what will change
   - Temporary preview mode
   - Sandbox environment

5. **Should there be config history/audit log?**
   - Track who changed what when
   - Ability to rollback
   - Compliance/debugging

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-11-30 | Use template-based system | Balances flexibility with ease of use |
| 2025-11-30 | Store config in Firebase per-group | Allows different groups different configs |
| 2025-11-30 | Start with 4 templates | Covers main archetypes from PRODUCT_SCOPE.md |
| 2025-11-30 | Feature flags vs separate apps | Feature flags allow single codebase |

---

## References

- [PRODUCT_SCOPE.md](./PRODUCT_SCOPE.md) - Product vision and use cases
- [Firebase Realtime Database Docs](https://firebase.google.com/docs/database)

---

*This is a living document. Update as implementation progresses and decisions are made.*
