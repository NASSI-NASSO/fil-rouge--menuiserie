import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToDevis } from "../redux/devisSlice";
import { motion } from "framer-motion";
import ProductCard from "../Composent/ProductCard";
import { FaFilter, FaLayerGroup, FaTools, FaUndo, FaTh, FaList } from "react-icons/fa";
import { HeroSimple } from "../Composent/Herosction";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const dispatch = useDispatch();

  // Charger les produits depuis l'API
  useEffect(() => {
    axios
      .get("https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Extraire les catégories et matériaux uniques
  const categories = ["All", ...new Set(products.map((p) => p.categorie).filter(Boolean))];
  const materials = ["All", ...new Set(products.map((p) => p.materiau).filter(Boolean))];

  // Filtrer les produits
  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === "All" || product.categorie === selectedCategory;
    const materialMatch = selectedMaterial === "All" || product.materiau === selectedMaterial;
    return categoryMatch && materialMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <HeroSimple
        title="Nos Produits"
        subtitle="Découvrez notre expertise à travers une large gamme de menuiseries premium."
      />

      <div className="max-w-7xl mx-auto py-12 px-6">
        {/* Zone de Filtrage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-gray-700">
              <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                <FaFilter size={20} />
              </div>
              <span className="font-semibold text-lg">Filtrer par :</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
              {/* Filtre Catégorie */}
              <div className="relative group w-full md:w-auto">
                <FaLayerGroup className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat === "All" ? "Toutes les catégories" : cat}</option>
                  ))}
                </select>
              </div>

              {/* Filtre Matériau */}
              <div className="relative group w-full md:w-auto">
                <FaTools className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="w-full md:w-48 pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  {materials.map((mat) => (
                    <option key={mat} value={mat}>{mat === "All" ? "Tous les matériaux" : mat}</option>
                  ))}
                </select>
              </div>

              {/* Bouton Reset */}
              {(selectedCategory !== "All" || selectedMaterial !== "All") && (
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedMaterial("All");
                  }}
                  className="flex items-center gap-2 px-5 py-3 text-red-500 font-medium hover:bg-red-50 rounded-xl transition-colors ml-auto md:ml-0"
                >
                  <FaUndo size={14} />
                  Réinitialiser
                </button>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => dispatch(addToDevis(product))}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Aucun produit ne correspond à vos critères.</p>
          </div>
        )}
      </div>
    </div>
  );
}
