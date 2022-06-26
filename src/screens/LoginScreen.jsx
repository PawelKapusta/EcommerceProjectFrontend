import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import LoginContext from "../context/LoginContext";

const LoginScreen = () => {
  const { token } = useContext(LoginContext);
  const [state, setState] = useState(token !== null);
  useEffect(() => {
    setState(token !== null);
  }, [token]);
  return <div>{state ? <Navigate to="/" replace /> : <LoginCard />} </div>;
};

export default LoginScreen;
