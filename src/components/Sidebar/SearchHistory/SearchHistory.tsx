
export interface SearchHistoryInterface {}

const SearchHistory: React.FC = () => {
  return (
    <div className="search-history">
        <h3>Search History</h3>
        <ul>
            <li id="one"></li>
            <li id="two"></li>
            <li id="three"></li>
            <li id="four"></li>
        </ul>
    </div>
  )
}

export default SearchHistory