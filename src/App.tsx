import React, { useContext, useEffect } from 'react';
import { Sidebar, WeatherDisplay, LoadingSpinner } from './components';
import { WeatherContext } from './context';
import { TypeWithKey, WeatherStatus } from './models';
import { useSearchParams } from './hooks';

const App: React.FC = () => {
  const { weather, handleFetchWeather } = useContext(WeatherContext);
  const searchValue = useSearchParams();

  useEffect(() => {
    if (searchValue) {
      handleFetchWeather(searchValue);
    } else {
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
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);

  return (
    <>
      {
        weather.status === WeatherStatus.LOADING
          ? <LoadingSpinner />
          : (
            <>
              <WeatherDisplay />
              <Sidebar />
            </>
          )
      }
    </>
  );
};

export default App
