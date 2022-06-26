import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Logo from "../assets/Logo.svg";
import LoginContext from "../context/LoginContext";

const headersData = isLoggedIn => [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
  {
    label: <ShoppingBasketIcon />,
    href: "/basket",
  },
  {
    label: isLoggedIn ? "Profile" : "Login",
    href: isLoggedIn ? "/profile" : "/login",
  },
  {
    label: isLoggedIn ? "LogOut" : "Register",
    href: isLoggedIn ? "/logout" : "/register",
  },
];

const Header = () => {
  const { token } = useContext(LoginContext);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem('token') != null);
  // })

  const displayDesktop = () => {
    return (
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <img src={Logo} alt="logo" width="60" height="60" />
        <div>{getMenuButtons()}</div>
      </Toolbar>
    );
  };

  const getMenuButtons = () => {
    return headersData(isLoggedIn).map(({ label, href }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            to: href,
            component: RouterLink,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar
        sx={{
          position: "relative",
          color: "black",
          backgroundColor: theme =>
            theme.palette.mode === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
        }}
      >
        {displayDesktop()}
      </AppBar>
    </header>
  );
};

export default Header;
