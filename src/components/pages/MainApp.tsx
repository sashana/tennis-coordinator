import { signal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import {
  currentGroupId,
  currentGroupName,
  selectedDate,
  sessionUser,
} from '../App';
import { useGroupData, useCheckins, useMatchNotes, groupSettings } from '../../hooks/useFirebase';
import { Header } from '../layout/Header';
import { PinModal } from '../ui/PinModal';
import { AdminSettingsModal } from '../modals/AdminSettingsModal';
import { ActivityHistoryModal } from '../modals/ActivityHistoryModal';
import { MemberManagementModal } from '../modals/MemberManagementModal';
import { useNotifications } from '../modals/NotificationsModal';
import { InvitePromptModal } from '../modals/InvitePromptModal';
import { WelcomeModal, showWelcomeModal } from '../ui/WelcomeModal';
import { SharePromptBanner } from '../ui/SharePromptBanner';
import { getTodayDate } from '../../utils/helpers';
import { BottomTabBar, activeTab } from '../navigation/BottomTabBar';
import { CheckInTab } from '../tabs/CheckInTab';
import { MyMatchesTab } from '../tabs/MyMatchesTab';
import { NotificationsTab } from '../tabs/NotificationsTab';
import { HelpTab } from '../tabs/HelpTab';
import { ProfileTab } from '../tabs/ProfileTab';

// Form state
export const isFormExpanded = signal(false);
export const selectedName = signal('');
export const selectedPreference = signal('both');
export const isGuest = signal(false);
export const isNewMember = signal(false);
export const guestName = signal('');
export const newMemberName = signal('');
export const newMemberPhone = signal('');
export const newMemberEmail = signal('');
export const newMemberNotes = signal('');
export const addedBy = signal('');
export const allowRotation = signal(true);
export const startTime = signal('');
export const endTime = signal('');

// UI state
export const checkinListExpanded = signal(true);
export const isAuthenticated = signal(false);

// Share prompt state (after check-in, removal, or invite)
export const showSharePrompt = signal(false);
export const sharePromptData = signal<{
  action: 'checkin' | 'removal' | 'invite';
  name: string;
  playStyle?: string;
  timeRange?: { start: string; end: string };
  date: string;  // Store the date for removal messages
  isOwner?: boolean;  // For removal: was it self-removal or removing someone else
  // For invite action
  groupName?: string;
  groupUrl?: string;
  groupPin?: string;
} | null>(null);

export function MainApp() {
  // Initialize hooks
  useGroupData();
  useCheckins();
  useMatchNotes();
  useNotifications();

  // Check if already authenticated for this group (or if site admin)
  useEffect(() => {
    const groupId = currentGroupId.value;
    if (groupId) {
      // Site admin can bypass group PIN
      const isSiteAdmin = sessionStorage.getItem('siteAdminAuth') === 'true';
      if (isSiteAdmin) {
        isAuthenticated.value = true;
        return;
      }

      const authKey = `pinAuth_${groupId}`;
      const isAuth = sessionStorage.getItem(authKey) === 'true';
      isAuthenticated.value = isAuth;
    }
  }, [currentGroupId.value]);

  // Initialize selected date to today on mount
  useEffect(() => {
    selectedDate.value = getTodayDate();
  }, []);

  // Restore session user or show welcome modal
  useEffect(() => {
    const groupId = currentGroupId.value;
    if (groupId) {
      const savedUser = localStorage.getItem(`sessionUser_${groupId}`);
      if (savedUser) {
        sessionUser.value = savedUser;
      } else if (isAuthenticated.value) {
        // Authenticated but no saved user - show welcome modal
        showWelcomeModal.value = true;
      }
    }
  }, [currentGroupId.value, isAuthenticated.value]);

  const handlePinSuccess = () => {
    const groupId = currentGroupId.value;
    if (groupId) {
      sessionStorage.setItem(`pinAuth_${groupId}`, 'true');
    }
    isAuthenticated.value = true;

    // Scroll to top to ensure header is visible (especially on mobile browsers)
    window.scrollTo(0, 0);

    // Show welcome modal if no session user set
    if (!sessionUser.value) {
      showWelcomeModal.value = true;
    }
  };

  // Show PIN modal if not authenticated and we have the group PIN loaded
  const showPinModal = !isAuthenticated.value && !!groupSettings.value.groupPin;

  return (
    <>
      <PinModal
        isOpen={showPinModal}
        groupName={currentGroupName.value}
        correctPin={groupSettings.value.groupPin}
        onSuccess={handlePinSuccess}
      />

      {/* Modals */}
      <WelcomeModal />
      <AdminSettingsModal />
      <ActivityHistoryModal />
      <MemberManagementModal />
      <InvitePromptModal />

      <div class="container" id="appContainer" style={showPinModal ? 'filter: blur(5px); pointer-events: none;' : ''}>
        <Header />

        {/* Tab Content */}
        <div style="padding-bottom: 80px;">
          {activeTab.value === 'checkin' && <CheckInTab />}
          {activeTab.value === 'matches' && <MyMatchesTab />}
          {activeTab.value === 'notifications' && <NotificationsTab />}
          {activeTab.value === 'help' && <HelpTab />}
          {activeTab.value === 'profile' && <ProfileTab />}
        </div>
      </div>

      <SharePromptBanner />
      <BottomTabBar />
    </>
  );
}
