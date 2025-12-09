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
