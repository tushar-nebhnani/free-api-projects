import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";

function MealCard({ meal }) {
  const category = meal.strCategory || "General";
  const area = meal.strArea || "Unknown Origin";
  const image = meal.strMealThumb || "https://via.placeholder.com/400x300?text=No+Image";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img src={image} alt={meal.strMeal} className="w-full h-full object-cover" loading="lazy" />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-orange-600 text-xs font-bold px-2 py-1 rounded shadow-sm">
          {category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 line-clamp-2">{meal.strMeal}</h2>
        <p className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          {area} Cuisine
        </p>

        <div className="mt-auto">
          {meal.strYoutube ? (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-50 hover:bg-orange-50 text-orange-600 font-semibold py-2.5 rounded-xl border border-gray-200 hover:border-orange-200 transition-colors"
            >
              Watch Recipe
            </a>
          ) : (
            <button
              disabled
              className="block w-full text-center bg-gray-50 text-gray-400 font-semibold py-2.5 rounded-xl border border-gray-200 cursor-not-allowed"
            >
              No Video Available
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MealListing() {
  const [status, setStatus] = useState("loading");
  const [meals, setMeals] = useState([]);

  async function fetchMealsData() {
    setStatus("loading");

    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/meals");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      let mealsArray = [];
      if (result.data && Array.isArray(result.data.data)) {
        mealsArray = result.data.data;
      } else if (result.data && Array.isArray(result.data)) {
        mealsArray = result.data;
      } else if (Array.isArray(result)) {
        mealsArray = result;
      }

      if (mealsArray.length > 0) {
        setMeals(mealsArray);
        setStatus("success");
      } else {
        throw new Error("No meals found in the API response.");
      }
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchMealsData();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 font-sans min-h-screen p-4 sm:p-8">
      <BackLink />
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-2">Recipe Explorer</h1>
          <p className="text-gray-500">Discover delicious meals from around the world.</p>
        </header>

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-4 shadow animate-pulse h-72"></div>
            <div className="bg-white rounded-2xl p-4 shadow animate-pulse h-72 hidden sm:block"></div>
            <div className="bg-white rounded-2xl p-4 shadow animate-pulse h-72 hidden md:block"></div>
            <div className="bg-white rounded-2xl p-4 shadow animate-pulse h-72 hidden lg:block"></div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-12">
            <div className="inline-block bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100">
              <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <h3 className="text-lg font-bold">Failed to load recipes</h3>
              <p className="text-sm mt-2">Please check your connection and try again.</p>
              <button
                onClick={fetchMealsData}
                className="mt-4 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.map((meal) => (
              <MealCard key={meal.idMeal || meal.strMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MealListing;
