const MainCitiesCards = ({ MainCities }) => {
  return (
    <div className="fixed-cities">
      {MainCities.map((city, index) => (
        <div key={index} className="fixed-city-card">
          <h4>{city.name}</h4>
          <p>{city.country}</p>
        </div>
      ))}
    </div>
  );
};

export default MainCitiesCards;
