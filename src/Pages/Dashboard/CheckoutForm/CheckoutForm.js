import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ booking }) => {
  const { email, phoneName, resalePrice, _id } = booking;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transectionId, setTransectionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
      body: JSON.stringify({ resalePrice }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [resalePrice]);
  console.log(resalePrice);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
      toast.error(error.message);
    } else {
      setCardError("");
      setProcessing(true);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: phoneName,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      toast.error(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      const payment = {
        resalePrice,
        email,
        transactionId: paymentMethod.id,
        bookingId: _id,
      };
      console.log(payment);
      fetch(`${process.env.REACT_APP_API_URL}/payments`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess("Congratulations! your payment successful");
            setTransectionId(paymentIntent.id);
            toast.success("Congratulations! your payment successful");
          }
        });
    }
    setProcessing(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-sm bg-primary border-none my-4"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p>Transection Id: {transectionId}</p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
