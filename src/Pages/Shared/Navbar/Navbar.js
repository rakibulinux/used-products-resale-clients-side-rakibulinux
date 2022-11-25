import React from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { AuthContext } from "../../../contexts/AuthProvider";

const Navbar = () => {
  const { user, logoutUserAccount } = useContext(AuthContext);

  const navItems = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-sky-600" : "")}
          to="/home"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "text-sky-600" : "")}
          to="/blog"
        >
          Blog
        </NavLink>
      </li>

      {!user?.uid ? (
        <>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              to="/categories"
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              to="/login"
            >
              <PrimaryButton classes="rounded-full px-2 py-1">
                Login
              </PrimaryButton>
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-sky-600" : "")}
              to="/register"
            >
              <PrimaryButton classes="rounded-full px-2 py-1">
                Register
              </PrimaryButton>
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-sky-600 bg-none hover:bg-none" : ""
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <button onClick={logoutUserAccount}>SignOut</button>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="text-gray-900 body-font shadow-sm">
      <div className="bg-base-100 mx-auto flex px-20 justify-between items-center">
        <div className="flex py-5">
          <NavLink
            to="/"
            className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-sky-600 sm:mr-3 md:mb-0"
          >
            <span className="md:ml-3 text-2xl font-bold">Used Phones</span>
          </NavLink>
        </div>
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn bg-gradient-to-r from-cyan-500  to-sky-600 border-none hover:bg-cyan-600 md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content  shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>

        <div className="hidden md:flex">
          <ul className="menu menu-horizontal p-0">{navItems}</ul>
        </div>
        {/* <div className="navbar-end">
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center ">
            <div className="relative list-none md:flex items-center sm:py-2 gap-5 text-gray-900">
              {navItems}
            </div>
          </nav>
        </div> */}
      </div>
    </header>
  );
};

export default Navbar;
