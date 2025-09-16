import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import ErrorMessage from "../components/ErrorMessage";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather, getForecast } from "../services/weatherService";
import { saveToCache, getFromCache } from "../utils/cache";

export default function Home() {
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
    { enabled: !!city, staleTime: 1000 * 60 * 5, retry: 1 }
  );

  const { data: forecastData, isLoading: forecastLoading } = useQuery(
    ["forecast", city],
    async () => {
      if (!city) return null;
      const res = await getForecast(city);
      return res.list.filter((_: any, i: number) => i % 8 === 0);
    },
    { enabled: !!city, staleTime: 1000 * 60 * 30 }
  );

  return (
    <section className="max-w-4xl mx-auto">
      <SearchBar onSearch={onSearch} />

      {weatherLoading && <p className="text-white text-center mt-4">Loading weather...</p>}
      {weatherError && <ErrorMessage message={(weatherError as Error).message} />}

      {weather && <WeatherCard data={weather} />}

      {forecastLoading && <p className="text-white text-center mt-4">Loading forecast...</p>}
      {forecastData && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {forecastData.map((f: any, i: number) => (
            <ForecastCard key={i} data={f} />
          ))}
        </div>
      )}

      {!city && <p className="text-white text-center mt-6">Search for a city to see weather</p>}
    </section>
  );
}
