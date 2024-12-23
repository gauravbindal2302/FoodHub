import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import axios from "axios";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_FETCH_ALL_PRODUCTS}`
        );
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProductData();
  }, []);

  const getSuggestions = (query) => {
    return products.filter((product) =>
      product.product_name.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      const filteredSuggestions = getSuggestions(searchValue);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchValue, products]);

  const handleSuggestionClick = (suggestion) => {
    setSearchValue(suggestion.product_name);
    setSuggestions([]);
  };

  return (
    <>
      <div className="navbar bg-black h-20 w-full flex items-center justify-between px-4 sm:px-12 shadow-lg">
        <div className="logo text-2xl sm:text-3xl font-bold text-red-200">
          <Link to="/">FoodHub</Link>
        </div>
        <div className="search-bar hidden sm:flex items-center bg-gray-800 rounded-lg w-2/5 px-4 py-1 relative">
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
            />
          </button>
          {searchValue && suggestions.length > 0 && (
            <ul className="absolute top-full max-h-60 left-0 w-full bg-white border mt-2 rounded-md shadow-lg z-10 overflow-y-auto">
              {suggestions.length > 0 ? (
                suggestions.map((product) => (
                  <Link
                    to={`/product/details/${product._id}`}
                    key={product._id}
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <li className="p-2 hover:bg-gray-200 cursor-pointer">
                      {product.product_name}
                    </li>
                  </Link>
                ))
              ) : (
                <li className="p-2 text-gray-500">No product found</li>
              )}
            </ul>
          )}
        </div>
        <div className="login-register text-white text-lg sm:text-xl font-medium sm:block">
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
            className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none focus:none p-2 rounded-md"
          />
          <button className="ml-2 p-2 rounded-lg">
            <MdOutlineCancel
              className="cursor-pointer hover:text-blue-500 text-gray-500"
              onClick={() => setSearchValue("")}
            />
          </button>
        </div>
      </div>
    </>
  );
}
