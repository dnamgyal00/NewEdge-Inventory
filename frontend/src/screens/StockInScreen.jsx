import React from "react";
import Form from "react-bootstrap/Form";
import { Breadcrumb } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";

const StockInScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Transaction</Breadcrumb.Item>
        <Breadcrumb.Item active>Stock In </Breadcrumb.Item>
      </Breadcrumb>
      <h5 className="mb-0 text-black">Stock In </h5>
      <p className="mb-3">Manage stock in </p>
      <div className="bg-white rounded p-4 ">
        <Form>
          <Row className="mb-2 text-black">
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control className="py-1" />
              </Form.Group>
            </Col>

            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select className="py-1">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 text-black ">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Select className="py-1">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" className="py-1" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 text-black">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>Unit</Form.Label>
                <Form.Control className="py-1" />
              </Form.Group>
            </Col>

            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control className="py-1" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 text-black ">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>Quantity</Form.Label>
                <Form.Control type="number" className="py-1" />
              </Form.Group>
            </Col>

            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control className="py-1" />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit" className="py-1">
            Confirm
          </Button>{" "}
          <Button variant="danger" type="submit" className="text-white py-1">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default StockInScreen;
