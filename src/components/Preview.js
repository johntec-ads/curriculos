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
  Alert,
  useMediaQuery,
  useTheme,
  Paper,
  Tooltip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getTemplateById, templates } from '../templates';
import { useState, useRef, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function Preview() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const printRef = useRef(null);
  const [curriculumData, setCurriculumData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [printError, setPrintError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [zoomLevel, setZoomLevel] = useState(isMobile ? 0.6 : isTablet ? 0.8 : 1);
  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 32;
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.7;
    const widthRatio = viewportWidth / 794;
    const heightRatio = viewportHeight / 1123;
    const idealZoom = Math.min(widthRatio, heightRatio, 1);
    setZoomLevel(Math.max(idealZoom * 0.9, 0.4));
  }, [isMobile, isTablet]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.3));
  };

  const handleResetZoom = () => {
    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 32;
    const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.7;
    const widthRatio = viewportWidth / 794;
    const heightRatio = viewportHeight / 1123;
    const idealZoom = Math.min(widthRatio, heightRatio, 1);
    setZoomLevel(Math.max(idealZoom * 0.9, 0.4));
  };

  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    const queryParams = new URLSearchParams(window.location.search);
    const sharedData = queryParams.get('shared');
    
    if (sharedData) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(atob(sharedData)));
        setCurriculumData(decodedData);
        setSelectedTemplate(decodedData.template || 'template1');
        localStorage.setItem('curriculumData', JSON.stringify(decodedData));
      } catch (error) {
        console.error('Erro ao decodificar dados compartilhados:', error);
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
      
      // Oculta elementos de UI que não devem aparecer no PDF
      const elementsToHide = document.querySelectorAll('.no-print');
      elementsToHide.forEach(el => {
        el.setAttribute('data-original-display', el.style.display);
        el.style.display = 'none';
      });
      
      // Oculta elementos específicos de UI móvel que podem não estar com a classe no-print
      const mobileUIElements = document.querySelectorAll('.MuiBottomNavigation-root, .MuiDialog-root, [role="dialog"], .MuiTooltip-popper, .MuiSnackbar-root');
      mobileUIElements.forEach(el => {
        if (!el.classList.contains('no-print')) {
          el.setAttribute('data-original-display', el.style.display);
          el.style.display = 'none';
          el.classList.add('temp-hidden');
        }
      });
      
      // Força a aplicação de estilos corretos para impressão
      document.body.classList.add('printing-pdf');
      
      // Ativa suporte a cores de fundo para impressão e adiciona suporte a múltiplas páginas
      const styleElement = document.createElement('style');
      styleElement.id = 'pdf-print-styles';
      styleElement.innerHTML = `
        @media print {
          html, body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          @page {
            size: A4;
            margin: 15mm 0; /* Adiciona margens superiores e inferiores em todas as páginas */
          }
          
          /* Estilização para múltiplas páginas */
          .MuiPaper-root::after {
            content: "";
            display: block;
            height: 15mm;
            margin-top: 15mm;
          }
          
          /* Evitar quebras de página dentro de elementos importantes */
          h1, h2, h3, h4, h5, h6, .MuiTypography-h6 {
            page-break-after: avoid;
            break-after: avoid;
          }
          
          /* Melhor controle sobre quebras de página */
          .MuiBox-root, .MuiPaper-root {
            overflow: visible !important;
          }
        }
      `;
      document.head.appendChild(styleElement);
      
      // Força que o elemento de impressão seja visível e com estilos adequados
      if (printRef.current) {
        // ... resto do código existente ...
      }
    },
    onAfterPrint: () => {
      console.log("Impressão concluída!");
      setIsGeneratingPdf(false);
      setSnackbarMessage("PDF gerado com sucesso!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Restaura elementos ocultos
      const elementsToRestore = document.querySelectorAll('[data-original-display]');
      elementsToRestore.forEach(el => {
        el.style.display = el.getAttribute('data-original-display');
        el.removeAttribute('data-original-display');
      });

      const tempHiddenElements = document.querySelectorAll('.temp-hidden');
      tempHiddenElements.forEach(el => {
        el.style.display = '';
        el.classList.remove('temp-hidden');
      });

      // Remove estilos de impressão
      document.body.classList.remove('printing-pdf');
      const styleElement = document.getElementById('pdf-print-styles');
      if (styleElement) {
        styleElement.remove();
      }
    },
    onPrintError: (error) => {
      console.error("Erro de impressão:", error);
      setPrintError(error.message || 'Erro ao gerar o PDF');
      setIsGeneratingPdf(false);
      setSnackbarMessage("Erro ao gerar o PDF. Tente novamente.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
    setSnackbarMessage("Modelo alterado com sucesso!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const templateData = getTemplateById(selectedTemplate);
  const TemplateComponent = templateData?.component;

  if (!curriculumData || !TemplateComponent) {
    return (
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <Box sx={{ textAlign: 'center', py: { xs: 4, sm: 6, md: 8 } }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando currículo...
          </Typography>
        </Box>
      </Container>
    );
  }

  const a4WidthInPixels = 794;
  const a4HeightInPixels = 1123;

  return (
    <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
      <div style={{ display: 'none' }}>
        <div ref={printRef} style={{ position: 'relative', marginTop: 0, paddingTop: 0 }}>
          <TemplateComponent 
            data={curriculumData}
            isGenerating={true}
          />
        </div>
      </div>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: 1, 
        mb: 2,
        mt: 1,
        backgroundColor: 'rgba(25, 118, 210, 0.08)',
        borderRadius: 1,
        py: 1,
        px: 2
      }}>
        <InfoOutlinedIcon color="primary" fontSize="small" />
        <Typography variant="body2" color="text.secondary">
          Esta é uma visualização exata do formato A4 do seu currículo. Use os controles de zoom para melhor visualização.
        </Typography>
      </Box>

      <Stack 
        direction="row"
        justifyContent="center" 
        alignItems="center" 
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Tooltip title="Diminuir zoom">
          <IconButton onClick={handleZoomOut} color="primary" size="small">
            <ZoomOutIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body2" sx={{ 
          minWidth: '48px', 
          textAlign: 'center',
          bgcolor: 'rgba(25, 118, 210, 0.04)',
          borderRadius: 1,
          py: 0.5,
          px: 1
        }}>
          {Math.round(zoomLevel * 100)}%
        </Typography>
        <Tooltip title="Aumentar zoom">
          <IconButton onClick={handleZoomIn} color="primary" size="small">
            <ZoomInIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ajustar à tela">
          <IconButton onClick={handleResetZoom} color="primary" size="small">
            <FullscreenIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Box sx={{ 
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pb: 2,
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: '100%',
          maxWidth: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
          pb: 2,
          maxHeight: {
            xs: 'calc(100vh - 280px)',
            sm: 'calc(100vh - 260px)',
            md: 'calc(100vh - 240px)'
          }
        }}>
          <Paper 
            elevation={3} 
            sx={{
              margin: '0 auto',
              width: `${a4WidthInPixels * zoomLevel}px`,
              height: `${a4HeightInPixels * zoomLevel}px`,
              position: 'relative',
              border: '1px solid #ddd',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ 
              width: a4WidthInPixels,
              height: a4HeightInPixels,
              position: 'absolute',
              top: 0,
              left: 0,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
            }}>
              <TemplateComponent 
                data={curriculumData}
                isGenerating={false}
              />
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box sx={{ 
        textAlign: 'center', 
        mb: 4, 
        mt: 3, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2, 
        justifyContent: 'center',
        px: { xs: 2, sm: 0 }
      }}>
        <Button 
          onClick={handleBack}
          variant="outlined" 
          color="primary"
          size="large"
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
        >
          Voltar e Editar
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setIsTemplateDialogOpen(true)}
          disabled={isGeneratingPdf}
          fullWidth={isMobile}
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
          fullWidth={isMobile}
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

      <Dialog 
        open={isTemplateDialogOpen} 
        onClose={() => setIsTemplateDialogOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: { xs: '95%', sm: '80%', md: '900px' }
          }
        }}
      >
        <DialogTitle sx={{ 
          position: 'relative', 
          pr: 6,
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}>
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
        <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {templates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  sx={{ 
                    border: selectedTemplate === template.id ? '2px solid #1976d2' : '1px solid #e0e0e0',
                    transition: 'all 0.2s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-4px)' },
                      boxShadow: 3
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleTemplateChange(template.id)}
                    sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                  >
                    <CardMedia
                      component="img"
                      height={isMobile ? "200" : "320"}
                      image={template.thumbnail}
                      alt={template.name}
                      sx={{
                        objectFit: 'contain',
                        bgcolor: '#f5f5f5',
                        filter: selectedTemplate === template.id ? 'none' : 'grayscale(40%)'
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div" 
                        sx={{ 
                          color: selectedTemplate === template.id ? '#1976d2' : 'inherit',
                          fontSize: { xs: '1rem', sm: '1.25rem' }
                        }}
                      >
                        {template.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {template.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ 
          p: { xs: 1.5, sm: 2 }, 
          justifyContent: { xs: 'center', sm: 'space-between' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Button 
            onClick={() => setIsTemplateDialogOpen(false)} 
            color="primary" 
            size="large" 
            variant="outlined"
            fullWidth={isMobile}
          >
            Cancelar
          </Button>
          <Button 
            onClick={() => setIsTemplateDialogOpen(false)} 
            color="primary" 
            size="large" 
            variant="contained"
            fullWidth={isMobile}
          >
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ 
          vertical: 'bottom', 
          horizontal: isMobile ? 'center' : 'right' 
        }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Preview;
