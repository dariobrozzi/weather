import { fetchWeatherApi } from "openmeteo";
import { closestDateTime } from "./utils";

export const fetchOpenMeteoWeather = async (coordinates: [number, number]) => {
  const url = "https://api.open-meteo.com/v1/forecast";

  const [latitude, longitude] = coordinates;

  const params = {
    latitude,
    longitude,
    hourly: "temperature_2m,wind_speed_10m,wind_direction_10m",
    wind_speed_unit: "kn",
    forecast_days: 3,
  };

  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const lat = response.latitude();
  const lon = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  console.log(
    `\nCoordinates: ${lat}°N ${lon}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
  );

  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: [
        ...Array(
          (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        ),
      ].map(
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      wind_speed_10m: hourly.variables(1)!.valuesArray(),
      wind_direction_10m: hourly.variables(2)!.valuesArray(),
    },
    // now: {
    //   temperature:
    // }
  };

  const closest = closestDateTime(weatherData.hourly.time);
  const index = weatherData.hourly.time.indexOf(closest);
  console.log(closest);

  // 'weatherData' now contains a simple structure with arrays with datetime and weather data
  console.log("\nHourly data", weatherData.hourly);

  return {
    ...weatherData,
    now: {
      temperature: weatherData.hourly.temperature_2m[index],
      wind_speed: weatherData.hourly.wind_speed_10m[index],
      wind_direction: weatherData.hourly.wind_direction_10m[index],
    },
  };
};
