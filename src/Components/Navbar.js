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
            <div className="logo">Edu</div>
            <div className="logo2">Link</div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link className="navi-link" to="/student">
              <div className="buttonfont">Student</div>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navi-link" to="/teacher">
              <div className="buttonfont">Teacher</div>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="navi-link" to="/about">
              <div className="buttonfont">About</div>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navi;
