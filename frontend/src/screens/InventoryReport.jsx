import React, { useState } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Row, Col } from "react-bootstrap";
import {
  FaPlus,
  FaSearch,
  FaTrashAlt,
  FaFilePdf,
  FaPrint,
  FaCalendarAlt,
} from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { LinkContainer } from "react-router-bootstrap";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/styles/index.css";

const InventoryReport = () => {
  const { data: { data: items } = {}, isLoading, isError } = useGetItemsQuery();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="mb-3">
        <h5 className="text-black mb-0">Inventory Report</h5>
        Manage your inventory report
      </div>

      <div className="bg-white rounded p-4">
        <div className="input-group d-flex mb-3 justify-content-between">
          <div className="d-flex">
            <div className="input-group-prepend me-1">
              <span className="input-group-text bg-white ">
                <FiFilter />{" "}
              </span>
            </div>

            {/* Search Bar */}
            <div className="border border-solid d-flex py-0 rounded me-2 box-shadow">
              <span className="input-group-text bg-white border-0">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="form-control border-0 px-0 py-0 shadow-none text-black"
              />
            </div>
            <div className="border border-solid rounded d-flex me-2">
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="form-control border-0 shadow-none text-black padding"
                dateFormat="dd/MM/yyyy"
                placeholderText="Start date"
              />
              <span className="input-group-text border-0 bg-white">
                <FaCalendarAlt />
              </span>
            </div>
            <div className="border border-solid rounded d-flex me-2">
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="form-control border-0 shadow-none text-black padding"
                dateFormat="dd/MM/yyyy"
                placeholderText="End date"
              />
              <span className="input-group-text border-0 bg-white">
                <FaCalendarAlt />
              </span>
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
