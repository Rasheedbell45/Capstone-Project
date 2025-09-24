import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

export const getCurrentWeather = (city: string) =>
  api.get(`/weather?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.data);

export const getForecast = (city: string) =>
  api.get(`/forecast?q=${city}&units=metric&appid=${API_KEY}`).then(res => res.data);
