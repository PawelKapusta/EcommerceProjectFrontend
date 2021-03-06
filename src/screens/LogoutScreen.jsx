import React, { useEffect, useContext } from "react";
import LoginContext from "../context/LoginContext";

const LogoutScreen = () => {
  const { token, reset } = useContext(LoginContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("ID");
    localStorage.removeItem("orderEmail");
    reset();
  }, [token]);

  return <div>Logout successfully</div>;
};

export default LogoutScreen;
