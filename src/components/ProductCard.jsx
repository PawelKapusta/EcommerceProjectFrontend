import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 355 }} elevation={0} style={{ marginBottom: 20 }}>
      <CardActionArea onClick={() => navigate(`/products/${product.ID}`)}>
        <CardMedia component="img" height={400} image={product.imageUrl} alt="blouse" />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {product.name}
          </Typography>
          <Grid container justifyContent="space-between">
            <Typography variant="body1">{product.allquantity}</Typography>
            <Typography variant="button">{product.price} PLN</Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
