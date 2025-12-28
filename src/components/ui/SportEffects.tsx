import { groupSettings } from '../../hooks/useFirebase';
import { sport } from '../../config/sport';

/**
 * Sport-themed UI components for empty states and loading
 * All components respect the current theme and sport configuration
 */

// Get theme-appropriate court color
function getCourtColor(): string {
  const theme = groupSettings.value?.theme;
  const themes = sport.themes;
  const currentTheme = themes.find((t) => t.id === theme) || themes.find((t) => t.id === sport.defaultTheme);
  return currentTheme?.color || sport.primaryColor;
}

function getThemeName(): string {
  const theme = groupSettings.value?.theme;
  const themes = sport.themes;
  const currentTheme = themes.find((t) => t.id === theme) || themes.find((t) => t.id === sport.defaultTheme);
  return currentTheme?.name || 'Classic';
}

/**
 * Empty court illustration with ball resting against net
 * Shows when no check-ins exist for a date
 */
export function SportEmptyState({
  message = 'No check-ins yet',
  subtext = 'Be the first to check in!',
}: {
  message?: string;
  subtext?: string;
}) {
  const courtColor = getCourtColor();
  const lineColor = 'rgba(255, 255, 255, 0.9)';

  return (
    <div
      style={{
        textAlign: 'center',
        padding: 'var(--spacing-4xl, 24px) var(--spacing-2xl, 16px)',
        color: 'var(--color-text-secondary, #666)',
      }}
    >
      {/* Mini court illustration */}
      <div
        style={{
          width: '120px',
          height: '80px',
          margin: '0 auto var(--spacing-2xl, 16px)',
          position: 'relative',
          background: courtColor,
          borderRadius: 'var(--radius-lg, 8px)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.15))',
        }}
      >
        {/* Court lines */}
        {/* Center service line */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '20%',
            bottom: '20%',
            width: '2px',
            background: lineColor,
            transform: 'translateX(-50%)',
          }}
        />
        {/* Net (center horizontal) */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '50%',
            height: '3px',
            background: lineColor,
            transform: 'translateY(-50%)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
        {/* Top service line */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            top: '20%',
            height: '2px',
            background: lineColor,
          }}
        />
        {/* Bottom service line */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            right: '10%',
            bottom: '20%',
            height: '2px',
            background: lineColor,
          }}
        />
        {/* Left sideline */}
        <div
          style={{
            position: 'absolute',
            left: '10%',
            top: '0',
            bottom: '0',
            width: '2px',
            background: lineColor,
          }}
        />
        {/* Right sideline */}
        <div
          style={{
            position: 'absolute',
            right: '10%',
            top: '0',
            bottom: '0',
            width: '2px',
            background: lineColor,
          }}
        />

        {/* Ball/emoji at center */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '16px',
            animation: 'ballPulse 2s ease-in-out infinite',
          }}
        >
          {sport.sportEmoji}
        </div>
      </div>

      {/* Message */}
      <p
        style={{
          fontSize: 'var(--font-size-lg, 16px)',
          fontWeight: '600',
          color: 'var(--color-text-primary, #333)',
          margin: '0 0 var(--spacing-sm, 6px) 0',
        }}
      >
        {message}
      </p>
      <p
        style={{
          fontSize: 'var(--font-size-sm, 13px)',
          color: 'var(--color-text-muted, #888)',
          margin: 0,
        }}
      >
        {subtext}
      </p>
    </div>
  );
}

/**
 * Bouncing ball/emoji loading animation
 */
export function BouncingBallLoader({
  text = 'Loading...',
  size = 'medium',
}: {
  text?: string;
  size?: 'small' | 'medium' | 'large';
}) {
  const sizes = {
    small: { ball: 24, container: 44 },
    medium: { ball: 36, container: 64 },
    large: { ball: 52, container: 94 },
  };

  const { ball, container } = sizes[size];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--spacing-4xl, 24px)',
      }}
    >
      {/* Ball container with bounce animation */}
      <div
        style={{
          height: `${container}px`,
          display: 'flex',
          alignItems: 'flex-end',
          marginBottom: 'var(--spacing-lg, 12px)',
        }}
      >
        <div
          style={{
            fontSize: `${ball}px`,
            lineHeight: 1,
            animation: 'sportBounce 0.6s ease-in-out infinite',
          }}
        >
          {sport.sportEmoji}
        </div>
      </div>

      {/* Shadow under ball */}
      <div
        style={{
          width: `${ball * 0.8}px`,
          height: `${ball * 0.15}px`,
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '50%',
          marginTop: `-${ball * 0.1}px`,
          animation: 'ballShadow 0.6s ease-in-out infinite',
        }}
      />

      {/* Loading text */}
      {text && (
        <p
          style={{
            fontSize: 'var(--font-size-sm, 13px)',
            color: 'var(--color-text-muted, #888)',
            marginTop: 'var(--spacing-lg, 12px)',
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}

/**
 * Full-screen loading overlay with sport-specific animation
 */
export function SportLoadingScreen({ text = 'Loading...' }: { text?: string }) {
  const themeName = getThemeName();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--color-bg-page, #f5f5f5)',
      }}
    >
      <BouncingBallLoader text={text} size="large" />
      {themeName !== 'Classic' && (
        <p
          style={{
            fontSize: 'var(--font-size-xs, 11px)',
            color: 'var(--color-text-muted, #999)',
            marginTop: 'var(--spacing-md, 8px)',
          }}
        >
          {themeName} theme
        </p>
      )}
    </div>
  );
}

// Legacy exports for backward compatibility (alias to new names)
export const TennisEmptyState = SportEmptyState;
export const TennisLoadingScreen = SportLoadingScreen;
