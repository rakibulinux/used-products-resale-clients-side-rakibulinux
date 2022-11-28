import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import Spinner from "../../../../components/Spinner/Spinner";

const ReportedItems = () => {
  const {
    data: reports,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersBuyer"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/reportProduct?report`
      );
      const data = res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }
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
        if (data.deletedCount > 0) {
          toast.success("Delete success Change");
          refetch();
        }
      });
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <h1 className="text-3xl">Report Items</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Phone Name</th>
                <th>Price</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={report._id} className="hover">
                  <td>
                    <span className="font-bold">{idx + 1}</span>
                  </td>
                  <td>{report.phoneName}</td>
                  <td>{report.resalePrice}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(report._id)}
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

export default ReportedItems;
