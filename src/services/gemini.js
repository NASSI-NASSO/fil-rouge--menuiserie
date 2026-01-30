import axios from "axios";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const callGemini = async (prompt) => {
  if (!API_KEY) {
    console.warn("Gemini API Key missing! Simulation mode active.");
    return null;
  }

  try {
    const res = await axios.post(MODEL_URL, {
      contents: [{ parts: [{ text: prompt }] }]
    });
    return res.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

/**
 * Parsage de l'intention utilisateur pour remplir le formulaire
 */
export const parseUserIntent = async (userInput) => {
  const prompt = `
    Analyse cette demande de menuiserie et retourne UNIQUEMENT un objet JSON valide (sans markdown).
    Champs possibles : materiau ("Inox", "Aluminium", "Fer"), categorie ("Fenêtre", "Porte", "Garde-corps"), dimensions (ex: "120x150"), vantaux (nombre), profil ("standard", "premium"), motorise (boolean), couleur (string).
    
    Demande : "${userInput}"
  `;

  const response = await callGemini(prompt);
  if (!response) return null;

  try {
    // Nettoyage car Gemini peut retourner des backticks \`\`\`json ... \`\`\`
    const jsonStr = response.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse Gemini JSON:", response);
    return null;
  }
};

/**
 * Génération d'une proposition commerciale professionnelle
 */
export const generateProfessionalProposal = async (data) => {
  const prompt = `
    Tu es un expert commercial en menuiserie de luxe. 
    Rédige une proposition commerciale élégante et convaincante en Français pour ce devis :
    Client: ${data.client.nom}
    Produits: ${JSON.stringify(data.produits)}
    Configuration: ${JSON.stringify(data.configuration)}
    Total: ${data.total} MAD
    
    Inclus des conseils techniques et une structure professionnelle (Markdown).
  `;

  return await callGemini(prompt);
};
