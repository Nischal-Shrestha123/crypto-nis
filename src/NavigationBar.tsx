import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Handle show/hide Nav Items on Menu button click (small screen)
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-5">
      <div className="flex items-center">
        <h4 className="font-bold flex-shrink-0 mr-6">Fresh KTM</h4>
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-white border-white"
          onClick={handleClick}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Responsive Nav Items (Collapse on small screen)  */}
      <div
        className={
          isOpen
            ? "block w-full flex-grow lg:flex lg:items-center lg:w-auto ease-in-out duration-300"
            : "hidden w-full flex-grow lg:flex lg:items-center lg:w-auto ease-in-out duration-300"
        }
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            onClick={() => setIsOpen(false)}
          >
            Report
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
