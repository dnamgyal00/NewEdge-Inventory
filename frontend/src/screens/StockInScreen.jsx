import { useEffect, useState } from "react";
import { useCreateStockInMutation } from "../slices/transactionsApiSlice";

import Form from "react-bootstrap/Form";
import { Row, Col, Button } from "react-bootstrap";
import { useGetItemsQuery } from "../slices/itemsApiSlice";

const StockInScreen = () => {

  //api calls
  const {
    data: { data: items } = {},
    isLoading: isItemsLoading,
    isError: isItemsEror,
  } = useGetItemsQuery({});

  const [createStockIn, { isLoading: isStockInLoading, isError }] = useCreateStockInMutation();

  // stock in data
  const [itemData, setItemData] = useState({
    item_id: 0,
    qty: 0,
    total_price:0,
  });
  console.log(itemData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]:
        name === "item_id"
          ? parseInt(value, 10) || 0
          : parseInt(value, 10) || 0,
    }));
  };

  // console.log(itemData);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (items && items.length > 0) {
      const item = items.find((item) => item.id === itemData.item_id);
      setSelectedItem(item);
    }
  }, [itemData.item_id]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (selectedItem) {
      const total = selectedItem.unit_price * itemData.qty;
      setTotalPrice(total);
      setItemData((prevData) => ({
        ...prevData,
        total_price:total,
      }));
    }
  }, [itemData.qty]);

 
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createStockIn(itemData).unwrap();
      console.log(result);
      setItemData({
        item_id: 0,
        qty: 0,
        total_price:0,
      });
    } catch (error) {
      console.error("Error creating submitting stock in data:", error);
    }
  };

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <h5 className="mb-0 text-black">Stock In </h5>
      <p className="mb-3">Manage stock in </p>
      <div className="bg-white rounded p-4 ">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-2 text-black">
            <Col sm={6} md={5}>
              <Form.Group controlId="formGridItemName">
                <Form.Label>Item Name</Form.Label>
                <Form.Select
                  name="item_id"
                  value={itemData.item_id}
                  onChange={handleChange}
                  className="py-1"
                >
                  <option value="" disabled>
                    Select a Item
                  </option>
                  {items &&
                    items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col sm={6} md={5}>
              <Form.Group controlId="formGridChooseCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={selectedItem ? selectedItem.category.name : ""}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 text-black ">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridBrand">
                <Form.Label>Brand</Form.Label>
                {/* <Form.Select className="py-1">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select> */}
                <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={selectedItem ? selectedItem.brand : ""}
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" className="py-1" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 text-black">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>Unit</Form.Label>
                <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={selectedItem ? selectedItem.unit : ""}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={selectedItem ? selectedItem.unit_price : ""}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 text-black ">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  className="py-1"
                  name="qty"
                  value={itemData.qty}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control className="py-1" readOnly value={totalPrice} 
                // onChange={handleChange} 
                name="total_price" />
              </Form.Group>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="py-1"
            disabled={isStockInLoading}
          >
            {isStockInLoading ? "Submitting..." : "Confirm"}
          </Button>{" "}
          <Button variant="danger" type="button" className="text-white py-1">
            Cancel
          </Button>
          {/* {isError && <div className="text-danger mt-2">{error.message}</div>} */}
        </Form>
      </div>
    </div>
  );
};

export default StockInScreen;
