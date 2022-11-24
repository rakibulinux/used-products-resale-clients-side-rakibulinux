import { HandThumbDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "../../components/Button/PrimaryButton";
import error404 from "../../assets/404.jpg";

const ErrorPage = () => {
  return (
    <section className="flex items-center h-screen p-16 bg-gray-100 text-gray-900">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <img className="w-full h-full object-" src={error404} alt="error404" />
        <Link className="my-5" to="/">
          <PrimaryButton classes="px-8 py-3 font-semibold rounded">
            Back to homepage
          </PrimaryButton>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
