import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import { useUpdateItemMutation, useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modals from "../components/Modals.jsx";
import { useSelector } from "react-redux";

export default function ItemEditScreen() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("id");
  //const categoryId = useSelector((state) => state.category.categoryId);
  const itemId = useSelector((state) => state.item.itemId);

  const navigate = useNavigate();

  //api calls
  const [updateItem, { isLoading: updateLoding }] = useUpdateItemMutation();

  const {
    data: { data: item } = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetItemDetailsQuery({ itemId, currentPage: 1, currentPage2: 1 });

  // const {
  //   data: { data: category } = {},
  //   isError2,
  //   error2,
  // } = useGetCategoryDetailsQuery({ categoryId, currentPage:1 });
  // console.log(category)


  const [formData, setFormData] = useState({
    name: item.name,
    unit: item.unit,
    unit_price: item.unit_price,
    brand: item.brand,
    description: item.description,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "unit_price"
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.stopPropagation();
  //   }
  //   setValidated(true);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
  };

  const handleModelAction = async () => {

    const loadingToastId = toast.info("Submitting...");

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("unit", formData.unit);
      formDataObj.append("unit_price", formData.unit_price);
      formDataObj.append("brand", formData.brand);
      formDataObj.append("description", formData.description);
      formDataObj.append("image", formData.image);

      const result = await updateItem({ itemId, formDataObj }).unwrap();
      toast.dismiss(loadingToastId);
      toast.success("Item updated successfully");
      console.log(result);
      refetch();
      navigate(`/home/item/${formData.name}`);
    } catch (err) {
      if (err.data) {
        console.error("Error updating item:", err.data);
        toast.dismiss(loadingToastId);
        toast.error(err.data.msg);
      } else {
        console.error("Error updating item:", err);
      }
    }
    // Close the modal after handling the action
    setShowModal(false);

    // const form = document.getElementById("update-item-form"); // replace "your-form-id" with the actual ID of your form
    // if (form && validated) {
    //   try {
    //     const formDataObj = new FormData(form);
    //     const result = await createItem(formDataObj).unwrap();
    //     console.log(result);
    //     toast.success("item added successfully");
    //     // navigate("/item-list");

    //   } catch (error) {
    //     console.error("Error creating item:", error);
    //   }
    // }
  };

  const handleCancel = () => {
    navigate(`/home/item/${formData.name}`);
  }

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
          id="update-item-form"
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
                  //defaultValue={item.name}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="py-1"
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={item.category.name}
                  className="py-1"
                  required
                />
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
              const form = document.getElementById("update-item-form");
              const formFields = form.querySelectorAll(
                "select, textarea"
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
            {updateLoding ? "Updating..." : "Update"}
          </Button>{" "}
          <Button
            variant="danger"
            type="button"
            className="text-white py-1"
            disabled={updateLoding}
            onClick={handleCancel}

          >
            Cancel
          </Button>
          {/* ConfirmModal component */}
          <Modals
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleModelAction}
            title="Confirm Edit"
            body="Are you sure you want to save the changes?"
          />
        </Form>
      </div>
    </div>
  );
}
