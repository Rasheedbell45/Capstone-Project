import { getCurrentWeather, getForecast } from "../api/weatherApi";

export async function fetchCurrentWeather(city: string) {
  const res = await getCurrentWeather(city);
  return res; // already returns the weather object
}

export async function fetchForecast(city: string) {
  const res = await getForecast(city);
  return res; // already returns the forecast object
}
