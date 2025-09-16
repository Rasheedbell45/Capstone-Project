import { useState } from "react";
import { WeatherService } from "../api/weatherService";

export const useWeather = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState("");

  const getWeather = async (city: string) => {
    try {
      setLoading(true);
      setError("");
      const data = await WeatherService.getCurrent(city);
      const forecastData = await WeatherService.getForecast(city);
      setWeather(data);
      setForecast(forecastData);
    } catch (err) {
      setError("Unable to fetch data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { weather, forecast, loading, error, getWeather };
};
