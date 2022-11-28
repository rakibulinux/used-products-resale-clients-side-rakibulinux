import React, { useContext } from "react";
import { AuthContext } from "../../../../contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-hot-toast";
const MyProducts = () => {
  const { user } = useContext(AuthContext);
  const url = `${process.env.REACT_APP_API_URL}/products?email=${user?.email}`;
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
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Placed for Advertisement");
          refetch();
        }
      });
  };
  const handleStatusChange = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/statusChange/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Available for Advertisement");
          refetch();
        }
      });
  };
  const handleDeleteProduct = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
      body: JSON.stringify(id),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Delete success Change");
          refetch();
        }
        console.log(data);
      });
  };

  console.log(products);
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
                <th>Phone Name</th>
                <th>Price</th>
                <th>Available to sell?</th>
                <th>Sales Status</th>
                <th>Advertise</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <tr key={product._id} className="hover">
                  <td>
                    <span className="font-bold">{idx + 1}</span>
                  </td>
                  <td>{product.phoneName}</td>
                  <td>{product.resalePrice}</td>

                  <td>
                    {!product?.status ? (
                      <button
                        onClick={() => handleStatusChange(product._id)}
                        className="btn btn-xs border-none bg-pink-700"
                      >
                        Make Available
                      </button>
                    ) : (
                      <span>Status Changed</span>
                    )}
                  </td>
                  <td>
                    {product?.advertise && product?.status && "Placed for ad"}
                  </td>
                  <td>
                    {!product?.advertise && product?.status && (
                      <button
                        onClick={() => handleAdvertise(product._id)}
                        className="btn btn-xs border-none bg-pink-700"
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="btn btn-xs border-none bg-red-600"
                    >
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
