import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const MainCitiesCards = ({ citiesMeteo }) => {
  const navigate = useNavigate();

  const getLocalTime = (timezone) => {
    const localTime = new Date(new Date().getTime() + timezone * 1000);
    return localTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const manageCityClick = (cityData) => {
    navigate("/meteo-details", { state: { cityData } });
  };

  return (
    <div className="main-cities">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {citiesMeteo.map((meteoData, index) => (
          <Col key={index}>
            <div
              className="card"
              style={{ position: "relative", paddingBottom: "40px", cursor: "pointer" }}
              onClick={() => manageCityClick(meteoData)}
            >
              <div className="card-content">
                <h2>{meteoData.name}</h2>
                <p>Temperatura: {(meteoData.main.temp - 273.15).toFixed(1)}°C</p>
                <p className="text-capitalize">{meteoData.weather[0].description}</p>
              </div>
              <img src={meteoData.iconUrl} alt="Icona meteo" className="weather-icon" width={40} height={40} />
              <div className="local-time">{getLocalTime(meteoData.timezone)}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainCitiesCards;
