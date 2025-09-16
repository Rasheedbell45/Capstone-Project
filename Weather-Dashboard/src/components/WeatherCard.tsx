interface WeatherCardProps {
data: any;
}


export default function WeatherCard({ data }: WeatherCardProps) {
return (
<div className="mt-6 bg-white/20 backdrop-blur-lg rounded-xl shadow-md p-6 text-white">
<h2 className="text-2xl font-semibold">{data.name}</h2>
<p className="text-lg">{data.weather[0].description}</p>
<div className="flex items-center gap-4 mt-2">
<img
src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
alt={data.weather[0].description}
/>
<p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
</div>
<p>💧 Humidity: {data.main.humidity}%</p>
<p>🌬 Wind: {data.wind.speed} m/s</p>
</div>
);
}
