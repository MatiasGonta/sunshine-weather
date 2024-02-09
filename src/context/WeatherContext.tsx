import React, { createContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import { OpenWeatherAPIResponse, Weather, TypeWithKey, WeatherStatus } from '@/models';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '@/services';

interface WeatherContextInterface {
  weather: Weather;
  handleFetchWeather: (fetchInfo: string | TypeWithKey<number>) => void;
}

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext<WeatherContextInterface>({
  weather: {
    data: null,
    status: WeatherStatus.INACTIVE,
    statusMessage: '',
    history: []
  },
  handleFetchWeather: () => {}
});

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const defaultHistory = ['London', 'Paris', 'Tokyo', 'New York', 'New York'];
  const savedHistory = localStorage.getItem('searchesHistory');

  const [weather, setWeather] = useState<Weather>({
    data: null,
    status: WeatherStatus.INACTIVE,
    statusMessage: '',
    history: savedHistory ? JSON.parse(savedHistory) : defaultHistory
  });

  const handleFetchWeather = async (fetchInfo: string | TypeWithKey<number>) => {
    try {
      setWeather((prevWeather) => ({
        ...prevWeather,
        status: WeatherStatus.LOADING,
      }));
  
      let response: AxiosResponse<OpenWeatherAPIResponse>;
  
      if (typeof fetchInfo === 'string') {
        response = await fetchWeatherByCity(fetchInfo);
      } else {
        response = await fetchWeatherByCoordinates(fetchInfo);
      }

      let newWeatherState: Weather = {
        data: response.data,
        status: WeatherStatus.SUCCESS,
        statusMessage: response.statusText,
        history: weather.history
      }
  
      // Handle searches history
      const lastSearch = weather.history[0];
      const newSearch = response.data.name;

      if (lastSearch !== newSearch) {
        let newHistory = [newSearch, ...weather.history];
        if (newHistory.length > 4) {
          newHistory = newHistory.slice(0, 4);
        }
  
        newWeatherState = {
          ...newWeatherState,
          history: newHistory
        }
      }
  
      localStorage.setItem('searchesHistory', JSON.stringify(weather.history));

      setWeather(newWeatherState);
    } catch (error: any) {
      const errorMessage = (error.response && error.response.data && error.response.data.message) || 'An unknown error occurred';

      const formattedErrorMessage = errorMessage.substring(0,1).toUpperCase() + errorMessage.substring(1);

      setWeather((prevWeather) => ({
        ...prevWeather,
        status: WeatherStatus.ERROR,
        statusMessage: formattedErrorMessage
      }));
  
      setTimeout(() => {
        setWeather((prevWeather) => ({
          ...prevWeather,
          status: WeatherStatus.INACTIVE,
          statusMessage: ''
        }));
      }, 3000);
    }
  };

  const weatherContextValue: WeatherContextInterface = {
    weather,
    handleFetchWeather
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};