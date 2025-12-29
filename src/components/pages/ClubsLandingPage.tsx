/**
 * ClubsLandingPage - Landing page for clubs/organizations
 *
 * Pitch page for club dashboard at sportsconnector.com/#clubs
 */

import { useState } from 'preact/hooks';
import { signal } from '@preact/signals';
import { getDatabase } from '../../config/firebase';

const showContactForm = signal(false);
const formSubmitted = signal(false);

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [clubName, setClubName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const db = getDatabase();
      const requestRef = db.ref('contactRequests').push();
      await requestRef.set({
        type: 'club-inquiry',
        name,
        email,
        clubName,
        message,
        createdAt: Date.now(),
        status: 'new',
      });
      formSubmitted.value = true;
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted.value) {
    return (
      <div class="form-success">
        <div class="success-icon">✓</div>
        <h3>Thanks for reaching out!</h3>
        <p>We'll be in touch within 24 hours to discuss how Sports Connector can help your club.</p>
        <button class="btn-secondary" onClick={() => { formSubmitted.value = false; showContactForm.value = false; }}>
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} class="contact-form">
      <div class="form-row">
        <div class="form-field">
          <label for="name">Your Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="Jane Smith"
            required
          />
        </div>
        <div class="form-field">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            placeholder="jane@bayclub.com"
            required
          />
        </div>
      </div>
      <div class="form-field">
        <label for="clubName">Club / Organization Name</label>
        <input
          id="clubName"
          type="text"
          value={clubName}
          onInput={(e) => setClubName((e.target as HTMLInputElement).value)}
          placeholder="Bay Club"
          required
        />
      </div>
      <div class="form-field">
        <label for="message">Tell us about your needs (optional)</label>
        <textarea
          id="message"
          value={message}
          onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
          placeholder="Number of locations, sports offered, current challenges..."
          rows={4}
        />
      </div>
      <button type="submit" class="btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Get Started'}
      </button>
    </form>
  );
}

const benefits = [
  {
    icon: '🏢',
    title: 'Multi-Location View',
    description: 'See all groups across every club location in one unified dashboard. No more juggling spreadsheets.',
  },
  {
    icon: '📊',
    title: 'Engagement Insights',
    description: 'Track check-ins, games played, and player activity. Know who your most engaged members are.',
  },
  {
    icon: '📅',
    title: 'Activity Patterns',
    description: 'Understand which days are busiest, what game types are popular, and optimize court scheduling.',
  },
  {
    icon: '📱',
    title: 'No App Required',
    description: 'Members use a simple web link. Works on any phone, no downloads, no accounts to create.',
  },
];

const steps = [
  {
    number: '1',
    title: 'We set up your organization',
    description: 'Share your locations and structure. We configure everything.',
  },
  {
    number: '2',
    title: 'Invite staff with scoped access',
    description: 'Tennis directors see their locations. Regional managers see everything.',
  },
  {
    number: '3',
    title: 'See insights from day one',
    description: 'Groups using Sports Connector automatically appear in your dashboard.',
  },
];

