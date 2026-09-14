function Toast({ toast }) {
  const colorClass = toast.type === "error" ? "bg-red-500" : "bg-green-500";
  const visibilityClass = toast.visible ? "opacity-100" : "opacity-0 hidden";

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 text-white px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center justify-between transition-opacity duration-300 w-full max-w-sm ${colorClass} ${visibilityClass}`}
    >
      <span>{toast.message}</span>
    </div>
  );
}

export default Toast;
