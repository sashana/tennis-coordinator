/**
 * HubLandingPage - Sports Connector portal landing page
 *
 * Hub site that showcases live sports and allows users to request new sports.
 */

import { signal } from '@preact/signals';
import { useState, useEffect } from 'preact/hooks';
import { getDatabase } from '../../config/firebase';

// Modal state
const showContactModal = signal(false);
const contactFormType = signal<'request' | 'contact'>('contact');

// Admin state
const showAdminPanel = signal(false);
const isAdminAuthenticated = signal(false);

interface ContactRequest {
  id: string;
  type: 'request' | 'contact';
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: number;
  status?: 'new' | 'read' | 'handled';
}

interface SportCardData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  url: string;
  description: string;
  playerCount: string;
}

// Only live, supported sports
const liveSports: SportCardData[] = [
  {
    id: 'tennis',
    name: 'Tennis',
    emoji: '🎾',
    color: '#2c6e49',
    url: 'https://tennis.sportsconnector.com',
    description: 'Coordinate doubles and singles with your regular playing group',
    playerCount: '',
  },
  {
    id: 'pickleball',
    name: 'Pickleball',
    emoji: '🟡',
    color: '#16a34a',
    url: 'https://pickleball.sportsconnector.com',
    description: 'Organize games and rotate players at your courts',
    playerCount: '',
  },
];

const steps = [
  {
    number: '1',
    title: 'Create your group',
    description: 'Name it, add members, set location. 30 seconds.',
  },
  {
    number: '2',
    title: 'Share the link',
    description: 'One link for everyone. Works on any phone.',
  },
  {
    number: '3',
    title: 'Check in to play',
    description: 'Members check in. Matches form automatically.',
  },
];

