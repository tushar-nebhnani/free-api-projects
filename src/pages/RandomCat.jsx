import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";

function RandomCat() {
  const [status, setStatus] = useState("loading");
  const [imageUrl, setImageUrl] = useState("");

  async function fetchRandomCat() {
    setStatus("loading");

    try {
      const url = "https://api.freeapi.app/api/v1/public/cats/cat/random";
      const options = { method: "GET", headers: { accept: "application/json" } };

      const res = await fetch(url, options);
      const data = await res.json();

      setImageUrl(data.data.image);
    } catch (error) {
      console.error("Failed to fetch cat image:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchRandomCat();
  }, []);

  return (
    <div className="bg-indigo-50 min-h-screen flex items-center justify-center p-4">
      <BackLink />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-indigo-100">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-2xl font-extrabold text-white tracking-wide flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3c-1.1 0-2 .9-2 2v2c-2.8 0-5 2.2-5 5v5l-2 2v1h18v-1l-2-2v-5c0-2.8-2.2-5-5-5V5c0-1.1-.9-2-2-2zm0 2c.6 0 1 .4 1 1v1.3c-.3-.1-.6-.2-1-.2s-.7.1-1 .2V6c0-.6.4-1 1-1z" />
            </svg>
            Purr-fect Pics
          </h1>
          <p className="text-indigo-200 text-sm mt-1">Endless feline entertainment</p>
        </div>

        <div className="p-6 sm:p-8 flex flex-col items-center">
          {status === "loading" && (
            <div className="w-full aspect-square bg-indigo-50 rounded-2xl animate-pulse flex items-center justify-center border-2 border-dashed border-indigo-200 mb-6">
              <svg className="w-12 h-12 text-indigo-300 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}

          {status === "error" && (
            <div className="w-full aspect-square bg-red-50 rounded-2xl flex flex-col items-center justify-center border-2 border-red-100 text-red-500 text-center p-6 mb-6">
              <svg className="w-16 h-16 mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <h3 className="text-lg font-bold">Oh no!</h3>
              <p className="text-sm mt-1">The cat ran away. Couldn't load the image.</p>
            </div>
          )}

          {imageUrl && (
            <div
              className={`w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-black mb-6 relative group ${
                status === "success" ? "" : "hidden"
              }`}
            >
              <img
                src={imageUrl}
                alt="A random cat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onLoad={() => setStatus("success")}
                onError={() => setStatus("error")}
              />
            </div>
          )}

          <button
            onClick={fetchRandomCat}
            disabled={status === "loading"}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>
              {status === "loading" ? "Summoning cat..." : status === "error" ? "Try Again" : "Show Me Another Cat"}
            </span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RandomCat;
