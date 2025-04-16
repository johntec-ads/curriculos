// Depois importamos os componentes
import Template1 from './Template1';
import Template2 from './Template2';
import Template3 from './Template3';

export { default as Template1Wrapper } from './Template1';
export { default as Template2Wrapper } from './Template2';
export { default as Template3Wrapper } from './Template3';
export { default as Template4Wrapper } from './Template4';
export { default as Template5Wrapper } from './Template5';

// Placeholder thumbnails até termos as imagens reais
const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='396' viewBox='0 0 280 396'%3E%3Crect width='280' height='396' fill='%23f0f0f0'/%3E%3Ctext x='140' y='198' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'%3EVisualização do Template%3C/text%3E%3C/svg%3E";

// Primeiro definimos os templates como um objeto para evitar problemas de hoisting
const templateDefinitions = {
  template1: {
    id: 'template1',
    name: 'Clássico',
    thumbnail: placeholderImage,
    description: 'Layout tradicional com ênfase em clareza e profissionalismo'
  },
  template2: {
    id: 'template2',
    name: 'Moderno',
    thumbnail: placeholderImage,
    description: 'Design contemporâneo com barra lateral colorida e foto'
  },
  template3: {
    id: 'template3',
    name: 'Minimalista',
    thumbnail: placeholderImage,
    description: 'Layout limpo e elegante com duas colunas'
  }
};

// Finalmente, criamos o array de templates com os componentes
export const templates = [
  {
    ...templateDefinitions.template1,
    component: Template1
  },
  {
    ...templateDefinitions.template2,
    component: Template2
  },
  {
    ...templateDefinitions.template3,
    component: Template3
  }
];

export const getTemplateById = (id) => {
  return templates.find(template => template.id === id);
};
