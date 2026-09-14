import "./index.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AuthApp from "./pages/AuthApp.jsx";
import JokesViewer from "./pages/JokesViewer.jsx";
import MealListing from "./pages/MealListing.jsx";
import ProductListing from "./pages/ProductListing.jsx";
import Quotes from "./pages/Quotes.jsx";
import RandomCat from "./pages/RandomCat.jsx";
import RandomUser from "./pages/RandomUser.jsx";
import YtVideos from "./pages/YtVideos.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth-app" element={<AuthApp />} />
      <Route path="/jokes-viewer" element={<JokesViewer />} />
      <Route path="/meal-listing" element={<MealListing />} />
      <Route path="/product-listing" element={<ProductListing />} />
      <Route path="/quotes" element={<Quotes />} />
      <Route path="/random-cat" element={<RandomCat />} />
      <Route path="/random-user" element={<RandomUser />} />
      <Route path="/yt-videos" element={<YtVideos />} />
    </Routes>
  </BrowserRouter>,
);
