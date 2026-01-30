import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-100"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-brand-teal to-brand-blue rounded-full flex items-center justify-center text-4xl">
              🔐
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Connexion Admin
          </h1>
          <p className="text-gray-600">
            Accédez à votre espace d'administration
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@menuiserie-premium.ma"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-brand-teal border-gray-300 rounded focus:ring-brand-teal"
              />
              <span className="text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-sm text-brand-teal hover:text-brand-teal-dark font-medium">
              Mot de passe oublié ?
            </a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-brand-blue text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-brand-teal/50 transition-all duration-300"
          >
            Se connecter
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Retour à l'accueil ?{" "}
            <Link to="/" className="text-brand-teal hover:text-brand-teal-dark font-semibold">
              Cliquez ici
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
