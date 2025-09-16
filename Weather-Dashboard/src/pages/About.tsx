export default function About() {
  return (
    <div className="text-center text-white mt-10">
      <h1 className="text-3xl font-bold mb-4">About This App</h1>
      <p>
        This Weather Dashboard is built with React, Vite, Tailwind, and React Query.
        It fetches live weather data from the OpenWeather API and includes caching for
        better performance.
      </p>
    </div>
  );
}
