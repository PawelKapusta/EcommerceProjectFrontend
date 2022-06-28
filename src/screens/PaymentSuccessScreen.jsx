import React, { useState, useEffect} from 'react';
import {useParams, useSearchParams} from "react-router-dom";

const PaymentSuccessScreen = () => {
  const [params] = useSearchParams();
  const status = params.get("redirect_status");
  const paymentId = params.get("payment_intent");
  const param = useParams();
  const email = localStorage.getItem("orderEmail");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(status === "succeeded") {
      fetch('http://localhost:8080/api/v1/order/' + param.orderID + "/" + email + "/" + paymentId, {
        method: "POST",
      })
       .then((res) => res.json())
       .then(() => {
         setLoading(true);
       })
    }
  }, [email, param.orderID, paymentId, status])
  return (
   <div>
     PaymentSuccessScreen is here
   </div>
  );
};

export default PaymentSuccessScreen;
