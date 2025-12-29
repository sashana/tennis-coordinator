/**
 * Firebase service module
 *
 * This module provides typed Firebase database operations.
 * It abstracts the Firebase SDK and provides strongly-typed
 * methods for all database operations.
 */

import type {
  AvailableGroups,
  CheckinData,
  CheckinsByDate,
  GroupSettings,
  ActivityEntry,
  ActivityByDate,
  NotificationPreferences,
  NotificationItem,
  MemberDetailsMap,
  MatchArrangement,
  Organization,
  AdminIndex,
} from '@/types';
import { normalizeName } from '@/utils/helpers';

// Firebase Database reference type (will be provided by Firebase SDK)
interface DatabaseRef {
  ref(path: string): DatabaseRef;
  once(event: 'value'): Promise<{ val(): unknown }>;
  set(data: unknown): Promise<void>;
  update(data: Record<string, unknown>): Promise<void>;
  push(): DatabaseRef;
  child(path: string): DatabaseRef;
  remove(): Promise<void>;
  toString(): string;
}

/**
 * Firebase path generators
 */
export const firebasePaths = {
  // Groups
  groups: () => 'groups',
  group: (groupId: string) => `groups/${groupId}`,
  checkins: (groupId: string) => `groups/${groupId}/checkins`,
  checkinsDate: (groupId: string, date: string) => `groups/${groupId}/checkins/${date}`,
  settings: (groupId: string) => `groups/${groupId}/settings`,
  activity: (groupId: string, date: string) => `groups/${groupId}/activity/${date}`,
  activityAll: (groupId: string) => `groups/${groupId}/activity`,
  matchNotes: (groupId: string, date: string) => `groups/${groupId}/matchNotes/${date}`,
  matchNote: (groupId: string, date: string, matchKey: string) =>
    `groups/${groupId}/matchNotes/${date}/${matchKey}`,
  userNotificationPrefs: (groupId: string, userName: string) =>
    `groups/${groupId}/userNotifications/${normalizeName(userName)}/preferences`,
  userNotifications: (groupId: string, userName: string) =>
    `groups/${groupId}/userNotifications/${normalizeName(userName)}/items`,
  groupNotifications: (groupId: string) => `groups/${groupId}/userNotifications`,
  matchArrangements: (groupId: string, date: string) =>
    `groups/${groupId}/matchArrangements/${date}`,

  // Organizations
  organizations: () => 'organizations',
  organization: (orgId: string) => `organizations/${orgId}`,
  organizationAdmins: (orgId: string) => `organizations/${orgId}/admins`,
  organizationLocations: (orgId: string) => `organizations/${orgId}/locations`,

  // Admin Index (for fast permission lookups)
  adminIndex: (deviceToken: string) => `adminIndex/${deviceToken}`,
};

/**
 * Firebase service class
 * Wraps Firebase operations with strong typing
 */
export class FirebaseService {
  private db: DatabaseRef;

  constructor(database: DatabaseRef) {
    this.db = database;
  }

  /**
   * Get a reference to a path
   */
  private ref(path: string): DatabaseRef {
    return this.db.ref(path);
  }

  // ============================================
  // Groups
  // ============================================

  async loadAvailableGroups(): Promise<AvailableGroups> {
    const snapshot = await this.ref(firebasePaths.groups()).once('value');
    return (snapshot.val() as AvailableGroups) || {};
  }

  async saveGroup(groupId: string, data: { name: string; shortCode?: string }): Promise<void> {
    await this.ref(firebasePaths.group(groupId)).update(data);
  }

  async deleteGroup(groupId: string): Promise<void> {
    await this.ref(firebasePaths.group(groupId)).remove();
  }

  // ============================================
  // Settings
  // ============================================

  async loadSettings(groupId: string): Promise<GroupSettings | null> {
    const snapshot = await this.ref(firebasePaths.settings(groupId)).once('value');
    const settings = snapshot.val() as Partial<GroupSettings> | null;

    if (!settings) {
      return null;
    }

    // Apply defaults (read 'members', fallback to 'coreMembers' for legacy data)
    return {
      groupName: settings.groupName || 'Unknown Group',
      members: settings.members || settings.coreMembers || [],
      memberDetails: settings.memberDetails || {},
      groupPin: settings.groupPin || '14675',
      adminPin: settings.adminPin || '3250',
      location: settings.location || {
        lat: 37.2358,
        lon: -121.9623,
        name: 'Los Gatos, CA',
      },
    };
  }

