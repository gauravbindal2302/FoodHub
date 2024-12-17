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
    <div className="product-details min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-12">
        <div className="product-detail-card bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="product-image w-full md:w-2/5 bg-gray-200">
              <img
                src={product.image_url}
                alt={product.product_name_fr}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="product-info w-full md:w-3/5 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.product_name_fr}
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                <strong>Brand:</strong> {product.brands}
              </p>
              <div className="text-lg text-gray-600 mb-6">
                <div className="mb-2">
                  <strong>Categories:</strong> {product.compared_to_category}
                </div>
                <div className="mb-2">
                  <strong>Ingredients:</strong> {product.ingredients_text_fr}
                </div>
                <div className="mb-2">
                  <strong>Allergens:</strong>{" "}
                  {product.allergens_from_ingredients}
                </div>
                <div className="mb-2">
                  <strong>Eco Score:</strong> {product.ecoscore_grade} (Score:{" "}
                  {product.ecoscore_score})
                </div>
                <div className="mb-2">
                  <strong>Nutriscore:</strong> {product.nutriscore_grade}
                </div>
                <div className="mb-2">
                  <strong>Quantity:</strong> {product.product_quantity}{" "}
                  {product.product_quantity_unit}
                </div>
                <div className="mb-2">
                  <strong>Packaging:</strong> {product.packaging_text_fr}
                </div>
                <div className="mb-2">
                  <strong>Available at:</strong> {product.stores}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                  Add to Cart
                </button>
                <button className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-md hover:bg-gray-400 transition duration-300">
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
