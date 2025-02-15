import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import celsius from "../assets/celsius.png";
import { useEffect, useState } from "react";

const MainCitiesCards = ({ citiesMeteo }) => {
  const navigate = useNavigate();

  const getLocalTime = (timezone) => {
    const nowInUTC = Date.now();
    const cityTimeInMillis = nowInUTC + (timezone - 3600) * 1000;
    const cityDate = new Date(cityTimeInMillis);
    return cityDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const [localTimes, setLocalTimes] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const newLocalTimes = {};
      citiesMeteo.forEach((city) => {
        newLocalTimes[city.name] = getLocalTime(city.timezone);
      });
      setLocalTimes(newLocalTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, [citiesMeteo]);

  const manageCityClick = (cityData) => {
    navigate("/meteo-details", { state: { cityData } });
  };

  return (
    <div className="main-cities">
      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
        {citiesMeteo.map((meteoData, index) => (
          <Col key={index}>
            <div
              className="card h-100 shadow-sm"
              style={{ position: "relative", cursor: "pointer" }}
              onClick={() => manageCityClick(meteoData)}
            >
              <div className="card-body">
                <h2 className="card-title">{meteoData.name}</h2>
                <p className="card-text text-capitalize">{meteoData.weather[0].description}</p>
                <p className="card-text">
                  <img src={celsius} alt="celsius" width={30} height={30} />
                  {(meteoData.main.temp - 273.15).toFixed(1)}°C
                </p>
                <img
                  src={meteoData.iconUrl}
                  alt="Icona meteo"
                  className="position-absolute top-0 end-0 m-2"
                  width={50}
                  height={50}
                />
                <div className="local-time mt-2">{localTimes[meteoData.name]}</div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MainCitiesCards;
