import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_PB_KEY);

const Payments = () => {
  const booking = useLoaderData();
  const {
    _id,
    email,
    meetingLocation,
    name,
    originalPrice,
    phone,
    phoneName,
    picture,
    resalePrice,
  } = booking;
  console.log(
    email,
    meetingLocation,
    name,
    originalPrice,
    phone,
    phoneName,
    picture,
    resalePrice
  );
  return (
    <div>
      <h1 className="text-3xl">Payment for {phoneName}</h1>
      <p className="text-xl my-4">
        Please pay <span className="font-bold">${resalePrice}</span> for your
        phone {phoneName}
      </p>
      <div className="w-96 my-10">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payments;
