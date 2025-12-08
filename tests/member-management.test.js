/**
 * Unit tests for member management and invite flow
 *
 * These tests cover:
 * - Member data format (phone/email fields)
 * - Invite message generation
 * - Contact info display logic
 *
 * Run with: npm test
 */

import { describe, it, expect } from 'vitest';

// Helper to generate invite message (mirrors the app logic)
function getInviteMessage(memberName, groupName, groupUrl, pin) {
    return `Hi ${memberName}! You've been added to ${groupName} tennis coordination.

Check in for upcoming matches here:
${groupUrl}

PIN: ${pin}

Just select your name and check in when you can play!`;
}

// Helper to format contact info for display (mirrors renderMemberList logic)
function formatContactHtml(details) {
    let contactHtml = '';
    if (details.phone) {
        contactHtml += `📱 ${details.phone}\n`;
    }
    if (details.email) {
        contactHtml += `📧 ${details.email}\n`;
    }
    // Fallback for old format
    if (!details.phone && !details.email && details.contact) {
        contactHtml = `Contact: ${details.contact}`;
    }
    return contactHtml.trim();
}

// Helper to clean phone number for SMS link
function cleanPhoneNumber(phone) {
    return phone.replace(/[\s\-\(\)]/g, '');
}

// Helper to determine if invite should be shown
function shouldShowInvitePrompt(phone, email) {
    return !!(phone || email);
}

describe('Member Data Format', () => {
    it('should have phone and email as separate fields', () => {
        const memberDetails = {
            addedBy: 'Alex',
            addedDate: Date.now(),
            phone: '555-123-4567',
            email: 'john@example.com',
            notes: 'Great player'
        };

        expect(memberDetails.phone).toBe('555-123-4567');
        expect(memberDetails.email).toBe('john@example.com');
        expect(memberDetails.contact).toBeUndefined();
    });

    it('should support empty phone/email', () => {
        const memberDetails = {
            addedBy: 'Alex',
            addedDate: Date.now(),
            phone: '',
            email: '',
            notes: ''
        };

        expect(memberDetails.phone).toBe('');
        expect(memberDetails.email).toBe('');
    });
});

describe('Contact Display Format', () => {
    it('should display phone with emoji when provided', () => {
        const details = { phone: '555-123-4567', email: '' };
        const html = formatContactHtml(details);
        expect(html).toBe('📱 555-123-4567');
    });

    it('should display email with emoji when provided', () => {
        const details = { phone: '', email: 'john@example.com' };
        const html = formatContactHtml(details);
        expect(html).toBe('📧 john@example.com');
    });

    it('should display both phone and email when both provided', () => {
        const details = { phone: '555-123-4567', email: 'john@example.com' };
        const html = formatContactHtml(details);
        expect(html).toContain('📱 555-123-4567');
        expect(html).toContain('📧 john@example.com');
    });

    it('should fallback to old contact format for legacy data', () => {
        const details = { contact: 'john@example.com or 555-1234' };
        const html = formatContactHtml(details);
        expect(html).toBe('Contact: john@example.com or 555-1234');
    });

    it('should prefer new format over legacy contact field', () => {
        const details = {
            phone: '555-NEW-NUM',
            email: 'new@example.com',
            contact: 'old@example.com'  // legacy field should be ignored
        };
        const html = formatContactHtml(details);
        expect(html).toContain('📱 555-NEW-NUM');
        expect(html).toContain('📧 new@example.com');
        expect(html).not.toContain('old@example.com');
    });

    it('should return empty string when no contact info', () => {
        const details = { phone: '', email: '' };
        const html = formatContactHtml(details);
        expect(html).toBe('');
    });
});

describe('Invite Message Generation', () => {
    it('should include member name in greeting', () => {
        const message = getInviteMessage('John Smith', 'Midday Tennis', 'https://example.com', '1234');
        expect(message).toContain('Hi John Smith!');
    });

    it('should include group name', () => {
        const message = getInviteMessage('John', 'Tue/Thu Midday Doubles', 'https://example.com', '1234');
        expect(message).toContain('Tue/Thu Midday Doubles');
    });

    it('should include group URL', () => {
        const message = getInviteMessage('John', 'Tennis', 'https://tennis.app/?group=abc123', '1234');
        expect(message).toContain('https://tennis.app/?group=abc123');
    });

    it('should include PIN', () => {
        const message = getInviteMessage('John', 'Tennis', 'https://example.com', '5678');
        expect(message).toContain('PIN: 5678');
    });

    it('should include instructions', () => {
        const message = getInviteMessage('John', 'Tennis', 'https://example.com', '1234');
        expect(message).toContain('select your name');
        expect(message).toContain('check in');
    });
});

