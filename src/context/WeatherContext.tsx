import React, { createContext, useState } from 'react';

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext({
  weatherData: null,
  setingWeatherData: (data:any) => {}
});

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  const setingWeatherData = (data: any) => {
    setWeatherData(data)
  }

  const contextWeatherValue: any = {
    weatherData,
    setingWeatherData
  };

  return (
    <WeatherContext.Provider value={contextWeatherValue}>
      {children}
    </WeatherContext.Provider>
  );
};