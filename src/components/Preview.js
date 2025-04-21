import { 
  Container, 
  Box, 
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getTemplateById, templates } from '../templates';
import { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function Preview() {
  const navigate = useNavigate();
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [printError, setPrintError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Verifica se há dados na URL ou localStorage
  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    const queryParams = new URLSearchParams(window.location.search);
    const sharedData = queryParams.get('shared');
    
    if (sharedData) {
      try {
        // Decodifica os dados compartilhados
        const decodedData = JSON.parse(decodeURIComponent(atob(sharedData)));
        setCurriculumData(decodedData);
        setSelectedTemplate(decodedData.template || 'template1');
        // Salva localmente para permitir edição
        localStorage.setItem('curriculumData', JSON.stringify(decodedData));
      } catch (error) {
        console.error('Erro ao decodificar dados compartilhados:', error);
        // Se falhar, tenta carregar os dados locais
        if (data) {
          try {
            const parsedData = JSON.parse(data);
            setCurriculumData(parsedData);
            setSelectedTemplate(parsedData.template || 'template1');
          } catch (error) {
            console.error('Erro ao analisar os dados do localStorage:', error);
            alert('Os dados armazenados estão corrompidos. Por favor, reinicie o processo.');
            localStorage.removeItem('curriculumData');
          }
        }
      }
    } else if (data) {
      try {
        const parsedData = JSON.parse(data);
        setCurriculumData(parsedData);
        setSelectedTemplate(parsedData.template || 'template1');
      } catch (error) {
        console.error('Erro ao analisar os dados do localStorage:', error);
        alert('Os dados armazenados estão corrompidos. Por favor, reinicie o processo.');
        localStorage.removeItem('curriculumData');
      }
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `Curriculo_${curriculumData?.personalInfo?.name || 'Novo'}`,
    onBeforePrint: () => {
      console.log("Preparando para impressão...");
      setIsGeneratingPdf(true);
    },
    onAfterPrint: () => {
      console.log("Impressão concluída!");
      setIsGeneratingPdf(false);
    },
    onPrintError: (error) => {
      console.error("Erro de impressão:", error);
      setPrintError(error.message || 'Erro ao gerar o PDF');
      setIsGeneratingPdf(false);
    },
    removeAfterPrint: true,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
          print-color-adjust: exact;
        }
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden;
        }
      }
    `
  });

  const handleBack = () => {
    navigate('/create');
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setCurriculumData(prev => ({
      ...prev,
      template: templateId
    }));
    localStorage.setItem('curriculumData', JSON.stringify({
      ...curriculumData,
      template: templateId
    }));
    setIsTemplateDialogOpen(false);
  };

  const templateData = getTemplateById(selectedTemplate);
  const TemplateComponent = templateData?.component;

  if (!curriculumData || !TemplateComponent) {
    return (
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando currículo...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      {/* Conteúdo imprimível com estilo otimizado para PDF */}
      <div style={{ display: 'none' }}>
        <div ref={printRef} style={{ position: 'relative' }}>
          <TemplateComponent 
            data={curriculumData}
            isGenerating={true}
          />
        </div>
      </div>

      {/* Versão visível para o usuário */}
      <TemplateComponent 
        data={curriculumData}
        isGenerating={false}
      />

      {/* Botões de ação */}
      <Box sx={{ textAlign: 'center', mb: 4, mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
        <Button 
          onClick={handleBack}
          variant="outlined" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
        >
          Voltar e Editar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setIsTemplateDialogOpen(true)}
          disabled={isGeneratingPdf}
          sx={{ 
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.04)'
            },
            fontWeight: 'medium'
          }}
        >
          Escolher Outro Modelo
        </Button>
        <Button
          onClick={handlePrint}
          variant="contained" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
          sx={{ 
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(25, 118, 210, 0.25)',
            '&:hover': {
              boxShadow: '0 6px 10px rgba(25, 118, 210, 0.3)',
            }
          }}
        >
          {isGeneratingPdf ? 'Gerando PDF...' : 'Gerar PDF'}
        </Button>
      </Box>

      {printError && (
        <Typography color="error" align="center" sx={{ mb: 2 }}>
          {printError}
        </Typography>
      )}

      {/* Diálogo para escolha de template */}
      <Dialog 
        open={isTemplateDialogOpen} 
        onClose={() => setIsTemplateDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ position: 'relative', pr: 6 }}>
          Escolha um Modelo de Currículo
          <IconButton
            aria-label="Fechar"
            onClick={() => setIsTemplateDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  sx={{ 
                    border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea onClick={() => handleTemplateChange(template.id)}>
                    <CardMedia
                      component="img"
                      height="320"
                      image={template.thumbnail}
                      alt={template.name}
                      sx={{
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        filter: selectedTemplate === template.id ? 'none' : 'grayscale(40%)'
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div" sx={{ 
                        color: selectedTemplate === template.id ? '#1976d2' : 'inherit' 
                      }}>
                        {template.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {template.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
          <Button onClick={() => setIsTemplateDialogOpen(false)} color="primary" size="large" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={() => setIsTemplateDialogOpen(false)} color="primary" size="large" variant="contained">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Preview;
