/**
 * Hub Sport Configuration
 *
 * Special configuration for the Sports Connector hub landing page.
 * This is not a real sport - it's a portal to all sport-specific sites.
 */

import type { SportConfig } from '@/types/sportConfig';

export const hub: SportConfig = {
  // Identity
  id: 'hub',
  name: 'Sports Connector',
  nameLower: 'sports',

  // Match rules (not used for hub, but required by interface)
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'both',

  // Terminology (not used for hub)
  terms: {
    match: 'match',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },

  // Theming - Indigo/purple for neutral, not sport-specific
  themes: [
    {
      id: 'default',
      name: 'Default',
      color: '#6366f1',
      lightBg: '#EEF2FF',
      hoverBg: '#E0E7FF',
      logo: null,
      emoji: '🏅',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#6366f1',
  sportEmoji: '🏅',

  // Branding
  appName: 'Sports Connector',
  tagline: 'Less texting. More playing.',
  domain: 'www.sportsconnector.com',

  // Features
  features: {
    rotation: false,
    skillRating: null,
  },
};

export default hub;
