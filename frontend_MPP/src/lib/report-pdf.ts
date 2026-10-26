import { PDFDocument, StandardFonts, rgb, type PDFPage, type PDFFont } from "pdf-lib";
import type { ForensicReport } from "@/types/security";

const navy = rgb(0.035, 0.09, 0.18);
const blue = rgb(0.05, 0.36, 0.78);
const muted = rgb(0.36, 0.42, 0.5);
const pale = rgb(0.95, 0.97, 0.99);
const red = rgb(0.77, 0.12, 0.16);

function wrap(text: string, font: PDFFont, size: number, width: number) {
  const words = text.replace(/\s+/g, " ").split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= width) line = candidate;
    else { if (line) lines.push(line); line = word; }
  });
  if (line) lines.push(line);
  return lines;
}

function header(page: PDFPage, bold: PDFFont, pageNo: number) {
  const { width, height } = page.getSize();
  page.drawRectangle({ x: 0, y: height - 58, width, height: 58, color: navy });
  page.drawText("SENTINEL AI", { x: 42, y: height - 37, size: 16, font: bold, color: rgb(1, 1, 1) });
  page.drawText("FORENSIC THREAT INTELLIGENCE", { x: width - 246, y: height - 34, size: 8, font: bold, color: rgb(0.68, 0.81, 0.98) });
  page.drawLine({ start: { x: 42, y: 32 }, end: { x: width - 42, y: 32 }, thickness: 0.6, color: rgb(0.82, 0.85, 0.89) });
  page.drawText(`SENTINEL AI  |  CONFIDENTIAL  |  PAGE ${pageNo} OF 4`, { x: 42, y: 18, size: 7, font: bold, color: muted });
}

function section(page: PDFPage, title: string, y: number, bold: PDFFont) {
  page.drawText(title.toUpperCase(), { x: 42, y, size: 9, font: bold, color: blue });
  page.drawLine({ start: { x: 42, y: y - 7 }, end: { x: 553, y: y - 7 }, thickness: 0.8, color: rgb(0.82, 0.87, 0.93) });
  return y - 28;
}

function paragraph(page: PDFPage, text: string, y: number, font: PDFFont, size = 9, color = navy, width = 500) {
  const lines = wrap(text, font, size, width);
  lines.forEach((line, index) => page.drawText(line, { x: 48, y: y - index * 14, size, font, color }));
  return y - lines.length * 14;
}

function keyValue(page: PDFPage, label: string, value: string, y: number, font: PDFFont, bold: PDFFont) {
  page.drawText(label.toUpperCase(), { x: 48, y, size: 7, font: bold, color: muted });
  page.drawText(value, { x: 205, y: y - 1, size: 9, font, color: navy, maxWidth: 340 });
}

