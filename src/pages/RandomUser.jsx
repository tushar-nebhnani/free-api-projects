import { useEffect, useState } from "react";
import BackLink from "../components/BackLink.jsx";

function UserCard({ user }) {
  const name = user.name ? `${user.name.title} ${user.name.first} ${user.name.last}` : "Unknown User";
  const image = (user.picture && (user.picture.large || user.picture.medium)) || "https://via.placeholder.com/150";
  const age = user.dob && user.dob.age ? user.dob.age : "N/A";
  const location = user.location ? `${user.location.city}, ${user.location.country}` : "Unknown Location";
  const email = user.email || "No email provided";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col items-center p-6 group">
      <div className="relative mb-4">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md group-hover:border-blue-50 transition-colors"
        />
      </div>
      <h2 className="text-xl font-bold text-slate-800 text-center leading-tight">{name}</h2>
      <p className="text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider mb-4">Age: {age}</p>

      <div className="mt-auto w-full pt-4 border-t border-slate-100 space-y-2 text-sm text-slate-500">
        <p className="flex items-center justify-center gap-2" title={email}>
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <span className="truncate w-40 text-center">{email}</span>
        </p>
        <p className="flex items-center justify-center gap-2" title={location}>
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span className="truncate w-40 text-center">{location}</span>
        </p>
      </div>
    </div>
  );
}

function RandomUser() {
  const [status, setStatus] = useState("loading");
  const [users, setUsers] = useState([]);

  async function fetchRandomUsers() {
    setStatus("loading");

    try {
      const url = "https://api.freeapi.app/api/v1/public/randomusers";
      const options = { method: "GET", headers: { accept: "application/json" } };

      const res = await fetch(url, options);
      const data = await res.json();

      setUsers(data.data.data);
      setStatus("success");
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setStatus("error");
    }
  }

  useEffect(() => {
    fetchRandomUsers();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800 font-sans min-h-screen p-4 sm:p-8">
      <BackLink />
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">User Directory</h1>
          <p className="text-slate-500 mb-6">Discover random user profiles generated via API.</p>
          <button
            onClick={fetchRandomUsers}
            disabled={status === "loading"}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors duration-200 flex items-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-wait"
          >
            <span>{status === "loading" ? "Fetching..." : status === "error" ? "Try Again" : "Load New Users"}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
          </button>
        </header>

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse flex flex-col items-center h-[280px] ${
                  i >= 3 ? "hidden lg:flex" : i >= 2 ? "hidden md:flex" : i >= 1 ? "hidden sm:flex" : ""
                }`}
              >
                <div className="w-24 h-24 bg-slate-200 rounded-full mb-4"></div>
                <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="w-full space-y-2 mt-auto">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-12">
            <div className="inline-block bg-red-50 text-red-600 p-8 rounded-2xl border border-red-100 max-w-md">
              <svg className="w-12 h-12 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <h3 className="text-xl font-bold">Failed to load directory</h3>
              <p className="text-sm mt-2 text-red-500">We couldn't fetch the user profiles. Please try again.</p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users.map((user, i) => (
              <UserCard key={user.login?.uuid || i} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomUser;
