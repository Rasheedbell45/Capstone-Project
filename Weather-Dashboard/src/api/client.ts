import axios from "axios";

const client = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
  timeout: 10000,
});

client.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    config.params = { ...config.params, appid: apiKey, units: "metric" };
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default client;
