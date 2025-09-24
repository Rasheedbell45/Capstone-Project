import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import ErrorMessage from "./components/ErrorMessage";
import { getCurrentWeather, getForecast } from "./services/weatherService";
import { saveToCache, getFromCache } from "./utils/cache";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

export default function App() {
  const [city, setCity] = useState<string | null>(null);

  const onSearch = useCallback((c: string) => {
    setCity(c);
  }, []);

  const cacheKey = city ? `weather:${city.toLowerCase()}` : null;

  const {
    data: weather,
    error: weatherError,
    isLoading: weatherLoading,
  } = useQuery(
    ["weather", city],
    async () => {
      if (!city) throw new Error("No city provided");
      const cached = cacheKey ? getFromCache(cacheKey) : null;
      if (cached) return cached;
      const res = await getCurrentWeather(city);
      if (cacheKey) saveToCache(cacheKey, res);
      return res;
    },
    {
      enabled: !!city,
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    }
  );

  const {
    data: forecastData,
    isLoading: forecastLoading,
    error: forecastError,
  } = useQuery(
    ["forecast", city],
    async () => {
      if (!city) return null;
      const res = await getForecast(city);
      const daily = res.list.filter((_: any, i: number) => i % 8 === 0);
      return daily;
    },
    { enabled: !!city, staleTime: 1000 * 60 * 30 }
  );

  return (
    <main className="min-h-screen py-8 px-4 bg-gradient-to-br from-blue-500 to-indigo-700">
      <header className="max-w-4xl mx-auto mb-6">
        <h1 className="text-center text-3xl font-bold text-white">🌦 Weather Dashboard</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <SearchBar onSearch={onSearch} />

      <section className="max-w-4xl mx-auto mt-6">
        {weatherLoading && <p className="text-center text-white">Loading weather...</p>}
        {weatherError && (
          <ErrorMessage message={(weatherError as Error).message || "Error fetching weather"} />
        )}

        {weather && <WeatherCard data={weather} />}

        {forecastLoading && <p className="text-center text-white">Loading forecast...</p>}
        {forecastData && (
          <section className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 px-2">
            {forecastData.map((f: any, i: number) => (
              <ForecastCard key={i} data={f} />
            ))}
          </section>
        )}

        {!city && (
          <p className="text-center text-white mt-8">Search for a city to see the current weather and forecast.</p>
        )}
      </section>
    </main>
  );
}
