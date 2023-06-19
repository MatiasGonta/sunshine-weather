
interface SearchBoxProps {
  cityName: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ cityName, onInputChange, onSubmit }) => {
  return (
    <div className="search-box">
      <i className="fa-solid fa-location-dot"></i>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Enter your location"
          value={cityName}
          onChange={onInputChange}
        />
        <button type="submit" className="fa-solid fa-magnifying-glass"></button>
      </form>
    </div>
  );
};

export default SearchBox