import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API_URL =
    "https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct";

  // 🔹 Récupérer les produits
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  // 🔹 Supprimer un produit
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;

    await axios.delete(`${API_URL}/${id}`);
    fetchProducts(); // refresh
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Gestion des Produits
          </h1>

          <button
            onClick={() => navigate("/admin/AddProduct")}
            className="bg-gradient-to-r from-brand-teal to-brand-teal-dark hover:from-brand-teal-dark hover:to-brand-blue text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-brand-teal/50 transition-all duration-300 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Ajouter un produit
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Image</th>
                  <th className="px-6 py-4 text-left font-semibold">Titre</th>
                  <th className="px-6 py-4 text-left font-semibold">Description</th>
                  <th className="px-6 py-4 text-left font-semibold">Prix</th>
                  <th className="px-6 py-4 text-left font-semibold">Matériau</th>
                  <th className="px-6 py-4 text-left font-semibold">Catégorie</th>
                  <th className="px-6 py-4 text-center font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={product.image}
                        alt={product.titre}
                        className="w-20 h-20 object-cover rounded-lg shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">{product.titre}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{product.description}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-brand-teal">{product.prix} MAD</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product.materiau}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-sm font-medium">
                        {product.categorie}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/admin/Editproduct/${product.id}`)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                          ✏️ Modifier
                        </button>

                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-xl">Aucun produit disponible</p>
          </div>
        )}
      </div>
    </div>
  )
}
