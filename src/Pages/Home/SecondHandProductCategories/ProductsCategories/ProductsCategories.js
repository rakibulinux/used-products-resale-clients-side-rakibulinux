import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { APIContext } from "../../../../contexts/APIProvider";
import BookingModal from "../BookingModal/BookingModal";
import ProductDetails from "./ProductDetails";

const ProductsCategories = () => {
  const usedPhones = useLoaderData();
  const [category, setCategory] = useState(null);
  const { refatch } = useContext(APIContext);
  return (
    <div>
      <div className="divider md:w-8/12 md:mx-auto my-20 text-2xl md:text-5xl ">
        Second Hand Products
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-11/12 mx-auto justify-center items-center">
        {usedPhones.map((usedPhone) => (
          <ProductDetails
            key={usedPhone._id}
            usedPhone={usedPhone}
            setCategory={setCategory}
            category={category}
          />
        ))}
      </div>
      {category && (
        <BookingModal
          refatch={refatch}
          setCategory={setCategory}
          category={category}
        />
      )}
    </div>
  );
};

export default ProductsCategories;
