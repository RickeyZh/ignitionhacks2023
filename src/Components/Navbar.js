import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, Link } from "react-router-dom";

function Navi() {
  return (
    <Navbar className="navbar">
      <Container>
        <Navbar.Brand>
          <Link className="navi-brand" to="/home">
            Teaching App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navi-link" to="/student">
                Student
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navi-link" to="/teacher">
                Teacher
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navi-link" to="/about">
                About
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
