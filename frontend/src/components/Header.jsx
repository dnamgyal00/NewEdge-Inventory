import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
// import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <Navbar className="navbar navbar-expand bg-dark navbar-dark sticky-top px-4 py-0">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <img src={logo} alt="logo" /> */}
              Inventory
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <LinkContainer to="/cart">
                <Nav.Link >
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer> */}
              <LinkContainer to="/login">
                <Nav.Link>
                  <div className="d-flex align-items-center text-white">
                    <FaUser className="me-2 " />
                    <div>
                      Dechen Namgyal
                      <div>Admin</div>
                    </div>
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
