/**
 * Weather utilities
 */

import type { WeatherData, WeatherCache, WeatherLocation } from '@/types';

/**
 * Weather code descriptions (Open-Meteo codes)
 */
const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

/**
 * Weather icons (emoji)
 */
const WEATHER_ICONS: Record<number, string> = {
  0: '☀️',
  1: '🌤️',
  2: '⛅',
  3: '☁️',
  45: '🌫️',
  48: '🌫️',
  51: '🌧️',
  53: '🌧️',
  55: '🌧️',
  56: '🌧️',
  57: '🌧️',
  61: '🌧️',
  63: '🌧️',
  65: '🌧️',
  66: '🌧️',
  67: '🌧️',
  71: '🌨️',
  73: '🌨️',
  75: '🌨️',
  77: '🌨️',
  80: '🌦️',
  81: '🌦️',
  82: '🌦️',
  85: '🌨️',
  86: '🌨️',
  95: '⛈️',
  96: '⛈️',
  99: '⛈️',
};

/**
 * Get weather description from code
 */
export function getWeatherDescription(code: number): string {
  return WEATHER_DESCRIPTIONS[code] || 'Unknown';
}

/**
 * Get weather icon from code
 */
export function getWeatherIcon(code: number): string {
  return WEATHER_ICONS[code] || '❓';
}

/**
 * Check if weather is good for tennis
 */
export function isGoodTennisWeather(code: number): boolean {
  // Good weather: clear, partly cloudy, mainly clear, overcast
  return [0, 1, 2, 3].includes(code);
}

/**
 * Check if weather might affect play
 */
export function mightAffectPlay(code: number): boolean {
  // Any precipitation or thunder
  return code >= 51;
}

/**
 * Format temperature for display
 */
export function formatTemperature(
  temp: number,
  unit: 'C' | 'F' = 'F'
): string {
  const roundedTemp = Math.round(temp);
  return `${roundedTemp}°${unit}`;
}

/**
 * Convert Celsius to Fahrenheit
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

/**
 * Convert Fahrenheit to Celsius
 */
export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * Check if weather cache entry is still valid
 * @param cacheTimestamp - When the cache entry was created
 * @param maxAgeMs - Maximum age in milliseconds (default: 1 hour)
 */
export function isWeatherCacheValid(
  cacheTimestamp: number,
  maxAgeMs: number = 60 * 60 * 1000
): boolean {
  return Date.now() - cacheTimestamp < maxAgeMs;
}

/**
 * Get cached weather for a date if valid
 */
export function getCachedWeather(
  cache: WeatherCache,
  dateStr: string,
  maxAgeMs?: number
): WeatherData | null {
  const entry = cache[dateStr];
  if (!entry) return null;

  if (!isWeatherCacheValid(entry.timestamp, maxAgeMs)) return null;

  return entry.data;
}

/**
 * Update weather cache
 */
export function updateWeatherCache(
  cache: WeatherCache,
  dateStr: string,
  data: WeatherData
): WeatherCache {
  return {
    ...cache,
    [dateStr]: {
      data,
      timestamp: Date.now(),
    },
  };
}

/**
 * Build Open-Meteo API URL for forecast
 */
export function buildWeatherApiUrl(location: WeatherLocation): string {
  const { lat, lon } = location;
  return (
    `https://api.open-meteo.com/v1/forecast?` +
    `latitude=${lat}&longitude=${lon}&` +
    `daily=weathercode,temperature_2m_max,precipitation_probability_max&` +
    `temperature_unit=fahrenheit&` +
    `timezone=auto&` +
    `forecast_days=14`
  );
}

/**
 * Parse weather API response
 */
export function parseWeatherResponse(
  response: {
    daily: {
      time: string[];
      weathercode: number[];
      temperature_2m_max: number[];
      precipitation_probability_max: number[];
    };
  }
): Record<string, { temp: number; code: number; precipProb: number }> {
  const result: Record<string, { temp: number; code: number; precipProb: number }> = {};

  const { time, weathercode, temperature_2m_max, precipitation_probability_max } = response.daily;

  for (let i = 0; i < time.length; i++) {
    result[time[i]] = {
      temp: temperature_2m_max[i],
      code: weathercode[i],
      precipProb: precipitation_probability_max[i] || 0,
    };
  }

  return result;
}

/**
 * Get weather summary text
 */
export function getWeatherSummary(
  temp: number,
  code: number,
  precipProb: number
): string {
  const icon = getWeatherIcon(code);
  const tempStr = formatTemperature(temp);
  const desc = getWeatherDescription(code);

  let summary = `${icon} ${tempStr} - ${desc}`;

  if (precipProb > 0) {
    summary += ` (${precipProb}% precipitation)`;
  }

  return summary;
}
