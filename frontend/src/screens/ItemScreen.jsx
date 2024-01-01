import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { FaPlus } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import axios from "axios";

const ItemScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("http://192.168.131.147:3001/api/item");
      setItems(data.data); // Update to setItems
    };
    fetchItems();
  }, []);

  console.log(items)

  return (
    <div className="col-sm-12 col-xl-6 w-100">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5 className="text-black mb-0"> Item List</h5>
          Manage your item
        </div>
        <Button variant="primary" size="sm" className="px-4 py-1">
          {" "}
          <FaPlus className="me-2 mb-1" />
          Add Item
        </Button>
      </div>

      <div className="bg-white rounded p-4">
        <div>
          <FiFilter />
        </div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Brand Name</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category.name}</td>
                <td>{item.brand}</td>
                <td>{item.unit_price}</td>
                <td>{item.unit}</td>
                <td>{item.qty_on_hand}</td>
                <td>test</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ItemScreen;
