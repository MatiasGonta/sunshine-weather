import { SearchBox, SearchHistory, WeatherDetails } from ".";

interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {

  return (
    <aside className="sidebar">
      <SearchBox />
      <SearchHistory />
      <WeatherDetails />
    </aside>
  );
};

export default Sidebar