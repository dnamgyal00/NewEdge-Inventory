import { useState } from "react";
import { useGetStatsQuery } from "../slices/dashboardApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const InventoryStats = () => {
  const [timeRange, setTimeRange] = useState("week");
  const {
    data: { data: inventoryStats } = {},
    isLoading,
    isError,
    error,
  } = useGetStatsQuery(timeRange);

  console.log(inventoryStats);

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
            <div className="col-sm- col-xl-3">
              <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-line fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Stock In</p>
                  <h6 className="mb-0">{inventoryStats.stockIn}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-3">
              <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-bar fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Stock Out</p>
                  <h6 className="mb-0">{inventoryStats.stockOut}</h6>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="bg-white rounded d-flex align-items-center justify-content-between p-4">
                <i className="fa fa-chart-area fa-3x text-primary"></i>
                <div className="ms-3">
                  <p className="mb-2">Total Transaction</p>
                  <h6 className="mb-0">{inventoryStats.stockOut + inventoryStats.stockIn}</h6>
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
