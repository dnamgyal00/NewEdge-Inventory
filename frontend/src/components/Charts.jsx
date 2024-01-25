import React from "react";
import { useGetProductStatsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";
import { Row, Col, Table } from "react-bootstrap";
import Message from "./Message";
import { LinkContainer } from "react-router-bootstrap";

const Charts = () => {
  const {
    data: { data: data } = {},
    isLoading,
    isError,
    error,
  } = useGetProductStatsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl-6 rounded">
              <div className="bg-white rounded p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Product Summary</h6>
                </div>
                <div>
                  <br />
                  <Row>
                    <Col md={9}>Total Category:</Col>
                    <Col md={3}>{data.totalCategories}</Col>
                  </Row>

                  <br />

                  <Row>
                    <Col md={9}>Total Items:</Col>
                    <Col md={3}>{data.totalItems}</Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-xl-6 ">
              <div className="bg-white rounded p-4">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <h6 className="mb-0">Recently Added Items</h6>
                  <a href="/item-list/">Show All</a>
                </div>
                <div className="table-responsive">
                  <Table responsive="sm" className="position-relative">
                    <thead className="bg-light">
                      <tr>
                        <th className="text-black border-0">No </th>
                        {/* <th className="text-black border-0">Image</th> */}
                        <th className="text-black border-0">Item</th>
                        <th className="text-black border-0">Price</th>
                        
                        
                        
                      </tr>
                    </thead>
                    <tbody>
                      {data.recentItems &&
                        data.recentItems.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}
                            </td>
                            {/* <td>
                            {item.image && (
                              <img
                                src={item.image} // Assuming item.image contains the URL
                                alt={`Image for ${item.name}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }} // Set max width and height as per your design
                              />
                            )}
                            </td> */}
                            <LinkContainer
                              to={`/item-list/item-details/${item.id}`}
                            >
                              <td>{item.name}</td>
                            </LinkContainer>
                            <td>Nu.{item.unit_price}
                            
                            </td>

                            

                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Charts;
