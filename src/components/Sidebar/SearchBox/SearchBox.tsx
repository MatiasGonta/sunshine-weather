import { WeatherContext } from "@/context";
import { useContext, useState } from "react";

interface SearchBoxInterface {}

const SearchBox: React.FC<SearchBoxInterface> = () => {
  const { fetchWeatherByCity } = useContext(WeatherContext);
  const [cityName, setCityName] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeatherByCity(cityName);
  };

  return (
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
  );
};

export default SearchBox