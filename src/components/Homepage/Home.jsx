import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";

export default function Home() {
  const [barcodeValue, setBarcodeValue] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAllProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FETCH_ALL_PRODUCTS}`
        );
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const filteredProducts = barcodeValue
    ? products.filter((product) => product.code === barcodeValue)
    : products;

  return (
    <>
      <div className="home bg-gray-100 w-screen">
        <div className="search-container flex items-center justify-center p-6 bg-gray-50 shadow-md">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search product by Barcode Number..."
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              className="w-full p-3 pr-10 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <MdOutlineCancel
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-500"
              onClick={() => setBarcodeValue("")}
            />
          </div>
        </div>

        <div className="products-container py-8 lg:px-16 px-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-200">
          {loading ? (
            <div className="loading h-screen text-left text-xl font-semibold text-gray-500">
              Loading Products...
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="h-screen text-xl font-semibold text-gray-500">
                  <span>No products found.</span>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <Link
                    to={`/product/details/${product._id}`}
                    key={product._id}
                    className="product-card bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      src={product.image_front_url}
                      alt={product.product_name_fr}
                      className="w-48 h-64 mt-3 m-auto rounded-lg"
                    />
                    <div className="p-4 text-left">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {product.product_name}
                      </h2>
                      <p className="text-gray-600 mb-1 text-sm">
                        <strong>Brand:</strong> {product.brands}
                      </p>
                      <p className="text-gray-600 mb-1 text-sm">
                        <strong>Categories:</strong> {product.categories}
                      </p>

                      <p className="text-gray-600 mb-1 text-sm">
                        <strong>Nutritional Grade:</strong>{" "}
                        {product.nutriscore_grade}
                      </p>
                      <p className="text-gray-600 mb-1 text-sm">
                        <strong>Quantity:</strong> {product.product_quantity}{" "}
                        {product.product_quantity_unit}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
