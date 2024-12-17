import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className="navbar bg-black h-20 w-full flex items-center justify-between px-4 sm:px-12 shadow-lg">
        <div className="logo text-2xl sm:text-3xl font-bold text-red-200">
          <Link to="/">FoodHub</Link>
        </div>
        <div className="search-bar hidden sm:flex items-center bg-gray-800 rounded-lg w-2/5 px-4 py-1">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search Products here..."
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:none p-2 rounded-md"
          />
          <button className="ml-2 p-2 rounded-lg">
            <MdOutlineCancel
              className="cursor-pointer hover:text-blue-500 text-gray-500"
              onClick={() => setSearchValue("")}
            />{" "}
          </button>
        </div>
        <div className="login-register text-white text-lg sm:text-xl font-medium  sm:block">
          <span className="cursor-pointer hover:text-blue-400">
            Login/Register
          </span>
        </div>
      </div>
      <div className="search-bar-mobile sm:hidden w-full px-4 py-4 bg-black">
        <div className="flex items-center bg-gray-800 rounded-lg w-full px-4 py-1">
          <input
            type="text"
            placeholder="Search Products here..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded-md"
          />
          <button className="ml-2 p-2 rounded-lg">
            <MdOutlineCancel
              className="cursor-pointer hover:text-blue-500 text-gray-500"
              onClick={() => setSearchValue("")}
            />{" "}
          </button>
        </div>
      </div>
    </>
  );
}
