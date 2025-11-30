/**
 * Index de PDF Templates
 * Exporta todos os templates PDF disponíveis
 */

import PDFTemplate1 from './PDFTemplate1';
import PDFTemplate3 from './PDFTemplate3';
import PDFTemplate4 from './PDFTemplate4';
import PDFTemplate5 from './PDFTemplate5';
import PDFTemplate6 from './PDFTemplate6';
import PDFTemplate7 from './PDFTemplate7';

// Mapa de templates disponíveis
export const pdfTemplates = {
  1: PDFTemplate1,
  3: PDFTemplate3,
  4: PDFTemplate4,
  5: PDFTemplate5,
  6: PDFTemplate6,
  7: PDFTemplate7,
};

// Lista de IDs de templates disponíveis
export const availablePDFTemplates = [1, 3, 4, 5, 6, 7];

// Verificar se um template tem versão PDF
export const hasPDFTemplate = (templateId) => {
  return templateId in pdfTemplates;
};

// Obter componente do template PDF
export const getPDFTemplate = (templateId) => {
  return pdfTemplates[templateId] || null;
};

export {
  PDFTemplate1,
  PDFTemplate3,
  PDFTemplate4,
  PDFTemplate5,
  PDFTemplate6,
  PDFTemplate7,
};

export default pdfTemplates;
