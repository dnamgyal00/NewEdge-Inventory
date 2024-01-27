import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Table,
  Dropdown,
  Form,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import testImage from "../assets/laptop.jpg";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import Modals from "../components/Modals";

export default function ItemEditScreen() {
  const itemId = useSelector((state) => state.item.itemId);

  //item Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //api call
  const {
    data: { data: item } = {},
    isLoading,
    isError,
    error,
  } = useGetItemDetailsQuery({ itemId, currentPage });
  console.log(item);

  // Modals
  const [showModal, setShowModal] = useState(false);
  // form validation
  const [validated, setValidated] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true);
  };
  const handleModalAction = (e) => {
    // handle modal action
  };
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <></>
      )}
      <div className="bg-white rounded p-4 ">
        <Form
          id="add-item-form"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3 text-black">
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="py-1"
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={5}>
              {categoryId ? (
                <Form.Group controlId="formGridChooseCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={item.category.name}
                    value={category?.name}
                    className="py-1"
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formGridChooseCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleInputChange}
                    className="py-1"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose a category.
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row className="mb-3 text-black">
            <Form.Group
              as={Col}
              controlId="formGridUnit"
              className=" col-xs-6 col-md-5"
            >
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="py-1"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a unit.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              as={Col}
              controlId="formGridUnitPrice"
              className=" col-xs-6 col-md-5"
            >
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
                className="py-1"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a price.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Col sm={6} md={5}>
              <Form.Group
                className="mb-3 text-black "
                controlId="formGridBrand"
              >
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  className="py-1"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a brand.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group
            className="mb-3 text-black col-md-10"
            controlId="formGridDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="py-1"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a description.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3 text-black col-md-10"
            controlId="formGridFile"
          >
            <Form.Label>Item Image</Form.Label>
            <Form.Control
              type="file"
              name="image" // Make sure the name matches the property in formData
              onChange={handleInputChange}
              className="py-1"
              accept="image/*"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please upload an image.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="py-1"
            disabled={isItemLoading}
            onClick={() => {
              const form = document.getElementById("add-item-form");
              const formFields = form.querySelectorAll(
                "input, select, textarea"
              );

              // Check if the form is valid and all fields are filled
              const isValid =
                form.checkValidity() &&
                Array.from(formFields).every(
                  (field) => field.value.trim() !== ""
                );

              if (isValid) {
                setShowModal(true);
              } else {
                // If not valid, trigger form validation
                setValidated(true);
              }
            }}
          >
            Add
          </Button>{" "}
          <Button
            variant="danger"
            type="button"
            className="text-white py-1"
            disabled={isItemLoading}
          >
            Cancel
          </Button>
          {/* ConfirmModal component */}
          <Modals
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleModelAction}
            title="Add Confirm"
            body="Are you sure you want to perform this action?"
          />
        </Form>
      </div>
    </div>
  );
}