  async saveSettings(groupId: string, settings: Partial<GroupSettings>): Promise<void> {
    await this.ref(firebasePaths.settings(groupId)).update(settings as Record<string, unknown>);
  }

  async updateMembers(
    groupId: string,
    members: string[],
    memberDetails: MemberDetailsMap
  ): Promise<void> {
    await this.ref(firebasePaths.settings(groupId)).update({
      members,
      memberDetails,
    });
  }

  // ============================================
  // Check-ins
  // ============================================

  async loadCheckins(groupId: string): Promise<CheckinsByDate> {
    const snapshot = await this.ref(firebasePaths.checkins(groupId)).once('value');
    return (snapshot.val() as CheckinsByDate) || {};
  }

  async loadCheckinsForDate(groupId: string, date: string): Promise<CheckinData[]> {
    const snapshot = await this.ref(firebasePaths.checkinsDate(groupId, date)).once('value');
    return (snapshot.val() as CheckinData[]) || [];
  }

  async saveCheckinsForDate(groupId: string, date: string, checkins: CheckinData[]): Promise<void> {
    await this.ref(firebasePaths.checkinsDate(groupId, date)).set(checkins);
  }

  async verifyCheckinsForDate(
    groupId: string,
    date: string,
    expectedCount: number
  ): Promise<boolean> {
    const snapshot = await this.ref(firebasePaths.checkinsDate(groupId, date)).once('value');
    const savedData = (snapshot.val() as CheckinData[]) || [];
    return savedData.length === expectedCount;
  }

  // ============================================
  // Activity Log
  // ============================================

  async loadActivityForDate(groupId: string, date: string): Promise<Record<string, ActivityEntry>> {
    const snapshot = await this.ref(firebasePaths.activity(groupId, date)).once('value');
    return (snapshot.val() as Record<string, ActivityEntry>) || {};
  }

  async loadAllActivity(groupId: string): Promise<ActivityByDate> {
    const snapshot = await this.ref(firebasePaths.activityAll(groupId)).once('value');
    return (snapshot.val() as ActivityByDate) || {};
  }

  async logActivity(groupId: string, date: string, entry: ActivityEntry): Promise<void> {
    const ref = this.ref(firebasePaths.activity(groupId, date));
    const newRef = ref.push();
    await newRef.set(entry);
  }

  // ============================================
  // Match Notes
  // ============================================

  async loadMatchNotes(groupId: string, date: string): Promise<Record<string, string>> {
    const snapshot = await this.ref(firebasePaths.matchNotes(groupId, date)).once('value');
    return (snapshot.val() as Record<string, string>) || {};
  }

  async saveMatchNote(
    groupId: string,
    date: string,
    matchKey: string,
    note: string
  ): Promise<void> {
    await this.ref(firebasePaths.matchNote(groupId, date, matchKey)).set(note);
  }

  // ============================================
  // Notifications
  // ============================================

  async loadNotificationPrefs(groupId: string, userName: string): Promise<NotificationPreferences> {
    const snapshot = await this.ref(firebasePaths.userNotificationPrefs(groupId, userName)).once(
      'value'
    );

    const prefs = snapshot.val() as Partial<NotificationPreferences> | null;

    // Apply defaults - activityAlerts OFF by default, matchConfirmations ON by default
    return {
      activityAlerts: prefs?.activityAlerts === true, // Must explicitly opt-in
      matchConfirmations: prefs?.matchConfirmations !== false, // Default ON
      mutedMembers: prefs?.mutedMembers || [],
    };
  }

  async saveNotificationPrefs(
    groupId: string,
    userName: string,
    prefs: NotificationPreferences
  ): Promise<void> {
    await this.ref(firebasePaths.userNotificationPrefs(groupId, userName)).set(prefs);
  }

  async loadNotifications(
    groupId: string,
    userName: string
  ): Promise<Record<string, NotificationItem>> {
    const snapshot = await this.ref(firebasePaths.userNotifications(groupId, userName)).once(
      'value'
    );
    return (snapshot.val() as Record<string, NotificationItem>) || {};
  }

  async addNotification(
    groupId: string,
    userName: string,
    notification: NotificationItem
  ): Promise<void> {
    const ref = this.ref(firebasePaths.userNotifications(groupId, userName));
    const newRef = ref.push();
    await newRef.set(notification);
  }

  async markNotificationRead(
    groupId: string,
    userName: string,
    notificationId: string
  ): Promise<void> {
    await this.ref(
      `${firebasePaths.userNotifications(groupId, userName)}/${notificationId}/read`
    ).set(true);
  }

