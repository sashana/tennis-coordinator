/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  setVisible,
  isVisible,
  setInnerHTML,
  setTextContent,
  getTextContent,
  setInputValue,
  getInputValue,
  isChecked,
  setChecked,
  setAttribute,
  getAttribute,
  removeAttribute,
  setDataAttribute,
  getDataAttribute,
  setDisabled,
  isDisabled,
  focusElement,
  blurElement,
  removeElement,
  appendChild,
  clearChildren,
  createElement,
  matchesSelector,
  closestElement,
  preventDefault,
  stopPropagation,
  querySelectorAll,
} from '../utils/dom';
import { debounce, throttle } from '../utils/helpers';

describe('hasClass', () => {
  it('returns true if element has class', () => {
    const div = document.createElement('div');
    div.classList.add('test-class');
    expect(hasClass(div, 'test-class')).toBe(true);
  });

  it('returns false if element does not have class', () => {
    const div = document.createElement('div');
    expect(hasClass(div, 'test-class')).toBe(false);
  });

  it('returns false for null element', () => {
    expect(hasClass(null, 'test-class')).toBe(false);
  });
});

describe('addClass', () => {
  it('adds class to element', () => {
    const div = document.createElement('div');
    addClass(div, 'test-class');
    expect(div.classList.contains('test-class')).toBe(true);
  });

  it('adds multiple classes', () => {
    const div = document.createElement('div');
    addClass(div, 'class1', 'class2', 'class3');
    expect(div.classList.contains('class1')).toBe(true);
    expect(div.classList.contains('class2')).toBe(true);
    expect(div.classList.contains('class3')).toBe(true);
  });

  it('handles null element gracefully', () => {
    expect(() => addClass(null, 'test-class')).not.toThrow();
  });
});

describe('removeClass', () => {
  it('removes class from element', () => {
    const div = document.createElement('div');
    div.classList.add('test-class');
    removeClass(div, 'test-class');
    expect(div.classList.contains('test-class')).toBe(false);
  });

  it('removes multiple classes', () => {
    const div = document.createElement('div');
    div.classList.add('class1', 'class2');
    removeClass(div, 'class1', 'class2');
    expect(div.classList.contains('class1')).toBe(false);
    expect(div.classList.contains('class2')).toBe(false);
  });

  it('handles null element gracefully', () => {
    expect(() => removeClass(null, 'test-class')).not.toThrow();
  });
});

describe('toggleClass', () => {
  it('toggles class on', () => {
    const div = document.createElement('div');
    toggleClass(div, 'test-class');
    expect(div.classList.contains('test-class')).toBe(true);
  });

  it('toggles class off', () => {
    const div = document.createElement('div');
    div.classList.add('test-class');
    toggleClass(div, 'test-class');
    expect(div.classList.contains('test-class')).toBe(false);
  });

  it('forces class on', () => {
    const div = document.createElement('div');
    toggleClass(div, 'test-class', true);
    expect(div.classList.contains('test-class')).toBe(true);
  });

  it('forces class off', () => {
    const div = document.createElement('div');
    div.classList.add('test-class');
    toggleClass(div, 'test-class', false);
    expect(div.classList.contains('test-class')).toBe(false);
  });

  it('returns false for null element', () => {
    expect(toggleClass(null, 'test-class')).toBe(false);
  });
});

describe('setVisible', () => {
  it('hides element', () => {
    const div = document.createElement('div');
    setVisible(div, false);
    expect(div.style.display).toBe('none');
  });

  it('shows element', () => {
    const div = document.createElement('div');
    div.style.display = 'none';
    setVisible(div, true);
    expect(div.style.display).toBe('');
  });

  it('handles null element gracefully', () => {
    expect(() => setVisible(null, false)).not.toThrow();
  });
});

describe('isVisible', () => {
  it('returns true for visible element', () => {
    const div = document.createElement('div');
    expect(isVisible(div)).toBe(true);
  });

  it('returns false for hidden element', () => {
    const div = document.createElement('div');
    div.style.display = 'none';
    expect(isVisible(div)).toBe(false);
  });

  it('returns false for null element', () => {
    expect(isVisible(null)).toBe(false);
  });
});

