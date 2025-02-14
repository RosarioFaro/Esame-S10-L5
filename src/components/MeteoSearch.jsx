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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MeteoFetch from "./MeteoFetch";
import MainCitiesCards from "./MainCitiesCards";
import { Container } from "react-bootstrap";

const MeteoSearch = () => {
  const [city, setCity] = useState("");
  const [meteoData, setMeteoData] = useState(null);
  const [error, setError] = useState(null);
  const [mainCitiesMeteo, setMainCitiesMeteo] = useState([]);

  const navigate = useNavigate();

  const MainCities = [
    { name: "Milano" },
    { name: "Parigi" },
    { name: "Londra" },
    { name: "New York" },
    { name: "Tokyo" },
    { name: "Los Angeles" },
    { name: "Berlin" },
    { name: "Madrid" },
    { name: "Dubai" },
    { name: "Sydney" },
    { name: "Shanghai" },
    { name: "Seoul" },
    { name: "Hong Kong" },
    { name: "Pechino" },
    { name: "Rio de Janeiro" },
  ];

  const fetchMainCitiesMeteo = async () => {
    try {
      const meteoDataPromises = MainCities.map(async (city) => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lang=it&q=${city.name}`
        );
        const data = await response.json();
        data.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        return data;
      });

      const allCitiesMeteoData = await Promise.all(meteoDataPromises);
      setMainCitiesMeteo(allCitiesMeteoData);
    } catch (error) {
      console.error("Errore nel recupero dei dati meteo per le città principali:", error);
    }
  };

  useEffect(() => {
    fetchMainCitiesMeteo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCityClick = (cityData) => {
    navigate("/meteo-details", { state: { cityData } });
  };

  return (
    <div>
      <div className="searchBar">
        <input
          type="text"
          placeholder="Inserisci il nome della città"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button>Cerca Meteo</button>
      </div>

      <MeteoFetch city={city} setMeteoData={setMeteoData} setError={setError} />

      {error && <p className="text-danger">{error}</p>}

      {meteoData && (
        <div className="card searchedCity" onClick={() => handleCityClick(meteoData)}>
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

      <Container>
        <MainCitiesCards citiesMeteo={mainCitiesMeteo} onCityClick={handleCityClick} />
      </Container>
    </div>
  );
};

export default MeteoSearch;
