import React from "react";

const Charts = () => {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        <div className="col-sm-12 col-xl-6">
          <div className="bg-white text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Worldwide Sales</h6>
              <a href="">Show All</a>
            </div>
            <canvas id="worldwide-sales"></canvas>
          </div>
        </div>
        <div className="col-sm-12 col-xl-6">
          <div className="bg-white text-center rounded p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h6 className="mb-0">Sales & Revenue</h6>
              <a href="">Show All</a>
            </div>
            <canvas id="sales-revenue"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
