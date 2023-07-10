import { WeatherContext } from "@/context";
import { useContext } from "react";

export interface SearchesHistoryInterface {}

const SearchesHistory: React.FC = () => {
  const { searchesHistory, handleFetchWeatherByCity } = useContext(WeatherContext);

  return (
    <div className="search-history">
        <h3>Search History</h3>
        <ul>
          {
            searchesHistory.map((search, index) => <li key={index} onClick={()=> handleFetchWeatherByCity(search)}>{search}</li>)
          }
        </ul>
    </div>
  )
}

export default SearchesHistory