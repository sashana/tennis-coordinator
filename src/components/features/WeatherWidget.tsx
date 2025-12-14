import { signal, effect } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import { selectedDate } from '../App';
import { groupSettings } from '../../hooks/useFirebase';

interface WeatherData {
  tempMax: number;
  tempMin: number;
  precipProb: number;
  weatherCode: number;
}

export const weatherCache = signal<Record<string, WeatherData>>({});
const currentWeather = signal<WeatherData | null>(null);
const isLoading = signal(false);

// Weather code to description mapping (with icon included in text)
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: '☀️ Clear sky',
    1: '🌤️ Mainly clear',
    2: '⛅ Partly cloudy',
    3: '☁️ Overcast',
    45: '🌫️ Foggy',
    48: '🌫️ Foggy',
    51: '🌦️ Light drizzle',
    53: '🌦️ Drizzle',
    55: '🌧️ Heavy drizzle',
    61: '🌧️ Light rain',
    63: '🌧️ Rain',
    65: '🌧️ Heavy rain',
    71: '🌨️ Light snow',
    73: '🌨️ Snow',
    75: '🌨️ Heavy snow',
    77: '🌨️ Snow grains',
    80: '🌦️ Rain showers',
    81: '🌧️ Rain showers',
    82: '⛈️ Heavy rain showers',
    85: '🌨️ Snow showers',
    86: '🌨️ Heavy snow showers',
    95: '⛈️ Thunderstorm',
    96: '⛈️ Thunderstorm with hail',
    99: '⛈️ Severe thunderstorm',
  };

  return weatherCodes[code] || '🌡️ Weather';
}

async function fetchWeather(lat: number, lon: number, date: string): Promise<WeatherData | null> {
  // Check cache first
  const cacheKey = `${lat},${lon},${date}`;
  if (weatherCache.value[cacheKey]) {
    return weatherCache.value[cacheKey];
  }

  try {
    // Fetch 14 days of forecast data
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode&temperature_unit=fahrenheit&timezone=America/Los_Angeles&forecast_days=14`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API error');

    const data = await response.json();

    if (!data.daily || !data.daily.time || !Array.isArray(data.daily.time)) {
      throw new Error('Invalid weather data format');
    }

    // Find the index for our selected date
    const dateIndex = data.daily.time.indexOf(date);

    if (dateIndex === -1) {
      throw new Error('Weather data not available for this date');
    }

    const weatherData: WeatherData = {
      tempMax: Math.round(data.daily.temperature_2m_max[dateIndex]),
      tempMin: Math.round(data.daily.temperature_2m_min[dateIndex]),
      precipProb: data.daily.precipitation_probability_max[dateIndex] || 0,
      weatherCode: data.daily.weathercode[dateIndex],
    };

    // Update cache
    weatherCache.value = {
      ...weatherCache.value,
      [cacheKey]: weatherData,
    };

    return weatherData;
  } catch (error) {
    console.error('Weather fetch error:', error);
  }

  return null;
}

export function WeatherWidget() {
  useEffect(() => {
    const dispose = effect(() => {
      const date = selectedDate.value;
      const location = groupSettings.value.location;

      if (!date) return;

      // Check if date is within 14 days (API limitation)
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDateObj = new Date(date + 'T00:00:00');
      const diffDays = Math.floor((selectedDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays < 0 || diffDays >= 14) {
        currentWeather.value = null;
        return;
      }

      // Default to Los Gatos, CA if no location set
      const lat = location?.lat ?? 37.2358;
      const lon = location?.lon ?? -121.9623;

      isLoading.value = true;

      fetchWeather(lat, lon, date).then((weather) => {
        currentWeather.value = weather;
        isLoading.value = false;
      });
    });

    return () => dispose();
  }, []);

  if (isLoading.value) {
    return (
      <div
        id="weatherWidget"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px 14px',
          background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)',
          borderRadius: '10px',
          marginBottom: '8px',
          fontSize: '13px',
          boxShadow: 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))',
          color: '#666',
        }}
      >
        Loading weather...
      </div>
    );
  }

  if (!currentWeather.value) {
    return null;
  }

  const weather = currentWeather.value;
  const locationName = groupSettings.value.location?.name || 'Los Gatos, CA';

  return (
    <div
      id="weatherWidget"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: 'linear-gradient(135deg, #e3f2fd 0%, #f0f4ff 100%)',
        borderRadius: '10px',
        marginBottom: '8px',
        fontSize: '13px',
        boxShadow: 'var(--shadow-md, 0 2px 8px rgba(0,0,0,0.05))',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontWeight: 600, color: '#1976d2' }}>{locationName}</span>
        <span style={{ color: '#666' }}>•</span>
        <span style={{ color: '#666' }}>{getWeatherDescription(weather.weatherCode)}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontWeight: 600, color: '#333' }}>
          {weather.tempMin}°-{weather.tempMax}°F
        </span>
        {weather.precipProb > 0 && (
          <span style={{ color: '#1976d2' }}>💧{weather.precipProb}%</span>
        )}
      </div>
    </div>
  );
}
