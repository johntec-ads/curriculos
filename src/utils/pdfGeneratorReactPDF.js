import { pdf } from '@react-pdf/renderer';
import {
  pdfTemplates,
  hasPDFTemplate as checkHasPDFTemplate,
  availablePDFTemplates,
} from '../templates/pdf';

/**
 * Gerador de PDF usando @react-pdf/renderer
 *
 * Gera PDF com texto real (selecionável), paginação automática
 * e qualidade profissional.
 *
 * Templates disponíveis: 1, 3, 4, 5, 6, 7
 */

/**
 * Gera PDF usando react-pdf/renderer
 *
 * @param {object} data - Dados do currículo
 * @param {number|string} templateId - ID do template (1, 3, 4, 5, 6, 7)
 * @param {string} filename - Nome do arquivo
 * @param {object} options - Opções adicionais
 * @returns {Promise<Blob>} - Blob do PDF gerado
 */
export const generatePDFWithReactPDF = async (
  data,
  templateId = 1,
  filename = 'curriculo.pdf',
  options = {}
) => {
  const { onProgress = null, returnBlob = false } = options;

  try {
    if (onProgress) onProgress(10, 'Iniciando geração...');

    // Normalizar templateId para número
    const numericId =
      typeof templateId === 'string'
        ? parseInt(templateId.replace('template', ''), 10)
        : templateId;

    // Obter o componente do template
    const TemplateComponent = pdfTemplates[numericId] || pdfTemplates[1];

    if (!TemplateComponent) {
      throw new Error(`Template "${templateId}" não encontrado para PDF`);
    }

    if (onProgress) onProgress(30, 'Renderizando documento...');

    // Criar o documento PDF
    const doc = <TemplateComponent data={data} />;

    if (onProgress) onProgress(50, 'Gerando PDF...');

    // Gerar o blob do PDF
    const blob = await pdf(doc).toBlob();

    if (onProgress) onProgress(90, 'Finalizando...');

    // Se returnBlob, retornar o blob diretamente
    if (returnBlob) {
      if (onProgress) onProgress(100, 'Concluído!');
      return blob;
    }

    // Caso contrário, fazer download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    if (onProgress) onProgress(100, 'Concluído!');
    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF com react-pdf:', error);
    throw new Error(`Falha ao gerar PDF: ${error.message}`);
  }
};

/**
 * Verifica se um template tem versão PDF disponível
 * @param {number|string} templateId - ID do template
 */
export const hasPDFTemplate = (templateId) => {
  const numericId =
    typeof templateId === 'string'
      ? parseInt(templateId.replace('template', ''), 10)
      : templateId;
  return checkHasPDFTemplate(numericId);
};

/**
 * Retorna lista de templates com suporte a PDF nativo
 */
export const getAvailablePDFTemplates = () => {
  return availablePDFTemplates;
};

const pdfGeneratorReactPDF = {
  generatePDFWithReactPDF,
  hasPDFTemplate,
  getAvailablePDFTemplates,
};

export default pdfGeneratorReactPDF;
