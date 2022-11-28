import React, { useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import { APIContext } from "../../../../contexts/APIProvider";
const ProductDetails = ({ usedPhone, setCategory }) => {
  const {
    _id,
    phoneName,
    originalPrice,
    resalePrice,
    picture,
    publishedDate,
    location,
    seller: { name, img, verify },
    yearsOfUse,
    description,
  } = usedPhone;
  const { reportToAdmin } = useContext(APIContext);
  return (
    <div className="card card-compact w-96 bg-base-100 p-2 my-4 shadow-2xl">
      <figure>
        <img className="h-96" src={picture} alt={phoneName} />
      </figure>
      <div className="flex items-center gap-4 my-2">
        <img className="rounded-full w-10" src={img} alt={name} />
        <p>{name}</p>
        <span>
          {verify === true ? (
            <FaCheckCircle className="text-cyan-500" />
          ) : (
            <span>Not verified</span>
          )}
        </span>
      </div>
      <div className="card-body">
        <h2 className="card-title">{phoneName}</h2>
        <p>
          <span className="font-bold">Original price:</span> ${originalPrice}
        </p>
        <p>
          <span className="font-bold">Resale price:</span> ${resalePrice}
        </p>
        <p>
          <span className="font-bold">Location:</span> {location}
        </p>
        <p>
          <span className="font-bold">Years of use:</span> {yearsOfUse}
        </p>
        <p>
          <span className="font-bold">Posted Time:</span> {publishedDate}
        </p>
        {description && (
          <p>
            <span className="font-bold">Description:</span>{" "}
            {description.slice(0, 100)}
          </p>
        )}

        <div className="card-actions flex justify-between w-full">
          <label
            onClick={() => setCategory(usedPhone)}
            htmlFor="booking-modal"
            className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 cursor-pointer text-center"
          >
            Book now
          </label>
          <PrimaryButton
            handler={() => reportToAdmin(_id)}
            classes={`hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 cursor-pointer text-center`}
          >
            Report to Admin
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
