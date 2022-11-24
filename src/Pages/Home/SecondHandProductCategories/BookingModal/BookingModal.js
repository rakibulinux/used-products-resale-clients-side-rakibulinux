import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../../contexts/AuthProvider";

const BookingModal = ({ usedPhone }) => {
  const [booking, setBooking] = useState(null);
  const { user } = useContext(AuthContext);
  const {
    phoneName,
    originalPrice,
    resalePrice,
    picture,
    publishedDate,
    location,
    yearsOfUse,
  } = usedPhone;
  const handleBooking = (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const booking = {
      patient: name,

      email,
      phone,
      originalPrice: originalPrice,
      resalePrice: resalePrice,
    };
    console.log(booking);
    // setTreatment(null);
    fetch("https://doctors-portal-server-nu-two.vercel.app/bookings", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setBooking(null);
          toast.success("Booking success");
          //   refetch();
        } else {
          toast.error(data.message);
        }
      });
  };
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
          <form onSubmit={handleBooking}>
            <input
              defaultValue={user?.displayName}
              type="text"
              name="name"
              placeholder="Your name"
              className="mt-4 input input-bordered w-full"
              disabled
            />
            <p className="mt-4 bordered w-full">
              Original price: {originalPrice}
            </p>
            <p className="mt-4 bordered w-full">Resale price: {resalePrice}</p>
            <input
              defaultValue={user?.email}
              type="email"
              name="email"
              placeholder="Your email"
              className="mt-4 input input-bordered w-full"
              required
              disabled
            />
            <input
              type="text"
              name="phone"
              placeholder="Your phone"
              className="mt-4 input input-bordered w-full"
            />
            <div className="modal-action">
              <label
                htmlFor="booking-modal"
                className="hover:text-gray-100 bg-gradient-to-r from-cyan-500 to-sky-600 w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 text-gray-100 text-center cursor-pointer"
              >
                Book Now
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
