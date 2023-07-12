import React, { createContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { OpenWeatherAPIResponse, TypeWithKey } from '@/models';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '@/services';

interface WeatherContextInterface {
  weatherData: OpenWeatherAPIResponse | null;
  dataFetchingStatus: 'INACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS',
  handleFetchWeather: (fetchInfo: string | TypeWithKey<number>) => void;
  searchesHistory: string[];
}

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext<WeatherContextInterface>({
  weatherData: null,
  dataFetchingStatus: 'INACTIVE',
  handleFetchWeather: () => {},
  searchesHistory: []
});

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherAPIResponse | null>(null);
  const [dataFetchingStatus, setDataFetchingStatus] = useState<'INACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS'>('INACTIVE');
  const [searchesHistory, setSearchesHistory] = useState<string[]>(() => {
    const savedSearches = localStorage.getItem('searchesHistory');
    return savedSearches ? JSON.parse(savedSearches) : ['London', 'Paris', 'Tokyo', 'New York'];
  });

  useEffect(() => {
    localStorage.setItem('searchesHistory', JSON.stringify(searchesHistory));
  }, [searchesHistory]);

  const handleFetchWeather = async (fetchInfo: string | TypeWithKey<number>) => {
    try {
      setDataFetchingStatus('LOADING');
      
      let response:AxiosResponse<OpenWeatherAPIResponse>;

      if (typeof fetchInfo === 'string') {
        response = await fetchWeatherByCity(fetchInfo);
      } else {
        response = await fetchWeatherByCoordinates(fetchInfo);
      }

      if (searchesHistory[0] !== response.data.name) {
        if (searchesHistory.length >= 4) {
          searchesHistory.pop();
        }
        setSearchesHistory([response.data.name, ...searchesHistory]);
      }

      setWeatherData(response.data);
      setDataFetchingStatus('SUCCESS');
    } catch (error) {
      setDataFetchingStatus('ERROR');
      setTimeout(()=> {
        setDataFetchingStatus('INACTIVE');
      }, 3000)

      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  const weatherContextValue: WeatherContextInterface = {
    weatherData,
    dataFetchingStatus,
    handleFetchWeather,
    searchesHistory
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};