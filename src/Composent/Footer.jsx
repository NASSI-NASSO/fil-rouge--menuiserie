import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src="logo.png" alt="Logo" className="h-12 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-brand-teal to-brand-blue bg-clip-text text-transparent">
                Flach Metal
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Spécialistes en menuiserie aluminium, inox et fer forgé.
              Plus de 20 ans d'expérience au service de vos projets sur-mesure.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-brand-teal transition-colors duration-200 flex items-center gap-2">
                  <span>→</span> Accueil
                </Link>
              </li>
              <li>
                <Link to="/producttts" className="hover:text-brand-teal transition-colors duration-200 flex items-center gap-2">
                  <span>→</span> Produits
                </Link>
              </li>
              <li>
                <Link to="/devis" className="hover:text-brand-teal transition-colors duration-200 flex items-center gap-2">
                  <span>→</span> Devis
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span>📧</span> contact@menuiserie-premium.ma
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span> +212 6XX XXX XXX
              </li>
              <li className="flex items-center gap-2">
                <span>📍</span> Maroc
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Flach Metal – Tous droits réservés
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                Facebook
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                Instagram
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-brand-teal transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                LinkedIn
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

