import React from "react";
import Sidebar from "../sidebar";

const Users = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Users feature goes here</h1>
      </div>
    </div>
  );
};

export default Users;
