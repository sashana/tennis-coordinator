/**
 * Group Type Card Component
 *
 * Reusable card for selecting a group archetype during group creation.
 * Supports enabled (selectable), disabled (coming soon), and selected states.
 */

import type { GroupArchetypeConfig } from '../../types/groupTypes';

interface GroupTypeCardProps {
  config: GroupArchetypeConfig;
  selected: boolean;
  onSelect: () => void;
}

export function GroupTypeCard({ config, selected, onSelect }: GroupTypeCardProps) {
  const isDisabled = !config.available;

  return (
    <button
      type="button"
      class={`group-type-card ${selected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
      onClick={isDisabled ? undefined : onSelect}
      disabled={isDisabled}
    >
      {/* Coming Soon Badge */}
      {isDisabled && <span class="coming-soon-badge">Coming Soon</span>}

      {/* Icon */}
      <div class="card-icon">{getArchetypeIcon(config.id)}</div>

      {/* Title */}
      <h3 class="card-title">{config.name}</h3>

      {/* Description */}
      <p class="card-description">{config.description}</p>

      {/* Features */}
      <ul class="card-features">
        {config.features.map((feature, idx) => (
          <li key={idx}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      {/* Selected indicator */}
      {selected && !isDisabled && (
        <div class="selected-indicator">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
          </svg>
        </div>
      )}

      <style>{`
        .group-type-card {
          position: relative;
          width: 100%;
          padding: 20px;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          font-family: inherit;
        }

        .group-type-card:hover:not(.disabled) {
          border-color: var(--color-primary-light, #81C784);
          background: #fafffe;
        }

        .group-type-card.selected {
          border-color: var(--color-primary, #2C6E49);
          background: #e8f5e9;
          box-shadow: 0 0 0 3px rgba(44, 110, 73, 0.15);
        }

        .group-type-card.disabled {
          opacity: 0.6;
          cursor: not-allowed;
          background: #f5f5f5;
        }

        .coming-soon-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #9e9e9e;
          color: white;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-primary-light, #E8F5E9);
          border-radius: 12px;
          color: var(--color-primary, #2C6E49);
        }

        .group-type-card.disabled .card-icon {
          background: #e0e0e0;
          color: #9e9e9e;
        }

        .card-title {
          margin: 0 0 8px 0;
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .group-type-card.disabled .card-title {
          color: #666;
        }

        .card-description {
          margin: 0 0 16px 0;
          font-size: 14px;
          color: #666;
          line-height: 1.4;
        }

        .card-features {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .card-features li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #555;
          margin-bottom: 6px;
        }

        .card-features li svg {
          color: var(--color-primary, #2C6E49);
          flex-shrink: 0;
        }

        .group-type-card.disabled .card-features li svg {
          color: #9e9e9e;
        }

        .selected-indicator {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 28px;
          height: 28px;
          background: var(--color-primary, #2C6E49);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </button>
  );
}

/**
 * Get icon SVG for each archetype
 */
function getArchetypeIcon(archetype: string): preact.JSX.Element {
  switch (archetype) {
    case 'tight-knit':
      // Group of people icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      );
    case 'casual-dropin':
      // Open door / plus icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      );
    case 'club-community':
      // Building / club icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
        </svg>
      );
    case 'location-flexible':
      // Location / map icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
      );
    case 'competitive':
      // Trophy / competitive icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
        </svg>
      );
    default:
      // Default tennis ball icon
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default GroupTypeCard;
