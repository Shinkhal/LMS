import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-6">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Lead Manager. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/privacy" className="hover:text-blue-600">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-blue-600">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
