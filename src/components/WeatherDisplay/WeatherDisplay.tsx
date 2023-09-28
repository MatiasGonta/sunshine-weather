import { WeatherContext } from "@/context";
import { TypeWithKey } from "@/models";
import { useContext } from "react";

interface WeatherDisplayInterface {}

const WeatherDisplay: React.FC<WeatherDisplayInterface> = () => {
  const { weather } = useContext(WeatherContext);
  if (!weather.data) {
    return null;
  }
  
  const weatherResponses: TypeWithKey<string> = {
    Clear: 'Clear',
    Clouds: 'Clouds',
    Rain: 'Rain',
    Drizzle: 'Rain',
    Thunderstorm: 'Thunderstorm',
    Snow: 'Snow',
    Mist: 'Mist',
    Fog: 'Mist',
    Haze: 'Mist',
    Smoke: 'Dust',
    Dust: 'Dust',
    Sand: 'Dust',
    Ash: 'Ash',
    Squall: 'Mist',
    Tornado: 'Tornado'
  };

  const handleBackground = (weatherName: string) => {
    if (weatherName !== 'Thunderstorm' && weatherName !== 'Tornado' && weatherName !== 'Ash') {
      if (hours > 7 && hours < 20) {
        return `url("./src/assets/weather-backgrounds/${weatherResponses[weatherName]}-day.jpg")`;
      } else {
        return `url("./src/assets/weather-backgrounds/${weatherResponses[weatherName]}-night.jpg")`;
      }
    } else {
      return `url("./src/assets/weather-backgrounds/${weatherResponses[weatherName]}.jpg")`;
    }
  }

  // Calculate current time of weather
  const dateUnix: number = weather.data.dt;
  const timezone: number = weather.data.timezone;
  
  const date: Date = new Date((dateUnix + timezone) * 1000);

  const weekDayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
  const weekDayName: string = weekDayNames[date.getUTCDay()];
  const monthName: string = monthNames[date.getUTCMonth()];
  const hours: number = date.getUTCHours();
  const minutes: number = date.getUTCMinutes();

  // Current time of weather
  const time = `${weekDayName} ${date.getUTCDate()}, ${monthName} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`;

  return (
    <main style={{
      backgroundImage: handleBackground(weather.data.weather[0].main),
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      height: '100%',
    }}>
      <article className="weather-display">
        <div className={weather.status === 'ERROR' ? "error-box show" : "error-box"}>
          <span>Your location was not founded</span>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <section>
          <div>
            <p id="temp">{parseInt(weather.data.main.temp)}°C</p>
          </div>
          <div>
            <p id="city">{weather.data.name}</p>
            <p id="time">{time}</p>
          </div>
          <div>
            <img
              src={`./src/assets/weather-icons/${weatherResponses[weather.data.weather[0].main]}.png`}
              alt={weather.data.weather[0].description}
            />
            <p id="description">{weather.data.weather[0].description}</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default WeatherDisplay