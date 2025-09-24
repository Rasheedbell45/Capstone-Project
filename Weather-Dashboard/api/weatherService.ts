import { API_KEY, API_URL } from "../config";
import { apiClient } from "./client";

export async function getCurrentWeather(city: string) {
  return apiClient(`${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
}

export async function getForecast(city: string) {
  return apiClient(`${API_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
}
