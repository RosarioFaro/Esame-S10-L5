import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PrevisioniSuccessive from "./PrevisioniSuccessive";

const MeteoDetails = () => {
  const location = useLocation();
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
      <div className="card today-weather mb-4 text-center p-3 shadow-lg">
        <h2>
          {cityData.name}, {cityData.sys.country}
        </h2>
        <p className="display-4">{(cityData.main.temp - 273.15).toFixed(1)}°C</p>
        <img src={cityData.iconUrl} alt="Icona meteo" width={100} height={100} />
        <p className="text-capitalize">{cityData.weather[0].description}</p>
        <p>Umidità: {cityData.main.humidity}%</p>
        <p>Vento: {cityData.wind.speed} m/s</p>
      </div>

      <h3 className="text-center mb-3">Previsioni per i prossimi 5 giorni</h3>
      {error && <p className="text-danger">{error}</p>}

      {forecast ? (
        <div className="forecast-container row g-3 justify-content-center">
          {forecast.list
            .filter((item) => item.dt_txt.includes("12:00:00"))
            .map((item, index) => (
              <div key={index} className="col-2 d-flex">
                <div
                  className="forecast-card card text-center p-3 shadow-sm"
                  style={{ width: "300px", height: "auto" }}
                >
                  <img
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                    alt="Icona meteo"
                    width={50}
                    height={50}
                  />
                  <p className="text-capitalize fw-bold">
                    {new Date(item.dt * 1000).toLocaleDateString("it-IT", {
                      weekday: "long",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </p>

                  <p className="fw-bold">{(item.main.temp - 273.15).toFixed(1)}°C</p>
                  <p className="text-capitalize">{item.weather[0].description}</p>
                </div>
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
