interface WeatherDisplayProps {
  weatherData: any;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { main, weather, name, dt } = weatherData;
  const { temp } = main;
  const { description, icon } = weather[0];
  const time = new Date(dt * 1000).toLocaleTimeString();

  return (
    <article>
      <section className="weather-info">
        <div>
          <p className="temp">{parseInt(temp)}°C</p>
        </div>
        <div>
          <p className="city">{name}</p>
          <p className="time">{time}</p>
        </div>
        <div>
          <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={description} />
          <p className="description">{description}</p>
        </div>
      </section>
    </article>
  );
};

export default WeatherDisplay