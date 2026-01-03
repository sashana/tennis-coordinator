/**
 * Create Group Drawer
 *
 * 3-step wizard for self-service group creation:
 * 1. Select group type (tight-knit enabled, others "Coming Soon")
 * 2. Enter group details (name, creator info, location, PINs)
 * 3. Confirmation with shareable link
 */

import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { GroupTypeCard } from './GroupTypeCard';
import { createGroup, type CreateGroupResult } from '../../services/groupCreation';
import {
  getAllArchetypes,
  type GroupArchetype,
  type GroupArchetypeConfig,
} from '../../types/groupTypes';
import { generateDefaultPin } from '../../utils/groups';
import { addMyGroup } from '../../utils/myGroups';
import { sport } from '../../config/sport';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/dom';
import { useSwipeToDismiss } from '../../hooks/useSwipeToDismiss';

// ============================================
// State Signals
// ============================================

export const showCreateGroupDrawer = signal(false);
const currentStep = signal<1 | 2 | 3>(1);
const selectedArchetype = signal<GroupArchetype | null>(null);
const isCreating = signal(false);
const creationResult = signal<CreateGroupResult | null>(null);

// Form fields
const groupName = signal('');
const creatorName = signal('');
const creatorEmail = signal('');
const creatorPhone = signal('');
const location = signal('');
const groupPin = signal('');
const adminPin = signal('');
const showPinCustomization = signal(false);

// ============================================
// Helper Functions
// ============================================

function resetForm() {
  currentStep.value = 1;
  selectedArchetype.value = 'tight-knit'; // Auto-select tight-knit
  groupName.value = '';
  creatorName.value = '';
  creatorEmail.value = '';
  creatorPhone.value = '';
  location.value = '';
  groupPin.value = '';
  adminPin.value = '';
  showPinCustomization.value = true; // Show PINs expanded by default
  isCreating.value = false;
  creationResult.value = null;
}

export function openCreateGroupDrawer() {
  resetForm();
  // Pre-generate PINs
  groupPin.value = generateDefaultPin();
  adminPin.value = generateDefaultPin();
  showCreateGroupDrawer.value = true;
}

export function closeCreateGroupDrawer() {
  showCreateGroupDrawer.value = false;
  resetForm();
}

function goToStep(step: 1 | 2 | 3) {
  currentStep.value = step;
}

function isStep2Valid(): boolean {
  return (
    groupName.value.trim().length > 0 &&
    creatorName.value.trim().length > 0 &&
    creatorEmail.value.trim().length > 0 &&
    creatorPhone.value.trim().length > 0 &&
    location.value.trim().length > 0
  );
}

async function handleCreateGroup() {
  if (!isStep2Valid() || !selectedArchetype.value) return;

  isCreating.value = true;

  const result = await createGroup({
    name: groupName.value.trim(),
    location: location.value.trim(),
    creatorName: creatorName.value.trim(),
    creatorEmail: creatorEmail.value.trim(),
    creatorPhone: creatorPhone.value.trim(),
    groupPin: groupPin.value,
    adminPin: adminPin.value,
    archetype: selectedArchetype.value,
  });

  creationResult.value = result;
  isCreating.value = false;

  if (result.success && result.groupId && result.shortCode) {
    // Store group in "My Groups" for easy access later
    addMyGroup({
      groupId: result.groupId,
      shortCode: result.shortCode,
      groupName: groupName.value.trim(),
      groupPin: groupPin.value,
      adminPin: adminPin.value,
      role: 'creator',
      creatorName: creatorName.value.trim(),
    });
    goToStep(3);
  }
}

function handleGoToGroup() {
  const result = creationResult.value;
  if (result?.shortCode && result?.groupId) {
    // Set the creator as the session user for this group before navigating
    localStorage.setItem(`sessionUser_${result.groupId}`, creatorName.value.trim());
    // Also set PIN authentication so creator skips PIN modal
    sessionStorage.setItem(`pinAuth_${result.groupId}`, 'true');
    window.location.href = `/${result.shortCode}`;
  }
}

// Signal to track copy feedback
const copyFeedback = signal<string | null>(null);

function showCopyFeedback(text: string) {
  copyFeedback.value = text;
  setTimeout(() => {
    copyFeedback.value = null;
  }, 2000);
}

