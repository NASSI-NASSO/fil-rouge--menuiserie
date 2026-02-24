import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-2xl border-b border-gray-700 sticky top-0 z-50 backdrop-blur-lg">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <motion.img
            src="logo.png"
            alt="Logo"
            className="h-14 w-auto transition-transform duration-300 group-hover:scale-110"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          />
          <span className="text-xl font-bold bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent hidden md:block">
            Flach Metal
          </span>
        </Link>
      </div>

      {/* Menu */}
      <ul className="flex items-center gap-8">
        <li>
          <Link
            to="/"
            className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-teal group"
          >
            <span className="relative z-10">Accueil</span>
            <span className="absolute inset-0 bg-brand-teal/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </Link>
        </li>

        <li>
          <Link
            to="/produits"
            className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-teal group"
          >
            <span className="relative z-10">Produits</span>
            <span className="absolute inset-0 bg-brand-teal/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </Link>
        </li>

        <li>
          <Link
            to="/devis"
            className="relative px-3 py-2 text-sm font-medium transition-all duration-300 hover:text-brand-teal group"
          >
            <span className="relative z-10">Devis</span>
            <span className="absolute inset-0 bg-brand-teal/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
