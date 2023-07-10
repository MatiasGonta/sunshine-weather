import React, { createContext, useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { OpenWeatherAPIResponse } from '@/models';
import { fetchWeatherByCity, fetchWeatherByCoordinates } from '@/services';

interface WeatherContextInterface {
  weatherData: OpenWeatherAPIResponse | null;
  dataFetchingStatus: 'INACTIVE' | 'LOADING' | 'ERROR' | 'SUCCESS',
  handleFetchWeatherByCoordinates: () => void;
  handleFetchWeatherByCity: (city: string) => void;
  searchesHistory: string[];
}

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext<WeatherContextInterface>({
  weatherData: null,
  dataFetchingStatus: 'INACTIVE',
  handleFetchWeatherByCoordinates: () => {},
  handleFetchWeatherByCity: () => {},
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

  const handleFetchWeatherByCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;

          try {
            setDataFetchingStatus('LOADING');

            const response: AxiosResponse<OpenWeatherAPIResponse> = await fetchWeatherByCoordinates(latitude, longitude);

            if (searchesHistory[0] !== response.data.name) {
              setSearchesHistory([response.data.name, ...searchesHistory]);
              searchesHistory.pop();
            }

            setWeatherData(response.data);
            setDataFetchingStatus('SUCCESS');
          } catch (error) {
            setDataFetchingStatus('ERROR');

            console.error('Error fetching weather data:', error);
            throw error;
          }
        },
        (error) => {
          handleFetchWeatherByCity('New York');
          console.error('Error on getting user location:', error);
        }
      );
    } else {
      handleFetchWeatherByCity('New York');
      console.error('The browser doesn´t support the Geolocation API');
    }
  };

  const handleFetchWeatherByCity = async (city: string) => {
    try {
      setDataFetchingStatus('LOADING');

      const response: AxiosResponse<OpenWeatherAPIResponse> = await fetchWeatherByCity(city);

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
    handleFetchWeatherByCoordinates,
    handleFetchWeatherByCity,
    searchesHistory
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};