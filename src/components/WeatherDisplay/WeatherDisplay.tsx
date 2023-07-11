import { WeatherContext } from "@/context";
import { TypeWithKey } from "@/models";
import { useContext } from "react";

interface WeatherDisplayInterface {}

const WeatherDisplay: React.FC<WeatherDisplayInterface> = () => {
  const { weatherData, dataFetchingStatus } = useContext(WeatherContext);
  if (!weatherData) {
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

  const dateUnix: number = weatherData.dt;
  const timezone: number = weatherData.timezone;
  
  const date: Date = new Date((dateUnix + timezone) * 1000);

  const weekDayNames: string[] = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames: string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    
  const weekDayName = weekDayNames[date.getUTCDay()];
  const monthName = monthNames[date.getUTCMonth()];
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const handleBackground = (weatherName:string) => {
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

  return (
    <main>
      <article style={{
        backgroundImage: handleBackground(weatherData.weather[0].main),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }}>
        <div className={(dataFetchingStatus === 'ERROR') ? "error-box show" : "error-box"}>
          <span>Your location was not founded</span>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <section className="weather-display">
          <div>
            <p id="temp">{parseInt(weatherData.main.temp)}°C</p>
          </div>
          <div>
            <p id="city">{weatherData.name}</p>
            <p id="time">{`${weekDayName} ${date.getUTCDate()}, ${monthName} ${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}`}</p>
          </div>
          <div>
            <img src={`./src/assets/weather-icons/${weatherResponses[weatherData.weather[0].main]}.png`} alt={weatherData.weather[0].description} />
            <p id="description">{weatherData.weather[0].description}</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default WeatherDisplay