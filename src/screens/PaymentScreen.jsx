import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styles from "../styles/Payment.module.css";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51LFLirC3wEnwGyOdlHGhVBe0ohU2J6KmRalLbsYFIvuCwpGCOdvZjvrlLno2xuNGN4HLRNegWS3ozOSbPQaWCO1d00EUUk0JiY");

export default function PaymentScreen() {
  const [clientSecret, setClientSecret] = useState("");
  const param = useParams();

  useEffect(() => {
    fetch("https://ecommerceb.azurewebsites.net/api/v1/payment/" + param.orderID, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: param.orderID }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
  }, [param.orderID]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className={styles.mainDiv}>
      {clientSecret && param.orderID && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
      <br />
      <span className={styles.message}> Stripe is adding a small amount of payment fee!</span>
    </div>
  );
}
