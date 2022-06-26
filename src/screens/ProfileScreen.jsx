import React, { useContext, useEffect } from "react";
import loginContext from "../context/LoginContext";
import { useNavigate, useParams } from "react-router-dom";

const ProfileScreen = () => {
  const { setToken, setEmail } = useContext(loginContext);

  return (
    <div>
      <h1>ProfileScreen</h1>
    </div>
  );
};

export default ProfileScreen;
