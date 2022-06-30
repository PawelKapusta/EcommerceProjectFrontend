import React, { useState } from "react";
import { http, httpProtected } from "../api/axios";

const defaultState = {
  products: [],
};

export const ProductsContext = React.createContext(defaultState);

export const fetchProducts = async () => {
  return http.get(`/product`);
};

export const fetchCompanies = async () => {
  return http.get(`/company`);
};

export const fetchCategories = async () => {
  return http.get(`/category`);
};

export const fetchProductById = id => http.get(`/product/${id}`);

export const fetchCompanyById = id => http.get(`/company/${id}`);

export const fetchCategoryById = id => http.get(`/category/${id}`);

export const fetchOrderOfUSer = id =>
  httpProtected(localStorage.getItem("token")).get(`/order/user?userId=${id}`);

export const fetchOrderProductsByOrderId = id =>
  httpProtected(localStorage.getItem("token")).get(`/orderproduct/${id}`);

export const ProductsContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [productError, setProductError] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [orders, setOrders] = useState([]);

  const searchProduct = id => {
    for (let product of products) {
      if (product.ID === Number(id)) {
        return product;
      }
    }
  };

  const searchCompany = id => {
    for (let company of companies) {
      if (company.ID === Number(id)) {
        return company;
      }
    }
  };

  const searchCategory = id => {
    for (let category of categories) {
      if (category.ID === Number(id)) {
        return category;
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
    orders,
    setOrders,
  };

  return <ProductsContext.Provider value={providerValue}>{children}</ProductsContext.Provider>;
};
