import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog/Blog";
import AddProduct from "../Pages/Dashboard/Seller/AddProduct/AddProduct";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home/Home";
import ProductsCategories from "../Pages/Home/SecondHandProductCategories/ProductsCategories/ProductsCategories";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import MyProducts from "../Pages/Dashboard/Seller/MyProducts/MyProducts";
import SellerRoute from "./SellerRoute";
import Payments from "../Pages/Dashboard/Payments/Payments";
import MyBuyers from "../Pages/Dashboard/Seller/MyBuyers/MyBuyers";
import AllSellers from "../Pages/Dashboard/Admin/AllSellers/AllSellers";
import AllBuyers from "../Pages/Dashboard/Admin/AllBuyers/AllBuyers";
import ReportedItems from "../Pages/Dashboard/Admin/ReportedItems/ReportedItems";
import MyOrders from "../Pages/Dashboard/Buyers/MyOrders/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <ProductsCategories />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${process.env.REACT_APP_API_URL}/categoriesProducts/${params.id}`
          ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <AllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <AllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-items",
        element: (
          <AdminRoute>
            <ReportedItems />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <SellerRoute>
            <AddProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <SellerRoute>
            <MyProducts />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <SellerRoute>
            <MyBuyers />
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <BuyerRoute>
            <MyOrders />
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payments />,
        loader: ({ params }) =>
          fetch(
            `https://doctors-portal-server-nu-two.vercel.app/bookings/${params.id}`
          ),
      },
    ],
  },
]);

export default router;