export function ClubsLandingPage() {
  const handleBackClick = () => {
    window.location.hash = '';
  };

  const handleGetStarted = () => {
    showContactForm.value = true;
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div class="clubs-landing">
      <style>{styles}</style>

      {/* Navigation */}
      <nav class="nav">
        <button class="back-link" onClick={handleBackClick}>
          <span class="back-arrow">←</span>
          <span>Sports Connector</span>
        </button>
      </nav>

      {/* Hero */}
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">For Clubs & Organizations</div>
          <h1 class="hero-title">
            <span class="title-line">Manage Your Club's</span>
            <span class="title-line">Racket Sports Groups</span>
          </h1>
          <p class="hero-subtitle">
            One dashboard to see activity across all your locations and groups.
            Built for tennis directors, club managers, and regional coordinators.
          </p>
          <button class="hero-cta" onClick={handleGetStarted}>
            Get Started
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="hero-visual">
          <div class="dashboard-preview">
            <div class="preview-header">
              <div class="preview-dot" />
              <div class="preview-dot" />
              <div class="preview-dot" />
            </div>
            <div class="preview-content">
              <div class="preview-stat">
                <span class="stat-value">847</span>
                <span class="stat-label">Members</span>
              </div>
              <div class="preview-stat">
                <span class="stat-value">2,341</span>
                <span class="stat-label">Games</span>
              </div>
              <div class="preview-stat">
                <span class="stat-value">12</span>
                <span class="stat-label">Groups</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section class="benefits">
        <div class="section-header">
          <h2>Why clubs choose Sports Connector</h2>
          <p>Everything you need to understand and grow racket sports engagement</p>
        </div>
        <div class="benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} class="benefit-card">
              <div class="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section class="how-it-works">
        <div class="section-header">
          <h2>Get started in days, not months</h2>
          <p>We handle the setup so you can focus on your members</p>
        </div>
        <div class="steps">
          {steps.map((step) => (
            <div key={step.number} class="step">
              <div class="step-number">{step.number}</div>
              <div class="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Contact */}
      <section class="cta-section" id="contact-section">
        <div class="cta-content">
          <h2>Ready to see your club's activity?</h2>
          <p>Tell us about your organization and we'll show you what's possible.</p>
          {!showContactForm.value ? (
            <button class="cta-btn" onClick={() => { showContactForm.value = true; }}>
              Contact Us
            </button>
          ) : (
            <ContactForm />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <p>© {new Date().getFullYear()} Sports Connector. Less texting, more playing.</p>
      </footer>
    </div>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700;800&display=swap');

  .clubs-landing {
    min-height: 100vh;
    background: #fafbfc;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1a1a2e;
    -webkit-font-smoothing: antialiased;
  }

  /* Navigation */
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px 24px;
    z-index: 10;
  }

  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-link:hover {
    background: rgba(255, 255, 255, 0.25);
  }

  .back-arrow {
    font-size: 16px;
  }

  /* Hero */
  .hero {
    background: linear-gradient(135deg, #0d5c63 0%, #0a4a50 50%, #083d42 100%);
    color: white;
    padding: 100px 24px 80px;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.15) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 40%);
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }

  .hero-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.9);
    font-size: 13px;
    font-weight: 600;
    padding: 6px 14px;
    border-radius: 20px;
    margin-bottom: 24px;
    letter-spacing: 0.02em;
  }

  .hero-title {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(32px, 7vw, 52px);
    font-weight: 700;
    color: white;
    margin: 0 0 20px;
    letter-spacing: -0.02em;
    line-height: 1.15;
  }

  .title-line {
    display: block;
  }

  .hero-subtitle {
    font-size: clamp(16px, 2.5vw, 18px);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 32px;
    line-height: 1.6;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: white;
    color: #0d5c63;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 28px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  .hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  .hero-visual {
    display: none;
  }

  @media (min-width: 900px) {
    .hero {
      padding: 120px 48px 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 80px;
    }

    .hero-content {
      text-align: left;
      margin: 0;
    }

    .hero-visual {
      display: block;
      flex-shrink: 0;
    }

    .dashboard-preview {
      width: 340px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    .preview-header {
      display: flex;
      gap: 6px;
      padding: 12px 16px;
      background: rgba(0, 0, 0, 0.2);
    }

    .preview-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }

    .preview-content {
      padding: 24px;
      display: flex;
      justify-content: space-between;
    }

    .preview-stat {
      text-align: center;
    }

    .stat-value {
      display: block;
      font-family: 'Fraunces', Georgia, serif;
      font-size: 28px;
      font-weight: 700;
      color: white;
    }

    .stat-label {
      display: block;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  /* Benefits */
  .benefits {
    padding: 72px 24px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-header h2 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 12px;
  }

  .section-header p {
    font-size: 16px;
    color: #64748b;
    margin: 0;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
  }

  .benefit-card {
    background: white;
    border-radius: 16px;
    padding: 28px 24px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s;
  }

  .benefit-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .benefit-icon {
    font-size: 32px;
    margin-bottom: 16px;
  }

  .benefit-card h3 {
    font-size: 17px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 8px;
  }

  .benefit-card p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.6;
  }

  /* How it works */
  .how-it-works {
    padding: 72px 24px;
    background: #f1f5f9;
  }

  .steps {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .step {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    background: white;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
  }

  .step-number {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #0d5c63, #0a4a50);
    color: white;
    font-family: 'Fraunces', Georgia, serif;
    font-size: 18px;
    font-weight: 700;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .step-content h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0 0 6px;
  }

  .step-content p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
  }

  /* CTA Section */
  .cta-section {
    padding: 80px 24px;
    background: linear-gradient(135deg, #0d5c63 0%, #0a4a50 100%);
    text-align: center;
  }

  .cta-content {
    max-width: 500px;
    margin: 0 auto;
  }

  .cta-content h2 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 700;
    color: white;
    margin: 0 0 12px;
  }

  .cta-content p {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 32px;
  }

  .cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: white;
    color: #0d5c63;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    padding: 14px 32px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
  }

  .cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  /* Contact Form */
  .contact-form {
    background: white;
    border-radius: 16px;
    padding: 32px;
    text-align: left;
    max-width: 480px;
    margin: 0 auto;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  @media (max-width: 500px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  .form-field {
    margin-bottom: 20px;
  }

  .form-field label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
  }

  .form-field input,
  .form-field textarea {
    width: 100%;
    padding: 12px 14px;
    font-family: inherit;
    font-size: 15px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #f9fafb;
    transition: all 0.15s;
    box-sizing: border-box;
  }

  .form-field input:focus,
  .form-field textarea:focus {
    outline: none;
    border-color: #0d5c63;
    background: white;
    box-shadow: 0 0 0 3px rgba(13, 92, 99, 0.1);
  }

  .form-field input::placeholder,
  .form-field textarea::placeholder {
    color: #9ca3af;
  }

  .form-field textarea {
    resize: vertical;
    min-height: 100px;
  }

  .btn-primary {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #0d5c63, #0a4a50);
    color: white;
    font-family: inherit;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(13, 92, 99, 0.3);
  }

  .btn-primary:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* Form Success */
  .form-success {
    background: white;
    border-radius: 16px;
    padding: 40px 32px;
    text-align: center;
    max-width: 400px;
    margin: 0 auto;
  }

  .success-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    font-size: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
  }

  .form-success h3 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 22px;
    font-weight: 700;
    color: #1a1a2e;
    margin: 0 0 12px;
  }

  .form-success p {
    font-size: 15px;
    color: #64748b;
    margin: 0 0 24px;
    line-height: 1.6;
  }

  .btn-secondary {
    padding: 12px 24px;
    background: #f1f5f9;
    color: #475569;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .btn-secondary:hover {
    background: #e2e8f0;
  }

  /* Footer */
  .footer {
    padding: 32px 24px;
    text-align: center;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
  }

  .footer p {
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
  }
`;

export default ClubsLandingPage;
