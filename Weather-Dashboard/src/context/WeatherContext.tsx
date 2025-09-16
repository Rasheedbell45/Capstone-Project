import { createContext, useState, ReactNode } from "react";

interface WeatherContextType {
  favorites: string[];
  addFavorite: (city: string) => void;
  removeFavorite: (city: string) => void;
}

export const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (city: string) =>
    setFavorites((prev) => [...new Set([...prev, city])]);

  const removeFavorite = (city: string) =>
    setFavorites((prev) => prev.filter((c) => c !== city));

  return (
    <WeatherContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </WeatherContext.Provider>
  );
}
