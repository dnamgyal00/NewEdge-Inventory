import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { BsEye } from "react-icons/bs";

const CategoryScreen = () => {
  return (
    <div className="col-sm-12 col-xl-6 w-100">
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
            <span className="input-group-text bg-white border-1">
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
            <tr>
              <td>Workstation</td>
              <td>Table cell</td>
              <td>
                Workstations are individual computing units used by employees
                for daily tasks
              </td>
              <td>
                <BsEye /> <FiEdit3 /> <FaTrashAlt />
              </td>
            </tr>
            <tr>
              <td>Wires</td>
              <td>Table cell</td>
              <td>
                Workstations are individual computing units used by employees
                for daily tasks
              </td>
              <td>
                <BsEye /> <FiEdit3 /> <FaTrashAlt />
              </td>
            </tr>
            <tr>
              <td>Network Devices</td>
              <td>Table cell</td>
              <td>
                Workstations are individual computing units used by employees
                for daily tasks
              </td>
              <td>
                <BsEye /> <FiEdit3 /> <FaTrashAlt />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryScreen;
