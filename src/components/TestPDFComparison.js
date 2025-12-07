import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import PDFTemplate1 from '../templates/pdf/PDFTemplate1';
import { sampleCurriculumData } from '../data/sampleData';

/**
 * Página de teste para comparar os dois métodos de geração de PDF
 */
const TestPDFComparison = () => {
  const [showViewer, setShowViewer] = useState(false);

  // Dados de teste (os mesmos do TestGenerator)
  const testData = sampleCurriculumData;

  // Dados longos para teste de múltiplas páginas
  const longTestData = {
    ...sampleCurriculumData,
    experience: [
      ...sampleCurriculumData.experience,
      ...sampleCurriculumData.experience,
      ...sampleCurriculumData.experience,
    ],
    education: [
      ...sampleCurriculumData.education,
      ...sampleCurriculumData.education,
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Teste: PDF com Texto Real
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          <strong>Nova abordagem:</strong> Usando @react-pdf/renderer, o PDF é
          gerado com texto real (selecionável e pesquisável), não como imagem. A
          paginação é automática e inteligente.
        </Alert>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Download direto (dados normais - 1-2 páginas)
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <PDFDownloadLink
            document={<PDFTemplate1 data={testData} />}
            fileName="curriculo_teste_normal.pdf"
          >
            {({ blob, url, loading, error }) => (
              <Button
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Gerando...' : 'Baixar PDF (Normal)'}
              </Button>
            )}
          </PDFDownloadLink>
        </Stack>

        <Typography variant="h6" gutterBottom>
          2. Download (dados longos - 3+ páginas)
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <PDFDownloadLink
            document={<PDFTemplate1 data={longTestData} />}
            fileName="curriculo_teste_longo.pdf"
          >
            {({ blob, url, loading, error }) => (
              <Button
                variant="contained"
                color="secondary"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {loading ? 'Gerando...' : 'Baixar PDF (Longo)'}
              </Button>
            )}
          </PDFDownloadLink>
        </Stack>

        <Typography variant="h6" gutterBottom>
          3. Visualizar PDF no navegador
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setShowViewer(!showViewer)}
          sx={{ mb: 2 }}
        >
          {showViewer ? 'Esconder Visualizador' : 'Mostrar Visualizador'}
        </Button>

        {showViewer && (
          <Paper elevation={2} sx={{ height: '600px', mt: 2 }}>
            <PDFViewer width="100%" height="100%">
              <PDFTemplate1 data={testData} />
            </PDFViewer>
          </Paper>
        )}

        <Alert severity="success" sx={{ mt: 4 }}>
          <strong>Vantagens desta abordagem:</strong>
          <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            <li>Texto selecionável e pesquisável</li>
            <li>Paginação automática (não corta texto no meio)</li>
            <li>Arquivo PDF menor</li>
            <li>Qualidade profissional</li>
            <li>Funciona offline após carregamento inicial</li>
          </ul>
        </Alert>
      </Paper>
    </Container>
  );
};

export default TestPDFComparison;
