import React, { useContext, useEffect } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { BasketContext } from "../context/BasketContext";
import BasketItem from "../components/BasketItem";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const BasketScreen = () => {
  const { items, totalPrice, calculateTotalPrice } = useContext(BasketContext);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalPrice();
  }, [items]);

  const handleBuyButton = async () => {
    navigate("/order");
  };

  return (
    <Container maxWidth="sm" style={{ height: "82vh" }}>
      <Typography variant="h3" marginTop={10} marginBottom={3}>
        Basket
      </Typography>

      {items.length === 0 ? (
        <Typography variant="h5" marginTop={10} marginBottom={3} marginLeft={25} color="secondary">
          No items here!
        </Typography>
      ) : (
        items?.map((item, index) => (
          <Box key={item.product.ID}>
            <BasketItem key={item.product.ID} item={item} />
            {index < items.length - 1 && <Divider />}
          </Box>
        ))
      )}
      <Typography variant="h6" marginTop={10} marginBottom={3} color="primary">
        {totalPrice ? `Total price: ${totalPrice} zł` : ""}
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
