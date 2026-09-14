import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";
import VideoCard from "../components/VideoCard.jsx";

function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse flex flex-col gap-3 ${className}`}>
      <div className="w-full aspect-video bg-gray-200 rounded-xl"></div>
      <div className="flex gap-3 pr-6">
        <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0"></div>
        <div className="flex flex-col gap-2 w-full pt-1">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mt-1"></div>
        </div>
      </div>
    </div>
  );
}

function YtVideos() {
  const [status, setStatus] = useState("loading");
  const [videos, setVideos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  async function fetchYouTubeVideos(searchQuery = "") {
    setStatus("loading");

    try {
      const url = searchQuery
        ? `https://api.freeapi.app/api/v1/public/youtube/videos?query=${encodeURIComponent(searchQuery)}`
        : "https://api.freeapi.app/api/v1/public/youtube/videos";
      const options = { method: "GET", headers: { accept: "application/json" } };

      const res = await fetch(url, options);
      const data = await res.json();

      setVideos(data.data.data);
      setStatus(data.data.data.length > 0 ? "success" : "empty");
    } catch (error) {
      console.error("Failed to fetch videos:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchYouTubeVideos();
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = searchInput.trim();
    setQuery(trimmed);
    fetchYouTubeVideos(trimmed);
  }

  function handleLogoClick() {
    setSearchInput("");
    setQuery("");
    fetchYouTubeVideos();
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <BackLink />
      <nav className="bg-white px-6 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-4 pl-28 sm:pl-32">
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center gap-1"
          >
            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
            <span className="text-xl font-bold tracking-tighter">VideoTube</span>
          </button>
        </div>
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl mx-8">
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-5 py-2 hover:bg-gray-200"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
        <div className="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold text-sm">U</div>
      </nav>

      <main className="p-4 sm:p-6 max-w-[1600px] mx-auto">
        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            <Skeleton />
            <Skeleton className="hidden sm:flex" />
            <Skeleton className="hidden lg:flex" />
            <Skeleton className="hidden xl:flex" />
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold">Something went wrong</h3>
            <p className="text-gray-500 mt-2">We couldn't load the videos. Please try again later.</p>
            <button
              onClick={() => fetchYouTubeVideos(query)}
              className="mt-4 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-100 text-blue-600 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {status === "empty" && (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold">No videos found</h3>
            <p className="text-gray-500 mt-2">
              {query ? `No results for "${query}". Try a different search.` : "There's nothing to show right now."}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {videos.map((video, i) => (
              <VideoCard key={video.id || i} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default YtVideos;
