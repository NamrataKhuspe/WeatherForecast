
import NextImage from "next/image"; // Import with alias to avoid conflicts
import { useRouter } from "next/navigation";


// components/WeatherCard.tsx
type WeatherCardProps = {
    location: string;
    temperature: string;
    condition: string;
    icon : string;
  };

  
  export default function WeatherCard({ location, temperature, condition, icon }: WeatherCardProps) {
    // console.log("icon : ", icon)
    const router = useRouter();

    const handleCardClick = () => {
      // ${encodeURIComponent(location)}
      // Navigate to the detailed weather forecast page
      router.push(`/forecast?location=Mumbai`);
    };

    return (
      // <div className="bg-white shadow-md rounded-lg p-4 w-60 m-2">
      //   <h2 className="text-xl font-bold">{location}</h2>
      //   <p className="text-lg">{temperature} °C</p>
      //   <p className="text-gray-600">{description}</p>
      // </div>
      <div className="relative cursor-pointer" onClick={handleCardClick}>
      <div
        className={`p-6 rounded-lg shadow-md w-64 ${
          condition === "Mist"
            ? "bg-gray-200"
            : condition === 'Haze'
            ? "bg-gray-200"
            : condition === "Sunny"
            ? "bg-yellow-300"
            : condition === "Cloudy"
            ? "bg-gray-400"
            : "bg-white"
        }`}
      >
        <h3 className="text-xl font-semibold">{location}</h3>
        <p className="text-2xl">{temperature}°C</p>
        <p className="text-gray-500">{condition}</p>
      </div>
      <div className="absolute top-2 right-2">
      <NextImage
          src={icon}
          alt={`${condition} icon`}
          width={32}
          height={32}
          priority
          className="w-8 h-8"
        />
  </div>
    </div>
    
    );
  }
  