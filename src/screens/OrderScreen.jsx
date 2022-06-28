import React, { useContext, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BasketContext, createOrder } from "../context/BasketContext";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginContext } from "../context/LoginContext";
import Paper from "@mui/material/Paper";
import FormInput from "../components/FormInput";
import InputAdornment from "@mui/material/InputAdornment";
import FaceIcon from "@mui/icons-material/Face";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import { createStyles, makeStyles } from "@mui/styles";
import { useSnackbar } from "notistack";

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
      marginBottom: "10%",
    },
    icon: {
      marginBottom: "50%",
    },
    form: {
      marginTop: "2%",
      marginLeft: "8%",
    },
    loader: {
      marginTop: "3%",
      width: "90%",
    },
    checkout: {
      fontSize: "1.1em",
      background: "linear-gradient(to right, #aaffa9, #11ffbd)",
      border: 0,
      borderRadius: 5,
      boxShadow: "0 3px 5px 2px #A9A9A9",
      color: "#000",
      height: 46,
      padding: "0 15px",
      cursor: "pointer",
      marginTop: 5,
    },
    loginButton: {
      cursor: "pointer",
      fontSize: "1.1rem",
      marginTop: 10,
      marginBottom: 15,
    },
    checkoutBox: {
      background: "background: linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)",
      textAlign: "center",
      marginRight: "5%",
      marginBottom: "3%",
      marginTop: "1%",
    },
    errors: {
      marginLeft: "2%",
      color: "red",
      fontSize: "1.1em",
    },
  }),
);

const OrderScreen = () => {
  const { items, totalPrice, clearBasket } = useContext(BasketContext);
  const { userInfo } = useContext(LoginContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(1000);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const userID = userInfo ? Number(userInfo.ID) : Number(localStorage.getItem("ID"));
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    street: yup.string().required("Street is a required field"),
    nr: yup.string().required("Nr is a required field"),
    city: yup.string().required("City is a required field"),
    code: yup.string().required("Code is a required field"),
    email: yup.string().required("Email is a required field"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  });

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
    if (items.length === 0 || totalPrice === 0) {
      enqueueSnackbar(
        `Please add some products, because your basket is empty! Go to basket now! `,
        { variant: "error", autoHideDuration: 10000 },
      );
    } else {
      const order = {};
      const allItems = [];
      order.UserID = userID;
      order.TotalPrice = parseFloat(totalPrice.toString());
      for (let i = 0; i < items.length; i++) {
        allItems[i] = { ProductID: items[i].product.ID, Quantity: items[i].quantity, OrderID: 0 };
      }
      order.items = allItems;
      order.Street = data.street;
      order.Nr = data.nr;
      order.Code = data.code;
      order.City = data.city;
      order.Phone = data.phone;
      order.Email = data.email;
      localStorage.setItem("orderEmail", order.Email);
      createOrder(order)
        .then(res => {
          setStatus(res?.status);
          if (res?.status === 200) {
            navigate(`/payment/${res?.data?.ID}`);
          }
          clearBasket();
        })
        .catch(error => {
          setStatus(error?.response?.status);
        });
      reset();
    }
  };

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <Paper elevation={3}>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Typography component="div" fontSize={20} gutterBottom marginBottom={1} marginTop={3}>
              Address:
            </Typography>
            <FormInput
              labelTitle="Street"
              name="street"
              control={control}
              register={register}
              errors={errors?.street}
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
              labelTitle="Nr"
              name="nr"
              control={control}
              register={register}
              errors={errors?.nr}
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
              labelTitle="City"
              name="city"
              control={control}
              register={register}
              errors={errors?.city}
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
              labelTitle="Code"
              name="code"
              control={control}
              register={register}
              errors={errors?.code}
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
            <Typography component="div" fontSize={20} gutterBottom marginBottom={1}>
              Additional data:
            </Typography>
            <FormInput
              labelTitle="Email"
              name="email"
              control={control}
              register={register}
              errors={errors?.email}
              setValue={setValue}
              numberRows={1}
              defaultValue={userInfo ? userInfo.email : localStorage.getItem("email")}
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
              labelTitle="Phone"
              name="phone"
              control={control}
              register={register}
              errors={errors?.phone}
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
            <span className={classes.errors}>{status === 500 ? "Error with server" : ""}</span>
            <div className={classes.checkoutBox}>
              <input type="submit" value="Go to checkout" className={classes.checkout} />
            </div>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default OrderScreen;
