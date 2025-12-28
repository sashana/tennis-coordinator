/**
 * Group Types and Archetypes
 *
 * Defines the different types of groups that can be created.
 * Currently only 'tight-knit' is implemented; others are planned for future.
 */

import { sport } from '../config/sport';

// ============================================
// Archetype Types
// ============================================

/**
 * Group archetype identifier
 * - tight-knit: Small group of friends who play regularly (~20 members)
 * - casual-dropin: Open groups where anyone can join (future)
 * - club-community: Larger club-based groups with admin control (future)
 * - location-flexible: Groups that coordinate across locations (future)
 * - competitive: Skill-matched competitive play (future)
 */
export type GroupArchetype =
  | 'tight-knit'
  | 'casual-dropin'
  | 'club-community'
  | 'location-flexible'
  | 'competitive';

/**
 * Configuration for each archetype (used in UI)
 */
export interface GroupArchetypeConfig {
  id: GroupArchetype;
  name: string;
  description: string;
  features: string[];
  namePlaceholder: string;
  available: boolean; // false = "Coming Soon"
}

/**
 * Get all archetype configurations (sport-specific)
 */
function getGroupArchetypes(): GroupArchetypeConfig[] {
  const sportName = sport.name;
  const sportLower = sport.nameLower;
  const ratingSystem = sport.features.skillRating || 'skill';

  return [
    {
      id: 'tight-knit',
      name: 'Tight-knit Group',
      description:
        `Your ${sportLower} crew, organized. Invite friends, coordinate ${sport.terms.match}es, and share via WhatsApp, text, or in-app alerts. Any format: ${sport.terms.doubles.toLowerCase()}, ${sport.terms.singles.toLowerCase()}, or mixed.`,
      features: [
        'Invite-only, PIN-protected',
        'Weather-aware scheduling',
        'Frictionless self-organization',
        'Auto-balanced match making',
        'One-click share to WhatsApp/SMS',
      ],
      namePlaceholder: `e.g., Tuesday ${sportName} Gang`,
      available: true,
    },
    {
      id: 'casual-dropin',
      name: 'Casual Drop-in',
      description: `Open coordination for ${sport.terms.player}s who want to find ${sport.terms.match}es easily.`,
      features: [
        'Open registration',
        `${sport.terms.singles} or ${sport.terms.doubles.toLowerCase()}`,
        'Flexible commitment',
        'Welcome newcomers',
      ],
      namePlaceholder: `e.g., Central Park Morning ${sportName}`,
      available: false, // Coming soon
    },
    {
      id: 'club-community',
      name: 'Club Community',
      description: `For larger ${sportLower} clubs with varied skill levels and preferences.`,
      features: [
        'Admin-managed membership',
        'Skill level filtering',
        'Partner preferences',
        'Privacy controls',
      ],
      namePlaceholder: `e.g., Bay Club 18+ ${sportName}`,
      available: false, // Coming soon
    },
    {
      id: 'location-flexible',
      name: 'Location Flexible',
      description: 'For groups that play across different locations and need to coordinate.',
      features: [
        'Multiple venue options',
        'Location voting',
        'Travel distance awareness',
        'Flexible scheduling',
      ],
      namePlaceholder: `e.g., Bay Area ${sportName} Friends`,
      available: false, // Coming soon
    },
    {
      id: 'competitive',
      name: 'Competitive League',
      description: `Skill-focused play with ${ratingSystem} ratings and level matching.`,
      features: [
        `${ratingSystem}-based matching`,
        'Skill level requirements',
        'Competitive play focus',
        'Match history tracking',
      ],
      namePlaceholder: `e.g., ${ratingSystem} Practice Partners`,
      available: false, // Coming soon
    },
  ];
}

// ============================================
// Creator Types
// ============================================

/**
 * Information about the group creator (for site admin contact)
 */
export interface GroupCreator {
  name: string;
  email: string;
  phone: string;
  ipAddress?: string;
  userAgent?: string;
}

// ============================================
// Metadata Types
// ============================================

/**
 * Group metadata stored at groups/{groupId}/metadata
 */
export interface GroupMetadata {
  archetype: GroupArchetype;
  createdAt: number;
  createdBy: string; // deviceToken
  shortCode: string;
  creator: GroupCreator;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Get archetype config by ID
 */
export function getArchetypeConfig(id: GroupArchetype): GroupArchetypeConfig | undefined {
  return getGroupArchetypes().find((a) => a.id === id);
}

/**
 * Get all available archetypes (for group creation)
 */
export function getAvailableArchetypes(): GroupArchetypeConfig[] {
  return getGroupArchetypes().filter((a) => a.available);
}

/**
 * Get all archetypes (including "Coming Soon")
 */
export function getAllArchetypes(): GroupArchetypeConfig[] {
  return getGroupArchetypes();
}
