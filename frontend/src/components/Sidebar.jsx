// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import {
  AiOutlineShopping,
  AiOutlineStock,
  AiOutlineFileText,
} from 'react-icons/ai';
import { BsPlus, BsListUl, BsClipboardData } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <Nav className="flex-column sidebar bg-secondary bg-gradient" style={{ backgroundColor: 'gray' }}>
      {/* Product Section */}
      <Nav.Item>
        <Nav.Link href="#">
          <AiOutlineShopping className="ml-1" />
          Product
        </Nav.Link>
        <Nav className="ml-0 flex-column">
          <Nav.Item>
            <Nav.Link href="#" className="ml-auto pl-0">
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
        <Nav.Link href="#">
          <AiOutlineStock className="mr-2" />
          Transaction
        </Nav.Link>
        <Nav className="ml-3 flex-column">
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
        <Nav.Link href="#">
          <AiOutlineFileText className="mr-2" />
          Report
        </Nav.Link>
        <Nav className="ml-3 flex-column">
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
