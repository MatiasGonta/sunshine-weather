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

      <div className="sidebar__search-box">
        <i className="fa-solid fa-location-dot"></i>
        <form className="sidebar__search-box__form" onSubmit={handleSubmit}>
          <input
            className="sidebar__search-box__input"
            type="text"
            placeholder="Enter your location"
            value={cityName}
            onChange={handleInputChange}
          />
          <button type="submit" className="sidebar__search-box__button fa-solid fa-magnifying-glass"></button>
        </form>
      </div>

      <div className="sidebar__search-history">
        <h3 className="sidebar__title">Search History</h3>
        <ul className="sidebar__search-history__list">
          {
            weather.history.map((search, index) => (
                <li
                  key={index}
                  className="sidebar__search-history__list__item"
                  onClick={() => handleFetchWeather(search)}
                >
                  {search}
                </li>)
              )
          }
        </ul>
      </div>

      <div className="sidebar__weather-details">
        <h3 className="sidebar__title">Weather Details</h3>
        <div className="sidebar__weather-details__detail">
          <i className="sidebar__weather-details__detail__icon fa-solid fa-cloud"></i>
          <div>
            <span>{weather.data.clouds.all}%</span>
            <p>Cloudy</p>
          </div>
        </div>
        <div className="sidebar__weather-details__detail">
          <i className="sidebar__weather-details__detail__icon fa-solid fa-water"></i>
          <div>
            <span>{weather.data.main.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="sidebar__weather-details__detail">
          <i className="sidebar__weather-details__detail__icon fa-solid fa-wind"></i>
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