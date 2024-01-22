import { useState } from "react";
import { useGetStatsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader.jsx";
import { Form } from "react-bootstrap";
import Message from "./Message.jsx";

const InventoryStats = () => {
  const [timeRange, setTimeRange] = useState("month");
  const handleStatusChange = (e) => {
    setTimeRange(e.target.value);
  };

  const {
    data: { data: inventoryStats } = {},
    isLoading,
    isError,
    error,
  } = useGetStatsQuery(timeRange);

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
          <div className="row bg-white rounded g-4 mx-1 pb-2 pb-md-0">
            <div className="d-flex flex-column flex-md-row bg-white px-4">
              <Form.Label className="me-3">Time Range: </Form.Label>
              <Form.Check
                type="radio"
                label="Daily"
                value="day"
                checked={timeRange === "day"}
                onChange={handleStatusChange}
                className="me-3"
              />
              <Form.Check
                defaultChecked
                type="radio"
                label="Weekly"
                value="week"
                checked={timeRange === "week"}
                onChange={handleStatusChange}
                className="me-3"
              />
              <Form.Check
                type="radio"
                label="Monthly"
                value="month"
                checked={timeRange === "month"}
                onChange={handleStatusChange}
                className="form-check-input-xs"
              />
            </div>
            <div className="d-flex flex-column flex-md-row mt-0 pb-2">
              <div className="col-sm-6 col-xl-4 p-3">
                <div className="bg-white rounded border border-solid d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-bar fa-3x text-primary"></i>
                  <div className="ms-3">
                    <p className="mb-2">Stock In</p>
                    <h6 className="mb-0">{inventoryStats.stockIn}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 p-3">
                <div className="bg-white rounded border bordersolid d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-line fa-3x text-primary"></i>
                  <div className="ms-3">
                    <p className="mb-2">Stock Out</p>
                    <h6 className="mb-0">{inventoryStats.stockOut}</h6>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-xl-4 p-3">
                <div className="bg-white rounded border border-solid d-flex align-items-center justify-content-between p-4">
                  <i className="fa fa-chart-area fa-3x text-primary"></i>
                  <div className="ms-3">
                    <p className="mb-2">Total Transaction</p>
                    <h6 className="mb-0">
                      {inventoryStats.stockOut + inventoryStats.stockIn}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryStats;
