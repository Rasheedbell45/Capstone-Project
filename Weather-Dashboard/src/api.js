import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Store your API key in .env
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Get current weather for a city
export const getCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // use "imperial" for Fahrenheit
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch current weather.");
  }
};

// Get 5-day forecast for a city
export const getForecast = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch weather forecast.");
  }
};
