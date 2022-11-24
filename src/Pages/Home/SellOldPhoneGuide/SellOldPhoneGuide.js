import React, { useEffect, useState } from "react";
import axios from "axios";
import OldPhoneDetails from "./OldPhoneDetails";
import Spinner from "../../../components/Spinner/Spinner";

const SellOldPhoneGuide = () => {
  const [oldPhones, setOldPhones] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/usedPhonesGuide`)
      .then((res) => {
        setOldPhones(res.data);
      });
  }, []);
  if (!oldPhones) return <Spinner />;
  return (
    <div>
      <div className="divider md:w-8/12 md:mx-auto my-10 sm:text-2xl md:text-5xl ">
        How to Sell Old Phones
      </div>
      <p className="w-11/12 text-center mx-auto">
        When you want to know how much your cell phone is worth, millions of
        people across the US benefit from getting cash for their old phones
        using our comparison process. It's so simple - compare prices by using
        our tool so we can give you an instant quote. We know who buys cell
        phones for the most money and where to sell your cell phone safely.
      </p>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-5 w-11/12 mx-auto">
        {oldPhones.map((oldPhone) => (
          <OldPhoneDetails key={oldPhone._id} oldPhone={oldPhone} />
        ))}
      </div>
    </div>
  );
};

export default SellOldPhoneGuide;
