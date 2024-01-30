import React from "react";
import {
  useGetCategoriesQuery,
  useSearchCategoriesByNameQuery,
} from "../slices/categoriesApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Collapse } from "react-bootstrap";
import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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

  const [open, setOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setOpen(!open);
  };

  const [search, setSearch] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  //api calls
  const {
    data: { data: categories } = {},
    refetch,
    isLoading,
    isError,
    error,
  } = useGetCategoriesQuery(currentPage);

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
            <div className="input-group d-flex mb-1">
              <div className="input-group-prepend me-1">
                <span
                  className={`input-group-text  ${
                    showFilters ? "bg-primary" : "bg-white"
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
                <div className="search-results bg-white position-absolute top-100  translate-middle-x px-3 mt-2">
                  {/* EDIT THIS SEARCH RESULT DISPLAY */}
                  {CategorySearchResults &&
                    CategorySearchResults.map((result) => (
                      <LinkContainer
                        key={result.id}
                        to={{
                          pathname: `/home/category/${result.name}`,
                          search: `?id=${result.id}`,
                        }}
                      >
                        <div key={result.id} className="border-0 py-1">
                          {" "}
                          {result.name}{" "}
                        </div>
                      </LinkContainer>
                    ))}
                </div>
              </div>
            </div>

            <div className="input-group d-flex mb-3">
              <Collapse in={open}>
                <div id="example-collapse-text">
                  <DropdownButton
                    variant="white"
                    id="dropdown-menu show"
                    title="Choose Item"
                    className="border border-solid rounded mt-2 lh-1"
                  >
                    {categories &&
                      categories.map((category) =>
                        category.item.map((item) => (
                          <Dropdown.Item href="#/action-1" key={item.id}>
                            {item.name}
                          </Dropdown.Item>
                        ))
                      )}
                  </DropdownButton>
                </div>
              </Collapse>
            </div>
            <Table responsive="sm">
              <thead className="bg-light">
                <tr>
                  {/* <th className="text-black border-0"></th> */}
                  <th className="text-black border-0">Category Name</th>
                  <th className="text-black border-0 ">No of Items</th>
                  <th className="text-black border-0">Description</th>

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
