import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { HeroSlider } from "../Composent/Herosction";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-800">
      <HeroSlider />

      {/* 🟢 POURQUOI NOUS CHOISIR */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          Pourquoi nous choisir ?
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Expertise",
              text: "Plus de 20 ans d'expérience dans la menuiserie aluminium, inox et fer forgé. Un savoir-faire reconnu.",
            },
            {
              icon: "⭐",
              title: "Qualité",
              text: "Matériaux premium, finitions impeccables et produits conformes aux normes européennes.",
            },
            {
              icon: "✨",
              title: "Sur-mesure",
              text: "Chaque projet est unique. Des solutions personnalisées adaptées à vos besoins et votre budget.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl text-center border border-gray-100 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🟠 NOS MATÉRIAUX */}
      <section className="bg-gradient-to-br from-gray-100 to-gray-50 py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
        >
          Nos Matériaux
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              title: "Aluminium",
              text: "Léger, résistant et moderne. Idéal pour fenêtres, portes et portails.",
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              title: "Inox",
              text: "Élégant et inoxydable. Parfait pour les environnements exigeants.",
              gradient: "from-gray-400 to-gray-600",
            },
            {
              title: "Fer Forgé",
              text: "Traditionnel et robuste. Pour un style classique et authentique.",
              gradient: "from-orange-600 to-red-600",
            },
          ].map((mat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05, y: -8 }}
              className={`bg-gradient-to-br ${mat.gradient} p-8 rounded-3xl shadow-xl hover:shadow-2xl text-white transition-all duration-300`}
            >
              <h3 className="text-3xl font-bold mb-4">{mat.title}</h3>
              <p className="text-white/90 leading-relaxed">{mat.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 CALL TO ACTION */}
      <section className="py-24 px-6 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}
          ></div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Prêt à démarrer votre projet ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-10 text-xl text-white/90"
          >
            Demandez votre devis gratuit et personnalisé en quelques clics
          </motion.p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/devis"
              className="inline-block bg-white text-orange-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all duration-300"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
