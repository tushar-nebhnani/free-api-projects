async function fetchNewJoke() {
  UI.showLoading();

  const url = "https://api.freeapi.app/api/v1/public/randomjokes/joke/random";
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const res = await fetch(url, options);
    const data = await res.json();

    UI.showJoke(data.data.content);
  } catch (error) {
    console.error("API Error:", error);
    UI.showError();
  }
}

document.addEventListener("DOMContentLoaded", fetchNewJoke);

UI.onNextJoke(fetchNewJoke);
