import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const generateDevis = async (prompt) => {
const prompt = `
Tu es un expert en menuiserie aluminium, inox et fer forgé.

Génère un devis professionnel clair avec :
Client : ${form.nom}
Email : ${form.email}
Téléphone : ${form.telephone}

Produit ou configuration :
${items.length > 0 ? JSON.stringify(items) : "Configuration personnalisée"}

Le devis doit contenir :
- Description
- Quantité
- Prix unitaire
- Total HT
- TVA 20%
- Total TTC
- Délai de livraison
- Validité du devis
`;

  const res = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }
  );

  return res.data.candidates[0].content.parts[0].text;
};
