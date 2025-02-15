import { useEffect } from "react";
import { iconMap } from "./iconMap";

const MeteoFetch = ({ city, setMeteoData, setError }) => {
  useEffect(() => {
    if (city.trim() === "") return;

    const cityMeteoFetch = async () => {
      try {
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?appid=28619d98dd7133d7330cadd0c6974d2b&q=${city}&limit=1&lang=it`
        );
        const geoData = await geoResponse.json();

        console.log("Risultato geocodifica:", geoData);

        if (geoData.length === 0) {
          setError("Città non trovata");
          setMeteoData(null);
          return;
        }

        const { lat, lon, name, country } = geoData[0];

        const meteoResp = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?appid=28619d98dd7133d7330cadd0c6974d2b&lat=${lat}&lon=${lon}&lang=it`
        );
        const meteoData = await meteoResp.json();

        console.log("Dati meteo ricevuti:", meteoData);

        meteoData.name = name;
        meteoData.country = country;

        const iconId = meteoData.weather[0].icon;
        meteoData.iconUrl = iconMap[iconId] || "/assets/iconeMeteo/default-icon.png";

        setMeteoData(meteoData);
        setError(null);
      } catch (error) {
        console.error("Errore:", error);
        setError("Si è verificato un errore durante la ricerca.");
        setMeteoData(null);
      }
    };

    cityMeteoFetch();
  }, [city, setMeteoData, setError]);

  return null;
};

export default MeteoFetch;
