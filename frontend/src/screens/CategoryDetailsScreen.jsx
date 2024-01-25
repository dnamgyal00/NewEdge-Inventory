import { useLocation, useParams } from "react-router-dom";
import { useGetCategoryDetailsQuery } from "../slices/categoriesApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
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
import { useState } from "react";
import { Pagination } from "react-bootstrap";

const CategoryDetailsScreen = () => {
  const { name, id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get('id');

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
    data: { data: category } = {},
    isLoading,
    isError,
    error,
  } = useGetCategoryDetailsQuery({ categoryId, currentPage });
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
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="text-black mb-0"> Category Details</h5>
            </div>
          </div>
          <div className="container-fluid  px-1">
            <div className="bg-white rounded p-4">
              <Row>
                <Col>
                {category.image ? (
            <Image
              src={category.image} // Assuming category.image contains the URL
              alt={`Image for ${category.name}`}
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

                <Col xs={6}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="lh-1">
                      <h3>{category.name}</h3>

                      <Row>
                        <Col md={3}>Description:</Col>
                        <Col md={9}>{category.description}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="lh-1">
                      <Row>
                        <Col md={3}>Total Item:</Col>
                        <Col md={5}>{category.item_count}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className="lh-1">
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
                  <LinkContainer to={{ pathname: `/home/category/${name}/add-item`, search: `?id=${category.id}` }}>
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
                    {category.item &&
                      category.item.map((item) => (
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

              {/* Pagination */}
        {category.item && category.item.length > 0 && (
          <nav aria-label="Page navigation example mb-5">
            <ul className="pagination justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage == 1} />
                <Pagination.Next onClick={handleNextPage} disabled={category.item.length < 5} />
              </Pagination>
            </ul>
          </nav>
        )}


        
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDetailsScreen;
