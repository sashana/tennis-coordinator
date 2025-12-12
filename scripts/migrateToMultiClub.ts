/**
 * Migration Script: Legacy Groups to Multi-Club Platform
 *
 * This script migrates data from the legacy single-group model to the new
 * multi-tenant platform architecture with clubs, groups, and platform users.
 *
 * Usage:
 *   npx ts-node scripts/migrateToMultiClub.ts [--dry-run] [--group=groupId]
 *
 * Options:
 *   --dry-run   Preview changes without writing to database
 *   --group=id  Migrate only a specific group (default: all groups)
 *
 * Migration Strategy (Big-Bang):
 *   1. Read all legacy groups
 *   2. For each group, create:
 *      - A new "independent group" (groups without a club parent)
 *      - Platform user records for each member
 *   3. Preserve all historical data (checkins, activity, notes, arrangements)
 *   4. Generate member mappings (oldName -> newUserId)
 *   5. Write to new platform structure
 */

import type {
  MemberDetails,
  CheckinData,
  ActivityEntry,
  MatchArrangement,
  NotificationItem,
  NotificationPreferences,
  WeatherLocation,
} from '../src/types/index';

import type {
  PlatformUser,
  IndependentGroup,
  GroupData,
  MigrationMapping,
  MigrationResult,
  UserProfile,
  ProfileVisibility,
  UserSettings,
} from '../src/types/multiTenant';

// ============================================
// Legacy Data Types (current Firebase structure)
// ============================================

interface LegacyGroupSettings {
  groupName: string;
  coreMembers: string[];
  memberDetails?: Record<string, MemberDetails>;
  groupPin: string;
  adminPin: string;
  location?: WeatherLocation;
  groupDescription?: string;
  groupRules?: string;
}

interface LegacyGroup {
  settings: LegacyGroupSettings;
  checkins?: Record<string, CheckinData[]>;
  activity?: Record<string, Record<string, ActivityEntry>>;
  matchNotes?: Record<string, Record<string, string>>;
  matchArrangements?: Record<string, MatchArrangement>;
  userNotifications?: Record<string, {
    preferences: NotificationPreferences;
    items?: Record<string, NotificationItem>;
  }>;
}

interface LegacyData {
  groups: Record<string, LegacyGroup>;
  siteSettings?: {
    siteAdminPin?: string;
  };
}

// ============================================
// Helper Functions
// ============================================

/**
 * Generate a UUID for new entities
 */
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Normalize a name for consistent matching
 */
function normalizeName(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '_');
}

/**
 * Generate a short code from a group name
 */
function generateShortCode(name: string, existingCodes: Set<string>): string {
  // Try to create an acronym from the name
  const words = name.split(/\s+/);
  let code = words
    .map(w => w[0])
    .join('')
    .toLowerCase()
    .slice(0, 6);

  // Ensure uniqueness
  let suffix = 1;
  let finalCode = code;
  while (existingCodes.has(finalCode)) {
    finalCode = `${code}${suffix}`;
    suffix++;
  }

  return finalCode;
}

/**
 * Create default profile visibility settings
 */
function createDefaultVisibility(): ProfileVisibility {
  return {
    isPublic: false,
    showEmail: false,
    showPhone: false,
    showSkillLevel: true,
    showLocation: true,
    showPlayPreferences: true,
  };
}

/**
 * Create default user settings
 */
function createDefaultUserSettings(): UserSettings {
  return {
    notifications: {
      activityAlerts: true,
      matchConfirmations: true,
    },
  };
}

// ============================================
// Migration Functions
// ============================================

/**
 * Create a platform user from legacy member data
 */
function createPlatformUser(
  memberName: string,
  memberDetails: MemberDetails | undefined,
  groupId: string
): PlatformUser {
  const userId = generateId();
  const now = Date.now();

  const profile: UserProfile = {
    displayName: memberName,
    email: memberDetails?.email,
    phone: memberDetails?.phone,
    createdAt: memberDetails?.addedDate || now,
    visibility: createDefaultVisibility(),
  };

  return {
    id: userId,
    profile,
    memberships: {}, // Will be populated when groups are created
    settings: createDefaultUserSettings(),
  };
}

/**
 * Create an independent group from legacy group data
 */