function handleShareInvite(method: 'copy' | 'whatsapp' | 'sms') {
  const result = creationResult.value;
  if (!result?.shareUrl) return;

  // Invite message - only includes Group PIN (not Admin PIN)
  const message = `Join my ${sport.nameLower} group "${groupName.value}"!\n\nLink: ${result.shareUrl}\nPIN: ${result.groupPin}`;

  switch (method) {
    case 'copy':
      navigator.clipboard.writeText(message);
      showCopyFeedback('Invite copied!');
      break;
    case 'whatsapp':
      window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      break;
    case 'sms':
      window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
      break;
  }
}

async function handleSaveForSelf() {
  const result = creationResult.value;
  if (!result?.shareUrl) return;

  // Full details for yourself - includes Admin PIN
  const details = `${groupName.value}\n\nLink: ${result.shareUrl}\nGroup PIN: ${result.groupPin}\nAdmin PIN: ${result.adminPin}\n\nSave this somewhere safe!`;

  // Try native share sheet first (iOS/Android)
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${groupName.value} - Group Details`,
        text: details,
      });
      return; // Success - no need for feedback toast
    } catch (err) {
      // User cancelled or share failed - fall back to clipboard
      if ((err as Error).name === 'AbortError') {
        return; // User cancelled, do nothing
      }
    }
  }

  // Fallback: copy to clipboard
  navigator.clipboard.writeText(details);
  showCopyFeedback('Details copied!');
}

// ============================================
// Main Component
// ============================================

export function CreateGroupDrawer() {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (showCreateGroupDrawer.value) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [showCreateGroupDrawer.value]);

  const { drawerRef, swipeHandlers, getDrawerStyle } = useSwipeToDismiss({
    onDismiss: closeCreateGroupDrawer,
  });

  if (!showCreateGroupDrawer.value) return null;

  const archetypes = getAllArchetypes();

  const handleBackdropClick = (e: Event) => {
    if ((e.target as HTMLElement).classList.contains('drawer-backdrop')) {
      closeCreateGroupDrawer();
    }
  };

  return (
    <div class="drawer-backdrop" onClick={handleBackdropClick}>
      <div
        class="create-group-drawer"
        ref={drawerRef}
        style={getDrawerStyle()}
        onTouchStart={swipeHandlers.onTouchStart}
        onTouchMove={swipeHandlers.onTouchMove}
        onTouchEnd={swipeHandlers.onTouchEnd}
      >
        {/* Drawer Handle */}
        <div class="drawer-handle">
          <div class="handle-bar"></div>
        </div>

        {/* Progress Indicator */}
        <div class="progress-indicator">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              class={`progress-dot ${currentStep.value >= step ? 'active' : ''} ${currentStep.value === step ? 'current' : ''}`}
            />
          ))}
        </div>

        {/* Step Content */}
        {currentStep.value === 1 && (
          <Step1TypeSelection
            archetypes={archetypes}
            selectedArchetype={selectedArchetype.value}
            onSelect={(id) => {
              selectedArchetype.value = id;
            }}
            onContinue={() => goToStep(2)}
          />
        )}

        {currentStep.value === 2 && (
          <Step2Details
            selectedArchetype={archetypes.find((a) => a.id === selectedArchetype.value)}
            onBack={() => goToStep(1)}
            onSubmit={handleCreateGroup}
            isCreating={isCreating.value}
            error={creationResult.value?.error}
          />
        )}

        {currentStep.value === 3 && creationResult.value?.success && (
          <Step3Confirmation
            result={creationResult.value}
            groupName={groupName.value}
            onShareInvite={handleShareInvite}
            onSaveForSelf={handleSaveForSelf}
            onGoToGroup={handleGoToGroup}
            copyFeedback={copyFeedback.value}
          />
        )}
      </div>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .create-group-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          width: 100%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 0 20px calc(30px + env(safe-area-inset-bottom, 0px));
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .drawer-handle {
          display: flex;
          justify-content: center;
          padding: 12px 0 8px;
          position: sticky;
          top: 0;
          background: white;
          z-index: 1;
        }

        .handle-bar {
          width: 40px;
          height: 4px;
          background: #ddd;
          border-radius: 2px;
        }

        .progress-indicator {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e0e0e0;
          transition: all 0.2s;
        }

        .progress-dot.active {
          background: var(--color-primary, #2C6E49);
        }

        .progress-dot.current {
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}

// ============================================
// Step 1: Type Selection
// ============================================

interface Step1Props {
  archetypes: GroupArchetypeConfig[];
  selectedArchetype: GroupArchetype | null;
  onSelect: (id: GroupArchetype) => void;
  onContinue: () => void;
}

function Step1TypeSelection({ archetypes, selectedArchetype, onSelect, onContinue }: Step1Props) {
  // Separate available (tight-knit) from coming soon types
  const availableTypes = archetypes.filter((a) => a.available);
  const comingSoonTypes = archetypes.filter((a) => !a.available);

  return (
    <div class="step-content">
      <h2 class="step-title">What type of group?</h2>
      <p class="step-subtitle">Choose the type that best fits how your group plays</p>

      {/* Featured available type(s) */}
      <div class="type-cards">
        {availableTypes.map((config) => (
          <GroupTypeCard
            key={config.id}
            config={config}
            selected={selectedArchetype === config.id}
            onSelect={() => onSelect(config.id)}
          />
        ))}
      </div>

      {/* Coming Soon types - compact list */}
      {comingSoonTypes.length > 0 && (
        <div class="coming-soon-section">
          <p class="coming-soon-label">More group types coming soon:</p>
          <div class="coming-soon-list">
            {comingSoonTypes.map((config) => (
              <span key={config.id} class="coming-soon-item">
                {config.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div class="step-actions">
        <button class="cancel-btn" onClick={closeCreateGroupDrawer}>
          Cancel
        </button>
        <button
          class="continue-btn"
          onClick={onContinue}
          disabled={!selectedArchetype}
        >
          Continue
        </button>
      </div>

      <style>{`
        .step-content {
          padding: 0;
        }

        .step-title {
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .step-subtitle {
          font-size: 14px;
          color: #666;
          margin: 0 0 24px 0;
          text-align: center;
        }

        .type-cards {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .coming-soon-section {
          margin-bottom: 24px;
          padding: 12px 16px;
          background: #f9f9f9;
          border-radius: 10px;
        }

        .coming-soon-label {
          font-size: 12px;
          color: #888;
          margin: 0 0 8px 0;
        }

        .coming-soon-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .coming-soon-item {
          display: inline-block;
          padding: 6px 12px;
          background: #e8e8e8;
          border-radius: 16px;
          font-size: 12px;
          color: #666;
        }

        .step-actions {
          display: flex;
          gap: 12px;
        }

        .cancel-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .cancel-btn:hover {
          background: #e8e8e8;
        }

        .cancel-btn:active {
          transform: scale(0.98);
        }

        .continue-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .continue-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .continue-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .continue-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

// ============================================
// Step 2: Group Details
// ============================================

interface Step2Props {
  selectedArchetype: GroupArchetypeConfig | undefined;
  onBack: () => void;
  onSubmit: () => void;
  isCreating: boolean;
  error?: string;
}

function Step2Details({ selectedArchetype, onBack, onSubmit, isCreating, error }: Step2Props) {
  return (
    <div class="step-content">
      <h2 class="step-title">Group Details</h2>
      <p class="step-subtitle">Tell us about your {sport.nameLower} group</p>

      {error && (
        <div class="error-message">
          {error}
        </div>
      )}

      <div class="form-section">
        <label class="field-label">
          Group Name <span class="required">*</span>
        </label>
        <input
          type="text"
          class="form-input"
          placeholder={selectedArchetype?.namePlaceholder || 'e.g., Tuesday Tennis Gang'}
          value={groupName.value}
          onInput={(e) => {
            groupName.value = (e.target as HTMLInputElement).value;
          }}
        />
      </div>

      <div class="form-section">
        <label class="field-label">
          Your Name <span class="required">*</span>
        </label>
        <input
          type="text"
          class="form-input"
          placeholder="Your name (you'll be the first member)"
          value={creatorName.value}
          onInput={(e) => {
            creatorName.value = (e.target as HTMLInputElement).value;
          }}
        />
        <p class="field-helper">You'll be the group admin</p>
      </div>

      <div class="form-section">
        <label class="field-label">
          Email <span class="required">*</span>
        </label>
        <input
          type="email"
          class="form-input"
          placeholder="your@email.com"
          value={creatorEmail.value}
          onInput={(e) => {
            creatorEmail.value = (e.target as HTMLInputElement).value;
          }}
        />
        <p class="field-helper">So we can reach you if there are issues with your group</p>
      </div>

      <div class="form-section">
        <label class="field-label">
          Phone <span class="required">*</span>
        </label>
        <input
          type="tel"
          class="form-input"
          placeholder="(555) 123-4567"
          value={creatorPhone.value}
          onInput={(e) => {
            creatorPhone.value = (e.target as HTMLInputElement).value;
          }}
        />
        <p class="field-helper">Alternative way to contact you about your group</p>
      </div>

      <div class="form-section">
        <label class="field-label">
          Location <span class="required">*</span>
        </label>
        <input
          type="text"
          class="form-input"
          placeholder="e.g., San Jose, CA or Riverside Courts"
          value={location.value}
          onInput={(e) => {
            location.value = (e.target as HTMLInputElement).value;
          }}
        />
        <p class="field-helper">Used for weather forecasts on play days</p>
      </div>

      {/* PIN Section */}
      <div class="form-section pins-form-section">
        <div class="pins-header">
          <label class="field-label" style="margin-bottom: 0;">Group PINs</label>
          <button
            type="button"
            class="toggle-pins-btn"
            onClick={() => {
              showPinCustomization.value = !showPinCustomization.value;
            }}
          >
            {showPinCustomization.value ? 'Hide' : 'Show'}
          </button>
        </div>

        {showPinCustomization.value && (
          <div class="pins-section">
            <div class="pin-row">
              <label class="pin-label">Group PIN</label>
              <input
                type="text"
                class="pin-input"
                value={groupPin.value}
                onInput={(e) => {
                  groupPin.value = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 8);
                }}
                placeholder="4-8 digits"
              />
            </div>
            <div class="pin-row">
              <label class="pin-label">Admin PIN</label>
              <input
                type="text"
                class="pin-input"
                value={adminPin.value}
                onInput={(e) => {
                  adminPin.value = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 8);
                }}
                placeholder="4-8 digits"
              />
            </div>
            <p class="field-helper" style="margin-top: 8px;">
              Group PIN lets members access the group. Admin PIN lets you manage settings.
            </p>
          </div>
        )}
      </div>

      <div class="step-actions">
        <button class="back-btn" onClick={onBack} disabled={isCreating}>
          Back
        </button>
        <button
          class="create-btn"
          onClick={onSubmit}
          disabled={!isStep2Valid() || isCreating}
        >
          {isCreating ? 'Creating...' : 'Create Group'}
        </button>
      </div>

      <style>{`
        .error-message {
          background: #ffebee;
          color: #c62828;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 16px;
          font-size: 14px;
        }

        .form-section {
          margin-bottom: 20px;
        }

        .field-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .required {
          color: #e53935;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          font-size: 16px;
          box-sizing: border-box;
          transition: border-color 0.2s;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .field-helper {
          font-size: 12px;
          color: #888;
          margin: 6px 0 0 0;
        }

        .pins-form-section {
          background: #f9f9f9;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #e8e8e8;
        }

        .pins-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .toggle-pins-btn {
          padding: 6px 12px;
          background: transparent;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 13px;
          color: #666;
          cursor: pointer;
        }

        .toggle-pins-btn:hover {
          background: #eee;
        }

        .pins-section {
          margin-top: 12px;
        }

        .pin-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .pin-row:last-of-type {
          margin-bottom: 0;
        }

        .pin-label {
          font-size: 14px;
          color: #555;
          min-width: 80px;
        }

        .pin-input {
          flex: 1;
          padding: 10px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 16px;
          font-family: monospace;
          letter-spacing: 2px;
        }

        .pin-input:focus {
          outline: none;
          border-color: var(--color-primary, #2C6E49);
        }

        .back-btn {
          flex: 1;
          padding: 16px;
          background: #f5f5f5;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
        }

        .back-btn:hover:not(:disabled) {
          background: #e8e8e8;
        }

        .back-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .back-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .create-btn {
          flex: 2;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .create-btn:hover:not(:disabled) {
          background: var(--color-primary-dark, #1a402b);
        }

        .create-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .create-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

// ============================================
// Step 3: Confirmation
// ============================================

interface Step3Props {
  result: CreateGroupResult;
  groupName: string;
  onShareInvite: (method: 'copy' | 'whatsapp' | 'sms') => void;
  onSaveForSelf: () => void;
  onGoToGroup: () => void;
  copyFeedback: string | null;
}

function Step3Confirmation({ result, groupName, onShareInvite, onSaveForSelf, onGoToGroup, copyFeedback }: Step3Props) {
  return (
    <div class="step-content confirmation">
      {/* Success Icon */}
      <div class="success-icon">
        <svg viewBox="0 0 24 24" width="48" height="48" fill="white">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
        </svg>
      </div>

      <h2 class="step-title">Group Created!</h2>
      <p class="step-subtitle">"{groupName}" is ready to go</p>

      {/* Copy Feedback Toast */}
      {copyFeedback && (
        <div class="copy-feedback">{copyFeedback}</div>
      )}

      {/* Section 1: Save for Yourself */}
      <div class="save-section">
        <div class="section-header">
          <span class="section-icon">🔐</span>
          <span class="section-title">Save for yourself</span>
        </div>
        <div class="info-card">
          <div class="info-row">
            <span class="info-label">Link</span>
            <span class="info-value link">{result.shareUrl}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Group PIN</span>
            <span class="info-value pin">{result.groupPin}</span>
          </div>
          <div class="info-row admin-pin-row">
            <span class="info-label">Admin PIN</span>
            <span class="info-value pin admin">{result.adminPin}</span>
          </div>
        </div>
        <button class="save-btn" onClick={onSaveForSelf}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
          Save Details
        </button>
        <p class="admin-hint">Keep your Admin PIN private — it lets you manage settings</p>
      </div>

      {/* Section 2: Invite Friends */}
      <div class="invite-section">
        <div class="section-header">
          <span class="section-icon">👥</span>
          <span class="section-title">Invite friends</span>
        </div>
        <p class="invite-hint">Share the link + Group PIN (Admin PIN stays private)</p>
        <div class="share-buttons">
          <button class="share-btn whatsapp" onClick={() => onShareInvite('whatsapp')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button class="share-btn sms" onClick={() => onShareInvite('sms')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z" />
            </svg>
            SMS
          </button>
          <button class="share-btn copy" onClick={() => onShareInvite('copy')}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
            Copy
          </button>
        </div>
      </div>

      {/* Go to Group Button */}
      <button class="go-to-group-btn" onClick={onGoToGroup}>
        Go to My Group
      </button>

      <style>{`
        .confirmation {
          text-align: center;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: var(--color-primary, #2C6E49);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          animation: scaleIn 0.3s ease-out;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .copy-feedback {
          background: var(--color-primary, #2C6E49);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          display: inline-block;
          margin-bottom: 16px;
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .save-section,
        .invite-section {
          background: #f9f9f9;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          text-align: left;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .section-icon {
          font-size: 18px;
        }

        .section-title {
          font-size: 15px;
          font-weight: 600;
          color: #333;
        }

        .info-card {
          background: white;
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          font-size: 14px;
          color: #666;
        }

        .info-value {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .info-value.link {
          color: var(--color-primary, #2C6E49);
          word-break: break-all;
          text-align: right;
          max-width: 60%;
        }

        .info-value.pin {
          font-family: monospace;
          font-size: 16px;
          letter-spacing: 2px;
        }

        .info-value.pin.admin {
          color: var(--color-primary, #2C6E49);
          font-weight: 600;
        }

        .admin-pin-row {
          background: rgba(44, 110, 73, 0.08);
          margin: 0 -12px;
          padding: 8px 12px !important;
          border-radius: 0 0 8px 8px;
          border-bottom: none !important;
        }

        .save-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          background: var(--color-primary, #2C6E49);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .save-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .save-btn:active {
          transform: scale(0.98);
        }

        .admin-hint {
          font-size: 12px;
          color: #888;
          margin: 10px 0 0 0;
          text-align: center;
        }

        .invite-hint {
          font-size: 13px;
          color: #666;
          margin: 0 0 12px 0;
        }

        .share-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .share-btn {
          flex: 1 1 90px;
          min-width: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .share-btn:hover {
          opacity: 0.9;
        }

        .share-btn:active {
          transform: scale(0.95);
        }

        .share-btn.copy {
          background: #e0e0e0;
          color: #333;
        }

        .share-btn.whatsapp {
          background: #25D366;
          color: white;
        }

        .share-btn.sms {
          background: #2196F3;
          color: white;
        }

        .go-to-group-btn {
          width: 100%;
          padding: 16px;
          background: var(--color-primary, #2C6E49);
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          color: white;
          cursor: pointer;
        }

        .go-to-group-btn:hover {
          background: var(--color-primary-dark, #1a402b);
        }

        .go-to-group-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}

export default CreateGroupDrawer;
