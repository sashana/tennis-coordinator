import { render } from 'preact';
import { App } from './components/App';
import './styles/app.css';
import { sport } from './config/sport';

// Extract group from URL (query param or path)
function getGroupFromUrl(): string | null {
  // First check query parameter
  const params = new URLSearchParams(window.location.search);
  const groupParam = params.get('group');
  if (groupParam) {
    return groupParam;
  }

  // Then check URL path (e.g., /ttmd)
  const path = window.location.pathname;
  const pathParts = path
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .filter(Boolean);
  if (pathParts.length > 0 && pathParts[0] !== 'index.html' && pathParts[0] !== 'app.html') {
    return pathParts[0];
  }

  return null;
}

// Group name mapping for PWA display names
const GROUP_DISPLAY_NAMES: Record<string, string> = {
  ttmd: 'Midday Tennis',
  // Add more groups as needed
};

// Update document head with sport-specific branding
function updateSportBranding() {
  // Update document title
  document.title = sport.appName;

  // Update theme-color meta tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', sport.primaryColor);
  }

  // Update apple-mobile-web-app-title
  const appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (appleTitleMeta) {
    appleTitleMeta.setAttribute('content', sport.name);
  }
}

// Update PWA manifest with current group URL for "Add to Home Screen"
function updateManifestForGroup() {
  const group = getGroupFromUrl();
  const displayName = group ? (GROUP_DISPLAY_NAMES[group] || sport.name) : sport.appName;

  // Create dynamic manifest with sport and group-specific settings
  const manifest = {
    name: displayName,
    short_name: displayName.length > 12 ? displayName.split(' ')[0] : displayName,
    description: `${sport.name} match coordination and check-in system`,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: sport.primaryColor,
    orientation: 'portrait-primary',
    start_url: group ? `/${group}` : '/',
    scope: '/',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };

  // Convert manifest to data URL
  const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
  const manifestURL = URL.createObjectURL(manifestBlob);

  // Update manifest link
  const manifestLink = document.getElementById('manifestLink') as HTMLLinkElement;
  if (manifestLink) {
    manifestLink.href = manifestURL;
  }

  // Update apple-mobile-web-app-title for iOS "Add to Home Screen"
  let appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (appleTitleMeta) {
    appleTitleMeta.setAttribute('content', displayName);
  } else {
    appleTitleMeta = document.createElement('meta');
    appleTitleMeta.setAttribute('name', 'apple-mobile-web-app-title');
    appleTitleMeta.setAttribute('content', displayName);
    document.head.appendChild(appleTitleMeta);
  }

  // Update document title
  document.title = displayName;
}

// Initialize sport branding and manifest
updateSportBranding();
updateManifestForGroup();

render(<App />, document.getElementById('app')!);
