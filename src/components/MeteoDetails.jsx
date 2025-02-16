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
  const cityData = location.state.cityData;

  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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

  const aggiungiAiPreferiti = () => {
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
          <div className="today-weather my-4 p-3 shadow-lg">
            <div className="d-flex justify-content-between align-items-start">
              <h2 className="mb-0">
                {cityData.name}, {cityData.sys.country}
              </h2>
              <img src={cityData.iconUrl} alt="Icona meteo" width={100} height={100} className="ms-3" />
            </div>
            <p className="display-4">{(cityData.main.temp - 273.15).toFixed(1)}°C</p>
            <p className="text-capitalize">{cityData.weather[0].description}</p>
            <p>
              <img src={humidity} alt="humidity" width={50} height={50} /> : {cityData.main.humidity}%
            </p>
            <p>
              <img src={windsocket} alt="windsocket" width={50} height={50} /> : {cityData.wind.speed} m/s
            </p>
            <button onClick={aggiungiAiPreferiti} className="btn btn-primary">
              Aggiungi ai preferiti
            </button>
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
