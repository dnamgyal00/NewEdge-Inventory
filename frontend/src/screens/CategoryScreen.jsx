import React from "react";
import { useGetCategoriesQuery } from "../slices/categoriesApiSlice";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Collapse,Row, Form, Col } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { Breadcrumb } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import { useState } from 'react';


const CategoryScreen = () => {
  const {
    data: { data: categories } = {},
    isLoading,
    isError,
  } = useGetCategoriesQuery();

  const [open, setOpen] = useState(false);

  // console.log(categories)
  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item >Product</Breadcrumb.Item>
        <Breadcrumb.Item active>Category List</Breadcrumb.Item>
      </Breadcrumb>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Category List</h5>
          Manage your category
        </div>
        <LinkContainer to="/admin/add-category">
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
            <span className="input-group-text bg-white border-1" onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
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
        <div className="input-group d-flex mb-3">
          <Collapse in={open}>
            <div id="example-collapse-text">
              <DropdownButton id="dropdown-menu border-0 show mt-2 py-2 shadow-none" title="Choose Item">
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
              
            </div>
          </Collapse>
        </div>
        <Table responsive="sm">
          <thead className="bg-light">
            <tr>
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
                  <LinkContainer to={`/category/${category.id}`}>
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
      </div>
    </div>
  );
};

export default CategoryScreen;
