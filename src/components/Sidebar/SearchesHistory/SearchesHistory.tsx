import { WeatherContext } from "@/context";
import { useContext } from "react";

export interface SearchesHistoryInterface {}

const SearchesHistory: React.FC = () => {
  const { searchesHistory, fetchWeatherByCity } = useContext(WeatherContext);

  return (
    <div className="search-history">
        <h3>Search History</h3>
        <ul>
          {
            searchesHistory.map((search, index) => <li key={index} onClick={()=> fetchWeatherByCity(search)}>{search}</li>)
          }
        </ul>
    </div>
  )
}

export default SearchesHistory