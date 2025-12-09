/**
 * Application State Management
 *
 * This module provides centralized state management with type safety.
 * It uses a simple reactive pattern for state updates.
 */

import type {
  AppState,
  CheckinData,
  NotificationPreferences,
  WeatherLocation,
} from '@/types';
import { getTodayDate, normalizeName } from '@/utils/helpers';

/**
 * Default notification preferences
 */
const DEFAULT_NOTIFICATION_PREFS: NotificationPreferences = {
  activityAlerts: true,
  matchConfirmations: true,
  mutedMembers: [],
};

/**
 * Default weather location
 */
const DEFAULT_WEATHER_LOCATION: WeatherLocation = {
  lat: 37.2358,
  lon: -121.9623,
  name: 'Los Gatos, CA',
};

/**
 * Create initial app state
 */
export function createInitialState(): AppState {
  return {
    // Group state
    currentGroupId: null,
    currentGroupName: '',
    availableGroups: {},

    // Data state
    allCheckins: {},
    userPreferences: {},
    coreMembers: [],
    memberDetails: {},
    matchNotes: {},

    // Settings
    groupPin: '14675',
    adminPin: '3250',
    weatherLocation: DEFAULT_WEATHER_LOCATION,
    weatherCache: {},

    // UI state
    selectedDate: getTodayDate(),
    selectedPreference: 'both',
    selectedName: '',
    isGuest: false,
    addedBy: '',

    // Session state
    sessionUser: '',

    // Preferences editing state
    currentEditingUser: null,
    tempInclude: [],
    tempExclude: [],

    // Notification state
    userNotificationPrefs: DEFAULT_NOTIFICATION_PREFS,
  };
}

/**
 * State change listener type
 */
export type StateListener<K extends keyof AppState> = (
  newValue: AppState[K],
  oldValue: AppState[K]
) => void;

/**
 * App Store class for managing application state
 */
export class AppStore {
  private state: AppState;
  private listeners: Map<keyof AppState, Set<StateListener<keyof AppState>>>;

  constructor(initialState?: Partial<AppState>) {
    this.state = { ...createInitialState(), ...initialState };
    this.listeners = new Map();
  }

  /**
   * Get the current state
   */
  getState(): Readonly<AppState> {
    return this.state;
  }

  /**
   * Get a specific state value
   */
  get<K extends keyof AppState>(key: K): AppState[K] {
    return this.state[key];
  }

  /**
   * Set a specific state value
   */
  set<K extends keyof AppState>(key: K, value: AppState[K]): void {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.notifyListeners(key, value, oldValue);
  }

  /**
   * Update multiple state values at once
   */
  update(updates: Partial<AppState>): void {
    for (const [key, value] of Object.entries(updates)) {
      const k = key as keyof AppState;
      const oldValue = this.state[k];
      (this.state as unknown as Record<string, unknown>)[k] = value;
      this.notifyListeners(k, value as AppState[typeof k], oldValue);
    }
  }

