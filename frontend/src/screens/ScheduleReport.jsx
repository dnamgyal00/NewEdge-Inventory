import React from "react";
import { Form, Collapse, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {
  FaTimes,
  FaSearch,
  FaTrashAlt,
  FaFilePdf,
  FaPrint,
} from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { LinkContainer } from "react-router-bootstrap";
import { useGetReportQuery } from "../slices/reportApiSlice";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";


const ScheduleReport = () => {
  //filters
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);
    setFilters({
      category: "",
      year: "2024",
    })
  };
  const [filters, setFilters] = useState({
    category: "",
    year: "2024",
  })
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });

  };
  console.log(filters)

  //api calls
  const {
    data: { data: reports } = {},
    isLoading,
    isError
  } = useGetReportQuery(filters);

  const {
    data: { data: categories } = {},
    isLoading2,
    isError2,
  } = useGetCategoriesQuery();

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
              {/* Filter Action*/}
              <span
                className={`input-group-text  ${showFilters ? "bg-primary" : "bg-white"
                  }`}
                onClick={toggleFilters}
                aria-controls="example-collapse-text"
                aria-expanded={open}
              >
                {showFilters ? (
                  // Cross Button when filters are displayed
                  <FaTimes className="text-white" />
                ) : (
                  // Filter Icon when filters are hidden
                  <FiFilter />
                )}
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
            {/* <FaFilePdf size={25} />
            <PiMicrosoftExcelLogoFill size={25} />{" "}
            <FaPrint size={25} /> */}
          </div>

        </div>

        {/* Dropdown Filter*/}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <Row className="mb-3">

              <Form.Group
                as={Col}
                controlId="formGridCategory"
                md={2}
                xs={6}
                className="mb-2"
              >
                <Form.Label>Category</Form.Label>
                <Form.Select
                  className="py-1 shadow-none"
                  onChange={(e) => updateFilter("category", e.target.value)
                  }
                >
                  <option defaultValue value="">
                    All
                  </option>
                  {categories && categories.map((category) => (
                    <option key={category.id} value={category.name} id={category.id}>{category.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>


              {/* <Form.Group as={Col} controlId="formGridType" md={2} xs={6} className="mb-2">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  className="py-1 shadow-none"
                  onChange={(e) => updateFilter("year", e.target.value)}
                >
                  <option defaultValue value="">
                    All
                  </option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group> */}

            </Row>
          </div>
        </Collapse>

        <div>
          <Table responsive="sm">
            <thead className="bg-light">
              <tr>
                <th className="text-black border-0">Item Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Opening Balance</th>
                <th className="text-black border-0">Stock In</th>
                <th className="text-black border-0">Stock Out</th>
                <th className="text-black border-0">Closing Balance</th>
                
              </tr>
            </thead>
            <tbody>
              {reports &&
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.itemName}</td>
                    <td>{report.categoryName}</td>
                    <td>{report.opening_bal}</td>
                    <td>{report.stock_in_qty}</td>
                    <td>{report.stock_out_qty}</td>
                    <td>{report.closing_bal}</td>

                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleReport;
