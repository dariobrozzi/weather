// https://developers.google.com/maps/documentation/geocoding/reverse-geocoding

import { LocationData } from "./types";

// Google Geocoding API response types
interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
}

interface GeocodeResult {
  addressComponents: AddressComponent[];
}

interface GoogleGeocodeResponse {
  results: GeocodeResult[];
}

export const fetchReverseGeocode = async (
  latitude: number,
  longitude: number,
  apiKey: string,
): Promise<LocationData> => {
  const url = "https://geocode.googleapis.com/v4beta/geocode/location";

  const response = await fetch(
    `${url}?location.latitude=${latitude}&location.longitude=${longitude}&key=${apiKey}`,
  );
  const data: GoogleGeocodeResponse = await response.json();

  // get the first place address components
  const addressComponents = data.results[0].addressComponents;

  const countryComponent = addressComponents.find(
    (component: AddressComponent) => component.types.includes("country"),
  );
  const stateComponent = addressComponents.find((component: AddressComponent) =>
    component.types.includes("administrative_area_level_1"),
  );
  const countyComponent = addressComponents.find(
    (component: AddressComponent) =>
      component.types.includes("administrative_area_level_2"),
  );

  const localityComponent = addressComponents.find(
    (component: AddressComponent) => component.types.includes("locality"),
  );

  return {
    country: {
      name: countryComponent?.longText || "Unknown",
      code: countryComponent?.shortText || "Unknown",
    },
    state: {
      name: stateComponent?.longText || "Unknown",
      code: stateComponent?.shortText || "Unknown",
    },
    county: countyComponent?.longText || "Unknown",
    city: localityComponent?.longText || "Unknown",
  };
};
