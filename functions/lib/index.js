"use strict";
/**
 * Cloud Functions for Sports Coordinator
 *
 * Handles push notifications for game confirmations.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupInvalidTokens = exports.notifyGameConfirmed = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// Initialize Firebase Admin
admin.initializeApp();
const db = admin.database();
const messaging = admin.messaging();
/**
 * Send push notifications when a game is confirmed
 *
 * Called by the client when a game reaches full capacity.
 */
exports.notifyGameConfirmed = functions.https.onCall(async (data, context) => {
    const { groupId, gameDate, gameType, players, excludePlayer } = data;
    if (!groupId || !gameDate || !gameType || !players) {
        throw new functions.https.HttpsError('invalid-argument', 'Missing required fields: groupId, gameDate, gameType, players');
    }
    console.log(`[notifyGameConfirmed] Game confirmed: ${gameType} on ${gameDate} with ${players.length} players`);
    try {
        // Get notification preferences for all members in this group
        const prefsSnapshot = await db
            .ref(`groups/${groupId}/notificationPrefs`)
            .once('value');
        const allPrefs = prefsSnapshot.val() || {};
        // Collect FCM tokens for players who opted in
        const tokens = [];
        const notifiedPlayers = [];
        for (const playerName of players) {
            // Skip the player who triggered the confirmation
            if (excludePlayer && playerName.toLowerCase() === excludePlayer.toLowerCase()) {
                continue;
            }
            // Normalize name for lookup (lowercase, trimmed)
            const normalizedName = playerName.toLowerCase().trim().replace(/\s+/g, '-');
            // Check each stored preference to find this player
            for (const [memberId, prefs] of Object.entries(allPrefs)) {
                const memberPrefs = prefs;
                // Check if this member matches and has push enabled
                if (memberId.toLowerCase().includes(normalizedName) ||
                    normalizedName.includes(memberId.toLowerCase())) {
                    if (memberPrefs.pushEnabled && memberPrefs.pushToken) {
                        tokens.push(memberPrefs.pushToken);
                        notifiedPlayers.push(playerName);
                        console.log(`[notifyGameConfirmed] Will notify: ${playerName}`);
                    }
                }
            }
        }
        if (tokens.length === 0) {
            console.log('[notifyGameConfirmed] No opted-in players to notify');
            return { success: true, notifiedCount: 0 };
        }
        // Format the date nicely
        const date = new Date(gameDate + 'T12:00:00');
        const dateStr = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
        // Build notification
        const gameLabel = gameType.includes('doubles') ? 'Doubles' : 'Singles';
        const notification = {
            title: `Game On! 🎾`,
            body: `Your ${gameLabel.toLowerCase()} match on ${dateStr} is confirmed. See you on the court!`,
        };
        const messageData = {
            type: 'game-confirmed',
            groupId,
            gameDate,
            gameType,
        };
        // Send to all tokens
        console.log(`[notifyGameConfirmed] Sending to ${tokens.length} devices...`);
        const response = await messaging.sendEachForMulticast({
            tokens,
            notification,
            data: messageData,
            webpush: {
                notification: {
                    icon: '/icon-192.png',
                    badge: '/icon-192.png',
                    requireInteraction: true,
                },
                fcmOptions: {
                    link: `/#${groupId}`,
                },
            },
        });
        console.log(`[notifyGameConfirmed] Sent: ${response.successCount} success, ${response.failureCount} failed`);
        // Log any failures
        response.responses.forEach((resp, idx) => {
            if (!resp.success) {
                console.error(`[notifyGameConfirmed] Failed to send to token ${idx}:`, resp.error);
            }
        });
        return {
            success: true,
            notifiedCount: response.successCount,
            notifiedPlayers,
        };
    }
    catch (error) {
        console.error('[notifyGameConfirmed] Error:', error);
        throw new functions.https.HttpsError('internal', 'Failed to send notifications');
    }
});
/**
 * Clean up invalid FCM tokens
 *
 * Called periodically or when tokens fail.
 */
exports.cleanupInvalidTokens = functions.pubsub
    .schedule('every 24 hours')
    .onRun(async (context) => {
    console.log('[cleanupInvalidTokens] Starting token cleanup...');
    // Future: Implement token cleanup logic
    return null;
});
//# sourceMappingURL=index.js.map