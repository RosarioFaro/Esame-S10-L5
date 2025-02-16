import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import MeteoSearch from "./components/MeteoSearch";
import { BrowserRouter, Route, Routes } from "react-router";
import MeteoDetails from "./components/MeteoDetails";
import Footer from "./components/footer";
import NotFoundPage from "./components/NotFound";
import Preferiti from "./components/Preferiti";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<MeteoSearch />} />
          <Route path="/preferiti" element={<Preferiti />} />
          <Route path="/meteo-details" element={<MeteoDetails />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
