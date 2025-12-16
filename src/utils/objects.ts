/**
 * Object and array utility functions
 */

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

/**
 * Check if an object is empty (no own properties)
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Shallow merge objects (later objects override earlier ones)
 */
export function mergeObjects<T extends object>(...objects: Partial<T>[]): T {
  return Object.assign({}, ...objects) as T;
}

/**
 * Deep merge objects (recursively merges nested objects)
 */
export function deepMerge<T extends object>(...objects: Partial<T>[]): T {
  const result = {} as T;

  for (const obj of objects) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const existing = result[key];

        if (
          value !== null &&
          typeof value === 'object' &&
          !Array.isArray(value) &&
          existing !== null &&
          typeof existing === 'object' &&
          !Array.isArray(existing)
        ) {
          (result[key] as object) = deepMerge(existing as object, value as object);
        } else {
          result[key] = value as T[Extract<keyof T, string>];
        }
      }
    }
  }

  return result;
}

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Omit specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Group array items by a key
 */
export function groupBy<T>(items: T[], keyFn: (item: T) => string): Record<string, T[]> {
  return items.reduce(
    (groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Filter array by a date string key
 */
export function filterByDate<T extends { [K in DateKey]?: string }, DateKey extends string>(
  items: T[],
  dateKey: DateKey,
  targetDate: string
): T[] {
  return items.filter((item) => item[dateKey] === targetDate);
}

/**
 * Sort items by timestamp
 */
export function sortByTimestamp<T extends { timestamp: number }>(
  items: T[],
  ascending: boolean = true
): T[] {
  return [...items].sort((a, b) =>
    ascending ? a.timestamp - b.timestamp : b.timestamp - a.timestamp
  );
}

/**
 * Get unique items by a key
 */
export function uniqueBy<T>(items: T[], keyFn: (item: T) => string): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

/**
 * Find item index by predicate
 */
export function findIndexBy<T>(items: T[], predicate: (item: T) => boolean): number {
  for (let i = 0; i < items.length; i++) {
    if (predicate(items[i])) {
      return i;
    }
  }
  return -1;
}

/**
 * Remove item from array by predicate (returns new array)
 */
export function removeBy<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter((item) => !predicate(item));
}

/**
 * Update item in array by predicate (returns new array)
 */
export function updateBy<T>(
  items: T[],
  predicate: (item: T) => boolean,
  update: Partial<T> | ((item: T) => Partial<T>)
): T[] {
  return items.map((item) => {
    if (predicate(item)) {
      const updates = typeof update === 'function' ? update(item) : update;
      return { ...item, ...updates };
    }
    return item;
  });
}

/**
 * Count items matching a predicate
 */
export function countBy<T>(items: T[], predicate: (item: T) => boolean): number {
  return items.filter(predicate).length;
}

/**
 * Chunk array into smaller arrays
 */
export function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

/**
 * Flatten nested arrays
 */
export function flatten<T>(arrays: T[][]): T[] {
  return arrays.reduce((flat, arr) => flat.concat(arr), []);
}

/**
 * Create a lookup map from array
 */
export function toLookup<T>(items: T[], keyFn: (item: T) => string): Map<string, T> {
  const map = new Map<string, T>();
  for (const item of items) {
    map.set(keyFn(item), item);
  }
  return map;
}

/**
 * Get object keys with type safety
 */
export function typedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

/**
 * Get object values with type safety
 */
export function typedValues<T extends object>(obj: T): T[keyof T][] {
  return Object.values(obj) as T[keyof T][];
}

/**
 * Get object entries with type safety
 */
export function typedEntries<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
