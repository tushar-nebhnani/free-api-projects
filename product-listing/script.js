async function fetchProductsData() {
  UI.showLoading();

  try {
    const url = "https://api.freeapi.app/api/v1/public/randomproducts";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const res = await fetch(url, options);
    const data = await res.json();

    console.log(data);
    UI.showProducts(data.data.data);
  } catch (error) {
    console.error("Failed to fetch products:", error);

    // 2. Tell the UI to show the error state if fetch fails
    UI.showError();
  }
}

// 3. Trigger the fetch process when the page first loads
document.addEventListener("DOMContentLoaded", fetchProductsData);
