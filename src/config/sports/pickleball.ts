/**
 * Pickleball Sport Configuration
 *
 * Configuration for pickleball - the fastest growing racket sport.
 * Similar to tennis with same player counts (2 singles, 4 doubles).
 */

import type { SportConfig } from '@/types/sportConfig';

// Import pickleball icon
import pickleballIcon from '../../assets/icons/pickleball.svg';

export const pickleball: SportConfig = {
  // Identity
  id: 'pickleball',
  name: 'Pickleball',
  nameLower: 'pickleball',

  // Match rules - same as tennis
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'both',

  // Terminology
  terms: {
    match: 'game',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },

  // Theming - Pickleball tournament themes
  themes: [
    {
      id: 'default',
      name: 'Classic',
      color: '#2E7D32', // Green
      lightBg: '#E8F5E9',
      hoverBg: '#C8E6C9',
      logo: null,
      emoji: '🟡', // Yellow circle represents the pickleball
    },
    {
      id: 'championship',
      name: 'Championship',
      color: '#FFC107', // Pickleball yellow
      lightBg: '#FFF8E1',
      hoverBg: '#FFECB3',
      logo: null,
      emoji: '🏆',
    },
    {
      id: 'sunset',
      name: 'Sunset',
      color: '#FF5722', // Orange
      lightBg: '#FBE9E7',
      hoverBg: '#FFCCBC',
      logo: null,
      emoji: '🌅',
    },
    {
      id: 'ocean',
      name: 'Ocean',
      color: '#0288D1', // Blue
      lightBg: '#E1F5FE',
      hoverBg: '#B3E5FC',
      logo: null,
      emoji: '🌊',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#2E7D32',
  sportEmoji: '🟡', // Yellow circle represents the pickleball (no pickleball emoji exists)
  sportIcon: pickleballIcon, // Custom pickleball SVG

  // Branding
  appName: 'Pickleball Coordinator',
  tagline: 'Less texting. More pickleball.',
  domain: 'pickleball.sportsconnector.com',

  // Features
  features: {
    rotation: true, // 3-player rotation works same as tennis
    skillRating: 'DUPR', // Dynamic Universal Pickleball Rating
  },
};

export default pickleball;
