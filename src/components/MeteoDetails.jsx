import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { iconMap } from "./iconMap";
import PrevisioniSuccessive from "./PrevisioniSuccessive";
import { Container, Row, Col } from "react-bootstrap";
import windsocket from "../assets/wind.png";
import humidity from "../assets/humidity.png";
import Alert from "./Alert";

const MeteoDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const cityName = searchParams.get("city");
  const country = searchParams.get("country");

  const [cityData, setCityData] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (cityName && country) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lang=it&q=${cityName},${country}&limit=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setCityData(data);
            const iconId = data.weather[0].icon;
            data.iconUrl = iconMap[iconId] || "/assets/iconeMeteo/default-icon.png";
            return PrevisioniSuccessive(data.coord.lat, data.coord.lon);
          } else {
            setError("Città non trovata");
            return null;
          }
        })
        .then((forecastData) => {
          if (forecastData) {
            setForecast(forecastData);
          } else {
            setError("Errore nel recupero delle previsioni");
          }
        })
        .catch((err) => setError(err.message));
    }
  }, [cityName, country]);

  const aggiungiAiPreferiti = () => {
    if (!cityData) return;

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.some((city) => city.name === cityData.name)) {
      favorites.push(cityData);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setAlertMessage(`${cityData.name} è stata aggiunta ai preferiti!`);
      setShowAlert(true);
    } else {
      setAlertMessage(`${cityData.name} è già nei preferiti.`);
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const today = new Date().toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
  });

  if (!cityData) {
    return <h2>Nessun dato disponibile</h2>;
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h3 className="text-center mt-3">Previsioni del {today}</h3>
        </Col>
        <Col xs={12}>
          <div className="today-weather my-4 p-4 shadow-lg">
            <div className="row align-items-start flex-md-nowrap">
              <div className="col-8 col-md-8 col-lg-8 d-flex flex-column">
                <h2 className="mb-0">
                  {cityData.name}, {cityData.sys.country}
                </h2>
                <p className="display-3 fw-bold">{(cityData.main.temp - 273.15).toFixed(1)}°C</p>
                <small className="d-block mb-3">(Percepita: {(cityData.main.feels_like - 273.15).toFixed(1)}°C)</small>
                <p className="text-capitalize fs-4">{cityData.weather[0].description}</p>

                <div className="d-flex align-items-center mb-2">
                  <img src={humidity} alt="humidity" width={40} height={40} className="me-2" />
                  <span className="fs-5"> : {cityData.main.humidity}%</span>
                </div>

                <div className="d-flex align-items-center mb-3 d-none d-sm-block">
                  <img src={windsocket} alt="windsocket" width={40} height={40} className="me-2" />
                  <span className="fs-5"> : {(cityData.wind.speed * 3.6).toFixed(1)} km/h</span>
                </div>

                <button onClick={aggiungiAiPreferiti} className="btn btn-primary d-flex align-items-center">
                  Aggiungi ai preferiti
                </button>
              </div>

              <div className="col-4 col-md-4 col-lg-4 text-end">
                <img src={cityData.iconUrl} alt="Icona meteo" className="img-fluid weather-icon" />
              </div>
            </div>
          </div>
        </Col>

        <Col xs={12}>
          <h3 className="text-center mb-3">Previsioni per i prossimi 5 giorni</h3>
        </Col>

        {error && (
          <Col xs={12}>
            <p className="text-danger">{error}</p>
          </Col>
        )}

        {forecast ? (
          <Col xs={12}>
            <Row className="g-3 justify-content-between">
              {forecast.list
                .filter((item) => item.dt_txt.includes("12:00:00"))
                .map((item, index) => {
                  const iconId = item.weather[0].icon;
                  const iconUrl = iconMap[iconId] || "/assets/iconeMeteo/default-icon.png";

                  return (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                      <div className="forecast-card card text-center p-3 shadow-sm mb-5">
                        <div className="d-flex justify-content-center align-items-center mb-3">
                          <img src={iconUrl} alt="Icona meteo" width={50} height={50} />
                        </div>
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
                    </Col>
                  );
                })}
            </Row>
          </Col>
        ) : (
          <Col xs={12}>
            <p>Caricamento previsioni...</p>
          </Col>
        )}
      </Row>

      <Alert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />
    </Container>
  );
};

export default MeteoDetails;
