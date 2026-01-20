import { useSelector, useDispatch } from "react-redux";
import { removeFromDevis } from "../redux/devisSlice";

export default function Devis() {
  const devis = useSelector((state) => state.devis.items);
  const dispatch = useDispatch();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Mon devis</h2>

      {devis.map((item) => (
        <div key={item.id} className="border p-3 mb-3 rounded">
      
          <h3>{item.titre}</h3>
          <p>{item.prix} MAD</p>

          <button
            onClick={() => dispatch(removeFromDevis(item.id))}
            className="text-red-600"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}


