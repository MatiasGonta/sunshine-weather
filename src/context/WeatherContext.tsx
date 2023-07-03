import React, { createContext, useState } from 'react';
import axios from 'axios';
import { OpenWeatherAPIResponse } from '@/models';

const API_KEY = 'c23b1d28140788f772fa4de635fc98af';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

interface WeatherContextDataInterface {
  weatherData: OpenWeatherAPIResponse | null;
  error: boolean;
  loading: boolean;
  fetchWeatherByCoordinates: () => void;
  fetchWeatherByCity: (city: string) => void;
  searchesHistory: string[];
}

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext<WeatherContextDataInterface>({
  weatherData: null,
  error: false,
  loading: false,
  fetchWeatherByCoordinates: () => {},
  fetchWeatherByCity: () => {},
  searchesHistory: []
});

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherAPIResponse | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchesHistory, setSearchesHistory] = useState<string[]>(['London','Paris','Tokyo','New York']);

  const fetchWeatherByCoordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;

          try {
            setLoading(true);
            const response = await api.get('/weather', {
              params: {
                lat: latitude,
                lon: longitude,
                units: 'metric'
              },
            });
            
            setSearchesHistory([response.data.name, ...searchesHistory]);
            searchesHistory.pop();

            setWeatherData(response.data);
            setLoading(false);
          } catch (error) {
            setLoading(false);
            console.error('Error fetching weather data:', error);
            throw error;
          }
        },
        (error) => {
          fetchWeatherByCity('New York');
          console.error('Error on getting user location:', error);
        }
      );
    } else {
      fetchWeatherByCity('New York');
      console.error('The browser doesn´t support the Geolocation API');
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      setLoading(true);
      const response = await api.get('/weather', {
        params: {
          q: city,
          units: 'metric'
        },
      });

      if (searchesHistory.length >= 4) {
        searchesHistory.pop();
      }
      setSearchesHistory([response.data.name, ...searchesHistory]);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true)
      setTimeout(()=> {
        setError(false)
      }, 3000)
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  const weatherContextValue: WeatherContextDataInterface = {
    weatherData,
    error,
    loading,
    fetchWeatherByCoordinates,
    fetchWeatherByCity,
    searchesHistory
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};