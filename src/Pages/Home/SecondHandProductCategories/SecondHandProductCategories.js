import React, { useContext } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { APIContext } from "../../../contexts/APIProvider";
import PrimaryButton from "../../../components/Button/PrimaryButton";
const SecondHandProductCategories = () => {
  const { categories, isLoading } = useContext(APIContext);
  if (isLoading) {
    return <Spinner />;
  }
  console.log(categories);
  return (
    <div>
      <div className="divider md:w-8/12 md:mx-auto my-10 sm:text-2xl md:text-5xl ">
        Categories
      </div>
      <div className="my-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center mx-auto w-10/12">
        {categories.map((category) => (
          <Link
            className=""
            to={`/category/${category._id}`}
            key={category._id}
          >
            <PrimaryButton classes="w-full mt-2 px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100">
              {category.categoryName}
            </PrimaryButton>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SecondHandProductCategories;
