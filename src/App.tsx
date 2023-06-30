import React, { useEffect } from 'react';
import { Sidebar, WeatherDisplay } from './components';
import { useWeather } from './hook';

const App: React.FC = () => {
  const { fetchWeatherByCoordinates, background } = useWeather();

  useEffect(() => {
    fetchWeatherByCoordinates();
  }, []);

  return (
    <main style={{
      backgroundImage: background,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100vw',
      height: '100vh',
    }}>
      <WeatherDisplay />
      <Sidebar />
    </main>
  );
};

export default App
