import client from "./client";

export const WeatherService = {
  getCurrent: (city: string) =>
    client.get("/weather", { params: { q: city } }),

  getForecast: (city: string) =>
    client.get("/forecast", { params: { q: city } }),
};
