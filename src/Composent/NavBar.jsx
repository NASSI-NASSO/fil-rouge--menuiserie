import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [openAdmin, setOpenAdmin] = useState(false);
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      {/* Logo */}
      <div className="flex-col  flex justify-start ">
      <Link to="/" className="text-2xl font-bold text-orange-500">
        <img src="logo.png"alt="Logo"className="h-12 w-auto"/>
      </Link>
      </div> 

      {/* Menu */}
      <ul className="flex items-center gap-6">
        <li>
          <Link to="/" className="hover:text-orange-400">
            Home
          </Link>
        </li>

        <li>
          <Link to="/producttts" className="hover:text-orange-400">
            produits
          </Link>
        </li>

        <li>
          <Link to="/devis" className="hover:text-orange-400">
            Devis
          </Link>
        </li>

        {/* Admin Dropdown */}
        <li className="relative">
          <button
            onClick={() => setOpenAdmin(!openAdmin)}
            className="hover:text-orange-400"
          >
            Admin ▾
          </button>

          {openAdmin && (
            <ul className="absolute right-0 mt-2 bg-white text-gray-800 rounded shadow-md w-48">
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/login">Login</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/admin/productsAdmin">Gestion Produits</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <Link to="/admin/orders">Commandes</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}
