/**
 * DOM utility functions
 * Note: These utilities work with DOM elements but are designed to be testable
 * by accepting element parameters rather than querying the DOM directly.
 */

/**
 * Safely get element by ID (returns null if not found)
 */
export function getElementById<T extends HTMLElement = HTMLElement>(
  id: string,
  doc: Document = document
): T | null {
  return doc.getElementById(id) as T | null;
}

/**
 * Safely query selector (returns null if not found)
 */
export function querySelector<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): T | null {
  return parent.querySelector<T>(selector);
}

/**
 * Query all matching elements
 */
export function querySelectorAll<T extends Element = Element>(
  selector: string,
  parent: Document | Element = document
): T[] {
  return Array.from(parent.querySelectorAll<T>(selector));
}

/**
 * Check if element has a class
 */
export function hasClass(element: Element | null, className: string): boolean {
  return element?.classList.contains(className) ?? false;
}

/**
 * Add class to element
 */
export function addClass(element: Element | null, ...classNames: string[]): void {
  if (element) {
    element.classList.add(...classNames);
  }
}

/**
 * Remove class from element
 */
export function removeClass(element: Element | null, ...classNames: string[]): void {
  if (element) {
    element.classList.remove(...classNames);
  }
}

/**
 * Toggle class on element
 */
export function toggleClass(element: Element | null, className: string, force?: boolean): boolean {
  if (!element) {
    return false;
  }
  return element.classList.toggle(className, force);
}

/**
 * Set element visibility (display none/block)
 */
export function setVisible(element: HTMLElement | null, visible: boolean): void {
  if (element) {
    element.style.display = visible ? '' : 'none';
  }
}

/**
 * Check if element is visible (not display:none)
 */
export function isVisible(element: HTMLElement | null): boolean {
  if (!element) {
    return false;
  }
  return element.style.display !== 'none' && !element.hidden;
}

/**
 * Set element's inner HTML safely
 */
export function setInnerHTML(element: Element | null, html: string): void {
  if (element) {
    element.innerHTML = html;
  }
}

/**
 * Set element's text content
 */
export function setTextContent(element: Element | null, text: string): void {
  if (element) {
    element.textContent = text;
  }
}

/**
 * Get element's text content
 */
export function getTextContent(element: Element | null): string {
  return element?.textContent ?? '';
}

/**
 * Set input value
 */
export function setInputValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null,
  value: string
): void {
  if (element) {
    element.value = value;
  }
}

/**
 * Get input value
 */
export function getInputValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
): string {
  return element?.value ?? '';
}

/**
 * Check if checkbox/radio is checked
 */
export function isChecked(element: HTMLInputElement | null): boolean {
  return element?.checked ?? false;
}

/**
 * Set checkbox/radio checked state
 */
export function setChecked(element: HTMLInputElement | null, checked: boolean): void {
  if (element) {
    element.checked = checked;
  }
}

/**
 * Set element attribute
 */
export function setAttribute(element: Element | null, name: string, value: string): void {
  if (element) {
    element.setAttribute(name, value);
  }
}

/**
 * Get element attribute
 */
export function getAttribute(element: Element | null, name: string): string | null {
  return element?.getAttribute(name) ?? null;
}

/**
 * Remove element attribute
 */
export function removeAttribute(element: Element | null, name: string): void {
  if (element) {
    element.removeAttribute(name);
  }
}

/**
 * Set data attribute
 */
export function setDataAttribute(element: HTMLElement | null, name: string, value: string): void {
  if (element) {
    element.dataset[name] = value;
  }
}

/**
 * Get data attribute
 */
export function getDataAttribute(element: HTMLElement | null, name: string): string | undefined {
  return element?.dataset[name];
}

/**
 * Enable/disable form element
 */
export function setDisabled(
  element: HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
  disabled: boolean
): void {
  if (element) {
    element.disabled = disabled;
  }
}

/**
 * Check if form element is disabled
 */
export function isDisabled(
  element: HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null
): boolean {
  return element?.disabled ?? false;
}

/**
 * Focus element
 */
export function focusElement(element: HTMLElement | null): void {
  element?.focus();
}

/**
 * Blur (unfocus) element
 */
