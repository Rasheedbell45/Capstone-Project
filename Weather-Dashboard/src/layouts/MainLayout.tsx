import { ReactNode } from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 text-white">
      <nav className="flex justify-center gap-6 py-4 bg-black/20">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/favorites" className="hover:underline">Favorites</Link>
        <Link to="/about" className="hover:underline">About</Link>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
