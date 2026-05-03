async function fetchQuotesData() {
  UI.showLoading();

  try {
    const url = "https://api.freeapi.app/api/v1/public/quotes";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const res = await fetch(url, options);
    const data = await res.json();

    UI.showQuotes(data.data.data);
  } catch (error) {
    console.error("Failed to fetch quotes:", error);

    UI.showError();
  }
}

// 3. Automatically fetch the quotes when the page first loads
document.addEventListener("DOMContentLoaded", fetchQuotesData);
