import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Gera PDF de alta qualidade com paginação inteligente baseada no DOM
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
      onProgress = null,
      scale = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? 1.5
        : 2,
      quality = 0.95,
      returnBlob = false,
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
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Garantir que todas as imagens estejam carregadas
    const images = Array.from(clonedElement.querySelectorAll('img'));
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );

    // Identificar elementos filhos diretos que podem ser movidos entre páginas
    // Assumindo que o template usa um Paper ou div principal com filhos (seções, títulos, itens)
    // Precisamos encontrar o container de conteúdo real dentro do clone
    let contentContainer = clonedElement;

    // Descer na hierarquia para encontrar o container real de conteúdo
    // Muitas vezes temos wrappers: #print-content > Box > Paper > Conteúdo
    // Evitamos descer se for uma imagem ou se tivermos múltiplos filhos significativos
    while (
      contentContainer.children.length === 1 &&
      contentContainer.firstElementChild.tagName !== 'IMG'
    ) {
      contentContainer = contentContainer.firstElementChild;
    }

    // Coletar todos os "blocos" de conteúdo
    // Vamos tentar ser genéricos: pegar todos os filhos diretos do container principal
    let children = Array.from(contentContainer.children);

    // Se tivermos poucos filhos (ex: Header + ContentWrapper), e o ContentWrapper for grande,
    // precisamos "explodir" o ContentWrapper para que seus filhos sejam tratados individualmente.
    // Isso resolve o problema de templates com layout de colunas ou wrappers principais.
    if (children.length < 5) {
      const newChildren = [];
      children.forEach((child) => {
        const style = window.getComputedStyle(child);
        const height = child.offsetHeight;

        // Se o filho for muito grande (maior que 1/3 da página) e tiver filhos próprios,
        // vamos tentar usar os filhos dele em vez dele mesmo.
        // Mas cuidado com layouts de grid/flex (como colunas laterais).
        // Se for grid/flex, não podemos simplesmente desmontar, a menos que seja coluna única.
        const isGridOrFlex =
          style.display === 'grid' || style.display === 'flex';

        if (
          height > contentHeightPx * 0.3 &&
          child.children.length > 0 &&
          !isGridOrFlex
        ) {
          // É um wrapper grande de bloco normal, vamos pegar seus filhos
          newChildren.push(...Array.from(child.children));
        } else {
          // É um elemento normal (header, ou grid complexo), mantemos ele
          newChildren.push(child);
        }
      });
      children = newChildren;
    }

    // Capturar estilos do container original para replicar nas páginas (padding, background, etc)
    const containerStyle = window.getComputedStyle(contentContainer);

    const pages = [];
    let currentPage = [];
    let currentHeight = 0;

    if (onProgress) onProgress(30, 'Calculando quebras de página...');

    children.forEach((child) => {
      const style = window.getComputedStyle(child);
      const height =
        child.offsetHeight +
        parseInt(style.marginTop || 0) +
        parseInt(style.marginBottom || 0);

      // Se o item sozinho é maior que uma página, ele vai quebrar de qualquer jeito
      // Mas se ele cabe na página atual, adicionamos. Se não, nova página.
      // Adicionar margem de segurança extra (20px) na verificação
      if (currentHeight + height > contentHeightPx && currentPage.length > 0) {
        // Se o item for GIGANTE (maior que uma página inteira), não adianta jogar para a próxima
        // pois ele vai estourar lá também. Nesse caso, começamos ele na página atual mesmo
        // para aproveitar o espaço, e deixamos o sistema de fatiamento (slicing) resolver.
        if (height < contentHeightPx) {
          pages.push(currentPage);
          currentPage = [];
          currentHeight = 0;
        }
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
      compress: true,
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

      // Replicar estilos do container original (Paper)
      pageContainer.style.backgroundColor = containerStyle.backgroundColor;
      pageContainer.style.backgroundImage = containerStyle.backgroundImage;
      pageContainer.style.padding = containerStyle.padding;
      pageContainer.style.boxSizing = 'border-box';

      // Reconstruir o estilo de fonte herdado
      const originalStyle = window.getComputedStyle(element);
      pageContainer.style.fontFamily = originalStyle.fontFamily;
      pageContainer.style.color = originalStyle.color;

      // Adicionar clones dos elementos desta página
      pages[i].forEach((child) => {
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
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', quality);

      // Calcular dimensões proporcionais para evitar achatamento/estiramento
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = a4WidthMm;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Usar altura proporcional em vez de forçar a4HeightMm
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      document.body.removeChild(pageContainer);

      if (onProgress)
        onProgress(
          50 + Math.floor(((i + 1) / pages.length) * 40),
          `Processando página ${i + 1}...`
        );
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
