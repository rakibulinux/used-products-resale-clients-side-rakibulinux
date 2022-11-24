import React, { useEffect, useState } from "react";
import axios from "axios";

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
  return (
    <div>
      <h1>{oldPhones.length}</h1>
    </div>
  );
};

export default SellOldPhoneGuide;
