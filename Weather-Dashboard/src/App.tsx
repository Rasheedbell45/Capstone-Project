import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import ErrorMessage from "./components/ErrorMessage";
import { API_KEY, API_URL } from "./config";

export default function App() {
  const [weather, setWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const fetchWeather = async (city: string) => {
  const response = await fetch(
    `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return response.json();
};

    try {
      // Current weather
      const res = await fetch(
        `${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);

      // Forecast (5-day / 3-hour interval)
      const forecastRes = await fetch(
        `${API_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();
      // Pick one forecast per day (every 8th item ~ 24 hrs)
      const daily = forecastData.list.filter((_: any, i: number) => i % 8 === 0);
      setForecast(daily);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold p-6">🌦 Weather Dashboard</h1>
      <SearchBar onSearch={fetchWeather} />

      {loading && <p className="mt-4">Loading...</p>}

      {error && <ErrorMessage message={error} />}

      {weather && <WeatherCard data={weather} />}

      {forecast.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 w-full max-w-4xl">
          {forecast.map((f, i) => (
            <ForecastCard key={i} data={f} />
          ))}
        </div>
      )}
    </div>
  );
}
