import { CreateGroupDrawer, openCreateGroupDrawer } from '../features/CreateGroupDrawer';
import { sport } from '../../config/sport';

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
          <a
            href="#admin"
            class="admin-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'admin';
              window.location.reload();
            }}
          >
            Admin
          </a>
        </div>
      </div>

      {/* Create Group Drawer */}
      <CreateGroupDrawer />

      <style>{`
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
