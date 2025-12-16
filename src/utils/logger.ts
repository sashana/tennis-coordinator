/**
 * Development logging utility
 *
 * Logs are only shown in development mode (NOT in production builds)
 * This prevents console.log statements from appearing in production
 */

const isDev = import.meta.env.DEV;

/**
 * Log debug information (development only)
 * @param message - Primary log message
 * @param data - Optional data to log
 */
export function logDebug(message: string, data?: unknown): void {
  if (isDev) {
    if (data !== undefined) {
      console.log(message, data);
    } else {
      console.log(message);
    }
  }
}

/**
 * Log informational message (development only)
 * @param message - Info message
 * @param data - Optional data
 */
export function logInfo(message: string, data?: unknown): void {
  if (isDev) {
    if (data !== undefined) {
      console.log(`ℹ️ ${message}`, data);
    } else {
      console.log(`ℹ️ ${message}`);
    }
  }
}

/**
 * Log warning (shown in both dev and production)
 * @param message - Warning message
 * @param data - Optional data
 */
export function logWarn(message: string, data?: unknown): void {
  if (data !== undefined) {
    console.warn(message, data);
  } else {
    console.warn(message);
  }
}

/**
 * Log error (shown in both dev and production)
 * @param message - Error message
 * @param error - Error object or data
 */
export function logError(message: string, error?: unknown): void {
  if (error !== undefined) {
    console.error(message, error);
  } else {
    console.error(message);
  }
}

/**
 * Create a namespaced logger for a specific module
 * @param namespace - Module name (e.g., 'Firebase', 'Theme', 'Notifications')
 * @returns Logger object with debug/info/warn/error methods
 */
export function createLogger(namespace: string) {
  const prefix = `[${namespace}]`;

  return {
    debug: (message: string, data?: unknown) => logDebug(`${prefix} ${message}`, data),
    info: (message: string, data?: unknown) => logInfo(`${prefix} ${message}`, data),
    warn: (message: string, data?: unknown) => logWarn(`${prefix} ${message}`, data),
    error: (message: string, error?: unknown) => logError(`${prefix} ${message}`, error),
  };
}

/**
 * Example usage:
 *
 * ```typescript
 * import { createLogger } from './utils/logger';
 *
 * const logger = createLogger('MyModule');
 *
 * logger.debug('Initializing...'); // Only in dev
 * logger.info('Data loaded', data); // Only in dev
 * logger.warn('Deprecated API used'); // Always shown
 * logger.error('Failed to load', error); // Always shown
 * ```
 */
