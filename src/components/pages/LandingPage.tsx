import { signal } from '@preact/signals';
import { CreateGroupDrawer, openCreateGroupDrawer } from '../features/CreateGroupDrawer';
import { sport } from '../../config/sport';
import { getMyGroups, generateShareMessage, type StoredGroup } from '../../utils/myGroups';

// Signal to track which group's PINs are revealed
const revealedPins = signal<Record<string, boolean>>({});

// ============================================
// My Group Card Component
// ============================================

interface MyGroupCardProps {
  group: StoredGroup;
}

function MyGroupCard({ group }: MyGroupCardProps) {
  const isRevealed = revealedPins.value[group.groupId] || false;

  const togglePins = () => {
    revealedPins.value = {
      ...revealedPins.value,
      [group.groupId]: !isRevealed,
    };
  };

  const handleOpenGroup = () => {
    // Set session auth so PIN modal is skipped for creators
    if (group.role === 'creator') {
      sessionStorage.setItem(`pinAuth_${group.groupId}`, 'true');
      // Also set session user
      if (group.creatorName) {
        localStorage.setItem(`sessionUser_${group.groupId}`, group.creatorName);
      }
    }
    window.location.href = `/${group.shortCode}`;
  };

  const handleShare = () => {
    const message = generateShareMessage(group, sport.nameLower);
    // Try native share, fallback to clipboard
    if (navigator.share) {
      navigator.share({
        title: group.groupName,
        text: message,
      }).catch(() => {
        navigator.clipboard.writeText(message);
      });
    } else {
      navigator.clipboard.writeText(message);
    }
  };

  return (
    <div class="my-group-card">
      <div class="my-group-header">
        <h3 class="my-group-name">{group.groupName}</h3>
        <span class="my-group-role">
          {group.role === 'creator' ? 'Admin' : 'Member'}
        </span>
      </div>

      {/* PINs section - hidden by default */}
      <div class="my-group-pins">
        <div class="pins-toggle-row">
          <span class="pins-label">
            {isRevealed ? 'PINs' : 'PINs hidden'}
          </span>
          <button class="pins-toggle-btn" onClick={togglePins}>
            {isRevealed ? 'Hide' : 'Show'}
          </button>
        </div>
        {isRevealed && (
          <div class="pins-revealed">
            <div class="pin-row">
              <span class="pin-type">Group PIN</span>
              <span class="pin-value">{group.groupPin}</span>
            </div>
            {group.adminPin && (
              <div class="pin-row">
                <span class="pin-type">Admin PIN</span>
                <span class="pin-value">{group.adminPin}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div class="my-group-actions">
        <button class="my-group-btn share" onClick={handleShare}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
          </svg>
          Share
        </button>
        <button class="my-group-btn open" onClick={handleOpenGroup}>
          Open Group
        </button>
      </div>
    </div>
  );
}

// ============================================
// Landing Page Component
// ============================================

export function LandingPage() {
  // Sport-specific content
  const content = {
    tagline: `Turn your love for ${sport.nameLower} into more games.`,
    subtitle: `No more "Who can play?" texts. Just check in and play.`,
    playersTitle: `Why ${sport.name} Players Love It`,
    stepFourText: sport.tagline,
    formatText: sport.matchFormats.singles.enabled
      ? `${sport.terms.doubles}, ${sport.terms.singles.toLowerCase()}, any number.`
      : `${sport.terms.doubles}, any number.`,
  };

  // Render sport icon (SVG) or fallback to emoji
  const SportIcon = () => {
    if (sport.sportIcon) {
      return <img src={sport.sportIcon} alt={sport.name} class="hero-icon-img" />;
    }
    return <span>{sport.sportEmoji}</span>;
  };

  // Get user's stored groups
  const myGroups = getMyGroups();

  return (
    <div class="landing-page">
      <div class="landing-container">
        <div class="landing-hero">
          <div class="hero-logo"><SportIcon /></div>
          <p class="landing-tagline">{content.tagline}</p>
          <p class="landing-subtitle">{content.subtitle}</p>
          <div class="trust-bar">
            <span>No app to download</span>
            <span>No account needed</span>
            <span>Free forever</span>
          </div>
        </div>

        {/* Your Groups Section - only show if user has groups */}
        {myGroups.length > 0 && (
          <div class="landing-section my-groups-section">
            <h2>Your Groups</h2>
            <div class="my-groups-list">
              {myGroups.map((group) => (
                <MyGroupCard key={group.groupId} group={group} />
              ))}
            </div>
          </div>
        )}

        <div class="landing-section landing-section-alt">
          <h2>How It Works</h2>
          <div class="landing-steps">
            <div class="step-item">
              <span class="step-number">1</span>
              <div>
                <strong>Create a Group</strong>
                <span>30 seconds. Share the link.</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <div>
                <strong>Check In</strong>
                <span>Tap your name. Say when you can play.</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <div>
                <strong>Games Form</strong>
                <span>You'll know when you have a {sport.terms.match}.</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">4</span>
              <div>
                <strong>Play</strong>
                <span>{content.stepFourText}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-cta">
          <button class="start-group-btn" onClick={openCreateGroupDrawer}>
            Start Your Group
          </button>
          <p class="cta-secondary">
            Free forever. 30 seconds to set up.
          </p>
        </div>

        <div class="landing-section">
          <h2>{content.playersTitle}</h2>
          <div class="landing-features">
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <div>
                <strong>No One Has to Organize</strong>
                <span>Everyone checks in themselves.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <div>
                <strong>Always Know Who's In</strong>
                <span>See instantly when you have a {sport.terms.match}.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <div>
                <strong>Plans Change? No Problem</strong>
                <span>Changes reach everyone instantly.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">✓</span>
              <div>
                <strong>Any Format Works</strong>
                <span>{content.formatText}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-footer">
          <a href="whats-new.html" class="whatsnew-link">
            What's New
          </a>
          <span class="footer-note">
            Already have a group? Just visit your link to join.
          </span>
        </div>
      </div>

      {/* Create Group Drawer */}
      <CreateGroupDrawer />

      <style>{`
        /* My Groups Section */
        .my-groups-section {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .my-groups-section h2 {
          font-size: 18px;
          color: #333;
          margin: 0 0 16px 0;
        }

        .my-groups-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .my-group-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          border: 1px solid #e9ecef;
        }

        .my-group-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .my-group-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .my-group-role {
          font-size: 11px;
          padding: 3px 8px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border-radius: 10px;
          font-weight: 500;
        }

        .my-group-pins {
          background: #fff;
          border-radius: 8px;
          padding: 10px 12px;
          margin-bottom: 12px;
          border: 1px solid #e9ecef;
        }

        .pins-toggle-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pins-label {
          font-size: 13px;
          color: #666;
        }

        .pins-toggle-btn {
          padding: 4px 10px;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 12px;
          color: #666;
          cursor: pointer;
        }

        .pins-toggle-btn:hover {
          background: #f5f5f5;
        }

        .pins-revealed {
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #eee;
        }

        .pin-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0;
        }

        .pin-type {
          font-size: 12px;
          color: #888;
        }

        .pin-value {
          font-family: monospace;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          letter-spacing: 1px;
        }

        .my-group-actions {
          display: flex;
          gap: 8px;
        }

        .my-group-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px 12px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .my-group-btn.open {
          background: var(--color-primary, #2C6E49);
          color: white;
          flex: 2;
        }

        .my-group-btn.open:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .my-group-btn.share {
          background: #e9ecef;
          color: #495057;
        }

        .my-group-btn.share:hover {
          background: #dee2e6;
        }

        .start-group-btn {
          display: inline-block;
          margin: 0 0 12px 0;
          padding: 16px 36px;
          background: white;
          color: #2C6E49;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .start-group-btn:hover {
          background: #f5f5f5;
          transform: translateY(-2px);
          box-shadow:
            0 6px 16px rgba(0, 0, 0, 0.2),
            0 0 20px rgba(212, 225, 87, 0.3);
        }

        .cta-secondary {
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
