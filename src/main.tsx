import React from 'react';
import ReactDOM from 'react-dom/client';
import { WeatherProvider } from './context';
import App from './App.tsx';
import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
)
