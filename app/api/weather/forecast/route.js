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

// const api_key = "fdd138d954f3c6ebc4db2ba88a7953e3";

// export async function GET(request) {
//   try {
//       console.log("request : :",request);
//       // Parse the URL from the request
//       const url = new URL(request.url);

//       // Get the 'location' query parameter from the URL
//       const location = url.searchParams.get("location");
  
//       // Check if the location parameter is provided
//       if (!location) {
//         return new Response(JSON.stringify({ error: "Location is required" }), {
//           status: 400,
//         });
//       }

//     // Construct the historical API URL
//     const historicalDates = next7Days.join(","); // Convert next7Days array to a comma-separated string
//     const res = await fetch(
//       `http://api.weatherstack.com/historical?access_key=${api_key}&query=${location}&historical_date_start=${today}&historical_date_end=${historicalDates}`
//     );

//     const data = await res.json();
//     console.log("Forecast Data:", data);

//     if (!data || data.status !== "success") {
//       throw new Error("Failed to fetch location.");
//     }

//     // Return location details in the response
//     return NextResponse.json({
//       latitude: data.lat,
//       longitude: data.lon,
//       city: data.city,
//       region: data.regionName,
//       country: data.country,
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch location" },
//       { status: 500 }
//     );
//   }
// }

// const fetchWeatherApi = async (url, params) => {
//   // Create query string from the params object
//   const queryString = new URLSearchParams(params).toString();
  
//   try {
//     const response = await fetch(`${url}?${queryString}`);

