import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_API_URL}/categoriesProducts?email=${user?.email}`;
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });

  const handleAdvertise = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/categoriesProducts/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Status Change");
          refetch();
        }
        console.log(data);
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-3xl">My Products</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Price</th>
                <th>Sales Status</th>
                <th>Advertise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>{product.phoneName}</td>
                  <td>{product.resalePrice}</td>
                  <td>{product?.status}</td>
                  <td>
                    {product?.status && (
                      <button
                        onClick={() => handleAdvertise(product._id)}
                        className="btn btn-xs border-none bg-pink-700"
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-xs border-none bg-primary">
                      Delete
                    </button>
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

export default MyProducts;
