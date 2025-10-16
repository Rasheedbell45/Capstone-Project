import React from "react";
import type { Weather } from "../types/weather";

interface WeatherCardProps {
  data: Weather;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6 flex flex-col items-center max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{data.name}, {data.sys.country}</h2>
      <img src={iconUrl} alt={data.weather[0].description} className="w-24 h-24" />
      <p className="text-xl font-semibold">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
      <div className="mt-4 flex justify-between w-full text-sm text-gray-700">
        <span>Humidity: {data.main.humidity}%</span>
        <span>Wind: {data.wind.speed} m/s</span>
        <span>Pressure: {data.main.pressure} hPa</span>
      </div>
    </div>
  );
};

export default WeatherCard;
