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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Produits</h1>

        <button
          onClick={() => navigate("/admin/AddProduct")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Ajouter un produit
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th>Image</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Prix</th>
            <th>Matériau</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t text-center">
              <td>
                <img
                  src={product.image}
                  alt={product.titre}
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td>{product.titre}</td>
              <td>{product.description}</td>
              <td>{product.prix} DH</td>
              <td>{product.materiau}</td>
              <td>{product.categorie}</td>
              <td className="space-x-2">
                <button
                  onClick={() =>
                    navigate(`/admin/Editproduct/${product.id}`)
                  }
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Modifier
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
