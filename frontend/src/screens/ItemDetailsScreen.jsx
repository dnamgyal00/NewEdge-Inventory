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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Item List</Breadcrumb.Item>
        <Breadcrumb.Item active>Item Details</Breadcrumb.Item>
      </Breadcrumb>
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
        <Row>
          <Col md={4}>
            <Image src={testImage} alt="Test" fluid />
          </Col>
          <Col md={8}>
            <Card className="p-3">
              <Table responsive="sm">
                <tr>
                  <t>Name: {item.name}</t>
                  <td>Created Date: dd/mm/yyyy</td>
                </tr>
                <tr>
                  <td>Price: 10$</td>
                  <td>
                    Description: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam.
                  </td>
                </tr>
                <tr>
                  <td>Unit: M</td>
                  <td>Unit price: 10$</td>
                </tr>
                <tr>
                  <td>Quantity: 10</td>
                </tr>
              </Table>
            </Card>
          </Col>
        </Row>
      )}
      <Button className="btn-block" type="button">
        stock in
      </Button>
      <Button className="btn-block" type="button">
        Stock out
      </Button>
    </>
  );
};

export default ItemDetailsScreen;
