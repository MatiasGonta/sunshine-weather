import { OpenWeatherAPIResponse } from "@/models";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_KEY: string = 'c23b1d28140788f772fa4de635fc98af';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

export const fetchWeatherByCoordinates = async (latitude: number, longitude: number): Promise<AxiosResponse<OpenWeatherAPIResponse>> => {
    return api.get('/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric'
        },
    });
};
  
export const fetchWeatherByCity = async (city: string): Promise<AxiosResponse<OpenWeatherAPIResponse>> => {
    return api.get('/weather', {
        params: {
          q: city,
          units: 'metric'
        },
    });
};