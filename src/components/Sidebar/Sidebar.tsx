import { WeatherContext } from "@/context";
import { useContext, useState } from "react";

interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {
  const { weather, handleFetchWeather } = useContext(WeatherContext);
  if (!weather.data) {
    return null;
  }
  
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    handleFetchWeather(cityName);
  };

  return (
    <aside className="sidebar">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your location"
            value={cityName}
            onChange={handleInputChange}
          />
          <button type="submit" className="fa-solid fa-magnifying-glass"></button>
        </form>
      </div>
      <div className="search-history">
        <h3>Search History</h3>
        <ul>
          {
            weather.history.map((search, index) => <li key={index} onClick={() => handleFetchWeather(search)}>{search}</li>)
          }
        </ul>
      </div>
      <div className="weather-details">
        <h3>Weather Details</h3>
        <div id="cloudy">
          <i className="fa-solid fa-cloud"></i>
          <div>
            <span>{weather.data.clouds.all}%</span>
            <p>Cloudy</p>
          </div>
        </div>
        <div id="humidity">
          <i className="fa-solid fa-water"></i>
          <div>
            <span>{weather.data.main.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div id="wind">
          <i className="fa-solid fa-wind"></i>
          <div>
            <span>{parseInt(weather.data.wind.speed)}Km/h</span>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar