// api.js

const API_URL = "https://api.freeapi.app/api/v1/public/youtube/videos";

async function fetchYouTubeVideos() {
  // 1. Tell UI to show the skeleton loaders
  UI.showLoading();

  try {
    const url = "https://api.freeapi.app/api/v1/public/youtube/videos";
    const options = { method: "GET", headers: { accept: "application/json" } };

    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    UI.showVideos(data.data.data);

    // ==========================================
    // YOUR FETCH LOGIC GOES HERE
    //
    // 1. fetch() from API_URL
    // 2. Parse the JSON response
    // 3. Extract the array of video objects (usually data.data or similar)
    // 4. Send the array to the UI: UI.showVideos(videoArray)
    // ==========================================
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    // 2. Tell UI to show the error screen
    UI.showError();
  }
}

// Automatically fetch when the page loads
document.addEventListener("DOMContentLoaded", fetchYouTubeVideos);