describe('Phone Number Cleaning', () => {
    it('should remove spaces from phone number', () => {
        expect(cleanPhoneNumber('555 123 4567')).toBe('5551234567');
    });

    it('should remove dashes from phone number', () => {
        expect(cleanPhoneNumber('555-123-4567')).toBe('5551234567');
    });

    it('should remove parentheses from phone number', () => {
        expect(cleanPhoneNumber('(555) 123-4567')).toBe('5551234567');
    });

    it('should handle phone numbers with country code', () => {
        expect(cleanPhoneNumber('+1 (555) 123-4567')).toBe('+15551234567');
    });

    it('should handle already clean numbers', () => {
        expect(cleanPhoneNumber('5551234567')).toBe('5551234567');
    });
});

describe('Invite Prompt Logic', () => {
    it('should show invite when phone is provided', () => {
        expect(shouldShowInvitePrompt('555-1234', '')).toBe(true);
    });

    it('should show invite when email is provided', () => {
        expect(shouldShowInvitePrompt('', 'john@example.com')).toBe(true);
    });

    it('should show invite when both are provided', () => {
        expect(shouldShowInvitePrompt('555-1234', 'john@example.com')).toBe(true);
    });

    it('should not show invite when neither is provided', () => {
        expect(shouldShowInvitePrompt('', '')).toBe(false);
    });

    it('should not show invite for null/undefined values', () => {
        expect(shouldShowInvitePrompt(null, null)).toBe(false);
        expect(shouldShowInvitePrompt(undefined, undefined)).toBe(false);
    });
});

describe('New Member Notification Message', () => {
    it('should format notification message correctly', () => {
        const memberName = 'John Smith';
        const addedBy = 'Alex';
        const message = `👋 ${memberName} was added to the group by ${addedBy}`;

        expect(message).toBe('👋 John Smith was added to the group by Alex');
    });
});

// ============================================
// SMS URL Generation Tests
// ============================================

// Helper to generate SMS URL (mirrors app logic)
function getSmsUrl(phone, message, isIOS = false) {
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    const encodedMessage = encodeURIComponent(message);
    return isIOS
        ? `sms:${cleanPhone}&body=${encodedMessage}`
        : `sms:${cleanPhone}?body=${encodedMessage}`;
}

