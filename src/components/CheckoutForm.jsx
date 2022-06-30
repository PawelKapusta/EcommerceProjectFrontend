import React, { useEffect, useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styles from "../styles/Payment.module.css";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const param = useParams();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://ecommerceprojfront.azurewebsites.net/paymentSuccess/" + param.orderID,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id={styles.paymentElement} />
      <button className={styles.button} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">{isLoading ? <CircularProgress /> : "Pay now"}</span>
      </button>
      {message && <div id={styles.paymentMessage}>{message}</div>}
    </form>
  );
}
