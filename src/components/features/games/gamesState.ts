/**
 * Shared state (signals) for GamesList components
 */
import { signal } from '@preact/signals';

// Compact view mode - stored in localStorage (defaults to compact/true)
export const compactViewMode = signal(
  typeof localStorage !== 'undefined' && localStorage.getItem('games_compact_view') !== 'false'
);

// Edit modal state
export const editModalOpen = signal(false);
export const editingIndex = signal<number | null>(null);
export const editPlayStyle = signal('both');
export const editTimeStart = signal('');
export const editTimeEnd = signal('');
export const editAllowRotation = signal(true);

// Remove confirmation modal state
export const removeModalOpen = signal(false);
export const removeIndex = signal<number | null>(null);
export const removeName = signal('');
export const removeIsOwner = signal(false);
export const removeStep = signal<'confirm' | 'done'>('confirm');
export const removeDate = signal('');
export const removeGroupName = signal('');

// State for inline share dropdown
export const activeShareDropdown = signal<string | null>(null);

// State for main games share dropdown
export const mainShareDropdownOpen = signal(false);

// Arrange mode state
export const arrangeMode = signal(false);
export const selectedPlayer = signal<{ name: string; matchKey: string } | null>(null);
export const tempArrangement = signal<{
  matches: Record<string, { players: string[]; note?: string }>;
  unassigned: string[];
} | null>(null);

// Toggle compact/detailed view
export function toggleCompactView() {
  const newValue = !compactViewMode.value;
  compactViewMode.value = newValue;
  localStorage.setItem('games_compact_view', String(newValue));
}

// Close dropdowns when clicking outside
if (typeof document !== 'undefined') {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.share-dropdown') && !target.closest('[data-share-button]')) {
      if (activeShareDropdown.value) {
        activeShareDropdown.value = null;
      }
      if (mainShareDropdownOpen.value) {
        mainShareDropdownOpen.value = false;
      }
    }
  });
}
