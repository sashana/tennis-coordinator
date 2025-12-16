import { describe, it, expect } from 'vitest';
import {
  deepClone,
  isEmptyObject,
  mergeObjects,
  deepMerge,
  pick,
  omit,
  groupBy,
  filterByDate,
  sortByTimestamp,
  uniqueBy,
  findIndexBy,
  removeBy,
  updateBy,
  countBy,
  chunk,
  flatten,
  toLookup,
  typedKeys,
  typedValues,
  typedEntries,
} from '../utils/objects';

describe('deepClone', () => {
  it('clones primitive values', () => {
    expect(deepClone(42)).toBe(42);
    expect(deepClone('hello')).toBe('hello');
    expect(deepClone(null)).toBe(null);
  });

  it('clones arrays', () => {
    const arr = [1, 2, { a: 3 }];
    const cloned = deepClone(arr);
    expect(cloned).toEqual(arr);
    expect(cloned).not.toBe(arr);
    expect(cloned[2]).not.toBe(arr[2]);
  });

  it('clones nested objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = deepClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });
});

describe('isEmptyObject', () => {
  it('returns true for empty object', () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it('returns false for non-empty object', () => {
    expect(isEmptyObject({ a: 1 })).toBe(false);
  });
});

describe('mergeObjects', () => {
  it('merges multiple objects', () => {
    const result = mergeObjects(
      { a: 1 } as Record<string, number>,
      { b: 2 } as Record<string, number>,
      { c: 3 } as Record<string, number>
    );
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('later values override earlier ones', () => {
    const result = mergeObjects({ a: 1 }, { a: 2 });
    expect(result).toEqual({ a: 2 });
  });
});

describe('deepMerge', () => {
  it('deeply merges nested objects', () => {
    const result = deepMerge(
      { a: { b: 1, c: 2 } } as Record<string, Record<string, number>>,
      { a: { c: 3, d: 4 } } as Record<string, Record<string, number>>
    );
    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it('handles arrays by replacement', () => {
    const result = deepMerge({ a: [1, 2] }, { a: [3, 4] });
    expect(result).toEqual({ a: [3, 4] });
  });
});

describe('pick', () => {
  it('picks specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
  });

  it('ignores missing keys', () => {
    const obj = { a: 1 };
    expect(pick(obj, ['a', 'b' as keyof typeof obj])).toEqual({ a: 1 });
  });
});

describe('omit', () => {
  it('omits specified keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(omit(obj, ['b'])).toEqual({ a: 1, c: 3 });
  });
});

describe('groupBy', () => {
  it('groups items by key function', () => {
    const items = [
      { type: 'fruit', name: 'apple' },
      { type: 'vegetable', name: 'carrot' },
      { type: 'fruit', name: 'banana' },
    ];
    const result = groupBy(items, (item) => item.type);
    expect(result.fruit.length).toBe(2);
    expect(result.vegetable.length).toBe(1);
  });
});

describe('filterByDate', () => {
  it('filters items by date key', () => {
    const items = [
      { date: '2024-01-15', name: 'a' },
      { date: '2024-01-16', name: 'b' },
      { date: '2024-01-15', name: 'c' },
    ];
    const result = filterByDate(items, 'date', '2024-01-15');
    expect(result.length).toBe(2);
    expect(result.map((i) => i.name)).toEqual(['a', 'c']);
  });
});

describe('sortByTimestamp', () => {
  it('sorts ascending by default', () => {
    const items = [{ timestamp: 3000 }, { timestamp: 1000 }, { timestamp: 2000 }];
    const result = sortByTimestamp(items);
    expect(result.map((i) => i.timestamp)).toEqual([1000, 2000, 3000]);
  });

  it('sorts descending when specified', () => {
    const items = [{ timestamp: 1000 }, { timestamp: 3000 }, { timestamp: 2000 }];
    const result = sortByTimestamp(items, false);
    expect(result.map((i) => i.timestamp)).toEqual([3000, 2000, 1000]);
  });

  it('does not mutate original array', () => {
    const items = [{ timestamp: 2 }, { timestamp: 1 }];
    sortByTimestamp(items);
    expect(items[0].timestamp).toBe(2);
  });
});

describe('uniqueBy', () => {
  it('returns unique items by key', () => {
    const items = [
      { id: '1', name: 'first' },
      { id: '2', name: 'second' },
      { id: '1', name: 'duplicate' },
    ];
    const result = uniqueBy(items, (item) => item.id);
    expect(result.length).toBe(2);
    expect(result.map((i) => i.name)).toEqual(['first', 'second']);
  });
});

describe('findIndexBy', () => {
  it('returns index of matching item', () => {
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(findIndexBy(items, (i) => i.id === 2)).toBe(1);
  });

  it('returns -1 if not found', () => {
    const items = [{ id: 1 }];
    expect(findIndexBy(items, (i) => i.id === 5)).toBe(-1);
  });
});

describe('removeBy', () => {
  it('removes items matching predicate', () => {
    const items = [1, 2, 3, 4, 5];
    const result = removeBy(items, (n) => n % 2 === 0);
    expect(result).toEqual([1, 3, 5]);
  });

  it('does not mutate original array', () => {
    const items = [1, 2, 3];
    removeBy(items, (n) => n === 2);
    expect(items).toEqual([1, 2, 3]);
  });
});

describe('updateBy', () => {
  it('updates items matching predicate with object', () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ];
    const result = updateBy(items, (i) => i.id === 1, { name: 'updated' });
    expect(result[0].name).toBe('updated');
    expect(result[1].name).toBe('b');
  });

  it('updates items matching predicate with function', () => {
    const items = [
      { id: 1, count: 5 },
      { id: 2, count: 10 },
    ];
    const result = updateBy(
      items,
      (i) => i.id === 2,
      (i) => ({ count: i.count + 1 })
    );
    expect(result[1].count).toBe(11);
  });
});

describe('countBy', () => {
  it('counts items matching predicate', () => {
    const items = [1, 2, 3, 4, 5];
    expect(countBy(items, (n) => n > 2)).toBe(3);
  });
});

describe('chunk', () => {
  it('chunks array into smaller arrays', () => {
    const items = [1, 2, 3, 4, 5];
    expect(chunk(items, 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('handles array smaller than chunk size', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });
});

describe('flatten', () => {
  it('flattens nested arrays', () => {
    expect(flatten([[1, 2], [3], [4, 5]])).toEqual([1, 2, 3, 4, 5]);
  });

  it('handles empty arrays', () => {
    expect(flatten([[], [1], []])).toEqual([1]);
  });
});

describe('toLookup', () => {
  it('creates lookup map from array', () => {
    const items = [
      { id: 'a', value: 1 },
      { id: 'b', value: 2 },
    ];
    const lookup = toLookup(items, (i) => i.id);
    expect(lookup.get('a')).toEqual({ id: 'a', value: 1 });
    expect(lookup.get('b')).toEqual({ id: 'b', value: 2 });
  });
});

describe('typedKeys', () => {
  it('returns typed keys', () => {
    const obj = { a: 1, b: 2 };
    const keys = typedKeys(obj);
    expect(keys).toEqual(['a', 'b']);
  });
});

describe('typedValues', () => {
  it('returns typed values', () => {
    const obj = { a: 1, b: 2 };
    const values = typedValues(obj);
    expect(values).toEqual([1, 2]);
  });
});

describe('typedEntries', () => {
  it('returns typed entries', () => {
    const obj = { a: 1, b: 2 };
    const entries = typedEntries(obj);
    expect(entries).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });
});
