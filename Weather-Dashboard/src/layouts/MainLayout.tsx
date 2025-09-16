import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white p-4 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/about">About</Link>
      </nav>
      <main className="flex-1 p-4">{children}</main>
      <footer className="bg-gray-100 text-center p-4 text-sm">
        WeatherApp © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
