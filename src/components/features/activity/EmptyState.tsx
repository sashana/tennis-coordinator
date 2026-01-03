/**
 * EmptyState Component
 *
 * Displayed when there's no recent activity.
 * Encourages user to check in or invite others.
 */

import { JSX } from 'preact';

interface EmptyStateProps {
  onCheckIn: () => void;
}

export function EmptyState({ onCheckIn }: EmptyStateProps): JSX.Element {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        background: 'var(--color-bg-subtle, #f9f9f9)',
        borderRadius: 'var(--radius-xl, 12px)',
      }}
    >
      <div
        style={{
          fontSize: '48px',
          marginBottom: '16px',
        }}
      >
        📅
      </div>

      <p
        style={{
          fontSize: 'var(--font-size-xl, 18px)',
          margin: '0 0 8px 0',
          color: 'var(--color-text-primary, #333)',
          fontWeight: '500',
        }}
      >
        No activity yet today
      </p>

      <p
        style={{
          fontSize: 'var(--font-size-base, 14px)',
          color: 'var(--color-text-secondary, #666)',
          margin: '0 0 20px 0',
        }}
      >
        Be the first to check in and get a game going!
      </p>

      <button
        onClick={onCheckIn}
        style={{
          background: 'var(--color-primary, #2C6E49)',
          color: 'white',
          border: 'none',
          borderRadius: '24px',
          padding: '12px 28px',
          fontSize: 'var(--font-size-md, 15px)',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(44, 110, 73, 0.3)',
        }}
      >
        Check In Now
      </button>
    </div>
  );
}
