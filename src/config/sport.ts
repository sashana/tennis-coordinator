/**
 * Sport Configuration Loader
 *
 * Loads the appropriate sport configuration based on:
 * 1. Subdomain (e.g., pickleball.localhost -> pickleball)
 * 2. VITE_SPORT environment variable
 * 3. Default to tennis
 */

import type { SportConfig, SportId, ThemeConfig } from '@/types/sportConfig';
import { tennis } from './sports/tennis';
import { pickleball } from './sports/pickleball';
import { hub } from './sports/hub';

// Map of all available sport configs
const sportConfigs: Record<SportId, SportConfig> = {
  tennis,
  pickleball,
  hub,
  // Future sports will be added here:
  // squash,
  // padel,
  // badminton,
} as Record<SportId, SportConfig>;

// Map subdomains to sport IDs
const subdomainToSport: Record<string, SportId> = {
  tennis: 'tennis',
  pickleball: 'pickleball',
  www: 'hub',
  // Add more as needed
};

/**
 * Detect sport from subdomain
 * e.g., pickleball.localhost:3000 -> 'pickleball'
 *       tennis.sportsconnector.com -> 'tennis'
 */
function detectSportFromSubdomain(): SportId | null {
  if (typeof window === 'undefined') return null;

  const hostname = window.location.hostname;

  // Extract first part of hostname (subdomain)
  // Handles: pickleball.localhost, tennis.sportsconnector.com, etc.
  const parts = hostname.split('.');
  if (parts.length >= 2) {
    const subdomain = parts[0].toLowerCase();
    if (subdomain in subdomainToSport) {
      return subdomainToSport[subdomain];
    }
  }

  return null;
}

// Determine sport ID: subdomain > env var > default
function getSportId(): SportId {
  // 1. Try subdomain detection (runtime)
  const subdomainSport = detectSportFromSubdomain();
  if (subdomainSport) {
    return subdomainSport;
  }

  // 2. Try environment variable (build-time)
  const envSport = import.meta.env.VITE_SPORT as SportId;
  if (envSport && envSport in sportConfigs) {
    return envSport;
  }

  // 3. Default to tennis
  return 'tennis';
}

const sportId = getSportId();

// Validate and load sport config
function loadSportConfig(): SportConfig {
  const config = sportConfigs[sportId];

  if (!config) {
    console.warn(`Unknown sport "${sportId}", falling back to tennis`);
    return tennis;
  }

  return config;
}

// Export the current sport configuration
export const sport: SportConfig = loadSportConfig();

// Re-export commonly used values for convenience
export const {
  id: sportId_,
  name: sportName,
  nameLower: sportNameLower,
  matchFormats,
  terms,
  themes,
  defaultTheme,
  primaryColor,
  sportEmoji,
  appName,
  tagline,
  features,
} = sport;

// Helper to get player count for a match type
export function getPlayerCount(matchType: 'doubles' | 'singles'): number {
  return sport.matchFormats[matchType].playerCount;
}

// Helper to check if a match format is enabled
export function isMatchFormatEnabled(matchType: 'doubles' | 'singles'): boolean {
  return sport.matchFormats[matchType].enabled;
}

// Helper to get a theme by ID
export function getTheme(themeId: string): ThemeConfig | undefined {
  return sport.themes.find((t) => t.id === themeId);
}

// Helper to get the default theme
export function getDefaultTheme(): ThemeConfig {
  return getTheme(sport.defaultTheme) || sport.themes[0];
}

// Export the sport ID constant
export { sportId };
