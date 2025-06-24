import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
        {/* --- Logo --- */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-neutral-900">
              News API
            </span>
          </Link>
        </div>

        {/* --- Desktop Navigation Links --- */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
          >
            Home
          </Link>
        </div>

      </nav>
    </header>
  );
};

export default Header;
