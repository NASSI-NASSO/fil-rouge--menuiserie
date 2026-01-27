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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <h1 className="text-4xl font-extrabold mb-10 text-gray-800">
        📦 Commandes clients
      </h1>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      >
        {orders.map((order) => (
          <motion.div
            key={order.id}
            variants={card}
            className="bg-white rounded-3xl shadow-xl p-6 flex flex-col"
          >
            {/* CLIENT */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                👤 {order.client?.nom || "—"}
              </h2>
              <p className="text-sm text-gray-500">{order.client?.email}</p>
              <p className="text-sm text-gray-500">
                📞 {order.client?.telephone}
              </p>
            </div>

            {/* CONFIGURATION */}
            {order.configuration && (
              <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-sm">
                <p><b>Matériau:</b> {order.configuration.materiau}</p>
                <p><b>Catégorie:</b> {order.configuration.categorie}</p>
                <p><b>Dimensions:</b> {order.configuration.dimensions}</p>
                <p><b>Vantaux:</b> {order.configuration.vantaux}</p>
                <p><b>Couleur:</b> {order.configuration.couleur}</p>
              </div>
            )}

            {/* PRODUITS */}
            {order.produits?.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">🛒 Produits</h3>
                <ul className="text-sm space-y-1">
                  {order.produits.map((p) => (
                    <li key={p.id}>
                      • {p.titre} × {p.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* TOTAL */}
            <div className="mt-auto">
              <div className="text-lg font-bold text-blue-600 mb-3">
                Total : {order.total} MAD
              </div>

              <p className="text-xs text-gray-400 mt-2 text-center">
                {new Date(order.date).toLocaleString()}
              </p>
              <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(order.id)}
                  className="
                    absolute -right-0 top-6
                    bg-red-100 text-red-600
                    w-10 h-10
                    rounded-full
                    flex items-center justify-center
                    shadow-md
                    hover:bg-red-600 hover:text-white
                    transition
                  "
                  title="Supprimer la commande"
                >
                  🗑
              </motion.button>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
