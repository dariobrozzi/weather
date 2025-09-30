// Location types
export interface CountryData {
  name: string;
  code: string;
}

export interface StateData {
  name: string;
  code: string;
}

export interface LocationData {
  country: CountryData;
  state: StateData;
  county: string;
  city: string;
}

// Weather types
export interface HourlyWeatherData {
  time: Date[];
  temperature_2m: Float32Array;
  wind_speed_10m: Float32Array;
  wind_direction_10m: Float32Array;
}

export interface WeatherData {
  temperature: number;
  wind_speed: number;
  wind_direction: number;
}

// export interface WeatherData {
//   hourly: HourlyWeatherData;
//   now: CurrentWeatherData;
// }

// Combined API response
export interface WeatherApiResponse {
  location: LocationData;
  weather: WeatherData;
}

// Utility types
export type Coordinates = [number, number];

export interface GeolocationData {
  latitude: number;
  longitude: number;
}

// Error response
export interface ApiErrorResponse {
  error: string;
}

// API response union type
export type ApiResponse = WeatherApiResponse | ApiErrorResponse;

// Type guards
export const isApiError = (
  response: ApiResponse,
): response is ApiErrorResponse => {
  return "error" in response;
};

export const isWeatherResponse = (
  response: ApiResponse,
): response is WeatherApiResponse => {
  return "location" in response && "weather" in response;
};
