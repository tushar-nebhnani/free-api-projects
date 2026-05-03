const API_URL = "https://api.freeapi.app/api/v1/public/cats/cat/random";

async function fetchRandomCat() {
  UI.showLoading();

  try {
    const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const res = await fetch(url, options);
    const data = await res.json();

    UI.showCat(data.data.image);
  } catch (error) {
    console.error("Failed to fetch cat image:", error);

    // 2. Tell the UI to show the error state if fetch fails
    UI.showError();
  }
}

// 3. Automatically fetch a cat when the page first loads
document.addEventListener("DOMContentLoaded", fetchRandomCat);

// 4. Tell the UI object to run your fetch function when the button is clicked
UI.onNextClick(fetchRandomCat);
