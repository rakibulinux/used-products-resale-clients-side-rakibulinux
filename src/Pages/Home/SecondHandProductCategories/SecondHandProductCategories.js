import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
const SecondHandProductCategories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = res.json();
      return data;
    },
  });
  if (isLoading) {
    return <Spinner />;
  }
  console.log(categories);
  return (
    <div>
      <div className="divider md:w-8/12 md:mx-auto my-10 sm:text-2xl md:text-5xl ">
        Categories
      </div>
      <div className="my-5 grid grid-cols-3 justify-center items-center mx-auto w-10/12">
        {categories.map((category) => (
          <Link to={`/category/${category._id}`} key={category._id}>
            {category.categoryName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondHandProductCategories;
