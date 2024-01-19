import React, { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap"; // Add Col for grid layout
// import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  const [toggle, setToggle] = useState(true);
  function Toggle() {
    setToggle(!toggle);
  }
  return (
    <div className="app-container bg-light">
      <Header toggle={toggle} Toggle={Toggle} />

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col
            md={2}
            className={
              toggle
                ? "d-none bg-white p-md-1 d-md-flex w-auto"
                : "d-flex bg-white p-md-1 justify-content-right w-auto"
            }
          >
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col
            md={10}
            className={`main-content-container d-flex flex-column justify-content-between ${
              toggle ? "ml-0" : "ml-md-2 "
            }`}
          >
            <div>
              <main className="pt-2 pb-4 px-0 px-md-3 main-content">
                <Breadcrumbs />
                <Outlet />
              </main>
            </div>
            <div className="mb-5 py-3">
              <Footer />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
