import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    titre: "",
    description: "",
    materiau: "",
    categorie: "",
    dimensions: "",
    vantaux: "",
    prix: "",
    profil: "",
    motorise: false,
    couleur: "",
    image: null,
  });

  // 🔹 Gère tous les inputs
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setProducts({ ...products, image: files[0] });
    } else if (type === "checkbox") {
      setProducts({ ...products, [name]: checked });
    } else {
      setProducts({ ...products, [name]: value });
    }
  };

  // 🔹 Upload image vers Cloudinary
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "react_upload");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dmc3tdoll/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  // 🔹 Envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      if (products.image) {
        imageUrl = await uploadImage(products.image);
      }

      const newProduct = {
        ...products,
        image: imageUrl,
      };

      await axios.post(
        "https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct",
        newProduct
      );

      alert("Produit ajouté avec succès ✅");

      // 🔁 Reset formulaire après succès
      setProducts({
        titre: "",
        description: "",
        materiau: "",
        categorie: "",
        dimensions: "",
        vantaux: "",
        prix: "",
        profil: "",
        motorise: false,
        couleur: "",
        image: null,
      });
    } catch (error) {
      console.error("Erreur ajout produit :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <form
        onSubmit={handleSubmit}
        className="relative max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-6 border border-gray-100"
      >
        <button
          type="button"
          onClick={() => navigate("/admin/productsAdmin")}
          className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-full transition-all duration-300"
          title="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Ajouter un produit
          </h2>
          <p className="text-gray-600">Remplissez les informations du nouveau produit</p>
        </div>

        {/* Titre */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            name="titre"
            onChange={handleChange}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            placeholder="Titre du produit"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            onChange={handleChange}
            rows="4"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3
            focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300 resize-none"
            placeholder="Description détaillée du produit"
          />
        </div>

        {/* Selects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Matériau</label>
            <select
              name="materiau"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Choisir</option>
              <option>Aluminium</option>
              <option>Inox</option>
              <option>Fer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
            <select
              name="categorie"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Choisir</option>
              <option>Fenêtre</option>
              <option>Porte</option>
              <option>Portail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Profil</label>
            <select
              name="profil"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Choisir</option>
              <option>Standard</option>
              <option>Renforcé</option>
              <option>Élite</option>
            </select>
          </div>
        </div>

        {/* Dimensions & Prix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              placeholder="Ex: 2,20 H*1,20 L"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre de Vantaux</label>
            <input
              type="number"
              name="vantaux"
              min="1"
              step="1"
              placeholder="Ex: 2"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (MAD) *</label>
            <input
              type="number"
              name="prix"
              placeholder="Ex: 1500"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
              required
            />
          </div>
        </div>

        {/* Couleur & Motorisé */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
            <input
              type="text"
              name="couleur"
              placeholder="Ex: Gris givré"
              onChange={handleChange}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors w-full">
              <input
                type="checkbox"
                name="motorise"
                onChange={handleChange}
                className="w-5 h-5 text-brand-teal border-gray-300 rounded focus:ring-brand-teal focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Motorisé</span>
            </label>
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Image du produit</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600
            file:bg-gradient-to-r file:from-brand-teal file:to-brand-teal-dark file:text-white file:px-6 file:py-3
            file:rounded-xl file:border-0 file:font-semibold file:cursor-pointer hover:file:from-brand-teal-dark hover:file:to-brand-blue transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-brand-blue
          text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:shadow-brand-teal/50 transition-all duration-300 mt-8"
        >
          ✅ Ajouter le produit
        </button>
      </form>
    </div>
  )
}