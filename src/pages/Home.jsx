import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* 🔵 HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Excellence en Menuiserie
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          Spécialistes en Aluminium, Inox et Fer Forgé
        </motion.p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
          >
            Découvrir nos produits
          </Link>
        </motion.div>
      </section>

      {/* 🟢 POURQUOI NOUS CHOISIR */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Pourquoi nous choisir ?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Expertise",
              text: "Plus de 20 ans d'expérience dans la menuiserie aluminium, inox et fer forgé. Un savoir-faire reconnu.",
            },
            {
              title: "Qualité",
              text: "Matériaux premium, finitions impeccables et produits conformes aux normes européennes.",
            },
            {
              title: "Sur-mesure",
              text: "Chaque projet est unique. Des solutions personnalisées adaptées à vos besoins et votre budget.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="bg-white p-8 rounded-2xl shadow-lg text-center"
            >
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟠 NOS MATÉRIAUX */}
      <section className="bg-gray-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nos Matériaux
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Aluminium",
              text: "Léger, résistant et moderne. Idéal pour fenêtres, portes et portails.",
            },
            {
              title: "Inox",
              text: "Élégant et inoxydable. Parfait pour les environnements exigeants.",
            },
            {
              title: "Fer Forgé",
              text: "Traditionnel et robuste. Pour un style classique et authentique.",
            },
          ].map((mat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-8 rounded-2xl shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-3">{mat.title}</h3>
              <p className="text-gray-600">{mat.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 CALL TO ACTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à démarrer votre projet ?
        </h2>
        <p className="mb-8 text-lg">
          Demandez votre devis gratuit et personnalisé en quelques clics
        </p>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            to="/devis"
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg"
          >
            Demander un devis
          </Link>
        </motion.div>
      </section>

      {/* ⚫ FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © 2026 Menuiserie Premium – Tous droits réservés
      </footer>
    </div>
  );
}
