
export interface WeatherDetailsInterface {}

const WeatherDetails: React.FC<WeatherDetailsInterface> = () => {
  return (
    <div className="weather-details">
        <h3>Weather Details</h3>
        <div className="cloudy">
            <i className="fa-solid fa-cloud"></i>
            <div>
                <span></span>
                <p>Cloudy</p>
            </div>
        </div>
        <div className="humidity">
            <i className="fa-solid fa-water"></i>
            <div>
                <span></span>
                <p>Humidity</p>
            </div>
        </div>
        <div className="wind">
            <i className="fa-solid fa-wind"></i>
            <div>
                <span></span>
                <p>Wind Speed</p>
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails