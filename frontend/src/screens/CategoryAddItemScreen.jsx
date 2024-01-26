import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import { useCreateItemMutation } from "../slices/itemsApiSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState } from "react";

function CategoryAddItemScreen() {
  const [createItem, { isLoading: isItemLoading, isError, error }] =
    useCreateItemMutation();

  // const { name } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("id");

  const { data: { data: category } = {}, isLoading } =
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
  const [imageData, setImageData] = useState(null);

  // console.log(imageData)

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      console.log(result);
      if (!result.status) {
      } else {
        toast.success("item added successfully");
        //navigate("/item-list");

        setFormData({
          name: "",
          category_id: "",
          unit: "",
          unit_price: "",
          brand: "",
          description: "",
          image: null,
        });
      }
    } catch (error) {
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
          ? parseInt(value, 10)
          : name === "image"
          ? files[0] // Set the selected file for the image
          : value,
    }));
  };
  console.log(formData);

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
        <Form onSubmit={handleSubmit}>
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
                />
              </Form.Group>
            </Col>
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  readOnly
                  value={category?.name}
                  className="py-1"
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
              />
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
              />
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
                />
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
            />
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
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="py-1"
            disabled={isItemLoading}
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
        </Form>
      </div>
    </div>
  );
}

export default CategoryAddItemScreen;