import { useEffect, useState } from "react";
import { useCreateStockOutMutation } from "../slices/transactionsApiSlice";

import Form from "react-bootstrap/Form";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import testImage from "../assets/laptop.jpg";
import { useParams, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modals from "../components/Modals";

export default function ItemStockOutScreen() {
  const { name, id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("id");
  //api calls
  const {
    data: { data: item } = {},
    isLoading,
    error,
  } = useGetItemDetailsQuery({ itemId, currentPage: 1 });

  console.log(item);

  const [createStockOut, { isLoading: isStockOutLoading, isError }] =
    useCreateStockOutMutation();

  // stock in data
  const [itemData, setItemData] = useState({
    item_id: 0,
    qty: 0,
    total_price: 0,
    type: "",
    status_details: "",
    created_at: "",
  });
  console.log(itemData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "item_id" || name == "qty") {
      setItemData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10) || 0,
      }));
    } else {
      setItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    if (item && item.length > 0) {
      const item = item.find((item) => item.id === itemData.item_id);
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
        total_price: total,
      }));
    }
  }, [itemData.qty]);

  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    // Open the confirmation modal
    setShowModal(true);
  };

  const handleModalAction = async () => {
    // Close the modal
    setShowModal(false);
    try {
      const result = await createStockOut(itemData).unwrap();
      console.log(result);
      setItemData({
        item_id: 0,
        qty: 0,
        total_price: 0,
        created_at: "",
        type: "",
        status_details: "",
      });
    } catch (error) {
      console.error("Error creating submitting stock in data:", error);
    }
    // Reset the validated state
    setValidated(false);
  };
  // Close the modal if canceled
  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div className="col-sm-12 col-xl-6 w-100">
          <h5 className="mb-0 text-black">Stock Out </h5>
          <p className="mb-3">Manage stock out </p>
          <div className="bg-white rounded p-4 d-flex">
            {/* <Form onSubmit={handleSubmit}> */}
            {/* <Row className="mb-2 text-black">
            
           
              {/* //DATE */}
            {/* <Form.Group controlId="formGridDate">
                
              </Form.Group> */}
            {/* </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridBrand">
                <Form.Label>Brand</Form.Label> */}
            {/* <Form.Select className="py-1">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select> */}
            {/* <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={selectedItem ? selectedItem.brand : ""}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-2 text-black">
            <Col xs={6} md={5}>
              
            </Col>

            
          </Row>
          <Row className="mb-3 text-black ">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>
                  <i>Enter Quantity:</i>
                </Form.Label>
                <Form.Control
                  required
                  type="number"
                  className="py-1"
                  name="qty"
                  value={itemData.qty}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnit">
                <Form.Label>Quantity Available</Form.Label>
                <Form.Control
                  type="number"
                  className="py-1"
                  name="qty"
                  value={selectedItem ? selectedItem.qty_on_hand : 0}
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 text-black">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Total Price</Form.Label>
                <Form.Control
                  className="py-1"
                  readOnly
                  value={`Nu.${totalPrice}`}
                  // onChange={handleChange}
                  name="total_price"
                />
              </Form.Group>
            </Col>
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>Unit Price</Form.Label>
                <Form.Control
                  className="py-1"
                  readOnly
                  defaultValue={
                    selectedItem ? `Nu.${selectedItem.unit_price}` : ""
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3 text-black">
            <Col xs={6} md={5}>
              <Form.Group controlId="formGridUnitPrice">
                <Form.Label>
                  <i>Enter Description:</i>
                </Form.Label>
                <Form.Control
                  required
                  className="py-1" */}
            {/* defaultValue={selectedItem ? itemData.status_details : ""}
                  onChange={handleChange}
                  name="status_details"
                />
              </Form.Group>
            </Col>
          </Row>  */}
            <div className="col-sm-5">
              <Image src={testImage} alt="" fluid />
            </div>
            <div className="col-sm-7">
              <Form
                id="stock-out-form"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="px-2"
              >
                <Form.Group as={Row} controlId="formGridItemName">
                  <Form.Label column sm="4" size="sm">
                    <i>Item : </i>
                  </Form.Label>
                  <Col sm={6}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.name}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridChooseCategory">
                  <Form.Label column sm="4">
                    Qty available:
                  </Form.Label>

                  <Col sm={6}>
                    {" "}
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.qty_on_hand}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridChooseCategory">
                  <Form.Label column sm="4">
                    Category :
                  </Form.Label>

                  <Col sm={6}>
                    {" "}
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.category.name}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridBrand">
                  <Form.Label column sm="4">
                    Brand :
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.brand}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridUnit">
                  <Form.Label column sm="4">
                    Unit :
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.unit}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formGridUnitPrice">
                  <Form.Label column sm="4">
                    Unit Price :
                  </Form.Label>

                  <Col sm={6}>
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={item.unit_price}
                      className="text-black"
                    />
                  </Col>
                </Form.Group>
                <Row className="py-3">
                  <Col sm={4}>
                    <Form.Group controlId="formGridUnit">
                      <Form.Label>
                        <i>Enter Quantity :</i>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        className="py-1"
                        name="qty"
                        value={itemData.qty}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group controlId="formGridUnitPrice">
                      <Form.Label>Total Price</Form.Label>
                      <Form.Control
                        className="py-1"
                        value={`Nu.${totalPrice}`}
                        // onChange={handleChange}
                        name="total_price"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    {/* //DATE */}
                    <Form.Group controlId="formGridDate">
                      <Form.Label>
                        <i>Select Date</i>
                      </Form.Label>
                      <Form.Control
                        type="date"
                        className="py-1"
                        name="created_at"
                        //value={new Date(itemData.created_at)}
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="pb-3">
                  <Col sm={4}>
                    <Form.Group controlId="formGridBrand">
                      <Form.Label>
                        <i>Stock out type:</i>
                      </Form.Label>
                      <Form.Select
                        className="py-1"
                        name="type"
                        onChange={handleChange}
                        required
                        value={selectedItem ? itemData.type : ""}
                      >
                        <option disabled value="">
                          Choose...
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Issues">Issues</option>
                        <option value="Damaged">Damaged</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={8}>
                    {/* //DATE */}
                    <Form.Group controlId="formGridDate">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="py-1"
                        name="created_at"
                        //value={new Date(itemData.created_at)}
                        required
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="py-1"
                  disabled={isStockOutLoading}
                  onClick={() => {
                    if (validated) {
                      showModal(true);
                    }
                  }}
                >
                  {isStockOutLoading ? "Submitting..." : "Confirm"}
                </Button>{" "}
                <Button
                  variant="danger"
                  type="button"
                  className="text-white py-1"
                >
                  Cancel
                </Button>
                {/* {isError && <div className="text-danger mt-2">{error.message}</div>} */}
                <Modals
                  show={showModal}
                  onHide={handleModalCancel}
                  onConfirm={handleModalAction}
                  title="Confirm Action"
                  body="Are you sure you want to perform this action?"
                />
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
