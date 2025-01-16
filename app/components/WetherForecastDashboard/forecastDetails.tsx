"use client";

import React, { useState, useEffect } from 'react';

// Define the types for props
interface LatLong {
  latitude: number;
  longitude: number;
}

interface ForecastDetailsProps {
  location: string;
  condition: string;
  temperature: number;
  lat_long: LatLong;
  onClose: () => void;
}

const ForecastDetails: React.FC<ForecastDetailsProps> = ({ location, condition, temperature, lat_long, onClose }) => {
  const [forecastData, setForecastData] = useState<any>(null); // You can specify a more specific type for forecastData

  // Example of an API call to get detailed forecast data
  useEffect(() => {
    const fetchForecastDetails = async () => {
      const response = await fetch(`api/weather/forecast?lat=${lat_long.latitude}&long=${lat_long.longitude}`);
      const data = await response.json();
      console.log("data on client side ====== > ", data)
      setForecastData(data);
    };

    fetchForecastDetails();
  }, [location]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto">
      <button className="text-gray-700 hover:text-blue-500 text-sm mb-4 inline-flex items-center" onClick={onClose}>
      <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Weather</button>
      <h3 className='text-3xl font-semibold mb-2 text-gray-900'>{location}</h3>
      <p  className="text-xl text-gray-600 mb-4">{condition} - {temperature}°C</p>
      {/* <pre>{forecastData}</pre> */}

      {forecastData ? (
        <div>
          <h4 className="text-2xl font-semibold text-gray-800 mb-4">Hourly Forecast</h4>
          <div className="space-y-4">
            {forecastData.hourly.map((hour, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
                <p className="text-xl font-medium">{hour.time}</p>
                <p className="text-lg">{hour.temperature}°C</p>
                <p className="text-gray-500">{hour.condition}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-lg">Loading forecast...</p>
      )}
    </div>
  );
};

export default ForecastDetails;