function SportCard({ sport }: { sport: SportCardData }) {
  const handleClick = () => {
    window.open(sport.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      class="sport-card"
      style={{ '--card-color': sport.color } as any}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div class="sport-card-accent" />
      <div class="sport-card-content">
        <div class="sport-header">
          <span class="sport-emoji">{sport.emoji}</span>
        </div>
        <h3 class="sport-name">{sport.name}</h3>
        <p class="sport-description">{sport.description}</p>
        {sport.playerCount && (
          <div class="sport-meta">
            <span class="player-count">{sport.playerCount}</span>
          </div>
        )}
      </div>
      <div class="sport-card-footer">
        <span class="launch-text">Go to {sport.name}</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M4.5 11.5L11.5 4.5M11.5 4.5H6M11.5 4.5V10"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

function ContactFormModal() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isRequest = contactFormType.value === 'request';

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const db = getDatabase();
      await db.ref('contactRequests').push({
        type: contactFormType.value,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        createdAt: Date.now(),
        notifyEmail: 'sashana007@gmail.com',
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    showContactModal.value = false;
    // Reset form after close animation
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 300);
  };

  if (!showContactModal.value) return null;

  return (
    <div class="modal-overlay" onClick={handleClose}>
      <div class="modal-content" onClick={(e) => e.stopPropagation()}>
        <button class="modal-close" onClick={handleClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div class="modal-success">
            <div class="success-icon">✓</div>
            <h3>Thank you!</h3>
            <p>We'll be in touch soon.</p>
            <button class="modal-btn" onClick={handleClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 class="modal-title">
              {isRequest ? 'Request Your Sport' : 'Contact Us'}
            </h2>
            <p class="modal-subtitle">
              {isRequest
                ? "Tell us about your sport and we'll see how we can help."
                : "Have a question or feedback? We'd love to hear from you."}
            </p>

            <form onSubmit={handleSubmit} class="contact-form">
              <div class="form-field">
                <label for="name">Name *</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onInput={(e) => setName((e.target as HTMLInputElement).value)}
                  placeholder="Your name"
                  required
                />
              </div>

              <div class="form-field">
                <label for="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div class="form-field">
                <label for="phone">Phone (optional)</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onInput={(e) => setPhone((e.target as HTMLInputElement).value)}
                  placeholder="(555) 123-4567"
                />
              </div>

              <div class="form-field">
                <label for="message">
                  {isRequest ? 'Tell us about your sport & group' : 'Message'}
                </label>
                <textarea
                  id="message"
                  value={message}
                  onInput={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
                  placeholder={
                    isRequest
                      ? "What sport do you play? How many people are in your group? Where are you located?"
                      : "How can we help?"
                  }
                  rows={4}
                />
              </div>

              <button type="submit" class="modal-btn modal-btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

interface GroupData {
  id: string;
  name: string;
  sport: string;
  memberCount: number;
  location?: string;
  shortCode?: string;
  createdAt?: number;
  archived?: boolean;
  creator?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  groupPin?: string;
  adminPin?: string;
  members?: string[];
}

function AdminPanel() {
  const [pin, setPin] = useState('');
  const [siteAdminPin, setSiteAdminPin] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [groups, setGroups] = useState<GroupData[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminTab, setAdminTab] = useState<'groups' | 'requests'>('groups');
  const [filter, setFilter] = useState<'all' | 'request' | 'contact'>('all');
  const [groupFilter, setGroupFilter] = useState<'active' | 'archived'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailsGroup, setDetailsGroup] = useState<GroupData | null>(null);

  // Check existing auth and load PIN on mount
  useEffect(() => {
    if (showAdminPanel.value) {
      const auth = sessionStorage.getItem('siteAdminAuth');
      if (auth === 'true') {
        isAdminAuthenticated.value = true;
      }
      loadSiteAdminPin();
    }
  }, [showAdminPanel.value]);

  // Real-time listeners for groups and requests
  useEffect(() => {
    if (!isAdminAuthenticated.value) return;

    const db = getDatabase();

    // Real-time listener for contact requests
    const requestsRef = db.ref('contactRequests');
    const requestsHandler = requestsRef.on('value', (snapshot: any) => {
      const data = snapshot.val() || {};
      const list: ContactRequest[] = Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        ...val,
      }));
      list.sort((a, b) => b.createdAt - a.createdAt);
      setRequests(list);
      setLoading(false);
    });

    // Real-time listener for groups
    const groupsRef = db.ref('groups');
    const groupsHandler = groupsRef.on('value', (snapshot: any) => {
      const data = snapshot.val() || {};
      const list: GroupData[] = Object.entries(data).map(([id, val]: [string, any]) => ({
        id,
        name: val.settings?.groupName || 'Unnamed Group',
        sport: val.settings?.sportType || 'tennis',
        memberCount: val.settings?.members?.length || 0,
        location: val.settings?.location?.name,
        shortCode: val.metadata?.shortCode,
        createdAt: val.metadata?.createdAt,
        archived: val.settings?.archived || false,
        creator: val.metadata?.creator,
        groupPin: val.settings?.groupPin,
        adminPin: val.settings?.adminPin,
        members: val.settings?.members || [],
      }));
      list.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setGroups(list);
    });

    // Cleanup listeners on unmount
    return () => {
      requestsRef.off('value', requestsHandler);
      groupsRef.off('value', groupsHandler);
    };
  }, [isAdminAuthenticated.value]);

  const loadSiteAdminPin = async () => {
    try {
      const db = getDatabase();
      const snapshot = await db.ref('siteSettings/siteAdminPin').once('value');
      const pin = snapshot.val() as string | null;
      setSiteAdminPin(pin);
    } catch (error) {
      console.error('Failed to load site admin PIN:', error);
    }
  };

  const archiveGroup = async (groupId: string, groupName: string) => {
    if (!confirm(`Archive "${groupName}"? The group will be moved to the archived tab.`)) return;
    try {
      const db = getDatabase();
      await db.ref(`groups/${groupId}/settings/archived`).set(true);
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Failed to archive group:', error);
      alert('Failed to archive group');
    }
  };

  const unarchiveGroup = async (groupId: string, groupName: string) => {
    if (!confirm(`Unarchive "${groupName}"?`)) return;
    try {
      const db = getDatabase();
      await db.ref(`groups/${groupId}/settings/archived`).set(false);
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Failed to unarchive group:', error);
      alert('Failed to unarchive group');
    }
  };

  const deleteGroup = async (groupId: string, groupName: string) => {
    if (!confirm(`⚠️ PERMANENTLY DELETE "${groupName}"?\n\nThis cannot be undone. All check-ins, matches, and data will be lost.`)) return;
    if (!confirm(`Are you absolutely sure you want to delete "${groupName}"?`)) return;
    try {
      const db = getDatabase();
      const group = groups.find(g => g.id === groupId);
      if (group?.shortCode) {
        await db.ref(`shortCodeIndex/${group.shortCode}`).remove();
      }
      await db.ref(`groups/${groupId}`).remove();
      // Real-time listener will update automatically
    } catch (error) {
      console.error('Failed to delete group:', error);
      alert('Failed to delete group');
    }
  };

  const handleLogin = (e: Event) => {
    e.preventDefault();
    setLoginError(null);

    if (!pin.trim()) {
      setLoginError('Please enter a PIN');
      return;
    }

    if (!siteAdminPin) {
      setLoginError('Site admin PIN not configured. Please set siteAdminPin in siteSettings in Firebase.');
      return;
    }

    if (pin === siteAdminPin) {
      sessionStorage.setItem('siteAdminAuth', 'true');
      isAdminAuthenticated.value = true;
      setLoginError(null);
    } else {
      setLoginError('Incorrect PIN. Please try again.');
      setPin('');
    }
  };

  const handleClose = () => {
    showAdminPanel.value = false;
  };

  const updateStatus = async (id: string, status: 'read' | 'handled') => {
    try {
      const db = getDatabase();
      await db.ref(`contactRequests/${id}/status`).set(status);
      setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const filteredRequests = filter === 'all'
    ? requests
    : requests.filter(r => r.type === filter);

  const filteredGroups = groups
    .filter(g => groupFilter === 'active' ? !g.archived : g.archived)
    .filter(g => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return (
        g.name.toLowerCase().includes(query) ||
        g.sport.toLowerCase().includes(query) ||
        g.location?.toLowerCase().includes(query) ||
        g.shortCode?.toLowerCase().includes(query) ||
        g.creator?.name?.toLowerCase().includes(query) ||
        g.creator?.email?.toLowerCase().includes(query)
      );
    });

  if (!showAdminPanel.value) return null;

  return (
    <div class="admin-overlay">
      <div class="admin-panel">
        <div class="admin-header">
          <button class="admin-back-btn" onClick={handleClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            Back
          </button>
          <h2>Site Admin</h2>
          <div style={{ width: '70px' }} /> {/* Spacer for centering */}
        </div>

        {!isAdminAuthenticated.value ? (
          <form onSubmit={handleLogin} class="admin-login">
            <p>Enter site admin PIN</p>
            <input
              type="password"
              value={pin}
              onInput={(e) => setPin((e.target as HTMLInputElement).value)}
              placeholder="PIN"
              autoFocus
            />
            {loginError && <p class="login-error">{loginError}</p>}
            <button type="submit" class="modal-btn modal-btn-primary">Login</button>
          </form>
        ) : (
          <>
            {/* Main Admin Tabs */}
            <div class="admin-main-tabs">
              <button
                class={`admin-main-tab ${adminTab === 'groups' ? 'active' : ''}`}
                onClick={() => setAdminTab('groups')}
              >
                Groups ({groups.filter(g => !g.archived).length})
              </button>
              <button
                class={`admin-main-tab ${adminTab === 'requests' ? 'active' : ''}`}
                onClick={() => setAdminTab('requests')}
              >
                Requests ({requests.filter(r => r.status !== 'handled').length})
              </button>
            </div>

            {/* Groups Tab */}
            {adminTab === 'groups' && (
              <>
                <div class="admin-controls">
                  <div class="filter-tabs">
                    <button
                      class={`filter-tab ${groupFilter === 'active' ? 'active' : ''}`}
                      onClick={() => setGroupFilter('active')}
                    >
                      Active ({groups.filter(g => !g.archived).length})
                    </button>
                    <button
                      class={`filter-tab ${groupFilter === 'archived' ? 'active' : ''}`}
                      onClick={() => setGroupFilter('archived')}
                    >
                      Archived ({groups.filter(g => g.archived).length})
                    </button>
                  </div>
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Search groups..."
                    value={searchQuery}
                    onInput={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                  />
                </div>

                <div class="groups-list">
                  {loading ? (
                    <div class="no-requests">Loading...</div>
                  ) : filteredGroups.length === 0 ? (
                    <div class="no-requests">No groups found</div>
                  ) : (
                    filteredGroups.map((group) => (
                      <div key={group.id} class="group-item">
                        <div class="group-item-main">
                          <div class="group-item-info">
                            <h4 class="group-item-name">
                              {group.name}
                              <span class={`sport-tag ${group.sport}`}>
                                {group.sport === 'tennis' ? '🎾' : '🟡'} {group.sport}
                              </span>
                            </h4>
                            <div class="group-item-meta">
                              <span>👥 {group.memberCount}</span>
                              {group.location && <span>📍 {group.location}</span>}
                            </div>
                            <div class="group-item-creator">
                              {group.createdAt && (
                                <span>
                                  Created {new Date(group.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              )}
                              {group.creator?.name && <span> by {group.creator.name}</span>}
                              {group.creator?.email && (
                                <a href={`mailto:${group.creator.email}`} class="creator-email">
                                  {group.creator.email}
                                </a>
                              )}
                            </div>
                          </div>
                          <div class="group-item-actions">
                            <button
                              class="action-btn details-btn"
                              onClick={() => setDetailsGroup(group)}
                            >
                              Details
                            </button>
                            <a
                              href="#"
                              class="view-group-link"
                              onClick={(e) => {
                                e.preventDefault();
                                const sportDomain = group.sport === 'pickleball'
                                  ? 'pickleball.sportsconnector.com'
                                  : 'tennis.sportsconnector.com';
                                window.open(`https://${sportDomain}/${group.shortCode || group.id}`, '_blank');
                              }}
                            >
                              Open
                            </a>
                            {group.archived ? (
                              <button
                                class="action-btn"
                                onClick={() => unarchiveGroup(group.id, group.name)}
                              >
                                Unarchive
                              </button>
                            ) : (
                              <button
                                class="action-btn"
                                onClick={() => archiveGroup(group.id, group.name)}
                              >
                                Archive
                              </button>
                            )}
                            <button
                              class="action-btn danger"
                              onClick={() => deleteGroup(group.id, group.name)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}

            {/* Requests Tab */}
            {adminTab === 'requests' && (
              <>
                <div class="admin-controls">
                  <div class="filter-tabs">
                    <button
                      class={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                      onClick={() => setFilter('all')}
                    >
                      All ({requests.length})
                    </button>
                    <button
                      class={`filter-tab ${filter === 'request' ? 'active' : ''}`}
                      onClick={() => setFilter('request')}
                    >
                      Sport Requests ({requests.filter(r => r.type === 'request').length})
                    </button>
                    <button
                      class={`filter-tab ${filter === 'contact' ? 'active' : ''}`}
                      onClick={() => setFilter('contact')}
                    >
                      Contact ({requests.filter(r => r.type === 'contact').length})
                    </button>
                  </div>
                </div>

                <div class="requests-list">
                  {filteredRequests.length === 0 ? (
                    <div class="no-requests">No requests yet</div>
                  ) : (
                    filteredRequests.map((req) => (
                      <div key={req.id} class={`request-item ${req.status || 'new'}`}>
                        <div class="request-header">
                          <span class={`request-type ${req.type}`}>
                            {req.type === 'request' ? '🏸 Sport Request' : '💬 Contact'}
                          </span>
                          <span class="request-date">{formatDate(req.createdAt)}</span>
                        </div>
                        <div class="request-info">
                          <strong>{req.name}</strong>
                          <a href={`mailto:${req.email}`}>{req.email}</a>
                          {req.phone && <span class="request-phone">{req.phone}</span>}
                        </div>
                        {req.message && <p class="request-message">{req.message}</p>}
                        <div class="request-actions">
                          <span class={`status-badge ${req.status || 'new'}`}>
                            {req.status === 'handled' ? '✓ Handled' : req.status === 'read' ? 'Read' : 'New'}
                          </span>
                          {req.status !== 'read' && req.status !== 'handled' && (
                            <button onClick={() => updateStatus(req.id, 'read')}>Mark Read</button>
                          )}
                          {req.status !== 'handled' && (
                            <button onClick={() => updateStatus(req.id, 'handled')}>Mark Handled</button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Details Drawer */}
        {detailsGroup && (
          <div class="details-drawer-overlay" onClick={() => setDetailsGroup(null)}>
            <div class="details-drawer" onClick={(e) => e.stopPropagation()}>
              <div class="drawer-header">
                <h2>{detailsGroup.name}</h2>
                <button class="drawer-close" onClick={() => setDetailsGroup(null)}>×</button>
              </div>
              <div class="drawer-content">
                {/* Group Info */}
                <div class="drawer-section">
                  <h3>Group Info</h3>
                  <div class="detail-row">
                    <span class="detail-label">Members:</span>
                    <span class="detail-value">{detailsGroup.memberCount}</span>
                  </div>
                  {detailsGroup.location && (
                    <div class="detail-row">
                      <span class="detail-label">Location:</span>
                      <span class="detail-value">{detailsGroup.location}</span>
                    </div>
                  )}
                  {detailsGroup.shortCode && (
                    <div class="detail-row">
                      <span class="detail-label">Short Code:</span>
                      <span class="detail-value code">{detailsGroup.shortCode}</span>
                    </div>
                  )}
                  <div class="detail-row">
                    <span class="detail-label">Sport:</span>
                    <span class="detail-value" style={{ textTransform: 'capitalize' }}>
                      {detailsGroup.sport === 'tennis' ? '🎾' : '🟡'} {detailsGroup.sport}
                    </span>
                  </div>
                </div>

                {/* Creator */}
                {detailsGroup.creator && (
                  <div class="drawer-section">
                    <h3>Creator</h3>
                    {detailsGroup.creator.name && (
                      <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span class="detail-value">{detailsGroup.creator.name}</span>
                      </div>
                    )}
                    {detailsGroup.creator.email && (
                      <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <a href={`mailto:${detailsGroup.creator.email}`} class="detail-link">
                          {detailsGroup.creator.email}
                        </a>
                      </div>
                    )}
                    {detailsGroup.creator.phone && (
                      <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <a href={`tel:${detailsGroup.creator.phone}`} class="detail-link">
                          {detailsGroup.creator.phone}
                        </a>
                      </div>
                    )}
                    {detailsGroup.createdAt && (
                      <div class="detail-row">
                        <span class="detail-label">Created:</span>
                        <span class="detail-value">
                          {new Date(detailsGroup.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Access PINs */}
                <div class="drawer-section">
                  <h3>Access PINs</h3>
                  <div class="detail-row">
                    <span class="detail-label">Group PIN:</span>
                    <span class="detail-value code">{detailsGroup.groupPin || 'Not set'}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Admin PIN:</span>
                    <span class="detail-value code">{detailsGroup.adminPin || 'Not set'}</span>
                  </div>
                </div>

                {/* Members List */}
                <div class="drawer-section">
                  <h3>Members ({detailsGroup.members?.length || 0})</h3>
                  <div class="members-list">
                    {(detailsGroup.members || []).length === 0 ? (
                      <p class="no-members">No members yet.</p>
                    ) : (
                      (detailsGroup.members || []).map((member: string) => (
                        <div key={member} class="member-item">{member}</div>
                      ))
                    )}
                  </div>
                </div>

                {/* Technical */}
                <div class="drawer-section technical">
                  <h3>Technical</h3>
                  <div class="detail-row">
                    <span class="detail-label">Group ID:</span>
                    <span class="detail-value code small">{detailsGroup.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RequestSportSection() {
  const handleOpenModal = () => {
    contactFormType.value = 'request';
    showContactModal.value = true;
  };

  return (
    <section class="request-section">
      <div class="request-card">
        <div class="request-icon">🏸</div>
        <h3 class="request-title">Different sport?</h3>
        <p class="request-description">
          Squash, padel, badminton—let us know what you play.
        </p>
        <button class="request-btn" onClick={handleOpenModal}>
          Request Your Sport
        </button>
      </div>
    </section>
  );
}

export function HubLandingPage() {
  return (
    <div class="hub-landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@600;700;800&display=swap');

        .hub-landing {
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #18181b;
          -webkit-font-smoothing: antialiased;
        }

        /* Hero Section */
        .hub-hero {
          background: linear-gradient(135deg, #0f766e 0%, #115e59 50%, #134e4a 100%);
          color: white;
          padding: 72px 24px 88px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hub-hero::before {
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

        .hub-hero::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(to top, rgba(248, 250, 252, 0.1), transparent);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          max-width: 680px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hub-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(36px, 9vw, 64px);
          font-weight: 700;
          color: white;
          margin: 0 0 24px;
          letter-spacing: -0.02em;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .title-line {
          white-space: nowrap;
        }

        .hub-subtitle {
          font-size: clamp(17px, 2.5vw, 20px);
          font-weight: 400;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 8px;
          line-height: 1.5;
        }

        .hub-tagline {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
          letter-spacing: 0.02em;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 32px;
          padding: 16px 32px;
          background: white;
          color: #0f766e;
          font-family: inherit;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
        }

        .hero-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .hero-cta svg {
          transition: transform 0.2s ease;
        }

        .hero-cta:hover svg {
          transform: translateY(2px);
        }

        .social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
        }

        .social-proof-icon {
          font-size: 14px;
        }

        /* Sports Section */
        .sports-section {
          padding: 48px 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .sports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .sport-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid #e4e4e7;
        }

        .sport-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          border-color: var(--card-color);
        }

        .sport-card:focus {
          outline: 2px solid var(--card-color);
          outline-offset: 2px;
        }

        .sport-card-accent {
          height: 6px;
          background: var(--card-color);
        }

        .sport-card-content {
          padding: 24px 24px 20px;
        }

        .sport-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .sport-emoji {
          font-size: 40px;
          line-height: 1;
        }

        .sport-name {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 26px;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 8px;
        }

        .sport-description {
          font-size: 15px;
          color: #52525b;
          line-height: 1.5;
          margin: 0 0 16px;
        }

        .sport-meta {
          display: flex;
          gap: 12px;
        }

        .player-count {
          font-size: 13px;
          color: #71717a;
          background: #f4f4f5;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .sport-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: var(--card-color);
          color: white;
          font-weight: 600;
          font-size: 15px;
        }

        .sport-card:hover .sport-card-footer {
          background: color-mix(in srgb, var(--card-color) 90%, black);
        }

        /* How It Works */
        .how-section {
          background: #ffffff;
          padding: 64px 24px;
        }

        .how-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .how-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .how-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: clamp(26px, 5vw, 36px);
          font-weight: 600;
          color: #18181b;
          margin: 0;
        }

        .hub-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .hub-step {
          text-align: center;
          padding: 24px 16px;
          background: #f8fafc;
          border-radius: 16px;
          border: 1px solid #e4e4e7;
        }

        .hub-step-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background: #0f766e;
          color: white;
          font-size: 20px;
          font-weight: 700;
          border-radius: 50%;
          margin-bottom: 16px;
        }

        .hub-step-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 17px;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 8px;
        }

        .hub-step-desc {
          font-size: 14px;
          color: #52525b;
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 700px) {
          .how-section {
            padding: 60px 20px;
          }

          .hub-steps {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .hub-step {
            padding: 20px;
          }
        }

        /* Request Section */
        .request-section {
          padding: 48px 24px 64px;
          max-width: 520px;
          margin: 0 auto;
        }

        .request-card {
          background: white;
          border: 1px solid #e4e4e7;
          border-radius: 16px;
          padding: 32px 28px;
          text-align: center;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .request-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .request-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 20px;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 8px;
        }

        .request-description {
          font-size: 14px;
          color: #71717a;
          line-height: 1.5;
          margin: 0 0 20px;
        }

        .request-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 24px;
          background: #0f766e;
          color: white;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .request-btn:hover {
          background: #0d6560;
          transform: translateY(-1px);
        }

        .request-note {
          font-size: 12px;
          color: #a1a1aa;
          margin: 12px 0 0;
        }

        /* Footer */
        .hub-footer {
          text-align: center;
          padding: 40px 24px;
          background: #18181b;
          color: #71717a;
        }

        .footer-brand {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0 0 12px;
        }

        .footer-links {
          font-size: 14px;
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .footer-links a {
          color: #a1a1aa;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: white;
        }

        .footer-separator {
          color: #52525b;
        }

        .footer-text {
          font-size: 13px;
          margin: 0;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 440px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          cursor: pointer;
          color: #71717a;
          padding: 4px;
          display: flex;
          transition: color 0.2s ease;
        }

        .modal-close:hover {
          color: #18181b;
        }

        .modal-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 8px;
        }

        .modal-subtitle {
          font-size: 15px;
          color: #52525b;
          margin: 0 0 24px;
          line-height: 1.5;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-field label {
          font-size: 14px;
          font-weight: 500;
          color: #18181b;
        }

        .form-field input,
        .form-field textarea {
          padding: 12px 14px;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          font-family: inherit;
          font-size: 15px;
          color: #18181b;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-field input:focus,
        .form-field textarea:focus {
          outline: none;
          border-color: #0f766e;
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.1);
        }

        .form-field input::placeholder,
        .form-field textarea::placeholder {
          color: #a1a1aa;
        }

        .form-field textarea {
          resize: vertical;
          min-height: 100px;
        }

        .modal-btn {
          padding: 14px 24px;
          border-radius: 10px;
          font-family: inherit;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .modal-btn-primary {
          background: #0f766e;
          color: white;
        }

        .modal-btn-primary:hover:not(:disabled) {
          background: #0d6560;
        }

        .modal-btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .modal-success {
          text-align: center;
          padding: 20px 0;
        }

        .success-icon {
          width: 64px;
          height: 64px;
          background: #dcfce7;
          color: #16a34a;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .modal-success h3 {
          font-size: 20px;
          font-weight: 700;
          color: #18181b;
          margin: 0 0 8px;
        }

        .modal-success p {
          font-size: 15px;
          color: #52525b;
          margin: 0 0 24px;
        }

        .modal-success .modal-btn {
          background: #f4f4f5;
          color: #18181b;
        }

        .modal-success .modal-btn:hover {
          background: #e4e4e7;
        }

        /* Admin Panel - Full Page */
        .admin-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #f8fafc;
          z-index: 1000;
          overflow-y: auto;
        }

        .admin-panel {
          min-height: 100vh;
          max-width: 1000px;
          margin: 0 auto;
          background: white;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #e4e4e7;
          background: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .admin-header h2 {
          font-size: 20px;
          font-weight: 700;
          margin: 0;
          color: #18181b;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .admin-back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: #f4f4f5;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-back-btn:hover {
          background: #e4e4e7;
          color: #18181b;
        }

        .admin-login {
          padding: 40px 24px;
          text-align: center;
        }

        .admin-login p {
          color: #52525b;
          margin: 0 0 16px;
        }

        .admin-login input {
          display: block;
          width: 100%;
          max-width: 280px;
          margin: 0 auto 16px;
          padding: 12px 14px;
          border: 1px solid #e4e4e7;
          border-radius: 10px;
          font-family: inherit;
          font-size: 15px;
          text-align: center;
        }

        .admin-login input:focus {
          outline: none;
          border-color: #0f766e;
        }

        .login-error {
          color: #dc2626;
          font-size: 14px;
          margin: 0 0 12px;
        }

        .admin-main-tabs {
          display: flex;
          border-bottom: 1px solid #e4e4e7;
        }

        .admin-main-tab {
          flex: 1;
          padding: 14px 20px;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          color: #71717a;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-main-tab:hover {
          color: #18181b;
          background: #f8fafc;
        }

        .admin-main-tab.active {
          color: #0f766e;
          border-bottom-color: #0f766e;
        }

        .search-input {
          padding: 8px 14px;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          min-width: 180px;
        }

        .search-input:focus {
          outline: none;
          border-color: #0f766e;
        }

        .groups-list {
          min-height: 400px;
        }

        .group-item {
          padding: 16px 24px;
          border-bottom: 1px solid #e4e4e7;
        }

        .group-item:hover {
          background: #f8fafc;
        }

        .group-item-main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .group-item-info {
          flex: 1;
          min-width: 0;
        }

        .group-item-name {
          font-size: 15px;
          font-weight: 600;
          color: #18181b;
          margin: 0 0 4px;
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .sport-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 2px 8px;
          border-radius: 10px;
          text-transform: capitalize;
        }

        .sport-tag.tennis {
          background: #dcfce7;
          color: #166534;
        }

        .sport-tag.pickleball {
          background: #fef9c3;
          color: #854d0e;
        }

        .group-item-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          color: #71717a;
          flex-wrap: wrap;
        }

        .group-item-creator {
          font-size: 12px;
          color: #a1a1aa;
          margin-top: 4px;
        }

        .group-item-creator .creator-email {
          color: #0f766e;
          text-decoration: none;
          margin-left: 8px;
        }

        .group-item-creator .creator-email:hover {
          text-decoration: underline;
        }

        .group-item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .copy-link-btn {
          padding: 6px 12px;
          background: white;
          border: 1px solid #e4e4e7;
          border-radius: 6px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .copy-link-btn:hover {
          border-color: #0f766e;
          color: #0f766e;
        }

        .view-group-link {
          padding: 6px 12px;
          background: #0f766e;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .view-group-link:hover {
          background: #0d6560;
        }

        .action-btn {
          padding: 6px 12px;
          background: white;
          border: 1px solid #e4e4e7;
          border-radius: 6px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          border-color: #0f766e;
          color: #0f766e;
        }

        .action-btn.danger {
          color: #dc2626;
          border-color: #fecaca;
        }

        .action-btn.danger:hover {
          background: #fef2f2;
          border-color: #dc2626;
        }

        .action-btn.details-btn {
          background: #f0fdfa;
          border-color: #99f6e4;
          color: #0f766e;
        }

        .action-btn.details-btn:hover {
          background: #ccfbf1;
          border-color: #0f766e;
        }

        /* Details Drawer */
        .details-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1100;
          display: flex;
          justify-content: flex-end;
        }

        .details-drawer {
          width: 100%;
          max-width: 420px;
          height: 100%;
          background: white;
          overflow-y: auto;
          animation: slideInRight 0.3s ease;
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #e4e4e7;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .drawer-header h2 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #18181b;
        }

        .drawer-close {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          font-size: 24px;
          color: #71717a;
          cursor: pointer;
          border-radius: 6px;
        }

        .drawer-close:hover {
          background: #f4f4f5;
          color: #18181b;
        }

        .drawer-content {
          padding: 0 24px 24px;
        }

        .drawer-section {
          padding: 20px 0;
          border-bottom: 1px solid #e4e4e7;
        }

        .drawer-section:last-child {
          border-bottom: none;
        }

        .drawer-section h3 {
          font-size: 13px;
          font-weight: 600;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin: 0 0 12px;
        }

        .drawer-section.technical {
          opacity: 0.7;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 8px 0;
          gap: 16px;
        }

        .detail-label {
          font-size: 14px;
          color: #71717a;
          flex-shrink: 0;
        }

        .detail-value {
          font-size: 14px;
          color: #18181b;
          text-align: right;
          word-break: break-word;
        }

        .detail-value.code {
          font-family: ui-monospace, monospace;
          background: #f4f4f5;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 13px;
        }

        .detail-value.small {
          font-size: 11px;
        }

        .detail-link {
          font-size: 14px;
          color: #0f766e;
          text-decoration: none;
        }

        .detail-link:hover {
          text-decoration: underline;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .member-item {
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 6px;
          font-size: 14px;
          color: #18181b;
        }

        .no-members {
          font-size: 14px;
          color: #a1a1aa;
          font-style: italic;
          margin: 0;
        }

        .admin-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          border-bottom: 1px solid #e4e4e7;
          gap: 12px;
          flex-wrap: wrap;
        }

        .filter-tabs {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-tab {
          padding: 8px 14px;
          background: #f4f4f5;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-tab:hover {
          background: #e4e4e7;
        }

        .filter-tab.active {
          background: #0f766e;
          color: white;
        }

        .refresh-btn {
          padding: 8px 16px;
          background: white;
          border: 1px solid #e4e4e7;
          border-radius: 8px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .refresh-btn:hover:not(:disabled) {
          border-color: #0f766e;
          color: #0f766e;
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .requests-list {
          min-height: 400px;
        }

        .no-requests {
          padding: 60px 24px;
          text-align: center;
          color: #71717a;
        }

        .request-item {
          padding: 20px 24px;
          border-bottom: 1px solid #e4e4e7;
        }

        .request-item.new {
          background: #fefce8;
        }

        .request-item.read {
          background: #f8fafc;
        }

        .request-item.handled {
          background: white;
          opacity: 0.7;
        }

        .request-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .request-type {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
        }

        .request-type.request {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .request-type.contact {
          background: #f3e8ff;
          color: #7c3aed;
        }

        .request-date {
          font-size: 12px;
          color: #71717a;
        }

        .request-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 8px;
        }

        .request-info strong {
          color: #18181b;
        }

        .request-info a {
          color: #0f766e;
          text-decoration: none;
        }

        .request-info a:hover {
          text-decoration: underline;
        }

        .request-phone {
          color: #71717a;
          font-size: 14px;
        }

        .request-message {
          font-size: 14px;
          color: #52525b;
          line-height: 1.5;
          margin: 0 0 12px;
          white-space: pre-wrap;
        }

        .request-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .status-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .status-badge.new {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.read {
          background: #e0e7ff;
          color: #4f46e5;
        }

        .status-badge.handled {
          background: #dcfce7;
          color: #16a34a;
        }

        .request-actions button {
          padding: 6px 12px;
          background: white;
          border: 1px solid #e4e4e7;
          border-radius: 6px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .request-actions button:hover {
          border-color: #0f766e;
          color: #0f766e;
        }

        @media (max-width: 600px) {
          .hub-hero {
            padding: 56px 20px 72px;
          }

          .sports-section {
            padding: 48px 16px;
          }

          .sports-grid {
            grid-template-columns: 1fr;
          }

          .how-section {
            padding: 60px 20px;
          }

          .request-section {
            padding: 48px 16px;
          }

          .request-card {
            padding: 32px 24px;
          }
        }
      `}</style>

      {/* Hero */}
      <section class="hub-hero">
        <div class="hero-content">
          <h1 class="hub-title">
            <span class="title-line">Stop texting.</span>
            <span class="title-line">Start playing.</span>
          </h1>
          <p class="hub-subtitle">
            No-hassle coordination for your racket sports group.
          </p>
          <p class="hub-tagline">
            Free. No app. No account needed.
          </p>
          <button
            class="hero-cta"
            onClick={() => document.getElementById('sports')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Pick Your Sport
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4v12m0 0l-4-4m4 4l4-4"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <p class="social-proof">
            <span class="social-proof-icon">❤️</span>
            Built by players who love the game
          </p>
        </div>
      </section>

      {/* Sports Grid */}
      <section id="sports" class="sports-section">
        <div class="sports-grid">
          {liveSports.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section class="how-section">
        <div class="how-container">
          <div class="how-header">
            <h2 class="how-title">Your group, ready in 2 minutes</h2>
          </div>

          <div class="hub-steps">
            {steps.map((step) => (
              <div key={step.title} class="hub-step">
                <div class="hub-step-num">{step.number}</div>
                <h3 class="hub-step-title">{step.title}</h3>
                <p class="hub-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Your Sport */}
      <RequestSportSection />

      {/* Footer */}
      <footer class="hub-footer">
        <p class="footer-brand">Sports Connector</p>
        <p class="footer-links">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              contactFormType.value = 'contact';
              showContactModal.value = true;
            }}
          >
            Contact Us
          </a>
          <span class="footer-separator">·</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              showAdminPanel.value = true;
            }}
          >
            Admin
          </a>
        </p>
        <p class="footer-text">&copy; {new Date().getFullYear()}</p>
      </footer>

      {/* Contact Modal */}
      <ContactFormModal />

      {/* Admin Panel */}
      <AdminPanel />
    </div>
  );
}

export default HubLandingPage;
