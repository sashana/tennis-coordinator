/**
 * Text utility functions
 */

/**
 * Truncate text to a maximum length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
}

/**
 * Capitalize the first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Capitalize just the first letter of the string
 */
export function capitalizeFirst(text: string): string {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Pluralize a word based on count
 * @param word - The singular form of the word
 * @param count - The count to determine singular/plural
 * @param pluralForm - Optional custom plural form (defaults to word + 's')
 */
export function pluralize(word: string, count: number, pluralForm?: string): string {
  if (count === 1) {
    return word;
  }
  return pluralForm || word + 's';
}

/**
 * Pluralize a word with the count included (e.g., "3 players")
 */
export function pluralizeWithCount(word: string, count: number, pluralForm?: string): string {
  return `${count} ${pluralize(word, count, pluralForm)}`;
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Encode text for use in a URL
 */
export function encodeForUrl(text: string): string {
  return encodeURIComponent(text);
}

/**
 * Generate initials from a name (e.g., "John Doe" -> "JD")
 */
export function getInitials(name: string, maxLength: number = 2): string {
  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxLength)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
  return initials;
}

/**
 * Check if a string contains only whitespace
 */
export function isBlank(text: string): boolean {
  return text.trim().length === 0;
}

/**
 * Normalize whitespace (trim and collapse multiple spaces)
 */
export function normalizeWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Create a slug from text (lowercase, hyphens for spaces)
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Extract numbers from a string
 */
export function extractNumbers(text: string): number[] {
  const matches = text.match(/-?\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

/**
 * Pad a string to a minimum length
 */
export function padStart(text: string, length: number, padChar: string = ' '): string {
  if (text.length >= length) {
    return text;
  }
  return padChar.repeat(length - text.length) + text;
}

/**
 * Pad a string to a minimum length (end)
 */
export function padEnd(text: string, length: number, padChar: string = ' '): string {
  if (text.length >= length) {
    return text;
  }
  return text + padChar.repeat(length - text.length);
}

/**
 * Remove diacritics/accents from text
 */
export function removeDiacritics(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Compare strings case-insensitively
 */
export function equalsIgnoreCase(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}

/**
 * Check if string contains substring (case-insensitive)
 */
export function containsIgnoreCase(text: string, search: string): boolean {
  return text.toLowerCase().includes(search.toLowerCase());
}
