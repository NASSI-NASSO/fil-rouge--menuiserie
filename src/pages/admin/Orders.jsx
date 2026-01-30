import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://696787ddbbe157c088b2396f.mockapi.io/product/ordre")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette commande ?")) return;

    try {
      await axios.delete(
        `https://696787ddbbe157c088b2396f.mockapi.io/product/ordre/${id}`
      );
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (err) {
      alert("Erreur suppression ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-3">
          <span className="text-5xl">📦</span>
          Commandes clients
        </h1>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-xl">Aucune commande pour le moment</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {orders.map((order) => (
              <motion.div
                key={order.id}
                variants={card}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-xl p-6 flex flex-col border border-gray-100 relative hover:shadow-2xl transition-all duration-300"
              >
                {/* CLIENT */}
                <div className="mb-5 pb-5 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">👤</span>
                    {order.client?.nom || "—"}
                  </h2>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📧</span>
                    {order.client?.email}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                    <span>📞</span>
                    {order.client?.telephone}
                  </p>
                </div>

                {/* CONFIGURATION */}
                {order.configuration && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4 text-sm border border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-2">⚙️ Configuration</h3>
                    <div className="space-y-1 text-gray-700">
                      <p><span className="font-semibold">Matériau:</span> {order.configuration.materiau}</p>
                      <p><span className="font-semibold">Catégorie:</span> {order.configuration.categorie}</p>
                      {order.configuration.dimensions && (
                        <p><span className="font-semibold">Dimensions:</span> {order.configuration.dimensions}</p>
                      )}
                      {order.configuration.vantaux && (
                        <p><span className="font-semibold">Vantaux:</span> {order.configuration.vantaux}</p>
                      )}
                      {order.configuration.couleur && (
                        <p><span className="font-semibold">Couleur:</span> {order.configuration.couleur}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* PRODUITS */}
                {order.produits?.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                      <span>🛒</span>
                      Produits ({order.produits.length})
                    </h3>
                    <ul className="text-sm space-y-2 bg-gray-50 rounded-lg p-3">
                      {order.produits.map((p) => (
                        <li key={p.id} className="flex justify-between items-center text-gray-700">
                          <span>• {p.titre}</span>
                          <span className="font-semibold text-orange-600">× {p.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* TOTAL */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-gray-700">Total :</span>
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                      {order.total} MAD
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 text-center mb-4">
                    📅 {new Date(order.date).toLocaleString('fr-FR')}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(order.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
                    title="Supprimer la commande"
                  >
                    🗑️ Supprimer
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
