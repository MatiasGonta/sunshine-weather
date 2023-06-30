import { WeatherContext } from "@/context";
import { WeatherContextData } from "@/models";
import { useContext } from "react";

export const useWeather = (): WeatherContextData => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeatherContext must be used within a WeatherProvider');
  }

  return context;
};