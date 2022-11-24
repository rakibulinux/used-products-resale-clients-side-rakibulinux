import React from "react";
import AdvertisedItems from "../AdvertisedItems/AdvertisedItems";
import SecondHandProductCategories from "../SecondHandProductCategories/SecondHandProductCategories";
import SellOldPhoneGuide from "../SellOldPhoneGuide/SellOldPhoneGuide";
import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
      <Slider />
      <AdvertisedItems />
      <SecondHandProductCategories />
      <SellOldPhoneGuide />
    </div>
  );
};

export default Home;
