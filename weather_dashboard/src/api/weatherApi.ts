import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const api = axios.create({
  baseURL: BASE_URL,
});

export interface WeatherResponse {
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
}

export interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number; humidity: number };
    weather: { main: string; description: string; icon: string }[];
    wind: { speed: number };
  }[];
}

export const getCurrentWeather = async (city: string): Promise<WeatherResponse> => {
  const { data } = await api.get(`/weather?q=${city}&appid=${API_KEY}&units=metric`);
  return data;
};

export const getForecast = async (city: string): Promise<ForecastResponse> => {
  const { data } = await api.get(`/forecast?q=${city}&appid=${API_KEY}&units=metric`);
  return data;
};
