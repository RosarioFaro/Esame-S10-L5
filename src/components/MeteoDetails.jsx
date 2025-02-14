import { useLocation, useNavigate } from "react-router";

const MeteoDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cityData = location.state?.cityData;

  if (!cityData) {
    return <h2>Nessun dato disponibile</h2>;
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Torna indietro</button>
      <h2>
        {cityData.name}, {cityData.sys.country}
      </h2>
      <p>Temperatura: {(cityData.main.temp - 273.15).toFixed(1)}°C</p>
      <p>Umidità: {cityData.main.humidity}%</p>
      <p>Vento: {cityData.wind.speed} m/s</p>
      <p>
        <img src={cityData.iconUrl} alt="Icona meteo" width={50} height={50} />
        {cityData.weather[0].description}
      </p>
    </div>
  );
};

export default MeteoDetails;
