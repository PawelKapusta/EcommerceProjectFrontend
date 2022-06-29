import React, { useContext, useEffect } from "react";
import loginContext from "../context/LoginContext";
import { useNavigate, useParams } from "react-router-dom";

const GithubAcceptLoginScreen = () => {
  const { setEmail, setToken } = useContext(loginContext);
  const { token, email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(token);
    localStorage.setItem("token", token);
    setEmail(email);
  });

  return (
    <div>
      <h1>Successfully loged in with Github account!</h1>
      Redirecting to main page in 3 ... 2 ... 1{navigate("/")}
    </div>
  );
};

export default GithubAcceptLoginScreen;
