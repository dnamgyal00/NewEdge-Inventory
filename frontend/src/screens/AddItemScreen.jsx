import React from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";

const AddItemScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>
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
            <Form.Group as={Col} controlId="formGridUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3 text-black" controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group
            className="mb-3 text-black"
            controlId="formGridDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3 text-black" controlId="formGridFile">
            <Form.Label>Item Image</Form.Label>
            <Form.Control
              type="file"
              placeholder="Drag and drop to upload file"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>{" "}
          <Button variant="danger" type="submit" className="text-white">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemScreen;