describe('setInnerHTML', () => {
  it('sets inner HTML', () => {
    const div = document.createElement('div');
    setInnerHTML(div, '<span>test</span>');
    expect(div.innerHTML).toBe('<span>test</span>');
  });

  it('handles null element gracefully', () => {
    expect(() => setInnerHTML(null, '<span>test</span>')).not.toThrow();
  });
});

describe('setTextContent / getTextContent', () => {
  it('sets text content', () => {
    const div = document.createElement('div');
    setTextContent(div, 'Hello World');
    expect(div.textContent).toBe('Hello World');
  });

  it('gets text content', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello World';
    expect(getTextContent(div)).toBe('Hello World');
  });

  it('returns empty string for null element', () => {
    expect(getTextContent(null)).toBe('');
  });
});

describe('setInputValue / getInputValue', () => {
  it('sets input value', () => {
    const input = document.createElement('input');
    setInputValue(input, 'test value');
    expect(input.value).toBe('test value');
  });

  it('gets input value', () => {
    const input = document.createElement('input');
    input.value = 'test value';
    expect(getInputValue(input)).toBe('test value');
  });

  it('returns empty string for null', () => {
    expect(getInputValue(null)).toBe('');
  });
});

describe('isChecked / setChecked', () => {
  it('sets checked state', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    setChecked(checkbox, true);
    expect(checkbox.checked).toBe(true);
  });

  it('gets checked state', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = true;
    expect(isChecked(checkbox)).toBe(true);
  });

  it('returns false for null', () => {
    expect(isChecked(null)).toBe(false);
  });
});

describe('setAttribute / getAttribute / removeAttribute', () => {
  it('sets attribute', () => {
    const div = document.createElement('div');
    setAttribute(div, 'data-test', 'value');
    expect(div.getAttribute('data-test')).toBe('value');
  });

  it('gets attribute', () => {
    const div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    expect(getAttribute(div, 'data-test')).toBe('value');
  });

  it('removes attribute', () => {
    const div = document.createElement('div');
    div.setAttribute('data-test', 'value');
    removeAttribute(div, 'data-test');
    expect(div.hasAttribute('data-test')).toBe(false);
  });

  it('getAttribute returns null for null element', () => {
    expect(getAttribute(null, 'data-test')).toBe(null);
  });
});

describe('setDataAttribute / getDataAttribute', () => {
  it('sets data attribute', () => {
    const div = document.createElement('div');
    setDataAttribute(div, 'testKey', 'testValue');
    expect(div.dataset.testKey).toBe('testValue');
  });

  it('gets data attribute', () => {
    const div = document.createElement('div');
    div.dataset.testKey = 'testValue';
    expect(getDataAttribute(div, 'testKey')).toBe('testValue');
  });

  it('returns undefined for null element', () => {
    expect(getDataAttribute(null, 'testKey')).toBeUndefined();
  });
});

describe('setDisabled / isDisabled', () => {
  it('disables element', () => {
    const button = document.createElement('button');
    setDisabled(button, true);
    expect(button.disabled).toBe(true);
  });

  it('enables element', () => {
    const button = document.createElement('button');
    button.disabled = true;
    setDisabled(button, false);
    expect(button.disabled).toBe(false);
  });

  it('checks if disabled', () => {
    const button = document.createElement('button');
    button.disabled = true;
    expect(isDisabled(button)).toBe(true);
  });

  it('returns false for null element', () => {
    expect(isDisabled(null)).toBe(false);
  });
});

describe('focusElement / blurElement', () => {
  it('focuses element', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    focusElement(input);
    expect(document.activeElement).toBe(input);
    input.remove();
  });

  it('blurs element', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();
    blurElement(input);
    expect(document.activeElement).not.toBe(input);
    input.remove();
  });

  it('handles null gracefully', () => {
    expect(() => focusElement(null)).not.toThrow();
    expect(() => blurElement(null)).not.toThrow();
  });
});

