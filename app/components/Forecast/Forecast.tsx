"use client"; // Mark this as a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DetailedForecast from "./DetailedForecast"; // Adjust the import path as needed

export default function ForecastPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location"); // Fetch the 'location' from the query parameters
  const [forecast, setForecast] = useState(null); // Use 'null' to indicate loading

  useEffect(() => {
    const fetchForecast = async () => {
      if (location) {
        try {
          const response = await fetch(
            `/api/weather/forecast?location=${encodeURIComponent(location)}`
          );
          const data = await response.json();
          setForecast(data); // Update state with the fetched data
        } catch (error) {
          console.error("Error fetching forecast data:", error);
        }
      }
    };
  
    fetchForecast(); // Call the async function
  }, [location]); // Run effect when location changes
  
  if (!location) {
    return <p>Loading location...</p>; // Show loading state if location is not yet available
  }

  if (!forecast) {
    return <p>Loading forecast...</p>; // Show loading state if forecast data is not yet available
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Weather Forecast for {location}</h1>
      <DetailedForecast location={location} forecast={forecast} />
    </div>
  );
}
