/**
 * Reusable Style Constants
 *
 * Standardized styles using CSS variables for consistent theming.
 * These objects can be spread into component styles.
 */

import type { JSX } from 'preact';

/**
 * Button Styles
 */
export const buttonStyles = {
  // Primary action button (green)
  primary: {
    padding: 'var(--spacing-md, 8px) var(--spacing-2xl, 16px)',
    background: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-pill, 20px)',
    fontSize: 'var(--font-size-base, 14px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as JSX.CSSProperties,

  // Secondary button (gray outline)
  secondary: {
    padding: 'var(--spacing-md, 8px) var(--spacing-2xl, 16px)',
    background: 'var(--color-gray-lightest, #f5f5f5)',
    color: 'var(--color-gray-base, #666)',
    border: '1px solid var(--color-gray-light, #ddd)',
    borderRadius: 'var(--radius-pill, 20px)',
    fontSize: 'var(--font-size-base, 14px)',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as JSX.CSSProperties,

  // Small action button (compact, orange)
  action: {
    padding: 'var(--spacing-xs, 4px) var(--spacing-lg, 10px)',
    background: 'var(--color-orange-primary, #ff9800)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-xl, 12px)',
    fontSize: 'var(--font-size-xs, 11px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: 'var(--shadow-orange, 0 1px 4px rgba(255, 152, 0, 0.3))',
  } as JSX.CSSProperties,

  // Danger/delete button (red)
  danger: {
    padding: 'var(--spacing-md, 8px) var(--spacing-2xl, 16px)',
    background: 'var(--color-error, #f44336)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md, 6px)',
    fontSize: 'var(--font-size-base, 14px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as JSX.CSSProperties,

  // Small arrange mode button (purple)
  arrange: {
    padding: 'var(--spacing-sm, 6px) var(--spacing-xl, 12px)',
    background: 'var(--color-purple-arrange, #9C27B0)',
    color: 'white',
    border: 'none',
    borderRadius: 'var(--radius-md, 6px)',
    fontSize: 'var(--font-size-sm, 13px)',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  } as JSX.CSSProperties,
};

/**
 * Dropdown Styles
 */
export const dropdownStyles = {
  // Dropdown container (positioned absolutely)
  container: {
    position: 'absolute',
    background: 'white',
    borderRadius: 'var(--radius-lg, 8px)',
    boxShadow: 'var(--shadow-xl, 0 4px 12px rgba(0,0,0,0.15))',
    zIndex: 100,
    overflow: 'hidden',
    minWidth: '140px',
  } as JSX.CSSProperties,

  // Individual dropdown menu item
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-md, 8px)',
    padding: '10px 14px',
    width: '100%',
    border: 'none',
    background: 'white',
    cursor: 'pointer',
    fontSize: 'var(--font-size-base, 14px)',
    color: 'var(--color-text-primary, #333)',
    transition: 'background 0.15s',
  } as JSX.CSSProperties,

  // Divider between dropdown items
  divider: {
    borderTop: '1px solid var(--color-border, #e0e0e0)',
  } as JSX.CSSProperties,
};

/**
 * Social Media Colors
 */
export const socialColors = {
  whatsapp: 'var(--color-whatsapp, #25D366)',
  sms: 'var(--color-sms, #2196F3)',
  email: 'var(--color-error, #EA4335)',
  copy: 'var(--color-gray-base, #666)',
};

/**
 * Common Padding Patterns
 */
export const commonPadding = {
  cardSmall: 'var(--spacing-xl, 12px)',
  cardMedium: 'var(--spacing-xl, 12px) var(--spacing-2xl, 16px)',
  cardLarge: 'var(--spacing-2xl, 16px)',
  button: 'var(--spacing-md, 8px) var(--spacing-2xl, 16px)',
  buttonCompact: 'var(--spacing-xs, 4px) var(--spacing-lg, 10px)',
  dropdownItem: '10px 14px',
};

/**
 * Helper function to create hover state handler
 */
export function createHoverHandler(
  normalBg: string,
  hoverBg: string
): {
  onMouseOver: (e: MouseEvent) => void;
  onMouseOut: (e: MouseEvent) => void;
} {
  return {
    onMouseOver: (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.background = hoverBg;
    },
    onMouseOut: (e: MouseEvent) => {
      (e.currentTarget as HTMLElement).style.background = normalBg;
    },
  };
}
