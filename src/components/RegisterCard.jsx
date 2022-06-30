import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputAdornment from "@mui/material/InputAdornment";
import FormInput from "./FormInput";
import IconButton from "@mui/material/IconButton";
import FaceIcon from "@mui/icons-material/Face";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "@mui/material/Link";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import { registerSchema as schema } from "../styles/Form";
import { registerToApplication } from "../context/LoginContext";
import { useStyles } from "../styles/Form";

const RegisterCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const navigate = useNavigate();
  const [status, setStatus] = useState(1000);

  useEffect(() => {
    if (status === 200) {
      navigate("/login");
    }
  }, [status]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    data.Service = "Application";
    registerToApplication(data)
      .then(res => {
        setStatus(res?.status);
      })
      .catch(error => {
        setStatus(error?.response?.status);
      });
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleRedirectClick = () => {
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <Paper elevation={3}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              labelTitle="Name"
              name="name"
              control={control}
              register={register}
              errors={errors?.name}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaceIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Surname"
              name="surname"
              control={control}
              register={register}
              errors={errors?.surname}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PeopleIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="text"
            />
            <FormInput
              labelTitle="Username"
              name="username"
              control={control}
              register={register}
              errors={errors?.username}
              setValue={setValue}
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
              labelTitle="Email"
              name="email"
              control={control}
              register={register}
              errors={errors?.email}
              setValue={setValue}
              numberRows={1}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              type="email"
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
            <FormInput
              labelTitle="Confirmed password"
              name="confirmPassword"
              control={control}
              register={register}
              errors={errors?.confirmPassword}
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
              {status === 500 ? "User with this username or email is already exist" : ""}
            </span>
            <div className={classes.registerBox}>
              <input type="submit" value="Register" className={classes.register} />
            </div>
          </form>
        </Paper>
        <Link className={classes.loginButton} variant="outlined" onClick={handleRedirectClick}>
          You have already an account?
        </Link>
      </Box>
    </div>
  );
};

export default RegisterCard;
