import React, { useContext } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "../../../../components/Button/PrimaryButton";
import Spinner from "../../../../components/Spinner/Spinner";
import { APIContext } from "../../../../contexts/APIProvider";

const AllBuyers = () => {
  const { buyers, isLoadingBuyer, refetchBuyer } = useContext(APIContext);
  if (isLoadingBuyer) {
    return <Spinner />;
  }
  const handleDeleteBuyer = (id, name) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("usedPhoneToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(`${name} deleted successfully`);
        refetchBuyer();
      });
  };
  return (
    <div>
      <h1 className="text-3xl">All Buyers</h1>
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
                <th>Delete Buyer</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer, idx) => (
                <tr key={buyer._id} className="hover">
                  <th>{idx + 1}</th>
                  <td>
                    <img
                      src={buyer?.picture}
                      className="w-20 rounded-full"
                      alt={buyer?.name}
                    />
                  </td>
                  <td>{buyer?.name}</td>
                  <td>{buyer?.email}</td>
                  <td>{buyer?.seller?.verify}</td>

                  <td>
                    <PrimaryButton
                      handler={() => handleDeleteBuyer(buyer?._id, buyer?.name)}
                      type="submit"
                      classes="btn w-full px-2 py-2 font-semibold rounded-md bg-gray-900 hover:bg-gray-700 hover:text-white text-gray-100 border-none"
                    >
                      Delete Buyer
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

export default AllBuyers;
