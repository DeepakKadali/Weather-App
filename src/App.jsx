import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const fetchData = async () => {
    setIsApiLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=2a2bc82f88df41f089163800240901&q=${city}`
      );
      console.log(response);
      setCityData(response.data);
      setIsApiLoading(false);
    } catch (error) {
      window.alert("Failed to fetch weather data");
      setIsApiLoading(false);
      setCity("");
      setCityData("");
      console.log(error);
    }
  };

  return (
    <div className="main">
      <div className="input-container">
        <input
          type="text"
          className="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="button" onClick={() => fetchData()}>
          Search
        </button>
      </div>
      <div>{isApiLoading && <p>Loading data...</p>}</div>
      {!isApiLoading && cityData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h2>Temparature</h2>
            <div>
              {cityData.current.temp_c}
              <sup>o</sup>C
            </div>
          </div>
          <div className="weather-card">
            <h2>Humidity</h2>
            <div>{cityData.current.humidity}%</div>
          </div>
          <div className="weather-card">
            <h2>Condition</h2>
            <div>{cityData.current.condition.text}</div>
          </div>
          <div className="weather-card">
            <h2>Wind Speed</h2>
            <div>{cityData.current.wind_kph} kph</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
