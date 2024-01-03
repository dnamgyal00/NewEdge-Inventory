import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button, Breadcrumb } from "react-bootstrap";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { useCreateItemMutation } from "../slices/itemsApiSlice";

const AddItemScreen = () => {
  const { data: { data: categories } = {}, isLoading } =
    useGetCategoriesQuery();
  const [createItem, { isLoading: isItemLoading }] = useCreateItemMutation();

  const [formData, setFormData] = useState({
    name: "",
    category_id: 0,
    unit: "",
    unit_price: 0,
    brand: "",
    description: "",
    // Add more fields as needed
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createItem(formData).unwrap();
      console.log(result);

      // Reset the form fields after successful submission
      setFormData({
        name: "",
        category_id: 0,
        unit: "",
        unit_price: 0,
        brand: "",
        description: "",
        // Add more fields as needed
      });
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "category_id" || name === "unit_price"
          ? parseInt(value, 10)
          : value,
    }));
  };

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Add Item </Breadcrumb.Item>
      </Breadcrumb>
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>
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
                <Form.Select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="py-1"
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
              placeholder="Drag and drop to upload file"
              className="py-1"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="py-1">
            Add
          </Button>{" "}
          <Button variant="danger" type="button" className="text-white py-1">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemScreen;
