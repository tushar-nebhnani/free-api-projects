import { useEffect, useState } from "react";

function QuoteCard({ quoteObj }) {
  const quoteText = quoteObj.content || quoteObj.quote || "No quote available.";
  const authorName = quoteObj.author || "Unknown Author";
  const tags = quoteObj.tags && quoteObj.tags.length > 0 ? quoteObj.tags[0] : "Inspiration";

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 border border-stone-200 relative overflow-hidden group">
      <div className="absolute top-4 right-4 text-stone-100 group-hover:text-stone-200 transition-colors duration-300">
        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <div className="relative z-10">
        <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-sans font-semibold rounded-full uppercase tracking-wider mb-4">
          {tags}
        </span>
        <blockquote className="text-xl sm:text-2xl text-stone-800 leading-relaxed mb-6">"{quoteText}"</blockquote>
        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-stone-300"></div>
          <cite className="font-sans font-bold text-stone-900 not-italic uppercase tracking-wide text-sm">
            {authorName}
          </cite>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [status, setStatus] = useState("loading");
  const [quotes, setQuotes] = useState([]);

  async function fetchQuotesData() {
    setStatus("loading");

    try {
      const url = "https://api.freeapi.app/api/v1/public/quotes";
      const options = { method: "GET", headers: { accept: "application/json" } };

      const res = await fetch(url, options);
      const data = await res.json();

      setQuotes(data.data.data);
      setStatus("success");
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchQuotesData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-4 font-sans tracking-tight">
          Words of Wisdom
        </h1>
        <p className="text-stone-500 font-sans text-lg">A curated collection of quotes to inspire your day.</p>
      </header>

      {status === "loading" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 shadow-sm border border-stone-200 animate-pulse h-48 ${
                i >= 3 ? "hidden lg:block" : i >= 1 ? "hidden md:block" : ""
              }`}
            ></div>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="text-center py-16 font-sans">
          <div className="inline-block bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 max-w-md">
            <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold">Failed to load quotes</h3>
            <p className="text-sm mt-2 text-red-500">We couldn't fetch the words of wisdom. Please try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {quotes.map((quoteObj, i) => (
            <QuoteCard key={quoteObj.id || i} quoteObj={quoteObj} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
