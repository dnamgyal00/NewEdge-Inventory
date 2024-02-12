import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./assets/styles/index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <div className={`app-container bg-light `}>
        <Header onToggleSidebar={toggleSidebar} />

        <Container fluid>
          <Row className="wh-100">
            {/* Sidebar */}
            <Col
              xs={4}
              sm={3}
              md={2}
              className={` px-0 ${
                sidebarVisible ? "navCollapse" : "d-none d-md-block"
              }`}
            >
              <Sidebar />
            </Col>

            {/* Main Content */}
            <Col
              sm={9}
              md={10}
              className={`main-content-container d-flex flex-column justify-content-between `}
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
    </>
  );
};

export default App;
