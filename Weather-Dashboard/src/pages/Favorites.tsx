import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import { useWeather } from "../hooks/useWeather";
import WeatherCard from "../components/WeatherCard";

export default function Favorites() {
  const context = useContext(WeatherContext);

  if (!context) return null;

  const { favorites } = context;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⭐ Favorite Cities</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="grid gap-4">
          {favorites.map((city) => {
            const { data } = useWeather(city);
            return data ? <WeatherCard key={city} data={data} /> : null;
          })}
        </div>
      )}
    </div>
  );
}
