import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const LogoutScreen = () => {
  const { token, reset } = useContext(LoginContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("ID");
    reset();
  }, [token]);

  return <div>Logout successfully</div>;
};

export default LogoutScreen;
