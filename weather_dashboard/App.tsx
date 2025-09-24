import React from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

// Create a React Query client
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
        <header className="max-w-4xl mx-auto py-6">
          <h1 className="text-center text-3xl font-bold">🌦 Weather Dashboard</h1>
        </header>

        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </QueryClientProvider>
  );
}
