import React, { useContext, useEffect } from 'react';
import { Sidebar, WeatherDisplay, LoadingSpinner } from './components';
import { WeatherContext } from './context';
import { TypeWithKey } from './models';

const App: React.FC = () => {
  const { weather, handleFetchWeather } = useContext(WeatherContext);

  useEffect(() => {
    function success(position: GeolocationPosition) {
      const coords: TypeWithKey<number> = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      handleFetchWeather(coords);
    }

    function error() {
      handleFetchWeather('New York');
    }
    navigator.geolocation.getCurrentPosition(success,error)
  }, []);

  return (
    <>
      {(weather.status === 'LOADING') ? (
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
