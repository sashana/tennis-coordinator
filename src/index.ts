/**
 * Tennis Coordinator - Main Entry Point
 *
 * This module exports all types and utilities for the Tennis Coordinator application.
 */

// Export all types
export * from './types';

// Export utilities
export * from './utils/helpers';
export * from './utils/matching';
export * from './utils/notifications';
export * from './utils/activity';
export * from './utils/datetime';
export * from './utils/text';
export * from './utils/objects';
export * from './utils/display';
export * from './utils/sharing';
export * from './utils/weather';
export * from './utils/validation';
export {
  findMemberByName,
  isMember,
  getMemberDetails,
  getMemberContact,
  sortMembersAlphabetically,
  sortMembersByCheckinStatus,
  filterActiveMembers,
  isMemberCheckedIn,
  getMemberCheckin,
  getMembersNotCheckedIn,
  addMemberToList,
  removeMemberFromList,
  updateMemberDetails,
  removeMemberDetails,
  getMemberCount,
  getMembersAddedBy,
  renameMemberInList,
  transferMemberDetails,
  updateCheckinNames,
  // isDuplicateName is already exported from validation
  validateMemberName,
} from './utils/members';
export * from './utils/checkins';
export * from './utils/matchNotes';
export * from './utils/groups';
export * from './utils/dom';

// Export services
export { FirebaseService, createFirebaseService, firebasePaths } from './services/firebase';

// Export state management
export {
  AppStore,
  createAppStore,
  createInitialState,
  getDefaultStore,
  resetDefaultStore,
} from './state';
export type { StateListener } from './state';
