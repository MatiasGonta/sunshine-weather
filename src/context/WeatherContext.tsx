import React, { createContext, useState } from 'react';
import axios from 'axios';
import { WeatherContextData } from '@/models';

const API_KEY = 'c23b1d28140788f772fa4de635fc98af';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

interface WeatherProviderInterface {
  children: JSX.Element | JSX.Element[];
}

export const WeatherContext = createContext<WeatherContextData | undefined>(undefined);

export const WeatherProvider: React.FC<WeatherProviderInterface> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [background, setBackground] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(["London","Paris","Tokyo","New York"]);

  const handleBackground = (response: any) => {
    const dateUnix = response.data.dt;
    const timezone = response.data.timezone;

    const date: Date = new Date((dateUnix + timezone) * 1000);
    const hours: number = date.getUTCHours();

    if (hours > 7 && hours < 20) {
      setBackground(`url("./src/assets/weather-backgrounds/${response.data.weather[0].main}-day.jpg")`);
    } else {
      setBackground(`url("./src/assets/weather-backgrounds/${response.data.weather[0].main}-night.jpg")`);
    }
  }

  const fetchWeatherByCoordinates = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const latitude: number = position.coords.latitude;
          const longitude: number = position.coords.longitude;

          try {
            const response = await api.get('/weather', {
              params: {
                lat: latitude,
                lon: longitude,
                units: 'metric'
              },
            });

            setSearchHistory([response.data.name, ...searchHistory]);
            searchHistory.pop();

            handleBackground(response);
            setWeatherData(response.data);
          } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);
        }
      );
    } else {
      console.error('El navegador no admite la API de Geolocalización');
    }
  };

  const fetchWeatherByCity = async (city: string) => {
    try {
      const response = await api.get('/weather', {
        params: {
          q: city,
          units: 'metric'
        },
      });

      setSearchHistory([response.data.name, ...searchHistory]);
      searchHistory.pop();

      handleBackground(response);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  const weatherContextValue: WeatherContextData = {
    weatherData,
    fetchWeatherByCoordinates,
    fetchWeatherByCity,
    background,
    searchHistory
  };

  return (
    <WeatherContext.Provider value={weatherContextValue}>
      {children}
    </WeatherContext.Provider>
  );
};
