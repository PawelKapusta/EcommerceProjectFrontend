import React, { useContext, useEffect } from "react";
import LoginContext from "../context/LoginContext";

const HomeScreen = () => {
  const { token, email } = useContext(LoginContext);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, []);

  return (
    <div className="App" style={{ marginBottom: 25 }}>
      <h1>Welcome {token !== null ? email : ""} in online shop!</h1>
      <img
        src="https://images.unsplash.com/photo-1612703769284-0103b1e5ef70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
        alt="Home photo"
        loading="lazy"
        width="70%"
      />
    </div>
  );
};

export default HomeScreen;
