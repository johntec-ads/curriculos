import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gera PDF de alta qualidade a partir de um elemento HTML
 * @param {HTMLElement} element - Elemento a ser convertido em PDF
 * @param {string} filename - Nome do arquivo PDF
 * @param {object} options - Opções de configuração
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
export const generateHighQualityPDF = async (element, filename = 'curriculo.pdf', options = {}) => {
  try {
    const {
      scale = 3, // Maior escala = maior qualidade
      quality = 1.0,
      format = 'a4',
      orientation = 'portrait',
      onProgress = null,
      margin = 10, // margem em mm
      returnBlob = false // se true, retorna um Blob ao invés de salvar diretamente
    } = options;

    if (onProgress) onProgress(10, 'Preparando documento...');

    // Configurações do canvas para alta qualidade
    const canvas = await html2canvas(element, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0,
      removeContainer: true,
      onclone: (clonedDoc) => {
        // Garantir que os elementos clonados sejam renderizados corretamente
        const clonedElement = clonedDoc.querySelector('[data-html2canvas-ignore]');
        if (clonedElement) {
          clonedElement.style.display = 'none';
        }
      }
    });

    if (onProgress) onProgress(50, 'Gerando PDF...');

    // Dimensões A4 em mm e configuração de margem
    const a4Width = 210;
    const a4Height = 297;
    const usableWidth = a4Width - margin * 2;
    const usableHeight = a4Height - margin * 2;

    // Criar PDF com orientação especificada
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: format,
      compress: true
    });

    // Calcular conversão px <-> mm
    const pxPerMm = canvas.width / a4Width; // pixels por mm baseado na largura A4
    const pageHeightPx = Math.floor(usableHeight * pxPerMm);

    // Número de páginas necessárias
    const totalPages = Math.ceil(canvas.height / pageHeightPx);

    if (onProgress) onProgress(60, `Gerando ${totalPages} página(s)...`);

    // Para cada página, recortar o segmento correspondente e adicionar ao PDF
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    const tempCtx = tempCanvas.getContext('2d');

    for (let page = 0; page < totalPages; page++) {
      const y = page * pageHeightPx;
      const thisPageHeightPx = Math.min(pageHeightPx, canvas.height - y);
      tempCanvas.height = thisPageHeightPx;

      // Limpar e desenhar o recorte
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(canvas, 0, y, canvas.width, thisPageHeightPx, 0, 0, canvas.width, thisPageHeightPx);

      // Converter slice para imagem
      const imgData = tempCanvas.toDataURL('image/jpeg', quality);

  // Dimensões em mm para essa fatia
  const imgWidth = usableWidth;

      const xPos = margin;
      const yPos = margin;

      if (page > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', xPos, yPos, imgWidth, (thisPageHeightPx / pxPerMm), undefined, 'FAST');

      if (onProgress) onProgress(60 + Math.round(((page + 1) / totalPages) * 30), `Processando página ${page + 1}/${totalPages}...`);
    }

    if (onProgress) onProgress(90, 'Finalizando...');

    // Finalizar: salvar ou retornar Blob
    if (returnBlob) {
      const pdfBlob = pdf.output('blob');
      if (onProgress) onProgress(100, 'Concluído (blob retornado)!');
      return pdfBlob;
    }

    pdf.save(filename);

    if (onProgress) onProgress(100, 'Concluído!');

    return true;
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error('Falha ao gerar o PDF. Tente novamente.');
  }
};

/**
 * Gera PDF otimizado para tamanho de arquivo menor
 * @param {HTMLElement} element - Elemento a ser convertido em PDF
 * @param {string} filename - Nome do arquivo PDF
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
export const generateOptimizedPDF = async (element, filename = 'curriculo.pdf') => {
  return generateHighQualityPDF(element, filename, {
    scale: 2,
    quality: 0.85,
    onProgress: null
  });
};

/**
 * Prepara o elemento para impressão/PDF
 * @param {HTMLElement} element - Elemento a ser preparado
 */
export const prepareElementForPDF = (element) => {
  if (!element) return;

  // Ocultar botões e elementos que não devem aparecer no PDF
  const elementsToHide = element.querySelectorAll('.no-print, .no-print-container');
  elementsToHide.forEach(el => {
    el.style.display = 'none';
  });

  // Garantir que o elemento tenha o tamanho correto
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.backgroundColor = '#ffffff';

  return () => {
    // Restaurar elementos ocultos
    elementsToHide.forEach(el => {
      el.style.display = '';
    });
  };
};

/**
 * Exporta currículo em diferentes formatos
 * @param {HTMLElement} element - Elemento do currículo
 * @param {string} format - Formato de exportação ('pdf', 'png', 'jpeg')
 * @param {string} filename - Nome do arquivo
 */
export const exportCurriculum = async (element, format = 'pdf', filename = 'curriculo') => {
  try {
    if (format === 'pdf') {
      return await generateHighQualityPDF(element, `${filename}.pdf`);
    }

    // Para PNG ou JPEG
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false
    });

    const dataUrl = canvas.toDataURL(`image/${format}`, 1.0);
    
    // Criar link para download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error(`Erro ao exportar em ${format}:`, error);
    throw new Error(`Falha ao exportar em ${format.toUpperCase()}`);
  }
};

const pdfUtils = {
  generateHighQualityPDF,
  generateOptimizedPDF,
  prepareElementForPDF,
  exportCurriculum
};

export default pdfUtils;
