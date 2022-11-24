import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductsCategories = () => {
  const usedPhones = useLoaderData();
  return (
    <div>
      <div className="divider md:w-8/12 md:mx-auto my-20 text-2xl md:text-5xl ">
        Second Hand Products
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-11/12 mx-auto justify-center items-center">
        {usedPhones.map((usedPhone) => (
          <ProductDetails key={usedPhone._id} usedPhone={usedPhone} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCategories;
