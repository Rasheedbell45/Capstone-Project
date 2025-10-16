import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import ErrorMessage from "../components/ErrorMessage";
import { getCurrentWeather, getForecast } from "../services/weatherService";
import { saveToCache, getFromCache } from "../utils/cache";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);
  const cacheKey = city ? `weather:${city.toLowerCase()}` : null;

  const onSearch = useCallback((c: string) => setCity(c), []);

  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: async () => {
      if (!city) throw new Error("No city provided");
      const cached = cacheKey ? getFromCache(cacheKey) : null;
      if (cached?.weather) return cached.weather;
      const data = await getCurrentWeather(city);
      if (cacheKey) saveToCache(cacheKey, { weather: data });
      return data;
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
  });

  // ✅ Fixed forecast useQuery (v5 syntax)
  const {
    data: forecastData,
    isLoading: forecastLoading,
  } = useQuery({
    queryKey: ["forecast", city],
    queryFn: async () => {
      if (!city) return null;
      const res = await getForecast(city);
      return res.list.filter((_: any, i: number) => i % 8 === 0);
    },
    enabled: !!city,
    staleTime: 1000 * 60 * 30,
  });

  return (
    <main className="py-8 px-4">
      <header className="max-w-4xl mx-auto mb-6 text-center text-white">
        <h1 className="text-3xl font-bold">🌦 Weather Dashboard</h1>
        <p className="text-sm mt-1">Fast, cached weather with a clean UI</p>
      </header>

      <SearchBar onSearch={onSearch} />

      <div className="max-w-4xl mx-auto mt-6">
        {weatherLoading && <p className="text-white">Loading weather...</p>}
        {weatherError && <ErrorMessage message={(weatherError as Error).message} />}
        {weatherData && <WeatherCard data={weatherData} />}
      </div>

      {forecastData && (
  <section className="max-w-4xl mx-auto mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-2">
    {forecastData.map((f: any, i: number) => (
      <ForecastCard key={i} data={f} />
    ))}
  </section>
)}
    </main>
  );
}
