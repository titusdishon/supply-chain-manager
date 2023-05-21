import React from "react";
import Sidebar from "./sidebar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Dashboard page</h1>
      </div>
    </div>
  );
};

export default Dashboard;
