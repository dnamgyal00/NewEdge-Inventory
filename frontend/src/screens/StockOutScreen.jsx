import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";

function StockOutScreen() {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Stock Out</h5>
      <p className="mb-3">Manage stock out </p>
      <div className="bg-white rounded p-4 ">
        <Form>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridChooseCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridDate">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Row>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridUnit">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridUnitPrice">
              <Form.Label>Total Price</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
          <Row className="mb-3 text-black">
            <Col sm={6}>
              <Form.Group controlId="formGridBrand">
                <Form.Label>Stock out type</Form.Label>
                <Form.Select>
                  <option disabled selected>
                    Choose...
                  </option>
                  <option>Sales</option>
                  <option>Issues</option>
                  <option>Damaged</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Confirm
          </Button>{" "}
          <Button variant="danger" type="submit" className="text-white">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default StockOutScreen;
