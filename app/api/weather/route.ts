import { NextRequest } from "next/server";
import { fetchOpenMeteoWeather } from "@/app/lib/open-meteo-api";

// this get whether from vendor api

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const latitude = params.get("latitude") || params.get("lat");
  const longitude = params.get("longitude") || params.get("lon");

  if (!latitude || !longitude) {
    return new Response(
      JSON.stringify({ error: "Latitude and longitude are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  const coordinates: [number, number] = [
    parseFloat(latitude),
    parseFloat(longitude),
  ];

  try {
    const weatherData = await fetchOpenMeteoWeather(coordinates);

    return new Response(JSON.stringify({ weather: weatherData }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to get the weather data", cause: error }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
