import React, { useContext, useEffect } from 'react';
import { Sidebar, WeatherDisplay, LoadingSpinner } from './components';
import { WeatherContext } from './context';

const App: React.FC = () => {
  const { fetchWeatherByCoordinates, loading } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeatherByCoordinates();
  }, []);

  return (
    <>
      {(loading) ? (
        <LoadingSpinner />
      ) : (
        <>
          <WeatherDisplay />
          <Sidebar />
        </>
      )}
    </>
  );
};

export default App
