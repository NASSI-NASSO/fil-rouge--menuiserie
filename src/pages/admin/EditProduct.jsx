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
      navigate("/products");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification ❌");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-5"
    >
      <h2 className="text-2xl font-bold text-center">Modifier le produit</h2>

      <input
        type="text"
        name="titre"
        value={product.titre}
        onChange={handleChange}
        placeholder="Titre"
        className="w-full border rounded-lg px-3 py-2"
      />

      <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded-lg px-3 py-2"
      />

      {/* SELECTS */}
      <div className="grid grid-cols-3 gap-4">
        <select name="materiau" value={product.materiau} onChange={handleChange} className="border rounded-lg px-3 py-2">
          <option value="">Matériau</option>
          <option>Aluminium</option>
          <option>Inox</option>
          <option>Fer</option>
        </select>

        <select name="categorie" value={product.categorie} onChange={handleChange} className="border rounded-lg px-3 py-2">
          <option value="">Catégorie</option>
          <option>Fenêtre</option>
          <option>Porte</option>
          <option>Portail</option>
        </select>

        <select name="profil" value={product.profil} onChange={handleChange} className="border rounded-lg px-3 py-2">
          <option value="">Profil</option>
          <option>Standard</option>
          <option>Renforcé</option>
          <option>Élite</option>
        </select>
      </div>

      {/* NUMBERS */}
      <div className="grid grid-cols-3 gap-4">
        <input type="number" name="dimensions" value={product.dimensions} onChange={handleChange} min="0.01" step="0.01" placeholder="Dimensions" className="border rounded-lg px-3 py-2 appearance-none" />
        <input type="number" name="vantaux" value={product.vantaux} onChange={handleChange} min="1" step="1" placeholder="Vantaux" className="border rounded-lg px-3 py-2 appearance-none" />
        <input type="number" name="prix" value={product.prix} onChange={handleChange} min="0.01" step="0.01" placeholder="Prix" className="border rounded-lg px-3 py-2 appearance-none" />
      </div>

      {/* CHECKBOX */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="motorise"
          checked={product.motorise}
          onChange={handleChange}
        />
        Motorisé
      </label>

      {/* IMAGE */}
      {typeof product.image === "string" && (
        <img src={product.image} alt="" className="h-24 rounded-lg" />
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-3 rounded-xl"
      >
        Enregistrer les modifications
      </button>
    </form>
  );
}

