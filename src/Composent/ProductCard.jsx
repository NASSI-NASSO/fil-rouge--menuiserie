import { motion } from "framer-motion";

export default function ProductCard({ product, onAdd }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 group flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image || '/public/logo.png'}
          alt={product.titre}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {product.prix && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-slate-800 px-4 py-1.5 rounded-2xl text-sm font-bold shadow-sm border border-slate-100">
            {product.prix} MAD
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            {product.categorie && (
              <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                {product.categorie}
              </span>
            )}
            {product.materiau && (
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                {product.materiau}
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
            {product.titre}
          </h3>

          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Button Section - Pushed to bottom with mt-auto */}
        <div className="mt-auto pt-4">
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAdd(product)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Ajouter au devis</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}