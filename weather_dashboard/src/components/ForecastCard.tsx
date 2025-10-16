import React from "react";
import type { ForecastItem } from "../types/weather";

interface ForecastCardProps {
  data: ForecastItem;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ data }) => {
  const date = new Date(data.dt * 1000);
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-4 flex flex-col items-center">
      <p className="font-semibold mb-1">{date.toLocaleDateString(undefined, { weekday: "short" })}</p>
      <img src={iconUrl} alt={data.weather[0].description} className="w-16 h-16" />
      <p className="font-bold">{Math.round(data.main.temp)}°C</p>
      <p className="capitalize text-sm">{data.weather[0].description}</p>
    </div>
  );
};

export default ForecastCard;