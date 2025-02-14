const PrevisioniSuccessive = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=28619d98dd7133d7330cadd0c6974d2b&lat=${lat}&lon=${lon}&lang=it`
    );

    if (!response.ok) {
      throw new Error("Errore nel recupero dei dati meteo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Errore nel fetch dei dati meteo:", error);
    return null;
  }
};

export default PrevisioniSuccessive;
