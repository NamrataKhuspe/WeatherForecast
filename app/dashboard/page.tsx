"use client";

import { useEffect, useState } from "react";
import Header from "../components/WetherForecastDashboard/Header";
import WeatherCard from "../components/WetherForecastDashboard/WeatherCard";
// import axios from "axios";

interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
  icon : string;
  lat_long: {
    latitude?: number;
    longitude?: number;
  };
}

// const API_KEY = "86007a60318c49c5ac8d5790a7937be8"; // Replace with your OpenCage API key
  //  const API_KEY = '0qs2jES22e8URXawuArSvZcRwxgL2cWYtLqNHzEkOEY'
  //  const OPENWEATHER_API_KEY = '39791f244d600632bb34b569387fa15d'
  const WEATHERSTACK_API_KEY = 'fdd138d954f3c6ebc4db2ba88a7953e3'
export default function Dashboard() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState<string>(""); // To store the fetched location name
  const [error, setError] = useState<string | null>(null);
  const [weatherCards, setWeatherCards] = useState<WeatherData[]>([]);
  // const [weatherData, setWeatherData] = useState<any>(null);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentLocationFetched, setCurrentLocationFetched] = useState<boolean>(false);

  // Fetch current location on mount and fetch weather
  useEffect(() => {
    fetchLocation();
  }, []);

  const handleSearch = async () => {
    if (!searchInput) return;
    const searchCity = await getLocationData(searchInput);
    console.log("searchCity = > ", searchCity);
    console.log("locationlatlong ", location);
        const locationName = searchCity.location.name; // Get the formatted address
        setLocationName(locationName);
        const temperaure = searchCity.current.temperature;
        const condition = searchCity.current.weather_descriptions[0];
        const icon = searchCity.current.weather_icons[0];
    // Simulate fetching weather data for the searched location
    const newWeather: WeatherData = {
      location: locationName,
      temperature: temperaure,//(Math.random() * 35).toFixed(1),
      condition: condition,//"Cloudy",
      icon: icon,
      lat_long: { 
        latitude: location?.latitude ?? 0, // Default to 0 if undefined
        longitude: location?.longitude ?? 0, // Default to 0 if undefined
      },
    };

    console.log("newwetherCard -- > ", newWeather);

    setWeatherCards((prevCards) => [...prevCards, newWeather]);
    setSearchInput("");
  };

  
  // Fetch weather data from OpenWeatherMap API
  // const fetchWeatherData = async (city: string) => {
  //   try {
  //     const geocodingUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}`;
      
  //     // Step 1: Get latitude and longitude of the city
  //     const geocodingResponse = await axios.get(geocodingUrl);
  //     const { lat, lon } = geocodingResponse.data.coord;

  //     // Step 2: Fetch weather data using lat and lon
  //     const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${OPENWEATHER_API_KEY}`;
  //     const weatherResponse = await axios.get(weatherUrl);

  //     setWeatherData(weatherResponse.data); // Store weather data
  //     setError(null); // Clear any previous errors
  //   } catch (err) {
  //     setError("Unable to fetch weather data. Please check the city name and try again.");
  //     console.error(err);
  //   }
  // };

  // const handleSearch = () => {
  //   if (searchInput.trim()) {
  //     fetchWeatherData(searchInput.trim());
  //   }
  // };


  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);

          // Fetch the location name from lat and long
          reverseGeocode(position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          setError("Unable to retrieve location. Please enable location services.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };


  
  // Reverse geocoding to get location name from lat and long
  const getLocationData = async (city: string) => {
    try {
      
      const url = `https://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${city}`;
      const options = {
          method: "GET",
      };
      const response = await fetch(url, options);
    const result = await response.json();
    console.log("RESULT:::: ", result);

      if (result) {
      return result;

      } else {
        setError("Unable to retrieve location details.");
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setError("Error fetching location name.");
    }
  };

  // Reverse geocoding to get location name from lat and long
  const reverseGeocode = async (lat: number, long: number) => {
    try {
      // const response = await fetch(
      //   `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${API_KEY}`
      // );

      //  const response = await fetch(
      //   `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${long}&lang=en-US&apiKey=${API_KEY}`
      //  );
      const url = `https://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${lat},${long}`;
      const options = {
          method: "GET",
      };
      const response = await fetch(url, options);
    const result = await response.json();
    console.log("RESULT:::: ", result);
      // const response = await fetch (
      //   `http://api.weatherstack.com/current?access_key=fdd138d954f3c6ebc4db2ba88a7953e3&query=Mumbai`
      // )
    
      // console.log("Rsponsee : ", response)
      // const data = await response.json();

      // console.log("Data location : ", data)
      console.log("result && result.length > 0 : ", result && result.length > 0)
      console.log(" result.location.name : ",  result.location.name)

      if (result) {
        const locationName = result.location.name; // Get the formatted address
        setLocationName(locationName);
        const temperaure = result.current.temperature;
        const condition = result.current.weather_descriptions[0];
        const icon = result.current.weather_icons[0];

        const currentLocationWeather: WeatherData = {
              location: locationName, // Use the location name here
              temperature: temperaure,//(Math.random() * 35).toFixed(1),
              condition: condition,//"Sunny",
              icon : icon,
              lat_long: { 
                latitude: location?.latitude ?? 0, // Default to 0 if undefined
                longitude: location?.longitude ?? 0, // Default to 0 if undefined
              },
            };
    
            // Add the current location weather only once
            if (!currentLocationFetched) {
              setWeatherCards([currentLocationWeather]);
              setCurrentLocationFetched(true); // Mark that current location weather is added
            }
      } else {
        setError("Unable to retrieve location details.");
      }

      // Check if data is available
      // if (data.results && data.results.length > 0) {
      //   const locationName = data.results[0].formatted; // Get the formatted address
      //   setLocationName(locationName);

      //   // Simulate weather data for the current location
      //   const currentLocationWeather: WeatherData = {
      //     location: locationName, // Use the location name here
      //     temperature: (Math.random() * 35).toFixed(1),
      //     condition: "Sunny",
      //   };

      //   // Add the current location weather only once
      //   if (!currentLocationFetched) {
      //     setWeatherCards([currentLocationWeather]);
      //     setCurrentLocationFetched(true); // Mark that current location weather is added
      //   }
      // } else {
      //   setError("Unable to retrieve location details.");
      // }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      setError("Error fetching location name.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="p-4 flex justify-center">
        <div className="flex mb-4 w-full max-w-xl">
          <input
            type="text"
            placeholder="Enter city"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border rounded-l w-full max-w-xl"
          />
          <button onClick={handleSearch} className="bg-blue-600 text-white px-4 rounded-r">
            Search
          </button>
        </div>
      </div>

      {/* Error Handling */}
      {error && <div className="text-red-500 text-center">{error}</div>}

      {/* Display weather cards */}
      <div className="flex flex-wrap justify-center gap-4 p-4">
      {/* <pre>{JSON.stringify(weatherCards, null, 2)}</pre> Display debug info */}
        {weatherCards.map((weather, index) => (
          <WeatherCard
            key={index}
            location={weather.location}
            temperature={weather.temperature}
            condition={weather.condition}
            icon={weather.icon}
            lat_long={weather.lat_long}
          />
        ))}

{/* {weatherData && (
          <div className="weather-info p-4 bg-white shadow rounded">
            <h2 className="text-2xl font-bold">{weatherData?.timezone}</h2>
            <p><strong>Temperature:</strong> {weatherData?.current?.temp}°C</p>
            <p><strong>Humidity:</strong> {weatherData?.current?.humidity}%</p>
            <p><strong>Weather:</strong> {weatherData?.current?.weather[0]?.description}</p>
            <p><strong>Wind Speed:</strong> {weatherData?.current?.wind_speed} m/s</p>
            <p><strong>Sunrise:</strong> {new Date(weatherData?.current?.sunrise * 1000).toLocaleTimeString()}</p>
            <p><strong>Sunset:</strong> {new Date(weatherData?.current?.sunset * 1000).toLocaleTimeString()}</p>
          </div>
        )} */}
      </div>
    </div>
  );
}
