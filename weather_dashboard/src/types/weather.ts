// Current weather data
export interface Weather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: WeatherCondition[];
  main: WeatherMain;
  wind: {
    speed: number;
    deg: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
}

// Weather condition structure
export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// Main weather metrics
export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

// Forecast data for multiple time points
export interface ForecastItem {
  dt: number; // timestamp in seconds
  dt_txt: string; // date string from API
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
}