import { Link } from "react-router-dom";

const PROJECTS = [
  {
    slug: "auth-app",
    title: "Auth App",
    description: "Register, log in, and view your profile — a full authentication flow against a real API.",
  },
  {
    slug: "jokes-viewer",
    title: "Jokes Viewer",
    description: "Fetches a random joke and lets you grab another with one click.",
  },
  {
    slug: "meal-listing",
    title: "Recipe Explorer",
    description: "Browse a grid of recipes pulled from a public meals API.",
  },
  {
    slug: "product-listing",
    title: "Store",
    description: "A storefront grid of randomly generated products.",
  },
  {
    slug: "quotes",
    title: "Quote Gallery",
    description: "A gallery of inspirational quotes fetched from an API.",
  },
  {
    slug: "random-cat",
    title: "Purr-fect Pics",
    description: "One button, infinite cats.",
  },
  {
    slug: "random-user",
    title: "User Directory",
    description: "A directory of randomly generated user profiles.",
  },
  {
    slug: "yt-videos",
    title: "VideoTube",
    description: "A YouTube-style grid of videos fetched from an API.",
  },
];

function ProjectCard({ project }) {
  return (
    <Link
      to={`/${project.slug}`}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col p-6 group"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {project.title}
      </h2>
      <p className="text-sm text-gray-500 flex-grow">{project.description}</p>
      <span className="mt-4 text-sm font-semibold text-blue-600 flex items-center gap-1">
        Open project
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </span>
    </Link>
  );
}

function App() {
  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">FreeAPI Projects</h1>
        <p className="text-gray-500 text-lg">
          A collection of small React apps built while practising public API integration.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

export default App;
