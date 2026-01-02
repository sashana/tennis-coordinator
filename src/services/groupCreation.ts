/**
 * Group Creation Service
 *
 * Handles self-service group creation for tight-knit tennis groups.
 * Creates group in Firebase with settings, metadata, and short code index.
 */

import { getDatabase } from '../config/firebase';
import {
  generateGroupId,
  generateShortCode,
  generateDefaultPin,
  createDefaultGroupSettings,
} from '../utils/groups';
import { linkUserToGroup, deviceToken } from '../hooks/usePlatformUser';
import type { GroupArchetype, GroupCreator, GroupMetadata } from '../types/groupTypes';
import { sport } from '../config/sport';

// ============================================
// Types
// ============================================

export interface CreateGroupParams {
  name: string;
  location: string;
  creatorName: string;
  creatorEmail: string;
  creatorPhone: string;
  groupPin?: string;
  adminPin?: string;
  archetype?: GroupArchetype;
}

export interface CreateGroupResult {
  success: boolean;
  groupId?: string;
  shortCode?: string;
  groupPin?: string;
  adminPin?: string;
  shareUrl?: string;
  error?: string;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Generate a unique short code by checking Firebase for collisions
 */
async function generateUniqueShortCode(
  db: ReturnType<typeof getDatabase>
): Promise<string> {
  if (!db) throw new Error('Database not available');

  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const code = generateShortCode(6);
    const existing = await db.ref(`shortCodeIndex/${code}`).once('value');

    if (!existing.val()) {
      return code;
    }

    attempts++;
  }

  // Fallback to longer code if too many collisions
  return generateShortCode(8);
}

/**
 * Capture IP address using external service
 * Returns undefined if fetch fails (non-blocking)
 */
async function captureIpAddress(): Promise<string | undefined> {
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    const data = await response.json();
    return data.ip;
  } catch {
    // Non-blocking - IP capture is optional
    console.warn('[GroupCreation] Failed to capture IP address');
    return undefined;
  }
}

/**
 * Build shareable URL for a group
 */
function buildShareUrl(shortCode: string): string {
  const baseUrl = window.location.origin;
  return `${baseUrl}/${shortCode}`;
}

// ============================================
// Main Function
// ============================================

/**
 * Create a new group with all required setup
 *
 * Steps:
 * 1. Generate unique IDs (groupId, shortCode)
 * 2. Capture IP address (non-blocking)
 * 3. Create group settings in Firebase
 * 4. Create group metadata with creator info
 * 5. Register short code in index
 * 6. Link creator to group via platform user
 *
 * @param params Group creation parameters
 * @returns Result with group info or error
 */
export async function createGroup(params: CreateGroupParams): Promise<CreateGroupResult> {
  const db = getDatabase();
  if (!db) {
    return { success: false, error: 'Database not available' };
  }

  try {
    // Generate unique identifiers
    const groupId = generateGroupId();
    const shortCode = await generateUniqueShortCode(db);
    const groupPin = params.groupPin || generateDefaultPin();
    const adminPin = params.adminPin || generateDefaultPin();

    // Capture additional creator info (non-blocking)
    const [ipAddress] = await Promise.all([captureIpAddress()]);
    const userAgent =
      typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

    // Create group settings (using existing utility)
    const settings = createDefaultGroupSettings(params.name);
    settings.groupPin = groupPin;
    settings.adminPin = adminPin;
    settings.members = [params.creatorName]; // Creator is first member
    settings.sportType = sport.id; // Set sport type from current sport config

    // Set location if provided
    if (params.location) {
      settings.location = {
        lat: 0, // Will be geocoded later or user can update in admin
        lon: 0,
        name: params.location,
      };
    }

    // Add creator to member details
    settings.memberDetails = {
      [params.creatorName]: {
        addedBy: 'Self (Group Creator)',
        addedDate: Date.now(),
        email: params.creatorEmail,
        phone: params.creatorPhone,
      },
    };

    // Create creator info
    const creator: GroupCreator = {
      name: params.creatorName,
      email: params.creatorEmail,
      phone: params.creatorPhone,
      ipAddress,
      userAgent,
    };

    // Create metadata
    const metadata: GroupMetadata = {
      archetype: params.archetype || 'tight-knit',
      createdAt: Date.now(),
      createdBy: deviceToken.value || 'anonymous',
      shortCode,
      creator,
    };

    // Write to Firebase in parallel
    await Promise.all([
      // Group settings
      db.ref(`groups/${groupId}/settings`).set(settings),
      // Group metadata
      db.ref(`groups/${groupId}/metadata`).set(metadata),
      // Short code index (for fast lookup)
      db.ref(`shortCodeIndex/${shortCode}`).set(groupId),
    ]);

    // Link creator to group (fire-and-forget, don't block on this)
    if (deviceToken.value) {
      linkUserToGroup(groupId, params.creatorName).catch((err) => {
        console.warn('[GroupCreation] Failed to link creator to group:', err);
      });
    }

    // Build share URL
    const shareUrl = buildShareUrl(shortCode);

    return {
      success: true,
      groupId,
      shortCode,
      groupPin,
      adminPin,
      shareUrl,
    };
  } catch (error) {
    console.error('[GroupCreation] Failed to create group:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Check if a short code is available
 */
export async function isShortCodeAvailable(code: string): Promise<boolean> {
  const db = getDatabase();
  if (!db) return false;

  try {
    const snapshot = await db.ref(`shortCodeIndex/${code.toUpperCase()}`).once('value');
    return !snapshot.val();
  } catch {
    return false;
  }
}

/**
 * Resolve a short code to a group ID
 */
export async function resolveShortCode(code: string): Promise<string | null> {
  const db = getDatabase();
  if (!db) return null;

  try {
    const snapshot = await db.ref(`shortCodeIndex/${code.toUpperCase()}`).once('value');
    return (snapshot.val() as string) || null;
  } catch {
    return null;
  }
}
