import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gera PDF de alta qualidade a partir de um elemento HTML
 * Versão melhorada com melhor captura de elementos
 * @param {HTMLElement} element - Elemento a ser convertido em PDF
 * @param {string} filename - Nome do arquivo PDF
 * @param {object} options - Opções de configuração
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
export const generateHighQualityPDF = async (
  element,
  filename = 'curriculo.pdf',
  options = {}
) => {
  try {
    const {
      scale = 2, // Escala reduzida para melhor compatibilidade
      quality = 0.95,
      format = 'a4',
      orientation = 'portrait',
      onProgress = null,
    } = options;

    if (onProgress) onProgress(10, 'Preparando documento...');

    // Clonar o elemento para não afetar o original
    const clonedElement = element.cloneNode(true);

    // Criar container temporário para o clone
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '0';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.minHeight = '297mm';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.visibility = 'visible';
    tempContainer.style.zIndex = '99999';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Aguardar um momento para o DOM processar
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (onProgress) onProgress(20, 'Capturando conteúdo...');

    // Configurações do canvas para alta qualidade
    const canvas = await html2canvas(clonedElement, {
      scale: scale,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 0,
      removeContainer: false,
      windowWidth: clonedElement.scrollWidth,
      windowHeight: clonedElement.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      width: clonedElement.scrollWidth,
      height: clonedElement.scrollHeight,
    });

    // Remover o container temporário
    document.body.removeChild(tempContainer);

    if (onProgress) onProgress(60, 'Gerando PDF...');

    // Dimensões A4 em mm
    const a4Width = 210;
    const a4Height = 297;

    // Criar PDF com orientação especificada
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'mm',
      format: format,
      compress: true,
    });

    // Calcular dimensões para manter proporção
    const imgWidth = a4Width;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Converter canvas para imagem de alta qualidade
    const imgData = canvas.toDataURL('image/jpeg', quality);

    // Se a imagem for maior que uma página A4, dividir em múltiplas páginas
    let heightLeft = imgHeight;
    let position = 0;
    let page = 1;

    // Adicionar primeira página
    pdf.addImage(
      imgData,
      'JPEG',
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      'FAST'
    );
    heightLeft -= a4Height;

    // Adicionar páginas adicionais se necessário
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        'FAST'
      );
      heightLeft -= a4Height;
      page++;
      if (onProgress)
        onProgress(60 + page * 10, `Processando página ${page}...`);
    }

    if (onProgress) onProgress(90, 'Finalizando...');

    // Salvar o PDF
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
export const generateOptimizedPDF = async (
  element,
  filename = 'curriculo.pdf'
) => {
  return generateHighQualityPDF(element, filename, {
    scale: 1.5,
    quality: 0.85,
    onProgress: null,
  });
};

/**
 * Exporta currículo em diferentes formatos
 * @param {HTMLElement} element - Elemento do currículo
 * @param {string} format - Formato de exportação ('pdf', 'png', 'jpeg')
 * @param {string} filename - Nome do arquivo
 */
export const exportCurriculum = async (
  element,
  format = 'pdf',
  filename = 'curriculo'
) => {
  try {
    if (format === 'pdf') {
      return await generateHighQualityPDF(element, `${filename}.pdf`);
    }

    // Clonar o elemento para não afetar o original
    const clonedElement = element.cloneNode(true);

    // Criar container temporário
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '0';
    tempContainer.style.top = '0';
    tempContainer.style.width = '210mm';
    tempContainer.style.minHeight = '297mm';
    tempContainer.style.backgroundColor = '#ffffff';
    tempContainer.style.visibility = 'visible';
    tempContainer.style.zIndex = '99999';
    tempContainer.appendChild(clonedElement);
    document.body.appendChild(tempContainer);

    // Aguardar processamento
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Para PNG ou JPEG
    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      logging: false,
    });

    // Remover container temporário
    document.body.removeChild(tempContainer);

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

/**
 * Prepara o elemento para impressão/PDF
 * Remove elementos desnecessários e otimiza para captura
 * @param {HTMLElement} element - Elemento a ser preparado
 */
export const prepareElementForPDF = (element) => {
  if (!element) return () => {};

  const elementsToHide = [];

  // Ocultar botões e elementos que não devem aparecer no PDF
  const hideSelectors = [
    '.no-print',
    '.no-print-container',
    'button',
    '.MuiButton-root',
    '.MuiIconButton-root',
    '.MuiFab-root',
  ];

  hideSelectors.forEach((selector) => {
    const elements = element.querySelectorAll(selector);
    elements.forEach((el) => {
      if (el.style.display !== 'none') {
        elementsToHide.push({
          element: el,
          originalDisplay: el.style.display,
        });
        el.style.display = 'none';
      }
    });
  });

  // Garantir que o elemento tenha o tamanho correto
  const originalStyles = {
    width: element.style.width,
    minHeight: element.style.minHeight,
    backgroundColor: element.style.backgroundColor,
  };

  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.backgroundColor = '#ffffff';

  // Retornar função de cleanup
  return () => {
    // Restaurar elementos ocultos
    elementsToHide.forEach(({ element, originalDisplay }) => {
      element.style.display = originalDisplay;
    });

    // Restaurar estilos originais
    element.style.width = originalStyles.width;
    element.style.minHeight = originalStyles.minHeight;
    element.style.backgroundColor = originalStyles.backgroundColor;
  };
};

const pdfUtils = {
  generateHighQualityPDF,
  generateOptimizedPDF,
  prepareElementForPDF,
  exportCurriculum,
};

export default pdfUtils;
