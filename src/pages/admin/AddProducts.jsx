import { useState } from "react";
import axios from "axios";
export default function AddProducts() {
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
    <form
  onSubmit={handleSubmit}
  className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-5"
>
  <h2 className="text-2xl font-bold text-gray-800 text-center">
    Ajouter un produit
  </h2>

  {/* Titre */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Titre
    </label>
    <input
      type="text"
      name="titre"
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Titre du produit"
      required
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Description
    </label>
    <textarea
      name="description"
      onChange={handleChange}
      rows="3"
      className="w-full border border-gray-300 rounded-lg px-4 py-2
      focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Description du produit"
    />
  </div>

  {/* Selects */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">Matériau</label>
      <select
        name="materiau"
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Choisir</option>
        <option>Aluminium</option>
        <option>Inox</option>
        <option>Fer</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Catégorie</label>
      <select
        name="categorie"
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Choisir</option>
        <option>Fenêtre</option>
        <option>Porte</option>
        <option>Portail</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">Profil</label>
      <select
        name="profil"
        onChange={handleChange}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="">Choisir</option>
        <option>Standard</option>
        <option>Renforcé</option>
        <option>Élite</option>
      </select>
    </div>
  </div>

  {/* Dimensions & Prix */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <input
      type="text"
      name="dimensions"
      placeholder="Dimensions ex: 2,20 H*1,20 L"
      onChange={handleChange}
      className="border rounded-lg px-3 py-2"
    />
    <input
      type="number"
      name="vantaux"
      min="1"
      step="1"
      placeholder=" nembre de Vantaux"
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 "
    />
    <input
      type="number"
      name="prix"
      placeholder="Prix (MAD)"
      onChange={handleChange}
      className="border rounded-lg px-3 py-2"
    />
  </div>

  {/* Couleur & Motorisé */}
  <div className="flex items-center justify-between">
    <input
      type="text"
      name="couleur"
      placeholder="Couleur:gris givre"
      onChange={handleChange}
      className="border rounded-lg px-3 py-2 w-2/3"
    />

    <label className="flex items-center gap-2 text-sm">
      <input
        type="checkbox"
        name="motorise"
        onChange={handleChange}
        className="w-4 h-4"
      />
      Motorisé
    </label>
  </div>

  {/* Image */}
  <div>
    <label className="block text-sm font-medium mb-1">Image</label>
    <input
      type="file"
      name="image"
      accept="image/*"
      onChange={handleChange}
      className="block w-full text-sm text-gray-600
      file:bg-blue-600 file:text-white file:px-4 file:py-2
      file:rounded-lg file:border-0 cursor-pointer"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700
    text-white font-semibold py-3 rounded-xl transition"
  >
    Ajouter le produit
  </button>
</form>
  )}