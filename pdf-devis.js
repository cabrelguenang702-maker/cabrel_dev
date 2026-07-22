// ==========================================================================
// GÉNÉRATION DU PDF DE DEVIS — utilise jsPDF (chargé via CDN dans index.html)
// ==========================================================================

function genererDevisPDF({ categorie, planLabel, prixMin, prixMax, unite, nom, telephone, email, description }) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const navy = "#0B1B3F";
  const blue = "#2F6BFF";
  const gray = "#5B6B8C";
  const pageWidth = doc.internal.pageSize.getWidth();
  const marginX = 50;

  // En-tête
  doc.setFillColor(navy);
  doc.rect(0, 0, pageWidth, 90, "F");
  doc.setTextColor("#FFFFFF");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("cabrel.dev", marginX, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Devis de prestation", marginX, 66);

  let y = 130;
  doc.setTextColor(navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("DEVIS — " + categorie, marginX, y);

  y += 30;
  doc.setDrawColor(230, 230, 230);
  doc.line(marginX, y, pageWidth - marginX, y);

  y += 30;
  doc.setFontSize(11);
  doc.setTextColor(gray);
  doc.text("Date : " + new Date().toLocaleDateString("fr-FR"), marginX, y);
  y += 20;
  doc.setTextColor(navy);
  doc.setFont("helvetica", "bold");
  doc.text("Informations du client", marginX, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(gray);
  y += 20;
  doc.text("Nom : " + nom, marginX, y);
  y += 18;
  doc.text("Téléphone : " + telephone, marginX, y);
  y += 18;
  doc.text("Email : " + (email || "—"), marginX, y);

  y += 34;
  doc.setDrawColor(230, 230, 230);
  doc.line(marginX, y, pageWidth - marginX, y);

  y += 30;
  doc.setTextColor(navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Formule : " + planLabel, marginX, y);

  y += 22;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(gray);
  const prixTxt = prixMin === prixMax
    ? `Prix total : ${prixMin.toLocaleString("fr-FR")} ${unite}`
    : `Prix estimé : ${prixMin.toLocaleString("fr-FR")} - ${prixMax.toLocaleString("fr-FR")} ${unite}`;
  doc.setTextColor(blue);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(prixTxt, marginX, y);

  if (description) {
    y += 30;
    doc.setTextColor(navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Description du projet :", marginX, y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(gray);
    const lines = doc.splitTextToSize(description, pageWidth - marginX * 2);
    doc.text(lines, marginX, y);
    y += lines.length * 14;
  }

  y += 50;
  doc.setDrawColor(230, 230, 230);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 24;
  doc.setFontSize(10);
  doc.setTextColor(gray);
  doc.text("Ce devis est valable 15 jours. Un acompte est requis pour démarrer la réalisation.", marginX, y);
  y += 16;
  doc.text("Contact : WhatsApp " + SOCIALS.whatsappNumber + " — " + SOCIALS.email, marginX, y);

  const filename = `Devis-cabreldev-${categorie.replace(/\s+/g, "-")}-${Date.now()}.pdf`;
  doc.save(filename);
  return filename;
}
