const Footer = () => {
  const footerTexts = [
    ["Segnalazione Feronneni Intersai", "Previsioni Testuali", "Previsioni Mensili"],
    ["Avviso di burrasca", "Mappa Mare", "Mappa Montagna"],
    ["Notizie", "Galleria Fotografica", "Contatti"],
  ];

  return (
    <footer className="bg-warning py-1 mt-auto">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-12">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 justify-content-center text-start">
              {footerTexts.map((column, colIndex) => (
                <div key={colIndex} className="col mb-3">
                  <ul className="list-unstyled">
                    {column.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href="#" className="text-decoration-none text-black">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <ul className="list-unstyled text-start">
              <li>
                <a
                  href="https://www.flaticon.com/free-icons/meteorology"
                  title="meteorology icons"
                  className="text-decoration-none text-black"
                >
                  Icone create da Freepik - Flaticon
                </a>
              </li>
              <li>
                <a
                  href="https://codepen.io/Mark_Bowley/pen/LYZEBq"
                  title="backgound"
                  className="text-decoration-none text-black"
                >
                  Sfondo gentilmente offerto da Mark Bowley
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
