interface Props {
  data: any;
}

export default function WeatherCard({ data }: Props) {
  return (
    <div className="bg-white text-black rounded-xl shadow-lg p-6 m-4 w-full max-w-md text-center">
      <h2 className="text-2xl font-bold">{data.name}, {data.sys.country}</h2>
      <p className="text-gray-600">{data.weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        className="mx-auto"
      />
      <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
      <div className="flex justify-around mt-4 text-gray-700">
        <p>💧 {data.main.humidity}%</p>
        <p>💨 {data.wind.speed} m/s</p>
      </div>
    </div>
  );
}
