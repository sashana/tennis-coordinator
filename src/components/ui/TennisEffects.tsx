import { groupSettings } from '../../hooks/useFirebase';

/**
 * Tennis-themed UI components for empty states and loading
 * All components respect the current theme (Grand Slam tournaments)
 */

// Get theme-appropriate court color
function getCourtColor(): string {
  const theme = groupSettings.value?.theme;
  switch (theme) {
    case 'roland-garros':
      return '#D2691E'; // Clay/terracotta
    case 'australian-open':
      return '#1565C0'; // Hard court blue
    case 'us-open':
      return '#0D47A1'; // US Open blue
    case 'wimbledon':
    default:
      return '#2E7D32'; // Grass green
  }
}

function getThemeName(): string {
  const theme = groupSettings.value?.theme;
  switch (theme) {
    case 'roland-garros':
      return 'Roland-Garros';
    case 'australian-open':
      return 'Australian Open';
    case 'us-open':
      return 'US Open';
    case 'wimbledon':
      return 'Wimbledon';
    default:
      return 'Classic';
  }
}

/**
 * Empty court illustration with ball resting against net
 * Shows when no check-ins exist for a date
 */
export function TennisEmptyState({
  message = "No check-ins yet",
  subtext = "Be the first to check in!"
}: {
  message?: string;
  subtext?: string;
}) {
  const courtColor = getCourtColor();
  const lineColor = 'rgba(255, 255, 255, 0.9)';

  return (
    <div style={{
      textAlign: 'center',
      padding: 'var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)',
      color: 'var(--color-text-secondary, #666)',
    }}>
      {/* Mini tennis court illustration */}
      <div style={{
        width: '120px',
        height: '80px',
        margin: '0 auto var(--spacing-2xl, 16px)',
        position: 'relative',
        background: courtColor,
        borderRadius: 'var(--radius-lg, 8px)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))',
      }}>
        {/* Court lines */}
        {/* Center service line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '20%',
          bottom: '20%',
          width: '2px',
          background: lineColor,
          transform: 'translateX(-50%)',
        }} />
        {/* Net (center horizontal) */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '50%',
          height: '3px',
          background: lineColor,
          transform: 'translateY(-50%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
        }} />
        {/* Top service line */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: '20%',
          height: '2px',
          background: lineColor,
        }} />
        {/* Bottom service line */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          bottom: '20%',
          height: '2px',
          background: lineColor,
        }} />
        {/* Left sideline */}
        <div style={{
          position: 'absolute',
          left: '10%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: lineColor,
        }} />
        {/* Right sideline */}
        <div style={{
          position: 'absolute',
          right: '10%',
          top: '0',
          bottom: '0',
          width: '2px',
          background: lineColor,
        }} />

        {/* Tennis ball resting at net */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c8e600 0%, #9acd32 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(0,0,0,0.1)',
          animation: 'ballPulse 2s ease-in-out infinite',
        }}>
          {/* Ball curve line */}
          <div style={{
            position: 'absolute',
            top: '3px',
            left: '2px',
            right: '2px',
            height: '8px',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '50%',
            borderBottom: 'none',
          }} />
        </div>
      </div>

      {/* Message */}
      <p style={{
        fontSize: 'var(--font-size-lg, 16px)',
        fontWeight: '600',
        color: 'var(--color-text-primary, #333)',
        margin: '0 0 var(--spacing-sm, 6px) 0',
      }}>
        {message}
      </p>
      <p style={{
        fontSize: 'var(--font-size-sm, 13px)',
        color: 'var(--color-text-muted, #888)',
        margin: 0,
      }}>
        {subtext}
      </p>
    </div>
  );
}

/**
 * Bouncing tennis ball loading animation
 */
export function BouncingBallLoader({
  text = "Loading...",
  size = 'medium'
}: {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  const sizes = {
    small: { ball: 20, container: 40 },
    medium: { ball: 32, container: 60 },
    large: { ball: 48, container: 90 },
  };

  const { ball, container } = sizes[size];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--spacing-4xl, 24px)',
    }}>
      {/* Ball container with bounce animation */}
      <div style={{
        height: `${container}px`,
        display: 'flex',
        alignItems: 'flex-end',
        marginBottom: 'var(--spacing-lg, 12px)',
      }}>
        <div style={{
          width: `${ball}px`,
          height: `${ball}px`,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #c8e600 0%, #9acd32 100%)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3), inset -3px -3px 6px rgba(0,0,0,0.1)',
          animation: 'tennisBounce 0.6s ease-in-out infinite',
          position: 'relative',
        }}>
          {/* Ball curve lines */}
          <div style={{
            position: 'absolute',
            top: `${ball * 0.15}px`,
            left: `${ball * 0.1}px`,
            right: `${ball * 0.1}px`,
            height: `${ball * 0.5}px`,
            border: `${Math.max(1, ball * 0.06)}px solid rgba(255,255,255,0.6)`,
            borderRadius: '50%',
            borderBottom: 'none',
          }} />
        </div>
      </div>

      {/* Shadow under ball */}
      <div style={{
        width: `${ball * 0.8}px`,
        height: `${ball * 0.15}px`,
        background: 'rgba(0,0,0,0.2)',
        borderRadius: '50%',
        marginTop: `-${ball * 0.1}px`,
        animation: 'ballShadow 0.6s ease-in-out infinite',
      }} />

      {/* Loading text */}
      {text && (
        <p style={{
          fontSize: 'var(--font-size-sm, 13px)',
          color: 'var(--color-text-muted, #888)',
          marginTop: 'var(--spacing-lg, 12px)',
        }}>
          {text}
        </p>
      )}
    </div>
  );
}

/**
 * Full-screen loading overlay with tennis ball
 */
export function TennisLoadingScreen({ text = "Loading..." }: { text?: string }) {
  const themeName = getThemeName();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--color-bg-page, #f5f5f5)',
    }}>
      <BouncingBallLoader text={text} size="large" />
      {themeName !== 'Classic' && (
        <p style={{
          fontSize: 'var(--font-size-xs, 11px)',
          color: 'var(--color-text-muted, #999)',
          marginTop: 'var(--spacing-md, 8px)',
        }}>
          {themeName} theme
        </p>
      )}
    </div>
  );
}
