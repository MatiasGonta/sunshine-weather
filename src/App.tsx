import React, { useContext, useEffect } from 'react';
import { Sidebar, WeatherDisplay, LoadingSpinner } from './components';
import { WeatherContext } from './context';

const App: React.FC = () => {
  const { fetchWeatherByCoordinates, dataFetchingStatus } = useContext(WeatherContext);

  useEffect(() => {
    fetchWeatherByCoordinates();
  }, []);

  return (
    <>
      {(dataFetchingStatus === 'LOADING') ? (
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
