import React, { useState } from "react";
import { httpProtected } from "../api/axios";

const defaultValue = {
  totalPrice: 0,
  items: [],
};

export const BasketContext = React.createContext(defaultValue);

export const createOrder = async data => {
  return httpProtected(localStorage.getItem("token")).post("/order", data);
};

export const createPayment = amount => http.post("/payment", { amount });

export const BasketContextProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryFee = 2.2;

  const addItem = newProduct => {
    if (items.map(({ product }) => product.ID).includes(newProduct.ID)) {
      setItems(prev =>
        prev.map(({ product, quantity }) => {
          return product.ID === newProduct.ID
            ? { product, quantity: quantity + 1 }
            : { product, quantity };
        }),
      );
    } else {
      setItems(prev => [...prev, { product: newProduct, quantity: 1 }]);
    }
  };

  const removeItem = (productId, all) => {
    setItems(prev =>
      prev
        .map(({ product, quantity }) => {
          if (product.ID === productId) {
            return all ? { product, quantity: 0 } : { product, quantity: quantity - 1 };
          }
          return { product, quantity };
        })
        .filter(({ quantity }) => !!quantity),
    );
  };

  const calculateTotalPrice = () => {
    let temp = 0;
    for (let item of items ) {
      temp += item?.product?.price * item.quantity;
    }

    setTotalPrice(temp + deliveryFee);
  };

  const clearBasket = () => {
    setItems([]);
    setTotalPrice(0);
  };

  return (
    <BasketContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        calculateTotalPrice,
        totalPrice,
        clearBasket,
        deliveryFee,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
