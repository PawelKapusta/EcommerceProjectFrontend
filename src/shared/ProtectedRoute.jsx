import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import auth from "../utils/auth";

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  if (!auth.isAuthenticated()) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;