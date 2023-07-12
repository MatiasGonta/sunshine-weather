import { OpenWeatherAPIResponse, TypeWithKey } from "@/models";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_KEY: string = 'c23b1d28140788f772fa4de635fc98af';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  params: {
    appid: API_KEY,
  },
});

export const fetchWeatherByCoordinates = (coords: TypeWithKey<number>): Promise<AxiosResponse<OpenWeatherAPIResponse>> => {
    return api.get('/weather', {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          units: 'metric'
        },
    });
};
  
export const fetchWeatherByCity = (city: string): Promise<AxiosResponse<OpenWeatherAPIResponse>> => {
    return api.get('/weather', {
        params: {
          q: city,
          units: 'metric'
        },
    });
};