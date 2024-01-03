import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
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
      <h5 className="mb-0 text-black">Item Add</h5>
      <p className="mb-3">Add new item</p>
      <div className="bg-white rounded p-4 ">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridItemName">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridChooseCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
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
          </Row>
          <Row className="mb-3 text-black">
            <Form.Group as={Col} controlId="formGridUnit">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridUnitPrice">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                name="unit_price"
                value={formData.unit_price}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group className="mb-3 text-black" controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group
            className="mb-3 text-black"
            controlId="formGridDescription"
          >
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
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
          <Button variant="danger" type="button" className="text-white">
            Cancel
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddItemScreen;
