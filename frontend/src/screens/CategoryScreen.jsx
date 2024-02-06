import React from "react";
import {
  useGetCategoriesQuery,
  useSearchCategoriesByNameQuery,
} from "../slices/categoriesApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Collapse, Row, Form, Col } from "react-bootstrap";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch } from "react-redux";
import { setCategoryId } from "../slices/categorySlice";


import { useState } from "react";
import Loader from "../components/Loader";
import Message from "../components/Message";

const CategoryScreen = () => {
  const dispatch = useDispatch();

  //Pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  //Filters
  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);

    setFilters({
      order: "asc",
      item_count: "",
    })
  };

  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearch(value);
  };

  // State variables for filters
  const [filters, setFilters] = useState({
    order: "asc",
    item_count: "",
  });
  const updateFilter = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  console.log(filters);

  //api calls
  const {
    data: { data: categories, msg: m } = {},
    refetch,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery({ currentPage, filters });
  console.log(m)

  const {
    data: { data: CategorySearchResults } = {},
    isLoading2,
    isError2,
    error2,
  } = useSearchCategoriesByNameQuery(search ? search : "1");
  console.log(CategorySearchResults);



  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.code?.message || error.error}
        </Message>
      ) : (
        <div className="col-sm-12 col-xl-6 w-100">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="text-black mb-0"> Category List</h5>
              Manage your category
            </div>
            <LinkContainer to="/home/category/add-category">
              <Button variant="primary" size="sm" className="px-4 py-1">
                {" "}
                <FaPlus className="me-2 mb-1" />
                Add Category
              </Button>
            </LinkContainer>
          </div>

          <div className="bg-white rounded p-4">
            <div className="input-group d-flex mb-3">
              <div className="input-group-prepend me-1">
                <span
                  className={`input-group-text  ${showFilters ? "bg-primary" : "bg-white"
                    }`}
                  onClick={toggleFilters}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {/* <FiFilter />{" "} */}
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
                  name="search"
                  value={search}
                  onChange={handleInputChange}
                  style={{ boxShadow: "none" }}
                  autoComplete="off"
                />
                <div className="search-results bg-white position-absolute top-100 translate-middle-x px-3 mt-1 rounded">
                  {CategorySearchResults &&
                    CategorySearchResults.map((result) => (
                      <LinkContainer
                        key={result.id}
                        to={{
                          pathname: `/home/category/${result.name}`,
                          search: `?id=${result.id}`,
                        }}
                      >
                        <div key={result.id} className=" clickable-cell border-0 py-1 rounded">
                          {" "}
                          {result.name}{" "}
                        </div>
                      </LinkContainer>
                    ))}
                </div>
              </div>

            </div>


            {/* Dropdown Filters */}
            <Collapse in={open}>
              <div id="example-collapse-text">

                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    controlId="formGridType"
                    md={2}
                    xs={6}
                    className="mb-2"
                  >
                    <Form.Label>Order</Form.Label>
                    <Form.Select
                      className="py-1 shadow-none"
                      onChange={(e) =>
                        updateFilter("order", e.target.value)
                      }
                    >
                      <option defaultValue value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </Form.Select>

                  </Form.Group>

                  {/* <Form.Group
                    as={Col}
                    controlId="formGridType"
                    md={2}
                    xs={6}
                    className="mb-2"
                  >
                    <Form.Label>No of Items</Form.Label>
                    <Form.Select
                      className="py-1 shadow-none"
                      onChange={(e) =>
                        updateFilter("item_count", e.target.value)
                      }
                    >
                      <option defaultValue value="">None</option>
                      <option value="desc">Greatest</option>
                      <option value="asc">Smallest</option>
                    </Form.Select>

                  </Form.Group> */}

                </Row>
              </div>
            </Collapse>

            
            <Table responsive="sm">
              <thead className="bg-light">
                <tr>
                  {/* <th className="text-black border-0"></th> */}
                  <th className="text-black border-0" style={{ width: '50px' }}>Category Name</th>
                  <th className="text-black border-0" style={{ width: '20px' }}>No of Items</th>
                  <th className="text-black border-0" style={{ width: '800px' }}>Description</th>



                  {/* <th className="text-black border-0">Action</th> */}
                </tr>
              </thead>
              <tbody>
                {categories &&
                  categories.map((category) => (
                    <tr key={category.id}>
                      <LinkContainer
                        to={{
                          pathname: `/home/category/${category.name}`,
                        }}
                        onClick={() => dispatch(setCategoryId(category.id))}
                      >
                        <td className="clickable-cell">{category.name}</td>
                      </LinkContainer>

                      <td>{category.item_count} </td>
                      <td>{category.description}</td>
                      {/* <td>
                    <BsEye /> <FiEdit3 /> <FaTrashAlt />
                  </td> */}
                    </tr>
                  ))}
              </tbody>
            </Table>

            {/* Pagination */}
            {categories && categories.length > 0 && (
              <nav aria-label="Page navigation example mb-5">
                <ul className="pagination justify-content-center">
                  <Pagination>
                    <Pagination.Prev
                      onClick={handlePrevPage}
                      disabled={currentPage == 1}
                    />
                    <Pagination.Next
                      onClick={handleNextPage}
                      disabled={categories.length < 10}
                    />
                  </Pagination>
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryScreen;
