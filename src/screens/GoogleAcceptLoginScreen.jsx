import React, { useContext, useEffect } from "react";
import loginContext from "../context/LoginContext";
import { useNavigate, useParams } from "react-router-dom";

const GoogleAcceptLoginScreen = () => {
  const { setToken, setEmail } = useContext(loginContext);
  const { token, email } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(token);
    setEmail(email);
  });

  return (
    <div>
      <h1>Successfully loged in with Google account!</h1>
      Redirecting to main page in 3 ... 2 ... 1{navigate("/")}
    </div>
  );
};

export default GoogleAcceptLoginScreen;
