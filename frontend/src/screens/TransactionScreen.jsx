import { useGetTransactionsQuery } from "../slices/transactionsApiSlice";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { useGetItemsQuery } from "../slices/itemsApiSlice";
import { FaPlus, FaMinus, FaSearch, FaTrashAlt, FaTimes } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
// import { MdOutlineComputer } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { BsEye } from "react-icons/bs";
import { useState } from "react";
import { Row, Col, Form, Button, Table, Collapse } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { parseISO, format } from 'date-fns';
import Pagination from 'react-bootstrap/Pagination';



const TransactionScreen = () => {

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
    startDate:"",
    endDate: "",
    selectedCategory: "",
    itemName: "",
    transactionType: "",
  });

  //fetch data
  const {
    data: { data: transactions } = {},
    isLoading,
    isError,
  } = useGetTransactionsQuery({filters,currentPage});

  const {
    data: { data: categories } = {},
    isLoading2,
    isError2,
  } = useGetCategoriesQuery();
  const {
    data: { data: items } = {},
    isLoading3,
    isError3,
    error,
  } = useGetItemsQuery();

  // Function to update a specific filter parameter
  const updateFilter = (key, value) => {
    if (key === "startDate" || key==="endDate") {
      value = format(value, 'yyyy-MM-dd');
    }
      setFilters({
        ...filters,
        [key]: value,
      });
    
  };

  console.log(filters)
  //for filter display
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);

    setFilters({
    startDate:"",
    endDate: "",
    selectedCategory: "",
    itemName: "",
    transactionType: "",
    })
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

      <div className="bg-white rounded p-4 d-flex flex-column">
        <div className="input-group d-flex mb-3">
          <div className="input-group-prepend me-1">
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

        {/* Dropdown Filters */}
        <Collapse in={open}>
          <div id="example-collapse-text">
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
                  selected={filters.startDate ? new Date(filters.startDate) : null}
                  onChange={(date) => updateFilter("startDate",date) }
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
                  onChange={(date) => updateFilter("endDate",date) }
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
                  onChange={(e) => updateFilter("selectedCategory", e.target.value)
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


              <Form.Group
                as={Col}
                controlId="formGridItem"
                md={2}
                xs={6}
                className="mb-2"
              >
                <Form.Label>Item</Form.Label>
                <Form.Select className="py-1 shadow-none" onChange={(e) => updateFilter("itemName", e.target.value)}>
                  <option defaultValue value="" >
                    All
                  </option>
                  {items && items.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridType" md={2} xs={6} className="mb-2">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  className="py-1 shadow-none"
                  onChange={(e) => updateFilter("transactionType", e.target.value)}
                >
                  <option defaultValue value="">
                    All
                  </option>
                  <option value="stockIn">Stock In</option>
                  <option value="stockOut">Stock Out</option>
                </Form.Select>
              </Form.Group>

            </Row>
          </div>
        </Collapse>

        <div>
          <Table responsive="sm" className="position-relative">
            <thead className="bg-light">
              <tr>
                <th className="text-black border-0">Item Name</th>
                <th className="text-black border-0">Category</th>
                <th className="text-black border-0">Stock In/Out</th>
                <th className="text-black border-0">Unit</th>
                <th className="text-black border-0">Qty</th>
                <th className="text-black border-0">Date</th>
                <th className="text-black border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.item.name}</td>
                    <td>{transaction.item.category.name}</td>
                    <td>{transaction.transaction_type}</td>
                    <td>{transaction.item.unit}</td>
                    <td>{transaction.qty}</td>
                    <td>{transaction.created_at}</td>
                    <td>
                      <BsEye /> <FiEdit3 /> <FaTrashAlt />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          
        {/* Pagination */}
        {transactions && transactions.length > 0 && (
          <nav aria-label="Page navigation example mb-5">
            <ul className="pagination justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage == 1} />
                <Pagination.Next onClick={handleNextPage} disabled={transactions.length < 10} />
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
