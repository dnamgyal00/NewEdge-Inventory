import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Table,
  Dropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import testImage from "../assets/laptop.jpg";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Pagination } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { format } from "date-fns";
import { BsThreeDotsVertical } from "react-icons/bs";
import Modals from "../components/Modals";
import { IoWarningOutline } from "react-icons/io5";

const ItemDetailsScreen = () => {
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
  const handleModalAction = (e) => {
    // handle modal action
  };

  return (
    <>
      <div className="mb-3">
        <h5 className="text-black mb-0"> Item Details</h5>
        Full details of a item
      </div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div>
          <Row>
            <Col md={4}>
              {item.image ? (
                <Image
                  src={item.image} // Assuming item.image contains the URL
                  alt={`Image for ${item.name}`}
                  fluid
                />
              ) : (
                <Image
                  src={testImage} // Replace testImage with your default image URL
                  alt="Test"
                  fluid
                />
              )}
            </Col>
            <Col md={8}>
              <Card className="p-3 border-0 shadow-none ">
                <Dropdown className="position-absolute top-0 end-0 p-2 me-2 mb-2">
                  <Dropdown.Toggle
                    variant="transparent"
                    className="p-0 shadow-none"
                  >
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="shadow-none">
                    <LinkContainer
                      to={{ pathname: `/home/item/${item.name}/edit` }}
                    >
                      <Dropdown.Item>
                        <a className="text-decoration-none text-dark">Edit</a>
                      </Dropdown.Item>
                    </LinkContainer>

                    <Dropdown.Item onClick={() => setShowModal(true)}>
                      Delete
                    </Dropdown.Item>
                    {/* ConfirmModal component */}
                    <Modals
                      show={showModal}
                      onHide={() => setShowModal(false)}
                      onConfirm={handleModalAction}
                      title={
                        <>
                          Confirm Delete <IoWarningOutline className="mb-1" />
                        </>
                      }
                      body="Are you sure you want to delete this item?"
                    />
                  </Dropdown.Menu>
                </Dropdown>
                <ListGroup variant="flush" className="p-2 mt-2">
                  <ListGroup.Item className="lh-1">
                    <h3>{item.name}</h3>
                    <Row>
                      <Col md={3}>Description:</Col>
                      <Col md={5}>{item.description}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="lh-1">
                    <Row>
                      <Col md={3}>Category:</Col>
                      <Col md={5}>{item.category.name}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="lh-1">
                    <Row>
                      <Col md={3}>Brand:</Col>
                      <Col md={5}>{item.brand}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="lh-1">
                    <Row>
                      <Col md={3}>Price: </Col>
                      <Col md={5}>Nu.{item.unit_price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item className="lh-1">
                    <Row>
                      <Col md={3}>Created at:</Col>
                      <Col md={5}>{item.created_at}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={3}>Quantity in Stock:</Col>
                      <Col md={5}>{item.qty_on_hand}</Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <div className="d-flex flex-column flex-md-row justify-content-end py-3 ">
            <LinkContainer
              to={{ pathname: `/home/item/${item.name}/stock-in` }}
            >
              <Button
                className="btn-block me-md-2 mb-2 mb-md-0 px-4 py-2 "
                type="button"
              >
                Stock In
              </Button>
            </LinkContainer>
            <LinkContainer
              to={{
                pathname: `/home/item/${item.name}/stock-out`,
              }}
            >
              <Button
                className="btn-block me-md-2 mb-2 mb-md-0 px-4 py-2"
                type="button"
              >
                Stock Out
              </Button>
            </LinkContainer>
          </div>

          <div className="container-fluid pt-3 px-1">
            <div className="bg-white text-center rounded p-4">
              <Tabs
                defaultActiveKey="itemInstance"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="itemInstance" title="Item Instance">
                  <div className="table-responsive">
                    <Table responsive="sm" className="position-relative">
                      <thead className="bg-light">
                        <tr>
                          <th className="text-black border-0">Instance Id</th>
                          <th className="text-black border-0">Status</th>
                          <th className="text-black border-0">Details</th>
                          <th className="text-black border-0">StockIn Id</th>
                          <th className="text-black border-0">StockOut ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.item_instance &&
                          item.item_instance.map((ins) => (
                            <tr key={ins.id}>
                              <td>{ins.id}</td>
                              <td>{ins.status}</td>
                              <td>{ins.status_details}</td>
                              <td>{ins.stock_in_id}</td>
                              <td>{ins.stock_in_id}</td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  {item.item_instance && item.item_instance.length > 0 && (
                    <nav aria-label="Page navigation example mb-5">
                      <ul className="pagination justify-content-center">
                        <Pagination>
                          <Pagination.Prev
                            onClick={handlePrevPage}
                            disabled={currentPage == 1}
                          />
                          <Pagination.Next
                            onClick={handleNextPage}
                            disabled={item.item_instance.length < 10}
                          />
                        </Pagination>
                      </ul>
                    </nav>
                  )}
                </Tab>

                <Tab eventKey="transactions" title="Transactions">
                  <div className="table-responsive">
                    <Table responsive="sm" className="position-relative">
                      <thead className="bg-light">
                        <tr>
                          <th className="text-black border-0">Stock In/Out</th>
                          <th className="text-black border-0">Details</th>
                          <th className="text-black border-0">Qty</th>
                          <th className="text-black border-0">Total Price</th>
                          <th className="text-black border-0">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.transactions &&
                          item.transactions.map((transaction) => (
                            <tr>
                              <td>{transaction.transaction_type}</td>
                              <td>{transaction.type}</td>
                              <td>{transaction.qty}</td>
                              <td>{transaction.total_price}</td>
                              <td>
                                {format(transaction.created_at, "yyyy-MM-dd")}
                                {/* {transaction.created_at} */}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  {item.item_instance && item.item_instance.length > 0 && (
                    <nav aria-label="Page navigation example mb-5">
                      <ul className="pagination justify-content-center">
                        <Pagination>
                          <Pagination.Prev
                            onClick={handlePrevPage}
                            disabled={currentPage == 1}
                          />
                          <Pagination.Next
                            onClick={handleNextPage}
                            disabled={item.transactions.length < 10}
                          />
                        </Pagination>
                      </ul>
                    </nav>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetailsScreen;
