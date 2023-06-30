import { useWeather } from "@/hook";
import { formatTime } from "@/utilities";

interface WeatherDisplayInterface {}

const WeatherDisplay: React.FC<WeatherDisplayInterface> = () => {
  const { weatherData } = useWeather();
  if (!weatherData) {
    return null;
  }

  const dateUnix: number = weatherData.dt;
  const timezone: number = weatherData.timezone;
  
  const date: Date = new Date((dateUnix + timezone) * 1000);

  return (
    <article>
      <section className="weather-display">
        <div>
          <p id="temp">{parseInt(weatherData.main.temp)}°C</p>
        </div>
        <div>
          <p id="city">{weatherData.name}</p>
          <p id="time">{formatTime(date)}</p>
        </div>
        <div>
          <img src={`./src/assets/weather-icons/${weatherData.weather[0].main}.png`} alt={weatherData.weather[0].description} />
          <p id="description">{weatherData.weather[0].description}</p>
        </div>
      </section>
    </article>
  );
};

export default WeatherDisplay