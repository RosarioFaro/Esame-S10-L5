import { Link } from "react-router";
import knife from "../assets/notfound/knife.png";
import murder from "../assets/notfound/murder.png";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1>404 - Pagina non trovata</h1>
      <p>Oops! Non avresti dovuto vedere questo. Clicca sul pulsante per tornare alla home dove sarai al sicuro.</p>

      <div className="image-container">
        <img width={250} height={250} src={knife} alt="knife" />
        <img width={250} height={250} src={murder} alt="murder" />
      </div>
      <div className="mt-3">
        <Link to="/" className="btn btn-primary">
          Torna alla Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
