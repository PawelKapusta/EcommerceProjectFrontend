import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductsContext,
  fetchProductById,
  fetchCategoryById,
  fetchCompanyById,
} from "../context/ProductsContext";
import { Button, Container, Grid, Typography } from "@mui/material";
import { BasketContext } from "../context/BasketContext";
import { useSnackbar } from "notistack";
import LinearProgress from "@mui/material/LinearProgress";
import { createStyles, makeStyles } from "@mui/styles";
import LoginContext from "../context/LoginContext";

const useStyles = makeStyles(
  createStyles({
    backButton: {
      marginTop: 15,
    },
    errors: {
      marginLeft: "2%",
      color: "red",
      fontSize: "1.1em",
    },
  }),
);

const ProductsDetailsScreen = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const { token } = useContext(LoginContext);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);

  useEffect(() => {
    setIsLoggedIn(token !== null);
  }, [token]);
  const {
    searchProduct,
    searchCompany,
    searchCategory,
    productError,
    setProductError,
    setCompanyError,
    setCategoryError,
  } = useContext(ProductsContext);
  const { addItem } = useContext(BasketContext);
  const [product, setProduct] = useState(searchProduct(id));
  const [company, setCompany] = useState(searchCompany(product?.companyid));
  const [category, setCategory] = useState(searchCategory(product?.categoryid));

  useEffect(() => {
    if (id) {
      const byId = searchProduct(id);
      if (byId) {
        setProduct(byId);
        searchCompany(product?.companyid);
        searchCategory(product?.categoryid);
      } else {
        fetchProductById(Number(id))
          .then(res => {
            setProduct(res?.data);
            fetchCompanyById(Number(res?.data?.companyid))
              .then(re => setCompany(re?.data))
              .catch(error => setCompanyError(error?.response?.data));
            fetchCategoryById(Number(res?.data?.categoryid))
              .then(r => setCategory(r?.data))
              .catch(error => setCategoryError(error?.response?.data));
          })
          .catch(error => setProductError(error?.response?.data));
      }
    }
  }, [setProduct]);

  const handleAddItem = () => {
    if (product) {
      addItem(product);
      enqueueSnackbar("Successfully added to basket!", { variant: "success" });
    }
  };

  const AddToCart = isLoggedIn ? (
    <Button
      variant="contained"
      sx={{ background: "linear-gradient(to right, #ff0099, #493240)" }}
      fullWidth
      disableElevation
      onClick={handleAddItem}
    >
      Add to cart
    </Button>
  ) : (
    ""
  );

  const checkError = productError && productError?.message ? productError?.message : "";

  return (
    <Container>
      {product ? (
        <div>
          <Grid container spacing={12} justifyContent="space-between" marginTop={3}>
            <Grid item xs={6}>
              <Grid container justifyContent="center">
                <img
                  src={`${product.imageUrl}`}
                  alt={product.name + " photo"}
                  loading="lazy"
                  style={{ width: "600px" }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Typography component="div" variant="h5" gutterBottom marginBottom={2}>
                {product.name}
              </Typography>
              <Typography component="div" fontSize={20} gutterBottom marginBottom={1}>
                Description of the product:
              </Typography>
              <Typography marginBottom={3} variant="body1">
                {product.description}
              </Typography>
              <Typography marginBottom={3} variant="body1">
                <b>Price:</b> {product.price} zł
              </Typography>
              <Typography marginBottom={3} variant="body1">
                <b>Company:</b> {company?.name}
              </Typography>
              <Typography marginBottom={10} variant="body1">
                <b>Category:</b> {category?.name}
              </Typography>
              {AddToCart}
            </Grid>
          </Grid>
        </div>
      ) : (
        <LinearProgress />
      )}
      {productError && productError?.code === 403 ? (
        <span className={classes.errors}>Error: {checkError}</span>
      ) : (
        ""
      )}
    </Container>
  );
};

export default ProductsDetailsScreen;
