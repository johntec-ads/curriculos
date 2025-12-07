import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gera PDF de alta qualidade a partir de um elemento HTML
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
      scale = 3, // Maior escala = maior qualidade
      quality = 1.0,
      format = 'a4',
      orientation = 'portrait',
      onProgress = null,
      margin = 10, // margem em mm
      returnBlob = false, // se true, retorna um Blob ao invés de salvar diretamente
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
        try {
          // Remover arredondamentos e sombras no clone para evitar cortes estranhos entre páginas
          const cloned =
            clonedDoc.getElementById('print-content') ||
            clonedDoc.querySelector('.print-only') ||
            clonedDoc.body;
          if (cloned) {
            cloned.style.borderRadius = '0';
            cloned.style.boxShadow = 'none';
            cloned.style.overflow = 'visible';
            cloned.style.visibility = 'visible';

            // Remover borderRadius/shadow de elementos filhos que possam causar cantos arredondados
            const children = cloned.querySelectorAll('*');
            children.forEach((ch) => {
              ch.style.borderRadius = ch.style.borderRadius || '0';
              ch.style.boxShadow = ch.style.boxShadow || 'none';
            });
          }
        } catch (e) {
          // Silencioso
        }
      },
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
      compress: true,
    });

    // Calcular conversão px <-> mm usando a altura do canvas (mais confiável para paginação vertical)
    const pxPerMmHeight = canvas.height / a4Height; // pixels por mm baseado na altura A4
    const pageHeightPx = Math.floor(usableHeight * pxPerMmHeight);
    const overlapMm = options.overlapMm || 12; // sobreposição entre páginas para evitar cortes visíveis (padrão 12mm)
    const overlapPx = Math.round(overlapMm * pxPerMmHeight);
    const stride = Math.max(1, pageHeightPx - overlapPx);

    // Calcular número aproximado de páginas e informar progresso
    const totalPages = Math.ceil((canvas.height - overlapPx) / stride);
    if (onProgress) onProgress(60, `Gerando ${totalPages} página(s)...`);

    // Para cada página, recortar o segmento correspondente e adicionar ao PDF
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    const tempCtx = tempCanvas.getContext('2d');

    let page = 0;
    // Tentar detectar uma "tarja"/sidebar no elemento original para mascarar seams
    const detectSidebar = (root) => {
      try {
        const rootRect = root.getBoundingClientRect();
        const all = Array.from(root.querySelectorAll('*'));
        for (let el of all) {
          const style = window.getComputedStyle(el);
          const bg = style.backgroundColor;
          const width = el.getBoundingClientRect().width;
          // detectar elementos com background sólido e largura fixa razoável (sidebar)
          if (bg && bg !== 'transparent' && width > 60 && width < 350) {
            const rect = el.getBoundingClientRect();
            return {
              leftPx: rect.left - rootRect.left,
              topPx: rect.top - rootRect.top,
              widthPx: rect.width,
              heightPx: rect.height,
              color: bg,
            };
          }
        }
      } catch (e) {
        // ignore
      }
      return null;
    };

    const sidebarInfo = detectSidebar(element);
    // Conversão largura px -> mm (baseado na largura A4)
    const pxPerMmWidth = canvas.width / a4Width;
    for (let y = 0; y < canvas.height; y += stride) {
      const thisPageHeightPx = Math.min(pageHeightPx, canvas.height - y);
      tempCanvas.height = thisPageHeightPx;

      // Limpar e desenhar o recorte
      tempCtx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
      tempCtx.drawImage(
        canvas,
        0,
        y,
        canvas.width,
        thisPageHeightPx,
        0,
        0,
        canvas.width,
        thisPageHeightPx
      );

      // Converter slice para imagem
      const imgData = tempCanvas.toDataURL('image/jpeg', quality);

      // Dimensões em mm para essa fatia
      const imgWidth = usableWidth;

      const xPos = margin;
      const yPos = margin;

      if (page > 0) pdf.addPage();

      // Desenhar máscara na região de sobreposição da sidebar para cobrir seams visíveis
      if (sidebarInfo) {
        try {
          const sidebarLeftMm = sidebarInfo.leftPx / pxPerMmWidth + margin / 1; // ajustar à margem
          const sidebarWidthMm = sidebarInfo.widthPx / pxPerMmWidth;
          const overlapMm = Math.round(options.overlapMm || 12);
          // Para páginas além da primeira, desenhar um retângulo no topo da página (altura = overlap)
          if (page > 0) {
            const rectHeightMm = overlapMm;
            // converter bg color rgb(...) para valores 0-255
            const colorMatch = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(
              sidebarInfo.color || ''
            );
            if (colorMatch) {
              const r = parseInt(colorMatch[1], 10);
              const g = parseInt(colorMatch[2], 10);
              const b = parseInt(colorMatch[3], 10);
              pdf.setFillColor(r, g, b);
              pdf.rect(sidebarLeftMm, yPos, sidebarWidthMm, rectHeightMm, 'F');
            }
          }
        } catch (e) {
          // ignore drawing errors
        }
      }

      const imgHeightMm = thisPageHeightPx / pxPerMmHeight;
      pdf.addImage(
        imgData,
        'JPEG',
        xPos,
        yPos,
        imgWidth,
        imgHeightMm,
        undefined,
        'FAST'
      );

      page++;
      if (onProgress)
        onProgress(
          60 + Math.round((page / totalPages) * 30),
          `Processando página ${page}/${totalPages}...`
        );
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
export const generateOptimizedPDF = async (
  element,
  filename = 'curriculo.pdf'
) => {
  return generateHighQualityPDF(element, filename, {
    scale: 2,
    quality: 0.85,
    onProgress: null,
  });
};

/**
 * Prepara o elemento para impressão/PDF
 * @param {HTMLElement} element - Elemento a ser preparado
 */
export const prepareElementForPDF = (element) => {
  if (!element) return;

  // Ocultar botões e elementos que não devem aparecer no PDF
  const elementsToHide = element.querySelectorAll(
    '.no-print, .no-print-container'
  );
  elementsToHide.forEach((el) => {
    el.style.display = 'none';
  });

  // Garantir que o elemento tenha o tamanho correto
  element.style.width = '210mm';
  element.style.minHeight = '297mm';
  element.style.backgroundColor = '#ffffff';

  return () => {
    // Restaurar elementos ocultos
    elementsToHide.forEach((el) => {
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
export const exportCurriculum = async (
  element,
  format = 'pdf',
  filename = 'curriculo'
) => {
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
      logging: false,
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
  exportCurriculum,
};

export default pdfUtils;
