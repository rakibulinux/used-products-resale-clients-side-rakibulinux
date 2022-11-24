import React from "react";
import BookingModal from "../BookingModal/BookingModal";

const ProductDetails = ({ usedPhone }) => {
  const {
    phoneName,
    originalPrice,
    resalePrice,
    picture,
    publishedDate,
    location,
    seller: { name, img },
    yearsOfUse,
  } = usedPhone;
  return (
    <div className="card card-compact w-96 bg-base-100 my-4 shadow-2xl">
      <figure>
        <img className="h-96" src={picture} alt={phoneName} />
      </figure>
      <div className="flex items-center gap-4 my-2">
        <img className="rounded-full w-10" src={img} alt={name} />
        <p>{name}</p>
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
        <div className="card-actions w-full">
          <BookingModal usedPhone={usedPhone} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
