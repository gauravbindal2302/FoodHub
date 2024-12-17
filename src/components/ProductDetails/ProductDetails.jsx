import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_FETCH_ALL_PRODUCTS}`
        );
        const productData = response.data.products.find(
          (product) => product._id === id
        );
        if (productData) {
          setProduct(productData);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl text-gray-600">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="flex justify-center items-center">
              <img
                src={product.image_url}
                alt={product.product_name_fr}
                className="w-full max-w-md h-80 object-contain rounded-lg shadow-md"
              />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {product.product_name}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Brand:</strong> {product.brands}
              </p>
              <div className="text-lg text-gray-600 mb-6 space-y-3">
                <div>
                  <strong>Categories:</strong> {product.categories}
                </div>
                <div>
                  <strong>Ingredients:</strong> {product.ingredients_text_fr}
                </div>
                <div>
                  <strong>Allergens:</strong>{" "}
                  {product.allergens_from_ingredients}
                </div>
                <div>
                  <strong>Eco Score:</strong> {product.ecoscore_grade} (Score:{" "}
                  {product.ecoscore_score})
                </div>
                <div>
                  <strong>Nutritional Grade:</strong> {product.nutriscore_grade}
                </div>
                <div>
                  <strong>Quantity:</strong> {product.product_quantity}{" "}
                  {product.product_quantity_unit}
                </div>
                <div>
                  <strong>Packaging:</strong> {product.packaging_text_fr}
                </div>
                <div>
                  <strong>Available at:</strong> {product.stores}
                </div>
              </div>
              <div className="flex gap-6 mt-8">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
                <button className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-800 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300">
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
