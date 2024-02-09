import { WeatherContext } from "@/context";
import { useContext } from "react";

interface SidebarInterface { }

const Sidebar: React.FC<SidebarInterface> = () => {
  const { weather } = useContext(WeatherContext);
  if (!weather.data) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const cityName: string = new FormData(e.currentTarget).get('search')!.toString();
    window.location.href = `/?search=${cityName}`;
  };

  return (
    <aside className="sidebar">

      {/* Weather Search */}
      <div className="sidebar__search-box">
        <div className="sidebar__search-box__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" strokeWidth="0" fill="currentColor" />
          </svg>
        </div>
        <form className="sidebar__search-box__form" onSubmit={handleSubmit}>
          <input
            name="search"
            className="sidebar__search-box__input"
            type="text"
            placeholder="Enter your location"
          />
          <button type="submit" className="sidebar__search-box__button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="70%"
              height="70%"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>
        </form>
      </div>

      {/* Weather History */}
      <div className="sidebar__search-history">
        <h3 className="sidebar__title">Search History</h3>
        <ul className="sidebar__search-history__list">
          {
            weather.history.map((search, index) => (
              <li
                key={index}
                className="sidebar__search-history__list__item"
                onClick={() => window.location.href = `/?search=${search}`}
              >
                {search}
              </li>)
            )
          }
        </ul>
      </div>

      {/* Weather Details */}
      <div className="sidebar__weather-details">
        <h3 className="sidebar__title">Weather Details</h3>
        <div className="sidebar__weather-details__detail">
          <div className="sidebar__weather-details__detail__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10.04 4.305c2.195 -.667 4.615 -.224 6.36 1.176c1.386 1.108 2.188 2.686 2.252 4.34l.003 .212l.091 .003c2.3 .107 4.143 1.961 4.25 4.27l.004 .211c0 2.407 -1.885 4.372 -4.255 4.482l-.21 .005h-11.878l-.222 -.008c-2.94 -.11 -5.317 -2.399 -5.43 -5.263l-.005 -.216c0 -2.747 2.08 -5.01 4.784 -5.417l.114 -.016l.07 -.181c.663 -1.62 2.056 -2.906 3.829 -3.518l.244 -.08z" strokeWidth="0" fill="currentColor" />
            </svg>
          </div>

          <div>
            <span>{weather.data.clouds.all}%</span>
            <p>Cloudy</p>
          </div>
        </div>
        <div className="sidebar__weather-details__detail">
          <div className="sidebar__weather-details__detail__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 7c3 -2 6 -2 9 0s6 2 9 0" />
              <path d="M3 17c3 -2 6 -2 9 0s6 2 9 0" />
              <path d="M3 12c3 -2 6 -2 9 0s6 2 9 0" />
            </svg>
          </div>

          <div>
            <span>{weather.data.main.humidity}%</span>
            <p>Humidity</p>
          </div>
        </div>
        <div className="sidebar__weather-details__detail">
          <div className="sidebar__weather-details__detail__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 8h8.5a2.5 2.5 0 1 0 -2.34 -3.24" />
              <path d="M3 12h15.5a2.5 2.5 0 1 1 -2.34 3.24" />
              <path d="M4 16h5.5a2.5 2.5 0 1 1 -2.34 3.24" />
            </svg>
          </div>

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