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
  console.log(oldPhones);
  if (!oldPhones) return <Spinner />;
  return (
    <div>
      {oldPhones.map((oldPhone) => (
        <OldPhoneDetails key={oldPhone._id} oldPhone={oldPhone} />
      ))}
    </div>
  );
};

export default SellOldPhoneGuide;
