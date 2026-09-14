import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";

function ProductCard({ product }) {
  const title = product.title || "Unknown Product";
  const brand = product.brand || "Generic Brand";
  const price = product.price ? `$${product.price}` : "Price Unavailable";
  const category = product.category || "Uncategorized";
  const imageUrl =
    product.thumbnail ||
    (product.images && product.images[0]) ||
    "https://via.placeholder.com/400x400?text=No+Image";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col group cursor-pointer">
      <div className="relative aspect-square overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-sm">
          {category}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-1">{brand}</p>
        <h2 className="text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">{title}</h2>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-extrabold text-gray-900">{price}</span>
          <button className="bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-lg transition-colors" title="Add to Cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductListing() {
  const [status, setStatus] = useState("loading");
  const [products, setProducts] = useState([]);

  async function fetchProductsData() {
    setStatus("loading");

    try {
      const url = "https://api.freeapi.app/api/v1/public/randomproducts";
      const options = { method: "GET", headers: { accept: "application/json" } };

      const res = await fetch(url, options);
      const data = await res.json();

      setProducts(data.data.data);
      setStatus("success");
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchProductsData();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen p-4 sm:p-8">
      <BackLink />
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">Latest Products</h1>
            <p className="text-gray-500">Discover our randomly generated catalog.</p>
          </div>
        </header>

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 animate-pulse h-[380px] ${
                  i >= 4 ? "hidden lg:block" : i >= 3 ? "hidden md:block" : i >= 1 ? "hidden sm:block" : ""
                }`}
              ></div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-16">
            <div className="inline-block bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 max-w-md">
              <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-xl font-bold">Failed to load products</h3>
              <p className="text-sm mt-2 text-red-500">We couldn't fetch the catalog. Please try again later.</p>
              <button
                onClick={fetchProductsData}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id || product.title} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductListing;
