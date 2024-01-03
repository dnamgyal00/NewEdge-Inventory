import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { Breadcrumb } from "react-bootstrap";

const AddItemScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Item</Breadcrumb.Item>
      </Breadcrumb>
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>
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
          <Row>
            <Col sm={6} md={5}>
              <Form.Group className="mb-2 text-black" controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control className="py-1" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group
            className="mb-2 text-black col-md-10"
            controlId="formGridDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group
            className="mb-3 text-black col-md-10"
            controlId="formGridFile"
          >
            <Form.Label>Item Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Drag and drop to upload file"
              className="py-1"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="py-1">
            Add
          </Button>{" "}
          <Button variant="danger" type="submit" className="text-white py-1">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemScreen;
