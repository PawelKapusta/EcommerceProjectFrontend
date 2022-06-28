import React, { useContext, useEffect, useState } from "react";
import RegisterCard from "../components/RegisterCard";
import LoginContext from "../context/LoginContext";
import { Navigate } from "react-router-dom";

const RegisterScreen = () => {
  const { token } = useContext(LoginContext);
  const [state, setState] = useState(token !== null);
  useEffect(() => {
    setState(token !== null);
  }, [token]);
  return <div>{state ? <Navigate to="/" replace /> : <RegisterCard />} </div>;
};

export default RegisterScreen;