//     // Check if the response is OK (status code in the range 200-299)
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data: ${response.status}`);
//     }

//     // Parse and return the JSON response
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching weather data:", error);
//     throw error;  // Re-throw error so it can be caught in the caller function
//   }
// };


export async function GET(request) {
  try {
      // Parse the URL from the request
      const url = new URL(request.url);

      // Get the 'lat' and 'long' query parameters from the URL
      const lat = url.searchParams.get("lat");
      const long = url.searchParams.get("long");
      console.log("Lat > ", lat);
      console.log("Long  ? ", long);
      const requrl = "https://api.open-meteo.com/v1/forecast";
    
      const params = {
        latitude: lat,
        longitude: long,
        current: [
          "temperature_2m",
          "relative_humidity_2m",
          "apparent_temperature",
          "is_day",
          "precipitation",
          "rain",
          "showers",
          "snowfall",
          "weather_code",
          "cloud_cover",
          "pressure_msl",
          "surface_pressure",
          "wind_speed_10m",
          "wind_direction_10m",
          "wind_gusts_10m",
        ],
        hourly: "temperature_2m",
        daily: [
          "weather_code",
          "temperature_2m_max",
          "temperature_2m_min",
          "apparent_temperature_max",
          "apparent_temperature_min",
          "sunrise",
          "sunset",
          "daylight_duration",
          "sunshine_duration",
          "uv_index_max",
          "uv_index_clear_sky_max",
          "precipitation_sum",
          "rain_sum",
          "showers_sum",
          "snowfall_sum",
          "precipitation_hours",
          "precipitation_probability_max",
          "wind_speed_10m_max",
          "wind_gusts_10m_max",
          "wind_direction_10m_dominant",
          "shortwave_radiation_sum",
          "et0_fao_evapotranspiration",
        ],
      };

    
    // const response = await fetchWeatherApi(requrl, params);
    const response =  {
      latitude: 52.52,
      longitude: 13.419998,
      generationtime_ms: 0.5800724029541016,
      utc_offset_seconds: 0,
      timezone: 'GMT',
      timezone_abbreviation: 'GMT',
      elevation: 38,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°C',
        relative_humidity_2m: '%',
        apparent_temperature: '°C',
        is_day: '',
        precipitation: 'mm',
        rain: 'mm',
        showers: 'mm',
        snowfall: 'cm',
        weather_code: 'wmo code',
        cloud_cover: '%',
        pressure_msl: 'hPa',
        surface_pressure: 'hPa',
        wind_speed_10m: 'km/h',
        wind_direction_10m: '°',
        wind_gusts_10m: 'km/h'
      },
      current: {
        time: '2025-01-16T15:45',
        interval: 900,
        temperature_2m: 3.1,
        relative_humidity_2m: 89,
        apparent_temperature: 0.1,
        is_day: 0,
        precipitation: 0,
        rain: 0,
        showers: 0,
        snowfall: 0,
        weather_code: 3,
        cloud_cover: 98,
        pressure_msl: 1037.4,
        surface_pressure: 1032.5,
        wind_speed_10m: 7.9,
        wind_direction_10m: 231,
        wind_gusts_10m: 19.4
      },
      hourly_units: { time: 'iso8601', temperature_2m: '°C' },
      hourly: {
        time: [
          '2025-01-16T00:00', '2025-01-16T01:00', '2025-01-16T02:00',
          '2025-01-16T03:00', '2025-01-16T04:00', '2025-01-16T05:00',
          '2025-01-16T06:00', '2025-01-16T07:00', '2025-01-16T08:00',
          '2025-01-16T09:00', '2025-01-16T10:00', '2025-01-16T11:00',
          '2025-01-16T12:00', '2025-01-16T13:00', '2025-01-16T14:00',
          '2025-01-16T15:00', '2025-01-16T16:00', '2025-01-16T17:00',
          '2025-01-16T18:00', '2025-01-16T19:00', '2025-01-16T20:00',
          '2025-01-16T21:00', '2025-01-16T22:00', '2025-01-16T23:00',
          '2025-01-17T00:00', '2025-01-17T01:00', '2025-01-17T02:00',
          '2025-01-17T03:00', '2025-01-17T04:00', '2025-01-17T05:00',
          '2025-01-17T06:00', '2025-01-17T07:00', '2025-01-17T08:00',
          '2025-01-17T09:00', '2025-01-17T10:00', '2025-01-17T11:00',
          '2025-01-17T12:00', '2025-01-17T13:00', '2025-01-17T14:00',
          '2025-01-17T15:00', '2025-01-17T16:00', '2025-01-17T17:00',
          '2025-01-17T18:00', '2025-01-17T19:00', '2025-01-17T20:00',
          '2025-01-17T21:00', '2025-01-17T22:00', '2025-01-17T23:00',
          '2025-01-18T00:00', '2025-01-18T01:00', '2025-01-18T02:00',
          '2025-01-18T03:00', '2025-01-18T04:00', '2025-01-18T05:00',
          '2025-01-18T06:00', '2025-01-18T07:00', '2025-01-18T08:00',
          '2025-01-18T09:00', '2025-01-18T10:00', '2025-01-18T11:00',
          '2025-01-18T12:00', '2025-01-18T13:00', '2025-01-18T14:00',
          '2025-01-18T15:00', '2025-01-18T16:00', '2025-01-18T17:00',
          '2025-01-18T18:00', '2025-01-18T19:00', '2025-01-18T20:00',
          '2025-01-18T21:00', '2025-01-18T22:00', '2025-01-18T23:00',
          '2025-01-19T00:00', '2025-01-19T01:00', '2025-01-19T02:00',
          '2025-01-19T03:00', '2025-01-19T04:00', '2025-01-19T05:00',
          '2025-01-19T06:00', '2025-01-19T07:00', '2025-01-19T08:00',
          '2025-01-19T09:00', '2025-01-19T10:00', '2025-01-19T11:00',
          '2025-01-19T12:00', '2025-01-19T13:00', '2025-01-19T14:00',
          '2025-01-19T15:00', '2025-01-19T16:00', '2025-01-19T17:00',
          '2025-01-19T18:00', '2025-01-19T19:00', '2025-01-19T20:00',
          '2025-01-19T21:00', '2025-01-19T22:00', '2025-01-19T23:00',
          '2025-01-20T00:00', '2025-01-20T01:00', '2025-01-20T02:00',
          '2025-01-20T03:00',
          
        ],
        temperature_2m: [
           3.5,  3.5,  3.5,  3.4,  3.3,  3.3,    3,  3.1,    3,  2.2,  2.6,
           3.2,  3.2,  3.2,  3.4,  3.3,    3,  2.8,  2.6,  2.5,  2.2,    2,
           1.9,  1.7,  1.3,  0.9,  0.5,  0.2,    0, -0.2, -0.4, -0.5, -0.6,
          -0.5, -0.2,  0.4,  1.1,  1.7,  1.7,  1.3,  0.5,  0.1, -0.1, -0.3,
          -0.5, -0.6, -0.8,   -1,   -1, -1.1, -1.2, -1.3, -1.4, -1.6, -1.9,
          -2.2, -2.2,   -2, -1.9, -1.8, -1.3, -1.4, -1.3, -1.4, -1.7, -1.8,
            -2, -2.1, -2.2, -2.1,   -2, -1.9,   -2, -2.1, -2.1, -2.1,   -2,
          -1.8, -1.6, -1.3, -0.9, -0.2,    1,  2.3,  3.2,  3.5,  3.3,  2.7,
           2.2,    2,  1.9,  1.8,  1.8,  1.8,  1.8,  1.8,  1.7,  1.5,  1.2,
           0.9,
          
        ]
      },
      daily_units: {
        time: 'iso8601',
        weather_code: 'wmo code',
        temperature_2m_max: '°C',
        temperature_2m_min: '°C',
        apparent_temperature_max: '°C',
        apparent_temperature_min: '°C',
        sunrise: 'iso8601',
        sunset: 'iso8601',
        daylight_duration: 's',
        sunshine_duration: 's',
        uv_index_max: '',
        uv_index_clear_sky_max: '',
        precipitation_sum: 'mm',
        rain_sum: 'mm',
        showers_sum: 'mm',
        snowfall_sum: 'cm',
        precipitation_hours: 'h',
        precipitation_probability_max: '%',
        wind_speed_10m_max: 'km/h',
        wind_gusts_10m_max: 'km/h',
        wind_direction_10m_dominant: '°',
        shortwave_radiation_sum: 'MJ/m²',
        et0_fao_evapotranspiration: 'mm'
      },
      daily: {
        time: [
          '2025-01-16',
          '2025-01-17',
          '2025-01-18',
          '2025-01-19',
          '2025-01-20',
          '2025-01-21',
          '2025-01-22'
        ],
        weather_code: [
          45, 45, 45, 48,
           3,  3,  3
        ],
        temperature_2m_max: [
          3.5, 1.7,  -1, 3.5,
          2.4,   1, 1.5
        ],
        temperature_2m_min: [
           1.7,   -1, -2.2,
          -2.1, -0.5,   -2,
          -2.1
        ],
        apparent_temperature_max: [
           1.3, -1.2, -3.7,
           0.5, -0.6, -2.2,
          -1.5
        ],
        apparent_temperature_min: [
          -1.3, -3.8,
          -5.3, -5.4,
          -3.9, -5.5,
          -5.7
        ],
        sunrise: [
          '2025-01-16T07:08',
          '2025-01-17T07:07',
          '2025-01-18T07:06',
          '2025-01-19T07:05',
          '2025-01-20T07:04',
          '2025-01-21T07:02',
          '2025-01-22T07:01'
        ],
        sunset: [
          '2025-01-16T15:23',
          '2025-01-17T15:25',
          '2025-01-18T15:27',
          '2025-01-19T15:28',
          '2025-01-20T15:30',
          '2025-01-21T15:32',
          '2025-01-22T15:34'
        ],
        daylight_duration: [
          29728.04, 29889.03,
           30054.1, 30222.97,
           30395.4, 30571.12,
          30749.88
        ],
        sunshine_duration: [ 0, 9251.87, 0, 23627.33, 24925.17, 10392.02, 0 ],
        uv_index_max: [
           1.1, 1.35, 1.35,
          1.35, 1.35,  1.2,
          1.05
        ],
        uv_index_clear_sky_max: [
           1.3, 1.35, 1.35,
          1.35, 1.35,  1.2,
           1.2
        ],
        precipitation_sum: [
          0, 0, 0, 0,
          0, 0, 0
        ],
        rain_sum: [
          0, 0, 0, 0,
          0, 0, 0
        ],
        showers_sum: [
          0, 0, 0, 0,
          0, 0, 0
        ],
        snowfall_sum: [
          0, 0, 0, 0,
          0, 0, 0
        ],
        precipitation_hours: [
          0, 0, 0, 0,
          0, 0, 0
        ],
        precipitation_probability_max: [
          0, 0, 0, 0,
          0, 8, 8
        ],
        wind_speed_10m_max: [
          11.6, 7.4, 5.2,
           8.9,   8, 7.2,
           7.2
        ],
        wind_gusts_10m_max: [
          24.8, 16.6,   13,
          19.1, 25.2, 17.3,
          17.3
        ],
        wind_direction_10m_dominant: [
          251, 232, 127,
          113, 221, 213,
          221
        ],
        shortwave_radiation_sum: [
          1.33, 2.53,
          2.05, 3.78,
          3.93, 2.71,
          1.87
        ],
        et0_fao_evapotranspiration: [
          0.21, 0.23,
          0.19, 0.34,
          0.32, 0.23,
          0.24
        ]
      }
    }

    console.log("responseresponse ::: ", response)

    const utcOffsetSeconds = response.utc_offset_seconds;
    // const timezone = response.timezone;
    // const timezoneAbbreviation = response.timezone_abbreviation;
    // const latitude = response.latitude;
    // const longitude = response.longitude;

    const current = response.current;
    const hourly = response.hourly;
    const daily = response.daily;

    // const range = (start, stop, step) =>
    //   Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);

    const weatherData = {
      current: {
        time: new Date((current.time + utcOffsetSeconds) * 1000),
        temperature2m: current.temperature,
        relativeHumidity2m: current.relative_humidity_2m,
        apparentTemperature: current.apparent_temperature,
        isDay: current.is_day,
        precipitation: current.precipitation,
        rain: current.rain,
        showers: current.showers,
        snowfall: current.snowfall,
        weatherCode: current.weather_code,
        cloudCover: current.cloud_cover,
        pressureMsl: current.pressure_msl,
        surfacePressure: current.surface_pressure,
        windSpeed10m: current.wind_speed_10m,
        windDirection10m: current.wind_direction_10m,
        windGusts10m: current.wind_gusts_10m,
      },
      hourly: {
        time: hourly.time.map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        temperature2m: hourly.temperature_2m,
      },
      daily: {
        time: daily.time.map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.weather_code,
        temperature2mMax: daily.temperature_2m_max,
        temperature2mMin: daily.temperature_2m_min,
        apparentTemperatureMax: daily.apparent_temperature_max,
        apparentTemperatureMin: daily.apparent_temperature_min,
        sunrise: daily.sunrise,
        sunset: daily.sunset,
        daylightDuration: daily.daylight_duration,
        sunshineDuration: daily.sunshine_duration,
        uvIndexMax: daily.uv_index_max,
        uvIndexClearSkyMax: daily.uv_index_clear_sky_max,
        precipitationSum: daily.precipitation_sum,
        rainSum: daily.rain_sum,
        showersSum: daily.showers_sum,
        snowfallSum: daily.snowfall_sum,
        precipitationHours: daily.precipitation_hours,
        precipitationProbabilityMax: daily.precipitation_probability_max,
        windSpeed10mMax: daily.wind_speed_10m_max,
        windGusts10mMax: daily.wind_gusts_10m_max,
        windDirection10mDominant: daily.wind_direction_10m_dominant,
        shortwaveRadiationSum: daily.shortwave_radiation_sum,
        et0FaoEvapotranspiration: daily.et0_fao_evapotranspiration,
      },
    };

    console.log("Current Weather Data:", weatherData.current);
    console.log("Hourly Weather Data:", weatherData.hourly);
    console.log("Daily Weather Data:", weatherData.daily);
    console.log("Final response === > ", weatherData)
    return NextResponse.json(weatherData, { status: 200 });

  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}



// Response 
/**
 * responseresponse :::  {
  latitude: 52.52,
  longitude: 13.419998,
  generationtime_ms: 0.5800724029541016,
  utc_offset_seconds: 0,
  timezone: 'GMT',
  timezone_abbreviation: 'GMT',
  elevation: 38,
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: '°C',
    relative_humidity_2m: '%',
    apparent_temperature: '°C',
    is_day: '',
    precipitation: 'mm',
    rain: 'mm',
    showers: 'mm',
    snowfall: 'cm',
    weather_code: 'wmo code',
    cloud_cover: '%',
    pressure_msl: 'hPa',
    surface_pressure: 'hPa',
    wind_speed_10m: 'km/h',
    wind_direction_10m: '°',
    wind_gusts_10m: 'km/h'
  },
  current: {
    time: '2025-01-16T15:45',
    interval: 900,
    temperature_2m: 3.1,
    relative_humidity_2m: 89,
    apparent_temperature: 0.1,
    is_day: 0,
    precipitation: 0,
    rain: 0,
    showers: 0,
    snowfall: 0,
    weather_code: 3,
    cloud_cover: 98,
    pressure_msl: 1037.4,
    surface_pressure: 1032.5,
    wind_speed_10m: 7.9,
    wind_direction_10m: 231,
    wind_gusts_10m: 19.4
  },
  hourly_units: { time: 'iso8601', temperature_2m: '°C' },
  hourly: {
    time: [
      '2025-01-16T00:00', '2025-01-16T01:00', '2025-01-16T02:00',
      '2025-01-16T03:00', '2025-01-16T04:00', '2025-01-16T05:00',
      '2025-01-16T06:00', '2025-01-16T07:00', '2025-01-16T08:00',
      '2025-01-16T09:00', '2025-01-16T10:00', '2025-01-16T11:00',
      '2025-01-16T12:00', '2025-01-16T13:00', '2025-01-16T14:00',
      '2025-01-16T15:00', '2025-01-16T16:00', '2025-01-16T17:00',
      '2025-01-16T18:00', '2025-01-16T19:00', '2025-01-16T20:00',
      '2025-01-16T21:00', '2025-01-16T22:00', '2025-01-16T23:00',
      '2025-01-17T00:00', '2025-01-17T01:00', '2025-01-17T02:00',
      '2025-01-17T03:00', '2025-01-17T04:00', '2025-01-17T05:00',
      '2025-01-17T06:00', '2025-01-17T07:00', '2025-01-17T08:00',
      '2025-01-17T09:00', '2025-01-17T10:00', '2025-01-17T11:00',
      '2025-01-17T12:00', '2025-01-17T13:00', '2025-01-17T14:00',
      '2025-01-17T15:00', '2025-01-17T16:00', '2025-01-17T17:00',
      '2025-01-17T18:00', '2025-01-17T19:00', '2025-01-17T20:00',
      '2025-01-17T21:00', '2025-01-17T22:00', '2025-01-17T23:00',
      '2025-01-18T00:00', '2025-01-18T01:00', '2025-01-18T02:00',
      '2025-01-18T03:00', '2025-01-18T04:00', '2025-01-18T05:00',
      '2025-01-18T06:00', '2025-01-18T07:00', '2025-01-18T08:00',
      '2025-01-18T09:00', '2025-01-18T10:00', '2025-01-18T11:00',
      '2025-01-18T12:00', '2025-01-18T13:00', '2025-01-18T14:00',
      '2025-01-18T15:00', '2025-01-18T16:00', '2025-01-18T17:00',
      '2025-01-18T18:00', '2025-01-18T19:00', '2025-01-18T20:00',
      '2025-01-18T21:00', '2025-01-18T22:00', '2025-01-18T23:00',
      '2025-01-19T00:00', '2025-01-19T01:00', '2025-01-19T02:00',
      '2025-01-19T03:00', '2025-01-19T04:00', '2025-01-19T05:00',
      '2025-01-19T06:00', '2025-01-19T07:00', '2025-01-19T08:00',
      '2025-01-19T09:00', '2025-01-19T10:00', '2025-01-19T11:00',
      '2025-01-19T12:00', '2025-01-19T13:00', '2025-01-19T14:00',
      '2025-01-19T15:00', '2025-01-19T16:00', '2025-01-19T17:00',
      '2025-01-19T18:00', '2025-01-19T19:00', '2025-01-19T20:00',
      '2025-01-19T21:00', '2025-01-19T22:00', '2025-01-19T23:00',
      '2025-01-20T00:00', '2025-01-20T01:00', '2025-01-20T02:00',
      '2025-01-20T03:00',
      ... 68 more items
    ],
    temperature_2m: [
       3.5,  3.5,  3.5,  3.4,  3.3,  3.3,    3,  3.1,    3,  2.2,  2.6,
       3.2,  3.2,  3.2,  3.4,  3.3,    3,  2.8,  2.6,  2.5,  2.2,    2,
       1.9,  1.7,  1.3,  0.9,  0.5,  0.2,    0, -0.2, -0.4, -0.5, -0.6,
      -0.5, -0.2,  0.4,  1.1,  1.7,  1.7,  1.3,  0.5,  0.1, -0.1, -0.3,
      -0.5, -0.6, -0.8,   -1,   -1, -1.1, -1.2, -1.3, -1.4, -1.6, -1.9,
      -2.2, -2.2,   -2, -1.9, -1.8, -1.3, -1.4, -1.3, -1.4, -1.7, -1.8,
        -2, -2.1, -2.2, -2.1,   -2, -1.9,   -2, -2.1, -2.1, -2.1,   -2,
      -1.8, -1.6, -1.3, -0.9, -0.2,    1,  2.3,  3.2,  3.5,  3.3,  2.7,
       2.2,    2,  1.9,  1.8,  1.8,  1.8,  1.8,  1.8,  1.7,  1.5,  1.2,
       0.9,
      ... 68 more items
    ]
  },
  daily_units: {
    time: 'iso8601',
    weather_code: 'wmo code',
    temperature_2m_max: '°C',
    temperature_2m_min: '°C',
    apparent_temperature_max: '°C',
    apparent_temperature_min: '°C',
    sunrise: 'iso8601',
    sunset: 'iso8601',
    daylight_duration: 's',
    sunshine_duration: 's',
    uv_index_max: '',
    uv_index_clear_sky_max: '',
    precipitation_sum: 'mm',
    rain_sum: 'mm',
    showers_sum: 'mm',
    snowfall_sum: 'cm',
    precipitation_hours: 'h',
    precipitation_probability_max: '%',
    wind_speed_10m_max: 'km/h',
    wind_gusts_10m_max: 'km/h',
    wind_direction_10m_dominant: '°',
    shortwave_radiation_sum: 'MJ/m²',
    et0_fao_evapotranspiration: 'mm'
  },
  daily: {
    time: [
      '2025-01-16',
      '2025-01-17',
      '2025-01-18',
      '2025-01-19',
      '2025-01-20',
      '2025-01-21',
      '2025-01-22'
    ],
    weather_code: [
      45, 45, 45, 48,
       3,  3,  3
    ],
    temperature_2m_max: [
      3.5, 1.7,  -1, 3.5,
      2.4,   1, 1.5
    ],
    temperature_2m_min: [
       1.7,   -1, -2.2,
      -2.1, -0.5,   -2,
      -2.1
    ],
    apparent_temperature_max: [
       1.3, -1.2, -3.7,
       0.5, -0.6, -2.2,
      -1.5
    ],
    apparent_temperature_min: [
      -1.3, -3.8,
      -5.3, -5.4,
      -3.9, -5.5,
      -5.7
    ],
    sunrise: [
      '2025-01-16T07:08',
      '2025-01-17T07:07',
      '2025-01-18T07:06',
      '2025-01-19T07:05',
      '2025-01-20T07:04',
      '2025-01-21T07:02',
      '2025-01-22T07:01'
    ],
    sunset: [
      '2025-01-16T15:23',
      '2025-01-17T15:25',
      '2025-01-18T15:27',
      '2025-01-19T15:28',
      '2025-01-20T15:30',
      '2025-01-21T15:32',
      '2025-01-22T15:34'
    ],
    daylight_duration: [
      29728.04, 29889.03,
       30054.1, 30222.97,
       30395.4, 30571.12,
      30749.88
    ],
    sunshine_duration: [ 0, 9251.87, 0, 23627.33, 24925.17, 10392.02, 0 ],
    uv_index_max: [
       1.1, 1.35, 1.35,
      1.35, 1.35,  1.2,
      1.05
    ],
    uv_index_clear_sky_max: [
       1.3, 1.35, 1.35,
      1.35, 1.35,  1.2,
       1.2
    ],
    precipitation_sum: [
      0, 0, 0, 0,
      0, 0, 0
    ],
    rain_sum: [
      0, 0, 0, 0,
      0, 0, 0
    ],
    showers_sum: [
      0, 0, 0, 0,
      0, 0, 0
    ],
    snowfall_sum: [
      0, 0, 0, 0,
      0, 0, 0
    ],
    precipitation_hours: [
      0, 0, 0, 0,
      0, 0, 0
    ],
    precipitation_probability_max: [
      0, 0, 0, 0,
      0, 8, 8
    ],
    wind_speed_10m_max: [
      11.6, 7.4, 5.2,
       8.9,   8, 7.2,
       7.2
    ],
    wind_gusts_10m_max: [
      24.8, 16.6,   13,
      19.1, 25.2, 17.3,
      17.3
    ],
    wind_direction_10m_dominant: [
      251, 232, 127,
      113, 221, 213,
      221
    ],
    shortwave_radiation_sum: [
      1.33, 2.53,
      2.05, 3.78,
      3.93, 2.71,
      1.87
    ],
    et0_fao_evapotranspiration: [
      0.21, 0.23,
      0.19, 0.34,
      0.32, 0.23,
      0.24
    ]
  }
}
 */