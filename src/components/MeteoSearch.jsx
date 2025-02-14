import { useState } from "react";

const MeteoSearch = () => {
  const [city, setCity] = useState("");

  const cityFetch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=28619d98dd7133d7330cadd0c6974d2b`
      );
      const data = await response.json();

      const { lat, lon } = data[0];
      console.log("Latitudine:", lat, "Longitudine:", lon);
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Inserisci il nome della città"
        value={city}
        onChange={(event) => setCity(event.target.value)}
      />
      <button onClick={cityFetch}>Cerca Meteo</button>
    </div>
  );
};

export default MeteoSearch;
