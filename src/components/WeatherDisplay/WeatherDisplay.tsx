import { WeatherContext } from "@/context";
import { formatTime, weatherResponseNames } from "@/utilities";
import { useContext } from "react";

interface WeatherDisplayInterface {}

const WeatherDisplay: React.FC<WeatherDisplayInterface> = () => {
  const { weatherData, error } = useContext(WeatherContext);
  if (!weatherData) {
    return null;
  }

  const dateUnix: number = weatherData.dt;
  const timezone: number = weatherData.timezone;
  
  const date: Date = new Date((dateUnix + timezone) * 1000);

  const handleBackground = (date: Date, weatherName:string) => {
    const hours: number = date.getUTCHours();

    if (weatherName !== 'Thunderstorm' && weatherName !== 'Tornado' && weatherName !== 'Ash') {
      if (hours > 7 && hours < 20) {
        return `url("./src/assets/weather-backgrounds/${weatherResponseNames[weatherName]}-day.jpg")`;
      } else {
        return `url("./src/assets/weather-backgrounds/${weatherResponseNames[weatherName]}-night.jpg")`;
      }
    } else {
      return `url("./src/assets/weather-backgrounds/${weatherResponseNames[weatherName]}.jpg")`;
    }
  }

  return (
    <main>
      <article style={{
        backgroundImage: handleBackground(date, weatherData.weather[0].main),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      }}>
        <div className={(error) ? "error-box show" : "error-box"}>
          <span>Your location was not founded</span>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <section className="weather-display">
          <div>
            <p id="temp">{parseInt(weatherData.main.temp)}°C</p>
          </div>
          <div>
            <p id="city">{weatherData.name}</p>
            <p id="time">{formatTime(date)}</p>
          </div>
          <div>
            <img src={`./src/assets/weather-icons/${weatherResponseNames[weatherData.weather[0].main]}.png`} alt={weatherData.weather[0].description} />
            <p id="description">{weatherData.weather[0].description}</p>
          </div>
        </section>
      </article>
    </main>
  );
};

export default WeatherDisplay