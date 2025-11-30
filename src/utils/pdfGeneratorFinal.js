import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gerador de PDF Final - Abordagem simplificada e robusta
 * 
 * Estratégia: Capturar o elemento inteiro como uma única imagem de alta qualidade
 * e dividir em páginas A4 de forma precisa, sem tentar manipular o DOM.
 */

// Constantes para dimensões A4 em diferentes unidades
const A4 = {
  WIDTH_MM: 210,
  HEIGHT_MM: 297,
  WIDTH_PX_96DPI: 794,  // 210mm * 96dpi / 25.4
  HEIGHT_PX_96DPI: 1123, // 297mm * 96dpi / 25.4
  ASPECT_RATIO: 297 / 210
};

/**
 * Aguarda o carregamento completo de todas as imagens em um elemento
 */
const waitForImages = async (element) => {
  const images = element.querySelectorAll('img');
  const promises = Array.from(images).map(img => {
    if (img.complete && img.naturalHeight !== 0) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve;
      // Timeout de segurança
      setTimeout(resolve, 3000);
    });
  });
  await Promise.all(promises);
};

/**
 * Prepara o elemento para captura, garantindo dimensões corretas
 */
const prepareElementForCapture = (element) => {
  const clone = element.cloneNode(true);
  
  // Garantir largura fixa A4
  clone.style.width = `${A4.WIDTH_MM}mm`;
  clone.style.minHeight = `${A4.HEIGHT_MM}mm`;
  clone.style.margin = '0';
  clone.style.padding = clone.style.padding || '0';
  clone.style.boxSizing = 'border-box';
  clone.style.backgroundColor = '#ffffff';
  clone.style.position = 'absolute';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  
  // Remover sombras e bordas arredondadas que podem causar artefatos
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  
  // Garantir que todo o conteúdo seja visível
  clone.style.overflow = 'visible';
  clone.style.visibility = 'visible';
  
  return clone;
};

/**
 * Gera PDF de alta qualidade a partir de um elemento HTML
 * 
 * @param {HTMLElement} element - Elemento a ser convertido em PDF
 * @param {string} filename - Nome do arquivo PDF
 * @param {object} options - Opções de configuração
 * @returns {Promise<Blob|boolean>} - Blob do PDF ou true se salvo com sucesso
 */
