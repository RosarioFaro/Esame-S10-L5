import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./components/Menu";
import MeteoSearch from "./components/MeteoSearch";
import { BrowserRouter, Route, Routes } from "react-router";
import MeteoDetails from "./components/MeteoDetails";

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path="/" element={<MeteoSearch />} />
          <Route path="/meteo-details" element={<MeteoDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
