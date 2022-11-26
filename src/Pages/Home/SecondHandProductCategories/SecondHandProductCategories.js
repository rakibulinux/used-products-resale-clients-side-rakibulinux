import React, { useContext } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import { APIContext } from "../../../contexts/APIProvider";
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
