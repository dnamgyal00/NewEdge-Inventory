import React, { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  // const [toggle, setToggle] = useState(false);
  // const Toggle = () => {
  //   setToggle(!toggle);
  // };
  return (
    <div className="app-container bg-light">
      <Header />

      <Container fluid>
        <Row className="wh-100">
          {/* Sidebar */}
          <Col
            md={2}
            className="d-flex bg-white p-md-1 justify-content-right"
            //   toggle
            //     ? "d-none bg-white p-md-1 d-md-flex w-auto"
            //     : "d-flex bg-white p-md-1 justify-content-right w-auto"
            // }
          >
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col
            md={10}
            className={`main-content-container d-flex flex-column justify-content-between`}
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
