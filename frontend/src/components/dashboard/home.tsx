import React from "react";
import Sidebar from "./sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Home page features goes here</h1>
      </div>
    </div>
  );
};

export default Home;
