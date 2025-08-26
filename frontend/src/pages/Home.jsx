import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center  p-4 text-center">
      <h1 className="text-4xl font-bold text-black mb-4">
        Welcome to Lead Management System
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage your leads efficiently with authentication, filters, and more.
      </p>

      <Link to="/login">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
          Get Started
        </button>
      </Link>
    </div>
  );
}
