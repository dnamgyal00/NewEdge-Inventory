import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import { useCreateItemMutation } from "../slices/itemsApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";
import Modals from "../components/Modals";
import { useDispatch, useSelector } from "react-redux";

function CategoryAddItemScreen() {

  const categoryId = useSelector((state) => state.category.categoryId);
  const [createItem, { isLoading: isItemLoading, isError, error }] =
    useCreateItemMutation();

  const { data: { data: category } = {}, refetch, isLoading } =
    useGetCategoryDetailsQuery({ categoryId, currentPage: 1 });

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    category_id: categoryId ? categoryId : "",
    unit: "",
    unit_price: "",
    brand: "",
    description: "",
    image: null,
  });

  // console.log(imageData)
  const [validated, setValidated] = useState(false);
  // Modal
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }
  };

  const handleModalAction = async () => {
    const loadingToastId = toast.info("Adding Item...");
    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("category_id", formData.category_id);
      formDataObj.append("unit", formData.unit);
      formDataObj.append("unit_price", formData.unit_price);
      formDataObj.append("brand", formData.brand);
      formDataObj.append("description", formData.description);
      formDataObj.append("image", formData.image);
      const result = await createItem(formDataObj).unwrap();
      refetch();
      toast.dismiss(loadingToastId);
      toast.success("item added successfully");
      navigate(`/home/category/${category.name}`);
      console.log(result);
      if (!result.status) {
      } else {
        setFormData({
          name: "",
          category_id: categoryId ? categoryId : "",
          unit: "",
          unit_price: "",
          brand: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
      // Close loading toast
      toast.dismiss(loadingToastId);
      // Show error toast
      toast.error("Error creating item:", error);
      console.error("Error creating item:", error);
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setImageData(file);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "category_id" || name === "unit_price"
          ? Math.max(0, parseInt(value, 10))
          : name === "image"
            ? files[0] // Set the selected file for the image
            : value,
    }));
  };
  console.log(formData);

  const handleCancel = () => {
    navigate(`/home/category/${category.name}`);
  }

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>

      {isItemLoading ? (
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
          id="category-add-item-form"
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3 text-black">
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="py-1"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={category.name}
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
                Please provide a unit price.
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
              name="image"
              onChange={handleInputChange}
              className="py-1"
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
              const form = document.getElementById("category-add-item-form");
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
            onClick={handleCancel}
          >
            Cancel
          </Button>
          {/* Modal */}
          <Modals
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleModalAction}
            title="Confirm Add Item"
            body="Are you sure you want to add this Item?"
          />
        </Form>
      </div>
    </div>
  );
}

export default CategoryAddItemScreen;
