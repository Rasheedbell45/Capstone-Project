import { getCurrentWeather as fetchCurrentWeather, getForecast as fetchForecast } from "../api/weatherApi";
import { saveToCache, getFromCache } from "../utils/cache";
import type { WeatherResponse, ForecastResponse } from "../api/weatherApi";

/**
 * Get current weather for a city, using cache if available.
 */
export async function getCurrentWeather(city: string): Promise<WeatherResponse> {
  const cacheKey = `weather:${city.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached as WeatherResponse;

  const res = await fetchCurrentWeather(city);
  saveToCache(cacheKey, res);
  return res;
}

/**
 * Get forecast for a city, using cache if available.
 */
export async function getForecast(city: string): Promise<ForecastResponse> {
  const cacheKey = `forecast:${city.toLowerCase()}`;
  const cached = getFromCache(cacheKey);
  if (cached) return cached as ForecastResponse;

  const res = await fetchForecast(city);
  saveToCache(cacheKey, res);
  return res;
}
