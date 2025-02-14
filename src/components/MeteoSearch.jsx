/* import { useState } from "react";

const MeteoSearch = () => {
  const [city, setCity] = useState("");
  const [meteoData, setMeteoData] = useState(null);
  const [error, setError] = useState(null);

  const cityMeteoFetch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?appid=28619d98dd7133d7330cadd0c6974d2b&q=${city}`
      );
      const data = await response.json();

      if (data.length === 0) {
        setError("Città non trovata");
        setMeteoData(null);
        return;
      }

      const { lat, lon } = data[0];

      const meteoResp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lat=${lat}&lon=${lon}&lang=it`
      );
      const meteoData = await meteoResp.json();

      setMeteoData(meteoData);
      setError(null);
    } catch (error) {
      console.error("Errore:", error);
      setError("Si è verificato un errore durante la ricerca.");
      setMeteoData(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Inserisci il nome della città"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={cityMeteoFetch}>Cerca Meteo</button>

      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        meteoData && (
          <div className="card">
            <h2>
              {meteoData.name}, {meteoData.sys.country}
            </h2>
            <p>Temperatura: {(meteoData.main.temp - 273.15).toFixed(1)}°C</p>
            <p>Descrizione: {meteoData.weather[0].description}</p>
          </div>
        )
      )}
    </div>
  );
};

export default MeteoSearch;
 */

import { useState } from "react";
import MeteoFetch from "./MeteoFetch";
import MainCitiesCards from "./MainCitiesCards";

const MeteoSearch = () => {
  const [city, setCity] = useState("");
  const [meteoData, setMeteoData] = useState(null);
  const [error, setError] = useState(null);

  const startSearch = () => {
    setMeteoData(null);
    setError(null);
  };

  const MainCities = [
    { name: "Roma", country: "IT" },
    { name: "Milano", country: "IT" },
    { name: "Parigi", country: "FR" },
    { name: "Londra", country: "GB" },
    { name: "New York", country: "US" },
    { name: "Tokyo", country: "JP" },
  ];

  return (
    <div>
      <input
        type="text"
        placeholder="Inserisci il nome della città"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={startSearch}>Cerca Meteo</button>

      <MeteoFetch city={city} setMeteoData={setMeteoData} setError={setError} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {meteoData && (
        <div className="card">
          <h2>
            {meteoData.name}, {meteoData.sys.country}
          </h2>
          <p>Temperatura: {(meteoData.main.temp - 273.15).toFixed(1)}°C</p>

          <p>
            <img src={meteoData.iconUrl} alt="Icona meteo" width={40} height={40} />
            {meteoData.weather[0].description}
          </p>
        </div>
      )}

      <MainCitiesCards MainCities={MainCities} />
    </div>
  );
};

export default MeteoSearch;
