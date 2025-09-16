interface ForecastCardProps {
data: any;
}


export default function ForecastCard({ data }: ForecastCardProps) {
const date = new Date(data.dt * 1000);
return (
<div className="bg-white/20 backdrop-blur-lg rounded-xl shadow p-4 text-white text-center">
<p className="font-semibold">
{date.toLocaleDateString(undefined, { weekday: "short" })}
</p>
<img
src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
alt={data.weather[0].description}
className="mx-auto"
/>
<p className="text-lg font-bold">{Math.round(data.main.temp)}°C</p>
</div>
);
}
