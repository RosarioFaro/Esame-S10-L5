import { useEffect } from "react";

const MeteoFetch = ({ city, setMeteoData, setError }) => {
  useEffect(() => {
    if (city) {
      const cityMeteoFetch = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?appid=28619d98dd7133d7330cadd0c6974d2b&q=${city}`
          );
          const data = await response.json();

          if (data.length === 0) {
            setError("Città non trovata");
            setMeteoData(null);
            return;
          }

          const { lat, lon } = data[0];

          const meteoResp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lat=${lat}&lon=${lon}&lang=it`
          );
          const meteoData = await meteoResp.json();

          meteoData.iconUrl = `https://openweathermap.org/img/wn/${meteoData.weather[0].icon}@2x.png`;

          setMeteoData(meteoData);
          setError(null);
        } catch (error) {
          console.error("Errore:", error);
          setError("Si è verificato un errore durante la ricerca.");
          setMeteoData(null);
        }
      };

      cityMeteoFetch();
    }
  }, [city, setMeteoData, setError]);

  return null;
};

export default MeteoFetch;
