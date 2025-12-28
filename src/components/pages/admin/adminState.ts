/**
 * Shared state (signals) for AdminPage components
 */
import { signal } from '@preact/signals';
import type { SportId } from '../../../types/sportConfig';

// Sport configuration for badges
export const sportBadges: Record<SportId, { emoji: string; color: string }> = {
  tennis: { emoji: '🎾', color: '#2C6E49' },
  pickleball: { emoji: '🟡', color: '#2E7D32' },
  squash: { emoji: '🏸', color: '#1565C0' },
  padel: { emoji: '🎾', color: '#F57C00' },
  badminton: { emoji: '🏸', color: '#7B1FA2' },
};

export function getSportBadge(sportType: SportId | undefined) {
  const sport = sportType || 'tennis';
  const badge = sportBadges[sport] || sportBadges.tennis;
  return { sport, ...badge };
}

// Authentication state
export const isAuthenticated = signal(false);
export const siteAdminPin = signal<string | null>(null);
export const loginError = signal<string | null>(null);
export const isLoading = signal(true);

// Groups data
export const groups = signal<Record<string, any>>({});

// UI state
export const searchQuery = signal('');
export const activeTab = signal<'active' | 'archived'>('active');
export const openMenuId = signal<string | null>(null);
export const detailsDrawerGroup = signal<string | null>(null);
export const expandedGroup = signal<string | null>(null);

// Member management state
export const newMemberName = signal('');
export const addingMember = signal(false);
export const editingMemberInfo = signal<{ groupId: string; originalName: string } | null>(null);
export const editMemberNewName = signal('');

// Helper functions
export function toggleMenu(groupId: string) {
  openMenuId.value = openMenuId.value === groupId ? null : groupId;
}

export function closeMenu() {
  openMenuId.value = null;
}

export function openDetails(groupId: string) {
  detailsDrawerGroup.value = groupId;
  closeMenu();
}

export function closeDetails() {
  detailsDrawerGroup.value = null;
  expandedGroup.value = null;
}

export function startEditMember(groupId: string, memberName: string) {
  editingMemberInfo.value = { groupId, originalName: memberName };
  editMemberNewName.value = memberName;
}

export function cancelEditMember() {
  editingMemberInfo.value = null;
}
