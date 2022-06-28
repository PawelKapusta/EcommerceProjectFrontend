import React, { useState } from "react";
import { http } from "../api/axios";

const getTokenFromStorage = () => {
  return localStorage.getItem("token");
};

const defaultValue = {
  token: "",
  setToken: () => {
    return "";
  },
  email: "",
};

export const loginToApplication = async (username, password) => {
  return await http.post(`/user/login?username=${username}&password=${password}`);
};

export const registerToApplication = async data => {
  return await http.post(`/user/register`, data);
};

export const LoginContext = React.createContext(defaultValue);

export const LoginContextProvider = ({ children }) => {
  const [token, setToken] = useState(getTokenFromStorage());
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [userInfo, setUserInfo] = useState(undefined);
  const [loginError, setLoginError] = useState({});

  const reset = () => {
    setToken(null);
    setUserInfo(null);
    setLoginError(null);
  };

  const providerValue = {
    token,
    setToken,
    userInfo,
    setUserInfo,
    loginError,
    setLoginError,
    reset,
    email,
    setEmail,
  };

  return <LoginContext.Provider value={providerValue}>{children}</LoginContext.Provider>;
};

export default LoginContext;
