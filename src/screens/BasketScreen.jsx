import React, { useContext, useEffect } from "react";
import { Box, Divider, Container, Typography } from "@mui/material";
import { BasketContext } from "../context/BasketContext";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { createStyles, makeStyles } from "@mui/styles";
import BasketItem from "../components/BasketItem";

const useStyles = makeStyles(
  createStyles({
    toProducts: {
      marginTop: 10,
      marginLeft: 8,
      cursor: "pointer",
      fontSize: "1.2rem",
      fontWeight: 600,
    },
  }),
);

const BasketScreen = () => {
  const { items, totalPrice, calculateTotalPrice, deliveryFee } = useContext(BasketContext);
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    calculateTotalPrice();
  }, [items]);

  const handleBuyButton = async () => {
    navigate("/order");
  };

  const handleRedirectToProducts = async () => {
    navigate("/products");
  };

  return (
    <Container maxWidth="sm" style={{ height: "82vh" }}>
      <Typography variant="h3" marginTop={10} marginBottom={3}>
        Basket
      </Typography>
      {items.length === 0 ? (
        <div>
          <Typography variant="h5" marginTop={8} marginBottom={3} marginLeft={25} color="secondary">
            No items!
          </Typography>
          <Typography variant="h6" marginTop={6} marginBottom={3} color="grey">
            If you want to buy something, please go
            <Link
              className={classes.toProducts}
              variant="outlined"
              onClick={handleRedirectToProducts}
            >
              {" "}
              here
            </Link>
          </Typography>
        </div>
      ) : (
        items?.map((item, index) => (
          <Box key={item.product.ID}>
            <BasketItem key={item.product.ID} item={item} />
            {index < items.length - 1 && <Divider />}
          </Box>
        ))
      )}
      <Typography variant="h6" marginTop={10} marginBottom={3} color="#000">
        {totalPrice > deliveryFee ? `Delivery fee costs 2.2 zł` : ""}
      </Typography>
      <Typography variant="h6" marginTop={3} marginBottom={3} color="primary">
        {totalPrice > deliveryFee ? `Total price: ${totalPrice} zł` : ""}
      </Typography>
      {items.length !== 0 ? (
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          onClick={() => handleBuyButton()}
        >
          Go to address
        </Button>
      ) : (
        ""
      )}
    </Container>
  );
};

export default BasketScreen;