export async function downloadForensicPdf(report: ForensicReport) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const a = report.analysis;
  const pageOne = doc.addPage([595, 842]);
  const pageTwo = doc.addPage([595, 842]);
  const pageThree = doc.addPage([595, 842]);
  const pageFour = doc.addPage([595, 842]);
  const pages: [PDFPage, PDFPage, PDFPage, PDFPage] = [pageOne, pageTwo, pageThree, pageFour];
  pages.forEach((page, index) => header(page, bold, index + 1));

  let y = 742;
  pages[0].drawText("Forensic Threat", { x: 42, y, size: 30, font: bold, color: navy });
  pages[0].drawText("Intelligence Report", { x: 42, y: y - 36, size: 30, font: bold, color: navy });
  pages[0].drawRectangle({ x: 42, y: y - 88, width: 511, height: 38, color: a.classification === "Benign" ? blue : red });
  pages[0].drawText(a.classification === "Benign" ? "REQUEST CLEARED" : "THREAT DETECTED", { x: 56, y: y - 75, size: 13, font: bold, color: rgb(1, 1, 1) });
  y -= 132;
  y = section(pages[0], "Report control", y, bold);
  keyValue(pages[0], "Report ID", report.reportId, y, font, bold); y -= 25;
  keyValue(pages[0], "Inspection ID", a.inspectionId, y, font, bold); y -= 25;
  keyValue(pages[0], "Generated", new Date(report.generatedAt).toUTCString(), y, font, bold); y -= 25;
  keyValue(pages[0], "Security status", a.classification, y, font, bold); y -= 42;
  y = section(pages[0], "Executive summary", y, bold);
  y = paragraph(pages[0], `SENTINEL AI analyzed the submitted HTTP traffic using a four-class structural model and a deterministic validation ring. The final verdict is ${a.classification}; the model prediction is ${a.model.classification} with ${a.model.confidence.toFixed(2)}% confidence and ${a.severity.toLowerCase()} severity.`, y, font, 10);
  y -= 28;
  y = section(pages[0], "Threat classification", y, bold);
  keyValue(pages[0], "Classification", a.classification, y, font, bold); y -= 25;
  keyValue(pages[0], "Severity", a.severity, y, font, bold); y -= 25;
  keyValue(pages[0], "Model confidence", `${a.model.confidence.toFixed(2)}%`, y, font, bold); y -= 25;
  keyValue(pages[0], "Analysis time", `${a.analysisTimeMs} ms`, y, font, bold);

  y = 742; y = section(pages[1], "Request details", y, bold);
  pages[1].drawText("ORIGINAL PAYLOAD", { x: 48, y, size: 7, font: bold, color: muted }); y -= 18;
  pages[1].drawRectangle({ x: 42, y: y - 112, width: 511, height: 126, color: pale });
  y = paragraph(pages[1], a.originalPayload, y, font, 8, navy, 485) - 126;
  pages[1].drawText("NORMALIZED PAYLOAD", { x: 48, y, size: 7, font: bold, color: muted }); y -= 18;
  y = paragraph(pages[1], a.normalizedPayload, y, font, 8, navy, 485) - 28;
  y = section(pages[1], "ML analysis", y, bold);
  Object.entries(a.model.probabilities).forEach(([name, value]) => {
    pages[1].drawText(name, { x: 48, y, size: 8, font, color: navy });
    pages[1].drawRectangle({ x: 155, y: y - 2, width: 300, height: 8, color: rgb(0.88, 0.91, 0.95) });
    pages[1].drawRectangle({ x: 155, y: y - 2, width: 3 * value, height: 8, color: blue });
    pages[1].drawText(`${value.toFixed(2)}%`, { x: 472, y, size: 8, font: bold, color: navy }); y -= 24;
  });
  y -= 10; y = section(pages[1], "Circuit-breaker validation", y, bold);
  keyValue(pages[1], "ML prediction", a.circuitBreaker.mlPrediction, y, font, bold); y -= 24;
  keyValue(pages[1], "Validation status", a.circuitBreaker.status, y, font, bold); y -= 24;
  keyValue(pages[1], "Final verdict", a.circuitBreaker.finalVerdict, y, font, bold); y -= 24;
  paragraph(pages[1], a.circuitBreaker.reason, y, font);

  y = 742; y = section(pages[2], "Explainable AI", y, bold);
  pages[2].drawText(a.shapFeatures.length ? "SHAP FEATURE CONTRIBUTIONS" : "SHAP EXPLANATIONS UNAVAILABLE", { x: 48, y, size: 7, font: bold, color: muted }); y -= 28;
  a.shapFeatures.forEach((feature) => {
    pages[2].drawText(feature.name, { x: 48, y, size: 8, font, color: navy });
    pages[2].drawRectangle({ x: 190, y: y - 2, width: Math.abs(feature.contribution) * 620, height: 9, color: feature.direction === "risk" ? red : blue });
    pages[2].drawText(feature.contribution.toFixed(4), { x: 475, y, size: 8, font: bold, color: navy }); y -= 28;
  });
  y -= 18; y = section(pages[2], "Threat intelligence", y, bold);
  keyValue(pages[2], "MITRE ATT&CK", `${a.threatIntelligence.mitreTechnique.id} — ${a.threatIntelligence.mitreTechnique.name}`, y, font, bold); y -= 34;
  keyValue(pages[2], "CAPEC", `${a.threatIntelligence.capecPattern.id} — ${a.threatIntelligence.capecPattern.name}`, y, font, bold); y -= 42;
  pages[2].drawText("MAPPING RATIONALE", { x: 48, y, size: 7, font: bold, color: muted }); y -= 17;
  y = paragraph(pages[2], a.threatIntelligence.rationale, y, font) - 20;
  pages[2].drawText("DETECTED BEHAVIOR", { x: 48, y, size: 7, font: bold, color: muted }); y -= 17;
  paragraph(pages[2], a.threatIntelligence.detectedBehavior, y, font);

  y = 742; y = section(pages[3], "Forensic evidence", y, bold);
  pages[3].drawRectangle({ x: 42, y: y - 92, width: 511, height: 104, color: pale });
  keyValue(pages[3], "STIX status", a.threatIntelligence.stixBundle ? "Bundle generated" : "Not generated", y - 12, font, bold);
  keyValue(pages[3], "STIX ID", a.threatIntelligence.stixBundle?.id ?? "—", y - 37, font, bold);
  keyValue(pages[3], "Specification", a.threatIntelligence.stixBundle ? `STIX ${a.threatIntelligence.stixBundle.specVersion}` : "—", y - 62, font, bold);
  y -= 132; y = section(pages[3], "Threat indicators", y, bold);
  a.threatIntelligence.indicators.forEach((indicator) => { pages[3].drawCircle({ x: 52, y: y + 3, size: 3, color: blue }); pages[3].drawText(indicator, { x: 64, y, size: 9, font, color: navy }); y -= 24; });
  y -= 20; y = section(pages[3], "Inspection metadata", y, bold);
  keyValue(pages[3], "Source", a.source, y, font, bold); y -= 25;
  keyValue(pages[3], "Analyzed", new Date(a.timestamp).toUTCString(), y, font, bold); y -= 25;
  keyValue(pages[3], "Engine", "SENTINEL AI Hybrid WAF", y, font, bold); y -= 25;
  keyValue(pages[3], "Evidence status", a.demo ? "Demo data" : "Backend model inference", y, font, bold); y -= 44;
  y = section(pages[3], "Report generation metadata", y, bold);
  paragraph(pages[3], "This report summarizes the inspection response recorded by the model API. Confirm the original request context and security decision before acting on this report.", y, font, 9);

  doc.setTitle(`SENTINEL AI Forensic Report ${report.reportId}`);
  doc.setAuthor("SENTINEL AI");
  const bytes = await doc.save();
  const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a"); anchor.href = url; anchor.download = `${report.reportId}.pdf`; anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
