import { API_KEY, API_URL } from "../config";


export async function getCurrentWeather(city: string) {
const res = await fetch(`${API_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`);
if (!res.ok) throw new Error("Failed to fetch weather data");
return res.json();
}


export async function getForecast(city: string) {
const res = await fetch(`${API_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`);
if (!res.ok) throw new Error("Failed to fetch forecast data");
return res.json();
}
