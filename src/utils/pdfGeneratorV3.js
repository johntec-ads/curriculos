import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gera PDF de alta qualidade com paginação inteligente baseada no DOM
 * @param {HTMLElement} element - Elemento a ser convertido em PDF
 * @param {string} filename - Nome do arquivo PDF
 * @param {object} options - Opções de configuração
 * @returns {Promise<boolean>} - Sucesso ou falha
 */
export const generateHighQualityPDF = async (element, filename = 'curriculo.pdf', options = {}) => {
  try {
    const {
      onProgress = null,
      scale = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 1.5 : 2,
      quality = 0.95,
      returnBlob = false
    } = options;

    if (onProgress) onProgress(10, 'Analisando conteúdo...');

    // Dimensões A4 em mm e px (aproximado a 96 DPI para cálculos de layout)
    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const mmToPx = 3.7795275591; // 1mm = 3.78px
    const a4HeightPx = Math.floor(a4HeightMm * mmToPx);
    // Aumentar margem de segurança para evitar cortes no rodapé
    const pageMarginPx = 60; 
    const contentHeightPx = a4HeightPx - pageMarginPx;

    // Clonar o elemento para manipulação
    const clonedElement = element.cloneNode(true);
    
    // Preparar container temporário invisível mas renderizado
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = `${a4WidthMm}mm`;
    container.style.visibility = 'hidden'; // Usar hidden em vez de display:none para poder medir
    document.body.appendChild(container);
    container.appendChild(clonedElement);

    // Aguardar renderização e carregamento de imagens
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Garantir que todas as imagens estejam carregadas
    const images = Array.from(clonedElement.querySelectorAll('img'));
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    }));

    // Identificar elementos filhos diretos que podem ser movidos entre páginas
    // Assumindo que o template usa um Paper ou div principal com filhos (seções, títulos, itens)
    // Precisamos encontrar o container de conteúdo real dentro do clone
    let contentContainer = clonedElement;
    
    // Se o elemento raiz for apenas um wrapper, tentar achar o container interno
    // No Template1, é um Paper.
    
    // Coletar todos os "blocos" de conteúdo
    // Vamos tentar ser genéricos: pegar todos os filhos diretos do container principal
    const children = Array.from(contentContainer.children);
    
    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    if (onProgress) onProgress(30, 'Calculando quebras de página...');

    children.forEach((child) => {
      const style = window.getComputedStyle(child);
      const height = child.offsetHeight + parseInt(style.marginTop || 0) + parseInt(style.marginBottom || 0);
      
      // Se o item sozinho é maior que uma página, ele vai quebrar de qualquer jeito
      // Mas se ele cabe na página atual, adicionamos. Se não, nova página.
      // Adicionar margem de segurança extra (20px) na verificação
      if (currentHeight + height > contentHeightPx && currentPage.length > 0) {
        pages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }

      currentPage.push(child);
      currentHeight += height;
    });

    if (currentPage.length > 0) {
      pages.push(currentPage);
    }

    // Limpar container temporário
    document.body.removeChild(container);

    if (onProgress) onProgress(50, `Gerando ${pages.length} páginas...`);

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    for (let i = 0; i < pages.length; i++) {
      if (i > 0) pdf.addPage();

      // Criar um container para esta página específica
      const pageContainer = document.createElement('div');
      pageContainer.style.position = 'absolute';
      pageContainer.style.left = '-9999px';
      pageContainer.style.top = '0';
      pageContainer.style.width = `${a4WidthMm}mm`;
      pageContainer.style.minHeight = `${a4HeightMm}mm`;
      pageContainer.style.backgroundColor = '#ffffff';
      pageContainer.style.padding = '20px'; // Padding visual
      pageContainer.style.boxSizing = 'border-box';
      
      // Reconstruir o estilo do pai original para manter fontes/cores
      // Copiar estilos computados relevantes do elemento original para o pageContainer
      const originalStyle = window.getComputedStyle(element);
      pageContainer.style.fontFamily = originalStyle.fontFamily;
      pageContainer.style.color = originalStyle.color;
      
      // Adicionar clones dos elementos desta página
      pages[i].forEach(child => {
        // Precisamos clonar novamente pois os elementos originais do clone foram removidos do DOM
        // ou estamos movendo referências. O clone inicial ainda existe na memória?
        // Sim, 'children' são referências aos nós do 'clonedElement'.
        // Ao dar appendChild em outro lugar, eles movem.
        pageContainer.appendChild(child);
      });

      document.body.appendChild(pageContainer);

      // Gerar canvas desta página
      const canvas = await html2canvas(pageContainer, {
        scale: scale,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', quality);
      pdf.addImage(imgData, 'JPEG', 0, 0, a4WidthMm, a4HeightMm);

      document.body.removeChild(pageContainer);
      
      if (onProgress) onProgress(50 + Math.floor(((i + 1) / pages.length) * 40), `Processando página ${i + 1}...`);
    }

    if (onProgress) onProgress(100, 'Concluído!');

    if (returnBlob) {
      return pdf.output('blob');
    }

    pdf.save(filename);
    return true;

  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    throw error;
  }
};
