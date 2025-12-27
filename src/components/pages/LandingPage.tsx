import { CreateGroupDrawer, openCreateGroupDrawer } from '../features/CreateGroupDrawer';

export function LandingPage() {
  return (
    <div class="landing-page">
      <div class="landing-container">
        <h1>🎾 Tennis Coordinator</h1>
        <p class="landing-tagline">Turn your love for tennis into more games.</p>
        <p class="landing-subtitle">
          A simple tool that helps tennis groups self-organize matches with minimal friction—so you
          spend less time coordinating and more time on the court.
        </p>

        <div class="landing-section">
          <h2>Why It Works</h2>
          <div class="landing-features">
            <div class="feature-item">
              <span class="feature-icon">♦</span>
              <div>
                <strong>Frictionless</strong>
                <span>Check in with a few taps. No accounts, no apps to download.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">♦</span>
              <div>
                <strong>Flexible</strong>
                <span>Handles doubles, singles, odd numbers, guests, and preferences.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">♦</span>
              <div>
                <strong>For Any Group</strong>
                <span>Start with your regular doubles crew. Scale to club-wide coordination when ready.</span>
              </div>
            </div>
            <div class="feature-item">
              <span class="feature-icon">♦</span>
              <div>
                <strong>Real-Time</strong>
                <span>Everyone sees who's playing instantly.</span>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-section landing-section-alt">
          <h2>How It Works</h2>
          <div class="landing-steps">
            <div class="step-item">
              <span class="step-number">1</span>
              <div>
                <strong>Create a Group</strong>
                <span>Get a shareable link in 30 seconds</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <div>
                <strong>Check In</strong>
                <span>Select your name, play style, and when you're available</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <div>
                <strong>Auto-Match</strong>
                <span>System organizes matches based on who's playing</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">4</span>
              <div>
                <strong>Play</strong>
                <span>Show up and enjoy the game</span>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-cta">
          <p class="cta-headline">Ready to organize your crew?</p>
          <button class="start-group-btn" onClick={openCreateGroupDrawer}>
            Start Your Group
          </button>
          <p class="cta-secondary">
            Already have a group link? Just visit your URL to join.
          </p>
        </div>

        <div class="landing-footer">
          <a href="whats-new.html" class="whatsnew-link">
            What's New
          </a>
          <span class="footer-separator">|</span>
          <a
            href="#admin"
            class="admin-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'admin';
              window.location.reload();
            }}
          >
            Site Administrator? Access Site Admin →
          </a>
        </div>
      </div>

      {/* Create Group Drawer */}
      <CreateGroupDrawer />

      <style>{`
        .cta-headline {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
        }

        .start-group-btn {
          display: inline-block;
          margin: 0 0 16px 0;
          padding: 16px 32px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(44, 110, 73, 0.25);
        }

        .start-group-btn:hover {
          background: var(--color-primary-dark, #1a402b);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(44, 110, 73, 0.3);
        }

        .cta-secondary {
          color: #666;
          font-size: 14px;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
