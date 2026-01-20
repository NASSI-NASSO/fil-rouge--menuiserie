export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
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

      <button
        onClick={() => onAdd(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Ajouter au devis
      </button>
    </div>
  );
}
