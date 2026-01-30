import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [openAdmin, setOpenAdmin] = useState(false);
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
            to="/producttts"
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

        {/* Admin Dropdown */}
        <li className="relative">
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="relative px-4 py-2 text-sm font-medium bg-gradient-to-r from-brand-teal to-brand-teal-dark rounded-lg hover:from-brand-teal-dark hover:to-brand-blue transition-all duration-300 shadow-lg hover:shadow-brand-teal/50 flex items-center gap-2"
          >
            <span>Admin</span>
            <motion.span
              animate={{ rotate: openAdmin ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▾
            </motion.span>
          </button>

          <AnimatePresence>
            {openAdmin && (
              <motion.ul
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 bg-white text-gray-800 rounded-xl shadow-2xl w-56 overflow-hidden border border-gray-200"
              >
                <li className="border-b border-gray-100">
                  <Link
                    to="/login"
                    className="block px-5 py-3 hover:bg-gradient-to-r hover:from-brand-teal/5 hover:to-brand-teal/10 transition-all duration-200 font-medium"
                    onClick={() => setOpenAdmin(false)}
                  >
                    🔐 Connexion
                  </Link>
                </li>
                <li className="border-b border-gray-100">
                  <Link
                    to="/admin/productsAdmin"
                    className="block px-5 py-3 hover:bg-gradient-to-r hover:from-brand-teal/5 hover:to-brand-teal/10 transition-all duration-200 font-medium"
                    onClick={() => setOpenAdmin(false)}
                  >
                    📦 Gestion Produits
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orders"
                    className="block px-5 py-3 hover:bg-gradient-to-r hover:from-brand-teal/5 hover:to-brand-teal/10 transition-all duration-200 font-medium"
                    onClick={() => setOpenAdmin(false)}
                  >
                    📋 Commandes
                  </Link>
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </li>
      </ul>
    </nav>
  );
}
