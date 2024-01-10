import { useParams } from "react-router-dom";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Breadcrumb } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
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
import testImage from "../assets/laptop.jpg";
import { LinkContainer } from "react-router-bootstrap";

const CategoryDetailsScreen = () => {
  const { id: categoryId } = useParams();
  console.log(categoryId);

  const {
    data: { data: category } = {},
    isLoading,
    isError,
    error,
  } = useGetCategoryDetailsQuery(categoryId);
  console.log(category);
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
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item >Product</Breadcrumb.Item>
            <Breadcrumb.Item href="/category">Category List</Breadcrumb.Item>
            <Breadcrumb.Item active >Category Details</Breadcrumb.Item>

          </Breadcrumb>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="text-black mb-0"> Category Details</h5>
            </div>

          </div>
          <div className="container-fluid  px-1">
            <div className="bg-white rounded p-4">
              <Row>
                <Col >
                  <Image src={testImage} alt="Test" fluid />
                </Col>

                <Col xs={6}>
                  <ListGroup variant="flush" >
                    <ListGroup.Item>
                      <h3>{category.name}</h3>

                      <Row>
                        <Col md={3}>Description:</Col>
                        <Col md={9}>{category.description}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>Total Item:</Col>
                        <Col md={5}>{category.item_count}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>


                      <Row>
                        <Col md={3}>Created at:</Col>
                        <Col md={5}>{category.created_at}</Col>
                      </Row>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

              </Row>
            </div>
          </div>

          <div className="container-fluid pt-3 px-1">
            <div className="bg-white text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Category Items</h6>
                <div className="d-flex justify-content-between align-items-center">

                  <LinkContainer to="/admin/add-item">
                    <Button variant="primary" size="sm" className="px-4 py-1">
                      {" "}
                      <FaPlus className="me-2 mb-1" />
                      Add Item
                    </Button>
                  </LinkContainer>
                </div>

              </div>
              <div className="table-responsive">
                <Table responsive="sm" className="position-relative">
                  <thead className="bg-light">
                    <tr>
                      <th className="text-black border-0">Item Name</th>
                      <th className="text-black border-0">Brand Name</th>
                      <th className="text-black border-0">Price</th>
                      <th className="text-black border-0">Unit</th>
                      <th className="text-black border-0">Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.item && category.item.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.brand}</td>
                        <td>{item.unit_price}</td>
                        <td>{item.unit}</td>
                        <td>{item.qty_on_hand}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDetailsScreen;
