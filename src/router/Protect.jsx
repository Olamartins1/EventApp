// src/routes/Protect.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../assets/AuthContext/AuthContext";

const Protect = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
console.log("auth user check",user)
  if (loading) {
    return <div>Loading...</div>;
  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default Protect;
