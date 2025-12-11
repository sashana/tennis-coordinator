import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getWeatherDescription,
  getWeatherIcon,
  isGoodTennisWeather,
  mightAffectPlay,
  formatTemperature,
  celsiusToFahrenheit,
  fahrenheitToCelsius,
  isWeatherCacheValid,
  getCachedWeather,
  updateWeatherCache,
  buildWeatherApiUrl,
  parseWeatherResponse,
  getWeatherSummary,
} from '../utils/weather';
import type { WeatherCache, WeatherLocation } from '../types';

describe('getWeatherDescription', () => {
  it('returns correct descriptions', () => {
    expect(getWeatherDescription(0)).toBe('Clear sky');
    expect(getWeatherDescription(3)).toBe('Overcast');
    expect(getWeatherDescription(63)).toBe('Moderate rain');
    expect(getWeatherDescription(95)).toBe('Thunderstorm');
  });

  it('returns Unknown for unknown codes', () => {
    expect(getWeatherDescription(999)).toBe('Unknown');
  });
});

describe('getWeatherIcon', () => {
  it('returns correct icons', () => {
    expect(getWeatherIcon(0)).toBe('☀️');
    expect(getWeatherIcon(3)).toBe('☁️');
    expect(getWeatherIcon(63)).toBe('🌧️');
    expect(getWeatherIcon(95)).toBe('⛈️');
  });

  it('returns question mark for unknown codes', () => {
    expect(getWeatherIcon(999)).toBe('❓');
  });
});

describe('isGoodTennisWeather', () => {
  it('returns true for good weather', () => {
    expect(isGoodTennisWeather(0)).toBe(true); // Clear
    expect(isGoodTennisWeather(1)).toBe(true); // Mainly clear
    expect(isGoodTennisWeather(2)).toBe(true); // Partly cloudy
    expect(isGoodTennisWeather(3)).toBe(true); // Overcast
  });

  it('returns false for bad weather', () => {
    expect(isGoodTennisWeather(51)).toBe(false); // Drizzle
    expect(isGoodTennisWeather(63)).toBe(false); // Rain
    expect(isGoodTennisWeather(95)).toBe(false); // Thunderstorm
  });
});

describe('mightAffectPlay', () => {
  it('returns false for good weather', () => {
    expect(mightAffectPlay(0)).toBe(false);
    expect(mightAffectPlay(3)).toBe(false);
  });

  it('returns true for precipitation', () => {
    expect(mightAffectPlay(51)).toBe(true);
    expect(mightAffectPlay(63)).toBe(true);
    expect(mightAffectPlay(95)).toBe(true);
  });
});

describe('formatTemperature', () => {
  it('formats temperature in Fahrenheit', () => {
    expect(formatTemperature(72, 'F')).toBe('72°F');
    expect(formatTemperature(68.6, 'F')).toBe('69°F');
  });

  it('formats temperature in Celsius', () => {
    expect(formatTemperature(25, 'C')).toBe('25°C');
  });

  it('defaults to Fahrenheit', () => {
    expect(formatTemperature(72)).toBe('72°F');
  });
});

describe('celsiusToFahrenheit', () => {
  it('converts correctly', () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(20)).toBeCloseTo(68);
  });
});

describe('fahrenheitToCelsius', () => {
  it('converts correctly', () => {
    expect(fahrenheitToCelsius(32)).toBe(0);
    expect(fahrenheitToCelsius(212)).toBe(100);
    expect(fahrenheitToCelsius(68)).toBeCloseTo(20);
  });
});

describe('isWeatherCacheValid', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns true for recent cache', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    const cacheTime = now - 30 * 60 * 1000; // 30 minutes ago
    expect(isWeatherCacheValid(cacheTime)).toBe(true);
  });

  it('returns false for expired cache', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    const cacheTime = now - 2 * 60 * 60 * 1000; // 2 hours ago
    expect(isWeatherCacheValid(cacheTime)).toBe(false);
  });

  it('respects custom max age', () => {
    const now = Date.now();
    vi.setSystemTime(now);
    const cacheTime = now - 30 * 60 * 1000; // 30 minutes ago
    expect(isWeatherCacheValid(cacheTime, 15 * 60 * 1000)).toBe(false); // 15 min max
    expect(isWeatherCacheValid(cacheTime, 60 * 60 * 1000)).toBe(true); // 1 hour max
  });
});

describe('getCachedWeather', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns cached data if valid', () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const cache: WeatherCache = {
      '2024-01-15': {
        data: { temperature: 72, condition: 'Sunny', icon: '☀️' },
        timestamp: now - 30 * 60 * 1000,
      },
    };

    const result = getCachedWeather(cache, '2024-01-15');
    expect(result).toEqual({ temperature: 72, condition: 'Sunny', icon: '☀️' });
  });

  it('returns null for expired cache', () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const cache: WeatherCache = {
      '2024-01-15': {
        data: { temperature: 72, condition: 'Sunny', icon: '☀️' },
        timestamp: now - 2 * 60 * 60 * 1000,
      },
    };

    expect(getCachedWeather(cache, '2024-01-15')).toBeNull();
  });

  it('returns null for missing date', () => {
    const cache: WeatherCache = {};
    expect(getCachedWeather(cache, '2024-01-15')).toBeNull();
  });
});

describe('updateWeatherCache', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds entry to cache', () => {
    const now = Date.now();
    vi.setSystemTime(now);

    const cache: WeatherCache = {};
    const data = { temperature: 72, condition: 'Sunny', icon: '☀️' };
    const result = updateWeatherCache(cache, '2024-01-15', data);

    expect(result['2024-01-15'].data).toEqual(data);
    expect(result['2024-01-15'].timestamp).toBe(now);
  });

  it('preserves existing entries', () => {
    const cache: WeatherCache = {
      '2024-01-14': {
        data: { temperature: 68, condition: 'Cloudy', icon: '☁️' },
        timestamp: Date.now(),
      },
    };

    const result = updateWeatherCache(cache, '2024-01-15', {
      temperature: 72,
      condition: 'Sunny',
      icon: '☀️',
    });

    expect(result['2024-01-14']).toBeDefined();
    expect(result['2024-01-15']).toBeDefined();
  });
});

describe('buildWeatherApiUrl', () => {
  it('builds correct URL', () => {
    const location: WeatherLocation = {
      name: 'Los Gatos',
      lat: 37.2358,
      lon: -121.9623,
    };

    const url = buildWeatherApiUrl(location);
    expect(url).toContain('api.open-meteo.com');
    expect(url).toContain('latitude=37.2358');
    expect(url).toContain('longitude=-121.9623');
    expect(url).toContain('forecast_days=14');
  });
});

describe('parseWeatherResponse', () => {
  it('parses response into date-keyed object', () => {
    const response = {
      daily: {
        time: ['2024-01-15', '2024-01-16'],
        weathercode: [0, 63],
        temperature_2m_max: [72, 58],
        precipitation_probability_max: [0, 80],
      },
    };

    const result = parseWeatherResponse(response);
    expect(result['2024-01-15']).toEqual({ temp: 72, code: 0, precipProb: 0 });
    expect(result['2024-01-16']).toEqual({ temp: 58, code: 63, precipProb: 80 });
  });
});

describe('getWeatherSummary', () => {
  it('formats summary correctly', () => {
    const summary = getWeatherSummary(72, 0, 0);
    expect(summary).toContain('☀️');
    expect(summary).toContain('72°F');
    expect(summary).toContain('Clear sky');
  });

  it('includes precipitation probability when > 0', () => {
    const summary = getWeatherSummary(58, 63, 80);
    expect(summary).toContain('80% precipitation');
  });
});
