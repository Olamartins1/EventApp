import React from "react";
import Header from "../static/Header";
import SideBar from "../static/SideBar";
import { Outlet } from "react-router-dom";

const Dashboardlayout = () => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <SideBar />
      <div style={{ width: "100%" }}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboardlayout;
