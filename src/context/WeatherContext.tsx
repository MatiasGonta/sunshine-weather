import React, { createContext, useState } from 'react';
import { AxiosResponse } from 'axios';
import { OpenWeatherAPIResponse, TypeWithKey } from '@/models';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '@/services';

interface WeatherContextInterface {
  weather: Weather;
  handleFetchWeather: (fetchInfo: string | TypeWithKey<number>) => void;
}

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

type WeatherStatus = 'INACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS';

interface Weather {
  data: OpenWeatherAPIResponse | null;
  status: WeatherStatus;
  history: string[];
}

export const WeatherContext = createContext<WeatherContextInterface>({
  weather: {
    data: null,
    status: 'INACTIVE',
    history: []
  },
  handleFetchWeather: () => {}
});

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const defaultHistory = ['London', 'Paris', 'Tokyo', 'New York', 'New York'];
  const savedHistory = localStorage.getItem('searchesHistory');

  const [weather, setWeather] = useState<Weather>({
    data: null,
    status: 'INACTIVE',
    history: savedHistory ? JSON.parse(savedHistory) : defaultHistory
  });

  const handleFetchWeather = async (fetchInfo: string | TypeWithKey<number>) => {
    try {
      setWeather((prevWeather) => ({
        ...prevWeather,
        status: 'LOADING',
      }));
  
      let response: AxiosResponse<OpenWeatherAPIResponse>;
  
      if (typeof fetchInfo === 'string') {
        response = await fetchWeatherByCity(fetchInfo);
      } else {
        response = await fetchWeatherByCoordinates(fetchInfo);
      }
  
      // Handle searches history
      const lastSearch = weather.history[0];
      const newSearch = response.data.name;

      if (lastSearch !== newSearch) {
        let newHistory = [newSearch, ...weather.history];
        if (newHistory.length > 4) {
          newHistory = newHistory.slice(0, 4);
        }
  
        setWeather((prevWeather) => ({
          ...prevWeather,
          history: newHistory,
        }));
      }
  
      localStorage.setItem('searchesHistory', JSON.stringify(weather.history));

      setWeather((prevWeather) => ({
        ...prevWeather,
        data: response.data,
        status: 'SUCCESS',
      }));
    } catch (error) {
      setWeather((prevWeather) => ({
        ...prevWeather,
        status: 'ERROR',
      }));
  
      setTimeout(() => {
        setWeather((prevWeather) => ({
          ...prevWeather,
          status: 'INACTIVE',
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