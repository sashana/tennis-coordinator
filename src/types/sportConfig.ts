/**
 * Sport Configuration Types
 *
 * Defines the configuration interface for different racket sports.
 * Each sport variant (tennis, pickleball, etc.) implements this interface.
 */

// PlayStyle is defined here to avoid circular imports
// It's re-exported from index.ts for backwards compatibility
export type PlayStyle = 'singles' | 'doubles' | 'both';

// ============================================
// Sport Identity Types
// ============================================

export type SportId = 'tennis' | 'pickleball' | 'squash' | 'padel' | 'badminton';

// ============================================
// Theme Configuration
// ============================================

export interface ThemeConfig {
  id: string;
  name: string;
  color: string; // Primary color (hex)
  lightBg: string; // Light background for cards
  hoverBg: string; // Hover state background
  logo: string | null; // URL or imported asset, null uses emoji
  emoji: string; // Fallback/decorative emoji
}

// ============================================
// Match Format Configuration
// ============================================

export interface MatchFormatConfig {
  enabled: boolean;
  playerCount: number;
}

export interface MatchFormats {
  doubles: MatchFormatConfig;
  singles: MatchFormatConfig;
}

// ============================================
// Terminology Configuration
// ============================================

export interface SportTerms {
  match: string; // 'match' | 'game'
  court: string; // 'court' | 'field'
  doubles: string; // 'Doubles' | '4s'
  singles: string; // 'Singles' | '1v1'
  player: string; // 'player' | 'paddler'
  doublesForming: string; // 'Doubles Forming' | 'Need 4'
  singlesForming: string; // 'Singles Forming' | 'Need 2'
}

// ============================================
// Feature Flags
// ============================================

export interface SportFeatures {
  rotation: boolean; // 3-player rotation support
  skillRating: string | null; // Rating system name: 'NTRP' | 'DUPR' | null
}

// ============================================
// Main Sport Configuration Interface
// ============================================

export interface SportConfig {
  // Identity
  id: SportId;
  name: string; // Display name: 'Tennis' | 'Pickleball'
  nameLower: string; // Lowercase for sentences: 'tennis' | 'pickleball'

  // Match rules
  matchFormats: MatchFormats;
  defaultPlayStyle: PlayStyle;

  // Terminology
  terms: SportTerms;

  // Theming
  themes: ThemeConfig[];
  defaultTheme: string;
  primaryColor: string; // Main brand color
  sportEmoji: string; // Primary sport emoji (fallback if no icon)
  sportIcon?: string; // Imported SVG for custom icon

  // Branding
  appName: string; // 'Tennis Coordinator' | 'Pickleball Coordinator'
  tagline: string; // 'Less texting. More tennis.'
  domain: string; // 'tennis.sportsconnector.com'

  // Features
  features: SportFeatures;
}

// ============================================
// Helper Types
// ============================================

/**
 * Play style labels - generated from sport config terms
 */
export type PlayStyleLabels = {
  singles: string; // 'Singles Only'
  doubles: string; // 'Doubles Only'
  both: string; // 'Either'
};

/**
 * Get play style labels from sport config
 */
export function getPlayStyleLabels(config: SportConfig): PlayStyleLabels {
  return {
    singles: `${config.terms.singles} Only`,
    doubles: `${config.terms.doubles} Only`,
    both: 'Either',
  };
}
