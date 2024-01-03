export enum WeatherStatus {
  INACTIVE = 'INACTIVE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
};

export interface Weather {
  data: OpenWeatherAPIResponse | null;
  status: WeatherStatus;
  statusMessage: string;
  history: string[];
}

export type WeatherCondition =
  | 'Clear'
  | 'Clouds'
  | 'Rain'
  | 'Drizzle'
  | 'Thunderstorm'
  | 'Snow'
  | 'Mist'
  | 'Fog'
  | 'Haze'
  | 'Smoke'
  | 'Dust'
  | 'Sand'
  | 'Ash'
  | 'Squall'
  | 'Tornado'
;

export interface OpenWeatherAPIResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: WeatherCondition;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: string;
    feels_like: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: string;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h"?: number;
    "3h"?: number;
  };
  snow?: {
    "1h"?: number;
    "3h"?: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    message?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}