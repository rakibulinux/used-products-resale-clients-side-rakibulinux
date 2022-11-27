import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import Spinner from "../../../../components/Spinner/Spinner";
import { AuthContext } from "../../../../contexts/AuthProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_API_URL}/my-orders?email=${user?.email}`;
  const { data: orders, isLoading } = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  console.log(orders);
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-3xl">My Orders</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Picture</th>
                <th>Title</th>
                <th>Price</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={order?.picture}
                      className="w-20"
                      alt={order?.phoneName}
                    />
                  </td>
                  <td>{order?.phoneName}</td>
                  <td>{order?.resalePrice}</td>
                  {/* <td>{order?.status}</td> */}

                  <td>
                    <PrimaryButton
                      type="submit"
                      classes="btn w-full px-2 py-2 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 border-none"
                    >
                      Pay Now
                    </PrimaryButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
