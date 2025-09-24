import axios from "axios";

const KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
if (!KEY) {
  console.warn("VITE_OPENWEATHER_API_KEY is not set. Requests will fail.");
}

const BASE = "https://api.openweathermap.org/data/2.5";

const client = axios.create({
  baseURL: BASE,
  timeout: 10000
});

export const getCurrentWeatherRaw = (city: string) =>
  client.get("/weather", {
    params: { q: city, appid: KEY, units: "metric" }
  });

export const getForecastRaw = (city: string) =>
  client.get("/forecast", {
    params: { q: city, appid: KEY, units: "metric" }
  });
