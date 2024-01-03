import React from "react";
import { Breadcrumb } from "react-bootstrap";

function ScheduleReport() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Report</Breadcrumb.Item>
        <Breadcrumb.Item active>Schedule Report</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default ScheduleReport;
