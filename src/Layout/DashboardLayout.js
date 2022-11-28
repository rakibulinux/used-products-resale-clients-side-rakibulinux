import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";
import { AuthContext } from "../contexts/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import useBuyer from "../hooks/useBuyer";
import useSeller from "../hooks/useSeller";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);
  const [isBuyer] = useBuyer(user?.email);
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Navbar />

      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content p-4">
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            <li>
              <Link to="/dashboard">My Dashboard</Link>
            </li>
            {isBuyer && (
              <>
                <li>
                  <Link to="/dashboard/buyer/my-orders">My Orders</Link>
                </li>
              </>
            )}
            {isSeller && (
              <>
                <li>
                  <Link to="/dashboard/seller/add-product">Add a Product</Link>
                </li>
                <li>
                  <Link to="/dashboard/seller/my-products">My Products</Link>
                </li>
                <li>
                  <Link to="/dashboard/seller/my-buyers">My Buyers</Link>
                </li>
              </>
            )}
            {isAdmin && (
              <>
                <li>
                  <Link to="/dashboard/admin/all-sellers">All Sellers</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/all-buyers">All Buyers</Link>
                </li>
                <li>
                  <Link to="/dashboard/admin/reported-items">
                    Reported Items
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
