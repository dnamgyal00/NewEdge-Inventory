import { Navbar, Nav, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { MdOutlineWarehouse } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
// import logo from '../assets/logo.png'

const Header = () => {
  return (
    <header>
      <Navbar className="navbar navbar-expand bg-dark navbar-dark sticky-top px-4 py-0">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center "
        >
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <MdOutlineWarehouse className="me-2 mb-1" size={30} />
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
                    <FaUser className="me-2 " size={21} />
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
