import { NextRequest } from "next/server";
import { fetchReverseGeocode } from "@/app/lib/geocoding-api";

// request reverse geocoding from google api

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const latitude = params.get("latitude") || params.get("lat");
  const longitude = params.get("longitude") || params.get("lon");

  const { API_KEY_GEOCODING: apiKey } = process.env;

  if (!apiKey) {
    throw new Error("API_KEY_GEOCODING is not defined");
  }

  if (!latitude || !longitude) {
    return new Response(
      JSON.stringify({ error: "Latitude and longitude are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    const locationData = await fetchReverseGeocode(
      parseFloat(latitude),
      parseFloat(longitude),
      apiKey,
    );

    return new Response(JSON.stringify({ location: locationData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to get the location data",
        cause: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
