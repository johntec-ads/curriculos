# 🎯 Gerador de Currículos Profissionais - JOHNTEC.ADS

<div align="center">

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Material--UI](https://img.shields.io/badge/Material--UI-5.11.0-0081cb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

**Crie currículos profissionais que impressionam em minutos!**

[🚀 Demo ao Vivo](https://seu-deploy.netlify.app) | [📖 Documentação](#) | [🐛 Reportar Bug](#) | [✨ Sugerir Feature](#)

</div>

---

## 📋 Sobre o Projeto

Uma aplicação web moderna e intuitiva para criação de currículos profissionais. Desenvolvida com as melhores práticas de UX/UI, oferece uma experiência guiada passo a passo para ajudar profissionais a criarem currículos de alta qualidade que se destacam no mercado de trabalho.

### ✨ Características Principais

#### 🎨 **Interface Moderna e Intuitiva**
- Design responsivo e mobile-first
- Stepper visual para guiar o processo
- Salvamento automático (auto-save)
- Feedback visual em tempo real
- Animações suaves e profissionais

#### 📝 **Formulário Inteligente**
- Validação robusta com Formik + Yup
- Mensagens de erro claras e contextuais
- Dicas profissionais em cada etapa
- Sugestões de preenchimento
- Contador de caracteres
- Autocomplete para habilidades e idiomas

#### 🎭 **Templates Profissionais**
- 6 templates modernos e otimizados
- Designs aprovados por recrutadores
- Compatível com ATS (Applicant Tracking Systems)
- Layouts responsivos
- Fácil troca entre templates

#### 📄 **Exportação de Alta Qualidade**
- PDF de alta resolução (3x scale)
- Fidelidade visual perfeita
- Tamanho A4 padrão (210mm x 297mm)
- Suporte para múltiplas páginas
- Opções de exportação PNG/JPEG

#### 💾 **Persistência de Dados**
- Salvamento automático no LocalStorage
- Recuperação de progresso
- Sem necessidade de cadastro
- Privacidade total dos dados

#### 🎯 **Recursos Especiais**
- Upload e recorte de foto profissional
- Preview em tempo real
- Compartilhamento via QR Code
- Suporte a múltiplos idiomas
- Sistema de progresso visual
- Mensagens motivacionais

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18.2** - Biblioteca JavaScript para construção de interfaces
- **Material-UI 5.11** - Framework de componentes React
- **React Router 6** - Navegação entre páginas
- **Formik 2.2** - Gerenciamento de formulários
- **Yup 0.32** - Validação de esquemas

### Geração de PDF
- **html2canvas 1.4** - Captura de tela de alta qualidade
- **jsPDF 2.5** - Geração de documentos PDF
- **react-to-print 2.15** - Impressão otimizada

### Outras Ferramentas
- **Firebase 9** - Autenticação (opcional)
- **react-easy-crop 5.4** - Recorte de imagens
- **qrcode.react 4.2** - Geração de QR Codes

---

## 📦 Instalação e Execução

### Pré-requisitos

```bash
Node.js >= 16.0.0
npm >= 8.0.0 ou yarn >= 1.22.0
```

### Passos de Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/johntec-ads/curriculos.git
cd curriculos
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure o Firebase (Opcional)**
   
   Se quiser usar autenticação:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Authentication
   - Copie as credenciais para `src/firebase.js`

4. **Inicie o servidor de desenvolvimento**
```bash
npm start
# ou
yarn start
```

5. **Acesse a aplicação**
   
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

---

## 🎯 Como Usar

### Criando seu Primeiro Currículo

1. **Acesse a página inicial** e clique em "Criar Meu Currículo Agora"
2. **Escolha um template** que combine com seu estilo profissional
3. **Preencha o formulário** seguindo as 4 etapas:
   - 📋 **Etapa 1**: Informações Pessoais
   - 💼 **Etapa 2**: Experiência Profissional
   - 🎓 **Etapa 3**: Formação Acadêmica
   - 💡 **Etapa 4**: Habilidades e Idiomas
4. **Visualize o preview** do seu currículo
5. **Gere o PDF** e baixe em alta qualidade

### Dicas para um Currículo de Sucesso

✅ Use uma foto profissional com fundo neutro
✅ Seja específico nas descrições de experiências
✅ Quantifique resultados quando possível
✅ Use verbos de ação: "Desenvolvi", "Gerenciei", "Implementei"
✅ Destaque habilidades relevantes para a vaga
✅ Revise ortografia e gramática
✅ Mantenha o currículo objetivo (1-2 páginas)

---

## 📁 Estrutura do Projeto

```
curriculos/
├── public/
│   ├── images/           # Imagens dos templates
│   └── index.html
├── src/
│   ├── components/       # Componentes React
│   │   ├── FormSections/ # Seções do formulário
│   │   │   ├── PersonalInfoSection.js
│   │   │   ├── ExperienceSection.js
│   │   │   ├── EducationSection.js
│   │   │   └── SkillsSection.js
│   │   ├── CurriculumFormV2.js  # Formulário com stepper
│   │   ├── HomeV2.js            # Página inicial moderna
│   │   ├── Preview.js           # Visualização do currículo
│   │   └── LoadingScreen.js     # Tela de carregamento
│   ├── templates/        # Templates de currículo
│   │   ├── Template1.js  # Clássico
│   │   ├── Template2.js  # Moderno
│   │   ├── Template3.js  # Minimalista
│   │   ├── Template4.js  # Simples
│   │   ├── Template5.js  # Organizado
│   │   ├── Template6.js  # Premium
│   │   └── index.js
│   ├── utils/            # Utilitários
│   │   └── pdfGenerator.js  # Geração de PDF otimizada
│   ├── context/          # Contextos React
│   ├── data/             # Dados de exemplo
│   ├── App.js            # Componente principal
│   ├── theme.js          # Tema Material-UI
│   └── index.js
├── package.json
├── README.md
└── netlify.toml
```

---

## 🎨 Templates Disponíveis

| Template | Descrição | Ideal Para |
|----------|-----------|------------|
| **Clássico** | Layout tradicional com ênfase em clareza | Profissionais conservadores |
| **Moderno** | Design contemporâneo com barra lateral | Áreas criativas e tech |
| **Minimalista** | Layout limpo e elegante | Profissionais experientes |
| **Simples** | Direto ao ponto | Primeira vaga |
| **Organizado** | Design limpo e estruturado | Gestores e líderes |
| **Premium** | Gradiente moderno e profissional | Destaque no mercado |

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento
npm run build          # Cria build de produção
npm test               # Executa testes
npm run lint           # Verifica código com ESLint
npm run lint:fix       # Corrige problemas do ESLint
npm run format         # Formata código com Prettier
npm run format:check   # Verifica formatação
```

---

## 🌐 Deploy

### Netlify (Recomendado)

```bash
# Build automático configurado em netlify.toml
npm run build

# Deploy manual
netlify deploy --prod
```

### Outras Plataformas

- **Vercel**: `vercel --prod`
- **GitHub Pages**: Configure no repositório
- **Firebase Hosting**: `firebase deploy`

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Diretrizes de Contribuição

- Siga o padrão de código existente
- Escreva mensagens de commit claras
- Adicione testes quando aplicável
- Atualize a documentação
