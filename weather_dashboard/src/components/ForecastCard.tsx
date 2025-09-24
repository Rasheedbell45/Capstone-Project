import React from "react";

export default function ForecastCard({ item }: { item: any }) {
  // item from forecast list (3-hour interval). Provide day/time and temp
  const date = new Date(item.dt * 1000);
  const hour = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const day = date.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
  const icon = item.weather?.[0]?.icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <div className="bg-white/90 p-3 rounded-lg shadow flex flex-col items-center text-sm">
      <div className="font-medium text-gray-800">{day}</div>
      <div className="text-gray-600">{hour}</div>
      {iconUrl && <img src={iconUrl} alt={item.weather?.[0]?.description} className="w-16 h-16" />}
      <div className="text-lg font-semibold">{Math.round(item.main.temp)}°C</div>
      <div className="text-gray-600">{item.weather?.[0]?.description}</div>
    </div>
  );
}
