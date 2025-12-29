/**
 * ClubsLandingPage - Landing page for clubs/organizations
 *
 * Pitch page for club dashboard at sportsconnector.com/#clubs
 */

import { JSX } from 'preact';
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
    icon: 'chart',
    title: 'Increase Court Usage',
    description: 'Members find partners in minutes, not days. Less empty courts, more games played.',
  },
  {
    icon: 'users',
    title: 'Boost Member Retention',
    description: 'Active members stay longer. Give them frictionless ways to play and connect.',
  },
  {
    icon: 'user-plus',
    title: 'Integrate New Members',
    description: 'Help newcomers find their group fast. Social connection drives long-term loyalty.',
  },
  {
    icon: 'trending',
    title: 'Grow Ancillary Revenue',
    description: 'More court visits mean more F&B, pro shop, and lesson bookings.',
  },
];

function BenefitIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    chart: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M18 9l-5 5-4-4-6 6" />
      </svg>
    ),
    users: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    'user-plus': (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    trending: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  };
  return icons[type] || null;
}

const steps = [
  {
    number: '1',
    title: 'Members share a simple link',
    description: 'No app downloads. No accounts. Works on any phone in seconds.',
  },
  {
    number: '2',
    title: 'They check in when available',
    description: 'Members indicate when they can play. Matches form automatically.',
  },
  {
    number: '3',
    title: 'You see engagement across locations',
    description: 'Track activity, identify your most engaged members, spot trends.',
  },
];

export function ClubsLandingPage() {
  const handleGetStarted = () => {
    showContactForm.value = true;
    setTimeout(() => {
      document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div class="clubs-landing">
      <style>{styles}</style>

      {/* Hero */}
      <section class="hero">
        <div class="hero-inner">
          <div class="hero-content">
            <div class="hero-badge">For Clubs & Organizations</div>
            <h1 class="hero-title">
              More Games. Happier Members. Higher Revenue.
            </h1>
            <p class="hero-subtitle">
              Sports Connector helps members find partners and organize matches in minutes.
              Remove coordination friction to drive usage, retention, and revenue.
            </p>
            <button class="hero-cta" onClick={handleGetStarted}>
              Schedule a Demo
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <p class="hero-note">Live in 24 hours · No app downloads for members</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section class="benefits">
        <div class="section-header">
          <h2>Usage drives retention. Retention drives revenue.</h2>
          <p>When members play more, they stay longer and spend more</p>
        </div>
        <div class="benefits-grid">
          {benefits.map((benefit) => (
            <div key={benefit.title} class="benefit-card">
              <div class="benefit-header">
                <div class="benefit-icon">
                  <BenefitIcon type={benefit.icon} />
                </div>
                <h3>{benefit.title}</h3>
              </div>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section class="how-it-works">
        <div class="section-header">
          <h2>How it works</h2>
          <p>Zero friction for members, full visibility for you</p>
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
          <h2>Ready to drive more court usage?</h2>
          <p>Let's talk about how Sports Connector can help your members play more.</p>
          {!showContactForm.value ? (
            <button class="cta-btn" onClick={() => { showContactForm.value = true; }}>
              Schedule a Demo
            </button>
          ) : (
            <ContactForm />
          )}
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <p>© {new Date().getFullYear()} Sports Connector</p>
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

  /* Hero */
  .hero {
    background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%);
    color: white;
    padding: 80px 24px 96px;
    position: relative;
    overflow: hidden;
    text-align: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    background:
      radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 40%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%),
      radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.2) 0%, transparent 30%);
    pointer-events: none;
    animation: shimmer 20s ease-in-out infinite;
  }

  @keyframes shimmer {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(2%, 2%) rotate(1deg); }
  }

  .hero-inner {
    position: relative;
    max-width: 680px;
    margin: 0 auto;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    font-size: clamp(32px, 8vw, 56px);
    font-weight: 700;
    color: white;
    margin: 0 0 24px;
    letter-spacing: -0.02em;
    line-height: 1.1;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
  }

  .hero-subtitle {
    font-size: clamp(16px, 2.5vw, 18px);
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    margin: 0 0 32px;
    line-height: 1.6;
    max-width: 520px;
  }

  .hero-cta {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: white;
    color: #0f766e;
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

  .hero-note {
    margin: 16px 0 0;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 500;
  }

  /* Benefits */
  .benefits {
    padding: 56px 24px;
    max-width: 1000px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 36px;
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
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
  }

  .benefit-card {
    background: white;
    border-radius: 14px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    transition: all 0.2s;
  }

  .benefit-card:hover {
    border-color: #cbd5e1;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  }

  .benefit-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
  }

  .benefit-icon {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #0f766e 0%, #115e59 100%);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }

  .benefit-icon svg {
    width: 18px;
    height: 18px;
  }

  .benefit-card h3 {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a2e;
    margin: 0;
  }

  .benefit-card p {
    font-size: 14px;
    color: #64748b;
    margin: 0;
    line-height: 1.5;
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
