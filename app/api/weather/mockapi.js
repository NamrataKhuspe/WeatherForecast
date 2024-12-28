// pages/api/weather.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  // Mock data (Replace with real API call to OpenWeather or any service)
  const mockWeather = {
    location: location || "Unknown",
    temperature: (Math.random() * 10 + 20).toFixed(1),
    description: "Partly Cloudy",
  };

  return NextResponse.json(mockWeather);
}
