import React from "react";
import { Form, Collapse, Row, Col, Pagination } from "react-bootstrap";
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
import { useGetReportQuery, useGetPastYearQuery } from "../slices/reportApiSlice";
import { useGetCategoriesOnlyQuery } from "../slices/categoriesApiSlice";
import { useState } from "react";



const ScheduleReport = () => {
  //Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //filters
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);
    setFilters({
      category: "",
      year: "2023",
    })
  };
  const [filters, setFilters] = useState({
    category: "",
    year: "2023",
  })
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });

  };


  //api calls
  const {
    data: { data: reports, totalPages } = {},
    isLoading,
    isError
  } = useGetReportQuery({ filters, page: currentPage });
  console.log(filters, currentPage, totalPages);

  const {
    data: { data: years } = {},
    isLoading3,
    isError3
  } = useGetPastYearQuery();

  const {
    data: { data: categories } = {},
    isLoading2,
    isError2,
  } = useGetCategoriesOnlyQuery();

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="mb-3">
        <h5 className="text-black mb-0"> Schedule Report: {filters.year}</h5>
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




              <Form.Group as={Col} controlId="formGridType" md={2} xs={6} className="mb-2">
                <Form.Label>Year</Form.Label>
                <Form.Select
                  className="py-1 shadow-none"
                  onChange={(e) => updateFilter("year", e.target.value)}
                >
                  {years && years.map((year) => (
                    <option key={year} value={year} id={year}>{year}</option>
                  ))}
                </Form.Select>
              </Form.Group>

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
                <th className="text-black border-0">Stock In qty</th>
                <th className="text-black border-0">Stock Out qty</th>
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

          {/* Pagination */}
          {reports && reports.length > 0 && (
            <nav aria-label="Page navigation example mb-5">
              <ul className="pagination justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={handlePrevPage}
                    disabled={currentPage == 1}
                  />
                  <Pagination.Next
                    onClick={handleNextPage}
                    disabled={reports.length < 10}
                  />
                </Pagination>
              </ul>
            </nav>
          )}

        </div>
      </div>
    </div>
  );
};

export default ScheduleReport;
