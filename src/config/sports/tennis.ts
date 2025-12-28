/**
 * Tennis Sport Configuration
 *
 * Reference implementation for sport configuration.
 * Contains all tennis-specific values extracted from the codebase.
 */

import type { SportConfig } from '@/types/sportConfig';

// Import local logo assets
// Note: These imports work with Vite's asset handling
import wimbledonLogo from '../../assets/logos/wimbledon.png';
import usOpenLogo from '../../assets/logos/usopen.png';
import tennisIcon from '../../assets/icons/tennis.svg';

export const tennis: SportConfig = {
  // Identity
  id: 'tennis',
  name: 'Tennis',
  nameLower: 'tennis',

  // Match rules
  matchFormats: {
    doubles: { enabled: true, playerCount: 4 },
    singles: { enabled: true, playerCount: 2 },
  },
  defaultPlayStyle: 'both',

  // Terminology
  terms: {
    match: 'match',
    court: 'court',
    doubles: 'Doubles',
    singles: 'Singles',
    player: 'player',
    doublesForming: 'Doubles Forming',
    singlesForming: 'Singles Forming',
  },

  // Theming - Grand Slam tournaments
  themes: [
    {
      id: 'default',
      name: 'Classic',
      color: '#2C6E49',
      lightBg: '#E8F5E9',
      hoverBg: '#C8E6C9',
      logo: null,
      emoji: '🎾',
    },
    {
      id: 'wimbledon',
      name: 'Wimbledon',
      color: '#1B5E20',
      lightBg: '#E8F5E9',
      hoverBg: '#C8E6C9',
      logo: wimbledonLogo,
      emoji: '🏆',
    },
    {
      id: 'roland-garros',
      name: 'Roland-Garros',
      color: '#cc4e0e',
      lightBg: '#FBE9E7',
      hoverBg: '#FFCCBC',
      logo: 'https://images.prismic.io/fft-rg-site%2F95765448-c7fa-428b-b565-8368dba90b17_logo.svg',
      emoji: '🗼',
    },
    {
      id: 'australian-open',
      name: 'Australian Open',
      color: '#0277BD',
      lightBg: '#E1F5FE',
      hoverBg: '#B3E5FC',
      logo: 'https://ausopen.com/sites/default/files/styles/medium/public/ao_blue_1.png?itok=dcy08jHH',
      emoji: '🦘',
    },
    {
      id: 'us-open',
      name: 'US Open',
      color: '#0D47A1',
      lightBg: '#E3F2FD',
      hoverBg: '#BBDEFB',
      logo: usOpenLogo,
      emoji: '🗽',
    },
  ],
  defaultTheme: 'default',
  primaryColor: '#2C6E49',
  sportEmoji: '🎾',
  sportIcon: tennisIcon,

  // Branding
  appName: 'Tennis Coordinator',
  tagline: 'Less texting. More tennis.',
  domain: 'tennis.sportsconnector.com',

  // Features
  features: {
    rotation: true,
    skillRating: 'NTRP',
  },
};

export default tennis;
