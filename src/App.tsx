import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sidebar, WeatherDisplay } from './components';

const API_KEY = 'c23b1d28140788f772fa4de635fc98af';

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  // Obtener la ubicación del usuario al cargar la página
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

          try {
            const response = await axios.get(url);
            setWeatherData(response.data);
          } catch (error) {
            console.error('Error fetching weather data:', error);
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);
        }
      );
    } else {
      console.error('El navegador no admite la API de Geolocalización');
    }
  }, []);

  const handleSearch = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <main>
      <WeatherDisplay weatherData={weatherData} />
      <Sidebar onSearch={handleSearch} />
    </main>
  );
};

export default App
