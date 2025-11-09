# Gerador de Currículos

Este projeto é um aplicativo web para criação e personalização de currículos profissionais. Construído com React, Material-UI e Firebase, oferece uma interface intuitiva para gerar currículos em PDF com múltiplos templates.

## Funcionalidades

- **Criação de Currículos**: Formulário completo para inserir dados pessoais, experiência, educação, habilidades, etc.
- **Templates Diversos**: 5 templates diferentes para escolher.
- **Autenticação**: Login e cadastro com Firebase Authentication.
- **Preview em Tempo Real**: Visualize o currículo antes de exportar.
- **Exportação para PDF**: Gere um PDF profissional do seu currículo.
- **Compartilhamento**: Compartilhe seu currículo via QR Code, redes sociais, etc.
- **Responsivo**: Funciona em desktop e mobile.

## Tecnologias Utilizadas

- **Frontend**: React 18, Material-UI, React Router
- **Backend**: Firebase (Authentication, Firestore)
- **Outros**: Formik (formulários), Yup (validação), html2canvas, jsPDF, QRCode

## Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/johntec-ads/curriculos.git
   cd curriculos
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Authentication e Firestore
   - Copie as configurações para `src/firebase.js`

4. Execute o projeto:
   ```bash
   npm start
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
```

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm run build`: Cria build de produção
- `npm test`: Executa os testes
- `npm run eject`: Eject do Create React App (irreversível)

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está sob a licença MIT.

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