function createIndependentGroup(
  legacyGroup: LegacyGroup,
  groupId: string,
  shortCode: string,
  memberMappings: Record<string, string>,
  ownerUserId: string
): IndependentGroup {
  const now = Date.now();
  const settings = legacyGroup.settings;

  // Build members record
  const members: IndependentGroup['members'] = {};

  // Add all members
  for (const memberName of settings.coreMembers) {
    const userId = memberMappings[memberName];
    if (userId) {
      // First member becomes owner, rest are members
      const isOwner = userId === ownerUserId;
      members[userId] = {
        userId,
        role: isOwner ? 'owner' : 'member',
        displayName: memberName,
        joinedAt: settings.memberDetails?.[memberName]?.addedDate || now,
      };
    }
  }

  return {
    id: groupId,
    name: settings.groupName,
    shortCode,
    description: settings.groupDescription,
    location: settings.location,
    createdAt: now,
    createdBy: ownerUserId,
    settings: {
      isPublic: false,
      joinPolicy: 'invite',
      groupPin: settings.groupPin,
      adminPin: settings.adminPin,
      allowGuests: true, // Legacy behavior
      rules: settings.groupRules,
    },
    members,
  };
}

/**
 * Migrate group data (checkins, activity, notes, arrangements)
 */
function migrateGroupData(
  legacyGroup: LegacyGroup,
  memberMappings: Record<string, string>
): GroupData {
  const groupData: GroupData = {
    checkins: {},
    activity: {},
    matchNotes: {},
    matchArrangements: {},
  };

  // Migrate checkins
  if (legacyGroup.checkins) {
    for (const [date, checkinList] of Object.entries(legacyGroup.checkins)) {
      groupData.checkins[date] = checkinList.map(checkin => ({
        ...checkin,
        // Note: We keep the name as-is for display, but could add userId reference
        // The new MultiTenantCheckin type has userId field
      }));
    }
  }

  // Migrate activity
  if (legacyGroup.activity) {
    groupData.activity = { ...legacyGroup.activity };
  }

  // Migrate match notes
  if (legacyGroup.matchNotes) {
    groupData.matchNotes = { ...legacyGroup.matchNotes };
  }

  // Migrate match arrangements
  if (legacyGroup.matchArrangements) {
    groupData.matchArrangements = { ...legacyGroup.matchArrangements };
  }

  return groupData;
}

/**
 * Migrate a single legacy group to the new platform structure
 */
function migrateLegacyGroup(
  groupId: string,
  legacyGroup: LegacyGroup,
  existingUsers: Map<string, PlatformUser>,
  existingShortCodes: Set<string>
): {
  users: PlatformUser[];
  group: IndependentGroup;
  groupData: GroupData;
  mapping: MigrationMapping;
} {
  const settings = legacyGroup.settings;
  const memberMappings: Record<string, string> = {};
  const newUsers: PlatformUser[] = [];

  // Create or find platform users for each member
  for (const memberName of settings.coreMembers) {
    const normalizedName = normalizeName(memberName);

    // Check if we already have a user with this name
    let existingUser: PlatformUser | undefined;
    for (const user of existingUsers.values()) {
      if (normalizeName(user.profile.displayName) === normalizedName) {
        existingUser = user;
        break;
      }
    }

    if (existingUser) {
      memberMappings[memberName] = existingUser.id;
    } else {
      // Create new user
      const memberDetails = settings.memberDetails?.[memberName];
      const newUser = createPlatformUser(memberName, memberDetails, groupId);
      memberMappings[memberName] = newUser.id;
      newUsers.push(newUser);
      existingUsers.set(newUser.id, newUser);
    }
  }

  // Determine owner (first member or first member with admin-like activity)
  const ownerUserId = memberMappings[settings.coreMembers[0]] || Object.values(memberMappings)[0];

  // Generate short code
  const shortCode = generateShortCode(settings.groupName, existingShortCodes);
  existingShortCodes.add(shortCode);

  // Create independent group
  const group = createIndependentGroup(
    legacyGroup,
    groupId,
    shortCode,
    memberMappings,
    ownerUserId
  );

  // Migrate group data
  const groupData = migrateGroupData(legacyGroup, memberMappings);

  // Create mapping
  const mapping: MigrationMapping = {
    oldGroupId: groupId,
    newClubId: '', // Empty since this is an independent group
    newGroupId: groupId,
    memberMappings,
  };

  return { users: newUsers, group, groupData, mapping };
}

// ============================================
// Main Migration Function
// ============================================

/**
 * Run the full migration from legacy to multi-tenant structure
 */
