import { Link } from "react-router-dom";

function BackLink() {
  return (
    <Link
      to="/"
      className="fixed top-4 left-4 z-50 text-sm font-semibold text-gray-600 hover:text-gray-900 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-sm border border-gray-200 flex items-center gap-1 transition-colors"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
      </svg>
      All projects
    </Link>
  );
}

export default BackLink;
