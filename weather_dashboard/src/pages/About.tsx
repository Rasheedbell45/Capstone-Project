import React from "react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white/90 rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-2">About</h2>
      <p className="text-gray-700">
        This Weather Dashboard uses OpenWeatherMap and React Query for fast, cached requests.
        Built with Vite + React + Tailwind for great DX and performance.
      </p>
    </div>
  );
}
