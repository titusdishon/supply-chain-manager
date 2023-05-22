import React from "react";
import Sidebar from "./sidebar";
import { InfoAlert } from "../shared/alerts";

const Home: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-7 w-full">
        <InfoAlert message="This can hold data analysis and some other catchy system insights" />{" "}
      </div>
    </div>
  );
};

export default Home;
