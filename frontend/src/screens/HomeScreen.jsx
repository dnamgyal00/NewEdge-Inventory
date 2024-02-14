import React from "react";
import InventoryStats from "../components/InventoryStats";
import RecentTransactions from "../components/RecentTransactions";
import Charts from "../components/Charts";

const HomeScreen = () => {
  return (
    <>
      <div className="content pt-2">
        <InventoryStats />
        <Charts />
        <RecentTransactions />
      </div>
    </>
  );
};

export default HomeScreen;
