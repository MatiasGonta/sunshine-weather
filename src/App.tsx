import React, { useContext, useEffect } from 'react';
import { Sidebar, WeatherDisplay, LoadingSpinner } from './components';
import { WeatherContext } from './context';

const App: React.FC = () => {
  const { handleFetchWeatherByCoordinates, dataFetchingStatus } = useContext(WeatherContext);

  useEffect(() => {
    handleFetchWeatherByCoordinates();
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
