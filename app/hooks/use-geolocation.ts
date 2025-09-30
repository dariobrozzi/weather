import { useEffect, useState } from "react";

const options = {
  enableHighAccuracy: true, // Request higher accuracy
  timeout: 1000, // Set a timeout (e.g., 10 seconds)
  maximumAge: 0, // Don't use a cached position
};

export const useGeolocation = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [geolocation, setGeolocation] = useState<
    GeolocationCoordinates | undefined
  >();

  useEffect(() => {
    const getGeolocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGeolocation(position.coords);
            setLoading(false);
          },
          (error) => {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                setError("Location permission denied");
                break;
              case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable");
                break;
              case error.TIMEOUT:
                setError("Location request timed out");
                break;
              default:
                setError("An unknown error occurred");
            }
            setLoading(false);
          },
          options,
        );
      } else {
        // display an error if not supported
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getGeolocation();
  }, []);

  return { geolocation, loading, error };
};
