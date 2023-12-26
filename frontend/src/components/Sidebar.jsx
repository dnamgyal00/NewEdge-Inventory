// Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import {
  AiOutlineShopping,
  AiOutlineStock,
  AiOutlineFileText,
} from "react-icons/ai";
import { BsPlus, BsListUl, BsClipboardData } from "react-icons/bs";

const Sidebar = () => {
  return (
    <Nav
      className="flex-column sidebar bg-white navbar-light"
      // style={{ backgroundColor: "white" }}
    >
      {/* Product Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold">
          <AiOutlineShopping className="ml-2" />
          Product
        </Nav.Link>
        <Nav className="ml-3 flex-column sub-list">
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Item List
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Add Item
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Category List
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Add Category
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Nav.Item>

      {/* Transaction Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold">
          <AiOutlineStock className="mr-2" />
          Transaction
        </Nav.Link>
        <Nav className="ml-3 flex-column sub-list">
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Transaction History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Stock In
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Stock Out
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Nav.Item>

      {/* Report Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold">
          <AiOutlineFileText className="mr-2" />
          Report
        </Nav.Link>
        <Nav className="ml-3 flex-column sub-list">
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Inventory Report
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#" className="ml-3">
              Schedule Report
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Nav.Item>
    </Nav>
  );
};

export default Sidebar;
