import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

const PaymentSuccessScreen = () => {
  const [params] = useSearchParams();
  const status = params.get("redirect_status");
  const paymentId = params.get("payment_intent");
  const param = useParams();
  const email = localStorage.getItem("orderEmail")
    ? localStorage.getItem("orderEmail")
    : localStorage.getItem("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "succeeded") {
      fetch("http://localhost:8080/api/v1/order/" + param.orderID + "/" + email + "/" + paymentId, {
        method: "POST",
      }).then(res => res.json());
    }
  }, [email, param.orderID, paymentId, status]);

  useEffect(() => {
    localStorage.removeItem("orderEmail");
  }, []);

  const handleRedirectToOrders = () => {
    navigate("/profile");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="https://m.media-amazon.com/images/I/41Gb3UOjT5L.jpg" alt="ThankYouImage" />
      </div>
      <Typography style={{ display: "flex", justifyContent: "center" }} variant="h6" color="grey">
        If you want to see your orders click
        <Link
          style={{
            marginLeft: 8,
            cursor: "pointer",
            fontSize: "1.2rem",
            fontWeight: 600,
          }}
          variant="outlined"
          onClick={handleRedirectToOrders}
        >
          {" "}
          here
        </Link>
      </Typography>
    </div>
  );
};

export default PaymentSuccessScreen;
