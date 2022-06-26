import React, {useEffect,useContext} from 'react';
import auth from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import LoginContext from "../context/LoginContext";

const LogoutScreen = () => {
  const { token, reset } = useContext(LoginContext)
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('token')
    reset()
  }, [token])

  return (
   <div>
     Logout successfully
   </div>
  );
};

export default LogoutScreen;
