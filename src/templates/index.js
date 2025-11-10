// Depois importamos os componentes
import Template1 from './Template1';
// import Template2 from './Template2';
import Template3 from './Template3';
import Template4 from './Template4';
import Template5 from './Template5';
import Template6 from './Template6';
import Template7 from './Template7';

export { default as Template1Wrapper } from './Template1';
// export { default as Template2Wrapper } from './Template2';
export { default as Template3Wrapper } from './Template3';
export { default as Template4Wrapper } from './Template4';
export { default as Template5Wrapper } from './Template5';
export { default as Template7Wrapper } from './Template7';

// Caminho para as imagens dos templates
const templateImagePath = "/images/";

// Primeiro definimos os templates como um objeto para evitar problemas de hoisting
const templateDefinitions = {
  template1: {
    id: 'template1',
    name: 'Clássico',
    thumbnail: `${templateImagePath}template1.jpg`,
    description: 'Layout tradicional com ênfase em clareza e profissionalismo'
  },

  template3: {
    id: 'template3',
    name: 'Minimalista',
    thumbnail: `${templateImagePath}template3.jpg`,
    description: 'Layout limpo e elegante com duas colunas'
  },
  template4: {
    id: 'template4',
    name: 'Simples',
    thumbnail: `${templateImagePath}template4.jpg`,
    description: 'Modelo simples e direto ao ponto'
  },
  template5: {
    id: 'template5',
    name: 'Organizado',
    thumbnail: `${templateImagePath}template5.jpg`,
    description: 'Modelo com design limpo e organizado'
  },
  template6: {
    id: 'template6',
    name: 'Moderno com Foto',
    thumbnail: `${templateImagePath}template6.jpg`,
    description: 'Barra lateral colorida, foto e layout profissional'
  }
  ,
  template7: {
    id: 'template7',
    name: 'Clean Modern',
    thumbnail: `${templateImagePath}template7.jpg`,
    description: 'Cabeçalho colorido, layout duas colunas e foco em impressão'
  }
};

// Finalmente, criamos o array de templates com os componentes
export const templates = [
  {
    ...templateDefinitions.template1,
    component: Template1
  },

  {
    ...templateDefinitions.template3,
    component: Template3
  },
  {
    ...templateDefinitions.template4,
    component: Template4
  },
  {
    ...templateDefinitions.template5,
    component: Template5
  },
  {
    ...templateDefinitions.template6,
    component: Template6
  }
  ,
  {
    ...templateDefinitions.template7,
    component: Template7
  }
];

export const getTemplateById = (id) => {
  return templates.find(template => template.id === id);
};
