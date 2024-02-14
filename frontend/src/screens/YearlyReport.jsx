import { React, useState } from "react";
import { Form, Collapse, Row, Col, Pagination, Button, Table } from "react-bootstrap";
import { FaTimes, FaSearch, } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { MdOutlineInventory } from "react-icons/md";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

import { useGetReportQuery, useGetPastYearQuery, useUpdateReportMutation, useGetReportExcelDataMutation } from "../slices/reportApiSlice";
import { useGetCategoriesOnlyQuery } from "../slices/categoriesApiSlice";
import Modals from "../components/Modals";
import Loader from "../components/Loader";
import Message from "../components/Message";



const YearlyReport = () => {
  const currentYear = new Date().getFullYear();

  //Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //filters
  const [filters, setFilters] = useState({
    category: "",
    year: currentYear - 1,
  })
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);
    setFilters({
      category: "",
      year: currentYear - 1,
    })
    setCurrentPage(1)
  };

  //modal action (generate report)
  const [showModal, setShowModal] = useState(false);
  const handleModalAction = async () => {
    setShowModal(false);
    const loadingToastId = toast.info("Generating...");
    try {
      const result = await updateReport({ formDataObj: filters, year: currentYear }).unwrap();
      updateFilter("year", currentYear)
      toast.dismiss(loadingToastId);
      toast.success(`Yearly report for ${currentYear} generated successfully`);
      refetchReport();
      refetchYear();
    } catch (error) {
      console.error("Error generating report:", error);
      toast.dismiss(loadingToastId);
      toast.error("Error generating report.", error);
    }
  };

  //download actions
  const handleDownloadExcel = async () => {
    const loadingToastId = toast.info("Loading data...");
    try {
      const result = await getReportExcelDataMutation(filters).unwrap();
      toast.dismiss(loadingToastId);

      const rows = result.data.map((t) => ({
        item_name: t.itemName,
        category_name: t.categoryName,
        opening_bal: t.opening_bal,
        stock_in_qty: t.stock_in_qty,
        stock_out_qty: t.stock_out_qty,
        closing_bal: t.closing_bal,
        year: t.year
      }));

      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, `${rows[1].year}`);
      XLSX.writeFile(wb, `InventoryYearlyReport${rows[1].year}.xlsx`);

    } catch (error) {
      console.error("Error downloading excel data:", error);
      toast.dismiss(loadingToastId);
      toast.error("Error downloading excel data");
    }
  };

  //api calls
  const [updateReport, { isLoading: isUpdateLoading, isError: updateError }] =
    useUpdateReportMutation();

  const [getReportExcelDataMutation, { isLoading: isLoadingExcel, isError: isErrorExcel }] = useGetReportExcelDataMutation();

  const {
    data: { data: reports, totalPages } = {},
    isLoading: isLoadingReport,
    isError: isErrorReport,
    refetch: refetchReport,
  } = useGetReportQuery({ filters, page: currentPage });

  const {
    data: { data: categories } = {},
    isLoading2,
    isError2,
  } = useGetCategoriesOnlyQuery();

  const {
    data: { data: years } = {},
    isLoading3,
    isError3,
    refetch: refetchYear,
  } = useGetPastYearQuery();
  console.log(years)
  console.log(typeof (years))


  return (
    <div className="col-sm-12 col-xl-6 w-100">

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Yearly Report:
            <i> {filters.year}</i>
          </h5>
          Manage your yearly report
        </div>
        <div className="d-flex flex-row">
          <Button variant="primary" size="sm" className="px-md-4 py-1" onClick={() => {
            setShowModal(true)
          }}>
            {isUpdateLoading ? "Generating..." : "Generate Report"}
            {" "}
            <MdOutlineInventory />
          </Button>

          {/* ConfirmModal component */}
          <Modals
            show={showModal}
            onHide={() => setShowModal(false)}
            onConfirm={handleModalAction}
            title="Generate/Update Report"
            body={
              `Yearly reports are auto generated or updated at the end of each year for all items. 
          Are you sure you want to update/generate report for current year :${new Date().getFullYear()}, right now?`}
          />


        </div>
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
            {/* <FaFilePdf size={25} className="clickable-cell" /> */}
            <PiMicrosoftExcelLogoFill size={25} className="clickable-cell"
              onClick={handleDownloadExcel}
            />{" "}
            {/* <FaPrint size={25} className="clickable-cell" /> */}
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
                  value={filters.year}
                >
                  <option disabled value="">
                    ...
                  </option>
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
            {isLoadingReport ? (
              <Loader />
            ) : isErrorReport ? (
              <Message variant="danger">
                {/* {error?.code?.message || error.error} */}
                Failed to Fetch
              </Message>
            ) : (
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
            )
            }
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
    </div >
  );
};

export default YearlyReport;
