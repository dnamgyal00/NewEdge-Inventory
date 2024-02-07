import { useGetTransactionsQuery } from "../slices/transactionsApiSlice";
import { useGetTransactionsExcelDataQuery } from "../slices/transactionsApiSlice";
import { useGetCategoriesOnlyQuery } from "../slices/categoriesApiSlice";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import {
  FaPlus,
  FaMinus,
  FaSearch,
  FaTrashAlt,
  FaTimes,
  FaFilePdf,
} from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
// import { MdOutlineComputer } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { Row, Col, Form, Button, Table, Collapse, Pagination } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { parseISO, format } from "date-fns";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { setItemId } from "../slices/itemSlice";
import { setCategoryId } from "../slices/categorySlice";
import { useDispatch } from "react-redux";

const TransactionScreen = () => {
  const dispatch = useDispatch();
  //Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // State variables for filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    selectedCategory: "",
    itemName: "",
    transactionType: "",
  });

  // API CALLS
  // Fetch all data for Excel export
  const {
    data: { data: allTransactions } = {},
    isLoading: allTransactionsLoading,
    isError: allTransactionsError,
  } = useGetTransactionsExcelDataQuery({ filters });

  //Fetch paginated data for display
  const {
    data: { data: paginatedTransactions, msg: msg } = {},
    isLoading: paginatedTransactionsLoading,
    isError: paginatedTransactionsError,
  } = useGetTransactionsQuery({ filters, currentPage });

  const {
    data: { data: categories } = {},
    isLoading2,
    isError2,
  } = useGetCategoriesOnlyQuery();
  const {
    data: { data: items } = {},
    isLoading3,
    isError3,
    error,
  } = useGetItemsQuery({});

  // Function to update a specific filter parameter
  const updateFilter = (key, value) => {
    // Reset the "Item" filter if the "Category" filter is changed
    if (key === "selectedCategory") {
      setFilters({
        ...filters,
        [key]: value,
        itemName: "",
      });
    }
    // Reset the "Category" filter if the "Item" filter is changed
    else if (key === "itemName") {
      setFilters({
        ...filters,
        [key]: value,
        selectedCategory: "",
      });
    }
    // For other filters, update as usual
    else {
      if (key === "startDate" || key === "endDate") {
        value = format(value, "yyyy-MM-dd");
      }
      setFilters({
        ...filters,
        [key]: value,
      });
    }
  };


  //for filter display
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);

    setFilters({
      startDate: "",
      endDate: "",
      selectedCategory: "",
      itemName: "",
      transactionType: "",
    });
    const form = document.getElementById("filters");
    if (form) {
      form.reset();
    }
  };

  const handleDownloadExcel = () => {
    try {
      const rows = allTransactions.map((t) => ({
        id: t.id,
        item_name: t.item.name,
        item_id: t.item.id,
        category: t.item.category.name,
        transaction: t.transaction_type,
        type: t.type,
        qty: t.qty,
        unit_price: t.item.unit_price,
        total_price: t.total_price,
        data: t.created_at,
      }));
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");
      XLSX.writeFile(wb, "Transactions.xlsx");
    } catch (error) {
      console.error("Error downloading Excel:", error);
    }
  };

  const handleDownloadPDF = () => {
    try {
      const pdf = new jsPDF();
      pdf.autoTable({
        head: [
          [
            "Item Name",
            "Category",
            "Stock In/Out",
            "Qty",
            "Unit Price",
            "Total Price",
            "Date",
          ],
        ],
        body: paginatedTransactions.map((transaction) => [
          transaction.item.name,
          transaction.item.category.name,
          transaction.transaction_type,
          transaction.qty,
          `Nu.${transaction.item.unit_price}`,
          `Nu.${transaction.total_price}`,
          format(transaction.created_at, "yyyy-MM-dd"),
        ]),
      });

      pdf.save("Transactions.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className=" col-sm-12 col-xl-6 w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Transaction History</h5>
          Manage your transactions
        </div>
        <div className="d-flex flex-row">
          <LinkContainer to="/stock-in">
            <Button
              variant="primary"
              size="sm"
              className="px-md-4 py-1 me-1 me-md-3"
            >
              {" "}
              <FaPlus className="me-1 me-md-2 mb-1" />
              Stock In
            </Button>
          </LinkContainer>
          <LinkContainer to="/stock-out">
            <Button variant="primary" size="sm" className="px-md-4 py-1">
              {" "}
              <FaMinus className="me-1 me-md-2 mb-1" />
              Stock Out
            </Button>
          </LinkContainer>
        </div>
      </div>

      <div className="bg-white rounded p-4 d-flex flex-column ">
        <div className="input-group d-flex mb-3 justify-content-between align-items-center">
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

          {/* Print Options */}
          <div className="d-flex flex-row">
            <PiMicrosoftExcelLogoFill size={25} onClick={handleDownloadExcel} />
          </div>
        </div>

        {/* Dropdown Filters */}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form
              id="filters"

            >

              <Row className="mb-3">
                <Form.Group
                  as={Col}
                  controlId="formGridDate"
                  md={2}
                  xs={6}
                  className="mb-2"
                >
                  <Form.Label>Start Date</Form.Label>
                  <DatePicker
                    selected={
                      filters.startDate ? new Date(filters.startDate) : null
                    }
                    onChange={(date) => updateFilter("startDate", date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                    className="form-control py-1 shadow-none"
                  />
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridDate"
                  md={2}
                  xs={6}
                  className="mb-2"
                >
                  <Form.Label>End Date</Form.Label>
                  <DatePicker
                    selected={filters.endDate ? new Date(filters.endDate) : null}
                    onChange={(date) => updateFilter("endDate", date)}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select Date"
                    className="form-control py-1 shadow-none"
                  />
                </Form.Group>

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
                    onChange={(e) =>
                      updateFilter("selectedCategory", e.target.value)
                    }
                    value={filters.selectedCategory}
                  >
                    <option defaultValue value="">
                      All
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.name}
                          id={category.id}
                        >
                          {category.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridItem"
                  md={2}
                  xs={6}
                  className="mb-2"
                >
                  <Form.Label>Item</Form.Label>
                  <Form.Select
                    className="py-1 shadow-none"
                    onChange={(e) => updateFilter("itemName", e.target.value)}
                    value={filters.itemName}
                  >
                    <option defaultValue value="">
                      All
                    </option>
                    {items &&
                      items.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group
                  as={Col}
                  controlId="formGridType"
                  md={2}
                  xs={6}
                  className="mb-2"
                >
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    className="py-1 shadow-none"
                    onChange={(e) =>
                      updateFilter("transactionType", e.target.value)
                    }
                  >
                    <option defaultValue value="">
                      All
                    </option>
                    <option value="stockIn">Stock In</option>
                    <option value="stockOut">Stock Out</option>
                  </Form.Select>
                </Form.Group>
              </Row>
            </form>
          </div>
        </Collapse>

        <div>
          <Table responsive="sm" className="position-relative">
            <thead className="bg-light">
              <tr>
                <th className="text-black border-0">Item Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Stock In/Out</th>
                <th className="text-black border-0">Qty</th>
                <th className="text-black border-0">Unit Price</th>
                <th className="text-black border-0">Total Price</th>

                <th className="text-black border-0">Date</th>
                {/* <th className="text-black border-0">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions &&
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <LinkContainer
                      key={transaction.item.id}
                      to={{ pathname: `/home/item/${transaction.item.name}` }}
                      onClick={() => dispatch(setItemId(transaction.item.id))}
                    >
                      <td className="clickable-cell">{transaction.item.name}</td>
                    </LinkContainer>

                    <LinkContainer
                      to={{
                        pathname: `/home/category/${transaction.item.category.name}`,
                      }}
                      onClick={() => dispatch(setCategoryId(transaction.item.category.id))}
                    >
                      <td className="clickable-cell">{transaction.item.category.name}</td>
                    </LinkContainer>

                    <td>{transaction.transaction_type}</td>
                    <td>{transaction.qty}</td>
                    <td>Nu.{transaction.item.unit_price}</td>
                    <td>Nu.{transaction.total_price}</td>

                    <td>{format(transaction.created_at, "yyyy-MM-dd")}</td>
                    {/* <td>
                      <BsEye /> 
                      <FiEdit3 /> 
                      <FaTrashAlt />
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {paginatedTransactions && paginatedTransactions.length > 0 && (
            <nav aria-label="Page navigation example mb-5">
              <ul className="pagination justify-content-center">
                <Pagination>
                  <Pagination.Prev
                    onClick={handlePrevPage}
                    disabled={currentPage == 1}
                  />
                  <Pagination.Next
                    onClick={handleNextPage}
                    disabled={paginatedTransactions.length < 10}
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

export default TransactionScreen;
