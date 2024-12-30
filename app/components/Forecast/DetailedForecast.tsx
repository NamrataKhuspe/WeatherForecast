const DetailedForecast = ({ location, forecast }) => {
  // Validate location and forecast props
  if (!location) {
    return <p>Location is unavailable.</p>;
  }

  if (!forecast || !Array.isArray(forecast) || forecast.length === 0) {
    return <p>No forecast data available for {location}.</p>;
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weather Forecast for {location}</h1>
      <ul className="space-y-2">
        {forecast.map((item, index) => (
          <li
            key={index}
            className="p-3 bg-gray-100 rounded-lg shadow-sm flex justify-between items-center"
          >
            <div>
              <span className="font-medium">{item.date}</span>:{" "}
              <span className="text-blue-600">{item.temperature}°C</span>
            </div>
            <span className="text-gray-500">{item.condition}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailedForecast;
