import { useState } from "react";
import { useGetStatsQuery } from "../slices/dashboardApiSlice";
import Loader from "./Loader.jsx";
import { Form } from "react-bootstrap";
import Message from "./Message.jsx";

const InventoryStats = () => {
  const [timeRange, setTimeRange] = useState("month");
  const handleStatusChange = (e) => {
    setTimeRange(e.target.value);
    console.log(e.target.value)
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
        <div className="container-fluid pt-5 px-4">
          <div className="row bg-white rounded g-4 mx-1">
            <div className="col-sm- col-xl-3">
              <div className="bg-white rounded border border-solid d-flex align-items-center justify-content-between p-4 mb-4 ms-3">
                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Stock In</p>
                  <h6 className="mb-0">{inventoryStats.stockIn}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-white rounded border bordersolid d-flex align-items-center justify-content-between p-4">
              <i className="fa fa-chart-line fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Stock Out</p>
                  <h6 className="mb-0">{inventoryStats.stockOut}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
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
            <div className="col-sm-6 col-xl-2">
              <div className="bg-white ms-3">
                <Form.Label>Time Range</Form.Label>
                <Form.Check
                  type="radio"
                  label="Daily"
                  value="day"
                  checked={timeRange === "day"}
                  onChange={handleStatusChange}
                  className="form-check-input-xs"
                />
                <Form.Check
                  defaultChecked
                  type="radio"
                  label="Weekly"
                  value="week"
                  checked={timeRange === "week"}
                  onChange={handleStatusChange}
                  className="form-check-input-sm"
                />
                <Form.Check
                  type="radio"
                  label="Monthly"
                  value="month"
                  checked={timeRange === "month"}
                  onChange={handleStatusChange}
                  className="form-check-input-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryStats;
