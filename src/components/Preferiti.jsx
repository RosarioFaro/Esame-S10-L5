import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";

const Preferiti = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const preferitiSalvati = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(preferitiSalvati);
  }, []);

  const rimuoviDaiPreferiti = (cityName) => {
    const aggiornaPreferiti = favorites.filter((city) => city.name !== cityName);
    setFavorites(aggiornaPreferiti);
    localStorage.setItem("favorites", JSON.stringify(aggiornaPreferiti));
  };

  return (
    <Container>
      <h3 className="text-center mt-3">I tuoi preferiti</h3>
      <Row>
        {favorites.length === 0 ? (
          <Col xs={12}>
            <p className="text-center">Non hai ancora aggiunto città ai preferiti.</p>
          </Col>
        ) : (
          favorites.map((city, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div className="forecast-card h-100 shadow-sm">
                <div className="card-body p-2">
                  <h2 className="card-title">{city.name}</h2>
                  <p className="card-text text-capitalize">{city.weather[0].description}</p>
                  <img
                    src={city.iconUrl}
                    alt="Icona meteo"
                    className="position-absolute top-0 end-0 m-2"
                    width={50}
                    height={50}
                  />
                  <Link
                    to={`/meteo-details?city=${city.name}&country=${city.sys.country}`}
                    className="btn btn-info mt-2 me-2"
                  >
                    Vedi dettagli
                  </Link>
                  <button className="btn btn-danger mt-2" onClick={() => rimuoviDaiPreferiti(city.name)}>
                    Rimuovi
                  </button>
                </div>
              </div>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Preferiti;
