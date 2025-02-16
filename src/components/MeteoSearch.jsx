import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import MeteoFetch from "./MeteoFetch";
import MainCitiesCards from "./MainCitiesCards";
import { Container } from "react-bootstrap";
import { iconMap } from "./iconMap";
import celsius from "../assets/celsius.png";
import searchbar from "../assets/search.png";

const MeteoSearch = () => {
  const [city, setCity] = useState("");
  const [meteoData, setMeteoData] = useState(null);
  const [error, setError] = useState(null);
  const [mainCitiesMeteo, setMainCitiesMeteo] = useState([]);
  const [search, setSearch] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const startSearch = () => {
    if (city.trim() === "") {
      setSearch(false);
      setMeteoData(null);
      setError(null);
    } else {
      setSearch(true);
      setError(null);
      setIsLoading(true);
    }
  };

  const navigate = useNavigate();

  const MainCities = [
    { name: "Milano" },
    { name: "Parigi" },
    { name: "Londra" },
    { name: "New York" },
    { name: "Tokyo" },
    { name: "Las Vegas" },
    { name: "Berlin" },
    { name: "Madrid" },
    { name: "Dubai" },
    { name: "Sydney" },
  ];

  const formatCityTime = (timezone) => {
    const nowInUTC = Date.now();
    const cityTimeInMs = nowInUTC + (timezone - 3600) * 1000;
    const cityDate = new Date(cityTimeInMs);
    return cityDate.toLocaleTimeString("it-IT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const fetchMainCitiesMeteo = async () => {
    const meteoDataPromises = MainCities.map(async (city) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lang=it&q=${city.name}&limit=1`
        );
        const data = await response.json();

        const iconId = data.weather[0].icon;
        data.iconUrl = iconMap[iconId] || "/assets/iconeMeteo/default-icon.png";

        data.localTime = formatCityTime(data.timezone);

        return data;
      } catch (error) {
        console.error("Errore nel recupero dei dati meteo per la città:", city.name, error);
        return null;
      }
    });

    const allCitiesMeteoData = await Promise.all(meteoDataPromises);
    setMainCitiesMeteo(allCitiesMeteoData.filter((data) => data !== null));
  };

  useEffect(() => {
    fetchMainCitiesMeteo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (meteoData) {
      const interval = setInterval(() => {
        const formattedTime = formatCityTime(meteoData.timezone);
        setCurrentTime(formattedTime);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [meteoData]);

  const manageCityClick = (cityData) => {
    navigate(`/meteo-details?city=${cityData.name}&country=${cityData.sys.country}`);
  };

  return (
    <Container>
      <div>
        <div className="searchBar d-flex justify-content-center align-items-center gap-2 my-3">
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Inserisci il nome della città"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              if (event.target.value.trim() === "") {
                setSearch(false);
                setMeteoData(null);
                setError(null);
              }
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                startSearch();
              }
            }}
          />

          <button className="btn btn-custom d-none d-md-block" onClick={startSearch}>
            Cerca Meteo
          </button>
          <button className="btn btn-custom d-md-none" onClick={startSearch}>
            <img src={searchbar} alt="search" width={20} height={20} />
          </button>
        </div>

        {search && (
          <MeteoFetch city={city} setMeteoData={setMeteoData} setError={setError} setIsLoading={setIsLoading} />
        )}

        {error ? (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="card today-weather my-4 p-3 shadow-lg">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="skeleton-skeleton-text"
                style={{
                  width: "50%",
                  height: "20px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "5px",
                  animation: "shimmer 1.5s infinite",
                }}
              />
              <div
                className="skeleton-skeleton-icon"
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#e0e0e0",
                  borderRadius: "10px",
                  animation: "shimmer 1.5s infinite",
                }}
              />
            </div>

            <div
              className="skeleton-temperature"
              style={{
                marginTop: "20px",
                height: "30px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                width: "150px",
                animation: "shimmer 1.5s infinite",
              }}
            />

            <div
              className="skeleton-description"
              style={{
                marginTop: "10px",
                height: "20px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                width: "200px",
                animation: "shimmer 1.5s infinite",
              }}
            />

            <div
              className="skeleton-time"
              style={{
                marginTop: "10px",
                height: "20px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                width: "100px",
                animation: "shimmer 1.5s infinite",
              }}
            />
          </div>
        ) : meteoData ? (
          <div className="card today-weather my-4 p-3 shadow-lg" onClick={() => manageCityClick(meteoData)}>
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                {meteoData.name}, {meteoData.sys.country}
              </h2>
              <img src={meteoData.iconUrl} alt="Icona meteo" width={100} height={100} className="ms-3" />
            </div>

            <p className="h4">
              <img src={celsius} alt="celsius" width={30} height={30} /> : {(meteoData.main.temp - 273.15).toFixed(1)}°C
            </p>

            <p className="text-capitalize ms-auto fw-bold fs-5">{meteoData.weather[0].description}</p>
            <p className="h1 fw-bold">{currentTime}</p>
          </div>
        ) : null}

        <MainCitiesCards citiesMeteo={mainCitiesMeteo} onCityClick={manageCityClick} />
      </div>
    </Container>
  );
};

export default MeteoSearch;