export async function runMigration(
  legacyData: LegacyData,
  options: {
    dryRun?: boolean;
    specificGroupId?: string;
  } = {}
): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: false,
    mappings: [],
    errors: [],
    warnings: [],
    stats: {
      groupsMigrated: 0,
      usersCreated: 0,
      checkinsPreserved: 0,
      activitiesPreserved: 0,
    },
  };

  console.log('Starting migration...');
  console.log(`Dry run: ${options.dryRun ? 'YES' : 'NO'}`);

  // Track existing users across groups (for deduplication)
  const existingUsers = new Map<string, PlatformUser>();
  const existingShortCodes = new Set<string>();

  // New platform data structure
  const platformData = {
    users: {} as Record<string, PlatformUser>,
    independentGroups: {} as Record<string, IndependentGroup>,
    independentGroupData: {} as Record<string, GroupData>,
    siteSettings: {
      siteAdminPin: legacyData.siteSettings?.siteAdminPin || '',
      platformAdmins: {} as Record<string, boolean>,
    },
  };

  // Filter groups if specific group requested
  const groupIds = options.specificGroupId
    ? [options.specificGroupId]
    : Object.keys(legacyData.groups || {});

  if (groupIds.length === 0) {
    result.errors.push('No groups found to migrate');
    return result;
  }

  console.log(`Found ${groupIds.length} group(s) to migrate`);

  // Migrate each group
  for (const groupId of groupIds) {
    const legacyGroup = legacyData.groups[groupId];

    if (!legacyGroup) {
      result.warnings.push(`Group ${groupId} not found, skipping`);
      continue;
    }

    console.log(`\nMigrating group: ${legacyGroup.settings?.groupName || groupId}`);

    try {
      const migration = migrateLegacyGroup(
        groupId,
        legacyGroup,
        existingUsers,
        existingShortCodes
      );

      // Add to platform data
      for (const user of migration.users) {
        platformData.users[user.id] = user;
        result.stats.usersCreated++;
      }

      platformData.independentGroups[groupId] = migration.group;
      platformData.independentGroupData[groupId] = migration.groupData;
      result.mappings.push(migration.mapping);
      result.stats.groupsMigrated++;

      // Count preserved data
      for (const checkins of Object.values(migration.groupData.checkins)) {
        result.stats.checkinsPreserved += checkins.length;
      }
      for (const dayActivities of Object.values(migration.groupData.activity)) {
        result.stats.activitiesPreserved += Object.keys(dayActivities).length;
      }

      console.log(`  - Created ${migration.users.length} new user(s)`);
      console.log(`  - Short code: ${migration.group.shortCode}`);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      result.errors.push(`Failed to migrate group ${groupId}: ${errorMessage}`);
      console.error(`  ERROR: ${errorMessage}`);
    }
  }

  // Summary
  console.log('\n=== Migration Summary ===');
  console.log(`Groups migrated: ${result.stats.groupsMigrated}`);
  console.log(`Users created: ${result.stats.usersCreated}`);
  console.log(`Check-ins preserved: ${result.stats.checkinsPreserved}`);
  console.log(`Activities preserved: ${result.stats.activitiesPreserved}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);

  if (options.dryRun) {
    console.log('\n[DRY RUN] No changes were written to the database');
    console.log('\nPlatform data structure:');
    console.log(JSON.stringify(platformData, null, 2).slice(0, 2000) + '...');
  }

  result.success = result.errors.length === 0;

  // Return the migration result along with the platform data
  // In actual implementation, this would write to Firebase
  return result;
}

// ============================================
// CLI Entry Point
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const groupArg = args.find(a => a.startsWith('--group='));
  const specificGroupId = groupArg?.split('=')[1];

  console.log('=== Multi-Club Migration Script ===\n');

  // In a real implementation, this would:
  // 1. Read legacy data from Firebase
  // 2. Run migration
  // 3. Write new structure to Firebase (if not dry-run)
  // 4. Optionally backup old data

  console.log('This script requires Firebase connection to run.');
  console.log('To use this script:');
  console.log('  1. Add Firebase Admin SDK initialization');
  console.log('  2. Read legacy data from: /groups');
  console.log('  3. Write new data to: /platform');
  console.log('\nExample usage:');
  console.log('  npx ts-node scripts/migrateToMultiClub.ts --dry-run');
  console.log('  npx ts-node scripts/migrateToMultiClub.ts --group=ttmd');
  console.log('  npx ts-node scripts/migrateToMultiClub.ts');
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

export { LegacyData, LegacyGroup, generateId, normalizeName };
