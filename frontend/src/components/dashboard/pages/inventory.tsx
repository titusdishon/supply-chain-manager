import React from "react";
import Sidebar from "../sidebar";

const Inventory = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Inventory feature goes here</h1>
      </div>
    </div>
  );
};

export default Inventory;