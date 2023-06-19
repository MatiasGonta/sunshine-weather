import axios from 'axios';

const API_KEY = 'c23b1d28140788f772fa4de635fc98af';

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

export const fetchWeatherData = async (city: string) => {
  try {
    const response = await api.get('/weather', {
      params: {
        q: city,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
