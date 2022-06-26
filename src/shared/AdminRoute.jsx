import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../utils/auth";

const AdminRoute = ({ redirectPath = "/", children }) => {
  if (!(auth.isAuthenticated() /*Here check user data if user is admin*/)) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
