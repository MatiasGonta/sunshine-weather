import { useState } from "react";
import { SearchBox, SearchHistory, WeatherDetails } from ".";

interface SidebarProps {
  onSearch: (city: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSearch }) => {
  const [cityName, setCityName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(cityName);
  };

  return (
    <aside>
      <SearchBox
        cityName={cityName}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
      <SearchHistory />
      <WeatherDetails />
    </aside>
  );
};

export default Sidebar