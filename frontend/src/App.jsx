import React from "react";
import { Container, Row, Col } from "react-bootstrap"; // Add Col for grid layout
// import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import "./assets/styles/index.css"; // Create an App.css file for custom styles

const App = () => {
  return (
    <div className="app-container">
      <Header />

      <Container fluid>
        <Row style={{ background: "gainsboro" }}>
          {/* Sidebar */}
          <Col md={2} className="bg-white p-1">
            <Sidebar />
          </Col>

          {/* Main Content */}
          <Col md={9} className="main-content">
            <main className="py-3">
              <Outlet />
            </main>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
