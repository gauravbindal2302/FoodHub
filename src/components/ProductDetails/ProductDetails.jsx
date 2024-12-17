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
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details min-h-screen flex items-center bg-gray-50 py-10">
      <div className="container mx-auto px-4 md:px-12">
        <div className="product-detail-card bg-white shadow-lg rounded-lg p-8">
          <div className="flex gap-8">
            <div className="product-image bg-black w-2/5">
              <img
                src={product.image_url}
                alt={product.product_name_fr}
                className="w-60 h-82 rounded-lg shadow-md m-auto"
              />
            </div>
            <div className="product-info w-3/5 bg-black">
              <h1 className="text-3xl font-semibold text-gray-800">
                {product.product_name_fr}
              </h1>
              <p className="text-lg text-gray-600">
                <strong>Brand:</strong> {product.brands}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
