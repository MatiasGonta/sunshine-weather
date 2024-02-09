import { WeatherContext } from "@/context";
import { TypeWithKey, WeatherCondition, WeatherStatus } from "@/models";
import { useContext } from "react";

interface WeatherDisplayInterface { }

const WeatherDisplay: React.FC<WeatherDisplayInterface> = () => {
  const { weather } = useContext(WeatherContext);
  if (!weather.data) {
    return null;
  }

  const weatherResponses: TypeWithKey<WeatherCondition> = {
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

  const handleBackground = (weatherName: WeatherCondition) => {
    let imgURL;

    if (weatherName !== 'Thunderstorm' && weatherName !== 'Tornado' && weatherName !== 'Ash') {
      if (hours > 7 && hours < 20) {
        imgURL = new URL(`/src/assets/weather-backgrounds/${weatherResponses[weatherName]}-day.jpg`, import.meta.url).href;
      } else {
        imgURL = new URL(`/src/assets/weather-backgrounds/${weatherResponses[weatherName]}-night.jpg`, import.meta.url).href;
      }
    } else {
      imgURL = new URL(`/src/assets/weather-backgrounds/${weatherResponses[weatherName]}.jpg`, import.meta.url).href;
    }

    return `url("${imgURL}")`;
  }

  const weatherName = weatherResponses[weather.data.weather[0].main];

  // Calculate current time of weather
  const dateUnix: number = weather.data.dt;
  const timezone: number = weather.data.timezone;

  const date: Date = new Date((dateUnix + timezone) * 1000);

  const weekDayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const weekDayName: string = weekDayNames[date.getUTCDay()];
  const monthName: string = monthNames[date.getUTCMonth()];
  const hours: number = date.getUTCHours();
  const minutes: number = date.getUTCMinutes();

  // Current time of weather
  const time = `${weekDayName} ${date.getUTCDate()}, ${monthName} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return (
    <main style={{ backgroundImage: handleBackground(weatherName) }}>
      <section>
        <div className={`error-box ${weather.status === WeatherStatus.ERROR && "error-box--show"}`}>
          <span className="error-box__text">{weather.statusMessage}</span>
          <div className="error-box__icon">
            <svg width="100%" height="100%" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
            </svg>
          </div>
        </div>
        <article className="weather-display">
          <div>
            <p className="weather-display__temp">{parseInt(weather.data.main.temp)}°C</p>
          </div>
          <div>
            <p className="weather-display__city">{weather.data.name}</p>
            <p className="weather-display__time">{time}</p>
          </div>
          <div>
            <img
              className="weather-display__img"
              // src={`/src/assets/weather-icons/${weatherResponses[weather.data.weather[0].main]}.png`}
              src={new URL(`/src/assets/weather-icons/${weatherName}.png`, import.meta.url).href}
              alt={weather.data.weather[0].description}
            />
            <p className="weather-display__description">{weather.data.weather[0].description}</p>
          </div>
        </article>
      </section>
    </main>
  );
};

export default WeatherDisplay