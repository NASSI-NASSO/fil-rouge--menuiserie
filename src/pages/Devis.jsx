import { useSelector, useDispatch } from "react-redux";
import {
  removeFromDevis,
  increaseQty,
  decreaseQty,
  clearDevis,
  addToDevis
} from "../redux/devisSlice";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrash, FaPaperPlane, FaLightbulb, FaMagic } from "react-icons/fa";





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
  const [proposal, setProposal] = useState("");
  const [pdfUrl, setPdfUrl] = useState(null);

  const [isProposalLoading, setIsProposalLoading] = useState(false);


  const [form, setForm] = useState({
    materiau: "",
    categorie: "",
    dimensions: "",
    vantaux: 1,
    profil: "",
    motorise: false,
    couleur: "",
    nom: "",
    email: "",
    telephone: "",
  });


  const hasConfiguration =
    form.materiau ||
    form.categorie ||
    form.dimensions ||
    form.couleur ||
    form.vantaux > 1 ||
    form.profil ||
    form.motorise;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddConfiguration = () => {
    if (!hasConfiguration) {
      alert("Veuillez configurer un produit avant de l'ajouter.");
      return;
    }
    
    if (!form.categorie && !form.materiau) {
       alert("Veuillez sélectionner au moins une catégorie ou un matériau pour identifier le produit.");
       return;
    }

    const newItem = {
      id: `custom-${Date.now()}`,
      titre: `${form.categorie} ${form.materiau} ${form.dimensions ? `(${form.dimensions})` : ""}`,
      quantity: 1,
      prix: 0,
      ...form
    };

    dispatch(addToDevis(newItem));

    // Reset configuration form only
    setForm(prev => ({
      ...prev,
      materiau: "",
      categorie: "",
      dimensions: "",
      vantaux: 1,
      profil: "",
      motorise: false,
      couleur: ""
    }));
  };

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  //gere ai
  const generateAiProposal = async () => {
    if (items.length === 0 && !hasConfiguration) {
      alert("Ajoutez des produits ou une configuration avant de générer la proposition.");
      return;
    }

    setIsProposalLoading(true);

    const devisData = {
      client: { nom: form.nom || "Client", email: form.email },
      produits: items,
      configuration: hasConfiguration ? form : null,
      total,
    };

    try {
      const response = await axios.post(
        `${API_URL}/generate-pdf`,
        devisData,
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfUrl(url);
      setIsProposalLoading(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la génération du PDF AI.");
      setIsProposalLoading(false);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.telephone) {
      alert("Veuillez remplir les informations client (nom, email, téléphone)");
      return;
    }

    const hasProducts = items.length > 0;

    if (!hasProducts && !hasConfiguration) {
      alert("Veuillez ajouter au moins un produit ou remplir une configuration");
      return;
    }

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

    try {await Promise.all([
      // 🔵 Proxy via backend to avoid CORS with n8n
      axios.post(
        `${API_URL}/api/send-quote`,
        devisData,
        { headers: { "Content-Type": "application/json" } }
      ),

      // 🟢 Stockage MockAPI
      axios.post(
        "https://696787ddbbe157c088b2396f.mockapi.io/product/ordre",
        devisData
      ),
    ]);
      
      alert("Devis envoyé avec succès ✅");
      dispatch(clearDevis());
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
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8"
      >
        {/* 🔵 PARTIE GAUCHE : FORMULAIRE */}
        <div className="space-y-8">
          <motion.section
            variants={item}
            className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
          >
            <h2 className="text-2xl font-bold mb-8 text-slate-800 flex items-center gap-3">
              <span className="p-2 bg-brand-teal/10 text-brand-teal rounded-xl"><FaLightbulb /></span>
              Configuration du Projet
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Matériau</label>
                <select
                  name="materiau"
                  value={form.materiau}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                >
                  <option value="">Sélectionner</option>
                  <option>Inox</option>
                  <option>Aluminium</option>
                  <option>Fer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Catégorie</label>
                <select
                  name="categorie"
                  value={form.categorie}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                >
                  <option value="">Sélectionner</option>
                  <option>Fenêtre</option>
                  <option>Porte</option>
                  <option>Garde-corps</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Dimensions</label>
                <input
                  name="dimensions"
                  placeholder="Ex: 120x230"
                  value={form.dimensions}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vantaux</label>
                <input
                  type="number"
                  min="1"
                  name="vantaux"
                  value={form.vantaux}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Profil</label>
                <select
                  name="profil"
                  value={form.profil}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                >
                  <option value="">Sélectionner</option>
                  <option>Standard</option>
                  <option>Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Couleur</label>
                <input
                  name="couleur"
                  placeholder="Ex: Gris givré"
                  value={form.couleur}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer border-2 border-transparent hover:border-brand-teal/20">
                <input
                  type="checkbox"
                  name="motorise"
                  checked={form.motorise}
                  onChange={handleChange}
                  className="w-5 h-5 accent-brand-teal rounded"
                />
                <span className="text-slate-700 font-medium">Equipement motorisé</span>
              </label>

              <button
                type="button"
                onClick={handleAddConfiguration}
                className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-700 transition-all flex items-center gap-2 shadow-lg shadow-slate-800/20"
              >
                <span>+</span> Ajouter
              </button>
            </div>

            <div className="mt-10 space-y-4 pt-8 border-t-2 border-slate-50">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Informations Client</h3>
              <input
                name="nom"
                placeholder="Nom complet"
                value={form.nom}
                onChange={handleChange}
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all bg-slate-50"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                />
                <input
                  name="telephone"
                  placeholder="Téléphone"
                  value={form.telephone}
                  onChange={handleChange}
                  className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-4 focus:ring-brand-teal/10 transition-all bg-slate-50"
                />
              </div>
            </div>
          </motion.section>
        </div>

        {/* 🟢 PARTIE DROITE : RECAPITULATIF & DEVIS AI */}
        <div className="space-y-8">
          <motion.section
            variants={item}
            className="bg-white rounded-3xl shadow-xl p-8 flex flex-col border border-slate-100 min-h-[600px]"
          >
            <h2 className="text-2xl font-bold mb-8 text-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-brand-teal/10 text-brand-teal rounded-xl">🧾</span>
                Récapitulatif
              </div>
              <button
                onClick={generateAiProposal}
                disabled={isProposalLoading}
                className="text-xs bg-brand-blue text-white px-4 py-2 rounded-xl font-bold hover:bg-brand-blue-dark transition-all flex items-center gap-2 shadow-lg shadow-brand-blue/20 disabled:opacity-50"
              >
                {isProposalLoading ? (
                  <>
                    <span className="animate-spin">⌛</span> Génération...
                  </>
                ) : (
                  <>
                    <FaMagic /> Générer Devis AI
                  </>
                )}
              </button>
            </h2>

            <div className="flex-1 space-y-4 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {/* Display PDF if available */}
              {pdfUrl && (
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Devis AI PDF</h3>
                  <iframe src={pdfUrl} width="100%" height="400px" className="rounded-xl border border-slate-200"></iframe>
                  <div className="text-right mt-2">
                    <a href={pdfUrl} download="Devis_FlachMetal.pdf" className="text-sm text-brand-teal hover:underline font-medium">
                      Télécharger le PDF
                    </a>
                  </div>
                </div>
              )}

              {items.length === 0 && !hasConfiguration ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl">
                  <div className="text-5xl mb-4 grayscale opacity-30">📦</div>
                  <p className="text-slate-400 font-medium">Votre sélection est vide</p>
                </div>
              ) : (
                <>
                  {/* Produits sélectionnés */}
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="group flex justify-between items-center bg-slate-50 p-5 rounded-2xl border border-transparent hover:border-slate-200 transition-all"
                    >
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{item.titre}</p>
                        {item.prix > 0 ? (
                          <p className="text-xs text-slate-500 mt-1">{item.prix} MAD / unité</p>
                        ) : (
                          <p className="text-xs text-brand-teal font-medium mt-1">Sur devis</p>
                        )}
                        <div className="flex items-center gap-3 mt-4">
                          <button onClick={() => dispatch(decreaseQty(item.id))} className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50">−</button>
                          <span className="font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => dispatch(increaseQty(item.id))} className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-100 flex items-center justify-center hover:bg-slate-50">+</button>
                        </div>
                      </div>
                      <div className="text-right">
                        {item.prix > 0 ? (
                          <p className="font-bold text-lg text-slate-800">{item.prix * item.quantity} MAD</p>
                        ) : (
                          <p className="font-bold text-lg text-brand-teal">Sur devis</p>
                        )}
                        <button onClick={() => dispatch(removeFromDevis(item.id))} className="text-red-400 hover:text-red-600 mt-2 p-2 rounded-lg hover:bg-red-50 transition-all"><FaTrash size={14} /></button>
                      </div>
                    </motion.div>
                  ))}

                  {/* Configuration sur mesure */}
                  {hasConfiguration && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-brand-blue/5 p-6 rounded-2xl border border-brand-blue/10"
                    >
                      <h4 className="font-bold text-brand-blue text-sm uppercase tracking-wider mb-4">Spécifications sur mesure</h4>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                        <div className="text-xs"><span className="text-slate-500">Catégorie:</span> <span className="font-bold">{form.categorie}</span></div>
                        <div className="text-xs"><span className="text-slate-500">Matériau:</span> <span className="font-bold">{form.materiau}</span></div>
                        <div className="text-xs"><span className="text-slate-500">Dimensions:</span> <span className="font-bold">{form.dimensions || "Standard"}</span></div>
                        <div className="text-xs"><span className="text-slate-500">Profil:</span> <span className="font-bold">{form.profil}</span></div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>



            <div className="mt-auto pt-8 border-t-2 border-slate-50">

              {items.length > 0 && (
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">Total estimé</p>
                    <p className="text-4xl font-black text-slate-800">
                      {total} <span className="text-xl text-slate-400 font-bold uppercase">MAD</span>
                    </p>
                  </div>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                disabled={(!items.length && !hasConfiguration)}
                onClick={handleSubmit}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-5 rounded-3xl text-lg font-bold shadow-2xl transition-all disabled:opacity-20 disabled:grayscale flex items-center justify-center gap-3"
              >
                <FaPaperPlane /> Valider ce Devis
              </motion.button>
            </div>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
}