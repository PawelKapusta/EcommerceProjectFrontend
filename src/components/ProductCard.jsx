import React, { useContext, useEffect, useState } from "react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ maxWidth: 355 }}
      elevation={0}
      style={{ marginBottom: 20 }}
      variant="outlined"
      key={product.ID}
    >
      <CardActionArea onClick={() => navigate(`/products/${product.ID}`)}>
        <CardMedia component="img" height={400} image={product.imageUrl} alt="blouse" />
        <CardContent>
          <Typography variant="subtitle1">{product.name}</Typography>
          <Typography variant="subtitle1" style={{ position: "absolute", right: 20, top: 20 }}>
            {product.price} PLN
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
