import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import celsius from "../assets/celsius.png";
import { useEffect, useState } from "react";

const MainCitiesCards = ({ citiesMeteo }) => {
  const navigate = useNavigate();

  const getLocalTime = (timezone) => {
    const nowInUTC = Date.now();
    const cityTimeInMs = nowInUTC + (timezone - 3600) * 1000;
    const cityDate = new Date(cityTimeInMs);
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
    <div className="main-cities mb-5">
      <Row xs={1} sm={2} xl={5} className="d-flex justify-content-between gy-2">
        {citiesMeteo.map((meteoData, index) => (
          <Col key={index}>
            <div className="card h-100 shadow-sm" onClick={() => manageCityClick(meteoData)}>
              <div className="card-body p-2">
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
