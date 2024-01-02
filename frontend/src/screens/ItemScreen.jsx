import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { FiFilter, FiEdit3 } from "react-icons/fi";
import { MdOutlineComputer } from "react-icons/md";
import { LinkContainer } from "react-router-bootstrap";
import { BsEye } from "react-icons/bs";

const ItemScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("http://192.168.131.147:3001/api/item");
      setItems(data.data); // Update to setItems
    };
    fetchItems();
  }, []);

  console.log(items);

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Item List</h5>
          Manage your item
        </div>
        <LinkContainer to="/admin/add-item">
          <Button variant="primary" size="sm" className="px-4 py-1">
            {" "}
            <FaPlus className="me-2 mb-1" />
            Add Item
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
              <th className="text-black border-0">Item Name</th>
              <th className="text-black border-0">Category</th>
              <th className="text-black border-0">Brand Name</th>
              <th className="text-black border-0">Price</th>
              <th className="text-black border-0">Unit</th>
              <th className="text-black border-0">Qty</th>
              <th className="text-black border-0">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <MdOutlineComputer /> Table cell
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <BsEye /> <FiEdit3 /> <FaTrashAlt />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <MdOutlineComputer /> Table cell
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>
                <BsEye /> <FiEdit3 /> <FaTrashAlt />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <MdOutlineComputer /> Table cell
              </td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
              <td>Table cell</td>
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

export default ItemScreen;
