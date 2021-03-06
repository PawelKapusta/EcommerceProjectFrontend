import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createStyles, makeStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormInput from "./FormInput";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import { LoginContext, loginToApplication } from "../context/LoginContext";
import googleIcon from "../assets/icons/google.png";
import githubIcon from "../assets/icons/github.png";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        marginTop: "7%",
        margin: "auto",
        backgroundColor: "#ffffff",
      },
      height: "82vh",
    },
    box: {
      display: "flex",
      flexDirection: "column",
      [theme.breakpoints.up("sm")]: {
        width: "70%",
      },
      [theme.breakpoints.up("md")]: {
        width: "60%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "40%",
      },
      borderColor: "black",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 100,
      backgroundColor: "transparent",
    },
    title: {
      textAlign: "center",
      fontSize: 30,
    },
    form: {
      marginTop: "2%",
      marginLeft: "8%",
    },
    label: {
      marginTop: 10,
      marginBottom: 10,
      fontSize: "1.3em",
    },
    login: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #b2fefa, #0ed2f7)",
      marginTop: "1%",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 46,
      padding: "0 30px",
      cursor: "pointer",
    },
    icon: {
      marginBottom: 13,
    },
    loginBox: {
      textAlign: "center",
      marginRight: "5%",
      marginTop: "1%",
      marginBottom: "2%",
    },
    toRegister: {
      marginTop: 10,
      cursor: "pointer",
      fontSize: "1.1rem",
    },
    errors: {
      marginLeft: "2%",
      color: "red",
      fontSize: "1.1em",
    },
    links: {
      marginBottom: 15,
    },
  }),
);

const LoginCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo, setToken, loginError, setLoginError, setEmail } = useContext(LoginContext);
  const classes = useStyles();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup.string().required("Username is a required field"),
    password: yup.string().required("Password is a required field"),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = data => {
    loginToApplication(data.username, data.password)
      .then(res => {
        setToken(res?.data?.token);
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("ID", res?.data?.user?.ID);
        setUserInfo(res?.data?.user);
        setEmail(res?.data?.user?.email);
      })
      .catch(error => {
        setLoginError(error?.response?.data);
      });
    reset();
  };

  const handleRedirectClick = () => {
    navigate("/register");
  };

  const handleRedirectGoogleClick = () => {
    navigate("/login/auth/google");
  };

  const handleRedirectGithubClick = () => {
    navigate("/login/auth/github");
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <Paper elevation={3}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              labelTitle="Username"
              name="username"
              control={control}
              register={register}
              setValue={setValue}
              errors={errors?.username}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Password"
              name="password"
              control={control}
              register={register}
              errors={errors?.password}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon className={classes.icon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
            />
            <span className={classes.errors}>
              {loginError && loginError?.code === 404 ? loginError?.message : ""}
            </span>
            <div className={classes.loginBox}>
              <input type="submit" value="Login" className={classes.login} />
            </div>
            <div className={classes.links}>
              <Link
                className={classes.toRegister}
                variant="outlined"
                onClick={handleRedirectGoogleClick}
              >
                <img src={googleIcon} alt="googleIcon" style={{ width: "20px", marginRight: 5 }} />{" "}
                Login by Google account
              </Link>
            </div>
            <div className={classes.links}>
              <Link
                className={classes.toRegister}
                variant="outlined"
                onClick={handleRedirectGithubClick}
              >
                <img src={githubIcon} alt="githubIcon" style={{ width: "20px", marginRight: 5 }} />
                Login by Github account
              </Link>
            </div>
          </form>
        </Paper>
        <Link className={classes.toRegister} variant="outlined" onClick={handleRedirectClick}>
          You don't have an account? Please register here
        </Link>
      </Box>
    </div>
  );
};

export default LoginCard;
