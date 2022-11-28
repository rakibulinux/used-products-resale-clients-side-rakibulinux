import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import BookingModal from "../SecondHandProductCategories/BookingModal/BookingModal";
import AdvertisedItemDetails from "./AdvertisedItemDetails";

const AdvertisedItems = () => {
  const [category, setCategory] = useState(null);
  const url = `${process.env.REACT_APP_API_URL}/advertise?advertise`;
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      {products.length > 0 && (
        <div className="divider md:w-8/12 md:mx-auto my-10 sm:text-2xl md:text-5xl">
          Advertised Items{" "}
        </div>
      )}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-11/12 mx-auto justify-center items-center">
        {products.length > 0 &&
          products.map((product) => (
            <AdvertisedItemDetails
              key={product._id}
              product={product}
              setCategory={setCategory}
              category={category}
            />
          ))}
      </div>
      {category && (
        <BookingModal
          refetch={refetch}
          setCategory={setCategory}
          category={category}
        />
      )}
    </div>
  );
};

export default AdvertisedItems;
