import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();

    if (!data || data.status !== "success") {
      throw new Error("Failed to fetch location.");
    }

    return NextResponse.json({
      latitude: data.lat,
      longitude: data.lon,
      city: data.city,
      region: data.regionName,
      country: data.country,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
