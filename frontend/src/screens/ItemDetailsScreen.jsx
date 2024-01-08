import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import testImage from "../assets/laptop.jpg";

const ItemDetailsScreen = () => {
  return (
    <>
      <Row>
        <Col md={6}>
          <Image src={testImage} alt="Test" fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>Name: Laptop</h3>
            </ListGroup.Item>

            <ListGroup.Item>Price: 10$</ListGroup.Item>
            <ListGroup.Item>Description: this is test item</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$9</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>Out Of Stock</Col>
                </Row>
              </ListGroup.Item>

              {/* Qty Select */}

              <ListGroup.Item>
                <Row>
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
    </>
  );
};

export default ItemDetailsScreen;
