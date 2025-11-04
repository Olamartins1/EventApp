import React from 'react'
import AdminHeader from "../static/AdminHeader" 
import { Outlet } from "react-router-dom";
import AdminSideBar from "../static/AdminSideBar"

const AdminDashboard = () => {
  return (
    <div style={{ display: "flex", width: "100%"}}>
      <AdminSideBar />
      <div style={{ width: "100%" }}>
        <AdminHeader />
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard