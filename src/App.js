import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import ErrorScreen from "./screens/ErrorScreen";
import Header from "./components/Header";
import { responsiveFontSizes } from "@mui/material/styles";
import { ProductsContextProvider } from "./context/ProductsContext";
import { BasketContextProvider } from "./context/BasketContext";
import { SnackbarProvider } from "notistack";
import ProductsScreen from "./screens/ProductsScreen";
import ProductsDetailsScreen from "./screens/ProductsDetailsScreen";
import BasketScreen from "./screens/BasketScreen";
import PaymentScreen from "./screens/PaymentScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import GoogleLoginScreen from "./screens/GoogleLoginScreen";
import GoogleAcceptLoginScreen from "./screens/GoogleAcceptLoginScreen";
import { LoginContextProvider } from "./context/LoginContext";
import GithubLoginScreen from "./screens/GithubLoginScreen";
import GithubAcceptLoginScreen from "./screens/GithubAcceptLoginScreen";
import ProtectedRoute from "./shared/ProtectedRoute";
import LogoutScreen from "./screens/LogoutScreen";
import ProfileScreen from "./screens/ProfileScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import Footer from "./components/Footer";

const App = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  const AppContextProvider = ({ children }) => (
    <LoginContextProvider>
      <ProductsContextProvider>
        <BasketContextProvider>
          <SnackbarProvider maxSnack={5} variant="success" autoHideDuration={800}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </SnackbarProvider>
        </BasketContextProvider>
      </ProductsContextProvider>
    </LoginContextProvider>
  );

  return (
    <BrowserRouter>
      <AppContextProvider>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Routes>
              <Route exact path="/" element={<HomeScreen />} />
              <Route exact path="/products" element={<ProductsScreen />} />
              <Route exact path="/products/:id" element={<ProductsDetailsScreen />} />

              <Route path="/basket/payment" element={<PaymentScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/login/auth/google" element={<GoogleLoginScreen />} />
              <Route
                path="/login/auth/google/:token&:email"
                element={<GoogleAcceptLoginScreen />}
              />
              <Route path="/login/auth/github" element={<GithubLoginScreen />} />
              <Route
                path="/login/auth/github/:token&:email"
                element={<GithubAcceptLoginScreen />}
              />
              <Route path="/register" element={<RegisterScreen />} />

              <Route
                path="/basket"
                element={
                  <ProtectedRoute>
                    <BasketScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetailsScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payment/:orderID"
                element={
                  <ProtectedRoute>
                    <PaymentScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/paymentSuccess/:orderID"
                element={
                  <ProtectedRoute>
                    <PaymentSuccessScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <ProtectedRoute>
                    <LogoutScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<ErrorScreen />} />
            </Routes>
            <Footer />
          </Box>
        </ThemeProvider>
      </AppContextProvider>
    </BrowserRouter>
  );
};

export default App;
