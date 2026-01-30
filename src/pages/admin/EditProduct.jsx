import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
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
    image: "",
  });

  // 🔹 Charger le produit existant
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  // 🔹 handleChange (même logique que AddProduct)
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      setProduct({ ...product, [name]: files[0] });
    } else if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else if (type === "number") {
      setProduct({ ...product, [name]: value === "" ? "" : Number(value) });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  // 🔹 Upload image (optionnel)
  const uploadImage = async (imageFile) => {
    if (!imageFile || typeof imageFile === "string") return imageFile;

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "react_upload");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dmc3tdoll/image/upload",
      formData
    );

    return res.data.secure_url;
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = await uploadImage(product.image);

      const updatedProduct = {
        ...product,
        image: imageUrl,
      };

      await axios.put(
        `https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct/${id}`,
        updatedProduct
      );

      alert("Produit modifié avec succès ✅");
      navigate("/admin/productsAdmin");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10 space-y-6 border border-gray-100"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Modifier le produit
          </h2>
          <p className="text-gray-600">Mettez à jour les informations du produit</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
          <input
            type="text"
            name="titre"
            value={product.titre}
            onChange={handleChange}
            placeholder="Titre du produit"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description du produit"
            rows="4"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none"
          />
        </div>

        {/* SELECTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Matériau</label>
            <select 
              name="materiau" 
              value={product.materiau} 
              onChange={handleChange} 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Sélectionner</option>
              <option>Aluminium</option>
              <option>Inox</option>
              <option>Fer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
            <select 
              name="categorie" 
              value={product.categorie} 
              onChange={handleChange} 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Sélectionner</option>
              <option>Fenêtre</option>
              <option>Porte</option>
              <option>Portail</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Profil</label>
            <select 
              name="profil" 
              value={product.profil} 
              onChange={handleChange} 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 bg-white"
            >
              <option value="">Sélectionner</option>
              <option>Standard</option>
              <option>Renforcé</option>
              <option>Élite</option>
            </select>
          </div>
        </div>

        {/* NUMBERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dimensions</label>
            <input 
              type="text" 
              name="dimensions" 
              value={product.dimensions} 
              onChange={handleChange} 
              placeholder="Ex: 2,20 H*1,20 L" 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vantaux</label>
            <input 
              type="number" 
              name="vantaux" 
              value={product.vantaux} 
              onChange={handleChange} 
              min="1" 
              step="1" 
              placeholder="Nombre" 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Prix (MAD) *</label>
            <input 
              type="number" 
              name="prix" 
              value={product.prix} 
              onChange={handleChange} 
              min="0.01" 
              step="0.01" 
              placeholder="Prix" 
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
              required
            />
          </div>
        </div>

        {/* CHECKBOX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Couleur</label>
            <input
              type="text"
              name="couleur"
              value={product.couleur}
              onChange={handleChange}
              placeholder="Ex: Gris givré"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors w-full">
              <input
                type="checkbox"
                name="motorise"
                checked={product.motorise}
                onChange={handleChange}
                className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
              />
              <span className="text-gray-700 font-medium">Motorisé</span>
            </label>
          </div>
        </div>

        {/* IMAGE */}
        {typeof product.image === "string" && product.image && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Image actuelle</label>
            <img src={product.image} alt="Produit" className="h-48 w-48 object-cover rounded-xl shadow-md border-2 border-gray-200" />
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {typeof product.image === "string" && product.image ? "Changer l'image" : "Image du produit"}
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600
            file:bg-gradient-to-r file:from-orange-500 file:to-orange-600 file:text-white file:px-6 file:py-3
            file:rounded-xl file:border-0 file:font-semibold file:cursor-pointer hover:file:from-orange-600 hover:file:to-orange-700 transition-all duration-300 cursor-pointer"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/productsAdmin")}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-4 rounded-xl font-bold transition-all duration-300"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-green-500/50 transition-all duration-300"
          >
            ✅ Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}

