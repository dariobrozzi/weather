"use client";
import { useGeolocation } from "@/app/hooks/use-geolocation";
import { useEffect, useState } from "react";
import styles from "./GeolocationWeather.module.css";
import * as backgroundsJSON from "@/app/data/backgrounds.json";
import Background from "@/app/ui/background/Background";
import { getRandomArrayItem } from "@/app/lib/utils";

import {
  WidgetsContainer,
  LocationWidget,
  CoordinatesWidget,
  WeatherWidget,
} from "@/app/ui/widgets";

const API_BASE_URL = "/api/";

const GeolocationWeather = () => {
  const [locationData, setLocationData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [backgroundFilename, setBackgroundFilename] = useState<string>("");

  const { geolocation, loading: loadingCoordinates } = useGeolocation();

  useEffect(() => {
    const backgrounds = backgroundsJSON.backgrounds;

    if (!backgrounds.length) return;

    setBackgroundFilename(getRandomArrayItem(backgrounds)?.filename);
  }, []);

  useEffect(() => {
    if (!geolocation) return;

    const { latitude, longitude } = geolocation;

    (async () => {
      try {
        const [locationResponse, weatherResponse] = await Promise.all([
          fetch(
            `${API_BASE_URL}/location?latitude=${latitude}&longitude=${longitude}`,
          ),
          fetch(
            `${API_BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}`,
          ),
        ]);

        await locationResponse.json().then(({ location }) => {
          if (location) {
            setLocationData(location);
          }
        });
        await weatherResponse.json().then(({ weather }) => {
          if (weather) {
            console.log(weather);
            setWeatherData(weather);
          }
        });

        // Process the data as needed
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      return;
    })();
  }, [geolocation]);

  return (
    <Background filename={backgroundFilename}>
      <WidgetsContainer>
        <CoordinatesWidget
          coordinates={
            geolocation
              ? [geolocation.latitude, geolocation.longitude]
              : undefined
          }
          loading={loadingCoordinates}
        />

        <LocationWidget location={locationData} />

        <WeatherWidget data={weatherData?.now} />
      </WidgetsContainer>
    </Background>
  );
};

export default GeolocationWeather;
