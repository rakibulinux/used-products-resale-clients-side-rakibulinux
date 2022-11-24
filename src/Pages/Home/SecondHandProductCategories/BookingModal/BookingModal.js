import React from "react";

const BookingModal = () => {
  return (
    <div className="w-full flex justify-center items-center text-center p-4">
      {/* The button to open modal */}
      <label
        htmlFor="booking-modal"
        className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 cursor-pointer"
      >
        Book now
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor="booking-modal"
            className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 flex justify-center items-center text-gray-100 cursor-pointer btn-sm rounded-full absolute right-1 top-1"
          >
            X
          </label>
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <label
              htmlFor="booking-modal"
              className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 text-center cursor-pointer"
            >
              Book Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
