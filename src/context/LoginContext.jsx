import React, { useState } from "react";
import http from "../api/axios";
import auth from "../utils/auth";

const getTokenFromStorage = () => {
  console.log( localStorage.getItem('token'), "xxxxxxxxxx")
  return localStorage.getItem('token');
};

const defaultValue = {
  token: "",
  setToken: () => {return 'a';},
};

export const loginToApplication = async (username, password) => {
  return await http.post(`/user/login?username=${username}&password=${password}`);
};

export const registerToApplication = async () => {
  return await http.post(`/user/register`);
};

export const LoginContext = React.createContext(defaultValue);

export const LoginContextProvider = ({ children }) => {
  const [token, setToken] = useState(getTokenFromStorage());
  const [userInfo, setUserInfo] = useState({});
  const [loginError, setLoginError] = useState({});
  console.log("kontekst", token)
  const reset = () => {
    setToken(null);
    setUserInfo(null);
    setLoginError(null);
  }


  const providerValue = {
    token,
    setToken,
    userInfo,
    setUserInfo,
    loginError,
    setLoginError,
    reset
  };

  return <LoginContext.Provider value={providerValue}>{children}</LoginContext.Provider>;
};

export default LoginContext;
