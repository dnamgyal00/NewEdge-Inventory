import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Table,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import testImage from "../assets/laptop.jpg";
import { useParams } from "react-router-dom";
import { useGetItemDetailsQuery } from "../slices/itemsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";

const ItemDetailsScreen = () => {
  const { id: itemId } = useParams();
  const {
    data: { data: item } = {},
    isLoading,
    isError,
    error,
  } = useGetItemDetailsQuery(itemId);
  console.log(item);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div>
          <Breadcrumb>
            <Breadcrumb.Item href="/" >Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/item-list">Product</Breadcrumb.Item>
            <Breadcrumb.Item href="/item-list">Item List</Breadcrumb.Item>
            <Breadcrumb.Item active>Item Details</Breadcrumb.Item>
          </Breadcrumb>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="text-black mb-0"> Item Details</h5>
            </div>
            {/* <LinkContainer to="/admin/add-item">
              <Button variant="primary" size="sm" className="px-4 py-1">
                {" "}
                <FaPlus className="me-2 mb-1" />
                Add Item
              </Button>
            </LinkContainer> */}
          </div>


          <div className="container-fluid pt-3 px-1">
            <div className="bg-white rounded p-4">
              <Row>
                <Col >
                  <Image src={testImage} alt="Test" fluid />
                </Col>
                <Col xs={6}>
                  <ListGroup variant="flush" >
                    <ListGroup.Item>
                      <h3>{item.name}</h3>

                      <Row>
                        <Col md={3}>Description:</Col>
                        <Col md={5}>{item.description}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Category:</Col>
                        <Col md={5}>{item.category.name}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Brand:</Col>
                        <Col md={5}>{item.brand}</Col>
                      </Row></ListGroup.Item>
                    <ListGroup.Item><Row>
                      <Col md={3}>Price: </Col>
                      <Col md={5}>Nu.{item.unit_price}</Col>
                    </Row></ListGroup.Item>
                    <ListGroup.Item>

                      <Row>
                        <Col md={3}>Created at:</Col>
                        <Col md={5}>{item.created_at}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col >
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col md={10}><b>Quantity in stock:</b></Col>
                          <Col md={2} className={item.qty_on_hand === 0 ? 'text-danger' : 'text-success'}><b>{item.qty_on_hand}</b></Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Total Price:</Col>
                          <Col>
                            <strong>$9</strong>
                          </Col>
                        </Row>
                        <Row mt={10}>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                            // value={qty}
                            // onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {/* {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))} */}
                              <option>5</option>
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {/* Qty Select */}

                      {/* {product.countInStock > 0 && (
                  
                )} */}

                      <ListGroup.Item>
                        <Button className="btn-block" type="button">
                          stock in
                        </Button>
                        <Button className="btn-block" type="button">
                          Stock out
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>

            </div>
          </div>


          <div className="container-fluid pt-3 px-1">
            <div className="bg-white text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Item Instances</h6>
              </div>
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
            </div>
          </div>
        </div >
      )}
    </>
  );
};

export default ItemDetailsScreen;