export const generateHighQualityPDF = async (element, filename = 'curriculo.pdf', options = {}) => {
  const {
    onProgress = null,
    returnBlob = false,
    scale = 2, // Escala para qualidade (2 = boa qualidade, 3 = alta qualidade)
    quality = 0.92, // Qualidade JPEG (0.92 é um bom equilíbrio)
    margin = 10 // Margem em mm (10mm = margem padrão para impressão)
  } = options;

  try {
    if (onProgress) onProgress(5, 'Iniciando...');

    // Preparar clone do elemento
    const clone = prepareElementForCapture(element);
    document.body.appendChild(clone);
    
    // Aguardar renderização
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Aguardar carregamento de imagens
    if (onProgress) onProgress(10, 'Carregando imagens...');
    await waitForImages(clone);
    
    // Aguardar mais um pouco para garantir renderização completa
    await new Promise(resolve => setTimeout(resolve, 200));

    if (onProgress) onProgress(20, 'Capturando conteúdo...');

    // Capturar o elemento como canvas
    const canvas = await html2canvas(clone, {
      scale: scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      removeContainer: false,
      // Forçar dimensão de largura A4
      width: clone.scrollWidth,
      height: clone.scrollHeight,
      windowWidth: clone.scrollWidth,
      windowHeight: clone.scrollHeight
    });

    // Remover clone
    document.body.removeChild(clone);

    if (onProgress) onProgress(50, 'Gerando PDF...');

    // Criar PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Calcular dimensões
    const imgWidth = A4.WIDTH_MM - (margin * 2);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Calcular quantas páginas serão necessárias
    const pageHeight = A4.HEIGHT_MM - (margin * 2);
    const totalPages = Math.ceil(imgHeight / pageHeight);

    if (onProgress) onProgress(60, `Processando ${totalPages} página(s)...`);

    // Se a imagem cabe em uma página, adicionar diretamente
    if (totalPages === 1) {
      const imgData = canvas.toDataURL('image/jpeg', quality);
      pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, imgHeight);
    } else {
      // Dividir em múltiplas páginas com pequena sobreposição para evitar corte de texto
      const overlapMm = 5; // 5mm de sobreposição entre páginas
      const effectivePageHeight = pageHeight - overlapMm;
      const pageHeightPx = (effectivePageHeight * canvas.width) / imgWidth;
      const overlapPx = (overlapMm * canvas.width) / imgWidth;
      
      // Recalcular total de páginas com a sobreposição
      const adjustedTotalPages = Math.ceil((canvas.height - overlapPx) / pageHeightPx);
      
      for (let page = 0; page < adjustedTotalPages; page++) {
        if (page > 0) pdf.addPage();
        
        // Criar canvas temporário para esta página
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        
        // Calcular posição inicial (com sobreposição a partir da segunda página)
        const startY = page === 0 ? 0 : (page * pageHeightPx) - (overlapPx * 0.5);
        const remainingHeight = canvas.height - startY;
        
        // Altura desta página (última página pode ser menor)
        const thisPageHeight = Math.min(pageHeightPx + overlapPx, remainingHeight);
        
        // Garantir altura mínima
        if (thisPageHeight <= 0) break;
        
        pageCanvas.height = thisPageHeight;
        
        const ctx = pageCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        
        // Desenhar a porção desta página
        ctx.drawImage(
          canvas,
          0, startY, canvas.width, thisPageHeight,
          0, 0, canvas.width, thisPageHeight
        );
        
        // Converter para imagem e adicionar ao PDF
        const pageImgData = pageCanvas.toDataURL('image/jpeg', quality);
        const thisPageHeightMm = (thisPageHeight * imgWidth) / canvas.width;
        
        // Centralizar verticalmente se a página não estiver cheia
        const yOffset = margin;
        pdf.addImage(pageImgData, 'JPEG', margin, yOffset, imgWidth, thisPageHeightMm);
        
        if (onProgress) {
          const progress = 60 + Math.floor(((page + 1) / adjustedTotalPages) * 35);
          onProgress(progress, `Página ${page + 1}/${adjustedTotalPages}...`);
        }
      }
    }

    if (onProgress) onProgress(95, 'Finalizando...');

    // Retornar blob ou salvar
    if (returnBlob) {
      const blob = pdf.output('blob');
      if (onProgress) onProgress(100, 'Concluído!');
      return blob;
    }

    pdf.save(filename);
    if (onProgress) onProgress(100, 'Concluído!');
    return true;

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw new Error(`Falha ao gerar PDF: ${error.message}`);
  }
};

/**
 * Versão otimizada para compartilhamento (arquivo menor)
 */
export const generateOptimizedPDF = async (element, filename = 'curriculo.pdf', options = {}) => {
  return generateHighQualityPDF(element, filename, {
    ...options,
    scale: 1.5,
    quality: 0.85
  });
};

/**
 * Exporta currículo em diferentes formatos
 */
export const exportCurriculum = async (element, format = 'pdf', filename = 'curriculo') => {
  if (format === 'pdf') {
    return generateHighQualityPDF(element, `${filename}.pdf`);
  }

  // Para PNG ou JPEG
  const clone = prepareElementForCapture(element);
  document.body.appendChild(clone);
  
  await new Promise(resolve => setTimeout(resolve, 300));
  await waitForImages(clone);
  
  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false
  });
  
  document.body.removeChild(clone);

  const dataUrl = canvas.toDataURL(`image/${format}`, format === 'jpeg' ? 0.92 : 1.0);
  
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `${filename}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
};

const pdfGeneratorFinal = {
  generateHighQualityPDF,
  generateOptimizedPDF,
  exportCurriculum
};

export default pdfGeneratorFinal;
