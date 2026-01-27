import { useSelector, useDispatch } from "react-redux";
import {
  removeFromDevis,
  increaseQty,
  decreaseQty,
  clearDevis 
} from "../redux/devisSlice";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Devis() {
  const { items, total } = useSelector((state) => state.devis);
  const dispatch = useDispatch();
   const [form, setForm] = useState({
    materiau: "Inox",
    categorie: "Fenêtre",
    dimensions: "",
    vantaux: 1,
    profil: "standard",
    motorise: false,
    couleur: "",
    nom: "",
    email: "",
    telephone: "",
  });
  const hasConfiguration =
    form.dimensions ||
    form.couleur ||
    form.vantaux > 1 ||
    form.motorise;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("🔥 handleSubmit déclenché");
    // 1️⃣ Vérifier infos client
  if (!form.nom || !form.email || !form.telephone) {
    alert("Veuillez remplir les informations client (nom, email, téléphone)");
    return;
  }

  // 2️⃣ Vérifier s'il y a produits OU configuration
  const hasProducts = items.length > 0;

  

  if (!hasProducts && !hasConfiguration) {
    alert(
      "Veuillez ajouter au moins un produit ou remplir une configuration"
    );
    return;
  }

  // 3️⃣ Construire le devis dynamiquement
  const devisData = {
    client: {
      nom: form.nom,
      email: form.email,
      telephone: form.telephone,
    },
    produits: hasProducts ? items : [],
    configuration: hasConfiguration
      ? {
          materiau: form.materiau,
          categorie: form.categorie,
          dimensions: form.dimensions,
          vantaux: form.vantaux,
          profil: form.profil,
          motorise: form.motorise,
          couleur: form.couleur,
        }
      : null,
    total,
    date: new Date().toISOString(),
  };
    try {
      await axios.post(
        "https://696787ddbbe157c088b2396f.mockapi.io/product/ordre",
        devisData
      );
      console.log("DEVIS DATA 👉", devisData);

      alert("Devis envoyé avec succès ✅");

      dispatch(clearDevis()); // vider Redux
      setForm({
        materiau: "Inox",
        categorie: "Fenêtre",
        dimensions: "",
        vantaux: 1,
        profil: "standard",
        motorise: false,
        couleur: "",
        nom: "",
        email: "",
        telephone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l’envoi ❌");
    }
  };

   return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10"
      >
        {/* 🔵 FORMULAIRE */}
        <motion.section
          variants={item}
          className="bg-white/80 backdrop-blur rounded-3xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            📋 Informations du devis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="materiau"
              value={form.materiau}
              onChange={handleChange}
              className="input"
            >
              <option value="">Matériau</option>
              <option>Inox</option>
              <option>Aluminium</option>
              <option>Fer</option>
            </select>

            <select
              name="categorie"
              value={form.categorie}
              onChange={handleChange}
              className="input"
            >
              <option value="">Catégorie</option>
              <option>Fenêtre</option>
              <option>Porte</option>
              <option>Garde-corps</option>
            </select>

            <input
              name="dimensions"
              placeholder="Dimensions (120x230)"
              value={form.dimensions}
              onChange={handleChange}
              className="input"
            />

            <input
              type="number"
              min="1"
              name="vantaux"
              value={form.vantaux}
              onChange={handleChange}
              className="input"
            />

            <select
              name="profil"
              value={form.profil}
              onChange={handleChange}
              className="input"
            >
              <option value="">Profil</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>

            <input
              name="couleur"
              placeholder="Couleur"
              value={form.couleur}
              onChange={handleChange}
              className="input"
            />
          </div>

          <label className=" h-5 w-5flex items-center gap-3 mt-4">
            <input className='w-full border border-gray-300 rounded-xl px-4 py-3
         focus:outline-none focus:ring-2 focus:ring-blue-500'
              type="checkbox"
              name="motorise"
              checked={form.motorise}
              onChange={handleChange}
      
            />
            <span className="text-gray-700">Motorisé</span>
          </label>

          <div className="mt-6 space-y-4">
            <input
              name="nom"
              placeholder="Nom complet"
              value={form.nom}
              onChange={handleChange}
              className="input"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input"
            />

            <input
              name="telephone"
              placeholder="Téléphone"
              value={form.telephone}
              onChange={handleChange}
              className="input"
            />
          </div>
        </motion.section>

        {/* 🟢 DEVIS */}
        <motion.section
          variants={item}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🧾 Récapitulatif du devis
          </h2>

          <div className="flex-1 space-y-4">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                Aucun produit ajouté
              </p>
            ) : (
              items.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-xl"
                >
                  <div>
                    <p className="font-semibold">{item.titre}</p>
                    <p className="text-sm text-gray-500">
                      Quantité : {item.quantity}
                    </p>
                    {/* Quantité */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => dispatch(decreaseQty(item.id))}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        −
                      </button>

                      <span className="font-bold">{item.quantity}</span>

                      <button
                        onClick={() => dispatch(increaseQty(item.id))}
                        className="px-3 py-1 bg-gray-300 rounded"
                      >
                        +
                      </button>
        
                    </div>
                    
                  </div>
                  <p className="font-bold text-blue-600">
                    {item.prix * item.quantity} MAD
                  </p>
                          {/* Supprimer */}
                  <button
                    onClick={() => dispatch(removeFromDevis(item.id))}
                    className="text-red-600 font-bold"
                  >
                    🗑
                  </button>
                </motion.div>
              ))
            )}
          </div>

          <div className="border-t mt-6 pt-4 text-xl font-bold">
            Total : {total} MAD
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            disabled={!items.length && !hasConfiguration}
            onClick={handleSubmit}
            className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-2xl text-lg disabled:opacity-50"
          >
            Envoyer le devis
          </motion.button>
        </motion.section>
      </motion.div>
    </div>
  );
}