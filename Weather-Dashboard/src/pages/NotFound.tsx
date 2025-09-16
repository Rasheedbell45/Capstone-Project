import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg">Page Not Found</p>
      <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">
        Go Home
      </Link>
    </div>
  );
}
