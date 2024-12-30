import { NextResponse } from "next/server";
import moment from "moment";

// Get today's date
const today = moment().format("YYYY-MM-DD");
console.log("Today's date:", today);

// Get the next 7 days' dates
const next7Days = Array.from({ length: 7 }, (_, i) =>
  moment().add(i + 1, "days").format("YYYY-MM-DD")
);

console.log("Next 7 days:", next7Days);

const api_key = "fdd138d954f3c6ebc4db2ba88a7953e3";

export async function GET(request) {
  try {
      console.log("request : :",request);
      // Parse the URL from the request
      const url = new URL(request.url);

      // Get the 'location' query parameter from the URL
      const location = url.searchParams.get("location");
  
      // Check if the location parameter is provided
      if (!location) {
        return new Response(JSON.stringify({ error: "Location is required" }), {
          status: 400,
        });
      }

    // Construct the historical API URL
    const historicalDates = next7Days.join(","); // Convert next7Days array to a comma-separated string
    const res = await fetch(
      `http://api.weatherstack.com/historical?access_key=${api_key}&query=${location}&historical_date_start=${today}&historical_date_end=${historicalDates}`
    );

    const data = await res.json();
    console.log("Forecast Data:", data);

    if (!data || data.status !== "success") {
      throw new Error("Failed to fetch location.");
    }

    // Return location details in the response
    return NextResponse.json({
      latitude: data.lat,
      longitude: data.lon,
      city: data.city,
      region: data.regionName,
      country: data.country,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch location" },
      { status: 500 }
    );
  }
}
