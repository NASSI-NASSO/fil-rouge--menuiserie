import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// Diagnostics: List available models to console
if (genAI) {
  genAI.getGenerativeModel({ model: "gemini-flash-latest" }).getProperties?.().then(p => console.log("Model properties:", p)).catch(() => { });
}

const model = genAI ? genAI.getGenerativeModel({ model: "gemini-1.0-pro" }) : null;

/**
 * Appel générique au modèle Gemini via SDK
 */
const callGemini = async (prompt) => {
  if (!model) {
    console.warn("Gemini API Key missing! SDK not initialized.");
    return null;
  }

  try {
    console.log("Sending request to Gemini model...");
    console.log("API Key", API_KEY);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    if (error.message?.includes("404")) {
      console.error("Gemini 404 Error: The model name or API version might be incorrect for your API key. Please check your AI Studio settings.");
    }
    console.error("Gemini SDK Error Details:", error);
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
    Tu es un expert commercial en menuiserie de luxe chez "Flach Metal". 
    Rédige une proposition commerciale élégante, persuasive et très structurée en Français pour ce devis :
    
    Client: ${data.client.nom}
    Produits: ${JSON.stringify(data.produits)}
    Configuration: ${JSON.stringify(data.configuration)}
    Total Estimé: ${data.total} MAD
    
    Structure de la proposition :
    1. Salutation chaleureuse et remerciement.
    2. Analyse personnalisée des besoins (basée sur la configuration ou les produits).
    3. Présentation des avantages techniques de Flach Metal (Durabilité, Design, Sécurité).
    4. Récapitulatif clair des options choisies.
    5. Conclusion rassurante et prochaine étape.
    
    Utilise un ton haut de gamme, professionnel et utilise le format Markdown.
  `;

  return await callGemini(prompt);
};
