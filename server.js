import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import PDFDocument from "pdfkit"; // Pour générer le PDF

// Si Node <18, installer node-fetch : npm install node-fetch
import fetch from "node-fetch";
global.fetch = fetch;

import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Vérification clé API
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI API KEY manquante !");
  process.exit(1); // Arrête le serveur si clé manquante
}

console.log("✅ GEMINI KEY OK");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Route pour générer la proposition AI
app.post("/generate-proposal", async (req, res) => {
  try {
    const devisData = req.body;
    console.log("📥 Devis reçu:", devisData);

    if (!devisData || !devisData.client || !devisData.produits) {
      return res.status(400).json({ error: "Données de devis incomplètes" });
    }

    // Préparer payload propre
    const payload = {
      client: devisData.client.nom || "",
      produits: devisData.produits || [],
      configuration: devisData.configuration || {},
      total: devisData.total || 0,
    };

    console.log("📤 Données nettoyées envoyées à Gemini:", payload);

    // Appel à Gemini
    let proposalText = "Erreur : proposition AI non générée";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // modèle standard, plus sûr
        contents: `
Rôle : Vous êtes un expert technico-commercial senior chez "Flach Metal", une entreprise de menuiserie métallique haut de gamme (Inox, Aluminium, Fer).
Tâche : Rédiger une proposition commerciale formelle et persuasive pour accompagner le devis technique ci-dessous.

CONTEXTE CLIENT :
Nom : ${payload.client}
Projet : ${payload.configuration.categorie ? `Fabrication de ${payload.configuration.categorie} en ${payload.configuration.materiau}` : "Projet de menuiserie sur mesure"}
${payload.configuration.dimensions ? `Dimensions : ${payload.configuration.dimensions}` : ""}
${payload.configuration.motorise ? "Option : Motorisation incluse" : ""}

DÉTAIL DU DEVIS :
Produits : ${payload.produits.map(p => `- ${p.titre} (x${p.quantity})`).join('\n')}
Total Estimé : ${payload.total} MAD

OBJECTIFS :
1. Remercier le client pour sa confiance.
2. Valoriser l'expertise technique de Flach Metal (finitions soignées, durabilité, design moderne).
3. Expliquer brièvement les avantages des matériaux choisis (${payload.configuration.materiau || "Matériaux de qualité"}).
4. Rassurer sur le respect des délais et la qualité de pose.
5. Inciter à la validation du devis.

FORMAT ATTENDU :
- En-tête professionnel
- Texte structuré en paragraphes clairs
- Ton courtois, expert et chaleureux
- Conclusion avec appel à l'action
- Signature : "L'équipe Flach Metal"

Ne mentionnez pas de prix unitaires inventés. Basez-vous uniquement sur le total fourni.
        `,
      });

      if (response && response.text) {
        proposalText = response.text;
        console.log("✅ Proposition AI générée:", proposalText);
      }
    } catch (err) {
      // Gestion d'erreur JS pur
      console.error("⚠️ Erreur Gemini:", err.message || err);
      proposalText = "⚠️ Impossible de générer la proposition AI pour le moment.";
    }

    res.json({ proposal: proposalText });
  } catch (error) {
    console.error("❌ Erreur backend:", error.message || error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route pour générer le PDF du devis
app.post("/generate-pdf", async (req, res) => {
  try {
    const devisData = req.body;
    console.log("📄 Génération PDF pour:", devisData.client.nom);

    // 1. Générer une introduction pro via AI
    let introText = "Nous vous remercions pour votre demande de devis concernant votre projet de menuiserie métallique.";
    try {
      const prompt = `
        Rédige une courte introduction formelle (3-4 lignes max) pour un devis de menuiserie (Flach Metal) destiné à ${devisData.client.nom}.
        Le projet concerne : ${devisData.configuration?.categorie || "Menuiserie sur mesure"}.
        Ton : Professionnel, chaleureux, rassurant sur la qualité.
        Ne mentionne pas de prix.
      `;
      const result = await ai.models.generateContent({ 
        model: "gemini-3-flash-preview", 
        contents: prompt 
      });
      if (result.response.text()) {
        introText = result.response.text().replace(/\*/g, ''); // Nettoyer markdown gras éventuel
      }
    } catch (e) {
      console.warn("⚠️ Pas d'intro AI, utilisation standard.");
    }

    // 2. Créer le PDF
    const doc = new PDFDocument({ margin: 50 });

    // Configurer les headers pour le téléchargement
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Devis_FlachMetal_${Date.now()}.pdf`);

    doc.pipe(res);

    // --- EN-TÊTE ---
    doc.fillColor("#333333")
       .fontSize(20)
       .text("FLACH METAL", { align: "left" })
       .fontSize(10)
       .text("Menuiserie Métallique & Inox", { align: "left" })
       .text("123 Rue de l'Industrie, Casablanca", { align: "left" })
       .text("Tél: +212 600 000 000", { align: "left" })
       .text("Email: contact@flachmetal.com", { align: "left" })
       .moveDown();

    // Trait de séparation
    doc.moveTo(50, 150).lineTo(550, 150).strokeColor("#aaaaaa").stroke();
    doc.moveDown();

    // --- INFO CLIENT & TITRE ---
    doc.fontSize(12).text(`Date : ${new Date().toLocaleDateString("fr-FR")}`, { align: "right" });
    doc.moveDown();
    
    doc.fontSize(14).text("DEVIS ESTIMATIF", { align: "center", underline: true });
    doc.moveDown();

    doc.fontSize(12).font("Helvetica-Bold").text("Client :", { continued: true });
    doc.font("Helvetica").text(` ${devisData.client.nom}`);
    doc.font("Helvetica-Bold").text("Email :", { continued: true });
    doc.font("Helvetica").text(` ${devisData.client.email || "Non renseigné"}`);
    doc.moveDown();

    // --- INTRODUCTION AI ---
    doc.fontSize(10).font("Helvetica-Oblique").text(introText, { align: "justify" });
    doc.moveDown(2);

    // --- TABLEAU DES PRODUITS ---
    const tableTop = doc.y;
    const itemX = 50;
    const descX = 200;
    const qtyX = 350;
    const priceX = 400;
    const totalX = 480;

    doc.font("Helvetica-Bold");
    doc.text("Article", itemX, tableTop);
    doc.text("Description", descX, tableTop);
    doc.text("Qté", qtyX, tableTop);
    doc.text("P.U (MAD)", priceX, tableTop);
    doc.text("Total", totalX, tableTop);
    
    doc.moveTo(itemX, tableTop + 15).lineTo(550, tableTop + 15).stroke();
    
    let y = tableTop + 30;
    doc.font("Helvetica");

    if (devisData.produits && devisData.produits.length > 0) {
      devisData.produits.forEach(item => {
        const title = item.titre || item.nom || "Produit";
        const desc = item.materiau ? `${item.materiau} ${item.categorie || ""}` : "Standard";
        const qty = Number(item.quantity) || 1;
        const price = Number(item.prix) || 0;
        const lineTotal = price * qty;

        doc.text(title.substring(0, 25), itemX, y);
        doc.text(desc.substring(0, 25), descX, y);
        doc.text(qty.toString(), qtyX, y);
        
        if (price > 0) {
          doc.text(price.toFixed(2), priceX, y);
          doc.text(lineTotal.toFixed(2), totalX, y);
        } else {
          doc.font("Helvetica-Oblique").fontSize(8);
          doc.text("Après étude", priceX, y);
          doc.text("-", totalX, y);
          doc.font("Helvetica").fontSize(10); // Reset font
        }
        
        y += 20;
      });
    }

    doc.moveTo(itemX, y).lineTo(550, y).stroke();
    y += 15;

    // --- TOTAL ---
    doc.font("Helvetica-Bold").fontSize(14);
    doc.text(`TOTAL NET À PAYER : ${devisData.total} MAD`, 300, y, { align: "right" });
    
    doc.moveDown(4);

    // --- CONDITIONS ---
    doc.fontSize(10).font("Helvetica-Bold").text("Conditions de vente :");
    doc.font("Helvetica").fontSize(9);
    doc.text("- Validité de l'offre : 30 jours.");
    doc.text("- Acompte à la commande : 40%.");
    doc.text("- Solde à la livraison.");
    doc.text("- Garantie : 2 ans sur la structure et la motorisation.");
    
    doc.moveDown(2);
    doc.text("Bon pour accord (Date et Signature) :", { align: "right" });

    doc.end();

  } catch (error) {
    console.error("❌ Erreur PDF:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur lors de la génération du PDF" });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend démarré sur http://localhost:${PORT}`));
