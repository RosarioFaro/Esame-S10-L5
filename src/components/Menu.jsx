import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import icona from "../assets/meteorology.png";
import { Link } from "react-router";
import { useState } from "react";

function Menu() {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleNightMode = () => {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle("night-mode");
  };

  return (
    <Navbar expand="lg" className="bg-warning">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img src={icona} alt="icona" width={50} height={50} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/preferiti"}>
              Preferiti
            </Nav.Link>
            <button id="toggle-night-mode" className="btn-custom d-lg-none" onClick={toggleNightMode}>
              <img
                src={isNightMode ? "./src/assets/iconeMeteo/sunny.png" : "./src/assets/iconeMeteo/clear-night.png"}
                alt={isNightMode ? "Modalità Chiara" : "Modalità Notturna"}
                width="20"
                height="20"
              />
            </button>
          </Nav>
        </Navbar.Collapse>
        <button id="toggle-night-mode" className="btn-custom ms-auto d-none d-lg-block" onClick={toggleNightMode}>
          <img
            src={isNightMode ? "./src/assets/iconeMeteo/sunny.png" : "./src/assets/iconeMeteo/clear-night.png"}
            alt={isNightMode ? "Modalità Chiara" : "Modalità Notturna"}
            width="20"
            height="20"
          />
        </button>
      </Container>
    </Navbar>
  );
}

export default Menu;