export function blurElement(element: HTMLElement | null): void {
  element?.blur();
}

/**
 * Scroll element into view
 */
export function scrollIntoView(element: Element | null, options?: ScrollIntoViewOptions): void {
  element?.scrollIntoView(options);
}

/**
 * Remove element from DOM
 */
export function removeElement(element: Element | null): void {
  element?.remove();
}

/**
 * Append child to parent
 */
export function appendChild(parent: Element | null, child: Element | null): void {
  if (parent && child) {
    parent.appendChild(child);
  }
}

/**
 * Insert element before another
 */
export function insertBefore(
  parent: Element | null,
  newElement: Element | null,
  referenceElement: Element | null
): void {
  if (parent && newElement) {
    parent.insertBefore(newElement, referenceElement);
  }
}

/**
 * Clear all children from element
 */
export function clearChildren(element: Element | null): void {
  if (element) {
    element.innerHTML = '';
  }
}

/**
 * Create element with optional classes and attributes
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options?: {
    classes?: string[];
    attributes?: Record<string, string>;
    textContent?: string;
    innerHTML?: string;
  }
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  if (options?.classes) {
    element.classList.add(...options.classes);
  }

  if (options?.attributes) {
    for (const [name, value] of Object.entries(options.attributes)) {
      element.setAttribute(name, value);
    }
  }

  if (options?.textContent) {
    element.textContent = options.textContent;
  } else if (options?.innerHTML) {
    element.innerHTML = options.innerHTML;
  }

  return element;
}

/**
 * Add event listener with automatic cleanup function
 */
export function addEventListenerWithCleanup<K extends keyof HTMLElementEventMap>(
  element: HTMLElement | null,
  event: K,
  handler: (this: HTMLElement, ev: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): () => void {
  if (!element) {
    return () => {};
  }

  element.addEventListener(event, handler, options);

  return () => {
    element.removeEventListener(event, handler, options);
  };
}

/**
 * Get computed style value
 */
export function getComputedStyleValue(element: Element | null, property: string): string {
  if (!element) {
    return '';
  }
  return getComputedStyle(element).getPropertyValue(property);
}

/**
 * Set CSS custom property (CSS variable)
 */
export function setCSSVariable(element: HTMLElement | null, name: string, value: string): void {
  if (element) {
    element.style.setProperty(name, value);
  }
}

/**
 * Get bounding client rect safely
 */
export function getBoundingRect(element: Element | null): DOMRect | null {
  return element?.getBoundingClientRect() ?? null;
}

/**
 * Check if element matches selector
 */
export function matchesSelector(element: Element | null, selector: string): boolean {
  return element?.matches(selector) ?? false;
}

/**
 * Find closest ancestor matching selector
 */
export function closestElement<T extends Element = Element>(
  element: Element | null,
  selector: string
): T | null {
  return element?.closest<T>(selector) ?? null;
}

/**
 * Prevent default event behavior
 */
export function preventDefault(event: Event): void {
  event.preventDefault();
}

/**
 * Stop event propagation
 */
export function stopPropagation(event: Event): void {
  event.stopPropagation();
}

/**
 * Check if we're in a browser environment
 */
export function isBrowserEnvironment(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Safely access localStorage
 */
export function getLocalStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Safely set localStorage
 */
export function setLocalStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove localStorage item
 */
export function removeLocalStorageItem(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse JSON from localStorage safely
 */
export function getLocalStorageJSON<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch {
    return null;
  }
}

/**
 * Store JSON in localStorage safely
 */
export function setLocalStorageJSON<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

// Note: debounce and throttle are exported from helpers.ts

/**
 * Body scroll lock for modals/drawers
 * Uses a counter to handle multiple overlays
 */
let scrollLockCount = 0;
let savedScrollY = 0;

/**
 * Lock body scroll (prevents background scrolling when drawer/modal is open)
 */
export function lockBodyScroll(): void {
  if (scrollLockCount === 0) {
    savedScrollY = window.scrollY;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollY}px`;
    document.body.style.width = '100%';
  }
  scrollLockCount++;
}

/**
 * Unlock body scroll (restores scrolling when drawer/modal closes)
 */
export function unlockBodyScroll(): void {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, savedScrollY);
  }
}
