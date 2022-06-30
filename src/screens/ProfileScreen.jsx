import React, { useContext, useEffect, useState } from "react";
import { getUserInfoAboutUser, LoginContext } from "../context/LoginContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import FormInput from "../components/FormInput";
import InputAdornment from "@mui/material/InputAdornment";
import FaceIcon from "@mui/icons-material/Face";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { useStyles, userSchema as schema } from "../styles/Form";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ListOrders from "../components/ListOrders";
import {
  fetchOrderOfUSer,
  fetchOrderProductsByOrderId,
  ProductsContext,
} from "../context/ProductsContext";

const ProfileScreen = () => {
  const { userInfo, setUserInfo } = useContext(LoginContext);
  const { orders, setOrders } = useContext(ProductsContext);
  const email = userInfo ? userInfo?.email : localStorage.getItem("email");
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (userInfo === undefined) {
      getUserInfoAboutUser(email).then(res => setUserInfo(res?.data?.user));
    }
    fetchOrderOfUSer(localStorage.getItem("ID")).then(res => {
      setOrders(res?.data);
      for (let i = 0; i < res?.data?.length; i++) {
        fetchOrderProductsByOrderId(res?.data[i].ID).then(re => {
          let newArray = [...orders];
          newArray[i].items = re?.data;
          setOrders(newArray);
        });
      }
    });
  }, []);

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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = async _data => {
    reset();
  };

  return (
    <div>
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
                defaultValue={userInfo?.name}
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
                defaultValue={userInfo?.surname}
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
                defaultValue={userInfo?.username}
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
                defaultValue={userInfo?.email}
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
              <div className={classes.editBox}>
                <input type="submit" value="Edit user" className={classes.edit} />
              </div>
            </form>
          </Paper>
        </Box>
      </div>
      <ListOrders />
    </div>
  );
};

export default ProfileScreen;
