import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import {
  ProductsContext,
  fetchProducts,
  fetchCompanies,
  fetchCategories,
} from "../context/ProductsContext";

const ProductsScreen = () => {
  const { products, setProducts, setCompanies, setCategories } = useContext(ProductsContext);

  useEffect(() => {
    fetchProducts().then(res => setProducts(res?.data));
    fetchCompanies().then(res => setCompanies(res?.data));
    fetchCategories().then(res => setCategories(res?.data));
  }, []);

  return (
    <Container>
      <Grid container spacing={2} marginTop={10}>
        {products?.map(product => (
          <Grid key={product.ID} item lg={3} md={4}>
            <ProductCard product={product} key={product.ID} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductsScreen;
