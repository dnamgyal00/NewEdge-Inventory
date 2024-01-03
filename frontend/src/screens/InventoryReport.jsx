import React from "react";
import { Breadcrumb, Form, ListGroup } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  FaPlus,
  FaSearch,
  FaTrashAlt,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { LinkContainer } from "react-router-bootstrap";
import { useGetItemsQuery } from "../slices/itemsApiSlice";

const InventoryReport = () => {
  const { data: { data: items } = {}, isLoading, isError } = useGetItemsQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Report</Breadcrumb.Item>
        <Breadcrumb.Item active>Inventory Report</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mb-3">
        <h5 className="text-black mb-0">Inventory Report</h5>
        Manage your inventory report
      </div>

      <div className="bg-white rounded p-4">
        <div className="input-group d-flex mb-3 justify-content-between">
          <div className="d-flex">
            <div className="input-group-prepend me-1">
              <span className="input-group-text bg-white border-1">
                <FiFilter />{" "}
              </span>
            </div>
            <ListGroup>
              <ListGroup.Item></ListGroup.Item>
            </ListGroup>

            {/* Search Bar */}
            <div className="border border-solid d-flex py-0 rounded">
              <span className="input-group-text bg-white border-0">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="form-control border-0 px-0 py-0"
                style={{ boxShadow: "none" }}
              />
            </div>
          </div>

          {/* Print options */}
          <div>
            <FaFilePdf size={20} /> <PiMicrosoftExcelLogoFill size={20} />{" "}
            <FaPrint size={20} />
          </div>
        </div>
        <Table responsive="sm">
          <thead className="bg-light">
            <tr>
              <th className="text-black border-0">
                <Form.Check aria-label="option 1" />
              </th>
              <th className="text-black border-0">Item Name</th>
              <th className="text-black border-0">Category</th>
              <th className="text-black border-0">Brand Name</th>
              <th className="text-black border-0">Price</th>
              <th className="text-black border-0">Unit</th>
              <th className="text-black border-0">Qty</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
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
  );
};

export default InventoryReport;
