import styled from "styled-components";
import AdminSideBar from "../static/AdminSideBar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../static/AdminHeader";

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", width: "100%" }}>
      <AdminSideBar />
      <div style={{ width: "100%" }}>
        <AdminHeader />
        <Outlet style={{ height: "100%" }} />
      </div>
    </div>
  );
};

export default AdminDashboard;
