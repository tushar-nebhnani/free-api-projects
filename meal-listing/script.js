async function fetchMealsData() {
  UI.showLoading();

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
      UI.showMeals(mealsArray);
    } else {
      throw new Error("No meals found in the API response.");
    }
  } catch (error) {
    console.error("Failed to fetch meals:", error);
    UI.showError();
  }
}

document.addEventListener("DOMContentLoaded", fetchMealsData);
