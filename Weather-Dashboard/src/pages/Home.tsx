import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastList from "../components/ForecastList";
import Loader from "../components/Loader";
import { useWeather } from "../hooks/useWeather";
import MainLayout from "../layouts/MainLayout";

export default function Home() {
  const { weather, forecast, loading, error, getWeather } = useWeather();

  return (
    <MainLayout>
      <SearchBar onSearch={getWeather} />
      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <ForecastList forecast={forecast.list} />}
    </MainLayout>
  );
}
