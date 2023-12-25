import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
// import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
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
                  <div className="d-flex align-items-center">
                    <FaUser className="me-2" />
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
