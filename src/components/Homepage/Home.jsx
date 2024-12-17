import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <div className="search-container p-6 bg-gray-50 shadow-md">
          <input
            type="text"
            placeholder="Search product using barcode..."
            value={barcodeValue}
            onChange={(e) => setBarcodeValue(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="products-container py-8 px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 bg-gray-200">
          {loading ? (
            <div className="loading text-center text-xl font-semibold text-gray-500">
              Loading Data...
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <div className="text-center text-xl font-semibold text-gray-500">
                  No products found.
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
                    <div className="p-4">
                      <h2 className="text-xl font-semibold text-gray-800">
                        {product.product_name_fr}
                      </h2>
                      <p className="text-gray-600 mb-2">
                        <strong>Brand:</strong> {product.brands}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Categories:</strong> {product.categories}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Ingredients:</strong>{" "}
                        {product.ingredients_text_fr}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Allergens:</strong>{" "}
                        {product.allergens_from_ingredients}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Eco Score:</strong> {product.ecoscore_grade}{" "}
                        (Score: {product.ecoscore_score})
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Nutriscore:</strong> {product.nutriscore_grade}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Quantity:</strong> {product.product_quantity}{" "}
                        {product.product_quantity_unit}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Packaging:</strong> {product.packaging_text_fr}
                      </p>
                      <p className="text-gray-600 mb-2">
                        <strong>Available at:</strong> {product.stores}
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
