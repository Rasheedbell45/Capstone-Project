import { useQuery } from "@tanstack/react-query";
import { getCurrentWeather } from "../api/weatherService";

export function useWeather(city: string) {
  return useQuery(["weather", city], () => getCurrentWeather(city), {
    enabled: !!city,
    staleTime: 1000 * 60 * 5,
  });
}
