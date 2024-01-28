import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { useCreateItemMutation } from "../slices/itemsApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modals from "../components/Modals.jsx";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import { useSelector } from "react-redux";

export default function ItemEditScreen() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("id");
  const navigate = useNavigate();
  const itemId = useSelector((state) => state.item.itemId);

  //api calls
  const { data: { data: categories } = {}, isLoading: isCategoryLoading } =
    useGetCategoriesQuery();
  const [createItem, { isLoading: isItemLoading, isError, error }] =
    useCreateItemMutation();
  const {
    data: { data: item } = {},
    isLoading,
    refetch,
  } = useGetItemDetailsQuery({ itemId, currentPage: 1 });

  console.log(item);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category_id: categoryId ? categoryId : "",
    unit: "",
    unit_price: "",
    brand: "",
    description: "",
    image: null,
  });
  const [imageData, setImageData] = useState(null);
  // stock in data
  const [itemData, setItemData] = useState({
    item_id: itemId,
    qty: 0,
    total_price: 0,
    created_at: "",
  });
  console.log(itemData);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "category_id" || name === "unit_price"
          ? parseInt(value, 10)
          : name === "image"
          ? files[0] // Set the selected file for the image
          : value,
    }));
  };

  console.log(formData);

  // Modal
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

  const handleModelAction = async () => {
    // Implement the logic for the confirmed action here
    console.log("Confirmed action");

    const form = document.getElementById("add-item-form"); // replace "your-form-id" with the actual ID of your form
    if (form && validated) {
      try {
        const formDataObj = new FormData(form);
        const result = await createItem(formDataObj).unwrap();
        console.log(result);
        toast.success("item added successfully");
        // navigate("/item-list");

        setFormData({
          name: "",
          category_id: 0,
          unit: "",
          unit_price: 0,
          brand: "",
          description: "",
          image: null,
        });
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
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
          id="edit-item-form"
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
                  // value={formData.name}
                  onChange={handleInputChange}
                  className="py-1"
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category_id"
                  defaultValue={item.category.name}
                  // value={formData.category_id}
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
                defaultValue={item.unit}
                // value={formData.unit}
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
                defaultValue={item.unit_price}
                // value={formData.unit_price}
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
                  defaultValue={item.brand}
                  // value={formData.brand}
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
              defaultValue={item.description}
              // value={formData.description}
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
            disabled={isLoading}
            onClick={() => {
              const form = document.getElementById("edit-item-form");
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
            Update
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
            title="Confirm Update"
            body="Are you sure you want to perform this action?"
          />
        </Form>
      </div>
    </div>
  );
}
