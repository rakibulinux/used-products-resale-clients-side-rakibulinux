import React from "react";
import { useLoaderData } from "react-router-dom";
import ProductDetails from "./ProductDetails";

const ProductsCategories = () => {
  const usedPhones = useLoaderData();
  console.log(usedPhones);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
      {usedPhones.map((usedPhone) => (
        <ProductDetails key={usedPhone._id} usedPhone={usedPhone} />
      ))}
    </div>
  );
};

export default ProductsCategories;
