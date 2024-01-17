import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Add Col for grid layout
// import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import "./assets/styles/index.css"; // Create an App.css file for custom styles
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "./components/Breadcrumbs";

const App = () => {
  return (
    <div className="app-container bg-light">
      <Header />

      <Container fluid>
        <Row>
          {/* Sidebar */}
          <Col md={2} className="bg-white p-1">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col
            md={10}
            className="main-content-container d-flex flex-column justify-content-between"
          >
            <div>
              <main className="pt-2 pb-4 px-3 main-content">
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
