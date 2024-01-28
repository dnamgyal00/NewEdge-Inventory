import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { FaUser, FaBars } from "react-icons/fa";
import { MdOutlineWarehouse } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { IoMdLogOut } from "react-icons/io";

// import { useState } from "react";
// import Sidebar from "./Sidebar.jsx";

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
          {/* {" "}
          <div className="d-flex align-items-center me-4">
            <FaBars className="text-white" />
          </div> */}
          <LinkContainer to="/home">
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
                  <Dropdown className="d-flex custom-dropdown">
                    <div className=" d-flex text-white">
                      <Dropdown.Toggle variant="border-0 shadow-none text-white d-flex py-0">
                        <FaUser className="me-2 mt-2" size={21} />
                        <div className="d-flex flex-column align-items-start">
                          Dechen Namgyal
                          <div className="">Admin</div>
                        </div>
                      </Dropdown.Toggle>
                    </div>
                    <div>
                      <Dropdown.Menu className="border-0">
                        <Dropdown.Item>Profile</Dropdown.Item>
                        <Dropdown.Item>
                          <IoMdLogOut /> Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </div>
                  </Dropdown>
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
