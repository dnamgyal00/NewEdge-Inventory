import React from "react";
import { useGetProductStatsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader";
import { Row,Col } from "react-bootstrap";

const Charts = () => {
  const {
    data: { data: data } = {},
    isLoading,
    isError,
    error,
  } = useGetProductStatsQuery();
  return (
    <>{isLoading ? (
      <Loader />
    ) : isError ? (
      <Message variant="danger">
        {error?.code?.message || error.error}
      </Message>
    ) : (
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-white rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Product Summary</h6>
              </div>
              <div>
                <Row>
                        <Col md={9}>Total Category:</Col>
                        <Col md={3}>{data.totalCategories}</Col>
                </Row>
                <Row>
                        <Col md={9}>Total Items:</Col>
                        <Col md={3}>{data.totalItems}</Col>
                </Row>
              </div>
              {/*            
            <canvas id="worldwide-sales"></canvas> */}
            </div>

          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-white text-center rounded p-4">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h6 className="mb-0">Sales & Revenue</h6>
                <a href="">Show All</a>
              </div>
              {/* <canvas id="sales-revenue"></canvas> */}
            </div>
          </div>
        </div>
      </div>
    )}</>
  );
};

export default Charts;
