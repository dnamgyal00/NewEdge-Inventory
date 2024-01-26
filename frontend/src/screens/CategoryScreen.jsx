import React from "react";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Collapse, Row, Form, Col } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrashAlt, FaTimes } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";

import { useState } from "react";

const CategoryScreen = () => {
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
  const {
    data: { data: categories } = {},
    isLoading,
    isError,
  } = useGetCategoriesQuery(currentPage);

  //console.log(categories.length);
  console.log(categories);

  return (
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
              style={{ boxShadow: "none" }}
            />
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
              <th className="text-black border-0">No of Items</th>
              <th className="text-black border-0">Description</th>

              <th className="text-black border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category.id}>
                  {/* <td>
                  {category.image && (
                              <img
                                src={category.image} // Assuming category.image contains the URL
                                alt={`Image for ${category.name}`}
                                style={{ maxWidth: '100px', maxHeight: '100px' }} // Set max width and height as per your design
                              />
                            )}
                  </td> */}
                  <LinkContainer
                    to={{
                      pathname: `/home/category/${category.name}`,
                      search: `?id=${category.id}`,
                    }}
                  >
                    <td>{category.name}</td>
                  </LinkContainer>

                  <td>{category.item_count}</td>
                  <td>{category.description}</td>
                  <td>
                    <BsEye /> <FiEdit3 /> <FaTrashAlt />
                  </td>
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
  );
};

export default CategoryScreen;
