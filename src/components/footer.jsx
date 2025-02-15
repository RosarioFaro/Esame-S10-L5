const Footer = () => {
  const footerTexts = [
    ["Segnalazione Feronneni Intersai", "Previsioni Testuali", "Suelo", "Previsioni Mensili"],
    ["Avviso di burrasca", "Mappa Mare", "Mappa Montagna"],
    ["Notizie", "Galleria Fotografica", "Contatti"],
  ];

  return (
    <footer className="bg-warning mt-auto">
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col col-6">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-4">
              {footerTexts.map((column, colIndex) => (
                <div key={colIndex} className="col">
                  <div className="row">
                    <div className="col footer-links">
                      {column.map((link, linkIndex) => (
                        <p key={linkIndex}>
                          <a href="#" alt="footer link" className="text-decoration-none text-black">
                            {link}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
