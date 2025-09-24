import React from "react";

type WeatherData = {
  name: string;
  main: { temp: number; feels_like: number; humidity: number; temp_min: number; temp_max: number };
  weather: { main: string; description: string; icon: string }[];
  wind: { speed: number };
  sys?: { country?: string };
};

export default function WeatherCard({ data }: { data: WeatherData }) {
  if (!data) return null;

  const icon = data.weather?.[0]?.icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : null;

  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white/90 rounded-xl p-6 shadow">
      <div className="flex items-center gap-6">
        <div>
          <div className="text-3xl font-bold text-gray-800">
            {data.name} {data.sys?.country ? `, ${data.sys.country}` : ""}
          </div>
          <div className="text-sm text-gray-600 capitalize">{data.weather?.[0]?.description}</div>
        </div>

        {iconUrl && <img src={iconUrl} alt={data.weather?.[0]?.description} className="w-24 h-24" />}

        <div className="ml-auto text-right">
          <div className="text-4xl font-bold text-gray-900">{Math.round(data.main.temp)}°C</div>
          <div className="text-sm text-gray-600">Feels like {Math.round(data.main.feels_like)}°C</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
        <div>Humidity: {data.main.humidity}%</div>
        <div>Wind: {data.wind?.speed ?? "—"} m/s</div>
        <div>Min: {Math.round(data.main.temp_min)}°C</div>
        <div>Max: {Math.round(data.main.temp_max)}°C</div>
      </div>
    </div>
  );
}
