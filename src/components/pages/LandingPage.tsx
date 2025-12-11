export function LandingPage() {
  return (
    <div class="landing-page">
      <div class="landing-container">
        <h1>🎾 Tennis Coordinator</h1>
        <p class="landing-tagline">Turn your love for tennis into more games.</p>
        <p class="landing-subtitle">
          A simple tool that helps tennis groups self-organize matches with minimal
          friction—so you spend less time coordinating and more time on the court.
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
                <strong>Adaptable</strong>
                <span>Works for tight-knit groups of 20 or club communities of 50+.</span>
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
                <strong>Check In</strong>
                <span>Select your name, play style, and when you're available</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">2</span>
              <div>
                <strong>Auto-Match</strong>
                <span>System organizes matches based on who's playing</span>
              </div>
            </div>
            <div class="step-item">
              <span class="step-number">3</span>
              <div>
                <strong>Play</strong>
                <span>Show up and enjoy the game</span>
              </div>
            </div>
          </div>
        </div>

        <div class="landing-cta">
          <p>
            To access your tennis group, visit your group's unique URL or contact
            your group admin for the link.
          </p>
        </div>

        <div class="landing-footer">
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
    </div>
  );
}
