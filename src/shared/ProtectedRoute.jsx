import React, { useContext, useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const { token } = useContext(LoginContext);
  const [state, setState] = useState(token !== null);
  useEffect(() => {
    setState(token !== null);
  }, [token]);

  if (!state) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