// Helper to generate Email URL (mirrors app logic)
function getEmailUrl(email, subject, body) {
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

describe('SMS URL Generation', () => {
    it('should generate correct SMS URL for Android/desktop', () => {
        const url = getSmsUrl('555-123-4567', 'Hello', false);
        expect(url).toBe('sms:5551234567?body=Hello');
    });

    it('should generate correct SMS URL for iOS', () => {
        const url = getSmsUrl('555-123-4567', 'Hello', true);
        expect(url).toBe('sms:5551234567&body=Hello');
    });

    it('should clean phone number in URL', () => {
        const url = getSmsUrl('(555) 123-4567', 'Test', false);
        expect(url).toContain('sms:5551234567');
    });

    it('should encode message body', () => {
        const url = getSmsUrl('555-1234', 'Hello World!', false);
        expect(url).toContain('body=Hello%20World!');
    });

    it('should handle special characters in message', () => {
        const url = getSmsUrl('555-1234', 'Check: https://example.com?group=123', false);
        expect(url).toContain('body=Check');
        expect(url).toContain(encodeURIComponent('https://example.com?group=123'));
    });
});

describe('Email URL Generation', () => {
    it('should generate correct mailto URL', () => {
        const url = getEmailUrl('john@example.com', 'Hello', 'Message body');
        expect(url).toBe('mailto:john@example.com?subject=Hello&body=Message%20body');
    });

    it('should encode subject with special characters', () => {
        const url = getEmailUrl('test@test.com', "You're invited!", 'Body');
        expect(url).toContain("subject=You're%20invited!");
    });

    it('should encode body with newlines', () => {
        const url = getEmailUrl('test@test.com', 'Subject', 'Line 1\nLine 2');
        expect(url).toContain('body=Line%201%0ALine%202');
    });

    it('should handle URLs in body', () => {
        const url = getEmailUrl('test@test.com', 'Join us', 'Visit https://example.com');
        expect(url).toContain(encodeURIComponent('https://example.com'));
    });
});

// ============================================
// Member Validation Tests
// ============================================

// Helper to validate member name
function isValidMemberName(name) {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= 100;
}

// Helper to check for duplicate member
function isDuplicateMember(name, existingMembers) {
    const normalized = name.toLowerCase().trim();
    return existingMembers.some(m => m.toLowerCase().trim() === normalized);
}

// Helper to normalize name for storage keys
function normalizeName(name) {
    return name.toLowerCase().trim().replace(/\s+/g, ' ');
}

describe('Member Name Validation', () => {
    it('should accept valid names', () => {
        expect(isValidMemberName('John')).toBe(true);
        expect(isValidMemberName('John Smith')).toBe(true);
        expect(isValidMemberName('Mary Jane Watson')).toBe(true);
    });

    it('should reject empty names', () => {
        expect(isValidMemberName('')).toBe(false);
        expect(isValidMemberName('   ')).toBe(false);
    });

    it('should reject null/undefined', () => {
        expect(isValidMemberName(null)).toBe(false);
        expect(isValidMemberName(undefined)).toBe(false);
    });

    it('should reject very long names', () => {
        const longName = 'A'.repeat(101);
        expect(isValidMemberName(longName)).toBe(false);
    });

    it('should accept names with special characters', () => {
        expect(isValidMemberName("O'Brien")).toBe(true);
        expect(isValidMemberName('José García')).toBe(true);
    });
});

describe('Duplicate Member Detection', () => {
    const existingMembers = ['John Smith', 'Jane Doe', 'Bob Wilson'];

    it('should detect exact duplicates', () => {
        expect(isDuplicateMember('John Smith', existingMembers)).toBe(true);
    });

    it('should detect case-insensitive duplicates', () => {
        expect(isDuplicateMember('john smith', existingMembers)).toBe(true);
        expect(isDuplicateMember('JOHN SMITH', existingMembers)).toBe(true);
    });

    it('should detect duplicates with extra whitespace', () => {
        expect(isDuplicateMember('  John Smith  ', existingMembers)).toBe(true);
    });

    it('should allow new unique names', () => {
        expect(isDuplicateMember('Alice Cooper', existingMembers)).toBe(false);
    });
});

describe('Name Normalization', () => {
    it('should convert to lowercase', () => {
        expect(normalizeName('John Smith')).toBe('john smith');
    });

    it('should trim whitespace', () => {
        expect(normalizeName('  John Smith  ')).toBe('john smith');
    });

    it('should collapse multiple spaces', () => {
        expect(normalizeName('John    Smith')).toBe('john smith');
    });

    it('should handle single names', () => {
        expect(normalizeName('John')).toBe('john');
    });
});

// ============================================
// Activity Log Tests
// ============================================

// Helper to format activity log entry
function formatActivityEntry(action, playerName, details = {}) {
    const timestamp = details.timestamp || Date.now();
    const actor = details.addedBy || details.removedBy || 'Unknown';

    switch (action) {
        case 'member_added':
            return {
                type: 'member_added',
                message: `${playerName} was added to the group`,
                actor,
                timestamp
            };
        case 'member_removed':
            return {
                type: 'member_removed',
                message: `${playerName} was removed from the group`,
                actor,
                timestamp
            };
        case 'checkin':
            return {
                type: 'checkin',
                message: `${playerName} checked in`,
                actor,
                timestamp
            };
        default:
            return { type: action, message: `${playerName}: ${action}`, actor, timestamp };
    }
}

describe('Activity Log Formatting', () => {
    it('should format member_added correctly', () => {
        const entry = formatActivityEntry('member_added', 'John Smith', { addedBy: 'Alex' });
        expect(entry.type).toBe('member_added');
        expect(entry.message).toBe('John Smith was added to the group');
        expect(entry.actor).toBe('Alex');
    });

    it('should format member_removed correctly', () => {
        const entry = formatActivityEntry('member_removed', 'John Smith', { removedBy: 'Admin' });
        expect(entry.type).toBe('member_removed');
        expect(entry.message).toBe('John Smith was removed from the group');
        expect(entry.actor).toBe('Admin');
    });

    it('should format checkin correctly', () => {
        const entry = formatActivityEntry('checkin', 'Bob', { addedBy: 'Bob' });
        expect(entry.type).toBe('checkin');
        expect(entry.message).toBe('Bob checked in');
    });

    it('should include timestamp', () => {
        const now = Date.now();
        const entry = formatActivityEntry('checkin', 'Bob', { timestamp: now });
        expect(entry.timestamp).toBe(now);
    });
});

// ============================================
// Notification Tests
// ============================================

// Helper to determine notification eligibility
function shouldReceiveNotification(userName, prefs, notificationType, actorName) {
    // Don't notify the person who performed the action
    if (normalizeName(userName) === normalizeName(actorName)) {
        return false;
    }

    // Check if user has the notification type enabled
    switch (notificationType) {
        case 'activity':
            return prefs.activityAlerts === true;
        case 'match':
            return prefs.matchConfirmations === true;
        default:
            return false;
    }
}

describe('Notification Eligibility', () => {
    it('should not notify the actor themselves', () => {
        const prefs = { activityAlerts: true };
        expect(shouldReceiveNotification('Alex', prefs, 'activity', 'Alex')).toBe(false);
    });

    it('should notify users with activity alerts enabled', () => {
        const prefs = { activityAlerts: true };
        expect(shouldReceiveNotification('Bob', prefs, 'activity', 'Alex')).toBe(true);
    });

    it('should not notify users with activity alerts disabled', () => {
        const prefs = { activityAlerts: false };
        expect(shouldReceiveNotification('Bob', prefs, 'activity', 'Alex')).toBe(false);
    });

    it('should respect match confirmation preferences', () => {
        const prefsEnabled = { matchConfirmations: true };
        const prefsDisabled = { matchConfirmations: false };

        expect(shouldReceiveNotification('Bob', prefsEnabled, 'match', 'System')).toBe(true);
        expect(shouldReceiveNotification('Bob', prefsDisabled, 'match', 'System')).toBe(false);
    });

    it('should handle case-insensitive actor comparison', () => {
        const prefs = { activityAlerts: true };
        expect(shouldReceiveNotification('alex', prefs, 'activity', 'Alex')).toBe(false);
        expect(shouldReceiveNotification('ALEX', prefs, 'activity', 'alex')).toBe(false);
    });
});

// ============================================
// Check-in Notification Format Tests
// ============================================

// Helper to format check-in notification
function formatCheckinNotification(playerName, date, checkinData = {}, addedBy = null) {
    let details = [];

    if (checkinData.playStyle) {
        const styleLabel = checkinData.playStyle === 'singles' ? 'Singles' :
                          checkinData.playStyle === 'doubles' ? 'Doubles' : 'Either';
        details.push(styleLabel);
    }

    if (checkinData.timeStart || checkinData.timeEnd) {
        const timeStr = [checkinData.timeStart, checkinData.timeEnd].filter(Boolean).join(' - ');
        if (timeStr) details.push(timeStr);
    }

    let addedByStr = '';
    if (addedBy && normalizeName(addedBy) !== normalizeName(playerName)) {
        addedByStr = ` (added by ${addedBy})`;
    }

    const detailsStr = details.length > 0 ? ` [${details.join(', ')}]` : '';
    return `🎾 ${playerName} checked in for ${date}${detailsStr}${addedByStr}`;
}

describe('Check-in Notification Format', () => {
    it('should format basic check-in', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', {});
        expect(msg).toBe('🎾 John checked in for Dec 7');
    });

    it('should include play style', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', { playStyle: 'doubles' });
        expect(msg).toBe('🎾 John checked in for Dec 7 [Doubles]');
    });

    it('should include time range', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', { timeStart: '2:00 PM', timeEnd: '4:00 PM' });
        expect(msg).toBe('🎾 John checked in for Dec 7 [2:00 PM - 4:00 PM]');
    });

    it('should include both play style and time', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', {
            playStyle: 'singles',
            timeStart: '10:00 AM',
            timeEnd: '12:00 PM'
        });
        expect(msg).toBe('🎾 John checked in for Dec 7 [Singles, 10:00 AM - 12:00 PM]');
    });

    it('should show "added by" when different from player', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', {}, 'Alex');
        expect(msg).toBe('🎾 John checked in for Dec 7 (added by Alex)');
    });

    it('should not show "added by" when same as player', () => {
        const msg = formatCheckinNotification('John', 'Dec 7', {}, 'John');
        expect(msg).toBe('🎾 John checked in for Dec 7');
    });

    it('should handle Either play style', () => {
        const msg = formatCheckinNotification('Bob', 'Dec 8', { playStyle: 'both' });
        expect(msg).toBe('🎾 Bob checked in for Dec 8 [Either]');
    });
});
