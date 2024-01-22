import React from "react";
import { Form } from "react-bootstrap";
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

const ScheduleReport = () => {
  const { data: { data: items } = {}, isLoading, isError } = useGetItemsQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="mb-3">
        <h5 className="text-black mb-0"> Schedule Report</h5>
        Manage your scheduled report
      </div>

      <div className="bg-white rounded p-4">
        <div className="input-group d-flex mb-3 justify-content-between">
          <div className="d-flex">
            <div className="input-group-prepend me-1">
              <span className="input-group-text bg-white border-1">
                <FiFilter />{" "}
              </span>
            </div>
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
              <th className="text-black border-0">Item Name</th>
              <th className="text-black border-0">Category</th>
              <th className="text-black border-0">Opening Balance</th>
              <th className="text-black border-0">Stock In</th>
              <th className="text-black border-0">Stock Out</th>
              <th className="text-black border-0">Closing Balance</th>
              <th className="text-black border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {items &&
              items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                  <td>test</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ScheduleReport;
