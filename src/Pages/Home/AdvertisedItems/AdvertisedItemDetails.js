import React from "react";

const AdvertisedItemDetails = ({ product, setCategory }) => {
  const {
    phoneName,
    originalPrice,
    resalePrice,
    picture,
    publishedDate,
    location,
    seller: { name, img },
    yearsOfUse,
  } = product;
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
          <label
            onClick={() => setCategory(product)}
            htmlFor="booking-modal"
            className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 cursor-pointer text-center"
          >
            Book now
          </label>
        </div>
      </div>
    </div>
  );
};

export default AdvertisedItemDetails;
