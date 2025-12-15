import { render } from 'preact';
import { App } from './components/App';
import './styles/app.css';

// Update PWA manifest with current group URL for "Add to Home Screen"
function updateManifestForGroup() {
  const params = new URLSearchParams(window.location.search);
  const group = params.get('group');

  if (group) {
    // Create dynamic manifest with group-specific start_url
    const manifest = {
      name: "Tennis Coordinator",
      short_name: "Tennis",
      description: "Tennis match coordination and check-in system",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#4CAF50",
      orientation: "portrait-primary",
      start_url: `/?group=${group}`,
      scope: "/",
      icons: [
        {
          src: "/dist/assets/icon-192.png",
          sizes: "128x192",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/dist/assets/icon-512.png",
          sizes: "341x512",
          type: "image/png",
          purpose: "any"
        },
        {
          src: "/dist/assets/apple-touch-icon.png",
          sizes: "120x180",
          type: "image/png",
          purpose: "any"
        }
      ]
    };

    // Convert manifest to data URL
    const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(manifestBlob);

    // Update manifest link
    const manifestLink = document.getElementById('manifestLink') as HTMLLinkElement;
    if (manifestLink) {
      manifestLink.href = manifestURL;
    }
  }
}

updateManifestForGroup();

render(<App />, document.getElementById('app')!);
