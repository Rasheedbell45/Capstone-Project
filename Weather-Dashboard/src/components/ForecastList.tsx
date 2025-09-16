import ForecastCard from "./ForecastCard";

interface Props {
  forecast: any[];
}

export default function ForecastList({ forecast }: Props) {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {forecast.map((day, i) => (
        <ForecastCard key={i} data={day} />
      ))}
    </div>
  );
}
