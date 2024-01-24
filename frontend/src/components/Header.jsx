import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUser, FaBars } from "react-icons/fa";
import { MdOutlineWarehouse } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";

const Header = () => {
  // const [sidebarVisible, setSidebarVisible] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarVisible(!sidebarVisible);
  // };
  return (
    <header>
      <Navbar className="navbar navbar-expand bg-dark navbar-dark sticky-top px-md-2 py-0">
        <Container
          fluid
          className="d-flex justify-content-between align-items-center"
        >
          {" "}
          <div className="d-flex align-items-center me-4">
            <FaBars className="text-white" />
          </div>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <MdOutlineWarehouse className="me-2 mb-1" size={30} />
              <div className="d-none d-md-block">Inventory</div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/profile">
                <Nav.Link>
                  <div className="d-none d-md-flex align-items-center text-white">
                    <FaUser className="me-2 " size={21} />
                    <div>
                      Dechen Namgyal
                      <div>Admin</div>
                    </div>
                  </div>
                  <Dropdown className="d-flex d-md-none custom-dropdown">
                    <Dropdown.Toggle variant="link text-white">
                      <FaUser className="me-1 " size={21} />
                    </Dropdown.Toggle>

                    <div>
                      <Dropdown.Menu>
                        <Dropdown.Item>Dechen Namgyal</Dropdown.Item>
                        <Dropdown.Item>Admin</Dropdown.Item>
                        <Dropdown.Item>Log Out</Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </Dropdown>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {sidebarVisible && <Sidebar />}
    </header>
  );
};

export default Header;