  /**
   * Subscribe to state changes for a specific key
   */
  subscribe<K extends keyof AppState>(
    key: K,
    listener: StateListener<K>
  ): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener as StateListener<keyof AppState>);

    // Return unsubscribe function
    return () => {
      this.listeners.get(key)?.delete(listener as StateListener<keyof AppState>);
    };
  }

  /**
   * Notify listeners of a state change
   */
  private notifyListeners<K extends keyof AppState>(
    key: K,
    newValue: AppState[K],
    oldValue: AppState[K]
  ): void {
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      for (const listener of keyListeners) {
        (listener as StateListener<K>)(newValue, oldValue);
      }
    }
  }

  // ============================================
  // Convenience methods for common operations
  // ============================================

  /**
   * Get check-ins for the selected date
   */
  getCheckinsForSelectedDate(): CheckinData[] {
    const date = this.state.selectedDate;
    if (!date) return [];
    return this.state.allCheckins[date] || [];
  }

  /**
   * Get check-ins for a specific date
   */
  getCheckinsForDate(date: string): CheckinData[] {
    return this.state.allCheckins[date] || [];
  }

  /**
   * Add a check-in for the selected date
   */
  addCheckin(checkin: CheckinData): void {
    const date = this.state.selectedDate;
    if (!date) return;

    const currentCheckins = this.state.allCheckins[date] || [];
    const newCheckins = {
      ...this.state.allCheckins,
      [date]: [...currentCheckins, checkin],
    };
    this.set('allCheckins', newCheckins);
  }

  /**
   * Remove a check-in by index for the selected date
   */
  removeCheckin(index: number): CheckinData | null {
    const date = this.state.selectedDate;
    if (!date) return null;

    const currentCheckins = this.state.allCheckins[date] || [];
    if (index < 0 || index >= currentCheckins.length) return null;

    const removed = currentCheckins[index];
    const newCheckins = {
      ...this.state.allCheckins,
      [date]: currentCheckins.filter((_, i) => i !== index),
    };
    this.set('allCheckins', newCheckins);
    return removed;
  }

  /**
   * Update check-ins for a specific date
   */
  setCheckinsForDate(date: string, checkins: CheckinData[]): void {
    const newCheckins = {
      ...this.state.allCheckins,
      [date]: checkins,
    };
    this.set('allCheckins', newCheckins);
  }

  /**
   * Get user preference for a normalized name
   */
  getUserPreference(name: string): { include: string[]; exclude: string[] } {
    const normalized = normalizeName(name);
    return this.state.userPreferences[normalized] || { include: [], exclude: [] };
  }

  /**
   * Set user preference
   */
  setUserPreference(
    name: string,
    prefs: { include: string[]; exclude: string[] }
  ): void {
    const normalized = normalizeName(name);
    const newPrefs = {
      ...this.state.userPreferences,
      [normalized]: prefs,
    };
    this.set('userPreferences', newPrefs);
  }

  /**
   * Check if a member is in core members
   */
  isCoreMember(name: string): boolean {
    const normalized = normalizeName(name);
    return this.state.coreMembers.some(
      (m) => normalizeName(m) === normalized
    );
  }

  /**
   * Add a core member
   */
  addCoreMember(name: string): void {
    if (this.isCoreMember(name)) return;
    this.set('coreMembers', [...this.state.coreMembers, name]);
  }

  /**
   * Remove a core member
   */
  removeCoreMember(name: string): void {
    const normalized = normalizeName(name);
    this.set(
      'coreMembers',
      this.state.coreMembers.filter((m) => normalizeName(m) !== normalized)
    );
  }

  /**
   * Get match note for a match key
   */
  getMatchNote(matchKey: string): string {
    return this.state.matchNotes[matchKey] || '';
  }

  /**
   * Set match note
   */
  setMatchNote(matchKey: string, note: string): void {
    const newNotes = {
      ...this.state.matchNotes,
      [matchKey]: note,
    };
    this.set('matchNotes', newNotes);
  }

  /**
   * Check if a member is muted
   */
  isMemberMuted(memberName: string): boolean {
    const mutedMembers = this.state.userNotificationPrefs.mutedMembers || [];
    const normalized = normalizeName(memberName);
    return mutedMembers.some((m) => normalizeName(m) === normalized);
  }

  /**
   * Toggle muted status for a member
   */
  toggleMutedMember(memberName: string): void {
    const mutedMembers = this.state.userNotificationPrefs.mutedMembers || [];
    const normalized = normalizeName(memberName);

    let newMutedMembers: string[];
    if (this.isMemberMuted(memberName)) {
      newMutedMembers = mutedMembers.filter(
        (m) => normalizeName(m) !== normalized
      );
    } else {
      newMutedMembers = [...mutedMembers, memberName];
    }

    this.set('userNotificationPrefs', {
      ...this.state.userNotificationPrefs,
      mutedMembers: newMutedMembers,
    });
  }

  /**
   * Reset state to initial values
   */
  reset(): void {
    this.state = createInitialState();
  }

  /**
   * Reset state for a new group
   */
  resetForNewGroup(): void {
    this.update({
      allCheckins: {},
      coreMembers: [],
      memberDetails: {},
      matchNotes: {},
      userPreferences: {},
    });
  }
}

/**
 * Create a new app store instance
 */
export function createAppStore(initialState?: Partial<AppState>): AppStore {
  return new AppStore(initialState);
}

/**
 * Default singleton store instance
 * Can be used when a single global store is needed
 */
let defaultStore: AppStore | null = null;

export function getDefaultStore(): AppStore {
  if (!defaultStore) {
    defaultStore = createAppStore();
  }
  return defaultStore;
}

export function resetDefaultStore(): void {
  defaultStore = null;
}
