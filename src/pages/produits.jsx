import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToDevis } from "../redux/devisSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // Charger les produits depuis l'API
  useEffect(() => {
    axios
      .get("https://696787ddbbe157c088b2396f.mockapi.io/product/MenuiserieProduct")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Nos Produits</h2>

      <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (<div  key={product.id} className="bg-white rounded-xl shadow p-4">
      <img
        src={product.image}
        alt={product.titre}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h3 className="text-lg font-semibold mt-3">
        {product.titre}
      </h3>

      <p className="text-gray-600 text-sm mt-2">
        {product.description}
      </p>
      <h2>{product.prix}</h2>

      <button
        onClick={() => dispatch(addToDevis(product))}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Ajouter au devis
      </button>
    </div>
          
         
        ))}
      </div>
    </div>
  );
}
