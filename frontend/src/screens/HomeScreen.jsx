import React from "react";
// import { Row, Col, Container } from 'react-bootstrap';
import Sidebar from "../components/Sidebar";
import InventoryStats from "../components/InventoryStats";
import RecentTransactions from "../components/RecentTransactions";
import Charts from "../components/Charts";

const HomeScreen = () => {
  return (
    <div className="content">
      <InventoryStats />
      <Charts />
      <RecentTransactions />
    </div>
  );
};

export default HomeScreen;
