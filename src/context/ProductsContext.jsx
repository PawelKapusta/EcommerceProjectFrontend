import React, { useState } from "react";
import http from "../api/axios";

const defaultState = {
  products: [],
  setProducts: () => {},
  search: () => {
    return {};
  },
};

export const ProductsContext = React.createContext(defaultState);

export const fetchProducts = async () => {
  return await http.get(`/product`);
};

export const fetchCompanies = async () => {
  return await http.get(`/company`);
};

export const fetchCategories = async () => {
  return await http.get(`/category`);
};

export const fetchProductById = id => http.get(`/product/${id}`);

export const fetchCompanyById = id => http.get(`/company/${id}`);

export const fetchCategoryById = id => http.get(`/category/${id}`);

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [productError, setProductError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const searchProduct = id => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].ID === Number(id)) {
        return products[i];
      }
    }
  };

  const searchCompany = id => {
    for (let i = 0; i < companies.length; i++) {
      if (companies[i].ID === Number(id)) {
        return companies[i];
      }
    }
  };

  const searchCategory = id => {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].ID === Number(id)) {
        return categories[i];
      }
    }
  };

  const providerValue = {
    products,
    setProducts,
    singleProduct,
    setSingleProduct,
    searchProduct,
    searchCompany,
    searchCategory,
    productError,
    setProductError,
    companyError,
    setCompanyError,
    companies,
    setCompanies,
    categories,
    setCategories,
    categoryError,
    setCategoryError,
  };

  return <ProductsContext.Provider value={providerValue}>{children}</ProductsContext.Provider>;
};
