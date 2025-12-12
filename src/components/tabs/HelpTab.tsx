import { currentGroupName } from '../App';
import { groupSettings } from '../../hooks/useFirebase';

export function HelpTab() {
  const groupDescription = groupSettings.value.groupDescription;
  const groupRules = groupSettings.value.groupRules;
  const hasGroupInfo = groupDescription || groupRules;

  const sections = [
    {
      title: 'Getting Started',
      icon: '🎾',
      content: [
        'When you first open the app, you\'ll be asked to select your name from the member list.',
        'Use the date selector to pick the day you want to play.',
        'Check in by selecting your game preference and optionally setting your available times.',
      ],
    },
    {
      title: 'Check-in Options',
      icon: '✅',
      content: [
        'Doubles - You want to play doubles games (4 players).',
        'Singles - You want to play singles games (2 players).',
        'Both - You\'re flexible and happy to play either format.',
        'Rotation - Enable this option to join 3-player rotation games where players take turns.',
        'Time Range - Set your earliest and latest available times to help coordinate.',
      ],
    },
    {
      title: 'Game Types',
      icon: '👥',
      content: [
        'Doubles (green) - A confirmed 4-player doubles game.',
        'Singles (green) - A confirmed 2-player singles game.',
        'Rotation (green) - A confirmed 3-player game with rotating play.',
        'Forming (yellow) - A game that needs more players to be complete.',
      ],
    },
    {
      title: 'My Games',
      icon: '📅',
      content: [
        'View all your upcoming games across all dates at a glance.',
        'Tap any game card to jump directly to that day\'s check-in page.',
        'Yellow background indicates the game is still forming and needs more players.',
        'Green background means the game is confirmed and ready to play.',
      ],
    },
    {
      title: 'Alerts',
      icon: '🔔',
      content: [
        'Get notified when games are formed or when players join/leave.',
        'Unread alerts show a red badge with the count on the tab.',
        'Tap a notification to mark it as read.',
        'Access notification settings to configure your preferences.',
      ],
    },
    {
      title: 'Profile',
      icon: '👤',
      content: [
        'Access your profile by tapping your name badge in the top-right corner.',
        'Edit your display name, phone number, and email address.',
        'Change your user session to switch to a different account.',
        'Admin login is available for group administrators.',
      ],
    },
    {
      title: 'Tips',
      icon: '💡',
      content: [
        'Check in early to get matched with your preferred players.',
        'Select "Both" if you\'re flexible - it increases your chances of getting a game.',
        'Set your time preferences to help organizers coordinate scheduling.',
        'Enable rotation if you\'re open to 3-player games.',
      ],
    },
    {
      title: 'Admin Features',
      icon: '⚙️',
      content: [
        'Access admin mode via Admin Login in your Profile page.',
        'Manage Members - Add, edit, or remove group members.',
        'Group Settings - Configure group name, PINs, weather location, story, and rules.',
        'Activity History - View all check-ins and changes with option to delete test data.',
        'Group Insights - View game stats, player activity trends, and analytics.',
      ],
    },
  ];

  // Parse rules into list items (split by newlines)
  const rulesList = groupRules
    ? groupRules.split('\n').filter((line: string) => line.trim())
    : [];

  return (
    <div style="padding: 16px 0;">
      {/* Group Info Section - shown if admin has configured it */}
      {hasGroupInfo && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style="margin: 0 0 16px 0; font-size: 20px;">
            About {currentGroupName.value}
          </h2>

          {/* Group Story */}
          {groupDescription && (
            <div
              style={{
                background: '#E8F5E9',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #C8E6C9',
                marginBottom: '12px',
              }}
            >
              <h3 style="margin: 0 0 8px 0; font-size: 15px; color: #2E7D32; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#4CAF50">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
                Our Story
              </h3>
              <p style="margin: 0; color: #333; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">
                {groupDescription}
              </p>
            </div>
          )}

          {/* Group Rules */}
          {rulesList.length > 0 && (
            <div
              style={{
                background: '#FFF8E1',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid #FFECB3',
              }}
            >
              <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #F57C00; display: flex; align-items: center; gap: 8px;">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#FF9800">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Rules & Tips
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #333; font-size: 14px; line-height: 1.6;">
                {rulesList.map((rule: string, i: number) => (
                  <li key={i} style="margin-bottom: 6px;">{rule}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* User Guide Section */}
      <h2 style="margin: 0 0 16px 0; font-size: 20px;">User Guide</h2>

      <div style="display: flex; flex-direction: column; gap: 16px;">
        {sections.map((section, idx) => (
          <div
            key={idx}
            style={{
              background: '#f9f9f9',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid #e0e0e0',
            }}
          >
            <h3 style="margin: 0 0 12px 0; font-size: 16px; display: flex; align-items: center; gap: 8px;">
              <span>{section.icon}</span>
              <span>{section.title}</span>
            </h3>
            <ul style="margin: 0; padding-left: 20px; color: #555; font-size: 14px; line-height: 1.6;">
              {section.content.map((item, i) => (
                <li key={i} style="margin-bottom: 4px;">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p style="font-size: 13px; color: #888; text-align: center; margin-top: 20px;">
        Need more help? Contact your group administrator.
      </p>
    </div>
  );
}
