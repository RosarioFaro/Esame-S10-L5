import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PrevisioniSuccessive from "./PrevisioniSuccessive";

const MeteoDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cityData = location.state?.cityData;

  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cityData) {
      PrevisioniSuccessive(cityData.coord.lat, cityData.coord.lon)
        .then((data) => {
          if (data) {
            setForecast(data);
          } else {
            setError("Errore nel recupero delle previsioni");
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [cityData]);

  if (!cityData) {
    return <h2>Nessun dato disponibile</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Torna indietro</button>
      <h2>
        {cityData.name}, {cityData.sys.country}
      </h2>
      <p>Temperatura attuale: {cityData.main.temp}°C</p>
      <p>Umidità: {cityData.main.humidity}%</p>
      <p>Vento: {cityData.wind.speed} m/s</p>
      <img src={cityData.iconUrl} alt="Icona meteo" width={50} height={50} />
      <p>{cityData.weather[0].description}</p>

      <h3>Previsioni per i prossimi 5 giorni</h3>
      {error && <p className="text-danger">{error}</p>}

      {forecast ? (
        <div className="forecast-container">
          {forecast.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .map((item, index) => (
              <div key={index} className="forecast-card">
                <p>
                  <strong>
                    {new Date(item.dt * 1000).toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </strong>
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Icona meteo"
                  width={50}
                  height={50}
                />
                <p>{item.main.temp.toFixed(1)}°C</p>
                <p>{item.weather[0].description}</p>
              </div>
            ))}
        </div>
      ) : (
        <p>Caricamento previsioni...</p>
      )}
    </div>
  );
};

export default MeteoDetails;
