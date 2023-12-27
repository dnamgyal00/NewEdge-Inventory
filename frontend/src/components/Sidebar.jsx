// Sidebar.js
import React from "react";
import { Nav } from "react-bootstrap";
import {
  AiOutlineShopping,
  AiOutlineStock,
  AiOutlineFileText,
  AiOutlineAppstore,
} from "react-icons/ai";
import { BsPlus, BsListUl, BsClipboardData } from "react-icons/bs";

const Sidebar = () => {
  return (
    <Nav
      className="flex-column sidebar bg-white navbar-light ml-0 mr-0"
      style={{ lineHeight: "1" }}
      // style={{ backgroundColor: "white" }}
    >
      {/* Product Section */}
      <Nav.Item>
        <Nav.Link to="#" className="fw-bold pb-0">
          <AiOutlineAppstore className="me-1" size={19} />
          Dashboard
        </Nav.Link>
        <Nav className="ml-3 flex-column sub-list">
          <hr />
        </Nav>
      </Nav.Item>

      {/* Product Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold py-0">
          <AiOutlineShopping className="me-1 mb-1" size={19} />
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
            <Nav.Link href="/category/add" className="ml-3">
              Add Category
            </Nav.Link>
          </Nav.Item>
          <hr />
        </Nav>
      </Nav.Item>

      {/* Transaction Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold py-0">
          <AiOutlineStock className="me-1 mb-1" size={19} />
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
          <hr />
        </Nav>
      </Nav.Item>

      {/* Report Section */}
      <Nav.Item>
        <Nav.Link href="#" className="fw-bold py-0">
          <AiOutlineFileText className="me-1 mb-1" size={19} />
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
