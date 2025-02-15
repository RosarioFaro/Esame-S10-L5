import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import icona from "../assets/meteorology.png";
import { Link } from "react-router";

function Menu() {
  return (
    <Navbar expand="lg" className="bg-warning ">
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
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
