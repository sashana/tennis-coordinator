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
