import { WeatherContext } from "@/context";
import { useContext } from "react";

export interface WeatherDetailsInterface {}

const WeatherDetails: React.FC<WeatherDetailsInterface> = () => {
  const { weatherData } = useContext(WeatherContext);
  if (!weatherData) {
    return null;
  }

  return (
    <div className="weather-details">
        <h3>Weather Details</h3>
        <div id="cloudy">
            <i className="fa-solid fa-cloud"></i>
            <div>
                <span>{weatherData.clouds.all}%</span>
                <p>Cloudy</p>
            </div>
        </div>
        <div id="humidity">
            <i className="fa-solid fa-water"></i>
            <div>
                <span>{weatherData.main.humidity}%</span>
                <p>Humidity</p>
            </div>
        </div>
        <div id="wind">
            <i className="fa-solid fa-wind"></i>
            <div>
                <span>{parseInt(weatherData.wind.speed)}Km/h</span>
                <p>Wind Speed</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails