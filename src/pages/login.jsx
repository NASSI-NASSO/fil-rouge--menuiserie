import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin-secret");
    } else {
      setError("Mot de passe incorrect");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full border border-gray-100"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-brand-teal to-brand-blue rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            🔐
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Connexion Admin
          </h1>
          <p className="text-gray-600">
            Espace réservé aux administrateurs
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Entrez le mot de passe"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
      </motion.div>
    </div>
  );
}