describe('removeElement', () => {
  it('removes element from DOM', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    parent.appendChild(child);
    removeElement(child);
    expect(parent.children.length).toBe(0);
  });

  it('handles null gracefully', () => {
    expect(() => removeElement(null)).not.toThrow();
  });
});

describe('appendChild', () => {
  it('appends child to parent', () => {
    const parent = document.createElement('div');
    const child = document.createElement('span');
    appendChild(parent, child);
    expect(parent.children[0]).toBe(child);
  });

  it('handles null parent gracefully', () => {
    const child = document.createElement('span');
    expect(() => appendChild(null, child)).not.toThrow();
  });

  it('handles null child gracefully', () => {
    const parent = document.createElement('div');
    expect(() => appendChild(parent, null)).not.toThrow();
  });
});

describe('clearChildren', () => {
  it('clears all children', () => {
    const parent = document.createElement('div');
    parent.innerHTML = '<span></span><span></span><span></span>';
    clearChildren(parent);
    expect(parent.children.length).toBe(0);
  });

  it('handles null gracefully', () => {
    expect(() => clearChildren(null)).not.toThrow();
  });
});

describe('createElement', () => {
  it('creates element', () => {
    const div = createElement('div');
    expect(div.tagName).toBe('DIV');
  });

  it('creates element with classes', () => {
    const div = createElement('div', { classes: ['class1', 'class2'] });
    expect(div.classList.contains('class1')).toBe(true);
    expect(div.classList.contains('class2')).toBe(true);
  });

  it('creates element with attributes', () => {
    const div = createElement('div', { attributes: { id: 'test', 'data-value': '123' } });
    expect(div.id).toBe('test');
    expect(div.getAttribute('data-value')).toBe('123');
  });

  it('creates element with text content', () => {
    const div = createElement('div', { textContent: 'Hello' });
    expect(div.textContent).toBe('Hello');
  });

  it('creates element with inner HTML', () => {
    const div = createElement('div', { innerHTML: '<span>Test</span>' });
    expect(div.innerHTML).toBe('<span>Test</span>');
  });
});

describe('querySelectorAll', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="test-item">1</div>
      <div class="test-item">2</div>
      <div class="test-item">3</div>
    `;
  });

  it('returns array of matching elements', () => {
    const items = querySelectorAll('.test-item');
    expect(items.length).toBe(3);
  });

  it('returns empty array if no matches', () => {
    const items = querySelectorAll('.nonexistent');
    expect(items.length).toBe(0);
  });
});

describe('matchesSelector', () => {
  it('returns true if matches', () => {
    const div = document.createElement('div');
    div.classList.add('test-class');
    expect(matchesSelector(div, '.test-class')).toBe(true);
  });

  it('returns false if does not match', () => {
    const div = document.createElement('div');
    expect(matchesSelector(div, '.test-class')).toBe(false);
  });

  it('returns false for null element', () => {
    expect(matchesSelector(null, '.test-class')).toBe(false);
  });
});

describe('closestElement', () => {
  it('finds closest ancestor', () => {
    const grandparent = document.createElement('div');
    grandparent.classList.add('grandparent');
    const parent = document.createElement('div');
    const child = document.createElement('div');
    grandparent.appendChild(parent);
    parent.appendChild(child);

    expect(closestElement(child, '.grandparent')).toBe(grandparent);
  });

  it('returns null if no match', () => {
    const div = document.createElement('div');
    expect(closestElement(div, '.nonexistent')).toBeNull();
  });

  it('returns null for null element', () => {
    expect(closestElement(null, '.test')).toBeNull();
  });
});

describe('preventDefault / stopPropagation', () => {
  it('prevents default', () => {
    const event = new Event('click', { cancelable: true });
    preventDefault(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('stops propagation', () => {
    const event = new Event('click');
    const spy = vi.spyOn(event, 'stopPropagation');
    stopPropagation(event);
    expect(spy).toHaveBeenCalled();
  });
});

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('debounces function calls', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced();
    debounced();
    debounced();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('passes arguments correctly', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    debounced('arg1', 'arg2');

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it('throttles function calls', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    throttled();

    expect(fn).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('passes arguments correctly', () => {
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled('arg1', 'arg2');

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
  });
});
