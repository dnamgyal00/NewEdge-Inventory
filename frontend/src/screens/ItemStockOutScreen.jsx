import { useEffect, useState } from "react";
import { useCreateStockOutMutation } from "../slices/transactionsApiSlice";

import Form from "react-bootstrap/Form";
import { Row, Col, Button, Image } from "react-bootstrap";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import testImage from "../assets/laptop.jpg";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Modals from "../components/Modals";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ItemStockOutScreen() {
  const itemId = useSelector((state) => state.item.itemId);
  const navigate = useNavigate();
  //api calls

  const {
    data: { data: item } = {},
    isLoading,
    refetch,
    error,
  } = useGetItemDetailsQuery({ itemId, currentPage: 1 });

  console.log(item);

  const [createStockOut, { isLoading: isStockOutLoading, isError }] =
    useCreateStockOutMutation();

  // stock in data
  const [itemData, setItemData] = useState({
    item_id: itemId,
    qty: 0,
    total_price: 0,
    type: "",
    status_details: "",
    created_at: "",
  });
  console.log(itemData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "qty") {
      setItemData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10) || 0,
      }));
    } else if (name == "created_at" && value) {
      setItemData((prevData) => ({
        ...prevData,
        created_at: value,
      }));
    } else {
      setItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (item) {
      const total = item.unit_price * itemData.qty;
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
    const loadingToastId = toast.info("Submitting...");

    try {
      const result = await createStockOut(itemData).unwrap();
      refetch();
      console.log(result);
      toast.dismiss(loadingToastId);
      // Show success toast
      toast.success("Item added successfully");
      navigate(`/home/item/${item.name}`);
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
            <div className="col-sm-5">
              <Image src={testImage} alt="" fluid />
            </div>
            <div className="col-sm-7">
              <Form
                id="-item-stock-out-form"
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
                <Form.Group as={Row} controlId="formGridQuantityAvailable">
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
                        onChange={(e) => {
                          const enteredValue = parseInt(e.target.value, 10);
                          const newQuantity = Math.max(
                            1,
                            Math.min(enteredValue, item.qty_on_hand)
                          );

                          // Update state with the new quantity
                          handleChange({
                            target: { name: "qty", value: newQuantity },
                          });
                        }}
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
                      <Form.Control.Feedback type="invalid">
                        Please select a date.
                      </Form.Control.Feedback>
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
                        value={item ? itemData.type : ""}
                      >
                        <option disabled value="">
                          Choose...
                        </option>
                        <option value="Sales">Sales</option>
                        <option value="Issues">Issues</option>
                        <option value="Damaged">Damaged</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a type.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm={8}>
                    {/* //DATE */}
                    <Form.Group controlId="formGridDate">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        className="py-1"
                        name="status_details"
                        defaultValue={item ? item.status_details : ""}
                        required
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a description.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="primary"
                  type="submit"
                  className="py-1"
                  disabled={isStockOutLoading}
                  onClick={() => {
                    const form = document.getElementById("item-stock-out-form");
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
