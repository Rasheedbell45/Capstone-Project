interface Props {
  data: any;
}

export default function ForecastCard({ data }: Props) {
  const date = new Date(data.dt_txt).toLocaleDateString("en-US", {
    weekday: "short",
  });

  return (
    <div className="bg-white text-black rounded-lg shadow p-4 text-center">
      <p className="font-semibold">{date}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="mx-auto"
      />
      <p className="text-lg">{Math.round(data.main.temp)}°C</p>
    </div>
  );
}
