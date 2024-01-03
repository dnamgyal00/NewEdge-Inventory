import React from "react";
import { Breadcrumb } from "react-bootstrap";

function InventoryReport() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Report</Breadcrumb.Item>
        <Breadcrumb.Item active>Inventory Report</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default InventoryReport;
