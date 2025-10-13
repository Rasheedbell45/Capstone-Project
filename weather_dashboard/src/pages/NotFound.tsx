import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white/90 rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-2">404 — Not Found</h2>
      <p className="text-gray-700 mb-4">The requested resource was not found.</p>
      <Link to="/" className="text-blue-600 underline">Return home</Link>
    </div>
  );
}
