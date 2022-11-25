import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
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
    const meetingLocation = form.meetingLocation.value;
    const booking = {
      name,
      meetingLocation,
      email,
      phone,
      originalPrice,
      resalePrice,
    };
    console.log(booking);
    // setTreatment(null);
    fetch(`${process.env.REACT_APP_API_URL}/bookings`, {
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name?</span>
              </label>
              <input
                defaultValue={phoneName}
                type="text"
                name="phoneName"
                placeholder="phoneName"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Name?</span>
              </label>
              <input
                defaultValue={user?.displayName}
                type="text"
                name="name"
                placeholder="Your name"
                className="input input-bordered w-full"
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your Email?</span>
              </label>
              <input
                defaultValue={user?.email}
                type="email"
                name="email"
                placeholder="Your email"
                className="input input-bordered w-full"
                required
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Your phone?</span>
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Your phone"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Meeting location?</span>
              </label>
              <input
                type="text"
                name="meetingLocation"
                placeholder="Meeting location"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Original price?</span>
              </label>
              <input
                type="text"
                defaultValue={`$${originalPrice}`}
                name="originalPrice"
                placeholder="Your originalPrice"
                className="input input-bordered w-full"
                required
                disabled
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Resale price?</span>
              </label>
              <input
                type="text"
                defaultValue={`$${resalePrice}`}
                name="resalePrice"
                placeholder="Your resalePrice"
                className="input input-bordered w-full"
                required
                disabled
              />
            </div>
            <div className="modal-action">
              <PrimaryButton
                type="submit"
                classes="w-full px-8 py-3 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100"
              >
                Book Now
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
