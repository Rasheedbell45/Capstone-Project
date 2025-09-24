import { getCurrentWeatherRaw, getForecastRaw } from "../api/weatherApi";

export async function getCurrentWeather(city: string) {
  const res = await getCurrentWeatherRaw(city);
  // return res.data for full object
  return res.data;
}

export async function getForecast(city: string) {
  const res = await getForecastRaw(city);
  // OpenWeatherMap forecast has list of 3-hour entries.
  // We'll return the raw list — UI will pick daily entries if needed.
  return res.data;
}
