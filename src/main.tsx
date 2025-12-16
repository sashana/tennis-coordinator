import { render } from 'preact';
import { App } from './components/App';
import './styles/app.css';

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

// Update PWA manifest with current group URL for "Add to Home Screen"
function updateManifestForGroup() {
  const group = getGroupFromUrl();

  if (group) {
    // Get display name for the group (fallback to "Tennis" if not mapped)
    const groupDisplayName = GROUP_DISPLAY_NAMES[group] || 'Tennis';

    // Create dynamic manifest with group-specific start_url and name
    const manifest = {
      name: groupDisplayName,
      short_name: groupDisplayName.length > 12 ? groupDisplayName.split(' ')[0] : groupDisplayName,
      description: 'Tennis match coordination and check-in system',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#4CAF50',
      orientation: 'portrait-primary',
      start_url: `/${group}`,
      scope: '/',
      icons: [
        {
          src: '/assets/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/assets/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/assets/apple-touch-icon.png',
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

    // Also update apple-mobile-web-app-title meta tag for iOS
    // iOS reads this when user taps "Add to Home Screen"
    let appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (appleTitleMeta) {
      appleTitleMeta.setAttribute('content', groupDisplayName);
    } else {
      // Create the meta tag if it doesn't exist
      appleTitleMeta = document.createElement('meta');
      appleTitleMeta.setAttribute('name', 'apple-mobile-web-app-title');
      appleTitleMeta.setAttribute('content', groupDisplayName);
      document.head.appendChild(appleTitleMeta);
    }

    // Also update document title for Safari's Add to Home Screen fallback
    document.title = groupDisplayName;
  }
}

updateManifestForGroup();

render(<App />, document.getElementById('app')!);