  async markAllNotificationsRead(groupId: string, userName: string): Promise<void> {
    const notifications = await this.loadNotifications(groupId, userName);
    const updates: Record<string, boolean> = {};

    for (const id of Object.keys(notifications)) {
      updates[`${id}/read`] = true;
    }

    if (Object.keys(updates).length > 0) {
      await this.ref(firebasePaths.userNotifications(groupId, userName)).update(updates);
    }
  }

  async clearNotifications(groupId: string, userName: string): Promise<void> {
    await this.ref(firebasePaths.userNotifications(groupId, userName)).remove();
  }

  // ============================================
  // Match Arrangements (Admin Override)
  // ============================================

  async loadMatchArrangement(groupId: string, date: string): Promise<MatchArrangement | null> {
    const snapshot = await this.ref(firebasePaths.matchArrangements(groupId, date)).once('value');
    return (snapshot.val() as MatchArrangement) || null;
  }

  async saveMatchArrangement(
    groupId: string,
    date: string,
    arrangement: MatchArrangement
  ): Promise<void> {
    await this.ref(firebasePaths.matchArrangements(groupId, date)).set(arrangement);
  }

  async clearMatchArrangement(groupId: string, date: string): Promise<void> {
    await this.ref(firebasePaths.matchArrangements(groupId, date)).remove();
  }

  // ============================================
  // Organizations
  // ============================================

  async loadOrganization(orgId: string): Promise<Organization | null> {
    const snapshot = await this.ref(firebasePaths.organization(orgId)).once('value');
    const data = snapshot.val() as Omit<Organization, 'id'> | null;

    if (!data) {
      return null;
    }

    return {
      id: orgId,
      ...data,
    };
  }

  async loadAllOrganizations(): Promise<Organization[]> {
    const snapshot = await this.ref(firebasePaths.organizations()).once('value');
    const data = snapshot.val() as Record<string, Omit<Organization, 'id'>> | null;

    if (!data) {
      return [];
    }

    return Object.entries(data).map(([id, org]) => ({
      id,
      ...org,
    }));
  }

  async saveOrganization(orgId: string, org: Omit<Organization, 'id'>): Promise<void> {
    await this.ref(firebasePaths.organization(orgId)).set(org);
  }

  async updateOrganization(
    orgId: string,
    updates: Partial<Omit<Organization, 'id'>>
  ): Promise<void> {
    await this.ref(firebasePaths.organization(orgId)).update(updates as Record<string, unknown>);
  }

  // ============================================
  // Admin Index
  // ============================================

  async loadAdminIndex(deviceToken: string): Promise<AdminIndex | null> {
    const snapshot = await this.ref(firebasePaths.adminIndex(deviceToken)).once('value');
    return (snapshot.val() as AdminIndex) || null;
  }

  async saveAdminIndex(deviceToken: string, index: AdminIndex): Promise<void> {
    await this.ref(firebasePaths.adminIndex(deviceToken)).set(index);
  }

  async updateAdminIndex(
    deviceToken: string,
    updates: Partial<AdminIndex>
  ): Promise<void> {
    await this.ref(firebasePaths.adminIndex(deviceToken)).update(updates as Record<string, unknown>);
  }

  // ============================================
  // Groups by Organization
  // ============================================

  async loadGroupsByOrg(orgId: string): Promise<Array<{ id: string; settings: GroupSettings }>> {
    // Load all groups and filter by organizationId
    // Note: In production, consider using Firebase indexing for better performance
    const snapshot = await this.ref(firebasePaths.groups()).once('value');
    const allGroups = snapshot.val() as Record<
      string,
      { settings?: Partial<GroupSettings> }
    > | null;

    if (!allGroups) {
      return [];
    }

    return Object.entries(allGroups)
      .filter(([, group]) => group.settings?.organizationId === orgId)
      .map(([id, group]) => ({
        id,
        settings: {
          groupName: group.settings?.groupName || 'Unknown Group',
          members: group.settings?.members || [],
          memberDetails: group.settings?.memberDetails || {},
          groupPin: group.settings?.groupPin || '',
          adminPin: group.settings?.adminPin || '',
          location: group.settings?.location,
          sportType: group.settings?.sportType,
          organizationId: group.settings?.organizationId,
          locations: group.settings?.locations,
          level: group.settings?.level,
          format: group.settings?.format,
          type: group.settings?.type,
        },
      }));
  }
}

/**
 * Create Firebase service instance
 * This is the factory function to create the service with a database reference
 */
export function createFirebaseService(database: DatabaseRef): FirebaseService {
  return new FirebaseService(database);
}
