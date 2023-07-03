import { SearchBox, SearchesHistory, WeatherDetails } from ".";

interface SidebarInterface {}

const Sidebar: React.FC<SidebarInterface> = () => {

  return (
    <aside className="sidebar">
      <SearchBox />
      <SearchesHistory />
      <WeatherDetails />
    </aside>
  );
};

export default Sidebar