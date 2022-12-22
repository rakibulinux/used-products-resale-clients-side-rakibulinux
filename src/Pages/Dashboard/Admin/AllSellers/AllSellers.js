import React, { useContext } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import Spinner from "../../../../components/Spinner/Spinner";
import { APIContext } from "../../../../contexts/APIProvider";

const AllSellers = () => {
  const { sellers, isLoadingSeller, refetchSeller } = useContext(APIContext);
  if (isLoadingSeller) {
    return <Spinner />;
  }
  const handleDeleteSeller = (id, name) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${name} deleted successfully`);
        refetchSeller();
      });
  };

  const handleVerifySeller = (id, name) => {
    fetch(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${name} verify successfully`);
        refetchSeller();
      });
  };

  return (
    <div>
      <h1 className="text-3xl">All Sellers</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Verify</th>
                <th>Delete Seller</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, idx) => (
                <tr key={seller._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={seller?.picture}
                      className="w-20 rounded-full"
                      alt={seller?.name}
                    />
                  </td>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
                    {seller?.verify ? (
                      "Verified"
                    ) : (
                      <PrimaryButton
                        handler={() =>
                          handleVerifySeller(seller?._id, seller?.name)
                        }
                        type="submit"
                        classes="btn w-full px-2 py-2 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 border-none"
                      >
                        Verify User
                      </PrimaryButton>
                    )}
                  </td>
                  <td>
                    <PrimaryButton
                      handler={() =>
                        handleDeleteSeller(seller?._id, seller?.name)
                      }
                      type="submit"
                      classes="btn w-full px-2 py-2 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 border-none"
                    >
                      Delete Seller
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

export default AllSellers;
