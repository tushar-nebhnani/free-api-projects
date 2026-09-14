import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";

function JokesViewer() {
  const [joke, setJoke] = useState("");
  const [status, setStatus] = useState("loading");

  async function fetchJokeData() {
    setStatus("loading");

    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/randomjokes/joke/random");
      const data = await response.json();

      setJoke(data.data.content);
      setStatus("success");
    } catch (error) {
      console.error("Failed to fetch joke:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchJokeData();
  }, []);

  return (
    <div className="bg-amber-50 text-gray-800 font-sans min-h-screen flex items-center justify-center p-4">
      <BackLink />
      <div className="bg-white rounded-3xl shadow-xl border border-amber-100 max-w-lg w-full p-8 sm:p-10 text-center">
        <h1 className="text-2xl font-extrabold text-amber-600 mb-6">Random Jokes Viewer</h1>

        <div className="min-h-[100px] flex items-center justify-center mb-8">
          {status === "loading" && <p className="text-gray-400 animate-pulse">Loading a joke...</p>}
          {status === "error" && <p className="text-red-500">Failed to load joke. Try again!</p>}
          {status === "success" && <p className="text-lg text-gray-700">{joke}</p>}
        </div>

        <button
          onClick={fetchJokeData}
          disabled={status === "loading"}
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Loading..." : "Get Another Joke"}
        </button>
      </div>
    </div>
  );
}

export default JokesViewer;
